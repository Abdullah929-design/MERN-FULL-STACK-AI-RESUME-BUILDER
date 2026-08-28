import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { randomUUID } from 'crypto';
import { kv } from '@vercel/kv';

// API key priority: Groq (fast & free) → FreeLLMAPI → OpenRouter
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const FREELLMAPI_API_KEY = process.env.FREELLMAPI_API_KEY || process.env.OPENROUTER_API_KEY;

// Select the active key and URL
const ACTIVE_API_KEY = GROQ_API_KEY || FREELLMAPI_API_KEY;
const ACTIVE_API_URL = GROQ_API_KEY
  ? 'https://api.groq.com/openai/v1/chat/completions'
  : (process.env.FREELLMAPI_API_URL || 'https://openrouter.ai/api/v1/chat/completions');
const ACTIVE_MODEL = GROQ_API_KEY
  ? (process.env.GROQ_MODEL || 'llama-3.3-70b-versatile')
  : (process.env.FREELLMAPI_MODEL || 'mistral/mistral-large-latest');

interface UserStats {
  [key: string]: string | number;
  lastReset: string;
}

const ipCache = new Map<string, UserStats>();

const LIMITS: Record<string, number> = {
  'summary': 100,
  'improve': 100,
  'skills': 100,
  'extract': 100,
  'linkedin_extract': 100,
  'ats_score': 100,
  'cover_letter': 100,
  'share_content': 100
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Device-ID');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, input } = req.body || {};
  
  // Extraction
  const ip = (req.headers['x-forwarded-for'] as string || 'unknown').split(',')[0].trim();
  const deviceId = req.headers['x-device-id'] as string;
  const identifier = deviceId || ip; // Use Device Fingerprint, fallback to IP
  
  const today = new Date().toISOString().split('T')[0];
  const cacheKey = `ai_limit_${identifier}`;

  // Limit Check
  if (type !== 'ping') {
    let userStats: UserStats | null = null;
    
    // Try Vercel KV for persistence across serverless cold starts
    try {
      userStats = await kv.get<UserStats>(cacheKey);
    } catch (e) {
      console.warn('[AI API] Vercel KV not configured or failed, falling back to memory map.');
    }

    if (!userStats) {
      userStats = ipCache.get(identifier) || { lastReset: today };
    }

    if (userStats.lastReset !== today) {
      // Reset for new day
      Object.keys(userStats).forEach(key => { if (key !== 'lastReset') delete userStats![key]; });
      userStats.lastReset = today;
    }

    const currentCount = (userStats[type as string] as number) || 0;
    const limit = LIMITS[type as string] || 5;

    if (currentCount >= limit) {
      return res.status(429).json({ 
        error: 'Daily API limit reached for this device.', 
        info: 'Each feature has a daily limit that resets every 24 hours based on your device fingerprint.' 
      });
    }

    // Increment
    userStats[type as string] = currentCount + 1;
    
    try {
      await kv.set(cacheKey, userStats);
    } catch (e) {
      ipCache.set(identifier, userStats);
    }
  }

  console.log('[AI API] Request received:', { type, ip, method: req.method });

  if (type === 'ping' || req.query.type === 'ping') {
    return res.status(200).json({ 
      status: 'ok', 
      hasKey: !!FREELLMAPI_API_KEY,
      nodeVersion: process.version,
      timestamp: new Date().toISOString()
    });
  }

  if (!type || !input) {
    console.error('[AI API] Missing type or input');
    return res.status(400).json({ error: 'Missing required fields: type and input' });
  }

  if (!ACTIVE_API_KEY) {
    console.error('[AI API] No AI API key configured');
    return res.status(500).json({ 
      error: 'No AI API key is configured.',
      tip: 'Add GROQ_API_KEY (recommended) or FREELLMAPI_API_KEY/OPENROUTER_API_KEY to your Vercel environment variables.'
    });
  }

  try {
    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'extract':
        systemPrompt = `You are an expert resume parser. Extract structured resume data from the provided text and return ONLY valid JSON.

== SECTION ROUTING RULES ==

"experience" array — ONLY for paid employment: full-time, part-time, internships, freelance, contract roles.
"education" array — ONLY for academic degrees, diplomas, and school-level qualifications.
"customSections" array — Everything else that does not fit the above:
  - A "Projects" section in the resume → customSection titled "Projects"
  - Certifications / Licenses → customSection titled "Certifications"
  - Languages → customSection titled "Languages"
  - Volunteer work → customSection titled "Volunteer Work"
  - Publications, Awards, Achievements → their own customSection with matching title
  DO NOT force these into experience or education.

== DATE RULES ==

- Use "YYYY-MM" format when BOTH year and month are explicitly stated (e.g. "Feb 2023" → "2023-02").
- If ONLY a year is given with NO month (e.g. "2023" or "2023–2027"), use "YYYY" only — DO NOT invent a month.
- If a role is explicitly described as ongoing or "current": set endDate to "Present".
- If there is NO end date and NO indication the role is current: set endDate to "" (empty) and add a warning.

== STATUS INFERENCE RULES ==

- If a role mentions "part-time", "freelance", "contract", "consultant", "self-employed", or "remote": add a warning noting the employment type.
- If a date says "expected", "anticipated", "pursuing", or similar: do NOT treat it as a completed entry — add a warning flagging it as in-progress.
- If two roles at the same company overlap in date ranges: add a warning about concurrent roles.
- NEVER silently normalize ambiguous status into a clean completed entry.

== ASSUMPTION WARNINGS ==

You MUST populate the top-level "warnings" array with a plain-English message for EVERY assumption or ambiguity, including:
- Missing month: "Start/end month unknown for [Company/Institution] — year only used"
- Uncertain end date: "End date missing for [Role] at [Company] — left blank"
- In-progress qualification: "[Degree] at [Institution] appears to be ongoing or expected — review endDate"
- Ambiguous employment type: "[Role] at [Company] may be part-time or freelance — confirm"
- Non-standard section routed to customSections: "[Section name] placed in a custom section — review placement"
If no ambiguity exists, return "warnings": [].

== OUTPUT SCHEMA ==

Return ONLY this JSON (no markdown, no extra text):
{
  "resume": {
    "title": "Resume",
    "template": "modern",
    "sections": {
      "personal": { "name": "", "email": "", "phone": "", "location": "", "title": "" },
      "summary": "",
      "experience": [{ "id": "uuid", "company": "", "role": "", "startDate": "", "endDate": "", "description": "" }],
      "education": [{ "id": "uuid", "institution": "", "degree": "", "year": "" }],
      "skills": ["skill1", "skill2"],
      "customSections": [
        {
          "id": "uuid",
          "title": "Section Name",
          "items": [{ "id": "uuid", "title": "", "subtitle": "", "date": "", "description": "" }]
        }
      ]
    }
  },
  "warnings": []
}
Generate a random UUID for every id field. If a section has no data, use [].`;
        userPrompt = `TEXT:\n${input.text}`;
        break;

      case 'summary':
        systemPrompt = "You are a professional resume writer. Generate a concise, impactful professional summary (2-3 sentences) based on the provided job title and skills. Return the summary as a JSON object: { \"summary\": \"...\" }";
        userPrompt = `Title: ${input.title}\nSkills: ${input.skills}`;
        break;

      case 'improve':
        systemPrompt = "You are a professional resume writer. Improve the following work experience description to be more action-oriented and impactful. Use strong action verbs. Return the improved text as a JSON object: { \"improved\": \"...\" }";
        userPrompt = `Text: ${input.text}`;
        break;

      case 'skills':
        systemPrompt = "You are a career coach. Suggest 5-8 relevant technical skills for the given job title. Return the skills as a JSON list in an object: { \"skills\": [\"...\", \"...\"] }";
        userPrompt = `Job Title: ${input.title}`;
        break;

      case 'ats_score':
        systemPrompt = `You are an expert ATS (Applicant Tracking System) software and technical recruiter.
Evaluate the provided resume against the provided job description.
Return ONLY valid JSON in this exact format, with honest, strict scoring:
{
  "overallScore": 85,
  "dimensions": {
    "keywordMatch": { "score": 80, "explanation": "..." },
    "experienceAlignment": { "score": 90, "explanation": "..." },
    "skillsCoverage": { "score": 75, "explanation": "..." },
    "jobTitleAlignment": { "score": 100, "explanation": "..." },
    "quantifiedImpact": { "score": 85, "explanation": "..." },
    "atsFormattingSafety": { "score": 90, "explanation": "..." }
  },
  "quickWins": ["...", "...", "..."],
  "rewrittenSummary": "..."
}
Ensure all scores are out of 100. Provide specific explanations and actionable quick wins. rewrittenSummary should be a heavily optimized paragraph for this JD.`;
        userPrompt = `Resume:\n${input.resume}\n\nJob Description:\n${input.jobDescription}`;
        break;

      case 'share_content':
        systemPrompt = `You are an expert copywriter and SEO specialist. Generate shareable public page content for a professional's resume.
Return ONLY valid JSON in this exact format:
{
  "pageTitle": "Name — Title | City (under 60 chars)",
  "metaDescription": "140-155 characters exactly, highly optimized.",
  "ogTitle": "50-70 chars Open Graph title",
  "ogDescription": "100-130 chars Open Graph description",
  "heroHeadline": "A natural, non-corporate headline like 'Senior Product Designer based in London'",
  "heroSubline": "A natural subline like '8 years building fintech products at Revolut and Monzo'",
  "shareMessage": "First person, natural tone, max 220 chars, include [LINK] as a placeholder"
}
Make the hero headline and subline sound like a real human wrote them, not a corporate bio. The share message should feel like a real LinkedIn post.`;
        userPrompt = `Name: ${input.name}
Title: ${input.title}
Location: ${input.location}
Summary: ${input.summary}
Top 5 skills: ${input.skills}
Most recent role: ${input.recentRole}
Years of experience: ${input.yearsOfExperience}`;
        break;

      case 'linkedin_extract':
        systemPrompt = `You are an expert resume parser. Extract data from the provided raw LinkedIn PDF text and return ONLY valid JSON.

== SECTION ROUTING RULES ==

"experience" array — ONLY for paid employment: full-time, part-time, internships, freelance, contract roles.
"education" array — ONLY for academic degrees, diplomas, and school-level qualifications.
"customSections" array — Everything else:
  - Projects / Side projects → customSection titled "Projects"
  - Certifications / Licenses / Courses → customSection titled "Certifications"
  - Languages → customSection titled "Languages"
  - Volunteer / Causes → customSection titled "Volunteer Work"
  - Publications, Honors, Awards → their own matching customSection
  Strip LinkedIn page artifacts, repeated headers, and section separators.

== DATE RULES ==

- Use "YYYY-MM" when BOTH year and month are stated (e.g. "Jan 2021" → "2021-01").
- If ONLY a year is given: use "YYYY" — DO NOT invent a month.
- Ongoing role with no end date explicitly stated as current: set endDate to "Present".
- No end date and no indication it is current: set endDate to "" and add a warning.

== STATUS INFERENCE RULES ==

- Part-time, freelance, contract, consulting, self-employed roles: add a warning noting the employment type.
- LinkedIn sometimes shows the same company with overlapping date ranges (promotions or concurrent roles): add a warning for each overlap.
- Certifications shown under Experience: move them to a "Certifications" customSection and add a warning.
- NEVER silently convert an ambiguous entry into a clean completed full-time role.

== ASSUMPTION WARNINGS ==

Populate the top-level "warnings" array with plain-English messages for EVERY ambiguity:
- Missing month: "Start/end month unknown for [Company] — year only used"
- Uncertain end: "End date missing for [Role] at [Company] — left blank"
- Employment type unclear: "[Role] at [Company] may be part-time or freelance — confirm"
- Concurrent roles: "Overlapping dates detected at [Company] — may be concurrent roles or promotions"
- Rerouted section: "[Section] placed in custom section — review placement"
If no ambiguity, return "warnings": [].

== OUTPUT SCHEMA ==

Return ONLY this JSON (no markdown, no extra text):
{
  "resume": {
    "title": "LinkedIn Import",
    "template": "modern",
    "sections": {
      "personal": { "name": "", "email": "", "phone": "", "location": "", "title": "" },
      "summary": "",
      "experience": [{ "id": "uuid", "company": "", "role": "", "startDate": "", "endDate": "", "description": "" }],
      "education": [{ "id": "uuid", "institution": "", "degree": "", "year": "" }],
      "skills": ["skill1", "skill2"],
      "customSections": [
        {
          "id": "uuid",
          "title": "Section Name",
          "items": [{ "id": "uuid", "title": "", "subtitle": "", "date": "", "description": "" }]
        }
      ]
    }
  },
  "warnings": []
}
Generate a random UUID for every id field. If a section has no data, use [].`;
        userPrompt = `Raw LinkedIn PDF text:\n${(input.text || '').substring(0, 8000)}`;
        break;

      case 'cover_letter':
        systemPrompt = `You are a professional hiring manager and careers expert. Your task is to write a tailored, zero-fluff cover letter connecting the user's resume directly to a Job Description.
RULES:
1. Open with a strong hook — do NOT say "I am writing to apply for...". Show immediately why they are the right fit.
2. Connect their specific experience directly to the job description's core needs.
3. Highlight 2-3 specific achievements from the resume utilizing real numbers where available.
4. Show genuine knowledge of the company needs based on the JD.
5. Close with a confident call to action.

Tone: Professional but human. Avoid sounding stiff, overly formal, or robotic. DO NOT use clichés like "I am a hard worker", "team player", "passionate about", or "I would be a great fit".
Format: 3-4 paragraphs. Under 400 words total. Do NOT include a subject line, date, or address block. Start exactly at "Dear Hiring Manager," (or use the name if in the JD).

Do NOT invent skills, experience, or numbers that are not explicitly stated in the provided Resume. Do NOT simply repeat the resume word-for-word.

Return ONLY valid JSON in this exact format. Use an ARRAY of strings for the letter to represent paragraphs. DO NOT use newline characters:
{
  "letter": [
    "Paragraph 1 text...",
    "Paragraph 2 text...",
    "Paragraph 3 text..."
  ],
  "whyThisWorks": [
    "Short specific bullet explaining a choice made",
    "Short specific bullet explaining another choice",
    "Short specific bullet explaining tone or matching"
  ]
}`;
        userPrompt = `My Resume:\n${input.resume}\n\nJob Description:\n${input.jobDescription}`;
        break;

      default:
        return res.status(400).json({ error: 'Invalid request type' });
    }

    const model = ACTIVE_MODEL;
    console.log('[AI API] Sending request to AI backend...', { model, type, url: ACTIVE_API_URL });

    const response = await axios.post(ACTIVE_API_URL, {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.05
    }, {
      headers: {
        'Authorization': `Bearer ${ACTIVE_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/Abdullah929-design/ResumeBuilder',
        'X-Title': 'Resume Builder AI',
      },
      timeout: 25000, // Extend timeout for slower LLM responses
    });

    const data = response.data;
    console.log('[AI API] AI backend response received');

    if (data.error) {
      console.error('[AI API] FreeLLMAPI Error:', data.error);
      return res.status(502).json({ error: 'FreeLLMAPI API Error', details: data.error.message || data.error });
    }

    if (data.choices && data.choices[0]) {
      let contentString = data.choices[0].message.content;

      try {
        if (contentString.includes('```json')) {
          contentString = contentString.split('```json')[1].split('```')[0];
        } else if (contentString.includes('```')) {
          contentString = contentString.split('```')[1].split('```')[0];
        }

        const content = JSON.parse(contentString.trim());

        // Helper to flatten skills into individual strings, handling categorized formats
        const sanitizeSkillList = (list: any[]): string[] => {
          const sanitized: string[] = [];
          list.forEach((s: any) => {
            if (typeof s === 'string') {
              // Handle "Category: skill1, skill2" or "s1 Category: skill1, skill2" patterns
              const colonIdx = s.indexOf(':');
              if (colonIdx !== -1) {
                // Extract the part after the colon (the actual skills)
                const afterColon = s.substring(colonIdx + 1).trim();
                if (afterColon) {
                  const parts = afterColon.split(/[,;]+/).map((p: string) => p.trim()).filter((p: string) => p.length > 0 && p.length < 60);
                  sanitized.push(...parts);
                } else {
                  sanitized.push(s);
                }
              } else {
                sanitized.push(s.trim());
              }
            } else if (typeof s === 'object' && s !== null) {
              // Handle nested objects like { category: [skill1, skill2] }
              Object.values(s).flat().forEach((v: any) => {
                if (typeof v === 'string') sanitized.push(v.trim());
              });
            }
          });
          return [...new Set(sanitized.filter(s => s.length > 0 && s.length < 80))];
        };

        // Helper to detect if an experience entry is actually an education entry
        const EDUCATION_KEYWORDS = [
          'university', 'college', 'institute', 'school', 'bachelor', 'master', 'phd', 'doctorate',
          'b.s.', 'b.sc', 'm.s.', 'm.sc', 'b.tech', 'm.tech', 'b.e.', 'bsc', 'msc',
          'intermediate', 'matriculation', 'diploma', 'degree', 'faculty', 'campus'
        ];
        const looksLikeEducation = (entry: any): boolean => {
          const text = `${entry.company || ''} ${entry.role || ''} ${entry.description || ''}`.toLowerCase();
          return EDUCATION_KEYWORDS.some(kw => text.includes(kw));
        };

        // Sanitize Extraction Case
        if (content.resume?.sections?.skills) {
          content.resume.sections.skills = sanitizeSkillList(content.resume.sections.skills);
        }

        // Sanitize Suggestion Case
        if (content.skills) {
          content.skills = sanitizeSkillList(content.skills);
        }

        // Post-processing guard: detect misclassified education entries in experience and fix them
        if ((type === 'extract' || type === 'linkedin_extract') && content.resume?.sections) {
          const sections = content.resume.sections;

          // Ensure customSections is always an array (model may omit it if empty)
          if (!Array.isArray(sections.customSections)) {
            sections.customSections = [];
          }

          // Ensure warnings array exists at top level
          if (!Array.isArray(content.warnings)) {
            content.warnings = [];
          }

          if (Array.isArray(sections.experience) && Array.isArray(sections.education)) {
            const misclassified: any[] = [];
            sections.experience = sections.experience.filter((entry: any) => {
              if (looksLikeEducation(entry)) {
                misclassified.push(entry);
                return false;
              }
              return true;
            });
            // Convert and move misclassified entries to education, add a warning each time
            misclassified.forEach((entry: any) => {
              const year = entry.startDate && entry.endDate
                ? `${entry.startDate}\u2013${entry.endDate}`
                : entry.startDate || entry.endDate || '';
              sections.education.push({
                id: entry.id || randomUUID(),
                institution: entry.company || '',
                degree: entry.role || '',
                year
              });
              content.warnings.push(
                `"${entry.role || entry.company}" was moved from Experience to Education — please verify`
              );
            });

            // Deduplicate education entries that appear in both (model sometimes outputs both)
            const educationSeen = new Set<string>();
            sections.education = sections.education.filter((entry: any) => {
              const key = `${(entry.institution || '').toLowerCase()}|${(entry.degree || '').toLowerCase()}`;
              if (educationSeen.has(key)) return false;
              educationSeen.add(key);
              return true;
            });
          }
        }

        // Convert arrays back if needed (removed since schema changed)

        return res.status(200).json(content);


      } catch (parseError: any) {
        return res.status(500).json({ error: 'Failed to parse AI response as JSON', rawString: contentString, parseError: parseError.message });
      }
    } else {
      return res.status(500).json({ error: 'Invalid response structure from AI' });
    }
  } catch (error: any) {
    const status = error.response?.status || 500;
    console.error('[AI API] Critical Error:', {
      status,
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    return res.status(status).json({ 
      error: 'Internal server error', 
      details: error.message,
      stack: error.stack,
      ...(error.response?.data ? { apiError: error.response.data } : {})
    });
  }
}

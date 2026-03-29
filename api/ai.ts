import type { VercelRequest, VercelResponse } from '@vercel/node';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, input } = req.body || {};

  if (!type || !input) {
    return res.status(400).json({ error: 'Missing required fields: type and input' });
  }

  if (!GROQ_API_KEY) {
    return res.status(500).json({ 
      error: 'GROQ_API_KEY is not set in Vercel Environment Variables.',
      tip: 'Go to your Vercel Dashboard > Settings > Environment Variables and add GROQ_API_KEY.'
    });
  }

  try {
    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'extract':
        systemPrompt = `Extract structured resume data from the following text.
Return ONLY valid JSON in this format:
{
  "resume": {
    "title": "Resume",
    "template": "modern",
    "sections": {
      "personal": { "name": "", "email": "", "phone": "", "location": "", "title": "" },
      "summary": "",
      "experience": [{ "id": "uuid", "company": "", "role": "", "startDate": "", "endDate": "", "description": "" }],
      "education": [{ "id": "uuid", "institution": "", "degree": "", "year": "" }],
      "skills": []
    }
  }
}
If any field is missing, leave it empty. Generate random UUIDs for ids.`;
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

      default:
        return res.status(400).json({ error: 'Invalid request type' });
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.1,
      }),
    });

    const data: any = await response.json();
    
    if (data.error) {
      return res.status(502).json({ error: 'Groq API Error', details: data.error.message });
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
        
        // Helper to flatten skills into strings
        const sanitizeSkillList = (list: any[]): string[] => {
          const sanitized: string[] = [];
          list.forEach((s: any) => {
            if (typeof s === 'string') {
              sanitized.push(s);
            } else if (typeof s === 'object' && s !== null) {
              const vals = Object.values(s).flat().filter(v => typeof v === 'string') as string[];
              sanitized.push(...vals);
            }
          });
          return [...new Set(sanitized)];
        };

        // Sanitize Extraction Case
        if (content.resume?.sections?.skills) {
          content.resume.sections.skills = sanitizeSkillList(content.resume.sections.skills);
        }

        // Sanitize Suggestion Case
        if (content.skills) {
          content.skills = sanitizeSkillList(content.skills);
        }

        return res.status(200).json(content);


      } catch (parseError) {
        return res.status(500).json({ error: 'Failed to parse AI response as JSON' });
      }
    } else {
      return res.status(500).json({ error: 'Invalid response structure from AI' });
    }
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

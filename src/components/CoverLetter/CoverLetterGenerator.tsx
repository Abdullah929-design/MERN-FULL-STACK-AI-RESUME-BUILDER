import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Sparkles, Loader2, FileText, Check, Copy, Target, Play, Lightbulb, LayoutPanelLeft, Download } from 'lucide-react';
import axios from 'axios';
import { CoverLetterPreview } from './CoverLetterPreview';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CoverLetterDocument } from './CoverLetterPDF';

export const CoverLetterGenerator: React.FC = () => {
  const { resume, isAIALimitReached, incrementAIUsage } = useResumeStore();
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    letter: string | string[];
    whyThisWorks: string[];
  } | null>(null);
  
  const [template, setTemplate] = useState<'classic' | 'modern' | 'executive'>('modern');

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result) {
      const copyText = Array.isArray(result.letter) ? result.letter.join('\\n\\n') : result.letter;
      navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGenerate = async () => {
    if (!jobDescription.trim()) return;
    
    if (isAIALimitReached()) {
      setError("Daily AI limit reached (5/5). Please try again tomorrow.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    // Compile resume into plain text to send to AI
    const resumeText = `
Name: ${resume.sections.personal.name}
Title: ${resume.sections.personal.title}
Summary: ${resume.sections.summary}

EXPERIENCE:
${resume.sections.experience.map(e => `${e.role} at ${e.company} (${e.startDate}-${e.endDate})\n${e.description}`).join('\n\n')}

EDUCATION:
${resume.sections.education.map(e => `${e.degree} from ${e.institution}`).join('\n')}

SKILLS:
${resume.sections.skills.join(', ')}
    `.trim();

    try {
      const response = await axios.post('/api/ai', {
        type: 'cover_letter',
        input: {
          resume: resumeText,
          jobDescription: jobDescription.trim()
        }
      });

      if (response.data && response.data.letter) {
        setResult(response.data);
        incrementAIUsage();
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || err.message || "Could not generate cover letter. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <Sparkles className="text-blue-600" size={28} />
            Magic Cover Letter
          </h1>
          <p className="mt-2 text-gray-600 text-lg max-w-2xl">
            Paste the job description. We'll use your current resume data to instantly write a highly tailored, non-robotic cover letter that connects your exact experience to what they're looking for.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Input */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Target size={20} className="text-orange-600" />
              <h2 className="text-lg font-bold text-gray-800">Job Description</h2>
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the requirements, role overview, or the entire job posting here..."
              className="w-full h-80 px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm text-gray-700 leading-relaxed"
            />
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !jobDescription.trim()}
              className="w-full py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 transition-all font-bold shadow-lg flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Writing letter...
                </>
              ) : (
                <>
                  <Play size={20} />
                  Generate Magic Cover Letter
                </>
              )}
            </button>
          </div>

          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
             <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-3">
               <Lightbulb size={18} className="text-blue-600" />
               How this works
             </h3>
             <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
               <li>It automatically reads your Resume Builder profile.</li>
               <li>It avoids boring clichés like "I am writing to apply".</li>
               <li>It highlights 2-3 specific matching metrics.</li>
               <li>Tone is professional but authentically human.</li>
               <li>Ready in under 10 seconds.</li>
             </ul>
          </div>
        </div>

        {/* Right Side: Output */}
        <div className="flex flex-col gap-6">
          {result ? (
            <>
              {/* Template Selector */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                   <LayoutPanelLeft size={18} className="text-gray-500" />
                   <span className="text-sm font-semibold text-gray-700">Preview Style:</span>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  {(['classic', 'modern', 'executive'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTemplate(t)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-all ${template === t ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* The Letter */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col flex-1 relative">
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <FileText size={18} className="text-blue-600" />
                    Interactive Preview
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all text-sm font-semibold text-gray-700 shadow-sm"
                    >
                      {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                      <span className="hidden sm:inline">{copied ? "Copied" : "Copy Text"}</span>
                    </button>
                    <PDFDownloadLink
                      document={<CoverLetterDocument paragraphs={Array.isArray(result.letter) ? result.letter : [result.letter]} personal={resume.sections.personal} template={template} />}
                      fileName={`Cover_Letter_${resume.sections.personal.name || 'Document'}.pdf`}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white border border-blue-700 rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold shadow-sm"
                    >
                      {({ loading }) => (
                        <>
                          {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                          <span className="hidden sm:inline">{loading ? "Preparing PDF..." : "Download PDF"}</span>
                        </>
                      )}
                    </PDFDownloadLink>
                  </div>
                </div>
                <div className="bg-gray-100/50 p-4 overflow-y-auto max-h-[800px] flex justify-center custom-scrollbar">
                   <div className="w-full max-w-2xl transform scale-[0.9] origin-top md:scale-100 shadow-md">
                     <CoverLetterPreview 
                       paragraphs={Array.isArray(result.letter) ? result.letter : [result.letter]} 
                       personal={resume.sections.personal}
                       template={template}
                     />
                   </div>
                </div>
              </div>

              {/* Why This Works */}
              <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6">
                <h3 className="font-bold text-emerald-900 mb-4 pb-3 border-b border-emerald-200/50 flex items-center gap-2">
                  <Sparkles size={18} className="text-emerald-600" />
                  Why this perfectly fits the JD:
                </h3>
                <ul className="space-y-3">
                  {result.whyThisWorks.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-emerald-800">
                      <div className="mt-0.5 bg-emerald-200/50 p-1 rounded-full text-emerald-700">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="leading-relaxed font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8">
               <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center mb-4 text-gray-300">
                 <FileText size={32} />
               </div>
               <h3 className="text-lg font-bold text-gray-700">No output generated yet</h3>
               <p className="text-gray-500 max-w-sm mt-2">
                 Paste the job description and hit generate. We'll instantly write a tailored, professional cover letter matching your experience to the role.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

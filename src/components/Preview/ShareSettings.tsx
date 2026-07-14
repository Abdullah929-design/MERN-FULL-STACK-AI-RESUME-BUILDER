import { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Sparkles, Share2, Globe, Hash, Copy, RefreshCw, Check, MessageSquare } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function ShareSettings() {
  const { resume, isAIALimitReached, incrementAIUsage, setShowAILimitPopup } = useResumeStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState('');
  
  const [content, setContent] = useState<any>(null);

  const cn = (...inputs: (string | undefined | null | false)[]) => {
    return twMerge(clsx(inputs));
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const generateContent = async () => {
    if (isAIALimitReached('social')) {
      setShowAILimitPopup(true);
      return;
    }
    setIsGenerating(true);
    setError('');
    
    // Extract info from resume
    const p = resume.sections.personal;
    const skills = resume.sections.skills || [];
    const recentExp = (resume.sections.experience || [])[0];
    
    // Calculate simple years of experience
    let years = 0;
    if (resume.sections.experience && resume.sections.experience.length > 0) {
      years = resume.sections.experience.reduce((acc, exp) => {
         const start = parseInt(exp.startDate.split(' ').pop() || '0');
         let end = new Date().getFullYear();
         if (exp.endDate && exp.endDate.toLowerCase() !== 'present') {
             end = parseInt(exp.endDate.split(' ').pop() || end.toString());
         }
         return acc + (end - start);
      }, 0);
    }
    
    const inputPayload = {
      name: p.name || 'Professional',
      title: p.title || 'Specialist',
      location: p.location || 'Remote',
      summary: resume.sections.summary || '',
      skills: skills.slice(0, 5).join(', '),
      recentRole: recentExp ? `${recentExp.role} at ${recentExp.company}` : '',
      yearsOfExperience: Math.max(1, years).toString()
    };

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'share_content',
          input: inputPayload
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setContent(data);
      incrementAIUsage('social');
    } catch (err: any) {
      setError(err.message || 'Failed to generate share content.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-4 p-4 md:p-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="mb-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
          <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl shadow-inner">
            <Share2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Share Profile</h2>
            <p className="text-gray-500 text-sm font-medium">Generate SEO-optimized content and social sharing copy</p>
          </div>
        </div>

        {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}

        <button 
          onClick={generateContent}
          disabled={isGenerating}
          className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-2xl font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-[0.98]"
        >
          {isGenerating ? (
            <><RefreshCw className="w-5 h-5 animate-spin" /> <span>Syncing AI Content...</span></>
          ) : (
            <><Sparkles className="w-5 h-5" /> <span>Generate Social Media Assets</span></>
          )}
        </button>
      </div>

      {content && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-700">
          
          {/* SEO & Meta Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Globe className="text-blue-500" /> Search Engine Optimization
            </h3>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Page Title</label>
                  <span className={cn("text-xs font-medium", content.pageTitle?.length > 60 ? "text-red-500" : "text-green-600")}>
                    {content.pageTitle?.length || 0}/60
                  </span>
                </div>
                <div className="flex gap-2 group">
                  <div className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm text-gray-800 break-words">
                    {content.pageTitle}
                  </div>
                  <button onClick={() => handleCopy(content.pageTitle, 'pageTitle')} className="p-3 rounded-lg flex-shrink-0 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors">
                    {copiedField === 'pageTitle' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Meta Description</label>
                  <span className={cn("text-xs font-medium", (content.metaDescription?.length < 140 || content.metaDescription?.length > 155) ? "text-red-500" : "text-green-600")}>
                    {content.metaDescription?.length || 0}
                  </span>
                </div>
                <div className="flex gap-2 group">
                  <div className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm text-gray-800 break-words">
                    {content.metaDescription}
                  </div>
                  <button onClick={() => handleCopy(content.metaDescription, 'metaDesc')} className="p-3 rounded-lg flex-shrink-0 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors">
                    {copiedField === 'metaDesc' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 pt-4">
              <Hash className="text-blue-400" /> Social Cards (Open Graph)
            </h3>
            
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">OG Title</label>
                  <span className="text-xs font-medium text-gray-500">{content.ogTitle?.length || 0} chars</span>
                </div>
                <div className="flex gap-2 group">
                  <div className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm text-gray-800 break-words">
                    {content.ogTitle}
                  </div>
                  <button onClick={() => handleCopy(content.ogTitle, 'ogTitle')} className="p-3 rounded-lg flex-shrink-0 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors">
                    {copiedField === 'ogTitle' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">OG Description</label>
                  <span className="text-xs font-medium text-gray-500">{content.ogDescription?.length || 0} chars</span>
                </div>
                <div className="flex gap-2 group">
                   <div className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm text-gray-800 break-words">
                    {content.ogDescription}
                  </div>
                  <button onClick={() => handleCopy(content.ogDescription, 'ogDesc')} className="p-3 rounded-lg flex-shrink-0 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors">
                    {copiedField === 'ogDesc' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Social Branding Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="text-amber-500" /> Public Profile Hero
            </h3>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-5 bg-gradient-to-br from-indigo-50 to-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50 -mr-16 -mt-16 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Hero Headline</label>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 text-2xl font-black text-gray-900 tracking-tight break-words">
                    {content.heroHeadline}
                  </div>
                  <button onClick={() => handleCopy(content.heroHeadline, 'heroHead')} className="mt-1 p-2 h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/50 border border-indigo-100 hover:bg-white text-indigo-600 transition-colors">
                    {copiedField === 'heroHead' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div className="relative z-10 pt-2 border-t border-indigo-100/50">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Hero Subline</label>
                </div>
                <div className="flex gap-2">
                   <div className="flex-1 text-lg font-medium text-gray-600 break-words leading-snug">
                    {content.heroSubline}
                  </div>
                  <button onClick={() => handleCopy(content.heroSubline, 'heroSub')} className="mt-1 p-2 h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/50 border border-indigo-100 hover:bg-white text-indigo-600 transition-colors">
                    {copiedField === 'heroSub' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 pt-4">
              <MessageSquare className="text-blue-700" /> LinkedIn Announcement
            </h3>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
               <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Share Message</label>
                  <span className={cn("text-xs font-medium", content.shareMessage?.length > 220 ? "text-yellow-600" : "text-green-600")}>
                    {content.shareMessage?.length || 0}/220
                  </span>
                </div>
                <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-xl text-md text-gray-800 leading-relaxed min-h-[100px] whitespace-pre-wrap overflow-hidden">
                  {content.shareMessage}
                </div>
                <button 
                  onClick={() => handleCopy(content.shareMessage, 'shareMsg')} 
                  className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {copiedField === 'shareMsg' ? (
                     <><Check className="w-4 h-4" /> Copied to Clipboard!</>
                  ) : (
                     <><Copy className="w-4 h-4" /> Copy Message</>
                  )}
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';

export const SummaryForm: React.FC = () => {
  const { resume, updateSummary, incrementAIUsage, isAIALimitReached, setShowAILimitPopup } = useResumeStore();
  const { summary, personal } = resume.sections;
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    if (isAIALimitReached('description')) {
      setShowAILimitPopup(true);
      return;
    }

    if (!personal.title) {
      setError("Please enter a professional title first.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await axios.post('/api/ai', {
        type: 'summary',
        input: {
          title: personal.title,
          skills: resume.sections.skills.join(', ')
        }
      });

      if (response.data.summary) {
        updateSummary(response.data.summary);
        incrementAIUsage('description');
      }
    } catch (err) {
      setError("Failed to generate summary. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Tell your story</label>
        <button
          onClick={handleGenerateSummary}
          disabled={isGenerating}
          className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 transition-colors disabled:opacity-50"
        >
          {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
          AI Generate
        </button>
      </div>
      <div className="relative">
        <textarea
          value={summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Briefly describe your career goals and key achievements..."
          rows={5}
          maxLength={600}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none shadow-sm text-sm font-medium pb-8"
        />
        <div className="absolute bottom-2 right-3 text-[10px] font-bold text-gray-400 bg-white/80 px-1 rounded">
          {summary.length}/600
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

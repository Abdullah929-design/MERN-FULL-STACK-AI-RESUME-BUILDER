import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';

export const SummaryForm: React.FC = () => {
  const { resume, updateSummary, incrementAIUsage, isAIALimitReached } = useResumeStore();
  const { summary, personal } = resume.sections;
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    if (isAIALimitReached()) {
      setError("Daily AI limit reached. Try again tomorrow.");
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
        incrementAIUsage();
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
        <label className="text-sm font-medium text-gray-700">Tell your story</label>
        <button
          onClick={handleGenerateSummary}
          disabled={isGenerating}
          className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 transition-colors disabled:opacity-50"
        >
          {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
          AI Generate
        </button>
      </div>
      <textarea
        value={summary}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Briefly describe your career goals and key achievements..."
        rows={4}
        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

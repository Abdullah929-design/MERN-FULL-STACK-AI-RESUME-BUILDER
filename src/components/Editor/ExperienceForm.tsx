import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2, Sparkles, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';

export const ExperienceForm: React.FC = () => {
  const { resume, addExperience, updateExperience, removeExperience, incrementAIUsage, isAIALimitReached } = useResumeStore();
  const { experience } = resume.sections;
  const [isImproving, setIsImproving] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null);

  const handleImproveDesc = async (id: string, currentDesc: string) => {
    if (isAIALimitReached()) {
      alert("Daily AI limit reached. Try again tomorrow.");
      return;
    }
    if (!currentDesc) return;

    setIsImproving(id);
    try {
      const response = await axios.post('/api/ai', {
        type: 'improve',
        input: { text: currentDesc }
      });
      if (response.data.improved) {
        updateExperience(id, { description: response.data.improved });
        incrementAIUsage();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsImproving(null);
    }
  };

  return (
    <div className="space-y-6">
      {experience.map((exp, index) => (
        <div key={exp.id} className="border border-gray-100 rounded-xl overflow-hidden bg-white group shadow-sm hover:shadow-md transition-all">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 bg-gray-50/50"
            onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
                {index + 1}
              </span>
              <h3 className="font-medium text-gray-800">
                {exp.role || "Job Role"} {exp.company ? `@ ${exp.company}` : ""}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }}
                className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
              {expandedId === exp.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
            </div>
          </div>

          {expandedId === exp.id && (
            <div className="p-4 space-y-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    placeholder="Google"
                    className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                    placeholder="Senior Developer"
                    className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    placeholder="Jan 2020"
                    className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">End Date</label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    placeholder="Present"
                    className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</label>
                  <button
                    onClick={() => handleImproveDesc(exp.id, exp.description)}
                    disabled={isImproving === exp.id}
                    className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 bg-orange-50 text-orange-600 rounded-md hover:bg-orange-100 transition-colors disabled:opacity-50"
                  >
                    {isImproving === exp.id ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    IMPROVE WITH AI
                  </button>
                </div>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:ring-1 focus:ring-orange-500 outline-none transition-all resize-none text-sm"
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addExperience}
        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50/30 transition-all flex items-center justify-center gap-2 group"
      >
        <Plus size={20} className="group-hover:scale-110 transition-transform" />
        <span className="font-semibold">Add Experience</span>
      </button>
    </div>
  );
};

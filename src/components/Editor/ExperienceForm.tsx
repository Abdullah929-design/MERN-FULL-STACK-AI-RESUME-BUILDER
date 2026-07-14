import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2, Sparkles, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';

export const ExperienceForm: React.FC = () => {
  const { resume, addExperience, updateExperience, removeExperience, incrementAIUsage, isAIALimitReached, setShowAILimitPopup } = useResumeStore();
  const { experience } = resume.sections;
  const [isImproving, setIsImproving] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null);

  const handleImproveDesc = async (id: string, currentDesc: string) => {
    if (isAIALimitReached('description')) {
      setShowAILimitPopup(true);
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
        incrementAIUsage('description');
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
              <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
                  {index + 1}
                </span>
                <h3 className="font-bold text-gray-800 text-sm truncate">
                  {exp.role || "Job Role"} {exp.company ? `@ ${exp.company}` : ""}
                </h3>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button 
                  onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 bg-red-50/50 rounded-xl transition-all border border-red-100"
                  title="Delete Experience"
                >
                  <Trash2 size={16} />
                </button>
                <div className="text-gray-400 p-1">
                  {expandedId === exp.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
            </div>

          {expandedId === exp.id && (
            <div className="p-4 space-y-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    placeholder="Company Name"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Role</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                    placeholder="Job Title"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    placeholder="Month, Year"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">End Date</label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    placeholder="Present or End Month"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium transition-all shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
                  <button
                    onClick={() => handleImproveDesc(exp.id, exp.description)}
                    disabled={isImproving === exp.id}
                    className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 bg-orange-50 text-orange-600 rounded-md hover:bg-orange-100 transition-colors disabled:opacity-50"
                  >
                    {isImproving === exp.id ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    IMPROVE
                  </button>
                </div>
                <div className="relative">
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium transition-all resize-none pb-8 shadow-sm"
                  />
                  <div className="absolute bottom-2 right-3 text-[10px] font-bold text-gray-400 bg-white/80 px-1 rounded">
                    {exp.description.length}/500
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addExperience}
        disabled={experience.length >= 5}
        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={20} className="group-hover:scale-110 transition-transform" />
        <span className="font-semibold">
          {experience.length >= 5 ? 'Experience Limit Reached (Max 5)' : 'Add Experience'}
        </span>
      </button>
    </div>
  );
};

import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';


export const EducationForm: React.FC = () => {
  const { resume, addEducation, updateEducation, removeEducation } = useResumeStore();
  const { education } = resume.sections;
  const [expandedId, setExpandedId] = useState<string | null>(education[0]?.id || null);

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={edu.id} className="border border-gray-100 rounded-xl overflow-hidden bg-white group shadow-sm hover:shadow-md transition-all">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 bg-gray-50/50"
            onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs font-bold">
                {index + 1}
              </span>
              <h3 className="font-bold text-gray-800 text-sm truncate">
                {edu.degree || "Degree"} {edu.institution ? `@ ${edu.institution}` : ""}
              </h3>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button 
                onClick={(e) => { e.stopPropagation(); removeEducation(edu.id); }}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 bg-red-50/50 rounded-xl transition-all border border-red-100"
                title="Delete Education"
              >
                <Trash2 size={16} />
              </button>
              <div className="text-gray-400 p-1">
                {expandedId === edu.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
          </div>

          {expandedId === edu.id && (
            <div className="p-4 space-y-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    placeholder="University or School Name"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm font-medium transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="e.g., Bachelor of Science"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm font-medium transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Year</label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, { year: e.target.value })}
                    placeholder="Graduation Year or Range (e.g., 2019 - 2023)"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm font-medium transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addEducation}
        disabled={education.length >= 5}
        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-green-600 hover:border-green-200 hover:bg-green-50/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={20} className="group-hover:scale-110 transition-transform" />
        <span className="font-semibold">
          {education.length >= 5 ? 'Education Limit Reached (Max 5)' : 'Add Education'}
        </span>
      </button>
    </div>
  );
};

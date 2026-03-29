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
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs font-bold">
                {index + 1}
              </span>
              <h3 className="font-medium text-gray-800">
                {edu.degree || "Degree"} {edu.institution ? `@ ${edu.institution}` : ""}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); removeEducation(edu.id); }}
                className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
              {expandedId === edu.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
            </div>
          </div>

          {expandedId === edu.id && (
            <div className="p-4 space-y-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    placeholder="Stanford University"
                    className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:ring-1 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="B.S. Computer Science"
                    className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:ring-1 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Year</label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, { year: e.target.value })}
                    placeholder="2016 - 2020"
                    className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:ring-1 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addEducation}
        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-green-600 hover:border-green-200 hover:bg-green-50/30 transition-all flex items-center justify-center gap-2 group"
      >
        <Plus size={20} className="group-hover:scale-110 transition-transform" />
        <span className="font-semibold">Add Education</span>
      </button>
    </div>
  );
};

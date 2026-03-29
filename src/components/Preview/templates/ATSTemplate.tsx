import React from 'react';
import type { Resume } from '../../../types/resume';


interface TemplateProps {
  resume: Resume;
}

export const ATSTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills } = resume.sections;

  return (
    <div className="p-12 bg-white min-h-[1100px] text-black font-sans leading-snug">
      {/* Header */}
      <div className="border-b-[3px] border-black pb-4 mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter">{personal.name || "YOUR NAME"}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold mt-2">
          {personal.title && <span className="uppercase">{personal.title}</span>}
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      <div className="space-y-8">
        {/* Summary */}
        {summary && (
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] bg-gray-100 px-2 py-1">Professional Summary</h2>
            <p className="text-sm leading-relaxed px-2">
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] bg-gray-100 px-2 py-1">Core Experience</h2>
            <div className="space-y-6 px-2">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-bold uppercase">{exp.role || "Role Name"}</h3>
                    <span className="text-sm font-bold">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-700 italic border-b border-gray-100 pb-1">{exp.company || "Company Name"}</p>
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap pt-1">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] bg-gray-100 px-2 py-1">Education & Certifications</h2>
            <div className="space-y-4 px-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold uppercase">{edu.institution || "Institution"}</h3>
                    <p className="text-xs font-medium text-gray-600 italic">{edu.degree || "Degree"}</p>
                  </div>
                  <span className="text-sm font-bold">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] bg-gray-100 px-2 py-1">Technical Skills</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 px-2 pt-2">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                  <span className="text-sm font-bold">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import type { Resume } from '../../../types/resume';


interface TemplateProps {
  resume: Resume;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills } = resume.sections;

  return (
    <div className="p-16 bg-white min-h-[1100px] text-gray-900 font-serif leading-relaxed">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-900 pb-8 mb-10 space-y-3">
        <h1 className="text-4xl font-bold tracking-tight uppercase">{personal.name || "YOUR NAME"}</h1>
        <p className="text-lg font-medium text-gray-700">{personal.title || "PROFESSIONAL TITLE"}</p>
        <div className="flex justify-center gap-6 text-sm italic text-gray-600">
          {personal.location && <span>{personal.location}</span>}
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
        </div>
      </div>

      <div className="space-y-10">
        {/* Profile */}
        {summary && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-900 rounded-full" />
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed indent-8">
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-900 rounded-full" />
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between items-baseline font-bold italic">
                    <h3 className="text-lg text-gray-900">{exp.role || "Role Name"}</h3>
                    <span className="text-sm font-normal text-gray-600">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-800 uppercase tracking-wide">{exp.company || "Company Name"}</p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap pl-4 italic border-l-2 border-gray-100">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-900 rounded-full" />
              EDUCATION
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-gray-900">{edu.institution || "Institution"}</h3>
                    <p className="text-sm text-gray-700 italic">{edu.degree || "Degree"}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-600 italic">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="space-y-3">
             <h2 className="text-xl font-bold border-b border-gray-300 pb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-900 rounded-full" />
              TECHNICAL SKILLS
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-bold">Expertise in: </span>
              {skills.join(' • ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

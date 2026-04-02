import React from 'react';
import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const CompactTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  return (
    <div className="bg-white min-h-[1100px] font-mono text-[#0d0d0d]">
      {/* Header */}
      <div className="bg-[#0d0d0d] text-white px-10 py-8 flex justify-between items-start">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight leading-none">{personal.name || 'YOUR NAME'}</h1>
          <p className="text-green-400 text-sm font-medium tracking-wider">{personal.title || 'Professional Title'}</p>
        </div>
        <div className="text-right space-y-1 text-xs text-gray-400 font-mono">
          {personal.email && <p>✉ {personal.email}</p>}
          {personal.phone && <p>✆ {personal.phone}</p>}
          {personal.location && <p>⌖ {personal.location}</p>}
        </div>
      </div>

      {/* Divider with green terminal cursor */}
      <div className="flex items-center bg-[#111] px-10 py-2">
        <span className="text-green-400 text-xs font-mono">$ resume --show-all</span>
        <span className="ml-1 w-2 h-3.5 bg-green-400 animate-pulse inline-block" />
      </div>

      <div className="px-10 py-8 grid grid-cols-[1fr_260px] gap-8">
        {/* Left main column */}
        <div className="space-y-8">
          {summary && (
            <div className="space-y-2">
              <CompactLabel text="// summary" />
              <p className="text-[13px] text-gray-600 leading-relaxed">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="space-y-4">
              <CompactLabel text="// experience" />
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-sm font-bold text-[#0d0d0d] uppercase">{exp.role || 'Role Name'}</h3>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">
                        [{exp.startDate} → {exp.endDate}]
                      </span>
                    </div>
                    <p className="text-xs font-bold text-green-600 uppercase tracking-wider">{exp.company || 'Company'}</p>
                    <p className="text-[12px] text-gray-500 leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-gray-100">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections */}
          {customSections?.map((section) => (
            <div key={section.id} className="space-y-4">
              <CompactLabel text={`// ${section.title.toLowerCase()}`} />
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-sm font-bold uppercase">{item.title || 'Title'}</h3>
                      {item.date && <span className="text-[10px] text-gray-400 font-mono">[{item.date}]</span>}
                    </div>
                    {item.subtitle && <p className="text-xs font-bold text-green-600 uppercase tracking-wider">{item.subtitle}</p>}
                    {item.description && <p className="text-[12px] text-gray-500 leading-relaxed pl-3 border-l-2 border-gray-100">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right compact sidebar */}
        <div className="space-y-8 border-l-2 border-dashed border-gray-200 pl-8">
          {education.length > 0 && (
            <div className="space-y-4">
              <CompactLabel text="// education" />
              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <h3 className="text-xs font-bold text-[#0d0d0d] uppercase leading-tight">{edu.institution || 'Institution'}</h3>
                    <p className="text-[11px] text-gray-500 italic">{edu.degree}</p>
                    <p className="text-[10px] font-bold text-green-500 font-mono">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {skills.length > 0 && (
            <div className="space-y-3">
              <CompactLabel text="// skills" />
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-[#f4f4f0] border border-gray-200 text-[11px] font-mono font-bold text-gray-700 rounded-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CompactLabel = ({ text }: { text: string }) => (
  <h2 className="text-xs font-bold text-green-600 uppercase tracking-wider border-b border-gray-100 pb-1 font-mono">
    {text}
  </h2>
);

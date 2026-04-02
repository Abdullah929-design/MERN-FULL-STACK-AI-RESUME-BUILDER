import React from 'react';
import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  return (
    <div className="p-16 bg-white min-h-[1100px] text-slate-800 font-sans leading-relaxed max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start gap-12 border-b-2 border-slate-100 pb-10 mb-10">
        <div className="space-y-4 flex-1">
          <h1 className="text-4xl font-light tracking-tight text-slate-900 leading-tight italic">
            {personal.name || "YOUR NAME"}
          </h1>
          <p className="text-xl font-medium tracking-widest uppercase text-slate-500">
            {personal.title || "PROFESSIONAL TITLE"}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400 font-medium">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
        </div>
        {personal.photoUrl && (
          <img 
            src={personal.photoUrl} 
            alt={personal.name} 
            className="w-24 h-24 rounded-full object-cover grayscale opacity-80"
          />
        )}
      </div>

      <div className="space-y-12">
        {summary && (
          <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">Profile</h2>
            <p className="text-sm leading-relaxed text-slate-600 text-justify italic">
              {summary}
            </p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">Experience</h2>
            <div className="space-y-12">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-3 relative pl-6 border-l border-slate-100">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-bold text-slate-900 tracking-wide uppercase italic">{exp.role || "Role Name"}</h3>
                    <span className="text-xs font-black text-slate-300 uppercase">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-400">{exp.company || "Company Name"}</p>
                  <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-wrap">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 uppercase italic leading-tight">{edu.institution || "Institution"}</h3>
                  <div className="flex justify-between items-baseline text-xs font-bold">
                    <p className="text-slate-400 italic">{edu.degree}</p>
                    <span className="text-slate-300">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">Skills</h2>
            <p className="text-sm text-slate-500 leading-relaxed tracking-wide italic">
              {skills.join(' • ')}
            </p>
          </div>
        )}

        {/* Custom Sections */}
        {customSections?.map((section) => (
          <div key={section.id} className="space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">{section.title}</h2>
            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.id} className="space-y-1 relative pl-6 border-l border-slate-100">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold text-slate-900 uppercase italic">{item.title || "Title"}</h3>
                    <span className="text-xs font-black text-slate-300 uppercase italic">{item.date}</span>
                  </div>
                  {item.subtitle && <p className="text-xs font-bold text-slate-400">{item.subtitle}</p>}
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

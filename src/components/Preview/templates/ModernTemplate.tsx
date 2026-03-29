import React from 'react';
import type { Resume } from '../../../types/resume';


interface TemplateProps {
  resume: Resume;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills } = resume.sections;

  return (
    <div className="flex h-full min-h-[1100px] text-gray-800 font-sans">
      {/* Sidebar */}
      <div className="w-[35%] bg-blue-900 text-white p-10 flex flex-col gap-10">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold leading-tight uppercase tracking-widest">{personal.name || "YOUR NAME"}</h1>
          <p className="text-blue-200 font-medium tracking-wide uppercase text-sm">{personal.title || "PROFESSIONAL TITLE"}</p>
        </div>

        <div className="space-y-6">
          <SectionTitle title="CONTACT" light />
          <div className="space-y-3 text-sm text-blue-100">
            {personal.email && <ContactItem label="Email" value={personal.email} />}
            {personal.phone && <ContactItem label="Phone" value={personal.phone} />}
            {personal.location && <ContactItem label="Location" value={personal.location} />}
          </div>
        </div>

        <div className="space-y-6">
          <SectionTitle title="SKILLS" light />
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-blue-800 text-blue-100 rounded text-xs font-medium border border-blue-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[65%] bg-white p-12 flex flex-col gap-10">
        {summary && (
          <div className="space-y-4">
            <SectionTitle title="PROFILE" />
            <p className="text-sm leading-relaxed text-gray-600 italic">
              {summary}
            </p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="space-y-6">
            <SectionTitle title="EXPERIENCE" />
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-2 relative pl-4 border-l-2 border-blue-100">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 uppercase tracking-wide">{exp.role || "Role Name"}</h3>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase italic">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">{exp.company || "Company Name"}</p>
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="space-y-6">
            <SectionTitle title="EDUCATION" />
            <div className="grid grid-cols-1 gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1 relative pl-4 border-l-2 border-green-100">
                   <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">{edu.institution || "Institution"}</h3>
                   <div className="flex justify-between items-center text-xs text-gray-600 italic">
                     <span>{edu.degree || "Degree"}</span>
                     <span className="text-xs font-bold text-green-600">{edu.year}</span>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SectionTitle = ({ title, light = false }: { title: string; light?: boolean }) => (
  <h2 className={`text-sm font-black tracking-[0.2em] pb-2 border-b-2 ${light ? 'text-blue-300 border-blue-800' : 'text-blue-900 border-blue-100'}`}>
    {title}
  </h2>
);

const ContactItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <span className="block text-[10px] uppercase font-bold text-blue-400">{label}</span>
    <span className="block break-all">{value}</span>
  </div>
);

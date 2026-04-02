import React from 'react';
import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '1056px',
        maxWidth: '816px',
        width: '100%',
        margin: '0 auto',
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        color: '#1e293b',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* ════ SIDEBAR ════ */}
      <div
        style={{
          width: '260px',
          flexShrink: 0,
          background: '#1e3a5f',
          color: '#ffffff',
          padding: '36px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}
      >
        {/* Name + title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
          }}
        >
          {personal.photoUrl && (
            <img
              src={personal.photoUrl}
              alt={personal.name}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid rgba(255,255,255,0.12)',
              }}
            />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h1
              style={{
                fontSize: '18px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              {personal.name || 'YOUR NAME'}
            </h1>
            <p
              style={{
                fontSize: '9px',
                fontWeight: 600,
                color: '#93c5fd',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                margin: 0,
              }}
            >
              {personal.title || 'PROFESSIONAL TITLE'}
            </p>
          </div>
        </div>

        {/* Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <SidebarLabel text="Contact" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {personal.email && <ContactItem label="Email" value={personal.email} />}
            {personal.phone && <ContactItem label="Phone" value={personal.phone} />}
            {personal.location && <ContactItem label="Location" value={personal.location} />}
          </div>
        </div>

        {/* Skills — clean list, no badges */}
        {skills.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <SidebarLabel text="Skills" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {skills.map((skill) => (
                <div
                  key={skill}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#93c5fd',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      color: '#e0eaff',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ════ MAIN CONTENT ════ */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          background: '#ffffff',
          padding: '36px 40px 36px 36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Summary */}
        {summary && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <MainLabel text="Profile" />
            <p
              style={{
                fontSize: '11.5px',
                lineHeight: 1.72,
                color: '#475569',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <MainLabel text="Experience" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  style={{
                    paddingLeft: '12px',
                    borderLeft: '2px solid #dbeafe',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#0f172a',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        margin: 0,
                      }}
                    >
                      {exp.role || 'Role Name'}
                    </h3>
                    <span
                      style={{
                        fontSize: '8.5px',
                        fontWeight: 700,
                        color: '#2563eb',
                        textTransform: 'uppercase',
                        fontStyle: 'italic',
                        whiteSpace: 'nowrap',
                        marginLeft: '10px',
                        flexShrink: 0,
                      }}
                    >
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 600,
                      color: '#334155',
                      margin: 0,
                    }}
                  >
                    {exp.company || 'Company Name'}
                  </p>
                  {exp.description && (
                    <p
                      style={{
                        fontSize: '10.5px',
                        color: '#475569',
                        lineHeight: 1.65,
                        margin: '2px 0 0',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <MainLabel text="Education" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {education.map((edu) => (
                <div
                  key={edu.id}
                  style={{
                    paddingLeft: '12px',
                    borderLeft: '2px solid #dcfce7',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#0f172a',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      margin: 0,
                    }}
                  >
                    {edu.institution || 'Institution'}
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10.5px',
                        color: '#475569',
                        fontStyle: 'italic',
                      }}
                    >
                      {edu.degree || 'Degree'}
                    </span>
                    <span
                      style={{
                        fontSize: '9.5px',
                        fontWeight: 700,
                        color: '#16a34a',
                        whiteSpace: 'nowrap',
                        marginLeft: '10px',
                        flexShrink: 0,
                      }}
                    >
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections?.map((section) => (
          <section key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <MainLabel text={section.title} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {section.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    paddingLeft: '12px',
                    borderLeft: '2px solid #f1f5f9',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: '#0f172a',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        margin: 0,
                      }}
                    >
                      {item.title || 'Title'}
                    </h3>
                    {item.date && (
                      <span
                        style={{
                          fontSize: '8.5px',
                          fontWeight: 700,
                          color: '#64748b',
                          fontStyle: 'italic',
                          whiteSpace: 'nowrap',
                          marginLeft: '10px',
                          flexShrink: 0,
                        }}
                      >
                        {item.date}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <p
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 600,
                        color: '#334155',
                        margin: 0,
                      }}
                    >
                      {item.subtitle}
                    </p>
                  )}
                  {item.description && (
                    <p
                      style={{
                        fontSize: '10.5px',
                        color: '#475569',
                        lineHeight: 1.65,
                        margin: '2px 0 0',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

/* ── Sidebar section label ── */
const SidebarLabel = ({ text }: { text: string }) => (
  <h2
    style={{
      fontSize: '8.5px',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      color: '#93c5fd',
      borderBottom: '1px solid rgba(255,255,255,0.12)',
      paddingBottom: '5px',
      margin: 0,
    }}
  >
    {text}
  </h2>
);

/* ── Main column section label ── */
const MainLabel = ({ text }: { text: string }) => (
  <h2
    style={{
      fontSize: '8.5px',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      color: '#1e3a5f',
      borderBottom: '2px solid #dbeafe',
      paddingBottom: '5px',
      margin: 0,
    }}
  >
    {text}
  </h2>
);

/* ── Contact item ── */
const ContactItem = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
    <span
      style={{
        fontSize: '8px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: '#60a5fa',
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontSize: '10.5px',
        color: '#dbeafe',
        wordBreak: 'break-all',
        fontWeight: 400,
      }}
    >
      {value}
    </span>
  </div>
);

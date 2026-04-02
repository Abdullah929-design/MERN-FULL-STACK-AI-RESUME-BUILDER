import React from 'react';
import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '1056px',
        maxWidth: '816px',
        width: '100%',
        margin: '0 auto',
        background: '#ffffff',
        color: '#0f172a',
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* ── Dark header bar ── */}
      <div
        style={{
          background: '#0f172a',
          color: '#ffffff',
          padding: '32px 44px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              borderBottom: '3px solid #6366f1',
              paddingBottom: '6px',
              display: 'inline-block',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {personal.name || 'YOUR NAME'}
          </h1>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 500,
              color: '#a5b4fc',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              margin: 0,
            }}
          >
            {personal.title || 'PROFESSIONAL TITLE'}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0 20px',
              fontSize: '10px',
              color: '#94a3b8',
              fontWeight: 500,
              marginTop: '4px',
            }}
          >
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
        </div>

        {personal.photoUrl && (
          <img
            src={personal.photoUrl}
            alt={personal.name}
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '10px',
              objectFit: 'cover',
              border: '3px solid #1e293b',
              flexShrink: 0,
            }}
          />
        )}
      </div>

      {/* ── Two-column body ── */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {/* ════ LEFT MAIN COLUMN ════ */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: '28px 32px 28px 44px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            borderRight: '1px solid #f1f5f9',
          }}
        >
          {/* Summary */}
          {summary && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <ExecLabel text="Executive Profile" />
              <p
                style={{
                  fontSize: '11.5px',
                  lineHeight: 1.72,
                  color: '#334155',
                  textAlign: 'justify',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {summary}
              </p>
            </section>
          )}

          {/* Education — right after summary */}
          {education.length > 0 && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ExecLabel text="Academic Background" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      paddingBottom: '8px',
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <h3
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#0f172a',
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em',
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {edu.institution || 'Institution'}
                      </h3>
                      <p
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: '#6366f1',
                          fontStyle: 'italic',
                          margin: 0,
                        }}
                      >
                        {edu.degree}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 900,
                        color: '#94a3b8',
                        whiteSpace: 'nowrap',
                        marginLeft: '12px',
                        flexShrink: 0,
                      }}
                    >
                      {edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ExecLabel text="Professional Experience" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#0f172a',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          margin: 0,
                        }}
                      >
                        {exp.role || 'Role Name'}
                      </h3>
                      <span
                        style={{
                          fontSize: '8.5px',
                          fontWeight: 900,
                          color: '#94a3b8',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          whiteSpace: 'nowrap',
                          marginLeft: '12px',
                          flexShrink: 0,
                        }}
                      >
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#6366f1',
                        fontStyle: 'italic',
                        margin: 0,
                      }}
                    >
                      {exp.company || 'Company Name'}
                    </p>
                    {exp.description && (
                      <p
                        style={{
                          fontSize: '11px',
                          color: '#475569',
                          lineHeight: 1.65,
                          margin: '3px 0 0',
                          paddingLeft: '12px',
                          borderLeft: '2px solid #f1f5f9',
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

          {/* Custom Sections — in main column so they never crowd the sidebar */}
          {customSections?.map((section) => (
            <section key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ExecLabel text={section.title} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {section.items.map((item) => (
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#0f172a',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          margin: 0,
                        }}
                      >
                        {item.title || 'Title'}
                      </h3>
                      {item.date && (
                        <span
                          style={{
                            fontSize: '8.5px',
                            fontWeight: 900,
                            color: '#94a3b8',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            whiteSpace: 'nowrap',
                            marginLeft: '12px',
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
                          fontSize: '10px',
                          fontWeight: 700,
                          color: '#6366f1',
                          fontStyle: 'italic',
                          margin: 0,
                        }}
                      >
                        {item.subtitle}
                      </p>
                    )}
                    {item.description && (
                      <p
                        style={{
                          fontSize: '11px',
                          color: '#475569',
                          lineHeight: 1.65,
                          margin: '2px 0 0',
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

        {/* ════ RIGHT SIDEBAR — Skills then Education, no custom sections ════ */}
        <div
          style={{
            width: '220px',
            flexShrink: 0,
            background: 'rgba(248,250,252,0.6)',
            padding: '28px 28px 28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
          }}
        >
          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ExecLabel text="Core Expertise" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {skills.map((skill) => (
                  <div
                    key={skill}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '9px',
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#6366f1',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: '#334155',
                      }}
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}


        </div>
      </div>
    </div>
  );
};

const ExecLabel = ({ text }: { text: string }) => (
  <h2
    style={{
      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      fontSize: '8px',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.3em',
      color: '#6366f1',
      margin: 0,
      paddingBottom: '0',
    }}
  >
    {text}
  </h2>
);

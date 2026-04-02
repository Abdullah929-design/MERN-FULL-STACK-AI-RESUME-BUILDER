import React from 'react';
import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const AcademiaTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  return (
    <div
      style={{
        fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
        background: '#fdf8f0',
        color: '#2a2118',
        width: '100%',
        minHeight: '1056px',
        maxWidth: '816px',
        margin: '0 auto',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Top border ── */}
      <div style={{ height: '5px', background: '#8b4513', flexShrink: 0 }} />
      <div style={{ height: '2px', background: '#d4a96a', margin: '3px 28px 0', flexShrink: 0 }} />
      <div style={{ height: '1px', background: 'rgba(201,149,74,0.30)', margin: '2px 44px 0', flexShrink: 0 }} />

      {/* ── Centered Header ── */}
      <header
        style={{
          textAlign: 'center',
          padding: '28px 64px 20px',
          borderBottom: '2px double rgba(139,69,19,0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#2a2118',
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {personal.name || 'YOUR NAME'}
        </h1>

        {personal.title && (
          <p
            style={{
              fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
              fontSize: '8.5px',
              fontWeight: 700,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#8b4513',
              margin: 0,
            }}
          >
            {personal.title}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0 14px',
            fontSize: '9.5px',
            color: '#7a6a55',
            fontStyle: 'italic',
            marginTop: '2px',
          }}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.location && <span>· {personal.location}</span>}
          {personal.phone && <span>· {personal.phone}</span>}
        </div>
      </header>

      {/* ── Two-column body ── */}
      {/*
        LEFT  (flex: 1): Summary → Experience → Custom Sections — all flow top-to-bottom naturally
        RIGHT (220px sidebar): Education → Skills — stacked, no gap issue since sidebar is independent
      */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          minHeight: 0,
        }}
      >

        {/* ════ LEFT MAIN COLUMN ════ */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: '22px 28px 28px 64px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            borderRight: '1px solid rgba(212,169,106,0.30)',
          }}
        >

          {/* Summary */}
          {summary && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <AcademiaLabel text="Abstract" />
              <p
                style={{
                  fontSize: '11px',
                  lineHeight: 1.72,
                  color: '#3d2f20',
                  textAlign: 'justify',
                  textIndent: '24px',
                  margin: 0,
                }}
              >
                {summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <AcademiaLabel text="Academic & Professional Experience" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          fontStyle: 'italic',
                          color: '#2a2118',
                          margin: 0,
                        }}
                      >
                        {exp.role || 'Role Name'}
                      </h3>
                      <span
                        style={{
                          fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
                          fontSize: '7.5px',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#8b4513',
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
                        fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
                        fontSize: '8.5px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#7a6a55',
                        margin: 0,
                      }}
                    >
                      {exp.company || 'Institution / Organization'}
                    </p>

                    {exp.description && (
                      <p
                        style={{
                          fontSize: '10px',
                          lineHeight: 1.65,
                          color: '#3d2f20',
                          paddingLeft: '11px',
                          borderLeft: '2px solid rgba(212,169,106,0.5)',
                          margin: '3px 0 0',
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

          {/* Custom Sections — flow directly after experience, no gap */}
          {customSections?.map((section) => (
            <section key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <AcademiaLabel text={section.title} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      paddingBottom: '9px',
                      borderBottom: '1px dashed rgba(212,169,106,0.35)',
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
                          fontStyle: 'italic',
                          color: '#2a2118',
                          margin: 0,
                        }}
                      >
                        {item.title || 'Title'}
                      </h3>
                      {item.date && (
                        <span
                          style={{
                            fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
                            fontSize: '7.5px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: '#8b4513',
                            marginLeft: '10px',
                            whiteSpace: 'nowrap',
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
                          fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
                          fontSize: '8.5px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: '#7a6a55',
                          margin: 0,
                        }}
                      >
                        {item.subtitle}
                      </p>
                    )}

                    {item.description && (
                      <p
                        style={{
                          fontSize: '10px',
                          lineHeight: 1.65,
                          color: '#3d2f20',
                          paddingLeft: '11px',
                          borderLeft: '2px solid rgba(212,169,106,0.5)',
                          margin: '3px 0 0',
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

        {/* ════ RIGHT SIDEBAR ════ */}
        {/*
          Education and Skills stack independently in their own column.
          No matter how many skills vs education entries there are,
          they just flow downward — zero gap risk.
        */}
        <div
          style={{
            width: '210px',
            flexShrink: 0,
            padding: '22px 28px 28px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            background: 'rgba(139,69,19,0.03)',
          }}
        >

          {/* Education */}
          {education.length > 0 && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <AcademiaLabel text="Education" compact />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    style={{
                      paddingBottom: '10px',
                      borderBottom: '1px dashed rgba(212,169,106,0.38)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#2a2118',
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {edu.institution || 'University / Institution'}
                    </h3>
                    <p
                      style={{
                        fontSize: '10px',
                        fontStyle: 'italic',
                        color: '#5a4a35',
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {edu.degree}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
                        fontSize: '7.5px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#8b4513',
                        margin: 0,
                      }}
                    >
                      {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <AcademiaLabel text="Research Areas" compact />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {skills.map((skill) => (
                  <div
                    key={skill}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '6px',
                      fontSize: '10.5px',
                      color: '#3d2f20',
                    }}
                  >
                    <span style={{ color: '#8b4513', fontSize: '9px', lineHeight: 1.7, flexShrink: 0 }}>❧</span>
                    <span style={{ lineHeight: 1.5 }}>{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* ── Bottom border ── */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ height: '1px', background: 'rgba(201,149,74,0.30)', margin: '0 44px 2px' }} />
        <div style={{ height: '2px', background: '#d4a96a', margin: '0 28px 3px' }} />
        <div style={{ height: '5px', background: '#8b4513' }} />
      </div>
    </div>
  );
};

/* ── Section label — compact prop shrinks letter-spacing for narrow sidebar ── */
const AcademiaLabel = ({ text, compact }: { text: string; compact?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
    <span style={{ color: '#8b4513', fontSize: '8px', lineHeight: 1, flexShrink: 0 }}>✦</span>
    <h2
      style={{
        fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
        fontSize: '7.5px',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: compact ? '0.22em' : '0.36em',
        color: '#8b4513',
        margin: 0,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </h2>
    <div style={{ flex: 1, height: '1px', background: 'rgba(212,169,106,0.45)' }} />
    <span style={{ color: '#8b4513', fontSize: '8px', lineHeight: 1, flexShrink: 0 }}>✦</span>
  </div>
);

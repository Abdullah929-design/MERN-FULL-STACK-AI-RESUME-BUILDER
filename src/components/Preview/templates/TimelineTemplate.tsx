import React from 'react';
import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const TimelineTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '1056px',
        maxWidth: '816px',
        width: '100%',
        margin: '0 auto',
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        color: '#111827',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: 'linear-gradient(to right, #4c1d95, #6d28d9)',
          color: '#ffffff',
          padding: '32px 44px 26px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {personal.name || 'YOUR NAME'}
        </h1>
        <p
          style={{
            fontSize: '9px',
            fontWeight: 500,
            color: '#ddd6fe',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            margin: 0,
          }}
        >
          {personal.title || 'Professional Title'}
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0 20px',
            fontSize: '9.5px',
            color: '#c4b5fd',
            fontWeight: 500,
            marginTop: '6px',
          }}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {/* ════ MAIN COLUMN ════ */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: '26px 28px 28px 44px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Summary */}
          {summary && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <SectionHeading text="Profile" />
              <p
                style={{
                  fontSize: '11px',
                  lineHeight: 1.72,
                  color: '#4b5563',
                  fontStyle: 'italic',
                  margin: 0,
                }}
              >
                {summary}
              </p>
            </section>
          )}

          {/* Education — right below summary */}
          {education.length > 0 && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <SectionHeading text="Education" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      paddingBottom: '8px',
                      borderBottom: '1px solid #f3f4f6',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <h3
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 900,
                          color: '#111827',
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em',
                          margin: 0,
                          lineHeight: 1.2,
                        }}
                      >
                        {edu.institution || 'Institution'}
                      </h3>
                      <p
                        style={{
                          fontSize: '10px',
                          color: '#6b7280',
                          fontStyle: 'italic',
                          margin: 0,
                        }}
                      >
                        {edu.degree}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: '8.5px',
                        fontWeight: 900,
                        color: '#7c3aed',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
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

          {/* Experience — timeline */}
          {experience.length > 0 && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <SectionHeading text="Career Timeline" />
              <div style={{ position: 'relative', marginTop: '4px' }}>
                {/* Vertical line */}
                <div
                  style={{
                    position: 'absolute',
                    left: '7px',
                    top: '8px',
                    bottom: '8px',
                    width: '2px',
                    background: '#ede9fe',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {experience.map((exp) => (
                    <div
                      key={exp.id}
                      style={{
                        position: 'relative',
                        paddingLeft: '30px',
                        paddingBottom: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      {/* Dot */}
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '4px',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: '#7c3aed',
                          border: '3px solid #ede9fe',
                          zIndex: 1,
                        }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h3
                          style={{
                            fontSize: '12.5px',
                            fontWeight: 900,
                            color: '#111827',
                            textTransform: 'uppercase',
                            letterSpacing: '-0.01em',
                            margin: 0,
                          }}
                        >
                          {exp.role || 'Role Name'}
                        </h3>
                        <span
                          style={{
                            fontSize: '8.5px',
                            fontWeight: 700,
                            color: '#a78bfa',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            whiteSpace: 'nowrap',
                            marginLeft: '10px',
                            flexShrink: 0,
                          }}
                        >
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: '8.5px',
                          fontWeight: 700,
                          color: '#7c3aed',
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          margin: 0,
                        }}
                      >
                        {exp.company || 'Company'}
                      </p>
                      {exp.description && (
                        <p
                          style={{
                            fontSize: '10.5px',
                            color: '#6b7280',
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
              </div>
            </section>
          )}

          {/* Custom Sections (Projects) — below experience, full width */}
          {customSections?.map((section) => (
            <section key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <SectionHeading text={section.title} />
              <div style={{ position: 'relative', marginTop: '4px' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '7px',
                    top: '8px',
                    bottom: '8px',
                    width: '2px',
                    background: '#ede9fe',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        position: 'relative',
                        paddingLeft: '30px',
                        paddingBottom: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '4px',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: '#a78bfa',
                          border: '3px solid #f5f3ff',
                          zIndex: 1,
                        }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h3
                          style={{
                            fontSize: '12px',
                            fontWeight: 900,
                            color: '#111827',
                            textTransform: 'uppercase',
                            letterSpacing: '-0.01em',
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
                              color: '#a78bfa',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
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
                            fontSize: '8.5px',
                            fontWeight: 700,
                            color: '#7c3aed',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
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
                            color: '#6b7280',
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
              </div>
            </section>
          ))}
        </div>

        {/* ════ SIDEBAR: Skills only ════ */}
        <div
          style={{
            width: '200px',
            flexShrink: 0,
            background: '#f9fafb',
            borderLeft: '1px solid #f3f4f6',
            padding: '26px 20px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <SideLabel text="Skills" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {skills.map((skill) => (
              <div key={skill} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    color: '#374151',
                  }}
                >
                  {skill}
                </span>
                <div
                  style={{
                    height: '2px',
                    borderRadius: '99px',
                    background: '#ede9fe',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: '75%',
                      background: '#7c3aed',
                      borderRadius: '99px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionHeading = ({ text }: { text: string }) => (
  <h2
    style={{
      fontSize: '8.5px',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.3em',
      color: '#6d28d9',
      borderBottom: '2px solid #ede9fe',
      paddingBottom: '5px',
      margin: 0,
    }}
  >
    {text}
  </h2>
);

const SideLabel = ({ text }: { text: string }) => (
  <h2
    style={{
      fontSize: '8.5px',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.3em',
      color: '#9ca3af',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '5px',
      margin: 0,
    }}
  >
    {text}
  </h2>
);

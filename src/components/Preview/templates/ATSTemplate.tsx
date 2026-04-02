import React from 'react';
import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const ATSTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  return (
    <div
      style={{
        fontFamily: "'Arial Narrow', Arial, 'Helvetica Neue', Helvetica, sans-serif",
        background: '#ffffff',
        color: '#000000',
        width: '100%',
        minHeight: '1056px',     /* US Letter at 96 dpi */
        maxWidth: '816px',        /* US Letter width — safe for A4 too */
        margin: '0 auto',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',       /* hard-clip — no second page in normal use */
        padding: '40px 52px 36px',
        lineHeight: 1.35,
      }}
    >

      {/* ── Header ── */}
      <div
        style={{
          borderBottom: '3px solid #000000',
          paddingBottom: '10px',
          marginBottom: '18px',
        }}
      >
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            margin: '0 0 5px',
            lineHeight: 1.1,
          }}
        >
          {personal.name || 'YOUR NAME'}
        </h1>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0 18px',
            fontSize: '10.5px',
            fontWeight: 700,
            marginTop: '4px',
          }}
        >
          {personal.title && (
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {personal.title}
            </span>
          )}
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, minHeight: 0 }}>

        {/* Summary */}
        {summary && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <ATSLabel text="Professional Summary" />
            <p
              style={{
                fontSize: '11px',
                lineHeight: 1.62,
                color: '#111111',
                margin: 0,
                padding: '0 2px',
              }}
            >
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <ATSLabel text="Core Experience" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 2px' }}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '12px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.02em',
                        margin: 0,
                      }}
                    >
                      {exp.role || 'Role Name'}
                    </h3>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        marginLeft: '12px',
                        flexShrink: 0,
                      }}
                    >
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      fontStyle: 'italic',
                      color: '#333333',
                      borderBottom: '1px solid #e5e5e5',
                      paddingBottom: '3px',
                      margin: 0,
                    }}
                  >
                    {exp.company || 'Company Name'}
                  </p>

                  {exp.description && (
                    <p
                      style={{
                        fontSize: '10.5px',
                        lineHeight: 1.6,
                        color: '#1a1a1a',
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
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <ATSLabel text="Education & Certifications" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', padding: '0 2px' }}>
              {education.map((edu) => (
                <div
                  key={edu.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    <h3
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.02em',
                        margin: 0,
                      }}
                    >
                      {edu.institution || 'Institution'}
                    </h3>
                    <p
                      style={{
                        fontSize: '10px',
                        fontStyle: 'italic',
                        color: '#444444',
                        margin: 0,
                        fontWeight: 500,
                      }}
                    >
                      {edu.degree || 'Degree'}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
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
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <ATSLabel text="Technical Skills" />
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px 24px',
                padding: '2px 2px 0',
              }}
            >
              {skills.map((skill) => (
                <div
                  key={skill}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <div
                    style={{
                      width: '5px',
                      height: '5px',
                      background: '#000000',
                      borderRadius: '50%',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: '10.5px', fontWeight: 700 }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {customSections?.map((section) => (
          <div key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <ATSLabel text={section.title} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 2px' }}>
              {section.items.map((item) => (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '12px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.02em',
                        margin: 0,
                      }}
                    >
                      {item.title || 'Title'}
                    </h3>
                    {item.date && (
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
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
                        fontSize: '10.5px',
                        fontWeight: 700,
                        fontStyle: 'italic',
                        color: '#333333',
                        borderBottom: '1px solid #e5e5e5',
                        paddingBottom: '3px',
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
                        lineHeight: 1.6,
                        color: '#1a1a1a',
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
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── ATS section label — plain, scannable, no decorative weight ── */
const ATSLabel = ({ text }: { text: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}
  >
    <h2
      style={{
        fontFamily: "'Arial Narrow', Arial, 'Helvetica Neue', Helvetica, sans-serif",
        fontSize: '9.5px',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        margin: 0,
        padding: '3px 7px',
        background: '#f0f0f0',
        whiteSpace: 'nowrap',
        color: '#000000',
      }}
    >
      {text}
    </h2>
    <div style={{ flex: 1, height: '1.5px', background: '#000000' }} />
  </div>
);

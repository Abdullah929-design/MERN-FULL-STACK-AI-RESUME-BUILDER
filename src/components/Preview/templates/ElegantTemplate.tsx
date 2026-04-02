import React from 'react';
import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const ElegantTemplate: React.FC<TemplateProps> = ({ resume }) => {
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
        background: '#fbfbf9',
        color: '#2c312e',
        fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* ── Top accent banner ── */}
      <div style={{ height: '5px', background: '#6b8e23', width: '100%', flexShrink: 0 }} />

      {/* ── Header ── */}
      <div
        style={{
          padding: '36px 56px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '3px solid rgba(107,142,35,0.12)',
          flexShrink: 0,
          gap: '24px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <h1
            style={{
              fontSize: '38px',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              color: '#1a1d1b',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {personal.name || 'YOUR NAME'}
          </h1>
          <p
            style={{
              fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
              fontSize: '9px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.4em',
              color: '#6b8e23',
              opacity: 0.8,
              margin: 0,
            }}
          >
            {personal.title || 'PROFESSIONAL TITLE'}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0 24px',
              fontSize: '9.5px',
              fontWeight: 700,
              color: '#8a918e',
              fontStyle: 'italic',
              letterSpacing: '0.08em',
              marginTop: '8px',
            }}
          >
            {personal.email && (
              <span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(107,142,35,0.3)' }}>
                {personal.email}
              </span>
            )}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
        </div>

        {personal.photoUrl && (
          <div
            style={{
              padding: '6px',
              borderRadius: '50%',
              border: '1px solid rgba(107,142,35,0.2)',
              flexShrink: 0,
            }}
          >
            <img
              src={personal.photoUrl}
              alt={personal.name}
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                objectFit: 'cover',
                filter: 'sepia(0.3)',
              }}
            />
          </div>
        )}
      </div>

      {/* ── Two-column body ── */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          gap: '0',
          minHeight: 0,
        }}
      >
        {/* ════ LEFT MAIN COLUMN ════ */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: '28px 36px 28px 56px',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            borderRight: '1px solid rgba(107,142,35,0.10)',
          }}
        >
          {/* Summary */}
          {summary && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ElegantLabel text="Profile" />
              <p
                style={{
                  fontSize: '12px',
                  lineHeight: 1.78,
                  color: '#4a514d',
                  textAlign: 'justify',
                  margin: 0,
                }}
              >
                {summary}
              </p>
            </section>
          )}

          {/* Education — right after profile summary */}
          {education.length > 0 && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ElegantLabel text="Education" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      paddingBottom: '8px',
                      borderBottom: '1px solid rgba(107,142,35,0.10)',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <h3
                        style={{
                          fontSize: '12px',
                          fontWeight: 400,
                          fontStyle: 'italic',
                          letterSpacing: '0.02em',
                          color: '#1a1d1b',
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {edu.institution || 'Institution'}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
                          fontSize: '9px',
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          letterSpacing: '-0.01em',
                          color: '#8a918e',
                          fontStyle: 'italic',
                          margin: 0,
                        }}
                      >
                        {edu.degree}
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
                        fontSize: '8px',
                        fontWeight: 900,
                        color: 'rgba(107,142,35,0.5)',
                        letterSpacing: '0.12em',
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
            <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <ElegantLabel text="Experience" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3
                        style={{
                          fontSize: '14px',
                          fontWeight: 400,
                          fontStyle: 'italic',
                          color: '#1a1d1b',
                          margin: 0,
                        }}
                      >
                        {exp.role || 'Role Name'}
                      </h3>
                      <span
                        style={{
                          fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
                          fontSize: '8px',
                          fontWeight: 900,
                          color: '#8a918e',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
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
                        fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
                        fontSize: '8.5px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'rgba(107,142,35,0.85)',
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
                          color: '#4a514d',
                          lineHeight: 1.68,
                          margin: '3px 0 0',
                          paddingLeft: '14px',
                          borderLeft: '2px solid rgba(107,142,35,0.12)',
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

          {/* Custom Sections in main column */}
          {customSections?.map((section) => (
            <section key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <ElegantLabel text={section.title} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {section.items.map((item) => (
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3
                        style={{
                          fontSize: '13px',
                          fontWeight: 400,
                          fontStyle: 'italic',
                          color: '#1a1d1b',
                          margin: 0,
                        }}
                      >
                        {item.title || 'Title'}
                      </h3>
                      {item.date && (
                        <span
                          style={{
                            fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
                            fontSize: '8px',
                            fontWeight: 900,
                            color: '#8a918e',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
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
                          fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
                          fontSize: '8.5px',
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          color: '#8a918e',
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
                          color: 'rgba(74,81,77,0.75)',
                          lineHeight: 1.65,
                          fontStyle: 'italic',
                          fontWeight: 500,
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

        {/* ════ RIGHT SIDEBAR — Education FIRST, then Skills ════ */}
        <div
          style={{
            width: '210px',
            flexShrink: 0,
            padding: '28px 28px 28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
          }}
        >
          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ElegantLabel text="Knowledge" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {skills.map((skill) => (
                  <div key={skill} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 400,
                        color: '#4a514d',
                        letterSpacing: '0.03em',
                        padding: '5px 0',
                      }}
                    >
                      {skill}
                    </span>
                    <div style={{ height: '1px', background: 'rgba(107,142,35,0.10)' }} />
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

const ElegantLabel = ({ text }: { text: string }) => (
  <h2
    style={{
      fontFamily: "'Gill Sans', Optima, Calibri, sans-serif",
      fontSize: '8px',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.5em',
      color: '#6b8e23',
      borderBottom: '1px solid rgba(107,142,35,0.2)',
      paddingBottom: '5px',
      margin: 0,
    }}
  >
    {text}
  </h2>
);

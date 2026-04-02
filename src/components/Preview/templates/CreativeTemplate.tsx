import React from 'react';
import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  return (
    <div
      style={{
        display: 'flex',
        background: '#f8fafc',
        minHeight: '1056px',
        maxWidth: '816px',
        width: '100%',
        margin: '0 auto',
        color: '#1e293b',
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* ════ LEFT MAIN COLUMN ════ */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          background: '#ffffff',
          padding: '44px 40px 36px 44px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}
      >
        {/* Header */}
        <header style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 900,
              color: '#0d9488',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}
          >
            {personal.name || 'YOUR NAME'}
          </h1>
          <p
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              lineHeight: 1,
              margin: 0,
            }}
          >
            {personal.title || 'PROFESSIONAL TITLE'}
          </p>
        </header>

        {/* Summary */}
        {summary && (
          <div
            style={{
              borderLeft: '6px solid #f0fdfa',
              paddingLeft: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <h2
              style={{
                fontSize: '8px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: '#0d9488',
                margin: 0,
              }}
            >
              The Mission
            </h2>
            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.65,
                color: '#475569',
                fontStyle: 'italic',
                fontWeight: 500,
                margin: 0,
              }}
            >
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h2
              style={{
                fontSize: '8px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: '#0d9488',
                margin: 0,
              }}
            >
              The Journey
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3
                      style={{
                        fontSize: '15px',
                        fontWeight: 900,
                        color: '#0f172a',
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                        margin: 0,
                      }}
                    >
                      {exp.role || 'Role Name'}
                    </h3>
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 900,
                        color: '#f0fdfa',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        background: '#0d9488',
                        padding: '3px 9px',
                        borderRadius: '99px',
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
                      fontSize: '9px',
                      fontWeight: 700,
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      margin: 0,
                    }}
                  >
                    {exp.company || 'Company Name'}
                  </p>
                  {exp.description && (
                    <p
                      style={{
                        fontSize: '11.5px',
                        color: '#64748b',
                        lineHeight: 1.62,
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

        {/* Custom Sections — flow directly after experience */}
        {customSections?.map((section) => (
          <div key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h2
              style={{
                fontSize: '8px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: '#0d9488',
                margin: 0,
              }}
            >
              {section.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {section.items.map((item) => (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3
                      style={{
                        fontSize: '13px',
                        fontWeight: 900,
                        color: '#0f172a',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                        lineHeight: 1,
                        margin: 0,
                      }}
                    >
                      {item.title || 'Title'}
                    </h3>
                    {item.date && (
                      <span
                        style={{
                          fontSize: '9px',
                          fontWeight: 900,
                          color: '#f0fdfa',
                          background: '#0d9488',
                          padding: '2px 8px',
                          borderRadius: '99px',
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
                        fontSize: '9px',
                        fontWeight: 700,
                        color: '#94a3b8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.18em',
                        margin: 0,
                      }}
                    >
                      {item.subtitle}
                    </p>
                  )}
                  {item.description && (
                    <p
                      style={{
                        fontSize: '11.5px',
                        color: '#64748b',
                        lineHeight: 1.62,
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
        ))}
      </div>

      {/* ════ RIGHT SIDEBAR ════ */}
      {/*
        Education + Skills + Contact all live here independently,
        stacking top-to-bottom — zero gap risk regardless of content length.
      */}
      <div
        style={{
          width: '230px',
          flexShrink: 0,
          background: '#0f172a',
          color: '#cbd5e1',
          padding: '44px 24px 36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '26px',
        }}
      >
        {/* Photo */}
        {personal.photoUrl && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={personal.photoUrl}
              alt={personal.name}
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #1e293b',
                filter: 'grayscale(100%)',
              }}
            />
          </div>
        )}

        {/* Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2
            style={{
              fontSize: '8px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: '#2dd4bf',
              borderBottom: '1px solid #1e293b',
              paddingBottom: '6px',
              margin: 0,
            }}
          >
            Reach Me
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', fontWeight: 500 }}>
            {personal.email && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                <span style={{ fontSize: '7px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0d9488', opacity: 0.7 }}>Email</span>
                <span style={{ wordBreak: 'break-all' }}>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                <span style={{ fontSize: '7px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0d9488', opacity: 0.7 }}>Mobile</span>
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                <span style={{ fontSize: '7px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0d9488', opacity: 0.7 }}>Location</span>
                <span>{personal.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education — moved to sidebar, flows right after contact */}
        {education.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2
              style={{
                fontSize: '8px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: '#2dd4bf',
                borderBottom: '1px solid #1e293b',
                paddingBottom: '6px',
                margin: 0,
              }}
            >
              Knowledge Base
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <h3
                    style={{
                      fontSize: '11px',
                      fontWeight: 900,
                      color: '#f1f5f9',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {edu.institution || 'Institution'}
                  </h3>
                  <p
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#2dd4bf',
                      fontStyle: 'italic',
                      opacity: 0.8,
                      margin: 0,
                    }}
                  >
                    {edu.degree}
                  </p>
                  <p
                    style={{
                      fontSize: '8px',
                      fontWeight: 900,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      margin: 0,
                    }}
                  >
                    {edu.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2
              style={{
                fontSize: '8px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: '#2dd4bf',
                borderBottom: '1px solid #1e293b',
                paddingBottom: '6px',
                margin: 0,
              }}
            >
              Arsenal
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: '3px 8px',
                    background: '#1e293b',
                    fontSize: '8.5px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#f0fdfa',
                    borderRadius: '6px',
                    border: '1px solid #334155',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

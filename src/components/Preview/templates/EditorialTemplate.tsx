import React from 'react';
import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const EditorialTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  return (
    <div
      style={{
        background: '#f5f0eb',
        minHeight: '1056px',
        maxWidth: '816px',
        width: '100%',
        margin: '0 auto',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Giant editorial header ── */}
      <div
        style={{
          padding: '44px 52px 0',
          borderBottom: '8px solid #000000',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: '8.5px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.5em',
                color: '#9ca3af',
                marginBottom: '12px',
                margin: '0 0 12px',
              }}
            >
              Curriculum Vitae · {personal.title || 'Professional Title'}
            </p>
            <h1
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                lineHeight: 0.88,
                fontSize: '72px',
                fontWeight: 900,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {(personal.name || 'YOUR NAME').split(' ').map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    paddingLeft: i % 2 === 1 ? '28px' : '0',
                    color: i % 2 === 1 ? '#e63946' : '#000000',
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>
          <div
            style={{
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              fontSize: '10px',
              fontWeight: 700,
              color: '#6b7280',
              paddingBottom: '10px',
            }}
          >
            {personal.email && <p style={{ margin: 0 }}>{personal.email}</p>}
            {personal.phone && <p style={{ margin: 0 }}>{personal.phone}</p>}
            {personal.location && <p style={{ margin: 0 }}>{personal.location}</p>}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div
        style={{
          padding: '32px 52px 36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          flex: 1,
        }}
      >
        {/* Summary — magazine pull-quote */}
        {summary && (
          <div
            style={{
              borderLeft: '7px solid #e63946',
              paddingLeft: '20px',
              paddingTop: '4px',
              paddingBottom: '4px',
              maxWidth: '520px',
            }}
          >
            <p
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: '15px',
                lineHeight: 1.5,
                color: '#1a1a1a',
                fontStyle: 'italic',
                fontWeight: 500,
                margin: 0,
              }}
            >
              "{summary}"
            </p>
          </div>
        )}

        {/* ── Two-column body ── */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', alignItems: 'flex-start' }}>

          {/* ════ LEFT — Experience + Custom ════ */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {experience.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <EditorialLabel text="Experience" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {experience.map((exp, i) => (
                    <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <h3
                          style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: '18px',
                            fontWeight: 900,
                            color: '#000000',
                            fontStyle: 'italic',
                            lineHeight: 1,
                            margin: 0,
                          }}
                        >
                          {exp.role || 'Role Name'}
                        </h3>
                        <span
                          style={{
                            fontSize: '8px',
                            fontWeight: 900,
                            color: '#9ca3af',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
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
                          fontSize: '8.5px',
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          letterSpacing: '0.25em',
                          color: '#e63946',
                          margin: 0,
                        }}
                      >
                        {exp.company || 'Company'}
                      </p>
                      {exp.description && (
                        <p
                          style={{
                            fontSize: '11px',
                            color: '#4b5563',
                            lineHeight: 1.65,
                            margin: '3px 0 0',
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {exp.description}
                        </p>
                      )}
                      {i < experience.length - 1 && (
                        <div style={{ borderBottom: '1px solid #e5e7eb', marginTop: '6px' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom sections */}
            {customSections?.map((section) => (
              <div key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <EditorialLabel text={section.title} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {section.items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <h3
                          style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: '15px',
                            fontWeight: 900,
                            fontStyle: 'italic',
                            color: '#000000',
                            margin: 0,
                          }}
                        >
                          {item.title || 'Title'}
                        </h3>
                        {item.date && (
                          <span
                            style={{
                              fontSize: '8px',
                              fontWeight: 900,
                              color: '#9ca3af',
                              textTransform: 'uppercase',
                              letterSpacing: '0.15em',
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
                            fontSize: '8.5px',
                            fontWeight: 900,
                            color: '#e63946',
                            textTransform: 'uppercase',
                            letterSpacing: '0.25em',
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
                            color: '#4b5563',
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
            ))}
          </div>

          {/* ════ RIGHT SIDEBAR — Education first, then Skills ════ */}
          <div
            style={{
              width: '220px',
              flexShrink: 0,
              borderLeft: '4px solid #000000',
              paddingLeft: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
            }}
          >

            {/* Education — ABOVE skills */}
            {education.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <EditorialLabel text="Education" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid #d1d5db',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Georgia', serif",
                          fontSize: '13px',
                          fontWeight: 900,
                          fontStyle: 'italic',
                          color: '#000000',
                          lineHeight: 1.25,
                          margin: 0,
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
                          lineHeight: 1.4,
                        }}
                      >
                        {edu.degree}
                      </p>
                      <p
                        style={{
                          fontSize: '8px',
                          fontWeight: 900,
                          color: '#e63946',
                          textTransform: 'uppercase',
                          letterSpacing: '0.2em',
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

            {/* Skills — below education */}
            {skills.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <EditorialLabel text="Skills" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                  {skills.map((skill) => (
                    <p
                      key={skill}
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: '#1f2937',
                        padding: '5px 0',
                        borderBottom: '1px solid #e5e7eb',
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EditorialLabel = ({ text }: { text: string }) => (
  <h2
    style={{
      fontSize: '8.5px',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.4em',
      color: '#000000',
      borderBottom: '2px solid #000000',
      paddingBottom: '6px',
      margin: 0,
    }}
  >
    {text}
  </h2>
);

import React from 'react';
import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const NordicTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills, customSections } = resume.sections;

  return (
    <div
      style={{
        background: '#fafaf8',
        minHeight: '1056px',
        maxWidth: '816px',
        width: '100%',
        margin: '0 auto',
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        color: '#1c1c1a',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Slim top accent ── */}
      <div style={{ height: '3px', background: '#c8a96e', width: '100%', flexShrink: 0 }} />

      <div
        style={{
          padding: '44px 56px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          flex: 1,
        }}
      >
        {/* ── Header ── */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderBottom: '1px solid #e8e6e1',
            paddingBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h1
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: '38px',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#1c1c1a',
                lineHeight: 1,
                margin: 0,
              }}
            >
              {personal.name || 'YOUR NAME'}
            </h1>
            <p
              style={{
                fontSize: '8.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.35em',
                color: '#c8a96e',
                margin: 0,
              }}
            >
              {personal.title || 'Professional Title'}
            </p>
          </div>

          <div
            style={{
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              fontSize: '10px',
              color: '#8a8880',
              fontWeight: 500,
            }}
          >
            {personal.email && <p style={{ margin: 0 }}>{personal.email}</p>}
            {personal.phone && <p style={{ margin: 0 }}>{personal.phone}</p>}
            {personal.location && <p style={{ margin: 0 }}>{personal.location}</p>}
          </div>
        </header>

        {/* ── Summary ── */}
        {summary && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '540px' }}>
            <NordicLabel text="About" />
            <p
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: '13px',
                lineHeight: 1.8,
                color: '#4a4a46',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              {summary}
            </p>
          </section>
        )}

        {/* ── Experience ── */}
        {experience.length > 0 && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <NordicLabel text="Experience" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '110px 1fr',
                    gap: '24px',
                  }}
                >
                  {/* Date column */}
                  <div
                    style={{
                      paddingTop: '2px',
                      textAlign: 'right',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '8.5px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#c8a96e',
                        margin: 0,
                      }}
                    >
                      {exp.startDate}
                    </p>
                    <p
                      style={{
                        fontSize: '8.5px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'rgba(200,169,110,0.5)',
                        margin: 0,
                      }}
                    >
                      {exp.endDate}
                    </p>
                  </div>

                  {/* Content column */}
                  <div
                    style={{
                      borderLeft: '1px solid #e8e6e1',
                      paddingLeft: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <h3
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#1c1c1a',
                          letterSpacing: '-0.01em',
                          margin: 0,
                        }}
                      >
                        {exp.role || 'Role Name'}
                      </h3>
                      <span style={{ fontSize: '11px', color: '#8a8880' }}>·</span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 500,
                          color: '#8a8880',
                        }}
                      >
                        {exp.company || 'Company'}
                      </span>
                    </div>
                    {exp.description && (
                      <p
                        style={{
                          fontSize: '11px',
                          lineHeight: 1.68,
                          color: '#5a5a56',
                          margin: 0,
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/*
          ── Two-column lower section ──
          LEFT  (flex:1): Education → Custom Sections (Projects etc.) stacked top-to-bottom
          RIGHT (180px) : Skills only — runs in parallel, never blocks left column
          Projects appear BESIDE Skills, not below them.
        */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '40px' }}>

          {/* ── LEFT: Education + Custom Sections ── */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {education.length > 0 && (
              <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <NordicLabel text="Education" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#1c1c1a', margin: 0 }}>
                        {edu.institution || 'Institution'}
                      </h3>
                      <p style={{ fontFamily: "'Georgia', serif", fontSize: '10.5px', fontStyle: 'italic', color: '#6a6a66', margin: 0 }}>
                        {edu.degree}
                      </p>
                      <p style={{ fontSize: '8.5px', fontWeight: 900, color: '#c8a96e', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
                        {edu.year}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Custom Sections flow directly under Education in the left column */}
            {customSections?.map((section) => (
              <section key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <NordicLabel text={section.title} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#1c1c1a', margin: 0 }}>
                          {item.title || 'Title'}
                        </h3>
                        {item.date && (
                          <span style={{ fontSize: '8.5px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#c8a96e', whiteSpace: 'nowrap', marginLeft: '12px', flexShrink: 0 }}>
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p style={{ fontSize: '10px', fontWeight: 500, color: '#8a8880', margin: 0 }}>
                          {item.subtitle}
                        </p>
                      )}
                      {item.description && (
                        <p style={{ fontSize: '10.5px', lineHeight: 1.65, color: '#5a5a56', margin: 0 }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* ── RIGHT: Skills only — fixed width, independent of left column height ── */}
          {skills.length > 0 && (
            <section style={{ width: '180px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <NordicLabel text="Skills" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {skills.map((skill) => (
                  <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '14px', height: '1px', background: '#c8a96e', flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', color: '#4a4a46', fontWeight: 500 }}>{skill}</span>
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

/* ── Section label ── */
const NordicLabel = ({ text }: { text: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <span
      style={{
        fontSize: '8.5px',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '0.35em',
        color: '#1c1c1a',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
    <div style={{ flex: 1, height: '1px', background: '#e8e6e1' }} />
  </div>
);

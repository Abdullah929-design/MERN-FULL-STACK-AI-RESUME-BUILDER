import React from 'react';
import type { Resume } from '../../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const ProfessionalTemplate: React.FC<TemplateProps> = ({ resume }) => {
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
        color: '#111827',
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* ── Heavy Header ── */}
      <div
        style={{
          background: '#111827',
          color: '#ffffff',
          padding: '36px 44px 30px',
          borderBottom: '6px solid #f59e0b',
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          flexShrink: 0,
        }}
      >
        {personal.photoUrl && (
          <img
            src={personal.photoUrl}
            alt={personal.name}
            style={{
              width: '110px',
              height: '110px',
              objectFit: 'cover',
              border: '3px solid rgba(245,158,11,0.3)',
              outline: '6px solid #1f2937',
              flexShrink: 0,
            }}
          />
        )}

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h1
            style={{
              fontSize: '30px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              margin: 0,
            }}
          >
            {personal.name || 'YOUR NAME'}
          </h1>
          <p
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#f59e0b',
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
              gap: '0 28px',
              marginTop: '8px',
            }}
          >
            {personal.email && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '7.5px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#f59e0b', opacity: 0.6 }}>Email</span>
                <span style={{ fontSize: '10.5px', fontWeight: 500, color: '#9ca3af' }}>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '7.5px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#f59e0b', opacity: 0.6 }}>Phone</span>
                <span style={{ fontSize: '10.5px', fontWeight: 500, color: '#9ca3af' }}>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '7.5px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#f59e0b', opacity: 0.6 }}>Location</span>
                <span style={{ fontSize: '10.5px', fontWeight: 500, color: '#9ca3af' }}>{personal.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {/* ════ MAIN COLUMN: Summary → Education → Experience → Custom Sections ════ */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: '28px 32px 28px 44px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            borderRight: '1px solid #f3f4f6',
          }}
        >
          {/* Summary */}
          {summary && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-16px', top: 0, bottom: 0, width: '3px', background: 'rgba(245,158,11,0.2)' }} />
              <ProfLabel text="Professional Summary" />
              <p
                style={{
                  fontSize: '11.5px',
                  lineHeight: 1.72,
                  color: '#4b5563',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {summary}
              </p>
            </section>
          )}

          {/* Education — right below summary */}
          {education.length > 0 && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ProfLabel text="Academic Pedigree" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                          fontSize: '12px',
                          fontWeight: 900,
                          color: '#111827',
                          textTransform: 'uppercase',
                          fontStyle: 'italic',
                          letterSpacing: '0.03em',
                          margin: 0,
                          lineHeight: 1.2,
                        }}
                      >
                        {edu.institution || 'Institution'}
                      </h3>
                      <p
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: '#6b7280',
                          fontStyle: 'italic',
                          textTransform: 'uppercase',
                          margin: 0,
                        }}
                      >
                        {edu.degree}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: '8px',
                        fontWeight: 900,
                        color: '#f59e0b',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        background: '#fffbeb',
                        padding: '2px 7px',
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
              <ProfLabel text="Career Milestones" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3
                        style={{
                          fontSize: '13px',
                          fontWeight: 900,
                          color: '#111827',
                          textTransform: 'uppercase',
                          fontStyle: 'italic',
                          letterSpacing: '-0.01em',
                          lineHeight: 1,
                          margin: 0,
                        }}
                      >
                        {exp.role || 'Role Name'}
                      </h3>
                      <span
                        style={{
                          fontSize: '8.5px',
                          fontWeight: 900,
                          color: '#9ca3af',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
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
                        fontSize: '9px',
                        fontWeight: 700,
                        color: '#f59e0b',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        opacity: 0.9,
                        margin: 0,
                      }}
                    >
                      {exp.company || 'Company Name'}
                    </p>
                    {exp.description && (
                      <p
                        style={{
                          fontSize: '10.5px',
                          color: '#4b5563',
                          lineHeight: 1.65,
                          fontStyle: 'italic',
                          paddingLeft: '14px',
                          borderLeft: '3px solid #f9fafb',
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

          {/* Custom Sections — Projects etc., full width in main column */}
          {customSections?.map((section) => (
            <section key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ProfLabel text={section.title} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {section.items.map((item) => (
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3
                        style={{
                          fontSize: '12px',
                          fontWeight: 900,
                          color: '#111827',
                          textTransform: 'uppercase',
                          fontStyle: 'italic',
                          letterSpacing: '0.02em',
                          lineHeight: 1,
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
                            color: '#9ca3af',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
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
                          fontWeight: 700,
                          color: 'rgba(245,158,11,0.75)',
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
                          fontSize: '10.5px',
                          color: '#6b7280',
                          lineHeight: 1.65,
                          fontWeight: 500,
                          fontStyle: 'italic',
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

        {/* ════ SIDEBAR: Skills only ════ */}
        <div
          style={{
            width: '210px',
            flexShrink: 0,
            background: 'rgba(249,250,251,0.6)',
            padding: '28px 24px 28px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <h2
            style={{
              fontSize: '8px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: '#f59e0b',
              opacity: 0.7,
              margin: 0,
              paddingBottom: '6px',
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            Technological Mastery
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {skills.map((skill) => (
              <div
                key={skill}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#374151',
                  fontStyle: 'italic',
                  padding: '5px 0',
                  borderBottom: '1px solid #f3f4f6',
                  marginBottom: '2px',
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfLabel = ({ text }: { text: string }) => (
  <h2
    style={{
      fontSize: '9px',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      color: '#111827',
      borderBottom: '1px solid #f3f4f6',
      paddingBottom: '5px',
      margin: 0,
    }}
  >
    {text}
  </h2>
);

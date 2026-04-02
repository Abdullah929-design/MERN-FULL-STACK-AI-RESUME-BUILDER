import React from 'react';
import type { ComponentProps } from '../../../types/template';

export const ExperienceSection: React.FC<ComponentProps> = ({ resume, theme, typography, config }) => {
  const { experience } = resume.sections;
  const { title, layout, showDates, showCompany, dateFormat } = config.props;

  const formatDate = (startDate: string, endDate: string) => {
    if (dateFormat === 'compact') {
      return `${startDate} - ${endDate}`;
    }
    return `${startDate} – ${endDate}`;
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'timeline':
        return 'space-y-8';
      case 'compact':
        return 'space-y-4';
      case 'detailed':
        return 'space-y-8';
      default:
        return 'space-y-6';
    }
  };

  if (experience.length === 0) {
    return (
      <div className="space-y-6">
        {title && (
          <h2 className="font-bold text-lg" style={{ color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '4px' }}>
            {title}
          </h2>
        )}
        <p className="text-sm italic opacity-50" style={{ color: theme.secondary }}>No experience added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <h2 
          className="font-bold"
          style={{ 
            fontSize: typography.sizes.h2,
            fontFamily: typography.headerFont || typography.fontFamily,
            color: theme.text,
            borderBottom: `2px solid ${theme.primary}`,
            paddingBottom: '4px'
          }}
        >
          {title}
        </h2>
      )}
      
      <div className={getLayoutClasses()}>
        {experience.map((exp: any) => (
            <div key={exp.id} className="space-y-2 relative pl-4 border-l-2" style={{ borderColor: theme.primary + '20' }}>
              <div className="flex justify-between items-start">
                <h3 
                  className="font-bold uppercase tracking-wide"
                  style={{ 
                    fontSize: typography.sizes.h3,
                    fontFamily: typography.headerFont || typography.fontFamily,
                    color: theme.text
                  }}
                >
                  {exp.role || "Role Name"}
                </h3>
                {showDates && (exp.startDate || exp.endDate) && (
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase italic"
                    style={{ 
                      fontSize: typography.sizes.small,
                      color: theme.primary,
                      backgroundColor: theme.primary + '10'
                    }}
                  >
                    {formatDate(exp.startDate || 'Start', exp.endDate || 'End')}
                  </span>
                )}
              </div>
              
              {showCompany && (
                <p 
                  className="font-semibold"
                  style={{ 
                    fontSize: typography.sizes.body,
                    color: theme.secondary
                  }}
                >
                  {exp.company || "Company Name"}
                </p>
              )}
              
              {exp.description && (
                <p 
                  className="leading-relaxed whitespace-pre-wrap"
                  style={{ 
                    fontSize: typography.sizes.body,
                    fontFamily: typography.fontFamily,
                    color: theme.text
                  }}
                >
                  {exp.description}
                </p>
              )}
              
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="list-disc pl-5 space-y-1">
                  {exp.bullets.map((bullet: any, index: number) => (
                    <li 
                      key={index}
                      style={{ 
                        fontSize: typography.sizes.body,
                        fontFamily: typography.fontFamily,
                        color: theme.text
                      }}
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

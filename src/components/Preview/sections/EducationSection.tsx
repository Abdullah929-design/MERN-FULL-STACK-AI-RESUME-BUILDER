import React from 'react';
import type { ComponentProps } from '../../../types/template';

export const EducationSection: React.FC<ComponentProps> = ({ resume, theme, typography, config }) => {
  const { education } = resume.sections;
  const { title, layout, showYear, showInstitution } = config.props;

  const hasEducation = education && education.length > 0;

  const getLayoutClasses = () => {
    switch (layout) {
      case 'compact':
        return 'space-y-2';
      case 'detailed':
        return 'space-y-6';
      default:
        return 'space-y-4';
    }
  };

  return (
    <div className="space-y-4">
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
      
      {hasEducation ? (
        <div className={getLayoutClasses()}>
          {education.map((edu: any) => (
            <div key={edu.id} className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h3 
                  className="font-bold"
                  style={{ 
                    fontSize: typography.sizes.h3,
                    fontFamily: typography.headerFont || typography.fontFamily,
                    color: theme.text
                  }}
                >
                  {edu.degree || "Degree Name"}
                </h3>
                {showYear && edu.year && (
                  <span 
                    className="font-medium"
                    style={{ 
                      fontSize: typography.sizes.small,
                      color: theme.secondary
                    }}
                  >
                    {edu.year}
                  </span>
                )}
              </div>
              
              {showInstitution && (
                <p 
                  className="font-medium"
                  style={{ 
                    fontSize: typography.sizes.body,
                    color: theme.secondary
                  }}
                >
                  {edu.institution || "Institution Name"}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm italic opacity-50" style={{ color: theme.secondary }}>
          No education added yet
        </div>
      )}
    </div>
  );
};

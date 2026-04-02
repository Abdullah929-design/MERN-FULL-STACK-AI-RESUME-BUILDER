import React from 'react';
import type { ComponentProps } from '../../../types/template';

export const CustomSection: React.FC<ComponentProps> = ({ resume, theme, typography, config }) => {
  const { customSections } = resume.sections;
  const { sectionId, title, layout, showDates } = config.props;

  const section = customSections.find((cs: any) => cs.id === sectionId);
  if (!section || section.items.length === 0) return null;

  const getLayoutClasses = () => {
    switch (layout) {
      case 'timeline':
        return 'space-y-6';
      case 'compact':
        return 'space-y-3';
      case 'detailed':
        return 'space-y-8';
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
            color: theme.primary,
            borderBottom: `2px solid ${theme.primary}`,
            paddingBottom: '4px'
          }}
        >
          {title}
        </h2>
      )}
      
      <div className={getLayoutClasses()}>
        {section.items.map((item: any) => (
          <div key={item.id} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <h3 
                className="font-bold"
                style={{ 
                  fontSize: typography.sizes.h3,
                  fontFamily: typography.headerFont || typography.fontFamily,
                  color: theme.text
                }}
              >
                {item.title || "Item Title"}
              </h3>
              {showDates && item.date && (
                <span 
                  className="font-medium"
                  style={{ 
                    fontSize: typography.sizes.small,
                    color: theme.secondary
                  }}
                >
                  {item.date}
                </span>
              )}
            </div>
            
            {item.subtitle && (
              <p 
                className="font-medium"
                style={{ 
                  fontSize: typography.sizes.body,
                  color: theme.secondary
                }}
              >
                {item.subtitle}
              </p>
            )}
            
            {item.description && (
              <p 
                className="leading-relaxed"
                style={{ 
                  fontSize: typography.sizes.body,
                  fontFamily: typography.fontFamily,
                  color: theme.text
                }}
              >
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import type { ComponentProps } from '../../../types/template';

export const SkillsSection: React.FC<ComponentProps> = ({ resume, theme, typography, config }) => {
  const { skills } = resume.sections;
  const { title, layout, showAsTags, columns } = config.props;

  const hasSkills = skills && skills.length > 0;

  const getLayoutClasses = () => {
    switch (layout) {
      case 'grid':
        return `grid grid-cols-${columns || 2} gap-2`;
      case 'list':
        return 'space-y-1';
      case 'cloud':
        return 'flex flex-wrap gap-2';
      default:
        return 'flex flex-wrap gap-2';
    }
  };

  const getSkillStyle = () => {
    if (showAsTags) {
      return {
        backgroundColor: theme.primary + '20',
        border: `1px solid ${theme.primary}`,
        color: theme.primary,
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: typography.sizes.small,
        fontFamily: typography.fontFamily
      };
    }
    return {
      fontSize: typography.sizes.body,
      fontFamily: typography.fontFamily,
      color: theme.text
    };
  };

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
      
      {hasSkills ? (
        <div className={getLayoutClasses()}>
          {skills.map((skill: any, index: number) => (
            <div key={index} style={getSkillStyle()}>
              {layout === 'list' && <span>• </span>}
              {skill}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm italic opacity-50" style={{ color: theme.secondary }}>
          No skills added yet
        </div>
      )}
    </div>
  );
};

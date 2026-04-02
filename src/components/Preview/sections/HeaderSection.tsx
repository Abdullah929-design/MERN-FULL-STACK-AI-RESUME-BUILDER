import React from 'react';
import type { ComponentProps } from '../../../types/template';

export const HeaderSection: React.FC<ComponentProps> = ({ resume, theme, typography, config }) => {
  const { personal } = resume.sections;
  const { showPhoto, layout, alignment } = config.props;

  const getAlignment = () => {
    switch (alignment) {
      case 'center': return 'items-center text-center';
      case 'left': return 'items-start text-left';
      case 'right': return 'items-end text-right';
      default: return 'items-center text-center';
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'sidebar':
        return 'flex flex-col gap-6';
      case 'horizontal':
        return 'flex flex-row gap-8 items-center';
      default:
        return 'flex flex-col gap-6';
    }
  };

  return (
    <div className={`${getLayoutClasses()} ${getAlignment()}`} style={{ color: theme.text }}>
      {showPhoto && personal.photoUrl && (
        <img
          src={personal.photoUrl}
          alt={personal.name}
          className="w-32 h-32 rounded-full object-cover border-4 shadow-xl"
          style={{ 
            borderColor: theme.primary + '80',
            backgroundColor: theme.background
          }}
        />
      )}
      <div className="space-y-2">
        <h1 
          className="font-bold leading-tight uppercase tracking-widest"
          style={{ 
            fontSize: typography.sizes.h1,
            fontFamily: typography.headerFont || typography.fontFamily,
            color: theme.text
          }}
        >
          {personal.name || "YOUR NAME"}
        </h1>
        <p 
          className="font-medium tracking-wide uppercase text-sm"
          style={{ 
            fontSize: typography.sizes.h3,
            fontFamily: typography.fontFamily,
            color: theme.secondary
          }}
        >
          {personal.title || "PROFESSIONAL TITLE"}
        </p>
      </div>
    </div>
  );
};

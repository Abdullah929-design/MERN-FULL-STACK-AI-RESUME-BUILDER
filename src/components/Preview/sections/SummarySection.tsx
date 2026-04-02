import React from 'react';
import type { ComponentProps } from '../../../types/template';

export const SummarySection: React.FC<ComponentProps> = ({ resume, theme, typography, config }) => {
  const { summary } = resume.sections;
  const { title, alignment, fontStyle } = config.props;

  const hasSummary = summary && summary.trim().length > 0;

  const getAlignment = () => {
    switch (alignment) {
      case 'center': return 'text-center';
      case 'left': return 'text-left';
      case 'right': return 'text-right';
      case 'justify': return 'text-justify';
      default: return 'text-left';
    }
  };

  const getFontStyle = () => {
    switch (fontStyle) {
      case 'italic': return 'italic';
      case 'bold': return 'font-bold';
      case 'normal': return 'font-normal';
      default: return 'font-normal';
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
      {hasSummary ? (
        <p 
          className={`${getAlignment()} ${getFontStyle()} leading-relaxed`}
          style={{ 
            fontSize: typography.sizes.body,
            fontFamily: typography.fontFamily,
            color: theme.secondary
          }}
        >
          {summary}
        </p>
      ) : (
        <div className="text-sm italic opacity-50" style={{ color: theme.secondary }}>
          No summary added yet
        </div>
      )}
    </div>
  );
};

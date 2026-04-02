import React from 'react';
import type { ComponentProps } from '../../../types/template';

export const PersonalSection: React.FC<ComponentProps> = ({ resume, theme, typography, config }) => {
  const { personal } = resume.sections;
  const { layout, showIcons } = config.props;

  const ContactItem = ({ label, value }: { label: string; value: string }) => {
    if (!value) return null;
    
    return (
      <div className="flex items-center gap-2" style={{ fontSize: typography.sizes.small }}>
        {showIcons && (
          <span className="font-medium" style={{ color: theme.secondary }}>
            {label}:
          </span>
        )}
        <span style={{ color: theme.text }}>{value}</span>
      </div>
    );
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col gap-3';
      case 'horizontal':
        return 'flex flex-wrap gap-4';
      case 'inline':
        return 'flex flex-wrap gap-2 items-center';
      default:
        return 'flex flex-col gap-3';
    }
  };

  return (
    <div className={getLayoutClasses()}>
      <ContactItem label="Email" value={personal.email} />
      <ContactItem label="Phone" value={personal.phone} />
      <ContactItem label="Location" value={personal.location} />
    </div>
  );
};

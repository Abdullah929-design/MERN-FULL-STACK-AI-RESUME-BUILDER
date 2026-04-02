import React from 'react';
import type { Resume } from '../../types/resume';
import type { TemplateConfig } from '../../types/template';
import {
  HeaderSection,
  PersonalSection,
  SummarySection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  CustomSection
} from './sections';

interface DynamicTemplateRendererProps {
  resume: Resume;
  config: TemplateConfig;
}

const componentMap = {
  HeaderSection,
  PersonalSection,
  SummarySection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  CustomSection
};

export const DynamicTemplateRenderer: React.FC<DynamicTemplateRendererProps> = ({ resume, config }) => {
  const { layout, theme, typography, spacing, sections } = config;

  const getLayoutClasses = () => {
    switch (layout) {
      case 'sidebar-left':
        return 'flex h-full min-h-[1100px]';
      case 'sidebar-right':
        return 'flex h-full min-h-[1100px] flex-row-reverse';
      case 'two-column':
        return 'flex h-full min-h-[1100px] gap-8';
      case 'single-column':
      default:
        return 'flex flex-col h-full min-h-[1100px]';
    }
  };

  const getSectionContainer = (section: any) => {
    const Component = componentMap[section.component as keyof typeof componentMap];
    if (!Component) return null;

    const containerStyle: React.CSSProperties = {
      ...section.styling,
      order: section.order
    };

    const layoutClasses = () => {
      if (layout === 'sidebar-left' && section.layout?.position === 'left') {
        return 'w-[35%] flex-shrink-0';
      }
      if (layout === 'sidebar-right' && section.layout?.position === 'right') {
        return 'w-[35%] flex-shrink-0';
      }
      if (layout === 'two-column') {
        if (section.layout?.width === 'half') return 'w-1/2 flex-shrink-0';
        if (section.layout?.width === 'third') return 'w-1/3 flex-shrink-0';
      }
      return 'flex-1';
    };

    const sectionProps = {
      resume,
      theme,
      typography,
      spacing,
      config: section
    };

    return (
      <div
        key={section.id}
        className={layoutClasses()}
        style={containerStyle}
      >
        <Component {...sectionProps} />
      </div>
    );
  };

  const renderSidebarContent = (position: 'left' | 'right') => {
    const sidebarSections = sections.filter(s => s.layout?.position === position);
    
    const sidebarTheme = {
      ...theme,
      text: theme.background === '#ffffff' ? '#ffffff' : theme.text,
      secondary: theme.background === '#ffffff' ? '#e2e8f0' : theme.secondary,
      primary: theme.background === '#ffffff' ? '#60a5fa' : theme.primary
    };
    
    return (
      <div 
        className="w-[35%] flex-shrink-0 p-10 flex flex-col gap-10 h-full"
        style={{ 
          backgroundColor: theme.background === '#ffffff' ? theme.primary : theme.background,
          color: sidebarTheme.text
        }}
      >
        {sidebarSections
          .sort((a, b) => a.order - b.order)
          .map((section) => {
            const Component = componentMap[section.component as keyof typeof componentMap];
            if (!Component) return null;

            const sectionProps = {
              resume,
              theme: sidebarTheme,
              typography,
              spacing,
              config: section
            };

            return (
              <div key={section.id}>
                <Component {...sectionProps} />
              </div>
            );
          })}
      </div>
    );
  };

  const renderMainContent = () => {
    const mainSections = sections.filter(s => 
      s.layout?.position !== 'left' && s.layout?.position !== 'right'
    );
    return (
      <div className="flex-1 p-12 flex flex-col gap-10" style={{ backgroundColor: '#ffffff' }}>
        {mainSections
          .sort((a, b) => a.order - b.order)
          .map((section) => {
            const Component = componentMap[section.component as keyof typeof componentMap];
            if (!Component) return null;

            const sectionProps = {
              resume,
              theme: {
                ...theme,
                background: '#ffffff',
                text: theme.text,
                secondary: theme.secondary
              },
              typography,
              spacing,
              config: section
            };

            return (
              <div key={section.id}>
                <Component {...sectionProps} />
              </div>
            );
          })}
      </div>
    );
  };

  const renderTwoColumnContent = () => {
    const leftSections = sections.filter(s => s.layout?.position === 'left' || !s.layout?.position);
    const rightSections = sections.filter(s => s.layout?.position === 'right');
    
    return (
      <div className="flex-1 p-10">
        <div className="flex gap-8">
          <div className="flex-1 space-y-10">
            {leftSections
              .sort((a, b) => a.order - b.order)
              .map((section) => getSectionContainer(section))}
          </div>
          <div className="w-1/3 space-y-10">
            {rightSections
              .sort((a, b) => a.order - b.order)
              .map((section) => getSectionContainer(section))}
          </div>
        </div>
      </div>
    );
  };

  const renderSingleColumnContent = () => {
    return (
      <div className="flex-1 p-10 space-y-10">
        {sections
          .sort((a, b) => a.order - b.order)
          .map((section) => getSectionContainer(section))}
      </div>
    );
  };

  return (
    <div 
      className={getLayoutClasses()}
      style={{ 
        fontFamily: typography.fontFamily,
        color: theme.text
      }}
    >
      {layout === 'sidebar-left' && (
        <>
          {renderSidebarContent('left')}
          {renderMainContent()}
        </>
      )}
      
      {layout === 'sidebar-right' && (
        <>
          {renderMainContent()}
          {renderSidebarContent('right')}
        </>
      )}
      
      {layout === 'two-column' && renderTwoColumnContent()}
      
      {layout === 'single-column' && renderSingleColumnContent()}
    </div>
  );
};

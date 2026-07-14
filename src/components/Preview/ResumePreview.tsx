import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { TemplateSelector } from './TemplateSelector';
import { TemplateGallery } from './TemplateGallery';
import { DownloadManager } from '../DownloadManager';

import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ATSTemplate } from './templates/ATSTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { ElegantTemplate } from './templates/ElegantTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { AcademiaTemplate } from './templates/AcademiaTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { EditorialTemplate } from './templates/EditorialTemplate';
import { NordicTemplate } from './templates/NordicTemplate';
import { TimelineTemplate } from './templates/TimelineTemplate';

interface ResumePreviewProps {
  hideControls?: boolean;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ hideControls = false }) => {
  const { resume } = useResumeStore();

  if (!resume) {
    return (
      <div className="flex items-center justify-center h-full min-h-[1100px] bg-gray-50">
        <div className="text-center">
          <div className="text-gray-400 mb-2">No resume data</div>
          <div className="text-sm text-gray-500">Start building your resume to see a preview</div>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    try {
      switch (resume.template) {
        case 'classic': return <ClassicTemplate resume={resume} />;
        case 'ats': return <ATSTemplate resume={resume} />;
        case 'executive': return <ExecutiveTemplate resume={resume} />;
        case 'minimalist': return <MinimalistTemplate resume={resume} />;
        case 'creative': return <CreativeTemplate resume={resume} />;
        case 'elegant': return <ElegantTemplate resume={resume} />;
        case 'professional': return <ProfessionalTemplate resume={resume} />;
        case 'academia': return <AcademiaTemplate resume={resume} />;
        case 'compact': return <CompactTemplate resume={resume} />;
        case 'editorial': return <EditorialTemplate resume={resume} />;
        case 'nordic': return <NordicTemplate resume={resume} />;
        case 'timeline': return <TimelineTemplate resume={resume} />;
        case 'modern':
        default:
          return <ModernTemplate resume={resume} />;
      }
    } catch (error) {
      return (
        <div className="flex items-center justify-center h-full min-h-[1100px] bg-gray-50">
          <div className="text-center">
            <div className="text-red-400 mb-2">Template Error</div>
            <div className="text-sm text-gray-500">Unable to load template: {resume.template}</div>
          </div>
        </div>
      );
    }
  };

  const [contentHeight, setContentHeight] = React.useState(1154);

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.id === 'resume-preview-root') {
          setContentHeight(entry.target.scrollHeight);
        }
      }
    });

    const node = document.getElementById('resume-preview-root');
    if (node) observer.observe(node);

    return () => observer.disconnect();
  }, [resume.template]); // Re-observe when template changes

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
      {!hideControls && (
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-gray-200 flex flex-wrap sm:flex-nowrap items-center justify-between shadow-sm gap-3 md:gap-4">
          <div className="w-full sm:flex-1 min-w-[200px]">
            <TemplateSelector />
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto flex justify-center sm:justify-start">
            <DownloadManager />
          </div>
        </div>
      )}

      {/* Scaling Container */}
      <div className="relative w-full overflow-hidden flex justify-center bg-gray-100/50 rounded-2xl border border-gray-200 py-8 md:py-12 px-4 shadow-inner">
        <div 
          className="resume-preview-scaler origin-top transition-transform duration-300 ease-out shadow-2xl"
          style={{
            width: '816px',
            minHeight: '1154px',
            transform: `scale(var(--resume-scale, 1))`,
            // Dynamically adjust margin-bottom based on scaled height to prevent layout gaps
            marginBottom: `calc(${contentHeight}px * (var(--resume-scale, 1) - 1))`,
            backgroundColor: '#ffffff',
          }}
        >
          <div id="resume-preview-root" className="w-full bg-white h-auto">
            {renderTemplate()}
          </div>
        </div>
      </div>

      {!hideControls && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="h-1 flex-1 bg-gradient-to-r from-blue-600 to-transparent rounded-full opacity-20" />
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Template Gallery</h3>
            <div className="h-1 flex-1 bg-gradient-to-l from-blue-600 to-transparent rounded-full opacity-20" />
          </div>
          <TemplateGallery />
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .resume-preview-scaler {
          --resume-scale: 1;
        }
        @media (max-width: 860px) {
          .resume-preview-scaler {
            --resume-scale: 0.9;
          }
        }
        @media (max-width: 768px) {
          .resume-preview-scaler {
            --resume-scale: 0.75;
          }
        }
        @media (max-width: 640px) {
          .resume-preview-scaler {
            --resume-scale: 0.6;
          }
        }
        @media (max-width: 480px) {
          .resume-preview-scaler {
            --resume-scale: 0.45;
          }
        }
        @media (max-width: 400px) {
          .resume-preview-scaler {
            --resume-scale: 0.38;
          }
        }
      `}} />
    </div>
  );
};

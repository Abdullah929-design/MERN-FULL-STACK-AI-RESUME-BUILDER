import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { TemplateSelector } from './TemplateSelector';
import { TemplateGallery } from './TemplateGallery';
import { DownloadPDF } from '../PDFExport';

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

export const ResumePreview: React.FC = () => {
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

  return (
    <div className="flex flex-col gap-6 h-full pb-10 overflow-y-auto pr-2">
      <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-md p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
        <TemplateSelector />
        <DownloadPDF />
      </div>

      <div className="flex-1 bg-white shadow-2xl rounded-sm overflow-hidden aspect-[1/1.414] w-full border border-gray-200 origin-top transform transition-all hover:shadow-3xl">
        <div className="h-full w-full overflow-y-auto preview-container">
          {renderTemplate()}
        </div>
      </div>

      <TemplateGallery />
    </div>
  );
};

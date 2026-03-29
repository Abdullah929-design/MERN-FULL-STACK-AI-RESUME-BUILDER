import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ATSTemplate } from './templates/ATSTemplate';
import { TemplateSelector } from './TemplateSelector';
import { DownloadPDF } from '../PDFExport';

export const ResumePreview: React.FC = () => {
  const { resume } = useResumeStore();
  const { template } = resume;

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'classic':
        return <ClassicTemplate resume={resume} />;
      case 'ats':
        return <ATSTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-md p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
        <TemplateSelector />
        <DownloadPDF />
      </div>

      <div className="flex-1 bg-white shadow-2xl rounded-sm overflow-hidden aspect-[1/1.414] w-full border border-gray-200 origin-top transform transition-all hover:shadow-3xl">
        <div className="h-full w-full overflow-y-auto preview-container">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';
const TEMPLATES = [
  { id: 'modern', name: 'Modern', layout: 'sidebar-left', primaryColor: '#1e3a8a' },
  { id: 'classic', name: 'Classic', layout: 'single-column', primaryColor: '#111827' },
  { id: 'ats', name: 'ATS Friendly', layout: 'single-column', primaryColor: '#000000' },
  { id: 'executive', name: 'Executive', layout: 'two-column', primaryColor: '#111827' },
  { id: 'minimalist', name: 'Minimalist', layout: 'single-column', primaryColor: '#000000' },
  { id: 'creative', name: 'Creative', layout: 'sidebar-right', primaryColor: '#0d9488' },
  { id: 'elegant', name: 'Elegant', layout: 'single-column', primaryColor: '#6b8e23' },
  { id: 'professional', name: 'Professional', layout: 'sidebar-left', primaryColor: '#1e3a8a' },
  { id: 'academia', name: 'Academia', layout: 'single-column', primaryColor: '#800000' },
  { id: 'compact', name: 'Compact', layout: 'single-column', primaryColor: '#1f2937' },
  { id: 'editorial', name: 'Editorial', layout: 'two-column', primaryColor: '#374151' },
  { id: 'nordic', name: 'Nordic', layout: 'sidebar-left', primaryColor: '#475569' },
  { id: 'timeline', name: 'Timeline', layout: 'single-column', primaryColor: '#2563eb' }
];

export const TemplateGallery: React.FC = () => {
  const { resume, setTemplate } = useResumeStore();
  const currentTemplate = resume.template;
  const templates = TEMPLATES;

  return (
    <div className="mt-12 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Template Gallery</h3>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{templates.length} Styles Available</span>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        {templates.map((temp) => (
          <button
            key={temp.id}
            onClick={() => setTemplate(temp.id as any)}
            className={cn(
              "w-full space-y-3 group transition-all",
              currentTemplate === temp.id ? "scale-105" : "hover:scale-102"
            )}
          >
            {/* Mini-Template Mockup */}
            <div className={cn(
              "aspect-[1/1.414] rounded-xl border-2 transition-all overflow-hidden relative shadow-sm group-hover:shadow-xl",
              currentTemplate === temp.id 
                ? "border-blue-600 ring-4 ring-blue-100 shadow-xl" 
                : "border-gray-100 hover:border-blue-300"
            )}>
              <div className="absolute inset-0 bg-white flex flex-col p-2 gap-1.5 grayscale group-hover:grayscale-0 transition-all">
                {/* Schematic rendering of the layout */}
                {temp.layout === 'sidebar-left' && (
                  <div className="flex h-full gap-1">
                    <div className={cn("w-1/3 h-full rounded-sm opacity-20")} style={{ backgroundColor: temp.primaryColor }} />
                    <div className="flex-1 space-y-1">
                      <div className="h-2 w-full bg-gray-100 rounded-sm" />
                      <div className="h-1 w-2/3 bg-gray-50 rounded-sm" />
                      <div className="h-6 w-full bg-gray-50 rounded-sm mt-2" />
                    </div>
                  </div>
                )}
                {temp.layout === 'single-column' && (
                  <div className="flex flex-col h-full gap-2">
                    <div className="h-4 w-full bg-gray-100 rounded-sm" />
                    <div className="h-1 w-1/3 bg-gray-50 rounded-sm mx-auto" />
                    <div className="flex-1 space-y-1 mt-2">
                       <div className="h-1 w-full bg-gray-50 rounded-sm" />
                       <div className="h-1 w-full bg-gray-50 rounded-sm" />
                       <div className="h-4 w-full bg-gray-50 rounded-sm mt-2" />
                    </div>
                  </div>
                )}
                {temp.layout === 'sidebar-right' && (
                  <div className="flex h-full gap-1 flex-row-reverse">
                    <div className={cn("w-1/3 h-full rounded-sm opacity-20")} style={{ backgroundColor: temp.primaryColor }} />
                    <div className="flex-1 space-y-1">
                      <div className="h-2 w-full bg-gray-100 rounded-sm" />
                      <div className="h-6 w-full bg-gray-50 rounded-sm mt-2" />
                    </div>
                  </div>
                )}
                {temp.layout === 'two-column' && (
                   <div className="flex flex-col h-full gap-1">
                    <div className={cn("h-1/3 w-full rounded-sm opacity-20 relative")} style={{ backgroundColor: temp.primaryColor }}>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
                    </div>
                    <div className="flex gap-1 flex-1 pt-1">
                        <div className="flex-1 bg-gray-50 rounded-sm" />
                        <div className="w-1/3 bg-gray-100 rounded-sm opacity-30" />
                    </div>
                  </div>
                )}
              </div>

              {/* Selection Checkmark */}
              {currentTemplate === temp.id && (
                <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                  <div className="bg-blue-600 text-white p-1 rounded-full animate-in zoom-in duration-300">
                    <Check size={16} />
                  </div>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="text-center">
              <p className={cn(
                "text-sm font-bold transition-colors",
                currentTemplate === temp.id ? "text-blue-600" : "text-gray-900 group-hover:text-blue-500"
              )}>
                {temp.name}
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-0.5">
                {temp.layout.replace(/-/g, ' ')}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

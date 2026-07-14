import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';
const TEMPLATES = [
  { id: 'modern', name: 'Modern', layout: 'sidebar-left', primaryColor: '#1e3a8a', image: '/modern_template.png' },
  { id: 'classic', name: 'Classic', layout: 'single-column', primaryColor: '#111827', image: '/classic_template.png' },
  { id: 'ats', name: 'ATS Friendly', layout: 'single-column', primaryColor: '#000000', image: '/ats_template.jpg' },
  { id: 'executive', name: 'Executive', layout: 'two-column', primaryColor: '#111827', image: '/executive_template.png' },
  { id: 'minimalist', name: 'Minimalist', layout: 'single-column', primaryColor: '#000000', image: '/minimalist_template.jfif' },
  { id: 'creative', name: 'Creative', layout: 'sidebar-right', primaryColor: '#0d9488', image: '/creative_template.png' },
  { id: 'elegant', name: 'Elegant', layout: 'single-column', primaryColor: '#6b8e23', image: '/elegant_template.jpg' },
  { id: 'professional', name: 'Professional', layout: 'sidebar-left', primaryColor: '#1e3a8a', image: '/professional_template.jpg' },
  { id: 'academia', name: 'Academia', layout: 'single-column', primaryColor: '#800000', image: '/academia_template.png' },
  { id: 'compact', name: 'Compact', layout: 'single-column', primaryColor: '#1f2937', image: '/compact_template.png' },
  { id: 'editorial', name: 'Editorial', layout: 'two-column', primaryColor: '#374151', image: '/editorial_template.png' },
  { id: 'nordic', name: 'Nordic', layout: 'sidebar-left', primaryColor: '#475569', image: '/nordic_template.jpg' },
  { id: 'timeline', name: 'Timeline', layout: 'single-column', primaryColor: '#2563eb', image: '/timeline_template.jpg' }
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
              "w-full space-y-3 group transition-all text-left outline-none",
              currentTemplate === temp.id ? "scale-105" : "hover:scale-102"
            )}
          >
            {/* Template Preview Image */}
            <div className={cn(
              "aspect-[1/1.414] rounded-xl border-2 transition-all overflow-hidden relative shadow-sm group-hover:shadow-xl bg-gray-50",
              currentTemplate === temp.id
                ? "border-blue-600 ring-4 ring-blue-100 shadow-xl"
                : "border-gray-100 hover:border-blue-300"
            )}>
              <img
                src={temp.image}
                alt={temp.name}
                className={cn(
                  "w-full h-full object-cover transition-all duration-500",
                  currentTemplate !== temp.id && "grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110"
                )}
              />

              {/* Selection Checkmark Overlay */}
              {currentTemplate === temp.id && (
                <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center backdrop-blur-[1px]">
                  <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg animate-in zoom-in duration-300">
                    <Check size={20} strokeWidth={3} />
                  </div>
                </div>
              )}

              {/* Hover Badge */}
              <div className="absolute bottom-2 left-2 right-2 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/90 backdrop-blur-md text-blue-600 text-[10px] font-black uppercase tracking-tighter py-1.5 px-2 rounded-lg text-center shadow-sm">
                  {currentTemplate === temp.id ? "Currently Active" : "Click to Apply"}
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="px-1">
              <p className={cn(
                "text-sm font-bold transition-colors",
                currentTemplate === temp.id ? "text-blue-600" : "text-gray-900 group-hover:text-blue-600"
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

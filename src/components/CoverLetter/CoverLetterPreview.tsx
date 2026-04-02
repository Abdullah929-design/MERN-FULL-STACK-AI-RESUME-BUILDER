import React from 'react';
import type { Resume } from '../../types/resume';

interface CoverLetterPreviewProps {
  paragraphs: string[];
  personal: Resume['sections']['personal'];
  template: 'classic' | 'modern' | 'executive';
}

export const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({ paragraphs, personal, template }) => {
  const currentDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(new Date());

  if (template === 'classic') {
    return (
      <div className="bg-white shadow-sm border border-gray-200 w-full min-h-[600px] p-12 font-serif text-gray-900 leading-relaxed text-[15px]">
        {/* Classic Header */}
        <div className="flex flex-col items-center border-b-[3px] border-double border-gray-300 pb-6 mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-wide uppercase mb-2">{personal.name || "Your Name"}</h1>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-700">
            {personal.location && <span>{personal.location}</span>}
            {personal.location && (personal.phone || personal.email) && <span>•</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.phone && personal.email && <span>•</span>}
            {personal.email && <span>{personal.email}</span>}
          </div>
          {personal.title && <p className="text-gray-600 mt-2 font-medium italic">{personal.title}</p>}
        </div>

        {/* Date */}
        <div className="mb-8">
          <p>{currentDate}</p>
        </div>

        {/* Body */}
        <div className="space-y-6 text-justify">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Sign-off */}
        <div className="mt-12 space-y-2">
          <p>Sincerely,</p>
          <div className="pt-6 font-bold text-lg">{personal.name || "Your Name"}</div>
        </div>
      </div>
    );
  }

  if (template === 'modern') {
    return (
      <div className="bg-white shadow-sm border border-gray-200 w-full min-h-[600px] flex flex-col font-sans text-gray-800 leading-relaxed text-[15px] overflow-hidden">
        {/* Modern Header */}
        <div className="bg-slate-900 border-b-4 border-blue-500 p-10 flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-white tracking-tight">{personal.name || "Your Name"}</h1>
            <h2 className="text-lg font-bold text-blue-400 capitalize">{personal.title || "Professional Title"}</h2>
          </div>
          <div className="text-right text-sm text-slate-300 space-y-1 font-medium">
            {personal.email && <p>{personal.email}</p>}
            {personal.phone && <p>{personal.phone}</p>}
            {personal.location && <p>{personal.location}</p>}
          </div>
        </div>

        {/* Content */}
        <div className="p-10 flex-1">
          <div className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">
            {currentDate}
          </div>

          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-gray-700">{p}</p>
            ))}
          </div>

          <div className="mt-12 space-y-4">
            <p className="font-semibold text-gray-800">Best regards,</p>
            <div>
              <p className="font-black text-slate-900 border-t-2 border-slate-200 inline-block pt-2">{personal.name || "Your Name"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Executive Template
  return (
    <div className="bg-white shadow-sm border border-gray-200 w-full min-h-[600px] flex text-gray-800 font-sans text-[14px]">
      {/* Side Band */}
      <div className="w-[120px] bg-slate-900 border-r-8 border-slate-700 p-8 flex flex-col items-center">
        {personal.photoUrl && (
           <img 
             src={personal.photoUrl} 
             alt={personal.name} 
             className="w-16 h-16 rounded-full border-2 border-slate-600 object-cover mb-4"
           />
        )}
      </div>

      {/* Main Area */}
      <div className="flex-1 p-12 flex flex-col">
        {/* Executive Header */}
        <div className="border-b-2 border-slate-900 pb-6 mb-10 flex flex-wrap justify-between items-start gap-6">
          <div className="flex-1 min-w-[200px] pr-4">
            <h1 className="text-3xl font-light text-slate-900 tracking-widest uppercase break-words leading-tight">{personal.name || "Your Name"}</h1>
            <p className="text-slate-500 font-medium tracking-wider uppercase text-xs mt-2 break-words">{personal.title || "Professional Title"}</p>
          </div>
          <div className="text-right text-xs text-slate-500 space-y-1 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100 shrink-0 max-w-[100%] break-all sm:max-w-xs">
            {personal.email && <p>{personal.email}</p>}
            {personal.phone && <p>{personal.phone}</p>}
            {personal.location && <p>{personal.location}</p>}
          </div>
        </div>

        <div className="mb-10 text-sm font-semibold text-slate-400">
          Date: {currentDate}
        </div>

        <div className="space-y-6 leading-loose text-slate-700">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-16">
          <p className="mb-8 font-medium">Respectfully,</p>
          <p className="text-xl font-light text-slate-900">{personal.name || "Your Name"}</p>
        </div>
      </div>
    </div>
  );
};

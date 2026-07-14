import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { DownloadPDF } from './PDFExport';
import { DownloadDocx } from './WordExport';
import { DownloadPNG } from './ImageExport';

export const DownloadManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 font-bold group scale-100 active:scale-95"
      >
        <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
        <span>Export Resume</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 sm:left-auto sm:right-0 mt-3 w-full sm:w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-2 z-50 animate-in fade-in zoom-in duration-200 origin-top">
          <div className="px-3 py-2 mb-1">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Format</h3>
          </div>
          
          <div className="flex flex-col gap-1">
            {/* Uniform styling for the inner download components */}
            <div className="flex flex-col gap-1 items-stretch" onClick={() => setIsOpen(false)}>
              <style dangerouslySetInnerHTML={{ __html: `
                .download-dropdown-inner button {
                  width: 100% !important;
                  display: flex !important;
                  align-items: center !important;
                  justify-content: flex-start !important;
                  border: none !important;
                  background: transparent !important;
                  padding: 0.85rem 1rem !important;
                  border-radius: 0.75rem !important;
                  box-shadow: none !important;
                  font-weight: 600 !important;
                  font-size: 0.875rem !important;
                  color: #374151 !important;
                  transition: all 0.2s !important;
                }
                .download-dropdown-inner button:hover {
                  background-color: #f0f7ff !important;
                  color: #2563eb !important;
                }
                .download-dropdown-inner button svg {
                  flex-shrink: 0 !important;
                }
              `}} />
              <div className="download-dropdown-inner space-y-1">
                <DownloadPDF />
                <DownloadDocx />
                <DownloadPNG />
              </div>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-gray-100 px-3 pb-1">
            <p className="text-[10px] text-gray-400 text-center font-medium">All exports include high-res formatting</p>
          </div>
        </div>
      )}
    </div>
  );
};

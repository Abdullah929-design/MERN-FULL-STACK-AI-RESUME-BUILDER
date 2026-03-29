import React, { useState, useRef } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { FileUp, Loader2, Sparkles, X, AlertCircle, Upload } from 'lucide-react';

import axios from 'axios';
import { parseFile } from '../../utils/fileParser';

export const ImportResume: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { setResume, incrementAIUsage, isAIALimitReached } = useResumeStore();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setError(null);

    try {
      const extractedText = await parseFile(file);
      setText(extractedText);
    } catch (err: any) {
      setError(err.message || 'Failed to parse file.');
    } finally {
      setIsParsing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleImport = async () => {
    if (isAIALimitReached()) {
      setError("Daily AI limit reached. Try again tomorrow.");
      return;
    }

    if (!text.trim()) {
      setError("Please paste text or upload a file first.");
      return;
    }

    setIsExtracting(true);
    setError(null);

    try {
      const response = await axios.post('/api/ai', {
        type: 'extract',
        input: { text }
      });

      if (response.data.resume) {
        setResume(response.data.resume);
        incrementAIUsage();
        setIsOpen(false);
        setText('');
      } else {
        throw new Error("Could not extract data");
      }
    } catch (err) {
      setError("Could not extract data. Please try again or paste cleaner text.");
      console.error(err);
    } finally {
      setIsExtracting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-sm hover:shadow-md"
      >
        <FileUp size={18} />
        Import from Existing Resume
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Import with AI</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Option 1: Upload PDF or DOCX</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group"
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.docx"
                className="hidden"
              />
              {isParsing ? (
                <Loader2 className="animate-spin text-blue-600" size={32} />
              ) : (
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full group-hover:scale-110 transition-transform">
                  <Upload size={24} />
                </div>
              )}
              <div className="text-center">
                <p className="font-semibold text-gray-900">{isParsing ? 'Parsing File...' : 'Click to Upload'}</p>
                <p className="text-xs text-gray-500 mt-1">Supports PDF and DOCX (Max 5MB)</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-sm text-gray-500 font-medium">OR</span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Option 2: Paste Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your resume content here..."
              className="w-full h-48 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-mono text-sm"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm slide-in-from-top-2 animate-in">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={isExtracting || isParsing || !text.trim()}
            className="flex-[2] px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-blue-200"
          >
            {isExtracting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Sparkles size={18} />
            )}
            {isExtracting ? "AI Extracting..." : "Auto-fill with AI"}
          </button>
        </div>
      </div>
    </div>
  );
};


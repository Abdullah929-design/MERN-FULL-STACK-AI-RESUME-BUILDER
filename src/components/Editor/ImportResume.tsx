import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useResumeStore } from '../../store/useResumeStore';
import {
  FileUp, Loader2, Sparkles, X, AlertCircle, Upload, FileText,
  ClipboardList, CheckCircle2, AlertTriangle, ArrowLeft, ShieldCheck
} from 'lucide-react';

import axios from 'axios';
import { parseFile } from '../../utils/fileParser';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Stage = 'input' | 'review';

export const ImportResume: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<'smart' | 'linkedin'>('smart');
  const [stage, setStage] = useState<Stage>('input');

  const [text, setText] = useState('');
  const [linkedinText, setLinkedinText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [warnings, setWarnings] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { resume, setResume, incrementAIUsage, isAIALimitReached, setShowAILimitPopup } = useResumeStore();

  const cn = (...inputs: (string | undefined | null | false)[]) => twMerge(clsx(inputs));

  const handleClose = () => {
    setIsOpen(false);
    setStage('input');
    setWarnings([]);
    setError(null);
    setText('');
    setLinkedinText('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsParsing(true);
    setError(null);
    try {
      const extractedText = await parseFile(file);
      if (tab === 'smart') setText(extractedText);
      else setLinkedinText(extractedText);
    } catch (err: any) {
      setError(err.message || 'Failed to parse file.');
    } finally {
      setIsParsing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  /** Shared apply logic — merges AI result into store and moves to review or closes */
  const applyExtraction = (aiResume: any, aiWarnings: string[]) => {
    setWarnings(aiWarnings || []);
    // Merge into store immediately so editor updates are live
    setResume({
      ...resume,
      sections: {
        ...resume.sections,
        ...aiResume.sections,
        // Always honour AI-returned customSections; never silently discard them
        customSections: aiResume.sections?.customSections?.length
          ? aiResume.sections.customSections
          : resume.sections.customSections || [],
      }
    });
    incrementAIUsage('autoFill');

    if (aiWarnings && aiWarnings.length > 0) {
      setStage('review');
    } else {
      handleClose();
    }
  };

  const handleSmartImport = async () => {
    if (isAIALimitReached('autoFill')) { setShowAILimitPopup(true); return; }
    if (!text.trim()) { setError('Please paste text or upload a file first.'); return; }

    setIsExtracting(true);
    setError(null);

    try {
      const response = await axios.post('/api/ai', { type: 'extract', input: { text } });
      if (response.data.resume) {
        applyExtraction(response.data.resume, response.data.warnings || []);
      } else {
        throw new Error('Could not extract data');
      }
    } catch (err) {
      setError('Could not extract data. Please try again or paste cleaner text.');
      console.error(err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleLinkedInExtract = async () => {
    if (isAIALimitReached('autoFill')) { setShowAILimitPopup(true); return; }
    if (!linkedinText.trim()) { setError('Please paste raw LinkedIn PDF text first.'); return; }

    setIsExtracting(true);
    setError(null);

    try {
      const response = await axios.post('/api/ai', {
        type: 'linkedin_extract',
        input: { text: linkedinText }
      });
      if (response.data.resume) {
        applyExtraction(response.data.resume, response.data.warnings || []);
      } else {
        throw new Error('Could not extract LinkedIn data');
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || err.response?.data?.details || err.message || 'Could not extract data. Please try again.';
      setError(msg);
      console.error('LinkedIn Extract Error:', err.response?.data || err);
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
        Import Tools
      </button>
    );
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* ... existing modal interior ... */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
          <div className="flex items-center gap-2">
            {stage === 'review' ? (
              <>
                <AlertTriangle className="text-amber-500" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Review Extraction</h2>
              </>
            ) : (
              <>
                <Sparkles className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">AI Import Tools</h2>
              </>
            )}
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {stage === 'input' && (
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setTab('smart')}
              className={cn('flex-1 py-3 px-4 font-semibold text-sm flex items-center justify-center gap-2 border-b-2 transition-colors',
                tab === 'smart' ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50')}
            >
              <Sparkles size={16} /> Smart Auto-fill
            </button>
            <button
              onClick={() => setTab('linkedin')}
              className={cn('flex-1 py-3 px-4 font-semibold text-sm flex items-center justify-center gap-2 border-b-2 transition-colors',
                tab === 'linkedin' ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50')}
            >
              <FileText size={16} /> LinkedIn Extractor
            </button>
          </div>
        )}

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.docx"
            className="hidden"
          />

          {stage === 'input' && tab === 'smart' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">Option 1: Upload Existing Resume (PDF/DOCX)</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group"
                >
                  {isParsing ? (
                    <Loader2 className="animate-spin text-blue-600" size={32} />
                  ) : (
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full group-hover:scale-110 transition-transform">
                      <Upload size={24} />
                    </div>
                  )}
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{isParsing ? 'Parsing File...' : 'Click to Upload'}</p>
                    <p className="text-xs text-gray-500 mt-1">Automatically populates all builder forms.</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
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
            </div>
          )}

          {stage === 'input' && tab === 'linkedin' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 text-blue-800 text-sm">
                <ClipboardList className="w-5 h-5 flex-shrink-0 text-blue-600 mt-0.5" />
                <p>Paste raw text from a LinkedIn PDF export or upload the PDF directly. The AI will clean up formatting, extract your details, and flag any ambiguities for your review.</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-semibold text-gray-700">Raw LinkedIn Text</label>
                  <button onClick={() => fileInputRef.current?.click()} className="text-xs text-blue-600 font-medium hover:text-blue-800 underline">
                    Upload PDF instead
                  </button>
                </div>
                <textarea
                  value={linkedinText}
                  onChange={(e) => setLinkedinText(e.target.value)}
                  placeholder="Paste the raw text here..."
                  className="w-full h-64 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-mono text-sm"
                />
              </div>
            </div>
          )}

          {stage === 'review' && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle2 className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-green-800 text-sm">Resume applied to your builder</p>
                  <p className="text-green-700 text-xs mt-0.5">Review the items below — the AI flagged {warnings.length} decision{warnings.length !== 1 ? 's' : ''} that need your attention.</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
                  <AlertTriangle size={16} />
                  AI Assumptions — Please Verify
                </div>
                <div className="border border-amber-200 rounded-xl overflow-hidden divide-y divide-amber-100">
                  {warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 bg-amber-50 text-sm text-amber-900">
                      <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600">
                <ShieldCheck size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <span>These items have been imported as-is. You can edit any field directly in the builder to correct them. Custom sections (Projects, Certifications, etc.) will appear under the custom sections panel.</span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 mt-4 bg-red-50 text-red-600 rounded-lg text-sm animate-in slide-in-from-top-2 border border-red-100">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3 bg-gray-50 mt-auto">
          {stage === 'input' && (
            <>
              <button
                onClick={handleClose}
                className="flex-[1] px-4 py-3 border border-gray-200 text-gray-600 bg-white rounded-xl hover:bg-gray-100 transition-colors font-semibold"
              >
                Cancel
              </button>
              {tab === 'smart' && (
                <button
                  onClick={handleSmartImport}
                  disabled={isExtracting || isParsing || !text.trim()}
                  className="flex-[2] px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-blue-200"
                >
                  {isExtracting ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                  {isExtracting ? 'AI Extracting...' : 'Auto-fill with AI'}
                </button>
              )}
              {tab === 'linkedin' && (
                <button
                  onClick={handleLinkedInExtract}
                  disabled={isExtracting || isParsing || !linkedinText.trim()}
                  className="flex-[2] px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-blue-200"
                >
                  {isExtracting ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
                  {isExtracting ? 'Auto-filling...' : 'Auto-fill with LinkedIn Data'}
                </button>
              )}
            </>
          )}

          {stage === 'review' && (
            <>
              <button
                onClick={() => { setStage('input'); setWarnings([]); }}
                className="flex-[1] px-4 py-3 border border-gray-200 text-gray-600 bg-white rounded-xl hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} />
                Import Again
              </button>
              <button
                onClick={handleClose}
                className="flex-[2] px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-green-200"
              >
                <CheckCircle2 size={18} />
                Looks Good — Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

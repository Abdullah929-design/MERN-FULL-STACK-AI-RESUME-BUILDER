import { Editor } from './components/Editor/Editor';
import { ResumePreview } from './components/Preview/ResumePreview';
import { Sparkles, FileText, BarChart, Share2 } from 'lucide-react';
import { useState } from 'react';
import { ATSScanner } from './components/ATS/ATSScanner';
import { ShareSettings } from './components/Preview/ShareSettings';
import { CoverLetterGenerator } from './components/CoverLetter/CoverLetterGenerator';

function App() {
  const [activeView, setActiveView] = useState<'builder' | 'ats' | 'share' | 'coverLetter'>('builder');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Sparkles className="text-white" size={20} />
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">AI Resume <span className="text-blue-600">Builder</span></span>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveView('builder')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'builder' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <FileText size={16} /> Resume Builder
          </button>
          <button 
            onClick={() => setActiveView('ats')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'ats' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <BarChart size={16} /> ATS Scanner
          </button>
          <button 
            onClick={() => setActiveView('coverLetter')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'coverLetter' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <Sparkles size={16} /> Cover Letter
          </button>
          <button 
            onClick={() => setActiveView('share')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'share' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <Share2 size={16} /> Share Link
          </button>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto bg-gray-50 custom-scrollbar">
        {activeView === 'builder' ? (
          <div className="flex h-full">
            {/* Left Side: Editor */}
            <div className="w-full md:w-[45%] lg:w-[40%] bg-white border-r border-gray-200 overflow-y-auto p-8 custom-scrollbar">
              <div className="max-w-2xl mx-auto">
                <Editor />
              </div>
            </div>

            {/* Right Side: Preview */}
            <div className="hidden md:block flex-1 bg-gray-100 overflow-y-auto p-8 custom-scrollbar">
              <div className="max-w-4xl mx-auto">
                <ResumePreview />
              </div>
            </div>
          </div>
        ) : activeView === 'ats' ? (
          <div className="p-4 md:p-8">
            <ATSScanner />
          </div>
        ) : activeView === 'coverLetter' ? (
          <div className="p-4 md:p-8">
            <CoverLetterGenerator />
          </div>
        ) : (
          <div className="p-4 md:p-8">
            <ShareSettings />
          </div>
        )}
      </main>
      
      {/* Mobile Preview Link/Button could go here if needed, but keeping it simple for MVP */}
    </div>
  );
}

export default App;

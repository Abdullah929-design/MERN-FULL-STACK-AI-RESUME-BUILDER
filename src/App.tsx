import { Editor } from './components/Editor/Editor';
import { ResumePreview } from './components/Preview/ResumePreview';
import { Sparkles, FileText, BarChart, Share2, Layout } from 'lucide-react';
import { useState } from 'react';
import { ATSScanner } from './components/ATS/ATSScanner';
import { ShareSettings } from './components/Preview/ShareSettings';
import { CoverLetterGenerator } from './components/CoverLetter/CoverLetterGenerator';
import { ImportResume } from './components/Editor/ImportResume';
import { SampleTemplatesSelector } from './components/Editor/SampleTemplatesSelector';
import { AILimitPopup } from './components/AILimitPopup';
import { SEO } from './components/SEO';
import { Routes, Route, Link } from 'react-router-dom';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import About from './pages/About';
import Contact from './pages/Contact';
import Landing from './pages/Landing';
import { Footer } from './components/Footer';

function BuilderApp() {
  const [activeView, setActiveView] = useState<'builder' | 'editor' | 'ats' | 'share' | 'coverLetter'>('builder');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO 
        title={
          activeView === 'builder' ? 'AI Resume Builder' :
          activeView === 'editor' ? 'Resume Editor' :
          activeView === 'ats' ? 'ATS Resume Scanner' :
          activeView === 'coverLetter' ? 'AI Cover Letter Generator' :
          'Share Resume'
        }
        description={
          activeView === 'builder' ? 'Create a professional resume with AI.' :
          activeView === 'editor' ? 'Edit and customize your resume content with AI suggestions.' :
          activeView === 'ats' ? 'Optimize your resume for applicant tracking systems.' :
          activeView === 'coverLetter' ? 'Generate high-quality cover letters instantly with AI.' :
          'Share your professional resume with recruiters and employers.'
        }
      />
      <AILimitPopup />
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-2">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100 transform transition-transform active:scale-90">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight whitespace-nowrap hidden lg:inline">
                AI Resume <span className="text-blue-600">Builder</span>
              </span>
            </Link>
            
            {/* Nav Links - Center/Fit on mobile */}
            <div className="flex-1 flex justify-end overflow-hidden">
              <div className="flex items-center p-1 bg-gray-100/80 rounded-xl md:rounded-2xl">
                {[
                  { id: 'builder', label: 'Home', icon: FileText },
                  { id: 'editor', label: 'Editor', icon: Layout },
                  { id: 'ats', label: 'ATS', icon: BarChart },
                  { id: 'coverLetter', label: 'Letter', icon: Sparkles },
                  { id: 'share', label: 'Share', icon: Share2 },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id as any)}
                    className={`flex items-center gap-1.5 px-2.5 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-[10px] md:text-sm font-black transition-all whitespace-nowrap ${
                      activeView === item.id 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <item.icon size={16} className={activeView === item.id ? 'text-blue-500' : ''} />
                    <span className="hidden sm:inline-block tracking-tight">{item.label}</span>
                    {activeView === item.id && <span className="sm:hidden inline-block tracking-tight">{item.label}</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 bg-gray-50">
        {activeView === 'builder' ? (
          <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 md:space-y-8">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 md:p-10 rounded-[2rem] border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Your Resume</h1>
                <p className="text-gray-500 mt-2 text-sm md:text-base">Select a template and preview your professional profile</p>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex gap-2 w-full sm:w-auto">
                  <SampleTemplatesSelector />
                  <ImportResume />
                </div>
                <button 
                  onClick={() => setActiveView('editor')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 active:scale-95 group"
                >
                  <Layout size={20} className="group-hover:rotate-12 transition-transform" /> 
                  Edit Content
                </button>
              </div>
            </header>
            
            <div className="bg-white rounded-[2rem] border border-gray-200 shadow-xl shadow-gray-200/50 overflow-hidden p-3 md:p-8 relative">
               <ResumePreview />
            </div>
          </div>
        ) : activeView === 'editor' ? (
          <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 md:space-y-12">
            {/* Editor Top Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
               <div className="space-y-2 text-center sm:text-left">
                 <button 
                    onClick={() => setActiveView('builder')}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-bold text-xs uppercase tracking-widest"
                  >
                    &larr; Dashboard
                  </button>
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center justify-center sm:justify-start gap-3">
                    <span className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
                      <Layout size={24} />
                    </span>
                    Editor
                  </h1>
               </div>
                <div className="flex items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
                  <div className="w-full sm:w-auto flex justify-center">
                    <ImportResume />
                  </div>
                  <div className="hidden xs:flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-100 shadow-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Auto-Saving
                  </div>
                </div>
            </div>

            {/* Content Split - Stacked for Mobile */}
            <div className="grid grid-cols-1 gap-8 md:gap-12 pb-32">
              {/* Preview - At Top */}
              <section className="space-y-6">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-gray-900 tracking-tight">Live Preview</h2>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">Real-time Visualization</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-[2rem] border border-gray-200 shadow-2xl shadow-gray-200/50 p-3 md:p-8">
                  <ResumePreview hideControls />
                </div>
              </section>

              {/* Form - At Bottom */}
              <section className="space-y-6">
                 <div className="flex items-center gap-3 px-4">
                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-200">
                      <Layout size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-gray-900 tracking-tight">Edit Sections</h2>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">Fill in your information</p>
                    </div>
                  </div>
                <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-gray-201 shadow-sm transition-all hover:shadow-md">
                  <Editor />
                </div>
              </section>
            </div>
          </div>
        ) : activeView === 'ats' ? (
          <div className="p-4 sm:p-6 lg:p-8">
            <ATSScanner />
          </div>
        ) : activeView === 'coverLetter' ? (
          <div className="p-4 sm:p-6 lg:p-8">
            <CoverLetterGenerator />
          </div>
        ) : (
          <div className="p-4 sm:p-6 lg:p-8">
            <ShareSettings />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/builder" element={<BuilderApp />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </>
  );
}

export default App;

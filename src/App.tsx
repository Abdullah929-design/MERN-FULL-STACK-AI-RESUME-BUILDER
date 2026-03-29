import { Editor } from './components/Editor/Editor';

import { ResumePreview } from './components/Preview/ResumePreview';
import { Sparkles } from 'lucide-react';

function App() {
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
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
          <a href="#personal-info" className="hover:text-blue-600 transition-colors">Personal</a>
          <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
          <a href="#skills" className="hover:text-blue-600 transition-colors">Skills</a>
        </div>
      </nav>

      <main className="flex-1 flex overflow-hidden">
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
      </main>
      
      {/* Mobile Preview Link/Button could go here if needed, but keeping it simple for MVP */}
    </div>
  );
}

export default App;

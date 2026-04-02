import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Layout, Sparkles, X, Check, Code, Megaphone, Palette, AlertTriangle } from 'lucide-react';
import samples from '../../data/sampleTemplates.json';

export const SampleTemplatesSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const { setResume } = useResumeStore();

  const handleSelect = (id: string) => {
    setShowConfirm(id);
  };

  const confirmLoad = () => {
    if (showConfirm) {
      const sample = samples.find(s => s.id === showConfirm);
      if (sample) {
        // Casting as any because JSON might need some id re-generation if needed, 
        // but setResume handles the structure.
        setResume(sample as any);
        setIsOpen(false);
        setShowConfirm(null);
      }
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'tech-sample': return <Code size={24} className="text-blue-500" />;
      case 'marketing-sample': return <Megaphone size={24} className="text-orange-500" />;
      case 'design-sample': return <Palette size={24} className="text-pink-500" />;
      default: return <Sparkles size={24} className="text-purple-500" />;
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-semibold shadow-sm"
      >
        <Layout size={18} className="text-blue-600" />
        Browse Samples
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
          <div className="flex items-center gap-2">
            <Layout className="text-blue-600" size={24} />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Industry Templates</h2>
              <p className="text-xs text-gray-500">Pick a starting point for your sector</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {samples.map((sample) => (
            <div 
              key={sample.id}
              onClick={() => handleSelect(sample.id)}
              className={`relative group p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-4 ${
                showConfirm === sample.id 
                  ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-100' 
                  : 'border-gray-100 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              <div className="p-3 bg-white rounded-xl shadow-sm self-start group-hover:scale-110 transition-transform">
                {getIcon(sample.id)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{sample.title}</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{sample.description}</p>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-blue-600 font-bold text-sm">
                <span>Load Sample</span>
                <Check size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {showConfirm && (
          <div className="p-6 bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-bottom-10 duration-500">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500 rounded-lg">
                <AlertTriangle size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">Are you sure?</p>
                <p className="text-blue-100 text-sm">This will overwrite your current resume data. This cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={() => setShowConfirm(null)}
                className="flex-1 md:flex-none px-6 py-2 bg-blue-700 hover:bg-blue-800 rounded-xl font-bold transition-colors"
              >
                No, Keep My Data
              </button>
              <button 
                onClick={confirmLoad}
                className="flex-1 md:flex-none px-6 py-2 bg-white text-blue-600 hover:bg-gray-50 rounded-xl font-bold shadow-lg transition-colors"
              >
                Yes, Load Sample
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

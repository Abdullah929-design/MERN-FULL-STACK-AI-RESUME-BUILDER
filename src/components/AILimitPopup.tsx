import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { X, Clock, AlertTriangle } from 'lucide-react';

export const AILimitPopup: React.FC = () => {
  const { showAILimitPopup, setShowAILimitPopup } = useResumeStore();

  if (!showAILimitPopup) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={() => setShowAILimitPopup(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <X size={20} />
        </button>
        
        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-2 shadow-inner">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Daily AI Limit Reached</h2>
          <p className="text-gray-600 text-sm leading-relaxed px-2">
            You've hit your free AI generation limit for this feature to prevent API abuse.
          </p>
          <div className="flex items-center gap-2 text-amber-700 text-sm font-semibold bg-amber-50 px-4 py-3 rounded-lg mt-2 w-full justify-center border border-amber-100">
            <Clock size={16} />
            <span>Please try again after 24 hours.</span>
          </div>
          
          <button 
            onClick={() => setShowAILimitPopup(false)}
            className="w-full mt-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-md"
          >
            Got it, thanks
          </button>
        </div>
      </div>
    </div>
  );
};

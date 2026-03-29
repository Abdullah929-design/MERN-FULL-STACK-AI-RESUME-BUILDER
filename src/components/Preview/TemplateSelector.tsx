import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Layout, FileText, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export const TemplateSelector: React.FC = () => {
  const { resume, setTemplate } = useResumeStore();
  const { template } = resume;

  const templates = [
    { id: 'modern', name: 'Modern', icon: <Layout size={16} /> },
    { id: 'classic', name: 'Classic', icon: <FileText size={16} /> },
    { id: 'ats', name: 'ATS-Friendly', icon: <Check size={16} /> },
  ];

  return (
    <div className="flex bg-gray-100 p-1 rounded-lg">
      {templates.map((temp) => (
        <button
          key={temp.id}
          onClick={() => setTemplate(temp.id as any)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all",
            template === temp.id
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
          )}
        >
          {temp.icon}
          {temp.name}
        </button>
      ))}
    </div>
  );
};

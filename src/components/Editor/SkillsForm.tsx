import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { X, Plus, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';

export const SkillsForm: React.FC = () => {
  const { resume, addSkill, removeSkill, setSkills, incrementAIUsage, isAIALimitReached, setShowAILimitPopup } = useResumeStore();
  const { skills, personal } = resume.sections;
  const [newSkill, setNewSkill] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleAddSkill = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const handleSuggestSkills = async () => {
    if (isAIALimitReached('description')) {
      setShowAILimitPopup(true);
      return;
    }
    if (!personal.title) {
      alert("Please enter a professional title first.");
      return;
    }

    setIsSuggesting(true);
    try {
      const response = await axios.post('/api/ai', {
        type: 'skills',
        input: { title: personal.title }
      });
      if (response.data.skills) {
        // Merge with existing skills
        const merged = [...new Set([...skills, ...response.data.skills])];
        setSkills(merged);
        incrementAIUsage('description');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1 mb-1">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
          Your Expertise
          <span className="text-[10px] font-bold text-indigo-400">({skills.length}/15)</span>
        </label>
        <button
          onClick={handleSuggestSkills}
          disabled={isSuggesting || skills.length >= 15}
          className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors disabled:opacity-50"
        >
          {isSuggesting ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
          AI SUGGEST
        </button>
      </div>

      <form onSubmit={handleAddSkill} className="relative group/form">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          disabled={skills.length >= 15}
          placeholder={skills.length >= 15 ? "Limit reached" : "Add a skill manually..."}
          className="w-full pl-4 pr-14 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all disabled:opacity-50 shadow-sm text-sm font-medium"
        />
        <button
          type="submit"
          disabled={!newSkill.trim() || skills.length >= 15}
          className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center active:scale-95 shadow-sm"
        >
          <Plus size={18} strokeWidth={3} />
        </button>
      </form>

      <div className="flex flex-wrap gap-2 pt-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium group hover:bg-gray-200 transition-colors"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="p-0.5 hover:text-red-500 rounded-full transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        {skills.length === 0 && (
          <p className="text-gray-400 text-sm italic py-2">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};

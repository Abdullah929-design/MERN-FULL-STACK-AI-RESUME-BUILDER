import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { X, Plus, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';

export const SkillsForm: React.FC = () => {
  const { resume, addSkill, removeSkill, setSkills, incrementAIUsage, isAIALimitReached } = useResumeStore();
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
    if (isAIALimitReached()) {
      alert("Daily AI limit reached. Try again tomorrow.");
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
        incrementAIUsage();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">Add your expertise</label>
        <button
          onClick={handleSuggestSkills}
          disabled={isSuggesting}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors disabled:opacity-50"
        >
          {isSuggesting ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
          Suggest Skills
        </button>
      </div>

      <form onSubmit={handleAddSkill} className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="e.g. React, TypeScript, Project Management"
          className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!newSkill.trim()}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          <Plus size={20} />
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

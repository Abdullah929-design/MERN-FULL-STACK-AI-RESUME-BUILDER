import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2, ChevronUp, ChevronDown, ListPlus } from 'lucide-react';

export const CustomSectionsForm: React.FC = () => {
  const { resume, addCustomSection, removeCustomSection, updateCustomSectionTitle, reorderCustomSection, addCustomItem, updateCustomItem, removeCustomItem } = useResumeStore();
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSectionTitle.trim()) {
      addCustomSection(newSectionTitle.trim());
      setNewSectionTitle('');
    }
  };

  const customSections = resume.sections.customSections || [];

  return (
    <div className="space-y-8">
      {/* Add New Section */}
      <form onSubmit={handleAddSection} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          placeholder="e.g., Projects, Certifications, Languages"
          className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
        />
        <button
          type="submit"
          disabled={!newSectionTitle.trim() || customSections.length >= 5}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold shadow-lg shadow-blue-100"
        >
          <Plus size={18} />
          <span>{customSections.length >= 5 ? 'Limit Reached' : 'Add Section'}</span>
        </button>
      </form>

      {/* Sections List */}
      <div className="space-y-10">
        {customSections.map((section, index) => (
          <div key={section.id} className="relative group border-b border-gray-100 pb-10 last:border-0 last:pb-0">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex flex-col gap-1 pr-2 border-r border-gray-200 flex-shrink-0">
                  <button
                    onClick={() => reorderCustomSection(section.id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 transition-colors"
                    title="Move Up"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    onClick={() => reorderCustomSection(section.id, 'down')}
                    disabled={index === (resume.sections.customSections || []).length - 1}
                    className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 transition-colors"
                    title="Move Down"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateCustomSectionTitle(section.id, e.target.value)}
                  className="text-lg font-bold text-gray-800 bg-transparent border-b-2 border-transparent hover:border-gray-200 focus:border-blue-500 focus:outline-none px-1 py-0.5 transition-all flex-1 min-w-0"
                />
              </div>
              <button
                onClick={() => removeCustomSection(section.id)}
                className="flex-shrink-0 p-2.5 text-red-500 hover:text-red-700 hover:bg-red-50 bg-red-50/50 rounded-xl transition-all border border-red-100 shadow-sm"
                title="Delete Section"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-6 sm:ml-12">
              {section.items.map((item) => (
                <div key={item.id} className="p-6 bg-white rounded-2xl border border-gray-100 space-y-6 relative group/item shadow-sm">
                  {/* Item Header */}
                  <div className="flex justify-between items-center border-b border-gray-50 pb-4 -mx-2 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Section Entry</span>
                    </div>
                    <button
                      onClick={() => removeCustomItem(section.id, item.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 bg-red-50/50 rounded-xl transition-all border border-red-100 shadow-sm"
                      title="Delete Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateCustomItem(section.id, item.id, { title: e.target.value })}
                        placeholder="Project Name or Award"
                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Subtitle / Organization</label>
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) => updateCustomItem(section.id, item.id, { subtitle: e.target.value })}
                        placeholder="Institution or Authority"
                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Date / Duration</label>
                      <input
                        type="text"
                        value={item.date}
                        onChange={(e) => updateCustomItem(section.id, item.id, { date: e.target.value })}
                        placeholder="e.g., June 2023 - Present"
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateCustomItem(section.id, item.id, { description: e.target.value })}
                      placeholder="Describe your achievements, roles, or details..."
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium transition-all resize-none pb-8 shadow-sm"
                    />
                    <div className="absolute bottom-2 right-3 text-[10px] font-bold text-gray-400 bg-white/80 px-1 rounded">
                      {item.description?.length || 0}/500
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => addCustomItem(section.id)}
                disabled={section.items.length >= 5}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all text-sm font-semibold border border-dashed border-blue-200 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={16} />
                {section.items.length >= 5 ? `Limit Reached (Max 5 items)` : `Add Item to ${section.title}`}
              </button>
            </div>
          </div>
        ))}

        {(resume.sections.customSections || []).length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <ListPlus size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No custom sections yet.</p>
            <p className="text-gray-400 text-sm mt-1">Add sections like Projects, Awards, or Languages to stand out!</p>
          </div>
        )}
      </div>
    </div>
  );
};

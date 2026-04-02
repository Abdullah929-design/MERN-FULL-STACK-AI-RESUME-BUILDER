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
      <form onSubmit={handleAddSection} className="flex gap-2">
        <input
          type="text"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          placeholder="e.g., Projects, Certifications, Languages"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!newSectionTitle.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
        >
          <Plus size={18} />
          Add Section
        </button>
      </form>

      {/* Sections List */}
      <div className="space-y-10">
        {customSections.map((section, index) => (
          <div key={section.id} className="relative group border-b border-gray-100 pb-10 last:border-0 last:pb-0">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex flex-col gap-1 pr-2 border-r border-gray-200">
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
                  className="text-lg font-bold text-gray-800 bg-transparent border-b-2 border-transparent hover:border-gray-200 focus:border-blue-500 focus:outline-none px-1 py-0.5 transition-all flex-1"
                />
              </div>
              <button
                onClick={() => removeCustomSection(section.id)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Delete Section"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-6 ml-12">
              {section.items.map((item) => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-4 relative group/item">
                  <button
                    onClick={() => removeCustomItem(section.id, item.id)}
                    className="absolute -right-2 -top-2 p-1.5 bg-white text-red-400 hover:text-red-600 border border-red-100 rounded-full opacity-0 group-item/item:opacity-100 transition-all shadow-sm"
                  >
                    <Trash2 size={14} />
                  </button>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateCustomItem(section.id, item.id, { title: e.target.value })}
                        placeholder="e.g., Project Name"
                        className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Subtitle / Org</label>
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) => updateCustomItem(section.id, item.id, { subtitle: e.target.value })}
                        placeholder="e.g., Institution"
                        className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Date / Duration</label>
                      <input
                        type="text"
                        value={item.date}
                        onChange={(e) => updateCustomItem(section.id, item.id, { date: e.target.value })}
                        placeholder="e.g., 2023 - Present"
                        className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateCustomItem(section.id, item.id, { description: e.target.value })}
                      placeholder="Details about this item..."
                      rows={2}
                      className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all resize-none"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={() => addCustomItem(section.id)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all text-sm font-semibold border border-dashed border-blue-200 w-full justify-center"
              >
                <Plus size={16} />
                Add Item to {section.title}
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

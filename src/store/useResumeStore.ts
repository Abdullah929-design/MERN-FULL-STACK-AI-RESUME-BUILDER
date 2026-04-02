import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Resume, AIUsage, Experience, Education, CustomSectionItem } from '../types/resume';


interface ResumeState {
  resume: Resume;
  aiUsage: AIUsage;
  
  // Actions
  updatePersonal: (personal: Partial<Resume['sections']['personal']>) => void;
  updateSummary: (summary: string) => void;
  
  addExperience: () => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  
  addEducation: () => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  setSkills: (skills: string[]) => void;
  
  // Custom Sections
  addCustomSection: (title: string) => void;
  updateCustomSectionTitle: (id: string, title: string) => void;
  removeCustomSection: (id: string) => void;
  reorderCustomSection: (id: string, direction: 'up' | 'down') => void;
  
  addCustomItem: (sectionId: string) => void;
  updateCustomItem: (sectionId: string, itemId: string, item: Partial<CustomSectionItem>) => void;
  removeCustomItem: (sectionId: string, itemId: string) => void;
  
  setTemplate: (template: Resume['template']) => void;
  setResume: (resume: Resume) => void;
  
  incrementAIUsage: () => void;
  isAIALimitReached: () => boolean;
}

const initialResume: Resume = {
  title: 'My Resume',
  template: 'modern',
  sections: {
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      photoUrl: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    customSections: [],
  },
};

const initialAIUsage: AIUsage = {
  count: 0,
  lastReset: new Date().toISOString().split('T')[0],
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resume: initialResume,
      aiUsage: initialAIUsage,

      updatePersonal: (personal) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              personal: { ...state.resume.sections.personal, ...personal },
            },
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: { ...state.resume.sections, summary },
          },
        })),

      addExperience: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              experience: [
                ...(state.resume.sections.experience || []),
                {
                  id: crypto.randomUUID(),
                  company: '',
                  role: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                  bullets: [],
                },
              ],
            },
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              experience: (state.resume.sections.experience || []).map((exp) =>
                exp.id === id ? { ...exp, ...experience } : exp
              ),
            },
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              experience: (state.resume.sections.experience || []).filter((exp) => exp.id !== id),
            },
          },
        })),

      addEducation: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              education: [
                ...(state.resume.sections.education || []),
                { id: crypto.randomUUID(), institution: '', degree: '', year: '' },
              ],
            },
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              education: (state.resume.sections.education || []).map((edu) =>
                edu.id === id ? { ...edu, ...education } : edu
              ),
            },
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              education: (state.resume.sections.education || []).filter((edu) => edu.id !== id),
            },
          },
        })),

      addSkill: (skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              skills: [...new Set([...(state.resume.sections.skills || []), skill])],
            },
          },
        })),

      removeSkill: (skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              skills: (state.resume.sections.skills || []).filter((s) => s !== skill),
            },
          },
        })),

      setSkills: (skills) =>
        set((state) => {
          const sanitized = Array.isArray(skills) 
            ? skills.flatMap(s => typeof s === 'string' ? s : Object.values(s as any).flat().filter(v => typeof v === 'string') as string[])
            : [];
          return {
            resume: {
              ...state.resume,
              sections: { ...state.resume.sections, skills: [...new Set(sanitized)] },
            },
          };
        }),

      // Custom Sections Actions
      addCustomSection: (title) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              customSections: [
                ...(state.resume.sections.customSections || []),
                { id: crypto.randomUUID(), title, items: [] },
              ],
            },
          },
        })),

      updateCustomSectionTitle: (id, title) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              customSections: (state.resume.sections.customSections || []).map((s) =>
                s.id === id ? { ...s, title } : s
              ),
            },
          },
        })),

      removeCustomSection: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              customSections: (state.resume.sections.customSections || []).filter((s) => s.id !== id),
            },
          },
        })),

      reorderCustomSection: (id, direction) =>
        set((state) => {
          const sections = [...(state.resume.sections.customSections || [])];
          const index = sections.findIndex((s) => s.id === id);
          if (index === -1) return state;

          const newIndex = direction === 'up' ? index - 1 : index + 1;
          if (newIndex < 0 || newIndex >= sections.length) return state;

          [sections[index], sections[newIndex]] = [sections[newIndex], sections[index]];

          return {
            resume: {
              ...state.resume,
              sections: {
                ...state.resume.sections,
                customSections: sections,
              },
            },
          };
        }),

      addCustomItem: (sectionId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              customSections: (state.resume.sections.customSections || []).map((s) =>
                s.id === sectionId
                  ? {
                      ...s,
                      items: [
                        ...s.items,
                        { id: crypto.randomUUID(), title: '', subtitle: '', date: '', description: '' },
                      ],
                    }
                  : s
              ),
            },
          },
        })),

      updateCustomItem: (sectionId, itemId, item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              customSections: (state.resume.sections.customSections || []).map((s) =>
                s.id === sectionId
                  ? {
                      ...s,
                      items: s.items.map((i) => (i.id === itemId ? { ...i, ...item } : i)),
                    }
                  : s
              ),
            },
          },
        })),

      removeCustomItem: (sectionId, itemId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              customSections: (state.resume.sections.customSections || []).map((s) =>
                s.id === sectionId
                  ? {
                      ...s,
                      items: s.items.filter((i) => i.id !== itemId),
                    }
                  : s
              ),
            },
          },
        })),

      setTemplate: (template) =>
        set((state) => ({
          resume: { ...state.resume, template },
        })),

      setResume: (resume) => {
        // Sanitize incoming resume skills just in case the API returned objects
        if (resume.sections?.skills) {
          resume.sections.skills = Array.isArray(resume.sections.skills)
            ? resume.sections.skills.flatMap(s => typeof s === 'string' ? s : Object.values(s as any).flat().filter(v => typeof v === 'string') as string[])
            : [];
          resume.sections.skills = [...new Set(resume.sections.skills)];
        }
        
        // Ensure customSections exists
        if (!resume.sections.customSections) {
          resume.sections.customSections = [];
        }

        // Ensure photoUrl exists
        if (!resume.sections.personal.photoUrl) {
          resume.sections.personal.photoUrl = '';
        }
        
        set({ resume });
      },


      incrementAIUsage: () => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => {
          const isNewDay = state.aiUsage.lastReset !== today;
          return {
            aiUsage: {
              count: isNewDay ? 1 : state.aiUsage.count + 1,
              lastReset: today,
            },
          };
        });
      },

      isAIALimitReached: () => {
        const today = new Date().toISOString().split('T')[0];
        const state = get();
        if (state.aiUsage.lastReset !== today) return false;
        return state.aiUsage.count >= 5;
      },
    }),
    {
      name: 'resume-storage',
      version: 2,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          if (persistedState.resume?.sections && !persistedState.resume.sections.customSections) {
            persistedState.resume.sections.customSections = [];
          }
        }
        if (version < 2) {
          if (persistedState.resume?.sections?.personal && !persistedState.resume.sections.personal.photoUrl) {
            persistedState.resume.sections.personal.photoUrl = '';
          }
        }
        return persistedState as ResumeState;
      },
    }
  )
);

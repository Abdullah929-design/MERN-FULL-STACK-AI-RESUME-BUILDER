import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Resume, AIUsage, Experience, Education } from '../types/resume';


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
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
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
                ...state.resume.sections.experience,
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
              experience: state.resume.sections.experience.map((exp) =>
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
              experience: state.resume.sections.experience.filter((exp) => exp.id !== id),
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
                ...state.resume.sections.education,
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
              education: state.resume.sections.education.map((edu) =>
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
              education: state.resume.sections.education.filter((edu) => edu.id !== id),
            },
          },
        })),

      addSkill: (skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              skills: [...new Set([...state.resume.sections.skills, skill])],
            },
          },
        })),

      removeSkill: (skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              skills: state.resume.sections.skills.filter((s) => s !== skill),
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
    }
  )
);

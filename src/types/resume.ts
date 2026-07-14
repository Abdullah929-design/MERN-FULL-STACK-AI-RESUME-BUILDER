export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  photoUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface Resume {
  title: string;
  template: 'modern' | 'classic' | 'ats' | 'executive' | 'minimalist' | 'creative' | 'elegant' | 'professional' | 'academia' | 'compact' | 'editorial' | 'nordic' | 'timeline';
  sections: {
    personal: PersonalInfo;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
    customSections: CustomSection[];
  };
}

export type AIUsageType = 'description' | 'autoFill' | 'ats' | 'coverLetter' | 'social';

export interface AIUsage {
  description: number;
  autoFill: number;
  ats: number;
  coverLetter: number;
  social: number;
  lastReset: string;
}

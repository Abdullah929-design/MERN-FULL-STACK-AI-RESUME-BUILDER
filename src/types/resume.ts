export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  title: string;
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

export interface Resume {
  title: string;
  template: 'modern' | 'classic' | 'ats';
  sections: {
    personal: PersonalInfo;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
  };
}

export interface AIUsage {
  count: number;
  lastReset: string;
}

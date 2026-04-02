export interface TemplateConfig {
  id: string;
  name: string;
  description?: string;
  layout: 'single-column' | 'sidebar-left' | 'sidebar-right' | 'two-column';
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent?: string;
  };
  typography: {
    fontFamily: string;
    headerFont?: string;
    sizes: {
      h1: string;
      h2: string;
      h3: string;
      body: string;
      small: string;
    };
  };
  sections: SectionConfig[];
  spacing: {
    section: string;
    item: string;
    padding: string;
  };
}

export interface SectionConfig {
  id: string;
  type: 'header' | 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'custom';
  component: string;
  props: Record<string, any>;
  order: number;
  layout?: {
    width?: 'full' | 'half' | 'third';
    position?: 'left' | 'right' | 'center';
  };
  styling?: {
    background?: string;
    border?: string;
    padding?: string;
    margin?: string;
  };
}

export interface ComponentProps {
  resume: any;
  theme: TemplateConfig['theme'];
  typography: TemplateConfig['typography'];
  spacing: TemplateConfig['spacing'];
  config: SectionConfig;
}

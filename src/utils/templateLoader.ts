import templateConfigs from '../data/templateConfigs.json';
import type { TemplateConfig } from '../types/template';

export const loadTemplateConfig = (templateId: string): TemplateConfig => {
  const config = (templateConfigs as Record<string, TemplateConfig>)[templateId];
  if (!config) {
    throw new Error(`Template configuration not found for: ${templateId}`);
  }
  return config;
};

export const getAllTemplateConfigs = (): TemplateConfig[] => {
  return Object.values(templateConfigs as Record<string, TemplateConfig>);
};

export const getTemplateMetadata = () => {
  return Object.values(templateConfigs as Record<string, TemplateConfig>).map(config => ({
    id: config.id,
    name: config.name,
    description: config.description,
    layout: config.layout,
    primaryColor: config.theme.primary
  }));
};

import React from 'react';
import { PersonalInfoForm } from './PersonalInfoForm';
import { SummaryForm } from './SummaryForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ImportResume } from './ImportResume';
import { User, Briefcase, GraduationCap, Wrench, Sparkles } from 'lucide-react';


export const Editor: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resume Editor</h1>
          <p className="text-gray-500 text-sm">Build your professional identity</p>
        </div>
        <ImportResume />
      </header>

      <div className="space-y-12">
        <section id="personal-info">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <User size={20} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <PersonalInfoForm />
          </div>
        </section>

        <section id="summary">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <Sparkles size={20} className="text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-800">Professional Summary</h2>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <SummaryForm />
          </div>
        </section>

        <section id="experience">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <Briefcase size={20} className="text-orange-600" />
            <h2 className="text-lg font-semibold text-gray-800">Work Experience</h2>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <ExperienceForm />
          </div>
        </section>

        <section id="education">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <GraduationCap size={20} className="text-green-600" />
            <h2 className="text-lg font-semibold text-gray-800">Education</h2>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <EducationForm />
          </div>
        </section>

        <section id="skills">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <Wrench size={20} className="text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <SkillsForm />
          </div>
        </section>
      </div>
    </div>
  );
};

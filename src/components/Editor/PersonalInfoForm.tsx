import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { PhotoUpload } from './PhotoUpload';

export const PersonalInfoForm: React.FC = () => {
  const { resume, updatePersonal } = useResumeStore();
  const { personal } = resume.sections;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonal({ [name]: value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Photo Column */}
      <div className="flex-shrink-0">
        <PhotoUpload />
      </div>

      {/* Inputs Column */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={personal.name}
            onChange={handleChange}
            placeholder="Your Full Name"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={personal.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={personal.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={personal.location}
            onChange={handleChange}
            placeholder="City, Country"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Professional Title</label>
          <input
            type="text"
            name="title"
            value={personal.title}
            onChange={handleChange}
            placeholder="Your Professional Title"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
};

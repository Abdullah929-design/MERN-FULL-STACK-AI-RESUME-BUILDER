import React, { useRef } from 'react';
import { Camera, X } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';

export const PhotoUpload: React.FC = () => {
  const { resume, updatePersonal } = useResumeStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { photoUrl } = resume.sections.personal;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic size check (500KB limit for Base64 efficiency)
    if (file.size > 500 * 1024) {
      alert('Photo is too large. Please select an image smaller than 500KB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      updatePersonal({ photoUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    updatePersonal({ photoUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 hover:border-blue-400 transition-all group">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {photoUrl ? (
        <div className="relative">
          <img 
            src={photoUrl} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <button
            onClick={removePhoto}
            className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-24 h-24 rounded-full bg-white border-4 border-gray-100 flex flex-col items-center justify-center text-gray-400 cursor-pointer group-hover:text-blue-500 group-hover:scale-105 transition-all shadow-sm"
        >
          <Camera size={24} />
          <span className="text-[10px] font-bold mt-1 uppercase">Upload</span>
        </div>
      )}

      <div className="text-center">
        <p className="text-xs font-bold text-gray-900">Profile Image</p>
        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">JPG, PNG (Max 500KB)</p>
      </div>
    </div>
  );
};

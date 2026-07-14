import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link to="/about" className="text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors">About Us</Link>
            <Link to="/contact" className="text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Contact</Link>
            <Link to="/privacy" className="text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Terms of Service</Link>
          </div>

          <div className="space-y-2">
            <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.3em]">
              Abdullah Salleh Aqeel
            </h3>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-blue-100" />
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Full Stack Developer & UI/UX Designer</p>
              <div className="h-px w-8 bg-blue-100" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] pt-4 border-t border-gray-50 w-full max-w-md">
            <span className="text-gray-300">© {new Date().getFullYear()} AI Resume Builder</span>
            <span className="w-1 h-1 rounded-full bg-blue-200 hidden sm:block" />
            <span className="text-blue-500/50">Crafted for Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { SEO } from '../components/SEO';
import { Sparkles, Users, Target, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO 
        title="About Us" 
        description="About airesumes.online. Our mission is to help professionals build better resumes with the power of AI."
      />
      
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight">
                AI Resume <span className="text-blue-600">Builder</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-100 py-16 sm:py-24 md:py-32 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest">
              <Rocket size={14} /> Our Mission
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Empowering Careers with <span className="text-blue-600">Artificial Intelligence</span>
            </h1>
            <p className="text-gray-500 text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              We believe everyone deserves a professional, high-impact resume. Our mission is to bridge the gap between talent and opportunity using cutting-edge AI.
            </p>
          </div>
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] opacity-50"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] opacity-50"></div>
        </section>

        {/* Features/Values */}
        <section className="max-w-7xl mx-auto px-4 py-20 md:py-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm space-y-6 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
              <Sparkles size={28} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">AI Driven</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              We use advanced language models to help you craft compelling bullet points and summaries that catch the eye of recruiters.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm space-y-6 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <Target size={28} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">ATS Optimized</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              Our templates and scanner are built to ensure your resume sails through Applicant Tracking Systems with ease.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm space-y-6 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-gray-200">
              <Users size={28} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">User Centric</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              Designed with a focus on ease of use, allowing you to build a world-class resume in minutes, not hours.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;

import { SEO } from '../components/SEO';
import { Shield, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO 
        title="Privacy Policy" 
        description="Privacy Policy for airesumes.online. Learn how we handle your data and protect your privacy."
      />
      
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100">
                <Shield className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight">
                AI Resume <span className="text-blue-600">Builder</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 md:py-16 lg:py-20">
        <div className="bg-white rounded-3xl md:rounded-[2rem] border border-gray-200 shadow-sm p-6 sm:p-8 md:p-12 space-y-10 md:space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex p-3 md:p-4 bg-blue-50 text-blue-600 rounded-xl md:rounded-2xl mb-2 md:mb-4">
              <Lock size={28} className="md:w-8 md:h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Privacy Policy</h1>
            <p className="text-gray-500 text-sm md:text-lg font-medium">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-blue max-w-none space-y-8 text-gray-600">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">1</span>
                Information We Collect
              </h2>
              <p>
                At airesumes.online, we collect information that you provide directly to us when you create a resume, including your name, contact information, work experience, and education details.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">2</span>
                How We Use Your Data
              </h2>
              <p>
                Your data is primarily used to generate your professional documents using our AI engine. We do not sell your personal information to third parties. We may use anonymized data to improve our AI models.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">3</span>
                Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">4</span>
                Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal data at any time. You can do this by managing your resume in our editor.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;

import { SEO } from '../components/SEO';
import { Scale, Gavel, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO 
        title="Terms of Service" 
        description="Terms of Service for airesumes.online. Read our terms and conditions for using our AI resume builder."
      />
      
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100">
                <Scale className="text-white w-5 h-5" />
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
              <Gavel size={28} className="md:w-8 md:h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Terms of Service</h1>
            <p className="text-gray-500 text-sm md:text-lg font-medium">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-blue max-w-none space-y-8 text-gray-600">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                Acceptance of Terms
              </h2>
              <p>
                By accessing or using airesumes.online, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                Use License
              </h2>
              <p>
                We grant you a personal, non-exclusive license to use our AI resume builder for your personal job search purposes. You may not use the service for any illegal activities.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                AI Content Generation
              </h2>
              <p>
                While our AI provides high-quality suggestions, you are responsible for the accuracy and truthfulness of the content in your resume. We do not guarantee employment.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                Limitations
              </h2>
              <p>
                airesumes.online shall not be held liable for any damages arising out of the use or inability to use the materials on our website.
              </p>
            </section>

            <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex gap-4">
              <AlertCircle className="text-amber-500 shrink-0" size={24} />
              <p className="text-sm text-amber-800">
                <strong>Disclaimer:</strong> This is a summary of terms. Please use the platform responsibly and ensure all information provided is accurate.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;

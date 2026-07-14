import { useState } from 'react';
import { SEO } from '../components/SEO';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you'd send the data to a server here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO 
        title="Contact Us" 
        description="Contact the airesumes.online team. We're here to help you with your AI resume builder questions."
      />
      
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100">
                <Mail className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight">
                AI Resume <span className="text-blue-600">Builder</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 md:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Info Column */}
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
              Get in touch <span className="text-blue-600">with us</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed max-w-md">
              Have questions about our AI features or need help with a template? Our team is here to help you succeed.
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-4 md:gap-6 group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white border border-gray-200 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Mail size={24} className="md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5 md:mb-1">Email Support</p>
                <p className="text-lg md:text-xl font-black text-gray-900 tracking-tight">aqeelabdullah654@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6 group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white border border-gray-200 rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <MessageSquare size={24} className="md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5 md:mb-1">Response Time</p>
                <p className="text-lg md:text-xl font-black text-gray-900 tracking-tight">Under 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="relative">
          {submitted ? (
            <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl shadow-blue-100 p-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="inline-flex p-6 bg-green-50 text-green-500 rounded-3xl mb-4">
                <CheckCircle size={64} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Message Received!</h2>
              <p className="text-gray-500 font-medium leading-relaxed">
                Thank you for reaching out. We've received your message and will get back to you shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="inline-block px-8 py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-gray-800 transition-all shadow-lg"
              >
                Send Another
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl shadow-blue-500/5 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Your Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none font-medium text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none font-medium text-gray-900"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Message Subject</label>
                  <input 
                    required
                    type="text" 
                    placeholder="How can we help?"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none font-medium text-gray-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Detailed Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none font-medium text-gray-900 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 group"
                >
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Contact;

import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';
import {
  Sparkles, ArrowRight, Bot, Target, LayoutTemplate, Download,
  Check, FileCheck2, Zap, ShieldCheck
} from 'lucide-react';

// All 13 template preview PNGs shipped in /public.
const ALL_TEMPLATES = [
  { id: 'modern', name: 'Modern', image: '/modern_template.png' },
  { id: 'classic', name: 'Classic', image: '/classic_template.png' },
  { id: 'ats', name: 'ATS Friendly', image: '/ats_template.jpg' },
  { id: 'executive', name: 'Executive', image: '/executive_template.png' },
  { id: 'minimalist', name: 'Minimalist', image: '/minimalist_template.jfif' },
  { id: 'creative', name: 'Creative', image: '/creative_template.png' },
  { id: 'elegant', name: 'Elegant', image: '/elegant_template.jpg' },
  { id: 'professional', name: 'Professional', image: '/professional_template.jpg' },
  { id: 'academia', name: 'Academia', image: '/academia_template.png' },
  { id: 'compact', name: 'Compact', image: '/compact_template.png' },
  { id: 'editorial', name: 'Editorial', image: '/editorial_template.png' },
  { id: 'nordic', name: 'Nordic', image: '/nordic_template.jpg' },
  { id: 'timeline', name: 'Timeline', image: '/timeline_template.jpg' },
];

// Pick 3 distinct random templates once, when the page mounts.
const pickRandomSamples = () => {
  const pool = [...ALL_TEMPLATES];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
};

const FEATURES = [
  {
    icon: Bot,
    title: 'AI Content Generation',
    desc: 'Generate a professional summary, rewrite bullet points, and draft tailored cover letters — all powered by AI.',
  },
  {
    icon: Target,
    title: 'ATS Optimization',
    desc: 'Score your resume against any job description and get actionable tips to beat the applicant-tracking filters.',
  },
  {
    icon: LayoutTemplate,
    title: '13 Pro Templates',
    desc: 'Hand-crafted, recruiter-approved layouts from minimalist to executive. Pick and preview instantly.',
  },
  {
    icon: Download,
    title: 'One-Click Export',
    desc: 'Download a pixel-perfect PDF, an editable DOCX, or a high-res PNG in a single click.',
  },
];

const TRUST_POINTS = ['Free to use', 'No sign-up required', 'ATS-optimized'];

export default function Landing() {
  const [samples] = React.useState(pickRandomSamples);

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col">
      <SEO
        title="AI Resume Builder | Free Professional Resume Maker"
        description="Create a job-winning, ATS-friendly resume in minutes with AI assistance, 13 professional templates, and one-click exports to PDF, DOCX, or PNG."
      />

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-blue-600 p-2 rounded-xl shadow-sm shadow-blue-100">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-black text-gray-900 tracking-tight">
                AI Resume <span className="text-blue-600">Builder</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">Features</a>
              <a href="#templates" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">Templates</a>
              <Link to="/about" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">About</Link>
            </div>

            <Link
  to="/builder"
  className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 bg-blue-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-100 active:scale-95"
>
  <Zap size={16} className="sm:hidden" />
  <Zap size={18} className="hidden sm:block" />
  Start Building
</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-white pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Copy */}
              <div className="text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest border border-blue-100">
                  <Sparkles size={14} />
                  Powered by AI
                </span>

                <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E293B] tracking-tight leading-[1.1]">
                  Build a job-winning resume in minutes
                </h1>

                <p className="mt-6 text-lg text-[#475569] leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Turn your experience into a polished, ATS-friendly resume with AI assistance, 13 professional templates, and one-click exports to PDF, DOCX, or PNG.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-4 justify-center lg:justify-start">
                  <Link
                    to="/builder"
                    className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
                  >
                    Create Your Resume Now
                    <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    to="/builder"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-white text-gray-700 rounded-xl font-semibold border border-gray-200 hover:border-blue-200 hover:text-blue-600 transition-all"
                  >
                    <LayoutTemplate size={18} />
                    Browse Samples
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm font-medium text-gray-500">
                  {TRUST_POINTS.map((point) => (
                    <span key={point} className="inline-flex items-center gap-1.5">
                      <Check size={16} className="text-emerald-500" />
                      {point}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hero preview — a framed, scaled A4-style template */}
              <div className="relative hidden lg:block">
                <div className="absolute -inset-6 bg-gradient-to-tr from-blue-100/40 to-indigo-100/30 rounded-[2.5rem] blur-2xl" />
                <div className="relative bg-white rounded-2xl border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-3 rotate-1">
                  <img
                    src="/professional_template.jpg"
                    alt="Resume template preview"
                    className="w-full rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-gray-700">Auto-Saving</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight">
              Everything you need to stand out
            </h2>
            <p className="mt-4 text-lg text-[#475569]">
              A complete toolkit that turns raw experience into a recruiter-ready resume.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white rounded-2xl border border-gray-200 p-6 transition-all hover:border-blue-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <feature.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-[#1E293B] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Template samples (lower section) ── */}
        <section id="templates" className="bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight">
                  Beautiful templates, ready to go
                </h2>
                <p className="mt-3 text-lg text-[#475569] max-w-xl">
                  Every template is ATS-friendly and fully customizable. Here's a sneak peek — your resume, your style.
                </p>
              </div>
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-blue-600 rounded-xl font-semibold border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all whitespace-nowrap"
              >
                View More Templates
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {samples.map((template) => (
                <Link
                  key={template.id}
                  to="/builder"
                  className="group block bg-[#f8f9ff] rounded-2xl border border-gray-200 overflow-hidden transition-all hover:border-blue-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                >
                  <div className="aspect-[1/1.414] overflow-hidden bg-gray-50">
                    <img
                      src={template.image}
                      alt={`${template.name} template`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100">
                    <span className="text-sm font-bold text-[#1E293B]">{template.name}</span>
                    <span className="text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Use template →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="relative overflow-hidden rounded-[2rem] bg-blue-600 px-8 py-14 sm:px-14 text-center">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500/40 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Your next job starts with a great resume
              </h2>
              <p className="mt-4 text-blue-100 text-lg max-w-2xl mx-auto">
                Join thousands building polished, ATS-optimized resumes in minutes — free, no sign-up.
              </p>
              <Link
                to="/builder"
                className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg active:scale-95"
              >
                <FileCheck2 size={20} />
                Start Building
              </Link>
              <div className="mt-6 flex items-center justify-center gap-2 text-blue-100 text-sm">
                <ShieldCheck size={16} />
                Private & secure — your data stays in your browser
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

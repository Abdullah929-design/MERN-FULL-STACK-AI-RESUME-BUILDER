import { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Sparkles, FileText, Briefcase, CheckCircle, AlertTriangle, ChevronRight, RefreshCw, Layers } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ATSScoreResponse {
  overallScore: number;
  dimensions: {
    keywordMatch: { score: number; explanation: string };
    experienceAlignment: { score: number; explanation: string };
    skillsCoverage: { score: number; explanation: string };
    jobTitleAlignment: { score: number; explanation: string };
    quantifiedImpact: { score: number; explanation: string };
    atsFormattingSafety: { score: number; explanation: string };
  };
  quickWins: string[];
  rewrittenSummary: string;
}

export function ATSScanner() {
  const { resume, isAIALimitReached, incrementAIUsage, setShowAILimitPopup } = useResumeStore();
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ATSScoreResponse | null>(null);
  const [error, setError] = useState('');

  const cn = (...inputs: (string | undefined | null | false)[]) => {
    return twMerge(clsx(inputs));
  };

  const loadFromStore = () => {
    const sections = [];
    if (resume.sections.personal) {
      const p = resume.sections.personal;
      sections.push(`${p.name}\n${p.email} | ${p.phone} | ${p.location}`);
    }
    if (resume.sections.summary) {
      sections.push(`Summary:\n${resume.sections.summary}`);
    }
    if (resume.sections.experience?.length) {
      sections.push(`Experience:\n${resume.sections.experience.map(e => `${e.role} at ${e.company} (${e.startDate} - ${e.endDate})\n${e.description}`).join('\n\n')}`);
    }
    if (resume.sections.education?.length) {
      sections.push(`Education:\n${resume.sections.education.map(e => `${e.degree} from ${e.institution} (${e.year})`).join('\n')}`);
    }
    if (resume.sections.skills?.length) {
      sections.push(`Skills: ${resume.sections.skills.join(', ')}`);
    }
    setResumeText(sections.join('\n\n'));
  };

  const scanResume = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError('Please provide both a resume and a job description.');
      return;
    }
    if (isAIALimitReached('ats')) {
      setShowAILimitPopup(true);
      return;
    }
    setError('');
    setIsScanning(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'ats_score',
          input: { 
            resume: resumeText.substring(0, 10000), 
            jobDescription: jobDescription.substring(0, 10000) 
          }
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data as ATSScoreResponse);
      incrementAIUsage('ats');
    } catch (err: any) {
      const msg = err.message || 'Failed to analyze resume.';
      if (msg.toLowerCase().includes('json') || msg.toLowerCase().includes('token')) {
        setError('Please refresh the page and try again.');
      } else {
        setError(msg);
      }
    } finally {
      setIsScanning(false);
    }
  };

  const ScoreCircle = ({ score, label }: { score: number, label?: string }) => {
    const color = score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500';
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-2 flex items-center justify-center rounded-full bg-white shadow-sm border-4 border-gray-100">
          <svg className="absolute top-[-4px] left-[-4px] w-[104px] h-[104px]" viewBox="0 0 100 100">
             <circle className="text-gray-100 stroke-current" strokeWidth="8" cx="50" cy="50" r="46" fill="transparent"></circle>
             <circle className={cn(color, "stroke-current transition-all duration-1000 ease-out")} strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="46" fill="transparent" strokeDasharray={`${score * 2.89} 289`} strokeDashoffset="0" transform="rotate(-90 50 50)"></circle>
          </svg>
          <span className={cn("text-2xl font-bold", color)}>{score}</span>
        </div>
        {label && <span className="text-sm font-medium text-gray-600 text-center">{label}</span>}
      </div>
    );
  };

  const DimensionCard = ({ title, data }: { title: string, data: { score: number, explanation: string } }) => {
    const colorClass = data.score >= 80 ? 'bg-green-50 border-green-200 text-green-800' : 
                       data.score >= 60 ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 
                       'bg-red-50 border-red-200 text-red-800';
    
    return (
      <div className={cn("p-4 rounded-xl border flex flex-col sm:flex-row gap-4", colorClass)}>
        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full font-bold text-xl border-4" style={{ borderColor: data.score >= 80 ? '#22c55e' : data.score >= 60 ? '#eab308' : '#ef4444', color: data.score >= 80 ? '#166534' : data.score >= 60 ? '#854d0e' : '#991b1b' }}>
          {data.score}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{data.explanation}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="mb-6 flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">ATS Resume Scanner</h2>
            <p className="text-gray-500">See how well your resume matches the job description.</p>
          </div>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 font-medium text-gray-700">
                <FileText className="w-4 h-4" /> Your Resume
              </label>
              <button onClick={loadFromStore} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                Load current resume
              </button>
            </div>
            <textarea 
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              className="w-full h-64 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 font-medium text-gray-700">
              <Briefcase className="w-4 h-4" /> Job Description
            </label>
            <textarea 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-64 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            />
          </div>
        </div>

        {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}

        <button 
          onClick={scanResume}
          disabled={isScanning}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          {isScanning ? (
            <><RefreshCw className="w-5 h-5 animate-spin" /> Analyzing Match...</>
          ) : (
            <><Sparkles className="w-5 h-5" /> Calculate ATS Match Score</>
          )}
        </button>
      </div>

      {result && (
        <div className="space-y-8 animate-in fade-in duration-700">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Overall ATS Match</h3>
            <div className="flex justify-center">
              <ScoreCircle score={result.overallScore} />
            </div>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto">
              {result.overallScore >= 80 ? "Great match! You're highly likely to pass the ATS filter." :
               result.overallScore >= 60 ? "Good start, but some optimizations needed to ensure you pass ATS screens." :
               "Low match. You should heavily tailor your resume for this position."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DimensionCard title="Keyword Match" data={result.dimensions.keywordMatch} />
            <DimensionCard title="Experience Alignment" data={result.dimensions.experienceAlignment} />
            <DimensionCard title="Skills Coverage" data={result.dimensions.skillsCoverage} />
            <DimensionCard title="Job Title Alignment" data={result.dimensions.jobTitleAlignment} />
            <DimensionCard title="Quantified Impact" data={result.dimensions.quantifiedImpact} />
            <DimensionCard title="ATS Formatting Safety" data={result.dimensions.atsFormattingSafety} />
          </div>

          <div className="bg-white overflow-hidden rounded-2xl shadow-sm border border-gray-200">
            <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100 flex items-center gap-3">
              <AlertTriangle className="text-yellow-600 w-5 h-5" />
              <h3 className="font-bold text-yellow-900">Top 3 Quick Wins</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {result.quickWins.map((win, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <ChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>{win}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white overflow-hidden rounded-2xl shadow-sm border border-gray-200">
             <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex items-center gap-3">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <h3 className="font-bold text-green-900">Optimized Professional Summary</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed">
                {result.rewrittenSummary}
              </p>
              <button 
                onClick={() => navigator.clipboard.writeText(result.rewrittenSummary)}
                className="mt-4 text-sm font-medium text-green-700 hover:text-green-800"
              >
                Copy to clipboard
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

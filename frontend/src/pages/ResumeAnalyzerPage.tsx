import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Upload,
  RefreshCw,
  Copy,
  Check,
  ArrowRight,
  Zap,
  Award,
  Download,
  FileCheck,
  UserCheck
} from 'lucide-react';

interface CheckItem {
  id: string;
  category: 'IMPACT' | 'KEYWORDS' | 'FORMATTING' | 'BREVITY';
  title: string;
  status: 'PASS' | 'WARNING' | 'FAIL';
  feedback: string;
}

export const ResumeAnalyzerPage: React.FC = () => {
  const location = useLocation();
  const isOnboarding = location.search.includes('onboarding=true');
  const searchParams = new URLSearchParams(location.search);
  const paramFilename = searchParams.get('filename');

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(
    paramFilename || 'Aniket_Software_Engineer_Resume_2026.pdf'
  );

  const [analyzing, setAnalyzing] = useState(false);
  const [standaloneScore, setStandaloneScore] = useState(86);

  const standaloneChecks: CheckItem[] = [
    {
      id: 'chk-1',
      category: 'IMPACT',
      title: 'Measurable Metrics & Quantifiable Achievements',
      status: 'PASS',
      feedback: 'Excellent! Resume includes specific percentages ("35% reduction", "50% improvement") and scale ("10M+ daily events").'
    },
    {
      id: 'chk-2',
      category: 'IMPACT',
      title: 'High-Impact Action Verbs',
      status: 'PASS',
      feedback: 'Bullet points start with strong action verbs (Architected, Led, Designed, Built, Optimized).'
    },
    {
      id: 'chk-3',
      category: 'FORMATTING',
      title: 'ATS Parser Readability & Layout',
      status: 'PASS',
      feedback: 'Clean text structure with standard section headers (SUMMARY, EXPERIENCE). No unreadable tables or graphic columns.'
    },
    {
      id: 'chk-4',
      category: 'BREVITY',
      title: 'Summary & Section Length',
      status: 'WARNING',
      feedback: 'Summary is clear. Consider adding target senior certifications (e.g. AWS Certified Developer) if available.'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setStandaloneScore(91);
      }, 1000);
    }
  };

  const handleAnalyzeResume = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setStandaloneScore(91);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Onboarding Stepper Banner */}
      {isOnboarding && (
        <div className="p-6 rounded-3xl glass-card border border-brand-500/40 bg-gradient-to-r from-brand-950/60 via-slate-900 to-indigo-950/50 space-y-4 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <UserCheck className="w-3.5 h-3.5" /> STEP 2 OF 3 • ACCOUNT CREATED
              </div>
              <h2 className="text-xl font-extrabold text-white">Upload Resume & Run Instant ATS Audit</h2>
              <p className="text-xs text-slate-300">
                Upload your resume draft. We'll score it across 40+ ATS parameters and highlight improvement suggestions.
              </p>
            </div>

            <Link
              to="/jobs"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition shrink-0"
            >
              <span>Continue to Job Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">ATS Resume Analyzer</h1>
          <p className="text-slate-400 text-sm">
            Upload your resume for instant 40+ ATS parameter scoring and actionable improvement suggestions.
          </p>
        </div>

        <button
          onClick={handleAnalyzeResume}
          disabled={analyzing}
          className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center gap-2 transition disabled:opacity-50"
        >
          {analyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing 40+ ATS Rules...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Run ATS Score Audit</span>
            </>
          )}
        </button>
      </div>

      {/* Standalone ATS Resume Analyzer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Resume Upload & Audit Suggestions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Drag & Drop Upload Zone */}
          <div className="p-8 rounded-3xl glass-card border-2 border-dashed border-slate-800 hover:border-brand-500/50 text-center space-y-4 transition">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 mx-auto flex items-center justify-center text-brand-400">
              <Upload className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Upload Resume File (PDF, DOCX, or Text)</h3>
              <p className="text-xs text-slate-400 mt-1">Drag and drop your resume file here to generate instant ATS score</p>
            </div>
            {uploadedFileName && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>{uploadedFileName}</span>
              </div>
            )}
            <div>
              <label className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-2">
                <span>Browse File</span>
                <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* 40+ Audit Checks & Suggestions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">ATS Audit & Actionable Improvement Suggestions</h3>
            <div className="space-y-3">
              {standaloneChecks.map(chk => (
                <div key={chk.id} className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{chk.title}</span>
                    {chk.status === 'PASS' && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        PASS
                      </span>
                    )}
                    {chk.status === 'WARNING' && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        SUGGESTION
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{chk.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: ATS Score Gauge & Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          {/* Overall Score Card */}
          <div className="p-8 rounded-3xl glass-card border border-brand-500/30 bg-gradient-to-b from-brand-950/30 via-slate-900 to-slate-900 space-y-6 text-center shadow-xl sticky top-8">
            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-300 uppercase tracking-widest">ATS Resume Quality Score</span>
              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="text-6xl font-extrabold text-white">{standaloneScore}</span>
                <span className="text-slate-400 font-bold text-xl">/ 100</span>
              </div>
            </div>

            {/* Progress Gauge Bar */}
            <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${standaloneScore}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Action Verbs</span>
                <span className="text-emerald-400 font-bold text-xs">95% Pass</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Quantified</span>
                <span className="text-emerald-400 font-bold text-xs">High Impact</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Formatting</span>
                <span className="text-emerald-400 font-bold text-xs">ATS Clean</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                to="/jobs"
                className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition"
              >
                <span>Start Applying to 50,000+ Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

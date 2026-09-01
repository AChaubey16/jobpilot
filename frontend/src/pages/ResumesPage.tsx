import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Upload,
  Star,
  CheckCircle2,
  Plus,
  ArrowRight,
  Gauge,
  Sparkles,
  Download,
  FileCheck,
  ChevronRight,
  X
} from 'lucide-react';

interface ResumeCardItem {
  id: string;
  filename: string;
  updatedAt: string;
  isPrimary: boolean;
  atsScore: number;
  atsStatus: 'HIGH' | 'MEDIUM' | 'LOW';
  roleCategory: string;
}

const mockResumes: ResumeCardItem[] = [
  {
    id: 'res-1',
    filename: 'Aniket_Chaubey_SeniorSoftwareEngineer_2026.pdf',
    updatedAt: 'Updated 3h ago',
    isPrimary: true,
    atsScore: 88,
    atsStatus: 'HIGH',
    roleCategory: 'Java & Microservices Backend'
  },
  {
    id: 'res-2',
    filename: 'Aniket_Chaubey_FullStack_Resume.pdf',
    updatedAt: 'Updated 1d ago',
    isPrimary: false,
    atsScore: 82,
    atsStatus: 'HIGH',
    roleCategory: 'Full Stack Web Architecture'
  }
];

export const ResumesPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumes, setResumes] = useState<ResumeCardItem[]>(mockResumes);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSetPrimary = (id: string) => {
    setResumes(prev => prev.map(r => ({ ...r, isPrimary: r.id === id })));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleConfirmUpload = () => {
    if (!selectedFile) return;

    // Simulate file upload and navigate to ATS analyzer
    const newResume: ResumeCardItem = {
      id: `res-${Date.now()}`,
      filename: selectedFile.name,
      updatedAt: 'Just now',
      isPrimary: false,
      atsScore: 91,
      atsStatus: 'HIGH',
      roleCategory: 'Uploaded Draft'
    };

    setResumes(prev => [newResume, ...prev]);
    setShowUploadModal(false);
    setSelectedFile(null);

    // Redirect to ATS Analyzer with newly uploaded file
    navigate(`/resume-analyzer?uploaded=true&filename=${encodeURIComponent(selectedFile.name)}`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf,.docx,.txt"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">AI Resume Analysis</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your professional resumes and run instant 40+ ATS parameter audits.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center gap-2 transition"
        >
          <Upload className="w-5 h-5" />
          <span>+ Upload New Resume</span>
        </button>
      </div>

      {/* Quick Action Score Card */}
      <div className="p-6 rounded-3xl glass-card border border-slate-800 hover:border-brand-500/40 space-y-4 transition flex flex-col justify-between group">
        <div className="space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 group-hover:scale-105 transition">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-400 block mb-1">
              ATS Parameter Audit
            </span>
            <h3 className="font-bold text-white text-lg group-hover:text-brand-300 transition">
              Check your resume score across 40+ ATS parameters
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Upload a fresh draft — we'll score it instantly and highlight improvement suggestions.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-400 hover:text-brand-300 pt-2 w-fit"
        >
          <span>Upload fresh draft to score</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Resume Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Active Resumes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resumes.map(res => (
            <div
              key={res.id}
              className={`p-6 rounded-3xl glass-card space-y-4 border flex flex-col justify-between ${
                res.isPrimary
                  ? 'border-brand-500/40 bg-gradient-to-b from-brand-950/20 to-slate-900 shadow-xl'
                  : 'border-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {res.isPrimary ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center gap-1 uppercase tracking-wider">
                      ★ PRIMARY
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-bold uppercase">VERSION</span>
                  )}

                  <div className="text-right">
                    <span className="text-lg font-extrabold text-brand-400">{res.atsScore}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block -mt-1">
                      ATS {res.atsStatus}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm truncate" title={res.filename}>
                    {res.filename}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{res.updatedAt}</p>
                </div>

                {/* Visual Preview Box */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 aspect-[4/3] flex flex-col justify-between">
                  <div className="space-y-1.5 opacity-60">
                    <div className="w-1/2 h-2 rounded bg-slate-400" />
                    <div className="w-3/4 h-1.5 rounded bg-slate-600" />
                    <div className="w-full h-1.5 rounded bg-slate-700" />
                    <div className="w-5/6 h-1.5 rounded bg-slate-700" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                    <span>PDF • Standard ATS</span>
                    <span>1 Page</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                {!res.isPrimary && (
                  <button
                    onClick={() => handleSetPrimary(res.id)}
                    className="text-xs font-bold text-brand-400 hover:underline"
                  >
                    Set as Primary
                  </button>
                )}
                <button
                  onClick={() => navigate(`/resume-analyzer?filename=${encodeURIComponent(res.filename)}`)}
                  className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 ml-auto"
                >
                  <span>Check Score</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Upload New Resume Dashed Button Card */}
          <button
            onClick={() => setShowUploadModal(true)}
            className="p-8 rounded-3xl glass-card border-2 border-dashed border-slate-800 hover:border-brand-500/50 flex flex-col items-center justify-center text-center space-y-4 min-h-[320px] transition group w-full"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 group-hover:scale-110 transition">
              <Upload className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-white text-base group-hover:text-brand-300 transition">Upload New Resume</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                Select a PDF or DOCX file from your computer to run ATS audit.
              </p>
            </div>
            <span className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 group-hover:bg-brand-600 group-hover:text-white transition">
              Select File From Computer
            </span>
          </button>
        </div>
      </div>

      {/* Local File Picker Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl glass-card border border-brand-500/30 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-lg">Upload Resume File</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 rounded-2xl border-2 border-dashed border-slate-800 hover:border-brand-500/50 bg-slate-900/60 text-center space-y-3 cursor-pointer transition"
              >
                <Upload className="w-10 h-10 text-brand-400 mx-auto" />
                <div>
                  <p className="font-bold text-white text-sm">
                    {selectedFile ? selectedFile.name : 'Click to select PDF or DOCX from computer'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Supports PDF, DOCX, TXT (Max 10MB)</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmUpload}
                  disabled={!selectedFile}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/30 flex items-center gap-2 transition disabled:opacity-50"
                >
                  <span>Analyze ATS Score</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

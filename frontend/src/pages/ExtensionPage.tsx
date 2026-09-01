import React from 'react';
import { Download, Sparkles, CheckCircle2, ShieldCheck, Chrome, Zap, MousePointerClick, ExternalLink } from 'lucide-react';

export const ExtensionPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-12 max-w-5xl">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 text-brand-300 border border-brand-500/20">
          <Chrome className="w-3.5 h-3.5 text-brand-400" />
          <span>OFFICIAL BROWSER COMPANION</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          JobPilot Chrome Extension Sidekick
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Autofill job application forms on LinkedIn, Workday, and Greenhouse in 1-click directly inside your desktop browser.
        </p>

        <div className="pt-2">
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-brand-600/30 inline-flex items-center gap-3 transition">
            <Chrome className="w-5 h-5" />
            <span>Add to Chrome (v2.4.0)</span>
          </button>
          <p className="text-[11px] text-slate-500 mt-2">Compatible with Google Chrome, Brave, Arc, and Microsoft Edge</p>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
            <MousePointerClick className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">1-Click Form Autofill</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automatically populates contact details, work experience bullet points, expected salary, and attaches your tailored resume.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">LinkedIn Job Saver</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Click the JobPilot icon while browsing LinkedIn or Indeed to instant-save postings directly into your application queue.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">Human Control First</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Form is pre-filled instantly, but leaves the final submission button under your explicit manual click for 100% safety.
          </p>
        </div>
      </div>
    </div>
  );
};

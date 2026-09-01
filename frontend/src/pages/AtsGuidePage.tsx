import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, FileText, CheckCircle2, ShieldCheck, HelpCircle, BarChart3, AlertCircle } from 'lucide-react';

export const AtsGuidePage: React.FC = () => {
  const points = [
    {
      title: 'Workday Parse Optimization',
      desc: 'Workday portals often misalign resumes that use multi-column tables. JobPilot selects your single-column tailored resume, ensuring automatic parses map correctly without losing data.'
    },
    {
      title: 'Greenhouse Field Mapping',
      desc: 'Greenhouse features many custom question fields. Our heuristic adapter identifies custom labels, tags (e.g. "Do you have work authorization?"), and fills them based on your settings.'
    },
    {
      title: 'Lever Section Detection',
      desc: 'Lever forms are single-page and scan for LinkedIn, GitHub, and Portfolio URLs. Our adapter maps these social profiles cleanly to avoid parsing confusion.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none opacity-20 blur-[130px] bg-gradient-to-b from-brand-500 to-transparent" />

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8 h-20 flex items-center justify-between border-b border-white/5">
        <Link to="/" className="flex items-center gap-3">
          <Bot className="w-8 h-8 text-brand-500" />
          <span className="font-extrabold text-lg text-white">JobPilot</span>
        </Link>
        <Link to="/login" className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition">
          Sign In
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-6 py-12 md:py-16 space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            ATS Compatibility & Resume Guide
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Ensure your applications pass automated parsers. JobPilot uses specialized mapping adapters optimized for the major ATS platforms.
          </p>
        </div>

        {/* ATS Types list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((pt, i) => (
            <div key={i} className="p-6 rounded-2xl glass-card border border-slate-800 bg-slate-900/30 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{pt.title}</span>
              </h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{pt.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ box */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <span>Frequently Asked Questions</span>
          </h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">Does JobPilot support custom questions?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Yes. Our custom adapter parses drop-down lists, check-boxes, and text-area inputs using heuristics, filling them based on your settings configurations.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">Why is there no free trial?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Running high-frequency Playwright workers on Chromium/WebKit clusters incurs high computing cost. We offer premium-only access for ₹999/yr, ensuring zero ads and dedicated worker runtimes.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

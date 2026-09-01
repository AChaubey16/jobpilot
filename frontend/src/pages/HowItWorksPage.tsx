import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ShieldCheck, Search, FileText, CheckCircle2, ArrowLeft, RefreshCw, Cpu, MonitorPlay } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: '1. Continuous Portal Scraping',
      desc: 'Our distributed Playwright agents scan over 450+ tech company career boards (Workday, Greenhouse, Lever, etc.) every 15 minutes. We index hidden jobs before they reach aggregator sites.',
      color: 'text-brand-400',
      bg: 'bg-brand-500/10'
    },
    {
      icon: Cpu,
      title: '2. Profile Matching & Score',
      desc: 'JobPilot matches your tech stack, location, salary expectations, and experience against the extracted job description, generating a transparent Match Score (0-100%) showing exactly why it matched.',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10'
    },
    {
      icon: MonitorPlay,
      title: '3. Autopilot Playwright Runner',
      desc: 'When you trigger "Autopilot Apply", a headless browser worker launches. It navigates to the job portal, fills multi-step inputs, selects your matching resume version, and uploads documents.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    {
      icon: ShieldCheck,
      title: '4. Human-In-The-Loop Pause',
      desc: 'By default, the script halts on the final page (before submission). We capture a high-res screenshot and send an alert. You review the details, complete any custom inputs, and submit safely.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
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
          Get Started
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-6 py-12 md:py-16 space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            How JobPilot Autopilot Works
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Discover how our microservice workers automate applications safely, adhering to ATS requirements and avoiding CAPTCHAs.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="p-8 rounded-3xl glass-card space-y-4 border border-slate-800/80 bg-slate-900/40">
                <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center ${step.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white">{step.title}</h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Security Pledge Section */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>JobPilot Security & Ethics Pledge</span>
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            JobPilot is designed for professional software engineers to manage their personal job pipelines. We never auto-submit applications without explicit confirmation. We do not attempt to bypass CAPTCHA, email verifications, or other security checks; instead, we pause execution and send a push notification asking for user input.
          </p>
        </div>
      </main>
    </div>
  );
};

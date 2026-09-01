import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Briefcase, Zap, Star, Building2, ExternalLink, HelpCircle, Cpu, MonitorPlay, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  const monitoredCompanies = [
    { name: 'Stripe', industry: 'FinTech', ats: 'GREENHOUSE', activeJobs: 24, lastScanned: '5 mins ago' },
    { name: 'Google', industry: 'Tech', ats: 'CUSTOM', activeJobs: 110, lastScanned: '8 mins ago' },
    { name: 'Razorpay', industry: 'FinTech', ats: 'WORKDAY', activeJobs: 15, lastScanned: '12 mins ago' },
    { name: 'Uber', industry: 'Transportation', ats: 'LEVER', activeJobs: 42, lastScanned: '15 mins ago' },
    { name: 'Retool', industry: 'Developer Tools', ats: 'ASHBY', activeJobs: 8, lastScanned: '14 mins ago' },
    { name: 'Airbnb', industry: 'Travel', ats: 'GREENHOUSE', activeJobs: 19, lastScanned: '2 mins ago' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white overflow-hidden scroll-smooth">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-20 blur-[150px] bg-gradient-to-b from-brand-500 via-indigo-500 to-transparent z-0" />

      {/* Navigation Header */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-8 h-20 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              JobPilot
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-400 block -mt-1">
              SaaS Autopilot
            </span>
          </div>
        </div>

        {/* Single Page Smooth Scroll Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase font-bold tracking-wider text-slate-400">
          <a href="#how-it-works" className="hover:text-white transition">How it Works</a>
          <a href="#monitored-portals" className="hover:text-white transition">Monitored Portals</a>
          <a href="#ats-compatibility" className="hover:text-white transition">ATS Compatibility</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center gap-2 transition"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider px-3 py-2 transition">
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-600/20 flex items-center gap-2 transition"
              >
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-16 md:py-24 space-y-32">
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
            <span>Universal Application Engine for Any Job Role</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Apply to 100+ Jobs on{' '}
            <span className="bg-gradient-to-r from-brand-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Autopilot
            </span>
          </h2>
          
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Stop wasting hours copy-pasting your profile into endless career portals. JobPilot works for <strong>any job role</strong> — Engineering, Product Management, Data Science, Design, DevOps, Marketing, Sales, Finance, and Operations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-bold text-slate-300">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">💻 Software Engineering</span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">📊 Product & Data</span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">🎨 UI/UX Design</span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">🚀 DevOps & Cloud</span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">📈 Sales & Marketing</span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">💼 HR & Finance</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-brand-600/30 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-slate-300 hover:text-white font-bold text-base flex items-center justify-center gap-2 transition"
            >
              <span>Explore Features</span>
            </a>
          </div>
        </section>

        {/* Section 1: How it Works */}
        <section id="how-it-works" className="space-y-12 scroll-mt-24">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-4xl font-extrabold text-white">How JobPilot Automates Your Job Hunt</h3>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              50,000+ monitored career portals, intelligent Playwright form filling, password/OTP email alerts, and instant ATS score suggestions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl glass-card space-y-4 border border-slate-800 bg-slate-900/40">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-white">1. 50,000+ Portal Scans</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Background crawlers monitor 50,000+ company career pages every 15 minutes to discover live openings.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-card space-y-4 border border-slate-800 bg-slate-900/40">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <MonitorPlay className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-white">2. Playwright Form Filler</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automation workers fill multi-step forms on Workday, Greenhouse, Lever, and Oracle portals automatically.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-card space-y-4 border border-slate-800 bg-slate-900/40">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-white">3. Password & OTP Alerts</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                When password or OTP verification is required, Playwright pauses and sends an email & UI alert with 6-digit entry.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-card space-y-4 border border-slate-800 bg-slate-900/40">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-white">4. ATS Score & Suggestions</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload your resume to get an instant 40+ ATS score and actionable keyword improvement suggestions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Monitored Portals */}
        <section id="monitored-portals" className="space-y-12 scroll-mt-24">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-4xl font-extrabold text-white">Monitored Career Portals</h3>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Real-time monitoring across major ATS platforms and company career sites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monitoredCompanies.map((c, i) => (
              <div key={i} className="p-6 rounded-2xl glass-card border border-slate-800 bg-slate-900/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-base">{c.name}</h4>
                    <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {c.ats}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{c.industry} • {c.activeJobs} active roles</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                  Live
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: ATS Compatibility */}
        <section id="ats-compatibility" className="space-y-12 scroll-mt-24">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-4xl font-extrabold text-white">ATS Compatibility & Optimization</h3>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Built-in heuristics ensure your applications format cleanly without parser rejections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-card border border-slate-800 bg-slate-900/30 space-y-2">
              <h4 className="font-bold text-white text-base">Workday Adapters</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Handles multi-tab navigation and profile authentication prompts seamlessly.
              </p>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-slate-800 bg-slate-900/30 space-y-2">
              <h4 className="font-bold text-white text-base">Greenhouse Integration</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Smartly labels custom text fields, salary expectation inputs, and work authorization checkboxes.
              </p>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-slate-800 bg-slate-900/30 space-y-2">
              <h4 className="font-bold text-white text-base">Lever & Custom Heuristics</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extracts input attributes to populate LinkedIn, GitHub, and portfolio links accurately.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Pricing */}
        <section id="pricing" className="p-8 md:p-12 rounded-3xl glass-card border border-brand-500/20 bg-gradient-to-br from-brand-950/40 via-slate-900 to-indigo-950/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl scroll-mt-24">
          <div className="space-y-4 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 text-brand-300 border border-brand-500/20">
              <Sparkles className="w-3.5 h-3.5" /> SIMPLE TRANSPARENT PRICING
            </div>
            <h3 className="text-2xl font-extrabold text-white">Choose Your Job Hunting Plan</h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              Get full access to 50,000+ monitored career portals, Playwright automation workers, real-time OTP email alerts, and instant 40+ ATS parameter scoring.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Playwright Runs</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Workday, Greenhouse & Lever</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time OTP Email Alerts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant GST Invoices</li>
            </ul>
          </div>
          <div className="text-center md:text-right space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-end gap-6 text-left">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">6 Months</span>
                <span className="text-3xl font-extrabold text-white">₹799</span>
              </div>
              <div className="p-4 rounded-2xl bg-brand-950/60 border border-brand-500/40 space-y-1 relative">
                <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest block">1 Year (Save 25%)</span>
                <span className="text-3xl font-extrabold text-white">₹1199</span>
              </div>
            </div>
            <Link
              to="/register"
              className="inline-flex px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 items-center gap-2 transition"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 JobPilot Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-300">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

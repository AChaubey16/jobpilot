import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Header */}
      <header className="max-w-7xl mx-auto w-full px-6 md:px-8 h-20 flex items-center justify-between border-b border-white/5">
        <Link to="/" className="flex items-center gap-3">
          <Bot className="w-8 h-8 text-brand-500" />
          <span className="font-extrabold text-lg text-white">JobPilot</span>
        </Link>
        <Link to="/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" /> Privacy & Data Governance
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Last updated: July 30, 2026</p>
        </div>

        <div className="p-8 rounded-3xl glass-card border border-slate-800 bg-slate-900/40 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Data Collection & Use</h2>
            <p>
              JobPilot collects user profiles, contact information, work preferences, and resume documents strictly for the purpose of executing automated job discovery and application procedures on your behalf.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Playwright Worker Security</h2>
            <p>
              All Playwright browser worker sessions run in isolated sandbox containers. Screen recordings, screenshots, and logs captured during the automation process are encrypted at rest and accessible only by you within your account dashboard.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Third-Party Sharing</h2>
            <p>
              We do not sell, rent, or trade your personal information or resume contents to third-party recruiters or data brokers. Data is transmitted directly to employer application portals (e.g. Workday, Greenhouse, Lever) solely upon your instruction.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Data Erasure</h2>
            <p>
              You have full rights to request complete deletion of your account, uploaded resumes, and application audit history at any time through account settings or by contacting privacy@jobpilot.io.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

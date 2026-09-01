import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, FileText, ArrowLeft } from 'lucide-react';

export const TermsPage: React.FC = () => {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20">
            <FileText className="w-3.5 h-3.5" /> Legal Terms
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">Terms of Service</h1>
          <p className="text-xs text-slate-400">Last updated: July 30, 2026</p>
        </div>

        <div className="p-8 rounded-3xl glass-card border border-slate-800 bg-slate-900/40 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Service Description</h2>
            <p>
              JobPilot provides a browser automation microservice platform enabling software engineers to discover career opportunities and submit form applications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. User Responsibility & Human-in-the-Loop</h2>
            <p>
              Users remain solely responsible for the accuracy of their resume data, profile details, and responses submitted to employer portals. JobPilot enforces a human-in-the-loop pause step by default to allow users to review form inputs before final submission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Subscription & Billing</h2>
            <p>
              JobPilot is a premium service priced at ₹999/year. Due to server infrastructure and headless browser worker runtime costs, all sales are final and non-refundable unless required by applicable consumer law.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Acceptable Use Policy</h2>
            <p>
              Users must not attempt to use JobPilot to submit false or misleading application information, perform unauthorized security probing on company portals, or bypass CAPTCHAs and security verification checks.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

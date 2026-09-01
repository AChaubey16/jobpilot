import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Search, Building2, ExternalLink, ShieldAlert, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

interface MonitoredCompany {
  name: string;
  industry: string;
  portalUrl: string;
  ats: 'WORKDAY' | 'GREENHOUSE' | 'LEVER' | 'ASHBY' | 'ORACLE' | 'CUSTOM';
  activeJobs: number;
  lastScanned: string;
}

const companiesList: MonitoredCompany[] = [
  { name: 'Stripe', industry: 'FinTech', portalUrl: 'https://boards.greenhouse.io/stripe', ats: 'GREENHOUSE', activeJobs: 24, lastScanned: '5 mins ago' },
  { name: 'Google', industry: 'Tech & Cloud', portalUrl: 'https://www.google.com/about/careers', ats: 'CUSTOM', activeJobs: 110, lastScanned: '8 mins ago' },
  { name: 'Razorpay', industry: 'FinTech', portalUrl: 'https://razorpay.workdayjobs.com/careers', ats: 'WORKDAY', activeJobs: 15, lastScanned: '12 mins ago' },
  { name: 'Uber', industry: 'Transportation & Logistics', portalUrl: 'https://jobs.lever.co/uber', ats: 'LEVER', activeJobs: 42, lastScanned: '15 mins ago' },
  { name: 'Retool', industry: 'Developer Tools', portalUrl: 'https://ashbyhq.com/retool', ats: 'ASHBY', activeJobs: 8, lastScanned: '14 mins ago' },
  { name: 'Airbnb', industry: 'Travel & Hospitality', portalUrl: 'https://careers.airbnb.com', ats: 'GREENHOUSE', activeJobs: 19, lastScanned: '2 mins ago' },
  { name: 'Microsoft', industry: 'Enterprise Software', portalUrl: 'https://careers.microsoft.com', ats: 'ORACLE', activeJobs: 85, lastScanned: '4 mins ago' },
  { name: 'Snowflake', industry: 'Data & Analytics', portalUrl: 'https://careers.snowflake.com', ats: 'GREENHOUSE', activeJobs: 31, lastScanned: '9 mins ago' },
  { name: 'Databricks', industry: 'AI & Data Science', portalUrl: 'https://databricks.com/company/careers', ats: 'GREENHOUSE', activeJobs: 47, lastScanned: '6 mins ago' }
];

export const CompanyDirectoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companiesList.filter(
    c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.industry.toLowerCase().includes(searchTerm.toLowerCase()) || c.ats.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none opacity-20 blur-[130px] bg-gradient-to-b from-brand-500 to-transparent" />

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8 h-20 flex items-center justify-between border-b border-white/5">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-lg text-white">JobPilot</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider px-3 py-2">
            Sign In
          </Link>
          <Link to="/register" className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition shadow-lg shadow-brand-600/20">
            Get Started
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 md:py-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 text-brand-300 border border-brand-500/20">
              <Building2 className="w-3.5 h-3.5 text-brand-400" />
              <span>50,000+ COMPANY CAREER PORTALS INDEXED</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Monitored Company Portals Database
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              JobPilot background Playwright crawlers scan <strong>50,000+ top company career portals</strong> every 15 minutes to index new job openings instantly.
            </p>
          </div>

          {/* Search Filter */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search 50,000+ portals by company, ATS, or industry..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company, index) => (
            <div key={index} className="p-6 rounded-3xl glass-card space-y-4 border border-slate-800 bg-slate-900/30 flex flex-col justify-between hover:border-brand-500/30 transition">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-brand-400 font-bold text-sm">
                      {company.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{company.name}</h3>
                      <p className="text-xs text-slate-400">{company.industry}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {company.ats}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                  <span>Last Scanned: <strong className="text-slate-300">{company.lastScanned}</strong></span>
                  <span className="font-bold text-brand-300">{company.activeJobs} active roles</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <a
                  href={company.portalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium"
                >
                  <span>Career Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Scanner Active
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Indicator */}
        <div className="text-center text-xs text-slate-500 font-medium">
          Showing 9 of 50,000+ monitored career portals • Crawled continuously by JobPilot Playwright Engine
        </div>
      </main>
    </div>
  );
};

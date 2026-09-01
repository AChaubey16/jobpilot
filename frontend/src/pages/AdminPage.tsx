import React, { useState } from 'react';
import { ShieldCheck, Server, Users, Cpu, Activity, Plus, Globe, Trash2, Edit, CheckCircle2, Search, ExternalLink, Lock } from 'lucide-react';

interface CompanyPortalTarget {
  id: string;
  companyName: string;
  careerUrl: string;
  atsAdapter: 'WORKDAY' | 'GREENHOUSE' | 'LEVER' | 'ASHBY' | 'ORACLE' | 'CUSTOM';
  crawlIntervalMinutes: number;
  status: 'ACTIVE' | 'PAUSED';
  lastCrawled: string;
}

const mockPortals: CompanyPortalTarget[] = [
  { id: 'p-1', companyName: 'Stripe', careerUrl: 'https://boards.greenhouse.io/stripe', atsAdapter: 'GREENHOUSE', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: '5 mins ago' },
  { id: 'p-2', companyName: 'Google', careerUrl: 'https://www.google.com/about/careers', atsAdapter: 'CUSTOM', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: '8 mins ago' },
  { id: 'p-3', companyName: 'Razorpay', careerUrl: 'https://razorpay.workdayjobs.com/careers', atsAdapter: 'WORKDAY', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: '12 mins ago' },
  { id: 'p-4', companyName: 'Uber', careerUrl: 'https://jobs.lever.co/uber', atsAdapter: 'LEVER', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: '15 mins ago' }
];

export const AdminPage: React.FC = () => {
  const [portals, setPortals] = useState<CompanyPortalTarget[]>(mockPortals);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCareerUrl, setNewCareerUrl] = useState('');
  const [newAtsAdapter, setNewAtsAdapter] = useState<'WORKDAY' | 'GREENHOUSE' | 'LEVER' | 'ASHBY' | 'ORACLE' | 'CUSTOM'>('WORKDAY');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAddPortal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName || !newCareerUrl) return;

    const newTarget: CompanyPortalTarget = {
      id: `p-${Date.now()}`,
      companyName: newCompanyName,
      careerUrl: newCareerUrl,
      atsAdapter: newAtsAdapter,
      crawlIntervalMinutes: 15,
      status: 'ACTIVE',
      lastCrawled: 'Just now'
    };

    setPortals(prev => [newTarget, ...prev]);
    setShowAddModal(false);
    setNewCompanyName('');
    setNewCareerUrl('');
    setSuccessMsg(`Added ${newCompanyName} career portal URL to continuous Playwright crawling index!`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleToggleStatus = (id: string) => {
    setPortals(prev =>
      prev.map(p => (p.id === id ? { ...p, status: p.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : p))
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">SaaS Admin — Single Owner Control Panel</h1>
          <p className="text-slate-400 text-sm">
            Exclusive administration dashboard for single owner (Aniket Chaubey) to manage 50,000+ career target URLs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Career Portal URL</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> {successMsg}
        </div>
      )}

      {/* SINGLE OWNER SECURITY BADGE CARD */}
      <div className="p-6 rounded-3xl glass-card border border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">Sole Master Admin Profile</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                OWNER ACCESS ONLY
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Admin Email: <strong className="text-slate-200 font-mono">admin@jobpilot.io (Aniket Chaubey)</strong> • Unauthorized user role escalation disabled.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 shrink-0">
          <ShieldCheck className="w-4 h-4" />
          <span>Sole Admin Lock Active</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl glass-card space-y-1 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Indexed Portals</span>
          <p className="text-3xl font-extrabold text-white">50,000+</p>
        </div>
        <div className="p-6 rounded-2xl glass-card space-y-1 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Active Crawlers</span>
          <p className="text-3xl font-extrabold text-brand-400">15-Min Cron</p>
        </div>
        <div className="p-6 rounded-2xl glass-card space-y-1 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Playwright Workers</span>
          <p className="text-3xl font-extrabold text-emerald-400">12 Instances</p>
        </div>
        <div className="p-6 rounded-2xl glass-card space-y-1 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">RabbitMQ Load</span>
          <p className="text-3xl font-extrabold text-indigo-400">99.99% Uptime</p>
        </div>
      </div>

      {/* Monitored Company Career Portals Table */}
      <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Globe className="w-5 h-5 text-brand-400" />
            <span>Monitored Career Portal Target URLs</span>
          </h3>
          <span className="text-xs text-slate-400">Updating 50,000+ company URLs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Company Name</th>
                <th className="p-3.5">Career Portal Target URL</th>
                <th className="p-3.5">ATS Adapter</th>
                <th className="p-3.5">Crawl Rate</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {portals.map(p => (
                <tr key={p.id} className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-white">{p.companyName}</td>
                  <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                    <a href={p.careerUrl} target="_blank" rel="noreferrer" className="hover:text-brand-400 flex items-center gap-1">
                      <span className="truncate max-w-xs">{p.careerUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {p.atsAdapter}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400">Every {p.crawlIntervalMinutes} mins</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      p.status === 'ACTIVE'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleToggleStatus(p.id)}
                      className="text-xs font-bold text-brand-400 hover:underline"
                    >
                      {p.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Company Portal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl glass-card border border-brand-500/30 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-lg">Add Company Career Portal URL</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddPortal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Microsoft, Snowflake"
                  value={newCompanyName}
                  onChange={e => setNewCompanyName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Career Portal URL</label>
                <input
                  type="url"
                  placeholder="https://careers.company.com"
                  value={newCareerUrl}
                  onChange={e => setNewCareerUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500 font-mono text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">ATS Adapter Type</label>
                <select
                  value={newAtsAdapter}
                  onChange={e => setNewAtsAdapter(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="WORKDAY">Workday</option>
                  <option value="GREENHOUSE">Greenhouse</option>
                  <option value="LEVER">Lever</option>
                  <option value="ASHBY">Ashby</option>
                  <option value="ORACLE">Oracle SuccessFactors</option>
                  <option value="CUSTOM">Custom Form Adapter</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/30"
                >
                  Save & Crawl URL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

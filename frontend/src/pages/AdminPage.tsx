import React, { useState } from 'react';
import { ShieldCheck, Server, Users, Cpu, Activity, Plus, Globe, Trash2, Edit, CheckCircle2, Search, ExternalLink, UserCheck, ShieldAlert, KeyRound } from 'lucide-react';

interface CompanyPortalTarget {
  id: string;
  companyName: string;
  careerUrl: string;
  atsAdapter: 'WORKDAY' | 'GREENHOUSE' | 'LEVER' | 'ASHBY' | 'ORACLE' | 'CUSTOM';
  crawlIntervalMinutes: number;
  status: 'ACTIVE' | 'PAUSED';
  lastCrawled: string;
}

interface RegisteredUser {
  id: string;
  fullName: string;
  email: string;
  role: 'CANDIDATE' | 'ADMIN';
  joinedDate: string;
  isSubscribed: boolean;
}

const mockPortals: CompanyPortalTarget[] = [
  { id: 'p-1', companyName: 'Stripe', careerUrl: 'https://boards.greenhouse.io/stripe', atsAdapter: 'GREENHOUSE', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: '5 mins ago' },
  { id: 'p-2', companyName: 'Google', careerUrl: 'https://www.google.com/about/careers', atsAdapter: 'CUSTOM', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: '8 mins ago' },
  { id: 'p-3', companyName: 'Razorpay', careerUrl: 'https://razorpay.workdayjobs.com/careers', atsAdapter: 'WORKDAY', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: '12 mins ago' },
  { id: 'p-4', companyName: 'Uber', careerUrl: 'https://jobs.lever.co/uber', atsAdapter: 'LEVER', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: '15 mins ago' }
];

const mockUsers: RegisteredUser[] = [
  { id: 'usr-1', fullName: 'Aniket Chaubey', email: 'aniket@jobpilot.io', role: 'CANDIDATE', joinedDate: 'July 15, 2026', isSubscribed: true },
  { id: 'usr-2', fullName: 'System Administrator', email: 'admin@jobpilot.io', role: 'ADMIN', joinedDate: 'June 01, 2026', isSubscribed: true },
  { id: 'usr-3', fullName: 'Priya Sharma', email: 'priya@example.com', role: 'CANDIDATE', joinedDate: 'August 02, 2026', isSubscribed: true },
  { id: 'usr-4', fullName: 'Rahul Verma', email: 'rahul@example.com', role: 'CANDIDATE', joinedDate: 'August 18, 2026', isSubscribed: false }
];

export const AdminPage: React.FC = () => {
  const [portals, setPortals] = useState<CompanyPortalTarget[]>(mockPortals);
  const [usersList, setUsersList] = useState<RegisteredUser[]>(mockUsers);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCareerUrl, setNewCareerUrl] = useState('');
  const [newAtsAdapter, setNewAtsAdapter] = useState<'WORKDAY' | 'GREENHOUSE' | 'LEVER' | 'ASHBY' | 'ORACLE' | 'CUSTOM'>('WORKDAY');

  const [showMakeAdminModal, setShowMakeAdminModal] = useState(false);
  const [promoteEmail, setPromoteEmail] = useState('');
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

  const handleToggleUserRole = (userId: string) => {
    setUsersList(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const updatedRole = u.role === 'ADMIN' ? 'CANDIDATE' : 'ADMIN';
          setSuccessMsg(`Updated ${u.fullName} (${u.email}) role to ${updatedRole}!`);
          setTimeout(() => setSuccessMsg(''), 3500);
          return { ...u, role: updatedRole };
        }
        return u;
      })
    );
  };

  const handlePromoteByEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoteEmail) return;

    const existingUser = usersList.find(u => u.email.toLowerCase() === promoteEmail.toLowerCase());
    if (existingUser) {
      setUsersList(prev => prev.map(u => u.id === existingUser.id ? { ...u, role: 'ADMIN' } : u));
      setSuccessMsg(`Promoted ${existingUser.fullName} (${promoteEmail}) to Platform Administrator!`);
    } else {
      const newAdmin: RegisteredUser = {
        id: `usr-${Date.now()}`,
        fullName: promoteEmail.split('@')[0],
        email: promoteEmail,
        role: 'ADMIN',
        joinedDate: 'Just now',
        isSubscribed: true
      };
      setUsersList(prev => [newAdmin, ...prev]);
      setSuccessMsg(`Created & Granted Admin Role to ${promoteEmail}!`);
    }

    setShowMakeAdminModal(false);
    setPromoteEmail('');
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">SaaS Admin — User Roles & Crawler Controls</h1>
          <p className="text-slate-400 text-sm">
            Grant Admin access to users, manage 50,000+ monitored career portal URLs, and inspect worker metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMakeAdminModal(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Make User Admin</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Career Portal URL</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> {successMsg}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl glass-card space-y-1 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Registered Users</span>
          <p className="text-3xl font-extrabold text-white">{usersList.length} Active</p>
        </div>
        <div className="p-6 rounded-2xl glass-card space-y-1 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Indexed Portals</span>
          <p className="text-3xl font-extrabold text-brand-400">50,000+</p>
        </div>
        <div className="p-6 rounded-2xl glass-card space-y-1 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Playwright Workers</span>
          <p className="text-3xl font-extrabold text-emerald-400">12 Instances</p>
        </div>
        <div className="p-6 rounded-2xl glass-card space-y-1 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">System Status</span>
          <p className="text-3xl font-extrabold text-indigo-400">HEALTHY</p>
        </div>
      </div>

      {/* USER ACCESS CONTROL & ADMIN PROMOTION TABLE */}
      <div className="p-6 rounded-3xl glass-card border border-indigo-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <span>User Access Control & Admin Promotion Manager</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Promote any candidate to Platform Administrator or modify user roles in real-time.
            </p>
          </div>

          <button
            onClick={() => setShowMakeAdminModal(true)}
            className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1"
          >
            + Grant Admin Role by Email
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">User Full Name</th>
                <th className="p-3.5">Email Address</th>
                <th className="p-3.5">Current Role</th>
                <th className="p-3.5">Subscription</th>
                <th className="p-3.5">Joined Date</th>
                <th className="p-3.5 text-right">Role Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {usersList.map(u => (
                <tr key={u.id} className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-white">{u.fullName}</td>
                  <td className="p-3.5 text-slate-400 font-mono text-[11px]">{u.email}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      u.role === 'ADMIN'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                    }`}>
                      {u.role === 'ADMIN' ? '🛡️ ADMIN' : '👤 CANDIDATE'}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.isSubscribed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {u.isSubscribed ? 'PRO ACTIVE' : 'FREE'}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400">{u.joinedDate}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleToggleUserRole(u.id)}
                      className={`text-xs font-bold px-3 py-1 rounded-xl transition ${
                        u.role === 'ADMIN'
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                      }`}
                    >
                      {u.role === 'ADMIN' ? 'Demote to Candidate' : 'Promote to Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

      {/* MAKE USER ADMIN MODAL */}
      {showMakeAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl glass-card border border-indigo-500/40 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <span>Promote User to Admin</span>
              </h3>
              <button onClick={() => setShowMakeAdminModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handlePromoteByEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">User Email Address</label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={promoteEmail}
                  onChange={e => setPromoteEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 font-medium"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                  Enter the email address of the candidate you want to grant full platform administrator privileges to.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowMakeAdminModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Promote to Admin</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

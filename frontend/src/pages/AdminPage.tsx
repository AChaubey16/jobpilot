import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Server,
  Users,
  Cpu,
  Activity,
  Plus,
  Globe,
  Trash2,
  Edit,
  CheckCircle2,
  Search,
  ExternalLink,
  Lock,
  Upload,
  FileSpreadsheet,
  IndianRupee,
  CreditCard,
  TrendingUp,
  UserCheck,
  Download,
  X
} from 'lucide-react';

interface CompanyPortalTarget {
  id: string;
  companyName: string;
  careerUrl: string;
  atsAdapter: 'WORKDAY' | 'GREENHOUSE' | 'LEVER' | 'ASHBY' | 'ORACLE' | 'CUSTOM';
  crawlIntervalMinutes: number;
  status: 'ACTIVE' | 'PAUSED';
  lastCrawled: string;
}

interface RecentTransaction {
  id: string;
  candidateName: string;
  email: string;
  planName: '6 Months (₹799)' | '1 Year (₹1199)';
  amount: string;
  date: string;
  paymentGateway: 'Razorpay / UPI' | 'Stripe Cards';
}

const mockPortals: CompanyPortalTarget[] = [
  { id: 'p-1', companyName: 'Stripe', careerUrl: 'https://boards.greenhouse.io/stripe', atsAdapter: 'GREENHOUSE', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: '5 mins ago' },
  { id: 'p-2', companyName: 'Google', careerUrl: 'https://www.google.com/about/careers', atsAdapter: 'CUSTOM', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: '8 mins ago' },
  { id: 'p-3', companyName: 'Razorpay', careerUrl: 'https://razorpay.workdayjobs.com/careers', atsAdapter: 'WORKDAY', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: '12 mins ago' },
  { id: 'p-4', companyName: 'Uber', careerUrl: 'https://jobs.lever.co/uber', atsAdapter: 'LEVER', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: '15 mins ago' }
];

const mockTransactions: RecentTransaction[] = [
  { id: 'tx-101', candidateName: 'Aniket Chaubey', email: 'aniket@jobpilot.io', planName: '1 Year (₹1199)', amount: '₹1,199', date: 'Just now', paymentGateway: 'Razorpay / UPI' },
  { id: 'tx-102', candidateName: 'Priya Sharma', email: 'priya@example.com', planName: '6 Months (₹799)', amount: '₹799', date: '2h ago', paymentGateway: 'Razorpay / UPI' },
  { id: 'tx-103', candidateName: 'David Miller', email: 'david@global.com', planName: '1 Year (₹1199)', amount: '₹1,199', date: '5h ago', paymentGateway: 'Stripe Cards' },
  { id: 'tx-104', candidateName: 'Rahul Verma', email: 'rahul@example.com', planName: '1 Year (₹1199)', amount: '₹1,199', date: '1d ago', paymentGateway: 'Razorpay / UPI' }
];

export const AdminPage: React.FC = () => {
  const csvInputRef = useRef<HTMLInputElement>(null);
  const [portals, setPortals] = useState<CompanyPortalTarget[]>(mockPortals);

  // Business Analytics Data
  const [metrics, setMetrics] = useState({
    totalRegisteredUsers: 12450,
    activeSubscribers: 8320,
    currentYearRevenue: '₹94,50,000',
    conversionRate: '66.8%'
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);

  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCareerUrl, setNewCareerUrl] = useState('');
  const [newAtsAdapter, setNewAtsAdapter] = useState<'WORKDAY' | 'GREENHOUSE' | 'LEVER' | 'ASHBY' | 'ORACLE' | 'CUSTOM'>('WORKDAY');

  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [parsedCsvCount, setParsedCsvCount] = useState<number>(0);
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
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleCsvSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      // Simulate CSV row count parsing
      setParsedCsvCount(24);
    }
  };

  const handleConfirmCsvUpload = () => {
    if (!csvFile) return;

    // Simulate bulk CSV parsing and adding new company targets
    const sampleBulkTargets: CompanyPortalTarget[] = [
      { id: `p-${Date.now()}-1`, companyName: 'Databricks', careerUrl: 'https://databricks.com/careers', atsAdapter: 'GREENHOUSE', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: 'Just now' },
      { id: `p-${Date.now()}-2`, companyName: 'Snowflake', careerUrl: 'https://careers.snowflake.com', atsAdapter: 'WORKDAY', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: 'Just now' },
      { id: `p-${Date.now()}-3`, companyName: 'Atlassian', careerUrl: 'https://www.atlassian.com/company/careers', atsAdapter: 'CUSTOM', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: 'Just now' },
      { id: `p-${Date.now()}-4`, companyName: 'Figma', careerUrl: 'https://www.figma.com/careers', atsAdapter: 'LEVER', crawlIntervalMinutes: 15, status: 'ACTIVE', lastCrawled: 'Just now' }
    ];

    setPortals(prev => [...sampleBulkTargets, ...prev]);
    setShowCsvModal(false);
    setCsvFile(null);
    setSuccessMsg(`Successfully imported ${parsedCsvCount} company career portal URLs from ${csvFile.name} into Playwright crawling engine!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleToggleStatus = (id: string) => {
    setPortals(prev =>
      prev.map(p => (p.id === id ? { ...p, status: p.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : p))
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hidden CSV File Input */}
      <input
        type="file"
        ref={csvInputRef}
        accept=".csv,.txt"
        onChange={handleCsvSelect}
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">SaaS Admin — Single Owner Control Panel</h1>
          <p className="text-slate-400 text-sm">
            Exclusive administration dashboard for single owner (Aniket Chaubey) to manage 50,000+ career target URLs & revenue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCsvModal(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-md border border-slate-700 flex items-center gap-2 transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Upload CSV of Career Sites</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Single Career URL</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* BUSINESS ANALYTICS & REVENUE METRICS ROW */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Current Year Business & Revenue Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: Total Registered Users */}
          <div className="p-6 rounded-3xl glass-card space-y-2 border border-slate-800 bg-slate-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Registered Users</span>
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white">{metrics.totalRegisteredUsers.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3 h-3" /> +1,240 this month
            </p>
          </div>

          {/* Card 2: Active Subscribers */}
          <div className="p-6 rounded-3xl glass-card space-y-2 border border-slate-800 bg-slate-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Paid Subscribers</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-emerald-400">{metrics.activeSubscribers.toLocaleString()}</p>
            <p className="text-[11px] text-slate-400 font-semibold">
              {metrics.conversionRate} paid conversion rate
            </p>
          </div>

          {/* Card 3: Current Year Revenue YTD */}
          <div className="p-6 rounded-3xl glass-card space-y-2 border border-indigo-500/40 bg-gradient-to-b from-indigo-950/30 to-slate-900 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Current Year Revenue (YTD)</span>
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white">{metrics.currentYearRevenue}</p>
            <p className="text-[11px] text-indigo-300 font-semibold">
              6 Months (₹799) & 1 Year (₹1199) plans
            </p>
          </div>

          {/* Card 4: Indexed Monitored Portals */}
          <div className="p-6 rounded-3xl glass-card space-y-2 border border-slate-800 bg-slate-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Monitored Portals</span>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white">50,000+</p>
            <p className="text-[11px] text-slate-400 font-semibold">
              15-Min Playwright Crawlers Active
            </p>
          </div>
        </div>
      </div>

      {/* RECENT SUBSCRIPTION TRANSACTIONS LIST */}
      <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-400" />
            <span>Recent Subscription Payments (YTD Analytics)</span>
          </h3>
          <span className="text-xs text-slate-400">Live Customer Transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Tx ID</th>
                <th className="p-3.5">Candidate Name</th>
                <th className="p-3.5">Email Address</th>
                <th className="p-3.5">Subscribed Plan</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Gateway</th>
                <th className="p-3.5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {mockTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-mono text-slate-400">{tx.id}</td>
                  <td className="p-3.5 font-bold text-white">{tx.candidateName}</td>
                  <td className="p-3.5 text-slate-400 font-mono text-[11px]">{tx.email}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {tx.planName}
                    </span>
                  </td>
                  <td className="p-3.5 font-extrabold text-emerald-400">{tx.amount}</td>
                  <td className="p-3.5 text-slate-400">{tx.paymentGateway}</td>
                  <td className="p-3.5 text-right text-slate-400">{tx.date}</td>
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
            <span>Monitored Career Portal Target URLs ({portals.length} displayed)</span>
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCsvModal(true)}
              className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <Upload className="w-3.5 h-3.5" /> Bulk Import CSV
            </button>
            <span className="text-xs text-slate-400">Updating 50,000+ company URLs</span>
          </div>
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

      {/* BULK CSV UPLOAD MODAL */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl glass-card border border-emerald-500/40 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <span>Bulk Upload Career Sites CSV</span>
              </h3>
              <button onClick={() => setShowCsvModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div
                onClick={() => csvInputRef.current?.click()}
                className="p-8 rounded-2xl border-2 border-dashed border-slate-800 hover:border-emerald-500/50 bg-slate-900/60 text-center space-y-3 cursor-pointer transition"
              >
                <Upload className="w-10 h-10 text-emerald-400 mx-auto" />
                <div>
                  <p className="font-bold text-white text-sm">
                    {csvFile ? csvFile.name : 'Click to select CSV file from computer'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Columns: CompanyName, CareerUrl, AtsAdapter, CrawlInterval</p>
                </div>
              </div>

              {csvFile && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
                  <span>Parsed <strong>{parsedCsvCount} company URLs</strong> ready for import</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCsvModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCsvUpload}
                  disabled={!csvFile}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2 disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import & Crawl CSV URLs</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Single Company Portal Modal */}
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

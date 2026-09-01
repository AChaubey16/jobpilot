import React from 'react';
import {
  Search,
  CheckCircle2,
  Building2,
  Clock,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Award
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const jobsData = [
  { day: 'Mon', jobs: 42 },
  { day: 'Tue', jobs: 68 },
  { day: 'Wed', jobs: 95 },
  { day: 'Thu', jobs: 120 },
  { day: 'Fri', jobs: 140 },
  { day: 'Sat', jobs: 85 },
  { day: 'Sun', jobs: 110 },
];

const topCompanies = [
  { name: 'Google', count: 18 },
  { name: 'Amazon', count: 24 },
  { name: 'Stripe', count: 15 },
  { name: 'Microsoft', count: 20 },
  { name: 'Uber', count: 12 },
];

export const DashboardPage: React.FC = () => {
  const stats = [
    { title: 'Jobs Found Today', value: '142', change: '+18%', icon: Search, color: 'text-brand-400' },
    { title: 'Applications Processed', value: '86', change: '+24%', icon: CheckCircle2, color: 'text-emerald-400' },
    { title: 'Companies Tracked', value: '450+', change: 'Live', icon: Building2, color: 'text-indigo-400' },
    { title: 'Pending Automation', value: '4', change: 'Paused for Submit', icon: Clock, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl glass-card border border-brand-500/20 bg-gradient-to-r from-brand-950/40 via-indigo-950/20 to-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Autopilot Microservices Active
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, Senior Engineer!
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            JobPilot Playwright automation scanner is actively monitoring 450+ company portals every 15 minutes.
          </p>
        </div>
        <button className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center gap-2 transition transform hover:-translate-y-0.5">
          <span>Configure Filters</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-6 rounded-2xl glass-card glass-card-hover space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{stat.title}</span>
                <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white">{stat.value}</span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jobs Found Trend */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-400" />
              <span>Jobs Discovered Per Day</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">Past 7 Days</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={jobsData}>
                <defs>
                  <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="jobs" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorJobs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Hiring Companies */}
        <div className="p-6 rounded-2xl glass-card space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <span>Top Hiring Companies</span>
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCompanies} layout="vertical">
                <XAxis type="number" stroke="#64748b" fontSize={12} hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={80} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

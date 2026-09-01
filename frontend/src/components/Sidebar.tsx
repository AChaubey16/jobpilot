import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  FileCheck2,
  FileText,
  CreditCard,
  Settings,
  ShieldCheck,
  Bot,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const allNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roleRequired: 'CANDIDATE' },
    { to: '/jobs', label: 'Job Discovery', icon: Briefcase, roleRequired: 'CANDIDATE' },
    { to: '/applications', label: 'Applications', icon: FileCheck2, roleRequired: 'CANDIDATE' },
    { to: '/resume-analyzer', label: 'ATS Analyzer', icon: Sparkles, roleRequired: 'CANDIDATE' },
    { to: '/resumes', label: 'Resumes', icon: FileText, roleRequired: 'CANDIDATE' },
    { to: '/subscription', label: 'Subscription', icon: CreditCard, roleRequired: 'CANDIDATE' },
    { to: '/settings', label: 'Settings', icon: Settings, roleRequired: 'CANDIDATE' },
    { to: '/admin', label: 'Admin Panel', icon: ShieldCheck, roleRequired: 'ADMIN' },
  ];

  const navItems = allNavItems.filter(item => {
    if (item.roleRequired === 'ADMIN') {
      return user?.role === 'ADMIN';
    }
    return true;
  });

  return (
    <aside className="w-64 glass-card border-r border-slate-800 flex flex-col h-screen sticky top-0 z-30">
      {/* Brand Logo */}
      <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            JobPilot
          </h1>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-400">
            SaaS Microservices
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30 font-semibold shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Subscription Banner */}
      <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-brand-900/60 to-indigo-950/60 border border-brand-500/20">
        <div className="flex items-center gap-2 text-brand-300 font-semibold text-xs mb-1">
          <Sparkles className="w-4 h-4" />
          <span>PRO SaaS Plan</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Autopilot automation & priority Playwright workers active.
        </p>
      </div>
    </aside>
  );
};

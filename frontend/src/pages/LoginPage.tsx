import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bot, ArrowRight, Sparkles, ShieldCheck, UserCheck, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [activeRoleTab, setActiveRoleTab] = useState<'CANDIDATE' | 'ADMIN'>('CANDIDATE');
  const [email, setEmail] = useState('aniket@jobpilot.io');
  const [password, setPassword] = useState('password123');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loggedUser = await login(email, password, activeRoleTab);
    
    if (loggedUser.role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleTabChange = (role: 'CANDIDATE' | 'ADMIN') => {
    setActiveRoleTab(role);
    if (role === 'ADMIN') {
      setEmail('admin@jobpilot.io');
    } else {
      setEmail('aniket@jobpilot.io');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-brand-500 selection:text-white">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] pointer-events-none opacity-20 blur-[140px] bg-gradient-to-tr from-brand-600 to-indigo-600" />

      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl glass-card border border-brand-500/30 space-y-6 shadow-2xl bg-slate-900/60 backdrop-blur-xl">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 mx-auto flex items-center justify-center shadow-lg shadow-brand-500/30">
              <Bot className="w-7 h-7 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Sign in to JobPilot</h1>
          <p className="text-xs text-slate-400">Autonomous Job Discovery & Application SaaS Platform</p>
        </div>

        {/* Candidate vs Admin Login Mode Selector */}
        <div className="p-1.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleTabChange('CANDIDATE')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeRoleTab === 'CANDIDATE'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Candidate Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('ADMIN')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeRoleTab === 'ADMIN'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Sign In</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              {activeRoleTab === 'ADMIN' ? 'Admin Email Address' : 'Candidate Work Email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500 font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500 font-medium"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition ${
              activeRoleTab === 'ADMIN'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30'
                : 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-brand-600/30'
            }`}
          >
            <span>{activeRoleTab === 'ADMIN' ? 'Sign In as Admin' : 'Sign In as Candidate'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {activeRoleTab === 'CANDIDATE' ? (
          <div className="text-center text-xs text-slate-400 pt-2">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-brand-400 hover:text-brand-300">
              Create Candidate Account
            </Link>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-center text-xs text-indigo-300">
            Admin access grants rights to manage 50,000+ monitored company target URLs and worker pool metrics.
          </div>
        )}
      </div>
    </div>
  );
};

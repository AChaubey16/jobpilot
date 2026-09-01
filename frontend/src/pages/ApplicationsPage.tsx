import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  FileCheck2,
  Pause,
  Play,
  CheckCircle2,
  AlertTriangle,
  Eye,
  ArrowUpRight,
  Clock,
  ShieldAlert,
  Edit3,
  User,
  Sparkles,
  MapPin,
  Briefcase,
  Sliders,
  FileText,
  KeyRound,
  Lock,
  Smartphone,
  Mail
} from 'lucide-react';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  ats: string;
  status: 'PAUSED_FOR_USER' | 'AUTOMATION_IN_PROGRESS' | 'SUBMITTED' | 'FAILED' | 'PAUSED' | 'OTP_REQUIRED';
  reason?: string;
  screenshot?: string;
  updatedAt: string;
  expectedCtc: string;
  noticePeriod: string;
  customNote: string;
  otpChannel?: 'SMS' | 'EMAIL';
  otpDestination?: string;
}

const mockApplications: Application[] = [
  {
    id: 'app-104',
    jobTitle: 'Senior Distributed Systems Engineer',
    company: 'Workday Portal (Oracle Inc)',
    ats: 'WORKDAY',
    status: 'OTP_REQUIRED',
    reason: 'Security verification required by Workday portal. A 6-digit OTP code was sent to your phone/email.',
    otpChannel: 'SMS',
    otpDestination: '+91 98****3210 & aniket@****.com',
    screenshot: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    updatedAt: '1 min ago',
    expectedCtc: '₹36,000,000 / yr',
    noticePeriod: '30 Days',
    customNote: 'High priority microservices role.'
  },
  {
    id: 'app-101',
    jobTitle: 'Senior Java Backend Engineer (Microservices)',
    company: 'Stripe',
    ats: 'GREENHOUSE',
    status: 'PAUSED_FOR_USER',
    reason: 'Multi-page form filled automatically up to final confirmation. Pause-before-submit enabled.',
    screenshot: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    updatedAt: '10 mins ago',
    expectedCtc: '₹35,000,000 / yr',
    noticePeriod: '30 Days',
    customNote: 'Prefer backend microservices architecture teams.'
  },
  {
    id: 'app-102',
    jobTitle: 'Lead Product Manager - Platform API',
    company: 'Razorpay',
    ats: 'WORKDAY',
    status: 'AUTOMATION_IN_PROGRESS',
    updatedAt: '2 mins ago',
    expectedCtc: '₹38,000,000 / yr',
    noticePeriod: '15 Days',
    customNote: 'Focus on developer API monetization & growth.'
  },
  {
    id: 'app-103',
    jobTitle: 'Staff Microservices Platform Architect',
    company: 'Uber',
    ats: 'LEVER',
    status: 'SUBMITTED',
    updatedAt: 'Yesterday',
    expectedCtc: '₹42,000,000 / yr',
    noticePeriod: 'Immediate',
    customNote: 'Full-stack platform architecture role.'
  }
];

export const ApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const [apps, setApps] = useState<Application[]>(mockApplications);
  const [activeModalApp, setActiveModalApp] = useState<Application | null>(null);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [editForm, setEditForm] = useState({ expectedCtc: '', noticePeriod: '', customNote: '' });

  // OTP Modal State
  const [otpApp, setOtpApp] = useState<Application | null>(null);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);

  // Toggle Pause/Resume application
  const handleTogglePause = (appId: string) => {
    setApps(prev =>
      prev.map(a => {
        if (a.id === appId) {
          if (a.status === 'PAUSED' || a.status === 'PAUSED_FOR_USER' || a.status === 'OTP_REQUIRED') {
            return { ...a, status: 'AUTOMATION_IN_PROGRESS', reason: undefined };
          } else {
            return { ...a, status: 'PAUSED', reason: 'Application manually paused by candidate.' };
          }
        }
        return a;
      })
    );
  };

  const handleFinalSubmit = (appId: string) => {
    setApps(prev =>
      prev.map(a => (a.id === appId ? { ...a, status: 'SUBMITTED', reason: undefined } : a))
    );
    setActiveModalApp(null);
  };

  const handleOpenEdit = (app: Application) => {
    setEditingApp(app);
    setEditForm({
      expectedCtc: app.expectedCtc,
      noticePeriod: app.noticePeriod,
      customNote: app.customNote
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;
    setApps(prev =>
      prev.map(a =>
        a.id === editingApp.id
          ? {
              ...a,
              expectedCtc: editForm.expectedCtc,
              noticePeriod: editForm.noticePeriod,
              customNote: editForm.customNote
            }
          : a
      )
    );
    setEditingApp(null);
  };

  const handleOtpDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto-focus next input field
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpDigits.join('');
    if (code.length < 6) {
      setOtpError('Please enter all 6 digits of the OTP code.');
      return;
    }
    setOtpError('');
    setOtpSuccess(true);
    setTimeout(() => {
      if (otpApp) {
        setApps(prev =>
          prev.map(a => (a.id === otpApp.id ? { ...a, status: 'AUTOMATION_IN_PROGRESS', reason: undefined } : a))
        );
      }
      setOtpSuccess(false);
      setOtpApp(null);
      setOtpDigits(['', '', '', '', '', '']);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* User Profile Summary Header */}
      <div className="p-6 md:p-8 rounded-3xl glass-card border border-brand-500/20 bg-gradient-to-r from-brand-950/40 via-slate-900 to-indigo-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center font-extrabold text-2xl text-white shadow-lg shadow-brand-500/30 ring-2 ring-brand-400/20">
            {user?.fullName?.charAt(0) || 'A'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-extrabold text-white tracking-tight">{user?.fullName || 'Aniket Senior Engineer'}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active Pro Subscriber
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-slate-500" /> Software & Platform Engineer • 6+ Years Exp
              <span>•</span>
              <MapPin className="w-3.5 h-3.5 text-slate-500" /> Mumbai / Remote
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Skills: Java • Spring Boot • React • Microservices • Redis • Docker • AWS
            </p>
          </div>
        </div>
      </div>

      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Application Automation Queue</h1>
          <p className="text-slate-400 text-sm">
            Track Playwright browser automation workers, pause tasks, enter OTP codes, or edit application inputs.
          </p>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {apps.map(app => (
          <div key={app.id} className="p-6 rounded-2xl glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-l-4 border-l-brand-500">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-800 text-indigo-400 border border-slate-700">
                  {app.ats}
                </span>
                {app.status === 'OTP_REQUIRED' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse">
                    <KeyRound className="w-3.5 h-3.5 text-purple-400" /> OTP Verification Required
                  </span>
                )}
                {app.status === 'PAUSED_FOR_USER' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                    <Pause className="w-3 h-3" /> Paused for Review
                  </span>
                )}
                {app.status === 'PAUSED' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
                    <Pause className="w-3 h-3 text-slate-400" /> Manually Paused
                  </span>
                )}
                {app.status === 'AUTOMATION_IN_PROGRESS' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    <Clock className="w-3 h-3 animate-spin" /> Playwright Running
                  </span>
                )}
                {app.status === 'SUBMITTED' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Submitted
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white">{app.jobTitle}</h3>
              <p className="text-xs text-slate-400 font-medium">
                {app.company} • Updated {app.updatedAt} • Expected CTC: <strong className="text-slate-200">{app.expectedCtc}</strong> • Notice: <strong className="text-slate-200">{app.noticePeriod}</strong>
              </p>

              {app.customNote && (
                <p className="text-xs text-slate-400 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                  "{app.customNote}"
                </p>
              )}

              {app.reason && (
                <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                  app.status === 'OTP_REQUIRED'
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-200'
                    : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                }`}>
                  {app.status === 'OTP_REQUIRED' ? (
                    <KeyRound className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span>{app.reason}</span>
                    {app.otpDestination && (
                      <p className="text-[11px] text-purple-300/80 mt-1 font-semibold">Sent to: {app.otpDestination}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons: OTP Button, Pause/Resume, Edit Details, Review Submit */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* ENTER OTP BUTTON */}
              {app.status === 'OTP_REQUIRED' && (
                <button
                  onClick={() => {
                    setOtpApp(app);
                    setOtpDigits(['', '', '', '', '', '']);
                    setOtpError('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition animate-pulse"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Enter OTP Code</span>
                </button>
              )}

              {/* Pause / Resume Button */}
              {app.status !== 'SUBMITTED' && (
                <button
                  onClick={() => handleTogglePause(app.id)}
                  className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                    app.status === 'PAUSED' || app.status === 'PAUSED_FOR_USER' || app.status === 'OTP_REQUIRED'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                  title={app.status === 'PAUSED' ? 'Resume Automation' : 'Pause Application'}
                >
                  {app.status === 'PAUSED' || app.status === 'PAUSED_FOR_USER' || app.status === 'OTP_REQUIRED' ? (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Resume</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause App</span>
                    </>
                  )}
                </button>
              )}

              {/* Edit Application Details Button */}
              {app.status !== 'SUBMITTED' && (
                <button
                  onClick={() => handleOpenEdit(app)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                  title="Edit Application Parameters"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
              )}

              {/* Review & Final Submit */}
              {app.status === 'PAUSED_FOR_USER' && (
                <button
                  onClick={() => setActiveModalApp(app)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Review & Submit</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* OTP Verification Modal */}
      {otpApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl glass-card border border-purple-500/40 space-y-6 shadow-2xl">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 mx-auto flex items-center justify-center text-purple-400">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-xl">OTP Verification Required</h3>
              <p className="text-xs text-slate-400">
                Enter the 6-digit verification code sent by <strong>{otpApp.company}</strong> to {otpApp.otpDestination}.
              </p>
            </div>

            {otpSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>OTP Verified! Playwright worker resuming application...</span>
              </div>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                {otpError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center">
                    {otpError}
                  </div>
                )}

                {/* 6 Digit Input Boxes */}
                <div className="flex items-center justify-center gap-2">
                  {otpDigits.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-input-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpDigitChange(i, e.target.value)}
                      className="w-11 h-13 text-center text-xl font-extrabold text-white bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Resend code in 01:45</span>
                  <button type="button" className="text-purple-400 font-bold hover:underline">Resend OTP</button>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setOtpApp(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit & Resume</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Edit Application Modal */}
      {editingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 rounded-3xl glass-card border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-white text-lg">Edit Application Inputs</h3>
                <p className="text-xs text-slate-400">{editingApp.jobTitle} • {editingApp.company}</p>
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Expected CTC</label>
                <input
                  type="text"
                  value={editForm.expectedCtc}
                  onChange={e => setEditForm({ ...editForm, expectedCtc: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Notice Period</label>
                <input
                  type="text"
                  value={editForm.noticePeriod}
                  onChange={e => setEditForm({ ...editForm, noticePeriod: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Custom Application Note / Cover Message</label>
                <textarea
                  rows={3}
                  value={editForm.customNote}
                  onChange={e => setEditForm({ ...editForm, customNote: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/30"
                >
                  Save Inputs
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review & Final Submit Modal */}
      {activeModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl p-6 rounded-3xl glass-card border border-amber-500/30 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-white text-lg">{activeModalApp.jobTitle}</h3>
                <p className="text-xs text-slate-400">{activeModalApp.company} • {activeModalApp.ats} Adapter</p>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Playwright Screenshot Preview</span>
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-video relative">
                {activeModalApp.screenshot ? (
                  <img src={activeModalApp.screenshot} alt="Playwright step" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500 text-xs">No screenshot captured</div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveModalApp(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleFinalSubmit(activeModalApp.id)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Final Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

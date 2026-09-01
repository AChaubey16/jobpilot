import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, Sparkles, Download, Receipt, ArrowRight } from 'lucide-react';

export const SubscriptionPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'6MONTHS' | '1YEAR'>('1YEAR');
  const [subscribing, setSubscribing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = () => {
    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Subscription & Plan Management</h1>
        <p className="text-slate-400 text-sm">
          Choose a plan to unlock 50,000+ monitored career portals, Playwright automation workers, password/OTP email alerts, and ATS scoring.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Payment verified successfully! Your subscription is active.</span>
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 6 Months Plan - ₹799 */}
        <div
          onClick={() => setSelectedPlan('6MONTHS')}
          className={`p-8 rounded-3xl glass-card border flex flex-col justify-between cursor-pointer transition ${
            selectedPlan === '6MONTHS'
              ? 'border-brand-500/50 bg-gradient-to-b from-brand-950/40 via-slate-900 to-slate-900 shadow-xl'
              : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">HALF-YEARLY PASS</span>
              {selectedPlan === '6MONTHS' && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  SELECTED
                </span>
              )}
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">₹799</span>
                <span className="text-slate-400 text-sm font-medium">/ 6 months</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Full access to JobPilot automation engine for 6 months.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 50,000+ Monitored Career Portals</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Playwright Form Autofill Workers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-Time Password & OTP Email Alerts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 40+ ATS Parameter Scoring</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> GST Invoice Included</li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <button
              onClick={handleCheckout}
              disabled={subscribing}
              className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition"
            >
              <span>{subscribing ? 'Processing...' : 'Subscribe 6 Months for ₹799'}</span>
            </button>
          </div>
        </div>

        {/* 1 Year Plan - ₹1199 (POPULAR) */}
        <div
          onClick={() => setSelectedPlan('1YEAR')}
          className={`p-8 rounded-3xl glass-card border flex flex-col justify-between cursor-pointer transition relative ${
            selectedPlan === '1YEAR'
              ? 'border-brand-500/60 bg-gradient-to-br from-brand-950/50 via-slate-900 to-indigo-950/40 shadow-2xl scale-[1.02]'
              : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
          }`}
        >
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-extrabold text-[10px] uppercase tracking-widest shadow-md">
            ★ MOST POPULAR • BEST VALUE
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-300 uppercase tracking-widest">ANNUAL PASS</span>
              {selectedPlan === '1YEAR' && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  SELECTED
                </span>
              )}
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">₹1199</span>
                <span className="text-slate-400 text-sm font-medium">/ 1 year</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Save 25%! Full access to JobPilot automation engine for a full 365 days.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 50,000+ Monitored Career Portals</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Playwright Form Autofill Workers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-Time Password & OTP Email Alerts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 40+ ATS Parameter Scoring</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Priority Worker Queue Slots</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> GST Invoice Included</li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <button
              onClick={handleCheckout}
              disabled={subscribing}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition"
            >
              <CreditCard className="w-4 h-4" />
              <span>{subscribing ? 'Processing Gateway...' : 'Subscribe 1 Year for ₹1199'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Invoice History Section */}
      <div className="p-6 rounded-2xl glass-card space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Receipt className="w-5 h-5 text-indigo-400" />
          <span>Billing History & Downloadable Invoices</span>
        </h3>
        <div className="space-y-2">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-bold text-xs text-white">INV-2026-00812 (Annual Subscription)</p>
              <p className="text-[11px] text-slate-400">Paid ₹1199.00 on July 20, 2026 • Razorpay / UPI</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>PDF Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

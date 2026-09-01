import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Mail, MessageSquare, Send, CheckCircle2, ArrowLeft, MapPin, Phone } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

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
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 md:py-16 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Contact JobPilot Support
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Have questions about Playwright automation, ATS adapters, or your annual subscription? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl glass-card border border-slate-800 bg-slate-900/40 space-y-3">
              <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 w-fit">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Email Support</h3>
              <p className="text-xs text-slate-400">Direct technical support for accounts & Playwright workers.</p>
              <a href="mailto:support@jobpilot.io" className="text-xs font-bold text-brand-400 hover:text-brand-300 block">
                support@jobpilot.io
              </a>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-slate-800 bg-slate-900/40 space-y-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Headquarters</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                JobPilot Inc.<br />
                Bengaluru Tech Hub, Karnataka, India
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 p-8 rounded-3xl glass-card border border-slate-800 bg-slate-900/40 space-y-6">
            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Thank you! Your message has been sent to our support team.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="Aniket"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Your Email</label>
                  <input
                    type="email"
                    placeholder="aniket@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

import React, { useState } from 'react';
import { Send, Copy, Check, Sparkles, User, Briefcase, Mail, Linkedin, RefreshCw, MessageSquare } from 'lucide-react';

export const OutreachPage: React.FC = () => {
  const [recipientRole, setRecipientRole] = useState('Recruiter / Talent Partner');
  const [targetCompany, setTargetCompany] = useState('Stripe');
  const [targetRole, setTargetRole] = useState('Senior Backend Engineer');
  const [candidateSummary, setCandidateSummary] = useState('6+ Years Exp in Java, Microservices, Spring Boot, Redis, Kafka');
  const [tone, setTone] = useState<'PROFESSIONAL' | 'CONCISE' | 'ALUMNI'>('CONCISE');

  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [outreachMessage, setOutreachMessage] = useState(
    `Hi Sarah,\n\nI noticed Stripe is currently hiring a Senior Backend Engineer on your platform. With 6+ years of experience engineering high-concurrency microservices, Java, Kafka, and Redis, I’d love to learn more about the team's roadmap.\n\nI submitted my application directly via JobPilot and attached my resume. Would you be open to a quick 5-minute chat or passing my profile to the hiring team?\n\nBest regards,\nAniket`
  );

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      if (tone === 'ALUMNI') {
        setOutreachMessage(
          `Hi Sarah,\n\nI saw you’re also an alumnus and currently leading talent at ${targetCompany}! I'm applying for the ${targetRole} role and would love to ask a couple of quick questions about the team culture.\n\nIf you have a spare moment for a referral or quick connection, I’d be immensely grateful!\n\nBest,\nAniket`
        );
      } else if (tone === 'PROFESSIONAL') {
        setOutreachMessage(
          `Dear Sarah,\n\nI am writing to express my strong interest in the ${targetRole} position at ${targetCompany}. Having spent 6+ years architecting scalable cloud backend solutions, I am confident my technical background aligns closely with your team's objectives.\n\nI have submitted my profile and would appreciate the opportunity to connect.\n\nSincerely,\nAniket`
        );
      } else {
        setOutreachMessage(
          `Hi Sarah,\n\nSaw the ${targetRole} posting at ${targetCompany}. With 6+ yrs of backend microservices experience, I'd love to connect and share how my background aligns with your team's current goals.\n\nAppreciate any quick referral or connection!\n\nBest,\nAniket`
        );
      }
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outreachMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">AI LinkedIn & Email Outreach Generator</h1>
        <p className="text-slate-400 text-sm">
          Draft high-converting referral messages, recruiter InMails, and cold emails to 3x your interview callback rates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Config Panel */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Recipient Category</label>
              <select
                value={recipientRole}
                onChange={e => setRecipientRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                <option value="Recruiter / Talent Partner">Recruiter / Talent Partner</option>
                <option value="Hiring Manager">Hiring Manager / Tech Lead</option>
                <option value="Company Alumni">Company Alumni / Employee Referral</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Target Company</label>
              <input
                type="text"
                value={targetCompany}
                onChange={e => setTargetCompany(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Target Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Message Tone</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTone('CONCISE')}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    tone === 'CONCISE'
                      ? 'bg-brand-600 text-white border-brand-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  Concise
                </button>
                <button
                  type="button"
                  onClick={() => setTone('PROFESSIONAL')}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    tone === 'PROFESSIONAL'
                      ? 'bg-brand-600 text-white border-brand-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  Formal
                </button>
                <button
                  type="button"
                  onClick={() => setTone('ALUMNI')}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    tone === 'ALUMNI'
                      ? 'bg-brand-600 text-white border-brand-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  Alumni
                </button>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {generating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Drafting Personal Message...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Outreach Draft</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output Panel */}
        <div className="md:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl glass-card border border-brand-500/30 bg-slate-900/60 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-brand-300 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brand-400" />
                <span>Generated Outreach Copy</span>
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 border border-brand-500/30 text-xs font-bold flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Copy'}</span>
              </button>
            </div>

            <textarea
              rows={10}
              value={outreachMessage}
              onChange={e => setOutreachMessage(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-200 focus:outline-none leading-relaxed font-sans"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

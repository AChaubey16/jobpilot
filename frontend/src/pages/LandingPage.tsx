import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Zap,
  Star,
  Building2,
  ExternalLink,
  HelpCircle,
  Cpu,
  MonitorPlay,
  Search,
  AlertTriangle,
  Clock,
  Target,
  TrendingUp,
  Lock,
  FileText,
  Sliders,
  ChevronDown,
  ChevronUp,
  Award,
  Check,
  X,
  DollarSign,
  Layers,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  // Interactive ROI Calculator State
  const [weeklyApps, setWeeklyApps] = useState<number>(35);
  const [minutesPerApp, setMinutesPerApp] = useState<number>(25);

  // FAQ Accordion Toggle State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculations for ROI
  const totalManualHoursPerMonth = Math.round((weeklyApps * minutesPerApp * 4) / 60);
  const jobPilotHoursPerMonth = Math.round((weeklyApps * 2 * 4) / 60);
  const hoursSavedPerMonth = Math.max(1, totalManualHoursPerMonth - jobPilotHoursPerMonth);
  const estimatedTimeValueSaved = hoursSavedPerMonth * 500; // estimated ₹500/hr value

  const monitoredCompanies = [
    { name: 'Stripe', industry: 'FinTech', ats: 'GREENHOUSE', activeJobs: 24, lastScanned: '3 mins ago' },
    { name: 'Google', industry: 'Tech', ats: 'CUSTOM', activeJobs: 110, lastScanned: '5 mins ago' },
    { name: 'Razorpay', industry: 'FinTech', ats: 'WORKDAY', activeJobs: 15, lastScanned: '8 mins ago' },
    { name: 'Uber', industry: 'Logistics', ats: 'LEVER', activeJobs: 42, lastScanned: '12 mins ago' },
    { name: 'Retool', industry: 'DevTools', ats: 'ASHBY', activeJobs: 8, lastScanned: '4 mins ago' },
    { name: 'Airbnb', industry: 'Travel', ats: 'GREENHOUSE', activeJobs: 19, lastScanned: '2 mins ago' },
    { name: 'Swiggy', industry: 'Consumer Tech', ats: 'WORKDAY', activeJobs: 31, lastScanned: '6 mins ago' },
    { name: 'Microsoft', industry: 'Enterprise Tech', ats: 'ICIMS', activeJobs: 145, lastScanned: '1 min ago' },
    { name: 'PhonePe', industry: 'FinTech', ats: 'ORACLE', activeJobs: 28, lastScanned: '7 mins ago' },
  ];

  const faqList = [
    {
      q: 'How does JobPilot automate application submissions across 50,000+ company portals?',
      a: 'JobPilot runs cloud-hosted, headless Playwright web automation workers. Our background crawlers monitor over 50,000 corporate career sites every 15 minutes. When a matching job opening is detected based on your preferences, Playwright navigates the portal, parses form inputs (like Workday, Greenhouse, Lever, Ashby, and Oracle), maps your master profile fields, attaches your resume PDF, and submits the form cleanly.'
    },
    {
      q: 'What happens when a portal requires an OTP or account creation password?',
      a: 'Security and human verification are built directly into JobPilot. When an ATS portal requires an OTP email verification or account password setup, our Playwright worker safely pauses execution and instantly sends a real-time email notification and high-priority UI alert on your JobPilot dashboard. You enter the 6-digit OTP code directly in JobPilot, and the worker resumes immediately to finalize your application.'
    },
    {
      q: 'Does JobPilot work for non-engineering job roles?',
      a: 'Yes, absolutely! JobPilot is a universal application engine designed for every professional discipline. It includes pre-tuned heuristics and field-mapping profiles for Software Engineering, Product Management, Data Science & Analytics, UI/UX Design, DevOps/Cloud, Marketing, Sales, Human Resources, and Finance.'
    },
    {
      q: 'How does the built-in 40+ ATS Parameter Scoring work?',
      a: 'Our ATS scoring engine analyzes your resume against candidate tracking systems like Workday, Greenhouse, and Lever. It evaluates 40+ crucial parameters including hard skills keyword density, action-verb strength, section heading formatting, contact data completeness, and education layout to ensure your application passes automated screening parsers with high scores.'
    },
    {
      q: 'What is the difference between the 6 Months, 1 Year, and Lifetime Access plans?',
      a: 'The 6 Months Pass (₹799) provides full automation access for half a year. The 1 Year Pass (₹1199) gives 365 days of access with priority worker queue slots (saving 25%). The 👑 Lifetime Access Pass (₹2499) is a single, one-time payment that gives you unlimited, lifetime access to all future portal additions, Playwright worker updates, VIP queue priority, and unlimited ATS audits with no recurring renewal fees ever.'
    },
    {
      q: 'Is my personal data and resume secure on JobPilot?',
      a: 'We take data protection seriously. All master profile attributes, contact info, and uploaded resume files are encrypted in transit and at rest using bank-grade AES-256 encryption. We have a strict Zero-Data-Selling policy. Your data is used exclusively to automate application submissions on your behalf.'
    },
    {
      q: 'Can I add custom company career links that are not in the default 50,000+ list?',
      a: 'Yes! Admin & users can add single career URLs or bulk-upload CSV lists of custom company portal URLs. JobPilot automatically indexes the portal, detects its ATS architecture (Workday, Lever, Greenhouse, etc.), and begins monitoring it for new openings.'
    },
    {
      q: 'How quickly does JobPilot apply after a job is posted?',
      a: 'JobPilot background crawlers scan target portals every 15 minutes. Being among the first applicants (within 30 minutes of posting) increases your resume callback rate by up to 14.8x compared to applying 2 days later.'
    },
    {
      q: 'Can I pause or update my application criteria at any time?',
      a: 'Yes, you have total control. You can update your job title keywords, target locations, salary requirements, experience level, or pause automation runs with a single toggle inside your JobPilot dashboard.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), Credit Cards, Debit Cards, NetBanking, and Wallet payments via secure Razorpay checkout. GST tax invoices are automatically generated and downloadable instantly.'
    },
    {
      q: 'Will candidate career portals flag my account for using automation?',
      a: 'No. JobPilot Playwright workers use randomized human-like browser gestures, variable typing delays, authentic user-agent strings, and headless browser sandboxing to mirror standard manual browser applications, ensuring full compliance and stealth.'
    },
    {
      q: 'How do I get customer support if I run into any issues?',
      a: 'We offer 24/7 dedicated support. Lifetime Access members receive VIP priority support via live chat and email assistance.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white overflow-x-hidden scroll-smooth">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-25 blur-[160px] bg-gradient-to-b from-brand-500 via-indigo-600 to-purple-600 z-0" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 max-w-7xl mx-auto w-full px-6 md:px-8 h-20 flex items-center justify-between border-b border-white/10 backdrop-blur-xl bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              JobPilot
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-400 block -mt-1">
              SaaS Autopilot
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase font-bold tracking-wider text-slate-400">
          <a href="#problem" className="hover:text-white transition">The Problem</a>
          <a href="#solution" className="hover:text-white transition">The Solution</a>
          <a href="#benefits" className="hover:text-white transition">Benefits</a>
          <a href="#how-it-works" className="hover:text-white transition">How it Works</a>
          <a href="#calculator" className="hover:text-white transition">ROI Calculator</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center gap-2 transition"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider px-3 py-2 transition">
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-brand-600 hover:from-purple-500 hover:to-brand-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 flex items-center gap-2 transition"
              >
                <span>Get Started (₹2499)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-12 md:py-20 space-y-36">

        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto space-y-8 pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-brand-500/10 text-brand-300 border border-brand-500/30 shadow-inner">
            <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
            <span>UNIVERSAL APPLICATION AUTOPILOT FOR ALL ROLES</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Stop Applying Manually.{' '}
            <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Apply to 100+ Jobs Daily on Autopilot.
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-xl leading-relaxed max-w-3xl mx-auto">
            JobPilot monitors <strong>50,000+ company career portals</strong> 24/7. Our intelligent Playwright web workers autofill Workday, Greenhouse, Lever, and Oracle forms, assist with real-time OTP logins, and score your resume for 40+ ATS parameters.
          </p>

          {/* Role Badges Ticker */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs font-bold text-slate-300">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 flex items-center gap-1.5">💻 Software Engineering</span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 flex items-center gap-1.5">📊 Product & Data Science</span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 flex items-center gap-1.5">🎨 UI/UX & Design</span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 flex items-center gap-1.5">🚀 Cloud & DevOps</span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 flex items-center gap-1.5">📈 Growth & Marketing</span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 flex items-center gap-1.5">💼 HR, Sales & Finance</span>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-brand-600 hover:from-purple-500 hover:to-brand-500 text-white font-extrabold text-base shadow-2xl shadow-purple-600/40 flex items-center justify-center gap-3 transition transform hover:-translate-y-0.5"
            >
              <span>Get Lifetime Access for ₹2499</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#calculator"
              className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-bold text-base flex items-center justify-center gap-2 transition"
            >
              <Sliders className="w-5 h-5 text-indigo-400" />
              <span>Calculate Hours Saved</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 mt-12">
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
              <span className="text-2xl md:text-3xl font-extrabold text-white block">50,000+</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Monitored Career Portals</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
              <span className="text-2xl md:text-3xl font-extrabold text-indigo-400 block">1.4M+</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Applications Processed</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
              <span className="text-2xl md:text-3xl font-extrabold text-emerald-400 block">99.4%</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">ATS Parse Accuracy</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
              <span className="text-2xl md:text-3xl font-extrabold text-purple-400 block">14.8x</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Callback Boost Factor</span>
            </div>
          </div>
        </section>

        {/* Section 1: The Problem */}
        <section id="problem" className="space-y-12 scroll-mt-24">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-rose-400 uppercase tracking-widest bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              THE HARD REALITY OF JOB HUNTING IN 2026
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Why Manual Job Applications Are Broken</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Job seekers spend over 25 hours every week repeating the exact same data entry tasks across hundreds of broken portals, only to get lost in ATS rejection filters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl glass-card space-y-4 border border-rose-500/20 bg-rose-950/10 hover:border-rose-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-white">1. The 30-Minute Portal Loop</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Workday, Taleo, and Oracle require creating a brand-new user account, uploading a resume, and re-typing work experience line by line for every single job application.
              </p>
            </div>

            <div className="p-7 rounded-3xl glass-card space-y-4 border border-amber-500/20 bg-amber-950/10 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-white">2. The 75% ATS Black Hole</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Over 75% of submitted resumes are rejected by automated ATS screening software before a recruiter ever looks at them, due to formatting bugs or missing keyword signals.
              </p>
            </div>

            <div className="p-7 rounded-3xl glass-card space-y-4 border border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-white">3. Missing Early Applicant Advantage</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Recruiters shortlist candidates within the first 24 to 48 hours. Submitting manual applications days later drastically lowers your chance of securing an interview.
              </p>
            </div>

            <div className="p-7 rounded-3xl glass-card space-y-4 border border-purple-500/20 bg-purple-950/10 hover:border-purple-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-white">4. Severe Application Burnout</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Repetitive copy-pasting leads to mental exhaustion, formatting mistakes, wrong document attachments, and abandoned application forms halfway through.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: The Solution */}
        <section id="solution" className="p-8 md:p-12 rounded-3xl glass-card border border-brand-500/30 bg-gradient-to-br from-brand-950/50 via-slate-900 to-indigo-950/40 space-y-12 shadow-2xl scroll-mt-24">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-brand-300 uppercase tracking-widest bg-brand-500/20 px-3.5 py-1 rounded-full border border-brand-500/30">
              THE AUTOPILOT ENGINE ARCHITECTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">How JobPilot Solves Job Hunting</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              JobPilot combines high-frequency career portal web crawlers, headless Playwright browser workers, real-time OTP verification, and automated ATS resume optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">1. 50,000+ Portal Crawlers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Background workers index 50,000+ corporate career portals every 15 minutes, identifying fresh openings instantly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <MonitorPlay className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">2. Playwright Form Filler</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated Playwright browser sessions populate multi-tab Workday, Greenhouse, Lever, and Ashby inputs flawlessly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">3. Real-Time OTP Verification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When security OTP tokens or account setups are needed, Playwright sends immediate email & UI alerts with 6-digit input.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">4. 40+ ATS Scoring Audit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload your resume to get instant 40+ point keyword scoring and formatting suggestions before sending applications.
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-brand-600 hover:from-purple-500 hover:to-brand-500 text-white font-extrabold text-sm shadow-xl shadow-purple-600/30 flex items-center gap-2 transition"
            >
              <span>Unlock Autopilot Engine Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section 3: Benefits Matrix */}
        <section id="benefits" className="space-y-12 scroll-mt-24">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20">
              TAILORED FOR EVERY JOB ROLE & DISCIPLINE
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Key Benefits for Your Career Track</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              JobPilot's smart form mapper adapts to specialized inputs, portfolio attachments, technical profiles, and custom screening questions for any job category.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl glass-card border border-slate-800 bg-slate-900/40 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Software Engineering & DevOps</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Autofills GitHub, LeetCode & StackOverflow links</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Maps programming languages (React, Go, Python, Java)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Handles AWS, Kubernetes & GCP certifications</li>
              </ul>
            </div>

            <div className="p-7 rounded-3xl glass-card border border-slate-800 bg-slate-900/40 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Product Management & Data</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Inserts Product Case Study & PRD links</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Maps SQL, Python, Tableau & PowerBI tags</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Handles Agile, Scrum & Roadmap metrics</li>
              </ul>
            </div>

            <div className="p-7 rounded-3xl glass-card border border-slate-800 bg-slate-900/40 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">UI/UX Design & Creative</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Attaches Figma, Behance & Dribbble links</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Populates Design Systems & Prototyping tools</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Auto-attaches PDF portfolio work samples</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Monitored Portals Preview */}
        <section id="monitored-portals" className="space-y-12 scroll-mt-24">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3.5 py-1 rounded-full border border-indigo-500/20">
              50,000+ CAREER PORTALS MONITORED
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Real-Time Portal Scanning Engine</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Our crawlers check top company career portals every 15 minutes. Admin & users can also add custom career portal URLs anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {monitoredCompanies.map((c, i) => (
              <div key={i} className="p-6 rounded-2xl glass-card border border-slate-800 bg-slate-900/30 flex items-center justify-between hover:border-brand-500/40 transition">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-base">{c.name}</h4>
                    <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {c.ats}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{c.industry} • {c.activeJobs} active roles</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Live
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Interactive ROI Calculator */}
        <section id="calculator" className="p-8 md:p-12 rounded-3xl glass-card border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 space-y-8 shadow-2xl scroll-mt-24">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-purple-300 uppercase tracking-widest bg-purple-500/20 px-3.5 py-1 rounded-full border border-purple-500/30">
              TIME SAVINGS CALCULATOR
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Calculate How Many Hours You Save</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Adjust the sliders below to see how much time and financial value JobPilot reclaims for you every single month.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Sliders */}
            <div className="space-y-6 bg-slate-900/80 p-7 rounded-2xl border border-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Target Applications Per Week:</span>
                  <span className="text-brand-400 font-extrabold text-sm">{weeklyApps} applications</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={weeklyApps}
                  onChange={(e) => setWeeklyApps(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Current Manual Time Per App:</span>
                  <span className="text-indigo-400 font-extrabold text-sm">{minutesPerApp} minutes</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={45}
                  value={minutesPerApp}
                  onChange={(e) => setMinutesPerApp(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-brand-950/40 border border-brand-500/30 text-center">
                <span className="text-3xl md:text-4xl font-extrabold text-brand-300 block">{hoursSavedPerMonth} hrs</span>
                <span className="text-xs text-slate-300 font-bold block mt-1">Saved Every Month</span>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center">
                <span className="text-3xl md:text-4xl font-extrabold text-emerald-300 block">₹{estimatedTimeValueSaved.toLocaleString()}</span>
                <span className="text-xs text-slate-300 font-bold block mt-1">Valuable Time Reclaimed</span>
              </div>

              <div className="p-6 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-center col-span-2">
                <span className="text-2xl font-extrabold text-purple-300 block">14.8x Early Applicant Boost</span>
                <span className="text-xs text-slate-300 block mt-1">Be inside the first 20 applicants for every newly posted job</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Step-by-Step How It Works */}
        <section id="how-it-works" className="space-y-12 scroll-mt-24">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-brand-300 uppercase tracking-widest bg-brand-500/10 px-3.5 py-1 rounded-full border border-brand-500/20">
              SIMPLE 4-STEP WORKFLOW
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">How JobPilot Works</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Set up your profile once, and let JobPilot run in the background 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl glass-card space-y-4 border border-slate-800 bg-slate-900/40 relative">
              <span className="text-4xl font-black text-slate-800 absolute top-4 right-6">01</span>
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Build Unified Profile</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your work history, education, portfolio links, and upload your master resume PDF.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-card space-y-4 border border-slate-800 bg-slate-900/40 relative">
              <span className="text-4xl font-black text-slate-800 absolute top-4 right-6">02</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Set Target Preferences</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose job role keywords, preferred location (Remote/Hybrid), and salary thresholds.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-card space-y-4 border border-slate-800 bg-slate-900/40 relative">
              <span className="text-4xl font-black text-slate-800 absolute top-4 right-6">03</span>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Playwright Autopilot</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our Playwright workers fill applications across 50,000+ monitored portals automatically.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-card space-y-4 border border-slate-800 bg-slate-900/40 relative">
              <span className="text-4xl font-black text-slate-800 absolute top-4 right-6">04</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">OTP Assist & Tracking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive real-time OTP alerts for fast authentication, and track your callbacks live.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Pricing Section (3-Tier Model) */}
        <section id="pricing" className="space-y-12 scroll-mt-24">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-brand-400 uppercase tracking-widest bg-brand-500/10 px-3.5 py-1 rounded-full border border-brand-500/20">
              TRANSPARENT INR PRICING • NO HIDDEN FEES
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Choose Your Job Hunting Plan</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Unlock 50,000+ monitored career portals, Playwright automation workers, real-time OTP alerts, and instant 40+ ATS parameter scoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 6 Months Plan - ₹799 */}
            <div className="p-8 rounded-3xl glass-card border border-slate-800 bg-slate-900/40 flex flex-col justify-between hover:border-slate-700 transition">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">HALF-YEARLY PASS</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">6 MONTHS</span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">₹799</span>
                    <span className="text-slate-400 text-xs font-medium">/ 6 months access</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Full access to JobPilot automation engine for 6 months.
                  </p>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 50,000+ Monitored Career Portals</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Playwright Form Autofill Workers</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Real-Time Password & OTP Alerts</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 40+ ATS Parameter Scoring</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> GST Invoice Included</li>
                </ul>
              </div>

              <div className="pt-8 border-t border-slate-800 mt-8">
                <Link
                  to="/register"
                  className="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>Subscribe 6 Months for ₹799</span>
                </Link>
              </div>
            </div>

            {/* 1 Year Plan - ₹1199 (POPULAR) */}
            <div className="p-8 rounded-3xl glass-card border border-brand-500/50 bg-gradient-to-br from-brand-950/40 via-slate-900 to-indigo-950/30 flex flex-col justify-between relative shadow-xl hover:border-brand-500 transition">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-extrabold text-[10px] uppercase tracking-widest shadow-md">
                ★ MOST POPULAR • SAVE 25%
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-brand-300 uppercase tracking-widest">ANNUAL PASS</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-500/20 text-brand-300">1 YEAR</span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">₹1199</span>
                    <span className="text-slate-400 text-xs font-medium">/ 1 year access</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Save 25%! Full access to JobPilot automation engine for a full 365 days.
                  </p>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 50,000+ Monitored Career Portals</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Playwright Form Autofill Workers</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Real-Time Password & OTP Alerts</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 40+ ATS Parameter Scoring</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Priority Worker Queue Slots</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> GST Invoice Included</li>
                </ul>
              </div>

              <div className="pt-8 border-t border-slate-800 mt-8">
                <Link
                  to="/register"
                  className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition"
                >
                  <span>Subscribe 1 Year for ₹1199</span>
                </Link>
              </div>
            </div>

            {/* Lifetime Free Access Plan - ₹2499 (BEST VALUE) */}
            <div className="p-8 rounded-3xl glass-card border border-purple-500/60 bg-gradient-to-br from-purple-950/50 via-slate-900 to-brand-950/40 flex flex-col justify-between relative shadow-2xl transform scale-[1.02] hover:border-purple-400 transition">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-[10px] uppercase tracking-widest shadow-md">
                👑 LIFETIME ACCESS • BEST VALUE
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-purple-300 uppercase tracking-widest">LIFETIME PASS</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">UNLIMITED</span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">₹2499</span>
                    <span className="text-slate-400 text-xs font-medium">/ lifetime access</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed font-semibold">
                    One-time payment. Never pay again! Full unlimited lifetime access to all current and future portals.
                  </p>
                </div>

                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Unlimited Lifetime Playwright Runs</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> 50,000+ Monitored Career Portals</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Playwright Form Autofill Workers</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Real-Time Password & OTP Alerts</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> VIP Ultra-Fast Worker Queue</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Unlimited ATS Audits & GST Invoice</li>
                </ul>
              </div>

              <div className="pt-8 border-t border-purple-500/30 mt-8">
                <Link
                  to="/register"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-brand-600 hover:from-purple-500 hover:to-brand-500 text-white font-extrabold text-xs shadow-xl shadow-purple-600/40 flex items-center justify-center gap-2 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Lifetime Access for ₹2499</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: FAQ Accordion */}
        <section id="faq" className="space-y-12 max-w-4xl mx-auto scroll-mt-24">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Everything You Need to Know</h2>
            <p className="text-slate-400 text-sm">
              Got questions about JobPilot automation, OTP verification, or lifetime access? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqList.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl glass-card border border-slate-800 bg-slate-900/40 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-white text-sm md:text-base hover:text-brand-300 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-brand-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs md:text-sm text-slate-400 leading-relaxed border-t border-slate-800/80 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 9: Final CTA Banner */}
        <section className="p-10 md:p-16 rounded-3xl glass-card border border-purple-500/30 bg-gradient-to-r from-purple-950/60 via-slate-900 to-brand-950/60 text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to Land Your Dream Job on Autopilot?
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Join thousands of professionals applying to 100+ jobs daily without spending hours on tedious manual data entry.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-brand-600 hover:from-purple-500 hover:to-brand-500 text-white font-extrabold text-base shadow-2xl shadow-purple-600/40 flex items-center justify-center gap-3 transition transform hover:-translate-y-0.5"
            >
              <span>Get Lifetime Access for ₹2499</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-sm">JobPilot SaaS</span>
            <span>© 2026 JobPilot Inc. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-300 transition">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Sparkles, Filter, CheckCircle2, AlertCircle } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  exp: string;
  ats: string;
  matchScore: number;
  matchReasons: string[];
  posted: string;
  url: string;
}

const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Java Backend Engineer (Microservices)',
    company: 'Stripe',
    location: 'Bengaluru / Remote',
    exp: '5-8 Years',
    ats: 'GREENHOUSE',
    matchScore: 95,
    matchReasons: [
      'Location match (+30%)',
      'Matched 5 required skill keywords: Java, Spring Boot, Microservices, Kafka, Redis (+50%)',
      'No excluded keywords found (+20%)'
    ],
    posted: '2 hours ago',
    url: 'https://boards.greenhouse.io/stripe/jobs/12345'
  },
  {
    id: 'job-2',
    title: 'Lead Product Manager - Platform & API',
    company: 'Razorpay',
    location: 'Mumbai / Hybrid',
    exp: '4-7 Years',
    ats: 'WORKDAY',
    matchScore: 91,
    matchReasons: [
      'Location match (+30%)',
      'Matched 4 required skill keywords: Product Strategy, Roadmap, Agile, SQL (+41%)',
      'No excluded keywords found (+20%)'
    ],
    posted: '3 hours ago',
    url: 'https://razorpay.workdayjobs.com/careers/job/6789'
  },
  {
    id: 'job-3',
    title: 'Senior Frontend Engineer (React & TypeScript)',
    company: 'Airbnb',
    location: 'Remote',
    exp: '3-6 Years',
    ats: 'GREENHOUSE',
    matchScore: 89,
    matchReasons: [
      'Location match (+30%)',
      'Matched 4 required skill keywords: React, TypeScript, Next.js, Tailwind (+39%)',
      'No excluded keywords found (+20%)'
    ],
    posted: '5 hours ago',
    url: 'https://careers.airbnb.com/positions/fe-789'
  },
  {
    id: 'job-4',
    title: 'Staff DevOps & Cloud Infrastructure Engineer',
    company: 'Uber',
    location: 'Hyderabad',
    exp: '6-10 Years',
    ats: 'LEVER',
    matchScore: 94,
    matchReasons: [
      'Location match (+30%)',
      'Matched 5 required skill keywords: Kubernetes, Terraform, AWS, Docker, CI/CD (+44%)',
      'No excluded keywords found (+20%)'
    ],
    posted: '1 day ago',
    url: 'https://jobs.lever.co/uber/arch-123'
  },
  {
    id: 'job-5',
    title: 'Principal Data Scientist & ML Engineer',
    company: 'Google',
    location: 'Bengaluru',
    exp: '5-9 Years',
    ats: 'CUSTOM',
    matchScore: 92,
    matchReasons: [
      'Location match (+30%)',
      'Matched 4 required skill keywords: Python, PySpark, Snowflake, Machine Learning (+42%)',
      'No excluded keywords found (+20%)'
    ],
    posted: '1 day ago',
    url: 'https://www.google.com/about/careers/ds-99'
  }
];

export const JobSearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);

  const handleApply = (job: Job) => {
    setApplyingId(job.id);
    setTimeout(() => {
      setApplyingId(null);
      setApplySuccess(job.title);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Job Discovery & Match Engine</h1>
          <p className="text-slate-400 text-sm">
            Jobs discovered within the last 3 days matching your backend profile criteria.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by title, skills, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>
          <button className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-2 text-sm font-semibold">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {applySuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Successfully queued automation job for <strong>{applySuccess}</strong>! Playwright worker is initializing.</span>
          </div>
          <button onClick={() => setApplySuccess(null)} className="text-xs text-slate-400 hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-800 text-indigo-400 border border-slate-700">
                  {job.ats}
                </span>
                <span className="text-xs text-slate-400 font-medium">{job.posted}</span>
              </div>
              <h2 className="text-lg font-bold text-white hover:text-brand-400 cursor-pointer transition">
                {job.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-slate-500" /> {job.company}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {job.location}</span>
                <span>Experience: {job.exp}</span>
              </div>
            </div>

            {/* Match Score Badge & Apply Action */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSelectedJob(job)}
                className="text-center group"
              >
                <div className="text-2xl font-extrabold text-brand-400 group-hover:scale-105 transition">
                  {job.matchScore}%
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-brand-300">
                  Match Score
                </div>
              </button>

              <button
                onClick={() => handleApply(job)}
                disabled={applyingId === job.id}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center gap-2 transition disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{applyingId === job.id ? 'Queueing Playwright...' : 'Autopilot Apply'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Match Reasons Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl glass-card border border-brand-500/30 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-white text-lg">{selectedJob.title}</h3>
                <p className="text-xs text-slate-400">{selectedJob.company}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-brand-400">{selectedJob.matchScore}%</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Transparent Match Breakdown</h4>
              <ul className="space-y-2">
                {selectedJob.matchReasons.map((reason, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedJob(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold"
            >
              Close Breakdown
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Briefcase, Sparkles } from 'lucide-react';

const rolePresets: Record<string, { include: string; exclude: string }> = {
  'Software Engineering (Backend)': {
    include: 'Java, Spring Boot, Python, Node.js, Microservices, PostgreSQL, Redis, Docker, AWS',
    exclude: 'Angular, React, Android, QA, Support, Internship, Contract, Freelance'
  },
  'Software Engineering (Frontend)': {
    include: 'React, TypeScript, Next.js, Vue, Tailwind CSS, JavaScript, Redux, HTML5',
    exclude: 'Java, Python, C++, Backend, DevOps, QA, Support, Internship'
  },
  'Product Management': {
    include: 'Product Strategy, Roadmap, Agile, User Stories, Metrics, SQL, Growth, Stakeholder Management',
    exclude: 'Coding, Frontend, Backend, QA, Design, Internship'
  },
  'Data Engineering & Data Science': {
    include: 'Python, SQL, Spark, PySpark, Airflow, Snowflake, BigQuery, Machine Learning, Pandas',
    exclude: 'Frontend, Angular, React, Sales, QA, Internship'
  },
  'UI/UX & Product Design': {
    include: 'Figma, User Research, Wireframing, Prototyping, Design Systems, UX Writing, Usability Testing',
    exclude: 'Java, Backend, DevOps, QA, Sales, Support'
  },
  'DevOps, SRE & Cloud': {
    include: 'Kubernetes, Docker, Terraform, AWS, CI/CD, Ansible, Prometheus, Linux, Bash',
    exclude: 'Frontend, UI/UX, Sales, Marketing, HR, Finance'
  },
  'Growth & Marketing': {
    include: 'SEO, Content Strategy, Performance Marketing, Google Analytics, Copywriting, Social Media, Growth Hacking',
    exclude: 'Java, Python, Kubernetes, QA, Engineering'
  },
  'Custom Role': {
    include: '',
    exclude: ''
  }
};

export const SettingsPage: React.FC = () => {
  const [targetRole, setTargetRole] = useState('Software Engineering (Backend)');
  const [minExp, setMinExp] = useState(3);
  const [maxExp, setMaxExp] = useState(7);
  const [locations, setLocations] = useState('Mumbai, Pune, Bengaluru, Hyderabad, Remote');
  const [postingAge, setPostingAge] = useState(3);
  const [includeKeywords, setIncludeKeywords] = useState(rolePresets['Software Engineering (Backend)'].include);
  const [excludeKeywords, setExcludeKeywords] = useState(rolePresets['Software Engineering (Backend)'].exclude);
  const [pauseBeforeSubmit, setPauseBeforeSubmit] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleRoleChange = (role: string) => {
    setTargetRole(role);
    if (rolePresets[role]) {
      setIncludeKeywords(rolePresets[role].include);
      setExcludeKeywords(rolePresets[role].exclude);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Job Matching & Automation Preferences</h1>
        <p className="text-slate-400 text-sm">
          Customize target job roles, skill keyword matchers, and Playwright safety triggers for any domain.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Preferences updated successfully for {targetRole}!
        </div>
      )}

      <form onSubmit={handleSave} className="p-8 rounded-3xl glass-card space-y-6">
        {/* Role Preset Selector */}
        <div className="p-4 rounded-2xl bg-brand-950/30 border border-brand-500/20 space-y-2">
          <label className="block text-xs font-bold text-brand-300 uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-brand-400" />
            <span>Target Professional Domain / Role Preset</span>
          </label>
          <select
            value={targetRole}
            onChange={e => handleRoleChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500 font-medium"
          >
            {Object.keys(rolePresets).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400">Selecting a role automatically pre-fills industry-standard keyword matchers.</p>
        </div>

        {/* Experience & Posting Age */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Min Exp (Years)</label>
            <input
              type="number"
              value={minExp}
              onChange={e => setMinExp(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Max Exp (Years)</label>
            <input
              type="number"
              value={maxExp}
              onChange={e => setMaxExp(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Max Posting Age (Days)</label>
            <input
              type="number"
              value={postingAge}
              onChange={e => setPostingAge(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Target Locations */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Preferred Locations (Comma Separated)</label>
          <input
            type="text"
            value={locations}
            onChange={e => setLocations(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Include Keywords */}
        <div>
          <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Required Skills / Include Keywords</label>
          <textarea
            rows={2}
            value={includeKeywords}
            onChange={e => setIncludeKeywords(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Exclude Keywords */}
        <div>
          <label className="block text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">Excluded Keywords / Roles</label>
          <textarea
            rows={2}
            value={excludeKeywords}
            onChange={e => setExcludeKeywords(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Safety Toggle */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="font-bold text-white text-sm">Pause Before Final Submit</p>
            <p className="text-xs text-slate-400">Playwright stops on final confirmation step and triggers user review alert.</p>
          </div>
          <input
            type="checkbox"
            checked={pauseBeforeSubmit}
            onChange={e => setPauseBeforeSubmit(e.target.checked)}
            className="w-5 h-5 accent-brand-600 rounded cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center gap-2 transition"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </form>
    </div>
  );
};

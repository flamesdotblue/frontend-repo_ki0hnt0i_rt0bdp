import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Download, Check, Copy } from 'lucide-react';

const STOP_WORDS = new Set([
  'the','and','or','to','of','a','in','for','on','with','is','are','as','by','an','be','at','from','that','this','it','your','you','we','our','their','they','i','my','me','us','will','can','should','must','have','has','had','not','but','if','into','over','under','about','across','within','out','per','via','using','use'
]);

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9+.#/\-\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function extractKeywords(text, max = 25) {
  const tokens = tokenize(text).filter(t => !STOP_WORDS.has(t) && t.length > 2);
  const freq = new Map();
  for (const t of tokens) freq.set(t, (freq.get(t) || 0) + 1);
  return [...freq.entries()]
    .sort((a,b) => b[1]-a[1])
    .slice(0, max)
    .map(([k]) => k);
}

function computeScore(resume, jd) {
  const resumeTokens = new Set(tokenize(resume));
  const jdKeywords = extractKeywords(jd, 50);
  if (jdKeywords.length === 0) return { score: 0, matched: [], missing: [] };
  const matched = jdKeywords.filter(k => resumeTokens.has(k));
  const missing = jdKeywords.filter(k => !resumeTokens.has(k));
  const coverage = matched.length / jdKeywords.length;
  const density = matched.reduce((acc, k) => acc + (resume.toLowerCase().match(new RegExp(`\\b${k}\\b`, 'g'))?.length || 0), 0) / (resume.split(/\s+/).length || 1);
  const score = Math.round(Math.min(100, (coverage * 0.8 + density * 8) * 100));
  return { score, matched, missing };
}

function buildTailoredSummary(missing, jd) {
  const top = missing.slice(0, 6);
  if (top.length === 0) return 'Your resume already aligns well with the role. Consider tightening impact statements with metrics (e.g., improved X by Y%).';
  return `Summary: Results-driven professional aligning to the role with strengths in ${top.slice(0,3).join(', ')} and hands-on experience across ${top.slice(3).join(', ')}. Focused on delivering measurable outcomes that map directly to the job requirements.`;
}

function buildTailoredResume(resume, matched, missing) {
  const unique = Array.from(new Set([...matched, ...missing.slice(0, 10)]));
  const skillsBlock = `\n\nSkills Aligned to Role:\n- ${unique.slice(0,5).join('\n- ')}${unique.length>5 ? '\n- ' + unique.slice(5).join('\n- ') : ''}`;
  // If resume already has a skills section, append aligned skills; otherwise add new section at top
  const hasSkills = /skills\s*[:\n]/i.test(resume);
  if (hasSkills) {
    return resume.replace(/(skills\s*[:\n][\s\S]*?)(\n\n|$)/i, (m) => `${m.trim()}${skillsBlock}\n\n`);
  }
  return `Tailored for this role:\n${skillsBlock}\n\n${resume.trim()}`;
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
      <div className="text-3xl font-extrabold text-white">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-white/60">{label}</div>
    </div>
  );
}

export default function ATSAnalyzer() {
  const [resume, setResume] = useState('');
  const [jd, setJd] = useState('');
  const { score, matched, missing } = useMemo(() => computeScore(resume, jd), [resume, jd]);
  const summary = useMemo(() => buildTailoredSummary(missing, jd), [missing, jd]);
  const tailored = useMemo(() => buildTailoredResume(resume, matched, missing), [resume, matched, missing]);

  const copy = async (text) => {
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  return (
    <section id="analyze" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur"
        >
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-amber-300" />
            <h3 className="text-lg font-semibold">Your Resume</h3>
          </div>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your resume text here (experience, skills, achievements)."
            className="min-h-[220px] w-full resize-y rounded-2xl border border-white/10 bg-black/30 p-4 text-sm outline-none ring-0 placeholder:text-white/40 focus:border-white/20"
          />
          <div className="mt-3 flex gap-2">
            <button onClick={() => copy(resume)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
              <Copy className="h-4 w-4" /> Copy
            </button>
            <button onClick={() => { setResume(''); }} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
              Clear
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur"
        >
          <div className="mb-4 flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-cyan-300" />
            <h3 className="text-lg font-semibold">Job Description</h3>
          </div>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the target job description here."
            className="min-h-[220px] w-full resize-y rounded-2xl border border-white/10 bg-black/30 p-4 text-sm outline-none ring-0 placeholder:text-white/40 focus:border-white/20"
          />
          <div className="mt-3 flex gap-2">
            <button onClick={() => copy(jd)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
              <Copy className="h-4 w-4" /> Copy
            </button>
            <button onClick={() => { setJd(''); }} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
              Clear
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        <Stat label="ATS Score" value={`${isNaN(score) ? 0 : score}%`} />
        <Stat label="Matched Keywords" value={matched.length} />
        <Stat label="Missing Keywords" value={missing.length} />
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6"
        >
          <h4 className="text-base font-semibold">Suggestions</h4>
          <p className="mt-1 text-sm text-white/70">Add or emphasize these terms to better match the role:</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
            {missing.slice(0, 18).map((k) => (
              <li key={k} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white/90">
                <Check className="h-3.5 w-3.5 text-emerald-300" />
                {k}
              </li>
            ))}
            {missing.length === 0 && (
              <li className="text-white/70">Great alignment already. Consider quantifying achievements with metrics.</li>
            )}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6"
        >
          <h4 className="text-base font-semibold">Improved Summary</h4>
          <p className="mt-2 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/30 p-4 text-sm">{summary}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => copy(summary)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
              <Copy className="h-4 w-4" /> Copy Summary
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold">Tailored Resume (Draft)</h4>
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(tailored)}`}
            download="tailored-resume.txt"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-white to-amber-300 px-4 py-2 text-sm font-medium text-slate-900 shadow-[0_8px_30px_-12px_rgba(251,191,36,0.6)] hover:brightness-95"
          >
            <Download className="h-4 w-4" /> Download
          </a>
        </div>
        <pre className="mt-3 max-h-[320px] overflow-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-sm leading-relaxed text-white/90">{tailored}</pre>
      </motion.div>
    </section>
  );
}

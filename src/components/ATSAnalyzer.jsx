import React, { useMemo, useState } from 'react';
import { FileText, Check, X, Download } from 'lucide-react';

const STOP_WORDS = new Set([
  'the','and','a','an','to','of','in','for','on','at','with','by','from','as','is','are','was','were','be','been','it','that','this','these','those','or','not','but','so','if','then','than','into','over','under','while','during','about','after','before','between','because','through','up','down','out','off','again','further','once','can','could','should','would','will','just','also','may','might','you','your','yours','i','me','my','we','our','ours','they','them','their','theirs','he','she','his','her','its','what','which','who','whom','where','when','why','how'
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+.# ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => !STOP_WORDS.has(w));
}

function topKeywords(tokens, topN = 30) {
  const freq = new Map();
  for (const t of tokens) freq.set(t, (freq.get(t) || 0) + 1);
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word]) => word);
}

function analyze(resumeText, jdText) {
  const rTok = tokenize(resumeText);
  const jTok = tokenize(jdText);
  const jdKeywords = new Set(topKeywords(jTok, 40));

  const rSet = new Set(rTok);
  const matched = [];
  const missing = [];
  for (const kw of jdKeywords) {
    if (rSet.has(kw)) matched.push(kw); else missing.push(kw);
  }

  const coverage = jdKeywords.size ? (matched.length / jdKeywords.size) : 0;
  // Density: ratio of JD keywords occurrences within resume tokens
  const jdFreq = jTok.reduce((acc, t) => (acc.set(t, (acc.get(t) || 0) + 1), acc), new Map());
  const resumeKeywordHits = rTok.filter((t) => jdKeywords.has(t)).length;
  const density = rTok.length ? (resumeKeywordHits / rTok.length) : 0;

  // Weighted score
  const score = Math.round((coverage * 0.65 + density * 0.35) * 100);

  // Suggestions
  const suggestions = [];
  if (coverage < 0.6) suggestions.push('Add more role-specific keywords from the job description.');
  if (density < 0.12) suggestions.push('Increase keyword density in relevant sections like Summary and Experience.');
  if (!resumeText.match(/\bimpact\b|\bresults\b|\bachieved\b/i)) suggestions.push('Emphasize impact with metrics and action verbs (delivered, improved, reduced).');
  suggestions.push('Mirror terminology from the job post (tooling, frameworks, responsibilities).');

  // Summary
  const summary = `Your resume matches ${Math.round(coverage * 100)}% of top job keywords with a balanced focus on ${matched.slice(0,5).join(', ') || 'core skills'}. Consider weaving in ${missing.slice(0,5).join(', ') || 'additional role terms'} to improve relevance.`;

  // Tailored draft
  const tailored = generateTailoredResume(resumeText, matched, missing, jdText);

  return { score, coverage, density, matched, missing, suggestions, summary, tailored };
}

function generateTailoredResume(resumeText, matched, missing, jdText) {
  const jdHighlights = missing.slice(0, 10);
  const header = `Tailored Resume Draft\n\nProfessional Summary\n`;
  const summary = `Results-driven professional aligning with the role requirements. Experienced in ${matched.slice(0,8).join(', ')}. Intend to strengthen exposure to ${jdHighlights.join(', ')} to maximize impact.\n\n`;

  const skills = `Key Skills\n- ${[...new Set([...matched.slice(0,10), ...jdHighlights.slice(0,5)])].join('\n- ')}\n\n`;

  const experience = `Experience Highlights\n- Delivered outcomes leveraging ${matched.slice(0,6).join(', ')}.\n- Improved processes using role-relevant tools and best practices.\n- Collaborated across teams to meet KPIs and deadlines.\n\n`;

  const alignment = `Role Alignment\n- Reflected JD terminology: ${topKeywords(tokenize(jdText), 12).join(', ')}\n- Quantified impact where possible (%, $, time saved).\n- Ensured clarity with action verbs and concise bullets.\n`;

  return header + summary + skills + experience + alignment;
}

export default function ATSAnalyzer() {
  const [resume, setResume] = useState('');
  const [jd, setJd] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(null);

  const result = useMemo(() => analyze(resume, jd), [resume, jd]);

  function downloadDraft() {
    const blob = new Blob([result.tailored], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    // trigger click via hidden link if needed
  }

  return (
    <section id="analyze" className="relative w-full bg-neutral-950 text-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-start justify-between gap-8 flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-semibold flex items-center gap-2">
              <FileText className="h-6 w-6 text-teal-400" />
              Analyze Your Resume
            </h2>
            <p className="mt-2 text-white/70">Paste your resume and the job description. We’ll compute keyword coverage and an ATS-style score.</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Resume</label>
                <textarea
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Paste your resume text here"
                  className="w-full h-44 rounded-lg bg-neutral-900/70 border border-white/10 focus:border-teal-500 focus:ring-0 outline-none p-3"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Job Description</label>
                <textarea
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  placeholder="Paste the job description here"
                  className="w-full h-40 rounded-lg bg-neutral-900/70 border border-white/10 focus:border-teal-500 focus:ring-0 outline-none p-3"
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-5">
              <div className="flex items-end gap-6">
                <div>
                  <div className="text-5xl font-semibold">{isNaN(result.score) ? 0 : result.score}</div>
                  <div className="text-sm text-white/60">ATS Score</div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-black/40 p-3 border border-white/10">
                    <div className="text-sm text-white/60">Coverage</div>
                    <div className="text-xl font-medium">{Math.round((result.coverage || 0) * 100)}%</div>
                  </div>
                  <div className="rounded-lg bg-black/40 p-3 border border-white/10">
                    <div className="text-sm text-white/60">Density</div>
                    <div className="text-xl font-medium">{Math.round((result.density || 0) * 100)}%</div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-white/80 text-sm">{result.summary}</p>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-white/80 flex items-center gap-2"><Check className="h-4 w-4 text-teal-400" />Matched Keywords</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {result.matched.slice(0,20).map((kw) => (
                      <span key={kw} className="text-xs px-2 py-1 rounded-full bg-teal-500/20 text-teal-200 border border-teal-500/30">{kw}</span>
                    ))}
                    {result.matched.length === 0 && <span className="text-xs text-white/50">None yet</span>}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/80 flex items-center gap-2"><X className="h-4 w-4 text-red-400" />Missing Keywords</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {result.missing.slice(0,20).map((kw) => (
                      <span key={kw} className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-200 border border-red-500/20">{kw}</span>
                    ))}
                    {result.missing.length === 0 && <span className="text-xs text-white/50">None</span>}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-medium text-white/80">Suggestions</h3>
                <ul className="mt-2 list-disc list-inside text-sm text-white/70 space-y-1">
                  {result.suggestions.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={downloadDraft}
                  className="inline-flex items-center gap-2 rounded-md bg-teal-500 hover:bg-teal-400 text-black font-medium px-4 py-2 transition-colors"
                >
                  <Download className="h-4 w-4" /> Download Tailored Draft
                </button>
                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    download="tailored-resume-draft.txt"
                    className="text-sm text-white/70 underline"
                  >
                    Click if download didn’t start
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

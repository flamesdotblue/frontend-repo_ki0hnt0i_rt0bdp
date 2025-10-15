import { useMemo, useState } from "react";
import { FileText, Check, X, Download } from "lucide-react";

const STOP_WORDS = new Set([
  "the","a","an","and","or","but","if","then","else","when","at","by","from","for","in","into","of","on","onto","to","with","as","is","are","was","were","be","been","being","it","its","this","that","these","those","your","you","we","our"
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+.# ]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOP_WORDS.has(t));
}

function keywordStats(tokens) {
  const counts = new Map();
  for (const t of tokens) counts.set(t, (counts.get(t) || 0) + 1);
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50);
}

function score(resumeText, jdText) {
  const rTokens = tokenize(resumeText);
  const jTokens = tokenize(jdText);

  const jdTop = keywordStats(jTokens).map(([k]) => k);
  const rSet = new Set(rTokens);

  const matched = jdTop.filter((k) => rSet.has(k));
  const missing = jdTop.filter((k) => !rSet.has(k));

  const coverage = jdTop.length ? matched.length / jdTop.length : 0;

  const totalMatches = rTokens.filter((t) => jdTop.includes(t)).length;
  const density = rTokens.length ? totalMatches / rTokens.length : 0;

  const weighted = Math.round((coverage * 0.65 + density * 0.35) * 100);
  return { weighted, matched, missing, coverage, density };
}

export default function ATSAnalyzer() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");

  const analysis = useMemo(() => score(resume, jd), [resume, jd]);

  const suggestions = useMemo(() => {
    const tips = [];
    if (analysis.missing.length) {
      tips.push(
        `Consider incorporating: ${analysis.missing.slice(0, 10).join(", ")}.`
      );
    }
    if (analysis.coverage < 0.6) tips.push("Broaden your skills section to cover more JD keywords.");
    if (analysis.density < 0.08) tips.push("Strengthen bullet points with role-specific terminology.");
    if (!tips.length) tips.push("Great alignment. Fine-tune phrasing and quantify achievements.");
    return tips;
  }, [analysis]);

  const downloadSummary = () => {
    const content = `ATS Analysis\n\nScore: ${analysis.weighted}\nCoverage: ${(analysis.coverage*100).toFixed(1)}%\nDensity: ${(analysis.density*100).toFixed(1)}%\n\nMatched: ${analysis.matched.join(", ")}\nMissing: ${analysis.missing.join(", ")}\n\nSuggestions:\n- ${suggestions.join("\n- ")}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ats_analysis.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="analyzer" className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 flex items-center gap-2">
              <FileText size={18} /> Resume
            </h2>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your resume text here"
              className="mt-3 w-full h-52 rounded-lg border border-slate-200 bg-white/70 p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Job Description</h2>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the job description here"
              className="mt-3 w-full h-52 rounded-lg border border-slate-200 bg-white/70 p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
            />
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-200 p-5 bg-white/70">
            <div className="text-sm text-slate-500">Overall Score</div>
            <div className="mt-2 text-4xl font-semibold tracking-tight">{analysis.weighted}<span className="text-lg align-top">/100</span></div>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-teal-400"
                style={{ width: `${Math.min(100, analysis.weighted)}%` }}
              />
            </div>
            <div className="mt-4 text-sm text-slate-600">Coverage {(analysis.coverage*100).toFixed(0)}% • Density {(analysis.density*100).toFixed(0)}%</div>
            <button onClick={downloadSummary} className="mt-4 inline-flex items-center gap-2 rounded-md bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20">
              <Download size={16} /> Download Summary
            </button>
          </div>
          <div className="rounded-xl border border-slate-200 p-5 bg-white/70">
            <div className="text-sm font-medium text-slate-900 mb-2">Matched</div>
            <div className="flex flex-wrap gap-2">
              {analysis.matched.length === 0 ? (
                <span className="text-sm text-slate-500">No matches yet.</span>
              ) : (
                analysis.matched.map((k) => (
                  <span key={k} className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 text-xs">
                    <Check size={14} /> {k}
                  </span>
                ))
              )}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 p-5 bg-white/70">
            <div className="text-sm font-medium text-slate-900 mb-2">Missing</div>
            <div className="flex flex-wrap gap-2">
              {analysis.missing.length === 0 ? (
                <span className="text-sm text-slate-500">Nothing missing yet.</span>
              ) : (
                analysis.missing.map((k) => (
                  <span key={k} className="inline-flex items-center gap-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 text-xs">
                    <X size={14} /> {k}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 p-5 bg-white/70">
          <div className="text-sm font-medium text-slate-900 mb-2">Suggestions</div>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

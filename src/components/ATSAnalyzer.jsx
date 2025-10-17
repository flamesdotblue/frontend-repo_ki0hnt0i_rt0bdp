import { useMemo, useState } from "react";
import { FileText, Check, X, Download, Upload } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth/mammoth.browser";
import Tesseract from "tesseract.js";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";

// Configure PDF.js worker (required in browser bundlers)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const STOP_WORDS = new Set([
  "the","a","an","and","or","but","if","then","else","when","at","by","from","for","in","into","of","on","onto","to","with","as","is","are","was","were","be","been","being","it","its","this","that","these","those","your","you","we","our"
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#. ]/g, " ")
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
  return { weighted, matched, missing, coverage, density, jdTop };
}

function highlightText(text, keywords) {
  if (!text) return "";
  const parts = text.split(/(\b)/);
  return parts
    .map((part) => {
      const token = part.toLowerCase();
      if (keywords.has(token)) {
        return `<mark class="bg-emerald-500/20 text-emerald-300 rounded px-0.5">${part}</mark>`;
      }
      return part;
    })
    .join("");
}

async function extractTextFromPDF(arrayBuffer) {
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((it) => (it.str ? it.str : ""));
    text += strings.join(" ") + "\n";
  }
  return text;
}

async function extractTextFromDocx(arrayBuffer) {
  const { value } = await mammoth.extractRawText({ arrayBuffer });
  return value || "";
}

async function extractTextFromImage(file) {
  const result = await Tesseract.recognize(file, "eng");
  return result?.data?.text || "";
}

async function readFileToText(file) {
  const name = file.name.toLowerCase();
  const type = file.type;
  if (type === "text/plain" || name.endsWith(".txt")) {
    return await file.text();
  }
  if (type === "application/pdf" || name.endsWith(".pdf")) {
    const buf = await file.arrayBuffer();
    return await extractTextFromPDF(buf);
  }
  if (
    type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".docx")
  ) {
    const buf = await file.arrayBuffer();
    return await extractTextFromDocx(buf);
  }
  if (type === "image/jpeg" || type === "image/png" || name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png")) {
    return await extractTextFromImage(file);
  }
  // Legacy .doc or unknown types
  return await file.text().catch(() => "");
}

export default function ATSAnalyzer() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [resumeName, setResumeName] = useState("resume-optimized");
  const [downloadFormat, setDownloadFormat] = useState("pdf"); // 'txt' | 'pdf' | 'docx'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analysis = useMemo(() => score(resume, jd), [resume, jd]);

  const suggestions = useMemo(() => {
    const tips = [];
    if (analysis.missing.length) {
      tips.push(`Consider incorporating: ${analysis.missing.slice(0, 12).join(", ")}.`);
    }
    if (analysis.coverage < 0.6)
      tips.push("Expand your skills and summary to cover more JD keywords.");
    if (analysis.density < 0.08)
      tips.push("Weave relevant terms into bullet points with quantifiable impact.");
    if (!tips.length) tips.push("Great alignment. Fine-tune phrasing and quantify achievements.");
    return tips;
  }, [analysis]);

  const handleUpload = async (file, target) => {
    if (!file) return;
    setError("");
    setLoading(true);
    try {
      const text = await readFileToText(file);
      if (!text || text.trim().length === 0) {
        setError("Could not extract text from the selected file. Try another file or paste your text.");
      }
      if (target === "resume") {
        setResume(text);
        const base = file.name.replace(/\.[^/.]+$/, "");
        setResumeName(base + "-optimized");
      } else {
        setJd(text);
      }
    } catch (e) {
      setError("Upload failed. Please try a different file format or paste your text.");
    } finally {
      setLoading(false);
    }
  };

  const buildSummaryText = () => `ATS Analysis\n\nScore: ${analysis.weighted}\nCoverage: ${(analysis.coverage * 100).toFixed(1)}%\nDensity: ${(analysis.density * 100).toFixed(1)}%\n\nMatched: ${analysis.matched.join(", ")}\nMissing: ${analysis.missing.join(", ")}\n\nSuggestions:\n- ${suggestions.join("\n- ")}`;

  const buildOptimizedText = () => {
    const booster = analysis.missing.length
      ? `\n\nSkills & Keywords: ${analysis.matched.concat(analysis.missing.slice(0, 15)).join(", ")}`
      : "";
    return resume.trim() + booster + "\n";
  };

  const downloadAsTxt = (content, filename) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".txt") ? filename : `${filename}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadAsPDF = (content, filename, title) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 48;
    const maxWidth = 595.28 - margin * 2; // A4 width in pt
    doc.setFont("Helvetica", "normal");
    if (title) {
      doc.setFontSize(16);
      doc.text(title, margin, margin);
    }
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(content, maxWidth);
    const startY = title ? margin + 24 : margin;
    doc.text(lines, margin, startY);
    doc.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
  };

  const downloadAsDocx = async (content, filename, title) => {
    const paragraphs = [];
    if (title) paragraphs.push(new Paragraph({ children: [new TextRun({ text: title, bold: true, size: 28 })] }));
    content.split("\n").forEach((line) => paragraphs.push(new Paragraph(line)));
    const doc = new Document({ sections: [{ properties: {}, children: paragraphs }] });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".docx") ? filename : `${filename}.docx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadSummary = async () => {
    const content = buildSummaryText();
    const base = "ats_analysis";
    if (downloadFormat === "txt") return downloadAsTxt(content, `${base}.txt`);
    if (downloadFormat === "pdf") return downloadAsPDF(content, `${base}.pdf`, "ATS Analysis");
    if (downloadFormat === "docx") return await downloadAsDocx(content, `${base}.docx`, "ATS Analysis");
  };

  const downloadOptimized = async () => {
    const content = buildOptimizedText();
    const base = resumeName || "resume-optimized";
    if (downloadFormat === "txt") return downloadAsTxt(content, `${base}.txt`);
    if (downloadFormat === "pdf") return downloadAsPDF(content, `${base}.pdf`, "Optimized Resume");
    if (downloadFormat === "docx") return await downloadAsDocx(content, `${base}.docx`, "Optimized Resume");
  };

  const matchedSet = useMemo(() => new Set(analysis.matched), [analysis.matched]);

  return (
    <section id="analyzer" className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">
                <FileText size={18} /> Resume
              </h2>
              <label className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white cursor-pointer">
                <Upload size={16} /> Upload (.txt, .pdf, .docx, .jpg, .png)
                <input
                  type="file"
                  accept=".txt,application/pdf,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx,image/jpeg,image/png,.jpg,.jpeg,.png"
                  onChange={(e) => handleUpload(e.target.files?.[0], "resume")}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your resume text here"
              className="mt-3 w-full h-56 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-400/30"
            />
            <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-slate-400 mb-1">Highlighted Resume (matches)</div>
              <div
                className="prose prose-invert max-w-none text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightText(resume, matchedSet) }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-white">Job Description</h2>
              <label className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white cursor-pointer">
                <Upload size={16} /> Upload (.txt, .pdf, .docx, .jpg, .png)
                <input
                  type="file"
                  accept=".txt,application/pdf,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx,image/jpeg,image/png,.jpg,.jpeg,.png"
                  onChange={(e) => handleUpload(e.target.files?.[0], "jd")}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the job description here"
              className="mt-3 w-full h-56 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-400/30"
            />
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/10 p-5 bg-white/5">
            <div className="text-sm text-slate-300">Overall Score</div>
            <div className="mt-2 text-4xl font-semibold tracking-tight text-white">
              {analysis.weighted}
              <span className="text-lg align-top text-slate-400">/100</span>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-indigo-400 to-amber-300 transition-[width] duration-500"
                style={{ width: `${Math.min(100, analysis.weighted)}%` }}
              />
            </div>
            <div className="mt-4 text-sm text-slate-300">
              Coverage {(analysis.coverage * 100).toFixed(0)}% • Density {(analysis.density * 100).toFixed(0)}%
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 text-sm text-slate-300">
                <span>Download as</span>
                <select
                  value={downloadFormat}
                  onChange={(e) => setDownloadFormat(e.target.value)}
                  className="rounded-md bg-white/10 border border-white/10 px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
                >
                  <option value="pdf">PDF</option>
                  <option value="docx">Word (.docx)</option>
                  <option value="txt">Plain text</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={downloadSummary}
                  className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3.5 py-2 text-sm font-medium text-white shadow hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
                  disabled={loading}
                >
                  <Download size={16} /> Download Summary
                </button>
                <button
                  onClick={downloadOptimized}
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-500 px-3.5 py-2 text-sm font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
                  disabled={loading}
                >
                  <Download size={16} /> Download Optimized
                </button>
              </div>
            </div>
            {loading && <div className="mt-3 text-sm text-slate-400">Processing file…</div>}
            {error && <div className="mt-3 text-sm text-rose-300">{error}</div>}
          </div>
          <div className="rounded-xl border border-white/10 p-5 bg-white/5">
            <div className="text-sm font-medium text-white mb-2">Matched</div>
            <div className="flex flex-wrap gap-2">
              {analysis.matched.length === 0 ? (
                <span className="text-sm text-slate-400">No matches yet.</span>
              ) : (
                analysis.matched.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/20 px-2.5 py-1 text-xs"
                  >
                    <Check size={14} /> {k}
                  </span>
                ))
              )}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 p-5 bg-white/5">
            <div className="text-sm font-medium text-white mb-2">Missing</div>
            <div className="flex flex-wrap gap-2">
              {analysis.missing.length === 0 ? (
                <span className="text-sm text-slate-400">Nothing missing yet.</span>
              ) : (
                analysis.missing.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-400/20 px-2.5 py-1 text-xs"
                  >
                    <X size={14} /> {k}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/10 p-5 bg-white/5">
          <div className="text-sm font-medium text-white mb-2">Suggestions</div>
          <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

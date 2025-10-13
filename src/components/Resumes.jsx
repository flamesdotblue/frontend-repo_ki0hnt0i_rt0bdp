import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowRight } from 'lucide-react';

function ResumeCard({ title, summary, url, lastUpdated, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-900/40 p-6"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-1 bg-[conic-gradient(at_30%_30%,rgba(251,191,36,0.12),rgba(56,189,248,0.1),transparent_60%)]" />
      </div>

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <FileText className="h-6 w-6 text-white/90" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/70">{summary}</p>
          {lastUpdated && (
            <p className="mt-2 text-xs text-white/50">Updated {lastUpdated}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-white to-amber-300 px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_-10px_rgba(251,191,36,0.55)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              View
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={url}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Resumes() {
  const resumes = [
    {
      title: 'Software Engineer Resume',
      summary:
        'Focused on front-end architecture, interaction design, and performance. React, TypeScript, accessibility.',
      url: '#',
      lastUpdated: 'Jan 2025',
    },
    {
      title: 'Product-Focused Resume',
      summary:
        'Bridges UX and engineering. Highlights discovery, roadmapping, and iterative delivery with measurable outcomes.',
      url: '#',
      lastUpdated: 'Jan 2025',
    },
    {
      title: 'General Resume',
      summary:
        'Concise, broad experience overview suitable for most roles. Team leadership and cross-functional collaboration.',
      url: '#',
      lastUpdated: 'Jan 2025',
    },
  ];

  return (
    <section id="resumes" className="relative z-10 mx-auto max-w-7xl scroll-mt-20 px-6 py-24">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Resumes
        </h2>
        <p className="mt-3 text-white/70">
          Choose the version that best fits the role. Each link opens in a new tab and can be downloaded.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resumes.map((r, i) => (
          <ResumeCard key={r.title} delay={i * 0.08} {...r} />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-white/60">
        Need something tailored? Reach out and I can send a customized version.
      </p>
    </section>
  );
}

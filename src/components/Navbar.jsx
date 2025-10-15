import React from 'react';

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/40 p-3 backdrop-blur-xl">
          <a href="#home" className="group inline-flex items-center gap-2">
            <div className="relative h-7 w-7 rounded-xl bg-gradient-to-br from-white to-amber-300">
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/30" />
            </div>
            <span className="font-semibold tracking-tight text-white group-hover:text-amber-200">
              ATS Resume Checker
            </span>
          </a>

          <div className="hidden items-center gap-1 sm:flex">
            <a href="#analyze" className="rounded-full px-4 py-2 text-sm text-white/80 transition hover:text-white">
              Analyze
            </a>
            <a href="#contact" className="rounded-full px-4 py-2 text-sm text-white/80 transition hover:text-white">
              Contact
            </a>
            <a
              href="#analyze"
              className="ml-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-white to-amber-300 px-4 py-2 text-sm font-medium text-slate-900 shadow-[0_8px_30px_-12px_rgba(251,191,36,0.6)] transition hover:brightness-95"
            >
              Get Started
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

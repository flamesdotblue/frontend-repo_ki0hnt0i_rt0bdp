import React from 'react';
import { Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/10 bg-slate-950/70">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h3 className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-lg font-semibold text-transparent">
              Let’s build something unforgettable
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Available for freelance, full-time, or collaboration inquiries.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:you@example.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

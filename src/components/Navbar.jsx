import React from 'react';
import { Rocket } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-white">
          <Rocket className="h-5 w-5 text-teal-400" />
          <span className="font-semibold tracking-tight">ATS Resume Checker</span>
        </a>
        <div className="flex items-center gap-6 text-sm">
          <a href="#analyze" className="text-white/80 hover:text-white transition-colors">Analyze</a>
          <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
          <a href="#analyze" className="inline-flex items-center rounded-md bg-teal-500 hover:bg-teal-400 text-black font-medium px-3 py-1.5 transition-colors">Start</a>
        </div>
      </nav>
    </header>
  );
}

import React from 'react';

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/50 p-3 backdrop-blur-xl">
          <a href="#home" className="group inline-flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-cyan-400 to-fuchsia-500" />
            <span className="font-semibold tracking-tight text-white group-hover:text-cyan-200">
              My 3D Portfolio
            </span>
          </a>

          <div className="hidden items-center gap-1 sm:flex">
            <a href="#projects" className="rounded-full px-4 py-2 text-sm text-white/80 hover:text-white">
              Projects
            </a>
            <a href="#contact" className="rounded-full px-4 py-2 text-sm text-white/80 hover:text-white">
              Contact
            </a>
            <a
              href="#home"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
            >
              Home
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

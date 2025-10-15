import { Rocket } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-black/5">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-sky-500 to-teal-400 text-white shadow-sm">
            <Rocket size={18} />
          </div>
          <span className="font-semibold tracking-tight">ATS Aether</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm text-slate-700">
          <a href="#analyzer" className="hover:text-slate-900 transition-colors">Analyzer</a>
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
          <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <a href="#analyzer" className="inline-flex items-center rounded-md bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20">
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
}

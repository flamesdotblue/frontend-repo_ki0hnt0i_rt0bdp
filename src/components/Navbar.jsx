import { Rocket } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur supports-[backdrop-filter]:bg-slate-950/50">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#preview" className="flex items-center gap-2">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-sky-500 to-amber-400 text-white shadow-sm">
            <Rocket size={18} />
          </div>
          <span className="font-semibold tracking-tight text-white">ATS Aether</span>
        </a>
        <div className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
          <a href="#analyzer" className="hover:text-white transition-colors">Analyzer</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#analyzer"
            className="inline-flex items-center rounded-md bg-white/10 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
          >
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 py-10 bg-transparent">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} ATS Aether. All rights reserved.</p>
        <p>
          Built for candidates. <a href="#" className="underline decoration-white/20 hover:decoration-white/60 text-slate-300">Privacy</a>
        </p>
      </div>
    </footer>
  );
}

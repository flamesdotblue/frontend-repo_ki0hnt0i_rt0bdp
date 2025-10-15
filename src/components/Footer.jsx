export default function Footer() {
  return (
    <footer id="contact" className="border-t border-black/5 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} ATS Aether. All rights reserved.</p>
        <p>
          Built with care for candidates. <a href="#" className="underline decoration-slate-300 hover:decoration-slate-600">Privacy</a>
        </p>
      </div>
    </footer>
  );
}

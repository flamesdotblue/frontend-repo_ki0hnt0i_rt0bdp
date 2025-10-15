import React from 'react';

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-semibold">Get in touch</h4>
          <p className="text-white/70 text-sm mt-1">Questions or feedback? We’d love to hear from you.</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center rounded-md bg-white/10 hover:bg-white/20 text-white px-4 py-2 transition-colors"
          >
            Email Us
          </a>
          <a
            href="#analyze"
            className="inline-flex items-center rounded-md bg-teal-500 hover:bg-teal-400 text-black font-medium px-4 py-2 transition-colors"
          >
            Start Analysis
          </a>
        </div>
      </div>
      <div className="text-center text-white/50 text-xs pb-6">© {new Date().getFullYear()} ATS Resume Checker. All rights reserved.</div>
    </footer>
  );
}

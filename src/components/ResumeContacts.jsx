import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ResumeContacts() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    resumeUrl: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('profile');
      if (stored) setProfile(JSON.parse(stored));
    } catch (_) {}
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      localStorage.setItem('profile', JSON.stringify(profile));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (_) {}
  }

  return (
    <section id="resume" className="relative z-10 mx-auto max-w-7xl scroll-mt-20 px-6 py-24">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="bg-gradient-to-b from-white via-white to-orange-200/80 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Update Resume & Contacts
        </h2>
        <p className="mt-3 text-white/70">
          Keep your profile fresh. Add a resume link and your key contact details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Resume Card */}
        <div className="relative rounded-2xl border border-white/10 bg-slate-900/50 p-6">
          <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-80 [background:radial-gradient(70%_70%_at_30%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
          <div className="relative">
            <h3 className="text-lg font-semibold text-white">Resume</h3>
            <p className="mt-1 text-sm text-white/70">Paste a public link to your latest resume.</p>
            <label htmlFor="resumeUrl" className="sr-only">Resume URL</label>
            <input
              id="resumeUrl"
              name="resumeUrl"
              type="url"
              value={profile.resumeUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/20 focus:bg-white/10 focus:outline-none"
            />
            <label htmlFor="website" className="sr-only">Portfolio Website</label>
            <input
              id="website"
              name="website"
              type="url"
              value={profile.website}
              onChange={handleChange}
              placeholder="Portfolio website (optional)"
              className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/20 focus:bg-white/10 focus:outline-none"
            />
          </div>
        </div>

        {/* Contacts Card */}
        <div className="relative rounded-2xl border border-white/10 bg-slate-900/50 p-6">
          <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-80 [background:radial-gradient(70%_70%_at_70%_0%,rgba(255,153,51,0.08),transparent_60%)]" />
          <div className="relative">
            <h3 className="text-lg font-semibold text-white">Contacts</h3>
            <p className="mt-1 text-sm text-white/70">Share how people can reach you.</p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-white/10"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-white/10"
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Phone (optional)"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-white/10"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="location" className="sr-only">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="Location (optional)"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-white/10"
                  autoComplete="address-level2"
                />
              </div>
              <div>
                <label htmlFor="linkedin" className="sr-only">LinkedIn</label>
                <input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  value={profile.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn URL"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-white/10"
                />
              </div>
              <div>
                <label htmlFor="github" className="sr-only">GitHub</label>
                <input
                  id="github"
                  name="github"
                  type="url"
                  value={profile.github}
                  onChange={handleChange}
                  placeholder="GitHub URL"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-white/10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-white to-orange-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_-10px_rgba(251,146,60,0.55)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-orange-300"
            aria-live="polite"
          >
            Save details
          </button>
          {saved && (
            <span className="ml-3 inline-flex items-center gap-1 text-sm text-white/80" role="status" aria-live="polite">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Saved
            </span>
          )}
        </div>
      </form>

      {/* Preview */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
          <h4 className="text-sm font-semibold text-white/90">Profile Preview</h4>
          <dl className="mt-3 space-y-1 text-sm text-white/70">
            {profile.name && (
              <div className="flex justify-between gap-3">
                <dt className="text-white/50">Name</dt>
                <dd className="truncate">{profile.name}</dd>
              </div>
            )}
            {profile.email && (
              <div className="flex justify-between gap-3">
                <dt className="text-white/50">Email</dt>
                <dd className="truncate">{profile.email}</dd>
              </div>
            )}
            {profile.phone && (
              <div className="flex justify-between gap-3">
                <dt className="text-white/50">Phone</dt>
                <dd className="truncate">{profile.phone}</dd>
              </div>
            )}
            {profile.location && (
              <div className="flex justify-between gap-3">
                <dt className="text-white/50">Location</dt>
                <dd className="truncate">{profile.location}</dd>
              </div>
            )}
            {profile.resumeUrl && (
              <div className="flex justify-between gap-3">
                <dt className="text-white/50">Resume</dt>
                <dd className="truncate"><a className="text-orange-300 hover:text-orange-200" href={profile.resumeUrl} target="_blank" rel="noreferrer">Open</a></dd>
              </div>
            )}
            {profile.website && (
              <div className="flex justify-between gap-3">
                <dt className="text-white/50">Website</dt>
                <dd className="truncate"><a className="text-orange-300 hover:text-orange-200" href={profile.website} target="_blank" rel="noreferrer">Open</a></dd>
              </div>
            )}
          </dl>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
          <h4 className="text-sm font-semibold text-white/90">Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {profile.linkedin && (
              <li>
                <a className="text-white/80 underline-offset-2 hover:text-white hover:underline" href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
            )}
            {profile.github && (
              <li>
                <a className="text-white/80 underline-offset-2 hover:text-white hover:underline" href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            )}
            {profile.email && (
              <li>
                <a className="text-white/80 underline-offset-2 hover:text-white hover:underline" href={`mailto:${profile.email}`}>
                  Email
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

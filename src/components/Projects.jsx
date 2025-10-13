import React from 'react';

function Tag({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/80">
      {children}
    </span>
  );
}

function ProjectCard({ title, description, tags }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-900/40 p-5 shadow-2xl transition-transform duration-300 hover:-translate-y-1">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(56,189,248,0.15),rgba(168,85,247,0.05)_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-4 h-36 w-full rounded-xl bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/20 to-amber-500/20 ring-1 ring-inset ring-white/10" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <a
            href="#"
            className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            aria-label={`View details for ${title}`}
          >
            View details →
          </a>
          <span className="text-xs text-white/50">Play Mode</span>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const projects = [
    {
      title: 'Neon Runner',
      description:
        'A fast-paced web experience with smooth animations and responsive design, themed like a retro arcade.',
      tags: ['React', 'Framer Motion', 'UI/UX'],
    },
    {
      title: 'Voxel Portfolio',
      description:
        'An immersive portfolio concept blending 3D aesthetics with clean information hierarchy.',
      tags: ['3D', 'Spline', 'Interaction'],
    },
    {
      title: 'Quantum Dash',
      description:
        'High-performance build with a focus on accessibility, dark mode, and delightful micro-interactions.',
      tags: ['Performance', 'A11y', 'Dark Mode'],
    },
  ];

  return (
    <section id="projects" className="relative z-10 mx-auto max-w-7xl scroll-mt-20 px-6 py-20">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Featured Projects
        </h2>
        <p className="mt-3 text-white/70">
          Game-inspired interfaces, modern code, and immersive visuals. Here are a few highlights.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}

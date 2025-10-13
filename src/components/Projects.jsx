import React from 'react';
import { motion } from 'framer-motion';

function Tag({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/80">
      {children}
    </span>
  );
}

function ProjectCard({ title, description, tags, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-900/40 p-5 shadow-2xl"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-1 bg-[conic-gradient(at_30%_30%,rgba(56,189,248,0.15),rgba(168,85,247,0.12),transparent_60%)]" />
      </div>

      <div className="relative">
        <div className="mb-4 h-36 w-full overflow-hidden rounded-xl ring-1 ring-inset ring-white/10">
          <div className="h-full w-full bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.25),transparent_60%)]" />
        </div>
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
            className="text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
            aria-label={`View details for ${title}`}
          >
            View details →
          </a>
          <span className="text-xs text-white/50">Live demo</span>
        </div>
      </div>
    </motion.div>
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
    <section id="projects" className="relative z-10 mx-auto max-w-7xl scroll-mt-20 px-6 py-24">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Featured Projects
        </h2>
        <p className="mt-3 text-white/70">
          Game-inspired interfaces, modern code, and immersive visuals. Here are a few highlights.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} delay={i * 0.08} {...p} />)
        )}
      </div>
    </section>
  );
}

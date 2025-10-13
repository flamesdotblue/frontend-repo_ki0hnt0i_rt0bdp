import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero3D() {
  return (
    <section id="home" className="relative h-[90vh] md:h-screen w-full">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlays that don't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-fuchsia-500/10 to-cyan-500/10 mix-blend-screen" />

      {/* Content Overlay */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
            <Rocket className="h-4 w-4 text-cyan-300" />
            <span className="text-xs font-medium tracking-wide text-cyan-100">
              Interactive 3D Portfolio
            </span>
          </div>

          <h1 className="mx-auto max-w-4xl bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl md:text-6xl">
            Level up your first impression
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Playful, modern, and tech-forward. Explore my work like a game—drag, orbit, and dive into the projects that shape my craft.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Contact Me
            </a>
          </div>

          <p className="mt-6 text-xs text-white/60">Tip: drag to orbit, scroll to zoom</p>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, ArrowRight, Star } from 'lucide-react';

export default function Hero3D() {
  return (
    <section id="home" className="relative h-[92vh] md:h-screen w-full">
      {/* 3D Scene as full-bleed cover */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Decorative gradient veils - non-blocking */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,rgba(56,189,248,0.25),transparent_60%)] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent" />

      {/* Content overlay (keep interactive elements pointer-events-auto) */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6">
        <div className="pointer-events-none w-full text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
            <Star className="h-4 w-4 text-amber-300" />
            <span className="text-xs font-medium tracking-wide text-white/90">
              Playful 3D • Modern • Vibrant
            </span>
          </div>

          <h1 className="mx-auto max-w-5xl bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-4xl font-extrabold leading-[1.05] text-transparent sm:text-5xl md:text-6xl">
            Make your portfolio feel like a game
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
            A colorful 3D assembly line of apps and interfaces sets the stage. Drag, orbit, and explore while I guide you through the work.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_-10px_rgba(236,72,153,0.6)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              <Rocket className="h-4 w-4" />
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Contact Me
            </a>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
              Drag to orbit • Scroll to zoom
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

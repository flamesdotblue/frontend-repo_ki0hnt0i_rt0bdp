import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, ArrowRight, Star } from 'lucide-react';

export default function Hero3D() {
  return (
    <section id="home" className="relative h-[92vh] md:h-screen w-full">
      {/* Interactive background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Non-blocking overlays for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,rgba(255,255,255,0.07),transparent_60%)] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6">
        <div className="w-full text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
            <Star className="h-4 w-4 text-amber-300" />
            <span className="text-xs font-medium tracking-wide text-white/90">
              Tech • Interactive • Optimistic
            </span>
          </div>

          <h1 className="mx-auto max-w-5xl bg-gradient-to-b from-white via-white to-amber-200/90 bg-clip-text text-4xl font-extrabold leading-[1.05] text-transparent sm:text-5xl md:text-6xl">
            Build a playful, modern portfolio that feels alive
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
            Crisp dark canvas, joyful accents, and an interactive hero. Start adding your work below.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-white to-amber-300 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_-10px_rgba(251,191,36,0.55)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              <Rocket className="h-4 w-4" />
              Add your project
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

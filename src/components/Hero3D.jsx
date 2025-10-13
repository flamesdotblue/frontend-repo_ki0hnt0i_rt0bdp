import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, ArrowRight, Star } from 'lucide-react';

export default function Hero3D() {
  return (
    <section id="home" className="relative h-[92vh] md:h-screen w-full">
      {/* Dark background cover (interactive) */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Non-blocking overlays for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,rgba(255,255,255,0.06),transparent_60%)] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6">
        <div className="w-full text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
            <Star className="h-4 w-4 text-orange-300" />
            <span className="text-xs font-medium tracking-wide text-white/90">
              Dark • Modern • Interactive
            </span>
          </div>

          <h1 className="mx-auto max-w-5xl bg-gradient-to-b from-white via-white to-orange-200/90 bg-clip-text text-4xl font-extrabold leading-[1.05] text-transparent sm:text-5xl md:text-6xl">
            A focused workspace for building standout products
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
            Clean contrast with a subtle white-to-orange glow. Explore and make it yours.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#resume"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-white to-orange-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_-10px_rgba(251,146,60,0.55)] transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <Rocket className="h-4 w-4" />
              Update Resume & Contacts
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

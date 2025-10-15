import React from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';

export default function Hero3D() {
  return (
    <section className="relative min-h-[90vh] w-full bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2JYkKQ6-pJ2wFKLQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability (does not block interactions) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-40 pb-28">
        <div className="max-w-2xl">
          <p className="text-teal-300/90 text-sm uppercase tracking-wider">Resume Checker • ATS Optimizer</p>
          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
            Land more interviews with an ATS-friendly resume
          </h1>
          <p className="mt-4 text-white/80 max-w-xl">
            Paste your resume and a job description to instantly see keyword coverage, relevance, and a personalized score.
            Get actionable suggestions and a tailored draft in seconds.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a
              href="#analyze"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-black font-semibold px-5 py-3 transition-colors"
            >
              Analyze My Resume
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="text-white/80 hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
}

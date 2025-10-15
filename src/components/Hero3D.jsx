import { memo, useMemo } from "react";
import Spline from "@splinetool/react-spline";
import { ArrowRight } from "lucide-react";

const Hero3D = memo(function Hero3D() {
  // Keep the scene URL stable so the 3D scene remains mounted persistently
  const sceneUrl = useMemo(
    () => "https://prod.spline.design/9kqY3R3xQkHn8pPq/scene.splinecode",
    []
  );

  return (
    <section aria-label="Hero 3D" className="relative w-full min-h-[80vh] sm:min-h-[90vh] pt-16">
      <div className="absolute inset-0">
        <Spline scene={sceneUrl} style={{ width: "100%", height: "100%" }} />
      </div>

      {/* Soft gradient and vignette that never blocks interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-white/80" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex min-h-[80vh] sm:min-h-[90vh] items-center">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            Land more interviews with an ATS-optimized resume
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Paste your resume and a job description to see exactly what matches, what's missing, and how to improve — all in seconds.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="#analyzer" className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-white text-sm font-medium shadow hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20">
              Try the Analyzer
              <ArrowRight size={16} />
            </a>
            <a href="#preview" className="text-sm font-medium text-slate-700 hover:text-slate-900">
              View Live Preview
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero3D;

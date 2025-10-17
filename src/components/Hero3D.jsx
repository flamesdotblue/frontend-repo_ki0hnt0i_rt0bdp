import { memo, useMemo } from "react";
import Spline from "@splinetool/react-spline";
import { ArrowRight } from "lucide-react";

const Hero3D = memo(function Hero3D() {
  const sceneUrl = useMemo(
    () => "https://prod.spline.design/vc19ejtcC5VJjy5v/scene.splinecode",
    []
  );

  return (
    <section aria-label="Hero 3D" className="relative w-full min-h-[78vh] sm:min-h-[88vh] pt-16">
      <div className="absolute inset-0">
        <Spline scene={sceneUrl} style={{ width: "100%", height: "100%" }} />
      </div>

      {/* Dark gradient and vignette (non-interactive) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex min-h-[78vh] sm:min-h-[88vh] items-center">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
            Check your resume’s ATS score and boost it instantly
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Upload or paste your resume and a job description. We highlight the must-have keywords, show what’s missing, and help you download an improved version.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#analyzer"
              className="inline-flex items-center gap-2 rounded-md bg-indigo-500 px-4 py-2.5 text-white text-sm font-medium shadow transition-colors hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
            >
              Try the Analyzer
              <ArrowRight size={16} />
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-white">
              How it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero3D;

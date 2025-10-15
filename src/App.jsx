import Navbar from "./components/Navbar";
import Hero3D from "./components/Hero3D";
import ATSAnalyzer from "./components/ATSAnalyzer";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* Persistent container that always renders the live preview section */}
      <main className="pt-16">
        {/* Live preview area remains mounted and visible across refreshes */}
        <section id="preview" className="relative w-full">
          <Hero3D />
        </section>

        <ATSAnalyzer />
      </main>

      <Footer />
    </div>
  );
}

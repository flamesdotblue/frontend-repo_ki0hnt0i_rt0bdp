import Navbar from "./components/Navbar";
import Hero3D from "./components/Hero3D";
import ATSAnalyzer from "./components/ATSAnalyzer";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="pt-16">
        <section id="preview" className="relative w-full">
          <Hero3D />
        </section>

        <ATSAnalyzer />
      </main>

      <Footer />
    </div>
  );
}

import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero3D from './components/Hero3D.jsx';
import Projects from './components/Projects.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(56,189,248,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_10%_90%,rgba(168,85,247,0.15),transparent_60%)]" />
      </div>

      <Navbar />
      <main>
        <Hero3D />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero3D from './components/Hero3D.jsx';
import ATSAnalyzer from './components/ATSAnalyzer.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-16">{/* offset for fixed header */}
        <Hero3D />
        <ATSAnalyzer />
      </main>
      <Footer />
    </div>
  );
}

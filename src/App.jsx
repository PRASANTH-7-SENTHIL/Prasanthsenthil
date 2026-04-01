import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Objective from './components/Objective';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-primary font-poppins text-white selection:bg-neon selection:text-white">
      {/* Background elements */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neon blur-[150px]"></div>
        <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] rounded-full bg-purple-900 blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          <Hero />
          <Objective />
          <Skills />
          <Projects />
          <Achievements />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RolePage from './components/RolePage';
import LandingPage from './components/LandingPage';
import PortfolioPage from './components/PortfolioPage';

const HomePage = () => {
  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar">
      <div className="w-full h-screen snap-start snap-always relative overflow-hidden">
        <LandingPage isEmbedded={true} />
      </div>
      <div id="portfolio-section" className="w-full min-h-screen snap-start snap-always relative">
        <PortfolioPage />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-primary font-poppins text-white selection:bg-neon selection:text-white">
        {/* Background elements */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neon blur-[150px]"></div>
          <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] rounded-full bg-purple-900 blur-[150px]"></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/symposium" element={<RolePage title="Department Symposium President" roleDesc="Led the organization and execution of the annual department-level tech symposium." images={['/symposium/img-1.jpeg', '/symposium/img-2.jpeg', '/symposium/img-3.jpeg', '/symposium/img-4.jpeg', '/symposium/img-5.jpeg', '/symposium/img-6.jpeg', '/symposium/img-7.jpeg', '/symposium/img-8.jpeg', '/symposium/img-9.jpeg', '/symposium/img-10.jpeg', '/symposium/img-11.jpeg', '/symposium/img-12.jpeg', '/symposium/img-13.jpeg', '/symposium/img-14.jpeg', '/symposium/img-15.jpeg', '/symposium/img-16.jpeg', '/symposium/img-17.jpeg', '/symposium/img-18.jpeg', '/symposium/img-19.jpeg', '/symposium/img-20.jpeg', '/symposium/img-21.jpeg', '/symposium/img-22.jpeg', '/symposium/img-23.jpeg']} />} />
            <Route path="/quiz-department" element={<RolePage title="Department Quiz Coordinator" roleDesc="Coordinated logistics and question sets for the department-level technical quiz." />} />
            <Route path="/quiz-class" element={<RolePage title="Class Quiz Organizer" roleDesc="Organized engaging quiz sessions to foster knowledge sharing and healthy competition." />} />
            <Route path="/cricket" element={<RolePage title="Inter-College Cricket Team Captain" roleDesc="Captained the college cricket team, strategizing matches and leading to victories." />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

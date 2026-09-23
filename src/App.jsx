import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RolePage from './components/RolePage';
import LandingPage from './components/LandingPage';
import PortfolioPage from './components/PortfolioPage';

const HomePage = () => {
  return (
    <div className="w-full min-h-screen relative">
      <LandingPage isEmbedded={true} />
      <div id="portfolio-section" className="w-full relative">
        <PortfolioPage showAnimatedBackground={false} isEmbedded={true} />
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
            <Route path="/symposium" element={<RolePage title="Department Symposium President" roleDesc="Led the organization and execution of the annual department-level tech symposium." images={['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166887/portfolio/symposium/img-1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166918/portfolio/symposium/img-2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166932/portfolio/symposium/img-3.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166933/portfolio/symposium/img-4.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166934/portfolio/symposium/img-5.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166936/portfolio/symposium/img-6.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166937/portfolio/symposium/img-7.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166940/portfolio/symposium/img-8.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166941/portfolio/symposium/img-9.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166890/portfolio/symposium/img-10.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166893/portfolio/symposium/img-11.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166898/portfolio/symposium/img-12.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166900/portfolio/symposium/img-13.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166903/portfolio/symposium/img-14.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166907/portfolio/symposium/img-15.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166909/portfolio/symposium/img-16.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166911/portfolio/symposium/img-17.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166914/portfolio/symposium/img-18.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166917/portfolio/symposium/img-19.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166921/portfolio/symposium/img-20.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166923/portfolio/symposium/img-21.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166927/portfolio/symposium/img-22.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166930/portfolio/symposium/img-23.jpg']} />} />
            <Route path="/quiz-department" element={<RolePage title="Department Quiz Coordinator" roleDesc="Coordinated logistics and question sets for the department-level technical quiz." images={[
              'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153613/portfolio/quiz/quiz_1.jpg',
              'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153614/portfolio/quiz/quiz_2.jpg',
              'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153615/portfolio/quiz/quiz_3.jpg',
              'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153616/portfolio/quiz/quiz_4.jpg',
              'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153617/portfolio/quiz/quiz_5.jpg',
              'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153627/portfolio/quiz/quiz_6.jpg',
              'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153632/portfolio/quiz/quiz_7.jpg'
            ]} />} />
            <Route path="/quiz-class" element={<RolePage title="Class Quiz Organizer" roleDesc="Organized engaging quiz sessions to foster knowledge sharing and healthy competition." />} />
            <Route path="/cricket" element={<RolePage title="Inter-College Cricket Team Captain" roleDesc="Captained the college cricket team, strategizing matches and leading to victories." />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect, useRef } from "react";
import { 
  Menu, X, ChevronDown, Send, ArrowRight, Mail, 
  Moon, Sun 
} from "lucide-react";
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage({ isEmbedded = false }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [animationStage, setAnimationStage] = useState(0); 
  // 0: Loader, 1: PORTFOLIO text, 2: Profile image glides up, 3: Full UI elements slide in

  const [isDark, setIsDark] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const navigate = useNavigate();

  // Preloader count-up effect
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 6) + 3;
      if (current >= 100) {
        current = 100;
        setLoadingProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setAnimationStage(1); // Start Stage 1: PORTFOLIO text
        }, 350);
      } else {
        setLoadingProgress(current);
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  // Sequential Stage triggers
  useEffect(() => {
    if (animationStage === 1) {
      // Stage 2: Profile image glides up from bottom after PORTFOLIO text appears
      const t2 = setTimeout(() => {
        setAnimationStage(2);
      }, 600);
      return () => clearTimeout(t2);
    } else if (animationStage === 2) {
      // Stage 3: Left & Right UI text and elements slide into position
      const t3 = setTimeout(() => {
        setAnimationStage(3);
      }, 1800);
      return () => clearTimeout(t3);
    }
  }, [animationStage]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    let lastScrollY = 0;
    const handleScrollState = () => {
      const parentContainer = document.getElementById("main-scroll-container");
      const currentScrollY = parentContainer ? parentContainer.scrollTop : window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY = currentScrollY;
    };

    const parentContainer = document.getElementById("main-scroll-container");
    const target = parentContainer || window;
    target.addEventListener("scroll", handleScrollState, { passive: true });
    return () => target.removeEventListener("scroll", handleScrollState);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleExploreClick = () => {
    if (isEmbedded) {
      const portfolioSection = document.getElementById("portfolio-section");
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigate("/portfolio");
  };

  const navItems = [
    { label: "Home", href: "#home", active: true },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#technical-skills" },
    { label: "Achievements", href: "#milestones" },
    { label: "Contact", href: "mailto:prasanthsenthilkumar09@gmail.com" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#07090e] text-white font-sans overflow-hidden select-none">
      
      {/* 0% -> 100% PRELOADER OVERLAY */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05070a]"
          >
            <div className="relative flex flex-col items-center">
              {/* Glowing Outer Ring */}
              <div className="relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="44%"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="44%"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray="280"
                    strokeDashoffset={280 - (280 * loadingProgress) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-150 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Percentage Text */}
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-white geist-font">
                  {loadingProgress}%
                </span>
              </div>

              {/* Monospace Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-xs sm:text-sm tracking-[0.3em] uppercase text-cyan-400/80 font-mono"
              >
                Initializing Experience...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND GRID & AMBIENT GLOW */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Grid Lines */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Radial Blue/Cyan Spotlights behind Profile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-gradient-to-br from-blue-600/20 via-cyan-500/15 to-transparent blur-[140px]" />
      </div>

      {/* STAGE 3: TOP NAVIGATION BAR */}
      <motion.header 
        initial={{ y: -60, opacity: 0 }}
        animate={animationStage >= 3 ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-5 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <span className="font-extrabold text-blue-400 text-lg geist-font">PS</span>
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight geist-font text-white">
              Prasanth Senthil Kumar
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  item.active ? "text-cyan-400 font-semibold" : "text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
                {item.active && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Pill */}
            <button
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full bg-white/10 border border-white/15 flex items-center px-1 transition-colors hover:bg-white/20"
              aria-label="Toggle theme"
            >
              <div className={`w-5 h-5 rounded-full bg-cyan-400 shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDark ? "translate-x-7" : "translate-x-0"}`}>
                {isDark ? <Moon size={12} className="text-black" /> : <Sun size={12} className="text-black" />}
              </div>
            </button>

            {/* Hire Me Button */}
            <a
              href="mailto:prasanthsenthilkumar09@gmail.com"
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-sm font-semibold transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              <Send size={14} className="text-cyan-400" />
              <span>Hire Me</span>
            </a>
          </div>
        </nav>
      </motion.header>

      {/* HERO MAIN CONTAINER */}
      <main className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 lg:px-16 pt-24 pb-12 overflow-hidden">
        
        {/* STAGE 1: GIANT BACKGROUND "PORTFOLIO" TEXT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={animationStage >= 1 ? { opacity: 0.16, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden"
        >
          <h1 className="text-[20vw] sm:text-[180px] md:text-[230px] lg:text-[280px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-slate-700 uppercase drop-shadow-[0_0_60px_rgba(255,255,255,0.1)]">
            PORTFOLIO
          </h1>
        </motion.div>

        {/* STAGE 2: CENTER PROFILE CUTOUT IMAGE (GLIDES FROM BOTTOM TO CENTER) */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={animationStage >= 2 ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex items-end justify-center w-full max-w-2xl h-[80vh] sm:h-[85vh]"
        >
          <div className="relative w-full h-full flex items-end justify-center">
            {/* Soft Glow aura behind portrait */}
            <div className="absolute bottom-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-blue-500/25 blur-[90px] pointer-events-none" />
            
            <img
              src="/profile.png"
              alt="Prasanth Senthil Kumar"
              className="h-full max-h-[750px] object-contain object-bottom drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </motion.div>

        {/* STAGE 3: LEFT & RIGHT HERO CONTENT OVERLAYS */}
        <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[75vh]">
          
          {/* LEFT COLUMN CONTENT */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={animationStage >= 3 ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start text-left space-y-4"
          >
            {/* Available for work Badge */}
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-green-500/10 border border-green-500/25 mb-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase geist-font">
                Available for work
              </span>
            </div>

            {/* Hi I'm Tag */}
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-cyan-400"></span>
              <span className="text-cyan-400 font-medium text-sm sm:text-base tracking-wide italic">
                Hi, I'm
              </span>
            </div>

            {/* Main Name */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase geist-font">
              <span className="text-white block">PRASANTH</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 block mt-1">
                SENTHIL KUMAR
              </span>
            </h1>

            {/* Role Subtitle */}
            <div className="pt-2">
              <h2 className="text-base sm:text-xl font-bold text-white geist-font">
                AWS Cloud & DevOps Engineer <span className="text-cyan-400 italic">| Software Engineer (Fresher)</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-1.5 inter-font max-w-xl leading-relaxed">
                Building scalable cloud solutions, smart web applications, and intelligent hardware systems.
              </p>
            </div>

            {/* Phone & Email Display */}
            <div className="flex flex-wrap items-center gap-2 text-gray-300 inter-font text-xs sm:text-sm pt-1">
              <span className="flex items-center gap-1.5 text-gray-200 hover:text-white transition-colors font-medium">
                +91 7200608333
              </span>
              <span className="text-cyan-400 font-bold">•</span>
              <span className="flex items-center gap-1.5 text-gray-200 hover:text-white transition-colors break-all font-medium">
                prasanthsenthilkumar09@gmail.com
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={handleExploreClick}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="mailto:prasanthsenthilkumar09@gmail.com"
                className="px-7 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all hover:scale-105 flex items-center gap-2 backdrop-blur-md"
              >
                <Mail size={16} className="text-cyan-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 pt-4">
              <a
                href="https://github.com/PRASANTH-7-SENTHIL"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/15 transition-all hover:scale-110 shadow-lg"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://linkedin.com/in/prasanth-senthil-kumar-333s151/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#0A66C2] transition-all hover:scale-110 shadow-lg"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-pink-600 transition-all hover:scale-110 shadow-lg"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="mailto:prasanthsenthilkumar09@gmail.com"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-cyan-600 transition-all hover:scale-110 shadow-lg"
              >
                <FiMail size={18} />
              </a>
            </div>

            {/* Footer Caption */}
            <div className="pt-6 hidden sm:block">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-mono flex items-center gap-2">
                <span>ENGINEERING TODAY</span>
                <span className="text-cyan-500">\</span>
                <span>A SMARTER TOMORROW</span>
                <span className="w-12 h-[1px] bg-gray-700"></span>
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN CONTENT */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={animationStage >= 3 ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-end text-right space-y-6 lg:pl-12"
          >
            {/* Top Quote */}
            <div className="flex flex-col items-end">
              <p className="text-lg sm:text-xl font-serif italic text-gray-300 tracking-wide">
                "Building ideas for a smarter tomorrow"
              </p>
              <div className="w-16 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-2" />
            </div>

            {/* Vertical Motto & Handwritten Accent */}
            <div className="flex flex-col items-end space-y-2 pt-4">
              <div className="text-[11px] font-mono tracking-[0.4em] uppercase text-gray-500 leading-relaxed text-right">
                <div>LEARN</div>
                <div>BUILD</div>
                <div>INNOVATE</div>
                <div>REPEAT</div>
              </div>

              <p className="text-sm font-serif italic text-cyan-400/90 pt-2 transform -rotate-3 text-right">
                Better Code Brighter Tomorrow
              </p>
            </div>

            {/* Stats Bar */}
            <div className="pt-8 w-full max-w-md">
              <div className="grid grid-cols-4 gap-2 border-t border-white/10 pt-4 text-center sm:text-right">
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white geist-font block">3+</span>
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider">Projects</span>
                </div>
                <div className="border-l border-white/10 pl-2">
                  <span className="text-xl sm:text-2xl font-black text-white geist-font block">2+</span>
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider">Hackathons</span>
                </div>
                <div className="border-l border-white/10 pl-2">
                  <span className="text-xl sm:text-2xl font-black text-white geist-font block">8+</span>
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider">Symposiums</span>
                </div>
                <div className="border-l border-white/10 pl-2">
                  <span className="text-xl sm:text-2xl font-black text-cyan-400 geist-font block">∞</span>
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider">Learning</span>
                </div>
              </div>
            </div>

            {/* Bouncing Scroll Down Indicator */}
            <div 
              onClick={handleExploreClick}
              className="pt-6 flex flex-col items-center gap-1 cursor-pointer text-gray-400 hover:text-cyan-400 transition-colors animate-bounce"
            >
              <div className="w-5 h-8 rounded-full border-2 border-gray-400 flex items-start justify-center p-1">
                <div className="w-1 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <span className="text-[10px] tracking-widest uppercase font-semibold mt-1">Scroll Down</span>
              <ChevronDown size={14} className="text-cyan-400" />
            </div>

          </motion.div>

        </div>

      </main>
    </div>
  );
}

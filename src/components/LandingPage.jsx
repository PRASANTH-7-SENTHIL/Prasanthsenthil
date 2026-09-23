import React, { useState, useEffect, useRef } from "react";
import { 
  Menu, X, ChevronDown, Send, ArrowRight, Mail, 
  Moon, Sun, Phone, Download 
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    let lastScrollY = window.scrollY;
    const handleScrollState = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScrollState, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollState);
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
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate("/portfolio");
  };

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#technical-skills" },
    { label: "Experience", href: "#internship" },
    { label: "Leadership", href: "#leadership" },
    { label: "Projects", href: "#projects" },
    { label: "Milestones", href: "#milestones" },
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
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Percentage Text */}
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-white geist-font">
                  {loadingProgress}%
                </span>
              </div>

              {/* Monospace Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-xs sm:text-sm tracking-[0.3em] uppercase text-purple-400/80 font-mono"
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
        
        {/* Radial Purple/Indigo Spotlights behind Profile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-gradient-to-br from-purple-600/20 via-indigo-500/15 to-transparent blur-[140px]" />
      </div>

      {/* STAGE 3: TOP NAVIGATION BAR */}
      <motion.header 
        initial={{ y: -60, opacity: 0 }}
        animate={animationStage >= 3 ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-12 py-4 sm:py-5 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <span className="font-extrabold text-purple-400 text-base sm:text-lg geist-font">PS</span>
            </div>
            <span className="font-bold text-sm sm:text-lg tracking-tight geist-font text-white truncate max-w-[170px] sm:max-w-none">
              Prasanth Senthil Kumar
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    const id = item.href.replace('#', '');
                    const el = document.getElementById(id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState(null, '', item.href);
                    }
                  }
                }}
                className="text-sm font-medium transition-colors text-gray-400 hover:text-purple-400 relative py-1"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Theme Toggle Pill */}
            <button
              onClick={toggleTheme}
              className="relative w-12 sm:w-14 h-6 sm:h-7 rounded-full bg-white/10 border border-white/15 flex items-center px-1 transition-colors hover:bg-white/20"
              aria-label="Toggle theme"
            >
              <div className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-purple-500 shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDark ? "translate-x-6 sm:translate-x-7" : "translate-x-0"}`}>
                {isDark ? <Moon size={11} className="text-white" /> : <Sun size={11} className="text-white" />}
              </div>
            </button>

            {/* Hire Me Button (Desktop) */}
            <a
              href="mailto:prasanthsenthilkumar09@gmail.com"
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/40 bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 text-sm font-semibold transition-all hover:scale-105 shadow-[0_0_20px_rgba(139,92,246,0.25)]"
            >
              <Send size={14} className="text-purple-400" />
              <span>Hire Me</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} className="text-purple-400" /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-3 mx-auto max-w-md p-5 rounded-2xl bg-[#0e0720]/95 border border-purple-500/40 backdrop-blur-2xl shadow-[0_12px_45px_rgba(0,0,0,0.85)] z-50"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        const id = item.href.replace('#', '');
                        const el = document.getElementById(id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          window.history.pushState(null, '', item.href);
                        }
                      }
                    }}
                    className="text-sm font-semibold text-gray-200 hover:text-purple-300 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                  <a
                    href="mailto:prasanthsenthilkumar09@gmail.com"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                  >
                    <Send size={13} />
                    <span>Hire Me</span>
                  </a>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.open('/resume.pdf', '_blank');
                    }}
                    className="w-full py-2.5 rounded-xl border border-purple-400/30 bg-white/5 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-white/10"
                  >
                    <Download size={13} className="text-purple-400" />
                    <span>Download Resume</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* HERO MAIN CONTAINER */}
      <main id="home" className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 lg:px-16 pt-24 pb-12 overflow-hidden">
        
        {/* STAGE 1: GIANT BACKGROUND "PORTFOLIO" TEXT — Desktop only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={animationStage >= 1 ? { opacity: 0.16, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none z-0 select-none overflow-hidden"
        >
          <h1 className="text-[280px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-slate-700 uppercase drop-shadow-[0_0_60px_rgba(255,255,255,0.1)]">
            PORTFOLIO
          </h1>
        </motion.div>

        {/* STAGE 2: PROFILE IMAGE — rises from bottom on BOTH mobile & desktop */}
        {/* Desktop: absolute overlay centered */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={animationStage >= 2 ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none items-end justify-center w-full max-w-2xl h-[80vh] sm:h-[85vh]"
        >
          <div className="relative w-full h-full flex items-end justify-center">
            <div className="absolute bottom-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-purple-500/25 blur-[90px] pointer-events-none" />
            <img
              src="https://res.cloudinary.com/oaktnbdl/image/upload/v1790166826/portfolio/root/profile.png"
              alt="Prasanth Senthil Kumar"
              className="h-full max-h-[750px] object-contain object-bottom drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* MOBILE HERO VIEW — same 3-stage animation as desktop       */}
        {/* Stage 1: PORTFOLIO bg text (shared above)                  */}
        {/* Stage 2: Profile image rises from bottom                   */}
        {/* Stage 3: All UI elements fly in from different directions  */}
        {/* ======================================================== */}
        <div className="block lg:hidden relative z-20 w-full max-w-md mx-auto flex flex-col items-center text-center pt-2 pb-6">

          {/* --- STAGE 2 (mobile): Profile image rises from bottom --- */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={animationStage >= 2 ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[240px] sm:max-w-[270px] mx-auto mb-3"
          >
            {/* Ambient glow behind portrait */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-purple-600/50 via-indigo-600/25 to-transparent blur-2xl pointer-events-none rounded-b-3xl" />

            {/* Glowing portrait card */}
            <div className="relative w-full h-60 sm:h-68 rounded-3xl overflow-hidden border border-purple-500/45 shadow-[0_0_40px_rgba(139,92,246,0.4)] bg-gradient-to-b from-[#140825]/95 via-[#0c051a]/95 to-[#060312] flex items-end justify-center">
              <img
                src="https://res.cloudinary.com/oaktnbdl/image/upload/v1790166826/portfolio/root/profile.png"
                alt="Prasanth Senthil Kumar"
                className="h-full w-auto object-contain object-bottom drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)]"
              />
              {/* Status chip on portrait */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-purple-500/25 text-[10px] font-mono">
                <span className="font-semibold text-purple-300">⚡ AWS & DevOps</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
            </div>
          </motion.div>

          {/* --- STAGE 3 (mobile): All UI flies in from different directions --- */}

          {/* Badge — drops from top */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={animationStage >= 3 ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-semibold tracking-wider uppercase geist-font">
              Available for work
            </span>
          </motion.div>

          {/* Hi tagline — slides in from left */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={animationStage >= 3 ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-1"
          >
            <span className="w-6 h-[2px] bg-purple-400" />
            <span className="text-purple-300 font-medium text-xs tracking-wider italic">Hi, I'm</span>
            <span className="w-6 h-[2px] bg-purple-400" />
          </motion.div>

          {/* Name — scales up from center */}
          <motion.h1
            initial={{ scale: 0.75, opacity: 0 }}
            animate={animationStage >= 3 ? { scale: 1, opacity: 1 } : { scale: 0.75, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-2xl sm:text-3xl font-black tracking-tight leading-tight uppercase geist-font mb-1"
          >
            <span className="text-white block">PRASANTH</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 block">
              SENTHIL KUMAR
            </span>
          </motion.h1>

          {/* Role subtitle — slides from right */}
          <motion.h2
            initial={{ x: 50, opacity: 0 }}
            animate={animationStage >= 3 ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-xs sm:text-sm font-bold text-white geist-font mb-1"
          >
            AWS Cloud & DevOps Engineer{" "}
            <span className="text-purple-400 italic block sm:inline">| Software Engineer (Fresher)</span>
          </motion.h2>

          {/* Description — fades up */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={animationStage >= 3 ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="text-gray-400 text-[11px] sm:text-xs inter-font max-w-sm mx-auto leading-relaxed px-2 mb-2"
          >
            Building scalable cloud solutions, smart web applications, and intelligent hardware systems.
          </motion.p>

          {/* Contact chips — slide from left */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={animationStage >= 3 ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-1.5 w-full px-2 mb-2"
          >
            <a
              href="tel:+917200608333"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400/50 hover:text-white transition-all text-xs text-gray-300"
            >
              <Phone size={12} className="text-purple-400 flex-shrink-0" />
              <span>+91 7200608333</span>
            </a>
            <a
              href="mailto:prasanthsenthilkumar09@gmail.com"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400/50 hover:text-white transition-all text-xs text-gray-300 break-all"
            >
              <Mail size={12} className="text-purple-400 flex-shrink-0" />
              <span>prasanthsenthilkumar09@gmail.com</span>
            </a>
          </motion.div>

          {/* CTA Buttons — slide from right */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={animationStage >= 3 ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="flex items-center justify-center gap-2.5 w-full px-4 mb-3"
          >
            <button
              onClick={handleExploreClick}
              className="flex-1 max-w-[145px] py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Work</span>
              <ArrowRight size={13} />
            </button>
            <button
              onClick={() => window.open('/resume.pdf', '_blank')}
              className="flex-1 max-w-[145px] py-2.5 rounded-full border border-purple-400/30 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download size={13} className="text-purple-400" />
              <span>Resume</span>
            </button>
          </motion.div>

          {/* Social Icons — fan in from bottom */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={animationStage >= 3 ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex items-center justify-center gap-2.5 mb-3"
          >
            <a href="https://github.com/PRASANTH-7-SENTHIL" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/15 transition-all shadow-md">
              <FiGithub size={15} />
            </a>
            <a href="https://linkedin.com/in/prasanth-senthil-kumar-333s151/" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#0A66C2] transition-all shadow-md">
              <FiLinkedin size={15} />
            </a>
            <a href="https://www.instagram.com/dhoni_prasanth7_07/" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-pink-600 transition-all shadow-md">
              <FiInstagram size={15} />
            </a>
            <a href="mailto:prasanthsenthilkumar09@gmail.com"
              className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-purple-600 transition-all shadow-md">
              <FiMail size={15} />
            </a>
          </motion.div>


          {/* Scroll hint — fades in last */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={animationStage >= 3 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            onClick={handleExploreClick}
            className="flex flex-col items-center gap-1 cursor-pointer text-gray-400 hover:text-purple-400 transition-colors animate-bounce pt-1"
          >
            <span className="text-[9px] tracking-widest uppercase font-semibold text-purple-300/80">Scroll to Explore</span>
            <ChevronDown size={14} className="text-purple-400" />
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP HERO VIEW (Visible only on lg: and larger screens) */}
        {/* ======================================================== */}
        <div className="hidden lg:grid relative z-20 w-full max-w-7xl mx-auto grid-cols-12 gap-8 items-center min-h-[75vh]">
          
          {/* LEFT COLUMN CONTENT */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={animationStage >= 3 ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-6 flex flex-col items-start text-left space-y-4"
          >
            {/* Available for work Badge */}
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-400 text-xs font-semibold tracking-wider uppercase geist-font">
                Available for work
              </span>
            </div>

            {/* Hi I'm Tag */}
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-purple-400"></span>
              <span className="text-purple-300 font-medium text-sm sm:text-base tracking-wide italic">
                Hi, I'm
              </span>
            </div>

            {/* Main Name */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase geist-font">
              <span className="text-white block">PRASANTH</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 block mt-1">
                SENTHIL KUMAR
              </span>
            </h1>

            {/* Role Subtitle */}
            <div className="pt-2">
              <h2 className="text-base sm:text-xl font-bold text-white geist-font">
                AWS Cloud & DevOps Engineer <span className="text-purple-400 italic">| Software Engineer (Fresher)</span>
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
              <span className="text-purple-400 font-bold">•</span>
              <span className="flex items-center gap-1.5 text-gray-200 hover:text-white transition-colors break-all font-medium">
                prasanthsenthilkumar09@gmail.com
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={handleExploreClick}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="mailto:prasanthsenthilkumar09@gmail.com"
                className="px-7 py-3 rounded-full border border-purple-400/30 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all hover:scale-105 flex items-center gap-2 backdrop-blur-md"
              >
                <Mail size={16} className="text-purple-400" />
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
                href="https://www.instagram.com/dhoni_prasanth7_07/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-pink-600 transition-all hover:scale-110 shadow-lg"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="mailto:prasanthsenthilkumar09@gmail.com"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-purple-600 transition-all hover:scale-110 shadow-lg"
              >
                <FiMail size={18} />
              </a>
            </div>

            {/* Footer Caption */}
            <div className="pt-6 hidden sm:block">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-mono flex items-center gap-2">
                <span>ENGINEERING TODAY</span>
                <span className="text-purple-500">\</span>
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
            className="col-span-6 flex flex-col items-end text-right space-y-6 lg:pl-12"
          >
            {/* Top Quote */}
            <div className="flex flex-col items-end">
              <p className="text-lg sm:text-xl font-serif italic text-gray-300 tracking-wide">
                "Building ideas for a smarter tomorrow"
              </p>
              <div className="w-16 h-[3px] bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full mt-2" />
            </div>

            {/* Vertical Motto & Handwritten Accent */}
            <div className="flex flex-col items-end space-y-2 pt-4">
              <div className="text-[11px] font-mono tracking-[0.4em] uppercase text-gray-500 leading-relaxed text-right">
                <div>LEARN</div>
                <div>BUILD</div>
                <div>INNOVATE</div>
                <div>REPEAT</div>
              </div>

              <p className="text-sm font-serif italic text-purple-300/90 pt-2 transform -rotate-3 text-right">
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
                  <span className="text-xl sm:text-2xl font-black text-purple-400 geist-font block">∞</span>
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider">Learning</span>
                </div>
              </div>
            </div>

            {/* Bouncing Scroll Down Indicator */}
            <div 
              onClick={handleExploreClick}
              className="pt-6 flex flex-col items-center gap-1 cursor-pointer text-gray-400 hover:text-purple-400 transition-colors animate-bounce"
            >
              <div className="w-5 h-8 rounded-full border-2 border-gray-400 flex items-start justify-center p-1">
                <div className="w-1 h-2 rounded-full bg-purple-400 animate-pulse" />
              </div>
              <span className="text-[10px] tracking-widest uppercase font-semibold mt-1">Scroll Down</span>
              <ChevronDown size={14} className="text-purple-400" />
            </div>

          </motion.div>

        </div>

      </main>
    </div>
  );
}

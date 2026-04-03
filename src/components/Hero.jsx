import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

const Hero = () => {
  return (
    <section id="home" className="min-h-[90vh] flex items-center justify-center relative px-6 lg:px-24">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(26,26,46,0.9),rgba(22,33,62,0.9))] pointer-events-none" />
      
      <div className="container mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-center lg:text-left"
        >
          <div className="inline-block py-1 px-3 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
            <span className="text-green-400 text-sm font-semibold tracking-wide uppercase">Available for work</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight font-inter">
            Hi, I'm <br />
            <span className="gradient-text">PRASANTH S</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-gray-300 font-medium tracking-wide">
            AWS Cloud & DevOps Engineer | Software Engineer (Fresher)
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0">
            Building scalable cloud solutions, smart web applications, and intelligent hardware systems.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-300 justify-center lg:justify-start">
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <FiPhone className="text-neon" /> +91 7200608333
            </span>
            <span className="hidden sm:block text-neon">•</span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <FiMail className="text-neon" /> prasanthsenthilkumar09@gmail.com
            </span>
          </div>

          <div className="flex items-center gap-6 justify-center lg:justify-start mt-8 pb-4">
            <a href="#projects" className="px-8 py-3 rounded-xl bg-neon text-white font-semibold hover:bg-neon/90 hover:shadow-lg hover:shadow-neon/40 transition-all transform hover:-translate-y-1">
              View Projects
            </a>
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all transform hover:-translate-y-1"
            >
              View Resume
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4">
            <a href="https://linkedin.com/in/prasanth-senthil-kumar-333s151/" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 text-gray-300 hover:text-white hover:bg-[#0A66C2] transition-colors shadow-lg">
              <FiLinkedin size={24} />
            </a>
            <a href="https://github.com/PRASANTH-7-SENTHIL" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 text-gray-300 hover:text-white hover:bg-[#333] transition-colors shadow-lg">
              <FiGithub size={24} />
            </a>
          </div>
        </motion.div>

        {/* Hero Visual Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center order-first lg:order-last mb-8 lg:mb-0"
        >
          <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full relative overflow-hidden card-glow flex items-center justify-center border-4 border-white/10 group">
            {/* The profile image saved in the public folder */}
            <img 
              src="/profile.png" 
              alt="Prasanth S Profile" 
              className="w-full h-full object-cover object-[center_top] transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

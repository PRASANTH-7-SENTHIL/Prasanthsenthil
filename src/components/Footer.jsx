import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="relative bg-secondary/80 border-t border-white/5 py-12 px-6 lg:px-24">
      <div className="container mx-auto pb-10 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-center md:text-left">
          <a href="#home" className="text-2xl font-bold tracking-tighter text-white mb-2 block">
            PRASANTH S<span className="text-neon"></span>
          </a>
          <p className="text-gray-400 font-medium font-inter">
            Building scalable cloud solutions, smart web applications, and intelligent hardware systems
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <a href="https://linkedin.com/in/prasanth-senthil-kumar-333s151/" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-[#0A66C2] transition-colors border border-transparent hover:border-white/20">
              <FiLinkedin size={20} />
            </a>
            <a href="https://github.com/PRASANTH-7-SENTHIL" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-[#333] transition-colors border border-transparent hover:border-white/20">
              <FiGithub size={20} />
            </a>
            <a href="mailto:prasanthsenthilkumar09@gmail.com" className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-red-500 transition-colors border border-transparent hover:border-white/20">
              <FiMail size={20} />
            </a>
            <a href="tel:7200608333" className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-green-500 transition-colors border border-transparent hover:border-white/20">
              <FiPhone size={20} />
            </a>
          </div>
          
          <a 
            href="/resume.pdf" 
            download="Prasanth_S_Resume.pdf" 
            className="px-8 py-3 rounded-xl bg-neon text-white font-semibold hover:bg-neon/90 transition-all font-inter inline-flex mt-4 items-center gap-2 transform hover:-translate-y-1 shadow-lg shadow-neon/20 hover:shadow-neon/40"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="container mx-auto pt-6 flex flex-col items-center">
        <p className="text-gray-500 text-sm font-inter">
          &copy; {new Date().getFullYear()} Prasanth S. All Rights Reserved.
        </p>
        <p className="text-gray-600 text-xs mt-2 font-inter tracking-wider">
          DESIGNED & DEVELOPED WITH ❤️ USING REACT & TAILWIND
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiGithub, FiExternalLink, FiPlay, FiPause } from 'react-icons/fi';

const projects = [
  {
    title: "AI Based Emergency Response System",
    description: "An intelligent critical emergency response monitoring software that leverages artificial intelligence to rapidly coordinate help.",
    tags: ["AI", "React", "Node.js", "Python"],
    demo: "#",
    github: "#"
  },
  {
    title: "AI Smart Education System",
    description: "A comprehensive platform using an AI agent for adaptive learning, automated grading, and personalized student assistance.",
    tags: ["AWS", "AI", "MongoDB", "Express"],
    demo: "#",
    github: "#"
  },
  {
    title: "PS TEX",
    description: "Manager of the PS-TEX, overseeing professional textile operations and business management. Website: www.ps-tex.com",
    tags: ["Management", "Textiles", "Business"],
    demo: "http://www.ps-tex.com",
    github: "#",
    video: "https://res.cloudinary.com/dguzreg8w/video/upload/v1784656652/portfolio/pstex.mp4"
  },
  {
    title: "SEED to CIRCUIT",
    description: "Agriculture project aiming to connect smart IoT circuitry and agricultural lifecycle for optimal yield predictions.",
    tags: ["IoT", "Arduino", "ThingSpeak", "C++"],
    demo: "#",
    github: "#"
  },
  {
    title: "Smart Home Automation",
    description: "Integrated automation solution using Wi-Fi enabled microcontrollers to efficiently manage home appliances remotely.",
    tags: ["Home Automation", "Firebase", "ESP8266"],
    demo: "#",
    github: "#",
    video: "https://res.cloudinary.com/dguzreg8w/video/upload/v1784656570/portfolio/home.mp4"
  },
  {
    title: "LPG Gas Leakage Detector",
    description: "A safety mechanism capable of real-time monitoring of air quality, automatically alerting residents upon sensing LPG.",
    tags: ["Hardware", "Sensors", "Twilio API"],
    demo: "#",
    github: "#"
  },
  {
    title: "Weather Based Smart Education",
    description: "A smart system integrating real-time weather data to optimize environments and scheduling.",
    tags: ["React", "IoT", "Weather API"],
    demo: "#",
    github: "#",
    video: "https://media.githubusercontent.com/media/PRASANTH-7-SENTHIL/Prasanthsenthil/main/public/weather-smart-education.mp4"
  },
  {
    title: "Smart City",
    description: "Dashboard monitoring multiple urban variables like traffic and pollution with data aggregated from edge devices.",
    tags: ["React", "AWS IoT", "Tailwind CSS"],
    demo: "#",
    github: "#"
  }
];

const ProjectCard = ({ project, idx }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="min-w-[300px] md:min-w-[400px] glass-card flex flex-col snap-start card-glow border-t-4 border-t-accent"
    >
      <div className="h-48 bg-secondary/80 rounded-t-xl relative overflow-hidden flex items-center justify-center border-b border-white/10 group">
        {project.video ? (
          <>
            <video 
              ref={videoRef}
              src={project.video} 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${isPlaying ? 'bg-primary/40 opacity-0 group-hover:opacity-100' : 'bg-primary/60 opacity-100'}`}>
              <div className="flex gap-4">
                <button 
                  onClick={togglePlay} 
                  className="p-4 bg-neon/80 rounded-full text-white hover:bg-neon hover:scale-110 shadow-lg shadow-neon/50 transition-all"
                >
                  {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} className="ml-1" />}
                </button>
                {project.demo !== "#" && (
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all flex items-center justify-center self-center"
                    title="View Live"
                  >
                    <FiExternalLink size={24} />
                  </a>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-400 font-medium">Image Placeholder</p>
            <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <a href={project.github} className="p-3 bg-white/10 rounded-full hover:bg-white/30 text-white transition">
                <FiGithub size={20} />
              </a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-3 bg-neon/20 rounded-full hover:bg-neon text-white transition border border-neon/50">
                <FiExternalLink size={20} />
              </a>
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-3 font-inter">{project.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {project.description.includes("Website:") ? (
              <>
                {project.description.split("Website:")[0]}
                Website: <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-neon hover:underline font-semibold cursor-pointer">{project.description.split("Website:")[1].trim()}</a>
              </>
            ) : project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24 px-6 lg:px-24 overflow-hidden relative">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-neon font-semibold tracking-wider text-sm uppercase mb-2 block">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold font-inter gradient-text pb-2">
              Featured Projects
            </h2>
          </div>
          <div className="flex gap-4">
            <button onClick={scrollLeft} className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white">
              <FiArrowRight size={24} className="rotate-180" />
            </button>
            <button onClick={scrollRight} className="p-3 rounded-full border border-neon/50 bg-neon/10 text-neon hover:bg-neon hover:text-white transition-all">
              <FiArrowRight size={24} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto hide-scrollbar pb-12 snap-x snap-mandatory pr-24"
        >
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

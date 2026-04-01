import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiPython, SiJavascript, SiHtml5, SiReact, 
  SiFirebase, SiMysql, SiMongodb, SiGit, SiGithub, SiDocker, 
  SiArduino, SiTwilio, SiLinux 
} from 'react-icons/si';
import { FaServer, FaCogs, FaUsers, FaLightbulb, FaTools, FaAws, FaCss3Alt } from 'react-icons/fa';
import { VscCommentDiscussion, VscCode } from 'react-icons/vsc';

const skillsData = [
  {
    category: "Cloud / DevOps",
    icon: <FaAws size={24} className="text-[#FF9900]" />,
    skills: [
      { name: "EC2", icon: <FaServer /> },
      { name: "S3", icon: <FaAws /> },
      { name: "IAM", icon: <FaUsers /> },
      { name: "Lambda", icon: <FaCogs /> },
      { name: "CloudWatch", icon: <FaLightbulb /> },
      { name: "VPC", icon: <FaServer /> },
      { name: "RDS", icon: <SiMysql /> },
      { name: "CI/CD Pipeline", icon: <FaTools /> },
    ]
  },
  {
    category: "Programming",
    icon: <FaCogs size={24} className="text-blue-500" />,
    skills: [
      { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: "HTML", icon: <SiHtml5 className="text-[#E34F26]" /> },
      { name: "CSS", icon: <FaCss3Alt className="text-[#1572B6]" /> },
      { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
    ]
  },
  {
    category: "Databases",
    icon: <SiMysql size={24} className="text-[#4479A1]" />,
    skills: [
      { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
      { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
    ]
  },
  {
    category: "Tools",
    icon: <FaTools size={24} className="text-gray-400" />,
    skills: [
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      { name: "GitHub", icon: <SiGithub className="text-white" /> },
      { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "VS Code", icon: <VscCode className="text-[#007ACC]" /> },
      { name: "Arduino IDE", icon: <SiArduino className="text-[#00979D]" /> },
      { name: "ThingSpeak", icon: <FaServer className="text-green-500" /> },
      { name: "Twilio", icon: <SiTwilio className="text-[#F22F46]" /> },
      { name: "N8N", icon: <FaCogs className="text-[#FF6B6B]" /> },
    ]
  },
  {
    category: "Other Skills",
    icon: <SiLinux size={24} className="text-yellow-500" />,
    skills: [
      { name: "R&D", icon: <FaLightbulb className="text-yellow-400" /> },
      { name: "Leadership", icon: <FaUsers className="text-blue-400" /> },
      { name: "Communication", icon: <VscCommentDiscussion className="text-green-400" /> },
      { name: "Teamwork", icon: <FaUsers className="text-purple-400" /> },
      { name: "Linux", icon: <SiLinux className="text-yellow-500" /> },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 lg:px-24 bg-secondary/50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center gradient-text">
          Technical Arsenal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 w-full">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`glass-card p-6 border-t-4 hover:-translate-y-2 transition-transform duration-300 ${
                idx === 3 ? "border-t-neon" : idx === 4 ? "border-t-[#FF9900]" : "border-t-blue-500"
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold font-inter">{category.category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map(skill => (
                  <div 
                    key={skill.name} 
                    className="flex items-center gap-2 px-3 py-2 bg-primary rounded-lg border border-white/5 hover:border-white/20 transition-colors cursor-default select-none shadow-sm shadow-black/40"
                  >
                    <span className="opacity-80 drop-shadow-md">{skill.icon}</span>
                    <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

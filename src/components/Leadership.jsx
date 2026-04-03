import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiImage, FiAward, FiUsers, FiTarget, FiActivity } from 'react-icons/fi';

const roles = [
  {
    id: 1,
    title: 'Department Symposium President',
    desc: 'Led the organization and execution of the annual department-level tech symposium.',
    path: '/symposium',
    icon: <FiUsers className="w-8 h-8" />
  },
  {
    id: 2,
    title: 'Department Quiz Coordinator',
    desc: 'Coordinated logistics and question sets for the department-level technical quiz.',
    path: '/quiz-department',
    icon: <FiAward className="w-8 h-8" />
  },
  {
    id: 3,
    title: 'Class Quiz Organizer',
    desc: 'Organized engaging quiz sessions to foster knowledge sharing and healthy competition.',
    path: '/quiz-class',
    icon: <FiTarget className="w-8 h-8" />
  },
  {
    id: 4,
    title: 'Inter-College Cricket Team Captain',
    desc: 'Captained the college cricket team, strategizing matches and leading to victories.',
    path: '/cricket',
    icon: <FiActivity className="w-8 h-8" />
  }
];

const Leadership = () => {
  return (
    <section id="leadership" className="py-20 relative px-6 lg:px-24">
      <div className="container mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-inter mb-4">
            Leadership & <span className="text-neon">Coordinating</span>
          </h2>
          <div className="w-24 h-1 bg-neon mx-auto rounded-full opacity-70"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Experience in taking initiative, leading teams, and coordinating successful events.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {roles.map((role, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={role.id}
              className="relative group p-1 rounded-2xl bg-linear-to-br from-white/5 to-white/5 hover:from-neon/30 hover:to-purple-600/30 transition-all duration-300"
            >
              <div className="bg-secondary/90 backdrop-blur-md h-full rounded-xl p-8 flex flex-col justify-between border border-transparent shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(45,212,191,0.2)] transition-shadow duration-300">
                <div>
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-neon mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    {role.icon}
                  </div>
                  <h3 className="text-2xl font-bold font-inter text-white mb-3 group-hover:text-neon transition-colors duration-300">
                    {role.title}
                  </h3>
                  <p className="text-gray-400 mb-8 line-clamp-2">
                    {role.desc}
                  </p>
                </div>
                
                <Link to={role.path} className="w-full">
                  <button className="w-full py-3 px-6 rounded-xl bg-white/5 hover:bg-neon/20 border border-white/10 hover:border-neon/50 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 group/btn shadow-[0_0_0_rgba(45,212,191,0)] hover:shadow-[0_0_15px_rgba(45,212,191,0.4)]">
                    <FiImage className="text-neon group-hover/btn:scale-110 transition-transform" />
                    <span>View Photos</span>
                    <FiChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;

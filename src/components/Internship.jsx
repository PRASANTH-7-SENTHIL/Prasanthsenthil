import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiTool, FiCheckCircle, FiShield, FiX, FiImage, FiMapPin, FiClock } from 'react-icons/fi';

const departments = [
  {
    id: 1,
    title: 'SMS (Steel Melting Shop)',
    icon: <FiSettings className="w-6 h-6" />,
    points: [
      'Learned the comprehensive steel production process.',
      'Observed induction furnace operations and control systems.'
    ]
  },
  {
    id: 2,
    title: 'HRM (Hot Rolling Mill)',
    icon: <FiTool className="w-6 h-6" />,
    points: [
      'Studied the progressive hot rolling process of steel.',
      'Understood complex temperature control and dynamic automation.'
    ]
  },
  {
    id: 3,
    title: 'CRM (Cold Rolling Mill)',
    icon: <FiCheckCircle className="w-6 h-6" />,
    points: [
      'Learned precision cold rolling and finishing techniques.',
      'Observed strict quality control and gauge regulation systems.'
    ]
  },
  {
    id: 4,
    title: 'Stainless Steel Blanking Line',
    icon: <FiShield className="w-6 h-6" />,
    points: [
      'Understood sheet cutting, sizing, and shaping operations.',
      'Gained exposure to heavy industrial machinery and plant safety systems.'
    ]
  }
];

const Internship = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  
  const photos = [
    '/internship/internship-2.jpg'
  ];

  return (
    <section id="internship" className="py-20 relative px-6 lg:px-24">
      <div className="container mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-inter mb-4">
            Internship <span className="text-neon">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-neon mx-auto rounded-full opacity-70"></div>
        </motion.div>

        {/* Company Overview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16 relative group"
        >
          <div className="absolute inset-0 bg-linear-to-r from-neon/10 to-purple-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-secondary/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all shadow-xl flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-24 h-24 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-[0_0_20px_rgba(45,212,191,0.2)]">
              {/* Fallback Icon if no logo available */}
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-br from-neon to-purple-500">
                SAIL
              </span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block py-1 px-3 rounded-full bg-neon/10 border border-neon/20 mb-3">
                <span className="text-neon text-xs font-semibold tracking-wide uppercase">Electrical & Electronics Engineering Intern</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-inter">
                Salem Steel Plant <span className="text-gray-400 text-lg font-medium">(Steel Authority of India Limited)</span>
              </h3>
              
              <div className="flex flex-wrap gap-4 text-gray-400 text-sm mt-4 justify-center md:justify-start">
                <span className="flex items-center gap-1.5 bg-white/5 py-1.5 px-3 rounded-md">
                  <FiMapPin className="text-neon" /> Salem, Tamil Nadu
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 py-1.5 px-3 rounded-md">
                  <FiClock className="text-purple-400" /> Session: 2:00 PM – 5:00 PM
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-4 md:mt-0 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center gap-2 text-white font-medium transition-all hover:scale-105 shrink-0"
            >
              <FiImage className="text-neon" />
              View Photos
            </button>
          </div>
        </motion.div>

        {/* Departments Grid layout */}
        <div className="max-w-5xl mx-auto">
          <h4 className="text-xl font-semibold mb-8 text-center text-gray-300 tracking-wide uppercase">Departments Covered</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={dept.id}
                className="bg-secondary/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-neon/40 hover:bg-white/5 transition-all group overflow-hidden relative"
              >
                <div className="absolute right-0 top-0 w-24 h-24 bg-neon/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-150 group-hover:bg-neon/10"></div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="p-3 rounded-lg bg-linear-to-br from-neon/20 to-transparent text-neon border border-neon/20">
                    {dept.icon}
                  </div>
                  <h5 className="text-lg font-bold text-white group-hover:text-neon transition-colors">{dept.title}</h5>
                </div>
                <ul className="space-y-2 relative z-10">
                  {dept.points.map((point, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-start line-clamp-2 md:line-clamp-none">
                      <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-neon/60 shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Viewer Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-99 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
            onClick={() => setIsModalOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-red-500 transition-colors z-10"
              onClick={() => setIsModalOpen(false)}
            >
              <FiX size={24} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col pt-12 sm:pt-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 w-full h-[60vh] sm:h-[80vh] bg-black/50 relative flex items-center justify-center p-4">
                <img 
                  src={photos[activePhoto]} 
                  alt={`Internship Photo ${activePhoto + 1}`} 
                  className="max-w-full max-h-full object-contain rounded-lg drop-shadow-2xl"
                />
              </div>
              <div className="h-20 bg-secondary border-t border-white/10 flex items-center justify-center gap-4 px-4 overflow-x-auto shrink-0">
                {photos.map((src, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActivePhoto(idx)}
                    className={`w-16 h-12 rounded bg-black/50 overflow-hidden border-2 transition-all ${activePhoto === idx ? 'border-neon scale-110 shadow-[0_0_10px_rgba(45,212,191,0.5)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={src} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Internship;

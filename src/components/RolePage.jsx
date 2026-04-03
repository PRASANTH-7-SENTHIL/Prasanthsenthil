import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiImage } from 'react-icons/fi';

const RolePage = ({ title, roleDesc, images }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use provided images or dummy placeholders
  const contentList = images && images.length > 0 ? images : [1, 2, 3, 4, 5, 6];

  return (
    <div className="min-h-screen bg-primary font-poppins text-white px-6 py-12 lg:px-24">
      {/* Background decorations */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neon blur-[150px]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link to="/">
            <button className="flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all hover:scale-105 shadow-md">
              <FiArrowLeft /> Back to Portfolio
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-inter mb-4 bg-clip-text text-transparent bg-linear-to-r from-neon to-purple-500">
            {title}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            {roleDesc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contentList.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative aspect-video md:aspect-square bg-secondary/80 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(45,212,191,0.15)] transition-all duration-500 cursor-pointer"
            >
              {typeof item === 'string' ? (
                <img src={item} alt={`${title} ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 bg-linear-to-bl from-white/5 to-transparent group-hover:scale-110 transition-transform duration-700">
                  <FiImage className="w-12 h-12 mb-2 opacity-50 group-hover:text-neon transition-colors duration-500" />
                  <span className="text-sm tracking-widest uppercase font-semibold">Image {item}</span>
                </div>
              )}
              
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon/30 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RolePage;

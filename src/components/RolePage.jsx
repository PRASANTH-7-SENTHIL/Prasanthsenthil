import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiImage } from 'react-icons/fi';

const RolePage = ({ title, roleDesc, images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use provided images or dummy placeholders
  const contentList = images && images.length > 0 ? images : [1, 2, 3, 4, 5, 6];

  return (
    <div className="min-h-screen bg-primary font-poppins text-white px-4 sm:px-6 py-8 sm:py-12 lg:px-24">
      {/* Background decorations */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neon blur-[150px]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 sm:mb-12"
        >
          <Link to="/">
            <button className="flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all hover:scale-105 shadow-md text-xs sm:text-sm">
              <FiArrowLeft /> Back to Portfolio
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 sm:mb-16 text-center lg:text-left"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-inter mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
            {title}
          </h1>
          <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0">
            {roleDesc}
          </p>
          <p className="text-xs text-purple-300/80 font-mono mt-2">
            Tap any photo to view full screen
          </p>
        </motion.div>

        {/* 2 in a row on mobile, 3 on tablet/desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {contentList.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (idx % 6) * 0.08 }}
              onClick={() => typeof item === 'string' && setSelectedImage(item)}
              className="group relative aspect-square bg-secondary/80 border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_15px_30px_rgba(168,85,247,0.25)] transition-all duration-300 cursor-pointer hover:border-purple-400/60"
            >
              {typeof item === 'string' ? (
                <img src={item} alt={`${title} ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108" loading="lazy" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 bg-gradient-to-bl from-white/5 to-transparent group-hover:scale-105 transition-transform duration-500">
                  <FiImage className="w-8 h-8 sm:w-12 sm:h-12 mb-1.5 opacity-50 group-hover:text-purple-400 transition-colors duration-300" />
                  <span className="text-xs tracking-widest uppercase font-semibold">Image {item}</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors pointer-events-none" />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-0.5 rounded text-[10px] text-purple-300 font-mono pointer-events-none">
                Enlarge
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Enlarged Image Preview — tap anywhere to close */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-6 cursor-pointer"
        >
          <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-white z-20 pointer-events-none">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-slate-300 uppercase bg-black/70 px-3 py-1 rounded-full border border-white/15">
              Tap anywhere on screen to close
            </span>
            <button
              onClick={() => setSelectedImage(null)}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center text-2xl font-bold cursor-pointer transition-transform hover:scale-110"
              title="Close image"
            >
              &times;
            </button>
          </div>

          <div className="relative max-w-full max-h-[88vh] flex items-center justify-center p-2">
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-h-[85vh] max-w-[95vw] object-contain rounded-2xl border border-purple-400/40 shadow-[0_0_50px_rgba(168,85,247,0.35)]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePage;

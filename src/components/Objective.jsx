import React from 'react';
import { motion } from 'framer-motion';

const Objective = () => {
  return (
    <section id="objective" className="py-20 px-6 lg:px-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto glass-card p-8 md:p-12 relative overflow-hidden"
        >
          {/* Decorative gradients */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-neon/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center gradient-text">
            Career Objective
          </h2>
          
          <p className="text-xl leading-relaxed text-gray-300 text-center font-light relative z-10 font-inter">
            "Aspiring <span className="text-white font-medium">AWS Cloud and DevOps engineer</span> with a strong interest in software development, seeking an opportunity to apply my skills in <span className="text-neon">cloud computing</span>, <span className="text-blue-400">automation</span>, and scalable system development to build innovative solutions."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Objective;

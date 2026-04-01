import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiStar, FiFlag, FiCamera, FiX, FiExternalLink } from 'react-icons/fi';

const achievements = [
  {
    title: "Best Innovation Award",
    institution: "Erode Sengundar Engineering College",
    category: "Hackathon Winner",
    icon: <FiAward className="text-neon" size={24} />,
    color: "neon",
    certificates: [
      { name: "Participate Certificate", image: "/certificates/hackathon_cert.jpeg" },
      { name: "Best Innovation Award", image: "/certificates/award_cert.jpeg" }
    ]
  },
  {
    title: "National Level Hackathon",
    institution: "KPR Institute",
    category: "Participant & Finalist",
    icon: <FiStar className="text-yellow-400" size={24} />,
    color: "yellow-400",
    certificates: [
      { name: "KPR Certificate", image: "/kpr_hackathon/kpr_certificate.jpeg" },
      { name: "Hackathon Event", image: "/kpr_hackathon/img1.jpeg" },
      { name: "Hackathon Event", image: "/kpr_hackathon/img2.jpeg" },
      { name: "Hackathon Event", image: "/kpr_hackathon/img3.jpeg" },
      { name: "Hackathon Event", image: "/kpr_hackathon/img4.jpeg" },
      { name: "Hackathon Event", image: "/kpr_hackathon/img5.jpeg" },
      { name: "Hackathon Event", image: "/kpr_hackathon/img6.jpeg" }
    ]
  },
  {
    title: "National Level Hackathon",
    institution: "SRM IST",
    category: "Participant & Finalist",
    icon: <FiStar className="text-orange-400" size={24} />,
    color: "orange-400",
    certificates: [
      { name: "SRM Certificate", image: "/srm_hackathon/srm_cert.jpeg" },
      { name: "Hackathon Photo", image: "/srm_hackathon/img1.jpeg" },
      { name: "Hackathon Photo", image: "/srm_hackathon/img2.jpeg" },
      { name: "Hackathon Photo", image: "/srm_hackathon/img3.jpeg" },
      { name: "Hackathon Photo", image: "/srm_hackathon/img4.jpeg" },
      { name: "Hackathon Photo", image: "/srm_hackathon/img5.jpeg" },
      { name: "Hackathon Photo", image: "/srm_hackathon/img6.jpeg" },
      { name: "Hackathon Photo", image: "/srm_hackathon/img7.jpeg" },
      { name: "Hackathon Photo", image: "/srm_hackathon/img8.jpeg" },
      { name: "Hackathon Photo", image: "/srm_hackathon/img9.jpeg" },
      { name: "Hackathon Photo", image: "/srm_hackathon/img10.jpeg" },
      { name: "Hackathon Photo", image: "/srm_hackathon/img11.jpeg" },
      { name: "Hackathon Photo", image: "/srm_hackathon/img12.jpeg" },
      { name: "Hackathon Photo", image: "/srm_hackathon/img13.jpeg" }
    ]
  },
  {
    title: "2× Winner",
    institution: "Salem Local Center",
    category: "Paper Presentation",
    icon: <FiAward className="text-blue-400" size={24} />,
    color: "blue-400",
    certificates: [
      { name: "Paper Presentation Event", image: "/salem_paper/event.jpeg" },
      { name: "Certificate", image: "/salem_paper/cert1.jpeg" },
      { name: "Certificate", image: "/salem_paper/cert2.jpeg" },
      { name: "Certificate", image: "/salem_paper/cert3.jpeg" }
    ]
  },
  {
    title: "2× Winner",
    institution: "Sengunthar Engineering College",
    category: "Paper Presentation",
    icon: <FiAward className="text-blue-400" size={24} />,
    color: "blue-400",
    certificates: [
      { name: "Paper Presentation Event", image: "/sengunthar_paper/img1.jpeg" },
      { name: "Paper Presentation Event", image: "/sengunthar_paper/img2.jpeg" },
      { name: "Certificate", image: "/sengunthar_paper/cert1.jpeg" },
      { name: "Certificate", image: "/sengunthar_paper/cert2.jpeg" }
    ]
  },
  {
    title: "2× Winner",
    institution: "SONA College of Technology",
    category: "Project Expo",
    icon: <FiAward className="text-purple-400" size={24} />,
    color: "purple-400",
    certificates: [
      { name: "Project Expo Certificate", image: "/sona_expo/cert.jpeg" },
      { name: "Project Expo Event", image: "/sona_expo/img1.jpeg" },
      { name: "Project Expo Event", image: "/sona_expo/img2.jpeg" },
      { name: "Project Expo Event", image: "/sona_expo/img3.jpeg" },
      { name: "Project Expo Event", image: "/sona_expo/img4.jpeg" },
      { name: "Project Expo Event", image: "/sona_expo/img5.jpeg" }
    ]
  },
  {
    title: "2× Winner",
    institution: "Government Engineering College Salem",
    category: "Project Expo",
    icon: <FiAward className="text-purple-400" size={24} />,
    color: "purple-400",
    certificates: [
      { name: "Project Expo Certificate", image: "/gce_expo/cert1.jpeg" },
      { name: "Project Expo Certificate", image: "/gce_expo/cert2.jpeg" }
    ]
  },
  {
    title: "1× Winner",
    institution: "Mahendra Engineering College",
    category: "Ideathon",
    icon: <FiStar className="text-green-400" size={24} />,
    color: "green-400",
    certificates: [
      { name: "Ideathon Certificate", image: "/ideathon/cert.jpeg" },
      { name: "Ideathon Photo", image: "/ideathon/img1.jpeg" },
      { name: "Ideathon Photo", image: "/ideathon/img2.jpeg" },
      { name: "Ideathon Photo", image: "/ideathon/img3.jpeg" },
      { name: "Ideathon Photo", image: "/ideathon/img4.jpeg" }
    ]
  },
  {
    title: "International Conference",
    institution: "Annapoorana Engineering College",
    category: "Publication / Presentation",
    icon: <FiFlag className="text-[#FF9900]" size={24} />,
    color: "[#FF9900]",
    certificates: [
      { name: "Conference Photo", image: "/annapoorana/img1.jpeg" },
      { name: "Conference Photo", image: "/annapoorana/img2.jpeg" },
      { name: "Conference Photo", image: "/annapoorana/img3.jpeg" },
      { name: "Conference Photo", image: "/annapoorana/img4.jpeg" },
      { name: "Conference Photo", image: "/annapoorana/img5.jpeg" }
    ]
  },
  {
    title: "3rd Prize",
    institution: "Dhirajlal Gandhi College of Technology",
    category: "Photography",
    icon: <FiCamera className="text-pink-400" size={24} />,
    color: "pink-400",
    certificates: [
      { name: "Photography Photo", image: "/photography/img1.jpeg" },
      { name: "Photography Photo", image: "/photography/img2.jpeg" },
      { name: "Photography Photo", image: "/photography/img3.jpeg" }
    ]
  },
  {
    title: "4th Prize",
    institution: "Inter-College Cricket Tournament",
    category: "Captain (₹4000 Cash Prize)",
    icon: <FiAward className="text-emerald-400" size={24} />,
    color: "emerald-400",
    certificates: [
      { name: "Cricket Tournament Certificate", image: "/cricket/cert1.jpeg" },
      { name: "Cricket Tournament Certificate", image: "/cricket/cert2.jpeg" },
      { name: "Tournament Photo", image: "/cricket/img1.jpeg" },
      { name: "Tournament Photo", image: "/cricket/img2.jpeg" },
      { name: "Tournament Photo", image: "/cricket/img3.jpeg" }
    ]
  }
];

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedAchievement) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedAchievement]);

  return (
    <section id="achievements" className="py-24 px-6 lg:px-24 bg-primary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text">
          Milestones & Awards
        </h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon via-purple-500 to-transparent"></div>

          <div className="space-y-12">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center justify-between ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary border-4 border-neon shadow-[0_0_15px_rgba(233,69,96,0.6)] flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>

                <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <div 
                    onClick={() => item.certificates && setSelectedAchievement(item)}
                    className={`glass-card p-6 shadow-lg border-t-4 border-t-${item.color} card-glow hover:-translate-y-1 ${item.certificates ? 'cursor-pointer hover:shadow-[0_0_20px_rgba(233,69,96,0.4)] transition-all' : ''}`}
                  >
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                      {index % 2 !== 0 && <span className="hidden md:block">{item.icon}</span>}
                      {index % 2 === 0 ? <span className="block">{item.icon}</span> : <span className="md:hidden block">{item.icon}</span>}
                      <h3 className="text-xl font-bold font-inter text-white">{item.title}</h3>
                      {index % 2 === 0 && <span className="hidden md:block">{item.icon}</span>}
                    </div>
                    
                    <p className="text-neon font-semibold text-sm mb-1">{item.category}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.institution}</p>
                    
                    {item.certificates && (
                      <div className={`mt-4 flex items-center gap-2 text-neon text-sm font-medium ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                        <FiExternalLink size={16} />
                        <span>View Certificates</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty space for alternative side */}
                <div className="hidden md:block w-[45%]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificates Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-primary border border-gray-800 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-secondary">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{selectedAchievement.title}</h3>
                  <p className="text-neon text-sm">{selectedAchievement.category} - {selectedAchievement.institution}</p>
                </div>
                <button 
                  onClick={() => setSelectedAchievement(null)}
                  className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-primary/50 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {selectedAchievement.certificates?.map((cert, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="flex flex-col items-center group"
                    >
                      <h4 className="text-lg font-medium text-gray-200 mb-4 text-center">{cert.name}</h4>
                      <div className="relative w-full rounded-xl overflow-hidden border-2 border-gray-800 group-hover:border-neon transition-colors shadow-lg bg-black">
                        <img 
                          src={cert.image} 
                          alt={cert.name} 
                          className="w-full h-auto object-contain max-h-[60vh] mix-blend-normal group-hover:scale-[1.02] transition-transform duration-500"
                          loading="lazy"
                        />
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;

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
      { name: "Participate Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166535/portfolio/certificates/hackathon_cert.jpg" },
      { name: "Best Innovation Award", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166529/portfolio/certificates/award_cert.jpg" }
    ]
  },
  {
    title: "National Level Hackathon",
    institution: "KPR Institute",
    category: "Participant & Finalist",
    icon: <FiStar className="text-yellow-400" size={24} />,
    color: "yellow-400",
    certificates: [
      { name: "KPR Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166790/portfolio/kpr_hackathon/kpr_certificate.jpg" },
      { name: "Hackathon Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166771/portfolio/kpr_hackathon/img1.jpg" },
      { name: "Hackathon Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166774/portfolio/kpr_hackathon/img2.jpg" },
      { name: "Hackathon Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166778/portfolio/kpr_hackathon/img3.jpg" },
      { name: "Hackathon Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166785/portfolio/kpr_hackathon/img4.jpg" },
      { name: "Hackathon Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166786/portfolio/kpr_hackathon/img5.jpg" },
      { name: "Hackathon Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166788/portfolio/kpr_hackathon/img6.jpg" }
    ]
  },
  {
    title: "National Level Hackathon",
    institution: "SRM IST",
    category: "Participant & Finalist",
    icon: <FiStar className="text-orange-400" size={24} />,
    color: "orange-400",
    certificates: [
      { name: "SRM Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166885/portfolio/srm_hackathon/srm_cert.jpg" },
      { name: "Hackathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166864/portfolio/srm_hackathon/img1.jpg" },
      { name: "Hackathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166872/portfolio/srm_hackathon/img2.jpg" },
      { name: "Hackathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166874/portfolio/srm_hackathon/img3.jpg" },
      { name: "Hackathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166875/portfolio/srm_hackathon/img4.jpg" },
      { name: "Hackathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166877/portfolio/srm_hackathon/img5.jpg" },
      { name: "Hackathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166878/portfolio/srm_hackathon/img6.jpg" },
      { name: "Hackathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166880/portfolio/srm_hackathon/img7.jpg" },
      { name: "Hackathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166882/portfolio/srm_hackathon/img8.jpg" },
      { name: "Hackathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166884/portfolio/srm_hackathon/img9.jpg" },
      { name: "Hackathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166866/portfolio/srm_hackathon/img10.jpg" },
      { name: "Hackathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166868/portfolio/srm_hackathon/img11.jpg" },
      { name: "Hackathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166869/portfolio/srm_hackathon/img12.jpg" },
      { name: "Hackathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166871/portfolio/srm_hackathon/img13.jpg" }
    ]
  },
  {
    title: "2× Winner",
    institution: "Salem Local Center",
    category: "Paper Presentation",
    icon: <FiAward className="text-blue-400" size={24} />,
    color: "blue-400",
    certificates: [
      { name: "Paper Presentation Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166844/portfolio/salem_paper/event.jpg" },
      { name: "Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166838/portfolio/salem_paper/cert1.jpg" },
      { name: "Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166840/portfolio/salem_paper/cert2.jpg" },
      { name: "Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166842/portfolio/salem_paper/cert3.jpg" }
    ]
  },
  {
    title: "2× Winner",
    institution: "Sengunthar Engineering College",
    category: "Paper Presentation",
    icon: <FiAward className="text-blue-400" size={24} />,
    color: "blue-400",
    certificates: [
      { name: "Paper Presentation Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166853/portfolio/sengunthar_paper/img1.jpg" },
      { name: "Paper Presentation Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166854/portfolio/sengunthar_paper/img2.jpg" },
      { name: "Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166849/portfolio/sengunthar_paper/cert1.jpg" },
      { name: "Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166851/portfolio/sengunthar_paper/cert2.jpg" }
    ]
  },
  {
    title: "2× Winner",
    institution: "SONA College of Technology",
    category: "Project Expo",
    icon: <FiAward className="text-purple-400" size={24} />,
    color: "purple-400",
    certificates: [
      { name: "Project Expo Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166856/portfolio/sona_expo/cert.jpg" },
      { name: "Project Expo Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166857/portfolio/sona_expo/img1.jpg" },
      { name: "Project Expo Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166858/portfolio/sona_expo/img2.jpg" },
      { name: "Project Expo Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166860/portfolio/sona_expo/img3.jpg" },
      { name: "Project Expo Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166862/portfolio/sona_expo/img4.jpg" },
      { name: "Project Expo Event", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166863/portfolio/sona_expo/img5.jpg" }
    ]
  },
  {
    title: "2× Winner",
    institution: "Government Engineering College Salem",
    category: "Project Expo",
    icon: <FiAward className="text-purple-400" size={24} />,
    color: "purple-400",
    certificates: [
      { name: "Project Expo Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166569/portfolio/gce_expo/cert1.jpg" },
      { name: "Project Expo Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166571/portfolio/gce_expo/cert2.jpg" }
    ]
  },
  {
    title: "1× Winner",
    institution: "Mahendra Engineering College",
    category: "Ideathon",
    icon: <FiStar className="text-green-400" size={24} />,
    color: "green-400",
    certificates: [
      { name: "Ideathon Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166741/portfolio/ideathon/cert.jpg" },
      { name: "Ideathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166743/portfolio/ideathon/img1.jpg" },
      { name: "Ideathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166745/portfolio/ideathon/img2.jpg" },
      { name: "Ideathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166763/portfolio/ideathon/img3.jpg" },
      { name: "Ideathon Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166765/portfolio/ideathon/img4.jpg" }
    ]
  },
  {
    title: "International Conference",
    institution: "Annapoorana Engineering College",
    category: "Publication / Presentation",
    icon: <FiFlag className="text-[#FF9900]" size={24} />,
    color: "[#FF9900]",
    certificates: [
      { name: "Conference Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166504/portfolio/annapoorana/img1.jpg" },
      { name: "Conference Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166515/portfolio/annapoorana/img2.jpg" },
      { name: "Conference Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166523/portfolio/annapoorana/img3.jpg" },
      { name: "Conference Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166526/portfolio/annapoorana/img4.jpg" },
      { name: "Conference Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166528/portfolio/annapoorana/img5.jpg" }
    ]
  },
  {
    title: "3rd Prize",
    institution: "Dhirajlal Gandhi College of Technology",
    category: "Photography",
    icon: <FiCamera className="text-pink-400" size={24} />,
    color: "pink-400",
    certificates: [
      { name: "Photography Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166817/portfolio/photography/img1.jpg" },
      { name: "Photography Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166819/portfolio/photography/img2.jpg" },
      { name: "Photography Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166821/portfolio/photography/img3.jpg" }
    ]
  },
  {
    title: "4th Prize",
    institution: "Inter-College Cricket Tournament",
    category: "Captain (₹4000 Cash Prize)",
    icon: <FiAward className="text-emerald-400" size={24} />,
    color: "emerald-400",
    certificates: [
      { name: "Cricket Tournament Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166546/portfolio/cricket/cert1.jpg" },
      { name: "Cricket Tournament Certificate", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166555/portfolio/cricket/cert2.jpg" },
      { name: "Tournament Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166561/portfolio/cricket/img1.jpg" },
      { name: "Tournament Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166564/portfolio/cricket/img2.jpg" },
      { name: "Tournament Photo", image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166565/portfolio/cricket/img3.jpg" }
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

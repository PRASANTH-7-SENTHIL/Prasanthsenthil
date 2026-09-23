import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { 
  FaAws, FaServer, FaDatabase, FaUserShield, FaChartLine, FaNetworkWired, FaEnvelopeOpenText, FaProjectDiagram,
  FaCode, FaTools, FaLightbulb, FaFlask, FaUsers, FaUserTie, FaComments, FaHandsHelping, FaChartBar, FaCodeBranch,
  FaPython, FaJs, FaHtml5, FaCss3Alt, FaReact, FaGit, FaGithub, FaDocker, FaLinux, FaWindows,
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowUp, FaPaperPlane,
  FaGraduationCap, FaRocket, FaUser, FaBriefcase, FaFolder, FaTrophy,
  FaRobot, FaMicrochip, FaCloud,
  FaChevronLeft, FaChevronRight, FaCog, FaExternalLinkAlt, FaWhatsapp
} from 'react-icons/fa';
import { 
  SiFirebase, SiMysql, SiArduino, SiTwilio 
} from 'react-icons/si';
import CareerJourney from './CareerJourney';

// --- INTERNAL ANIMATED BACKGROUND COMPONENT ---
const AuroraBackground = () => {
    const mountRef = useRef(null);
    useEffect(() => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = '0';
        renderer.domElement.style.display = 'block';
        currentMount.appendChild(renderer.domElement);
        const material = new THREE.ShaderMaterial({
            uniforms: { iTime: { value: 0 }, iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) } },
            vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
            fragmentShader: `
                uniform float iTime; uniform vec2 iResolution;
                #define NUM_OCTAVES 3
                float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
                float noise(vec2 p){ vec2 ip=floor(p);vec2 u=fract(p);u=u*u*(3.0-2.0*u);float res=mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);return res*res; }
                float fbm(vec2 x) { float v=0.0;float a=0.3;vec2 shift=vec2(100);mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50));for(int i=0;i<NUM_OCTAVES;++i){v+=a*noise(x);x=rot*x*2.0+shift;a*=0.4;}return v;}
                void main() {
                    vec2 p=((gl_FragCoord.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.,-4.,4.,6.);vec4 o=vec4(0.);float f=2.+fbm(p+vec2(iTime*5.,0.))*.5;
                    for(float i=0.;i++<35.;){vec2 v=p+cos(i*i+(iTime+p.x*.08)*.025+i*vec2(13.,11.))*3.5;float tailNoise=fbm(v+vec2(iTime*.5,i))*.3*(1.-(i/35.));vec4 auroraColors=vec4(.1+.3*sin(i*.2+iTime*.4),.3+.5*cos(i*.3+iTime*.5),.7+.3*sin(i*.4+iTime*.3),1.);vec4 currentContribution=auroraColors*exp(sin(i*i+iTime*.8))/length(max(v,vec2(v.x*f*.015,v.y*1.5)));float thinnessFactor=smoothstep(0.,1.,i/35.)*.6;o+=currentContribution*(1.+tailNoise*.8)*thinnessFactor;}
                    o=tanh(pow(o/100.,vec4(1.6)));gl_FragColor=o*1.5;
                }`
        });
        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        let animationFrameId;
        const animate = () => { animationFrameId = requestAnimationFrame(animate); material.uniforms.iTime.value += 0.016; renderer.render(scene, camera); };
        const handleResize = () => { renderer.setSize(window.innerWidth, window.innerHeight); material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight); };
        window.addEventListener('resize', handleResize);
        animate();
        return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', handleResize); if (currentMount.contains(renderer.domElement)) currentMount.removeChild(renderer.domElement); renderer.dispose(); material.dispose(); geometry.dispose(); };
    }, []);
    return <div ref={mountRef} />;
};

// --- DEFAULT DATA ---
const defaultData = {
  logo: { initials: 'PS', name: 'Prasanth Senthil' },
  navLinks: [ { label: 'About', href: '#about' }, { label: 'Projects', href: '#projects' }, { label: 'Skills', href: '#skills' } ],
  resume: { label: 'Resume', onClick: () => window.open('/resume.pdf', '_blank') },
  hero: { titleLine1: 'Software Engineer &', titleLine2Gradient: 'IoT Innovator', subtitle: 'I craft beautiful digital experiences through code and design. Specializing in modern web development, IoT integrations, and bringing innovative ideas to life.', },
  ctaButtons: { primary: { label: 'View My Work', onClick: () => { window.location.hash = '#projects'; } }, secondary: { label: 'Get In Touch', onClick: () => { window.location.href = 'mailto:prasanthsenthilkumar09@gmail.com'; } }, },
  projects: [ 
    { title: 'Weather Based Smart Education', description: 'A smart system integrating real-time weather data to optimize environments.', tags: ['React', 'IoT', 'Weather API'] }, 
    { title: 'AI Based Emergency Response', description: 'Critical emergency response monitoring using artificial intelligence.', tags: ['AI', 'React', 'Node.js', 'Python'] }, 
    { title: 'Smart City Dashboard', description: 'Monitoring urban variables like traffic and pollution with edge devices.', tags: ['React', 'AWS IoT', 'Tailwind'] }, 
  ],
  stats: [ { value: '10+', label: 'Projects Completed' }, { value: '2+', label: 'Years Experience' }, { value: '3+', label: 'Hackathons Won' }, ],
};

// --- GLOWING WAVY DIVIDER COMPONENT ---
const GlowingWavyDivider = () => (
  <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden my-8 md:my-14 flex items-center justify-center pointer-events-none z-10">
    <svg 
      className="w-full h-8 sm:h-12 text-[#8B5CF6] drop-shadow-[0_0_15px_#8B5CF6]" 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60" 
        stroke="currentColor" 
        strokeWidth="8" 
      />
    </svg>
  </div>
);

// --- MAIN CUSTOMIZABLE PORTFOLIO COMPONENT ---
const PortfolioPage = ({
  logo = defaultData.logo,
  navLinks = defaultData.navLinks,
  resume = defaultData.resume,
  hero = defaultData.hero,
  ctaButtons = defaultData.ctaButtons,
  projects = defaultData.projects,
  stats = defaultData.stats,
  showAnimatedBackground = false,
  isEmbedded = false,
}) => {
  const [showCertificates, setShowCertificates] = useState(false);
  const [photoModal, setPhotoModal] = useState({ show: false, title: '', images: [] });
  const [selectedImage, setSelectedImage] = useState(null);
  const [leadershipIndex, setLeadershipIndex] = useState(1);
  const [projectIndex, setProjectIndex] = useState(0);
  const [projectFilter, setProjectFilter] = useState('all');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const milestonesData = [
    {
        category: "Hackathon",
        items: [
            { id: 1, title: "Best Innovation Award", role: "Hackathon Winner", location: "Erode Sengundar Engineering College", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166529/portfolio/certificates/award_cert.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166535/portfolio/certificates/hackathon_cert.jpg'] },
            { id: 2, title: "National Level Hackathon", role: "Participant & Finalist", location: "KPR Institute", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166790/portfolio/kpr_hackathon/kpr_certificate.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166771/portfolio/kpr_hackathon/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166774/portfolio/kpr_hackathon/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166778/portfolio/kpr_hackathon/img3.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166785/portfolio/kpr_hackathon/img4.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166786/portfolio/kpr_hackathon/img5.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166788/portfolio/kpr_hackathon/img6.jpg'] },
            { id: 3, title: "National Level Hackathon", role: "Participant & Finalist", location: "SRM IST", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166885/portfolio/srm_hackathon/srm_cert.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166864/portfolio/srm_hackathon/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166872/portfolio/srm_hackathon/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166874/portfolio/srm_hackathon/img3.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166875/portfolio/srm_hackathon/img4.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166877/portfolio/srm_hackathon/img5.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166878/portfolio/srm_hackathon/img6.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166880/portfolio/srm_hackathon/img7.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166882/portfolio/srm_hackathon/img8.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166884/portfolio/srm_hackathon/img9.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166866/portfolio/srm_hackathon/img10.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166868/portfolio/srm_hackathon/img11.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166869/portfolio/srm_hackathon/img12.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166871/portfolio/srm_hackathon/img13.jpg'] }
        ]
    },
    {
        category: "Paper Presentation",
        items: [
            { id: 4, title: "2× Winner", role: "Paper Presentation", location: "Salem Local Center", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166838/portfolio/salem_paper/cert1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166840/portfolio/salem_paper/cert2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166842/portfolio/salem_paper/cert3.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166844/portfolio/salem_paper/event.jpg'] },
            { id: 5, title: "2× Winner", role: "Paper Presentation", location: "Sengunthar Engineering College", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166849/portfolio/sengunthar_paper/cert1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166851/portfolio/sengunthar_paper/cert2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166853/portfolio/sengunthar_paper/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166854/portfolio/sengunthar_paper/img2.jpg'] }
        ]
    },
    {
        category: "Project",
        items: [
            { id: 6, title: "2× Winner", role: "Project Expo", location: "SONA College of Technology", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166856/portfolio/sona_expo/cert.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166857/portfolio/sona_expo/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166858/portfolio/sona_expo/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166860/portfolio/sona_expo/img3.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166862/portfolio/sona_expo/img4.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166863/portfolio/sona_expo/img5.jpg'] },
            { id: 7, title: "2× Winner", role: "Project Expo", location: "Government Engineering College Salem", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166569/portfolio/gce_expo/cert1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166571/portfolio/gce_expo/cert2.jpg'] }
        ]
    },
    {
        category: "Ideathon",
        items: [
            { id: 8, title: "1× Winner", role: "Ideathon", location: "Mahendra Engineering College", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166741/portfolio/ideathon/cert.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166743/portfolio/ideathon/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166745/portfolio/ideathon/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166763/portfolio/ideathon/img3.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166765/portfolio/ideathon/img4.jpg'] }
        ]
    },
    {
        category: "International Conference",
        items: [
            { id: 9, title: "International Conference", role: "Publication / Presentation", location: "Annapoorana Engineering College", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166504/portfolio/annapoorana/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166515/portfolio/annapoorana/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166523/portfolio/annapoorana/img3.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166526/portfolio/annapoorana/img4.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166528/portfolio/annapoorana/img5.jpg'] }
        ]
    },
    {
        category: "Non-Technical",
        items: [
            { id: 10, title: "3rd Prize", role: "Photography", location: "Dhirajlal Gandhi College of Technology", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166817/portfolio/photography/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166819/portfolio/photography/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166821/portfolio/photography/img3.jpg'] }
        ]
    },
    {
        category: "Sports",
        items: [
            { id: 11, title: "4th Prize", role: "Captain (₹4000 Cash Prize)", location: "Inter-College Cricket Tournament", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166546/portfolio/cricket/cert1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166555/portfolio/cricket/cert2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166561/portfolio/cricket/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166564/portfolio/cricket/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166565/portfolio/cricket/img3.jpg'] }
        ]
    }
  ];

  const leadershipSlides = [
    {
      id: "symposium",
      college: "Department SYMPOSIUM",
      subtitle: "PRESIDENT / EEE",
      quote: "Together We Innovate",
      tags: ["#President", "#Symposium", "#EEE"],
      image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166887/portfolio/symposium/img-1.jpg",
      emblemText: "DS",
      emblemColor: "from-blue-500 to-cyan-500",
      accentBorder: "hover:border-cyan-400",
      glowColor: "rgba(56,189,248,0.4)",
      galleryTitle: "Department SYMPOSIUM Gallery",
      galleryImages: ["https://res.cloudinary.com/oaktnbdl/image/upload/v1790166887/portfolio/symposium/img-1.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166918/portfolio/symposium/img-2.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166932/portfolio/symposium/img-3.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166933/portfolio/symposium/img-4.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166934/portfolio/symposium/img-5.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166936/portfolio/symposium/img-6.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166937/portfolio/symposium/img-7.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166940/portfolio/symposium/img-8.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166941/portfolio/symposium/img-9.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166890/portfolio/symposium/img-10.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166893/portfolio/symposium/img-11.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166898/portfolio/symposium/img-12.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166900/portfolio/symposium/img-13.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166903/portfolio/symposium/img-14.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166907/portfolio/symposium/img-15.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166909/portfolio/symposium/img-16.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166911/portfolio/symposium/img-17.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166914/portfolio/symposium/img-18.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166917/portfolio/symposium/img-19.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166921/portfolio/symposium/img-20.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166923/portfolio/symposium/img-21.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166927/portfolio/symposium/img-22.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166930/portfolio/symposium/img-23.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166942/portfolio/symposium/sympo-1.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166949/portfolio/symposium/sympo-2.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166951/portfolio/symposium/sympo-3.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166953/portfolio/symposium/sympo-4.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166954/portfolio/symposium/sympo-5.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166956/portfolio/symposium/sympo-6.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166957/portfolio/symposium/sympo-7.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166958/portfolio/symposium/sympo-8.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166960/portfolio/symposium/sympo-9.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166945/portfolio/symposium/sympo-10.jpg","https://res.cloudinary.com/oaktnbdl/image/upload/v1790166948/portfolio/symposium/sympo-11.jpg"]
    },
    {
      id: "events",
      college: "Event coordinating",
      subtitle: "QUIZ & SYMPOSIUM COORDINATOR",
      quote: "Organize to Optimize",
      tags: ["#Coordination", "#Quiz", "#Leadership"],
      image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790153613/portfolio/quiz/quiz_1.jpg",
      emblemText: "EC",
      emblemColor: "from-purple-500 to-indigo-500",
      accentBorder: "hover:border-purple-400",
      glowColor: "rgba(168,85,247,0.4)",
      galleryTitle: "Event coordinating Gallery",
      galleryImages: [
        'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153613/portfolio/quiz/quiz_1.jpg',
        'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153614/portfolio/quiz/quiz_2.jpg',
        'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153615/portfolio/quiz/quiz_3.jpg',
        'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153616/portfolio/quiz/quiz_4.jpg',
        'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153617/portfolio/quiz/quiz_5.jpg',
        'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153627/portfolio/quiz/quiz_6.jpg',
        'https://res.cloudinary.com/oaktnbdl/image/upload/v1790153632/portfolio/quiz/quiz_7.jpg',
        'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166949/portfolio/symposium/sympo-2.jpg',
        'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166951/portfolio/symposium/sympo-3.jpg',
        'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166953/portfolio/symposium/sympo-4.jpg',
        'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166954/portfolio/symposium/sympo-5.jpg'
      ]
    },
    {
      id: "sports",
      college: "Sport leading",
      subtitle: "CRICKET TEAM CAPTAIN (₹4000 CASH PRIZE)",
      quote: "Lead from the Front",
      tags: ["#Captain", "#Cricket", "#Winners"],
      image: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166561/portfolio/cricket/img1.jpg",
      emblemText: "SL",
      emblemColor: "from-amber-500 to-yellow-500",
      accentBorder: "hover:border-amber-400",
      glowColor: "rgba(245,158,11,0.4)",
      galleryTitle: "Sport leading Gallery",
      galleryImages: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166546/portfolio/cricket/cert1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166555/portfolio/cricket/cert2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166561/portfolio/cricket/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166564/portfolio/cricket/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166565/portfolio/cricket/img3.jpg']
    }
  ];

  const allProjects = [
    {
      id: "pstex",
      title: "PS TEX",
      category: "software",
      categoryLabel: "Software Projects",
      subtitle: "TEXTILE MANAGEMENT SYSTEM",
      quote: "Next-Gen Textile Commerce & Inventory",
      desc: "A comprehensive textile management system featuring real-time inventory tracking, production workflows, order management, and interactive sales analytics.",
      mediaType: "video",
      mediaSrc: "https://res.cloudinary.com/dguzreg8w/video/upload/v1784656652/portfolio/pstex.mp4",
      link: "https://ps-tex.vercel.app/",
      tags: ["#React", "#Management", "#Textiles", "#FullStack"],
      emblemText: "PT",
      emblemColor: "from-blue-500 to-cyan-500",
      isLive: true
    },
    {
      id: "ai-education",
      title: "AI Smart Education System",
      category: "software",
      categoryLabel: "Software Projects",
      subtitle: "AI & WEATHER EDTECH PLATFORM",
      quote: "Intelligent Classrooms Driven by Weather AI",
      desc: "A smart platform integrating real-time environmental weather data and predictive AI algorithms to optimize classroom schedules and learning conditions.",
      mediaType: "image",
      mediaSrc: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166502/portfolio/root/ai-smart-education.png",
      link: "https://ai-smart-education-system-1egk.vercel.app/",
      tags: ["#AI", "#Education", "#WeatherAPI", "#SmartCampus"],
      emblemText: "AI",
      emblemColor: "from-purple-500 to-indigo-500",
      isLive: true
    },
    {
      id: "sems",
      title: "Smart Employee Management System",
      category: "software",
      categoryLabel: "Software Projects",
      subtitle: "ENTERPRISE HRMS PLATFORM",
      quote: "Streamlining Workforce Intelligence & Shifts",
      desc: "An end-to-end platform for tracking employee metrics, shift workflows, performance indicators, and automated attendance reporting with enterprise security.",
      mediaType: "image",
      mediaSrc: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166847/portfolio/root/sems.png",
      link: "https://sems2026.vercel.app/",
      tags: ["#React", "#NodeJS", "#MongoDB", "#Live"],
      emblemText: "EM",
      emblemColor: "from-emerald-500 to-teal-500",
      isLive: true
    },
    {
      id: "weather-smart",
      title: "Weather Based Smart Education System",
      category: "hardware",
      categoryLabel: "Hardware Projects",
      subtitle: "IOT SENSOR SYSTEM",
      quote: "Automating Climate Adaptive Campuses",
      desc: "An IoT hardware solution dynamically optimizing learning environments based on real-time atmospheric sensor feeds and micro-climate parameters.",
      mediaType: "video",
      mediaSrc: "https://res.cloudinary.com/dguzreg8w/video/upload/v1784711065/portfolio/weather-smart-education.mp4",
      link: null,
      tags: ["#IoT", "#Arduino", "#Sensors", "#Automation"],
      emblemText: "WB",
      emblemColor: "from-cyan-500 to-blue-600",
      isLive: false
    },
    {
      id: "home-auto",
      title: "Smart Home Automation",
      category: "hardware",
      categoryLabel: "Hardware Projects",
      subtitle: "IOT APPLIANCE CONTROL",
      quote: "Wireless Precision for Modern Living",
      desc: "IoT-based wireless home automation allowing real-time remote control of high-voltage domestic appliances with instant feedback and energy monitoring.",
      mediaType: "video",
      mediaSrc: "https://res.cloudinary.com/dguzreg8w/video/upload/v1784656570/portfolio/home.mp4",
      link: null,
      tags: ["#HomeAutomation", "#ESP8266", "#Firebase", "#IoT"],
      emblemText: "SH",
      emblemColor: "from-amber-500 to-yellow-500",
      isLive: false
    },
    {
      id: "smart-irrigation",
      title: "AI-Based Smart Irrigation System",
      category: "hardware",
      categoryLabel: "Hardware Projects",
      subtitle: "AGRITECH AUTOMATION",
      quote: "Data-Driven Precision Agriculture",
      desc: "AI algorithms determining optimal watering cycles using soil moisture sensor telemetry and real-time precipitation forecast data to conserve resources.",
      mediaType: "video",
      mediaSrc: "https://res.cloudinary.com/dguzreg8w/video/upload/v1784711065/portfolio/weather-smart-education.mp4",
      link: null,
      tags: ["#AgriTech", "#AI", "#SmartFarming", "#Sensors"],
      emblemText: "SI",
      emblemColor: "from-green-500 to-emerald-600",
      isLive: false
    },
    {
      id: "lpg-gas",
      title: "LPG Gas Leakage Detector",
      category: "hardware",
      categoryLabel: "Hardware Projects",
      subtitle: "SAFETY MECHANISM",
      quote: "Critical Environmental Safety Telemetry",
      desc: "High-sensitivity safety mechanism capable of real-time air quality monitoring, instantaneous combustible gas detection, and audio-visual buzzer alarms.",
      mediaType: "image",
      mediaSrc: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
      link: null,
      tags: ["#Safety", "#GasDetector", "#Arduino", "#Hardware"],
      emblemText: "GD",
      emblemColor: "from-rose-500 to-red-600",
      isLive: false
    }
  ];

  const filteredProjects = projectFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === projectFilter);

  const totalProjects = filteredProjects.length;
  const currentProjectIdx = ((projectIndex % totalProjects) + totalProjects) % totalProjects;
  const leftPIdx = (currentProjectIdx - 1 + totalProjects) % totalProjects;
  const centerPIdx = currentProjectIdx;
  const rightPIdx = (currentProjectIdx + 1) % totalProjects;
  const visibleProjects = [
    { item: filteredProjects[leftPIdx], pos: 'left', idx: leftPIdx },
    { item: filteredProjects[centerPIdx], pos: 'center', idx: centerPIdx },
    { item: filteredProjects[rightPIdx], pos: 'right', idx: rightPIdx },
  ];

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 40) {
      setProjectIndex((prev) => (prev + 1) % totalProjects);
    } else if (distance < -40) {
      setProjectIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    }
  };

  const [showWhatsApp, setShowWhatsApp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const projectElem = document.getElementById('projects');
      if (projectElem) {
        const rect = projectElem.getBoundingClientRect();
        // Visible only when user arrives at #projects section and below (milestones, footer/contact)
        // Automatically hidden when user scrolls up to #leadership or above
        if (rect.top <= window.innerHeight * 0.55) {
          setShowWhatsApp(true);
        } else {
          setShowWhatsApp(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="bg-background text-foreground geist-font min-h-screen relative overflow-x-clip">
      {/* Inject styles required by this component */}
      <style>{`
        :root {
          --background: 0 0% 0%;
          --foreground: 0 0% 100%;
          --muted-foreground: 215 20.2% 65.1%;
          --border: 217.2 32.6% 17.5%;
          --card-foreground: 0 0% 100%;
        }
        .bg-background { background-color: hsl(var(--background)); }
        .text-foreground { color: hsl(var(--foreground)); }
        .text-muted-foreground { color: hsl(var(--muted-foreground)); }
        .bg-border { background-color: hsl(var(--border) / 0.5); }
        .border-border { border-color: hsl(var(--border)); }
        .text-card-foreground { color: hsl(var(--card-foreground)); }

        .geist-font, .inter-font { font-family: "Times New Roman", Times, serif; }

        .glass-button {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .glass-button:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .primary-button {
          background: linear-gradient(135deg, #7C3AED, #6366F1);
          color: white;
          transition: all 0.3s ease;
        }
        .primary-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.5);
        }

        .glass-card {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: transform 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.5);
        }

        .project-image {
          background: rgba(255, 255, 255, 0.05);
        }

        .skill-badge {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .gradient-text {
          background: linear-gradient(to right, #A855F7, #6366F1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float-animation {
          animation: float 4s ease-in-out infinite;
        }

        .map-pin {
          width: 36px;
          height: 36px;
          background: #8B5CF6;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
        }
        .map-pin-inner {
          width: 12px;
          height: 12px;
          background: #111;
          border-radius: 50%;
          transform: rotate(45deg);
        }

        .horizontal-scroll-container {
          display: flex;
          overflow-x: auto;
          gap: 1.25rem;
          padding-bottom: 1rem;
          padding-top: 0.5rem;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        .horizontal-scroll-container::-webkit-scrollbar {
          height: 6px;
        }
        .horizontal-scroll-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .horizontal-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .horizontal-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.9);
        }
        .horizontal-scroll-item {
          flex: 0 0 auto;
          width: 290px;
          scroll-snap-align: start;
        }
        @media (min-width: 640px) {
          .horizontal-scroll-item {
            width: 350px;
          }
        }
        @keyframes flyInPlane {
          0% {
            transform: translate(-350px, 250px) rotate(-30deg) scale(0.3);
            opacity: 0;
          }
          70% {
            transform: translate(-20px, -15px) rotate(15deg) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }
        .paper-plane-fly {
          animation: flyInPlane 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes profileDetailsReveal {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .profile-details-animated {
          opacity: 0;
          animation: profileDetailsReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) 1.2s forwards;
        }
      `}</style>

      {showAnimatedBackground && <AuroraBackground />}
      <div className="relative z-10">
        {!isEmbedded && (
          <nav className="w-full px-6 py-4">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-border backdrop-blur-md border border-border flex items-center justify-center">
                          <span className="geist-font text-sm font-bold text-foreground">{logo.initials}</span>
                      </div>
                      <span className="geist-font text-lg font-medium text-foreground">{logo.name}</span>
                  </div>
                  <div className="hidden md:flex items-center space-x-8">
                      {navLinks.map(link => (
                          <a 
                            key={link.label} 
                            href={link.href} 
                            onClick={(e) => {
                              const targetId = link.href.replace('#', '');
                              const el = document.getElementById(targetId);
                              if (el) {
                                e.preventDefault();
                                el.scrollIntoView({ behavior: 'smooth' });
                                window.location.hash = link.href;
                              }
                            }}
                            className="text-muted-foreground hover:text-foreground transition-colors inter-font text-sm"
                          >
                            {link.label}
                          </a>
                      ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={resume.onClick} className="glass-button px-4 py-2 rounded-lg text-foreground text-sm font-medium inter-font">{resume.label}</button>
                    <a
                      href="mailto:prasanthsenthilkumar09@gmail.com"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-sm font-semibold transition-all hover:scale-105"
                    >
                      <FaPaperPlane size={12} className="text-cyan-400" />
                      <span>Hire Me</span>
                    </a>
                  </div>
              </div>
          </nav>
        )}
        <section id="about" className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-12 md:py-16 overflow-x-hidden relative">
            <div className="max-w-7xl w-full mx-auto">
                
                {/* SECTION HEADER: ABOUT ME / Intro */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 px-4 border-b border-white/10 pb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-8 h-[2px] bg-cyan-400"></span>
                            <span className="text-cyan-400 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase">
                              ABOUT ME
                            </span>
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm inter-font">
                            Profile, Engineering Mindset & Professional Vision
                        </p>
                    </div>
                    <div className="text-left sm:text-right mt-3 sm:mt-0">
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 tracking-tighter uppercase geist-font drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] leading-none">
                          Intro
                        </h1>
                    </div>
                </div>

                {/* MAIN ABOUT ME GRID: Left Content & Right Fitted Portrait */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    
                    {/* RIGHT SIDE: Portrait — shows FIRST on mobile (above text), right column on desktop */}
                    <div className="order-1 lg:order-2 lg:col-span-5 flex items-end justify-center relative">
                        <div className="relative w-full max-w-xs sm:max-w-sm mx-auto h-[340px] sm:h-[420px] lg:h-[520px] flex items-end justify-center">
                            <img 
                              src="https://res.cloudinary.com/oaktnbdl/image/upload/v1790166500/portfolio/root/about-profile.png" 
                              alt="Prasanth Senthil Kumar" 
                              className="h-full max-h-[520px] w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] z-10 transition-transform duration-500 hover:scale-[1.02]"
                            />
                        </div>
                    </div>

                    {/* LEFT SIDE: Taglines, Detailed Bio, 4 Pillars & CTA — shows SECOND on mobile */}
                    <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-start text-left relative">
                        
                        {/* Get To Know Tag & Title */}
                        <div className="space-y-1 mb-3 z-10">
                            <p className="text-cyan-400 font-serif italic text-sm sm:text-base">
                              — Get To Know Me
                            </p>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white geist-font">
                              Passionate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300">AWS Cloud & DevOps</span> Engineer
                            </h2>
                        </div>

                        {/* Quote Box with Vertical Border Line */}
                        <div className="flex items-center gap-3 mb-5 pl-4 border-l-2 border-cyan-400/80 bg-gradient-to-r from-cyan-500/10 to-transparent py-2.5 rounded-r-xl w-full z-10">
                            <p className="text-gray-300 font-serif italic text-sm sm:text-base tracking-wide">
                              "Architecting resilient cloud systems & turning ideas into scalable, real-world solutions."
                            </p>
                        </div>

                        {/* Bio Glass Card */}
                        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl space-y-5 text-left relative overflow-hidden w-full">
                            
                            {/* Subtle Inner Glow */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="space-y-3">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white geist-font">
                                  Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 font-extrabold">Prasanth Senthil Kumar</span>
                                </h3>

                                <p className="text-gray-300 text-sm sm:text-base leading-relaxed inter-font">
                                  Aspiring <span className="text-white font-medium">AWS Cloud & DevOps Engineer</span> with a solid foundation in software development and systems engineering. I focus on building highly scalable, reliable, and automated cloud infrastructures that empower modern applications.
                                </p>

                                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed inter-font">
                                  Passionate about continuous deployment, containerization, and cloud-native computing. I thrive on translating engineering concepts into practical, production-ready solutions and solving challenging real-world problems.
                                </p>
                            </div>

                            <div className="border-t border-white/10 pt-5">
                                {/* 4 Pillars Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                                    <div className="flex flex-col items-start space-y-1 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                        <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-cyan-400 mb-1">
                                            <FaGraduationCap size={18} />
                                        </div>
                                        <span className="text-xs font-semibold text-white geist-font">Student</span>
                                        <span className="text-[10px] text-gray-400 inter-font">B.E. (2023 - 2027)</span>
                                    </div>

                                    <div className="flex flex-col items-start space-y-1 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                        <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-1">
                                            <FaCloud size={18} />
                                        </div>
                                        <span className="text-xs font-semibold text-white geist-font">Cloud & DevOps</span>
                                        <span className="text-[10px] text-gray-400 inter-font">AWS · CI/CD · Docker</span>
                                    </div>

                                    <div className="flex flex-col items-start space-y-1 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                        <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-cyan-400 mb-1">
                                            <FaLightbulb size={18} />
                                        </div>
                                        <span className="text-xs font-semibold text-white geist-font">Problem Solver</span>
                                        <span className="text-[10px] text-gray-400 inter-font">Scalable Solutions</span>
                                    </div>

                                    <div className="flex flex-col items-start space-y-1 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                        <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-1">
                                            <FaRocket size={18} />
                                        </div>
                                        <span className="text-xs font-semibold text-white geist-font">Continuous</span>
                                        <span className="text-[10px] text-gray-400 inter-font">Learner & Innovator</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Action CTA Buttons */}
                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <button 
                                  onClick={() => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                                >
                                    <span>Explore Projects</span>
                                    <FaArrowUp className="rotate-45" size={11} />
                                </button>

                                <a 
                                  href="/resume.pdf" 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
                                >
                                    <FaFolder size={12} className="text-cyan-400" />
                                    <span>Resume</span>
                                </a>

                                <div className="flex items-center gap-2 ml-auto">
                                    <a 
                                      href="https://linkedin.com/in/prasanth-senthil-kumar-333s151/" 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600/20 text-gray-300 hover:text-white border border-white/10 hover:border-blue-500/50 transition-all"
                                      title="LinkedIn"
                                    >
                                        <FiLinkedin size={16} />
                                    </a>
                                    <a 
                                      href="https://github.com/PRASANTH-7-SENTHIL" 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/20 text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition-all"
                                      title="GitHub"
                                    >
                                        <FiGithub size={16} />
                                    </a>
                                    <a 
                                      href="https://www.instagram.com/dhoni_prasanth7_07/" 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="p-2.5 rounded-xl bg-white/5 hover:bg-pink-600/20 text-gray-300 hover:text-white border border-white/10 hover:border-pink-500/40 transition-all"
                                      title="Instagram"
                                    >
                                        <FiInstagram size={16} />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>



            </div>
        </section>


                <div id="technical-skills" className="max-w-7xl mx-auto mb-20 px-4 sm:px-6 relative">

                  {/* Section Header */}
                  <div className="text-center mb-12 relative">
                    {/* Left italic quote */}
                    <div className="absolute left-0 top-0 text-left hidden lg:block">
                      <p className="text-muted-foreground inter-font text-[11px] font-mono tracking-[0.25em] leading-loose uppercase opacity-70">
                        "Skills<br/>Turn Ideas<br/>Into Reality"
                      </p>
                      <div className="w-8 h-[1.5px] bg-muted-foreground/50 mt-2" />
                    </div>
                    {/* Top badge */}
                    <div className="inline-flex items-center justify-center border border-cyan-500/50 rounded-full px-5 py-1 mb-5">
                      <span className="text-cyan-400 font-mono text-[11px] tracking-[0.35em] uppercase">Skills</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black geist-font leading-tight">
                      Technical <span className="text-cyan-400">Skills</span>
                    </h2>
                    <p className="text-muted-foreground inter-font text-sm sm:text-base mt-3 max-w-xl mx-auto">
                      Tools and technologies I work with to build, learn and innovate.
                    </p>
                    <div className="w-14 h-0.5 bg-cyan-500/60 mx-auto mt-4" />
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {/* Cloud / DevOps */}
                    <div className="relative rounded-2xl border border-blue-500/40 bg-gradient-to-br from-blue-950/50 to-slate-950/70 p-5 overflow-hidden group transition-all hover:border-blue-400/70 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]">
                      <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-3 mb-5 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0">
                          <FaAws size={24} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold geist-font text-base sm:text-lg leading-tight">Cloud / DevOps</h3>
                          <p className="text-blue-400/80 text-[11px] inter-font mt-0.5 tracking-wide">Build · Deploy · Scale</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {[
                          {name:"AWS", icon:<FaAws />, color:"text-orange-400"},
                          {name:"EC2", icon:<FaServer />, color:"text-orange-300"},
                          {name:"S3", icon:<FaDatabase />, color:"text-red-400"},
                          {name:"IAM", icon:<FaUserShield />, color:"text-green-400"},
                          {name:"CloudWatch", icon:<FaChartLine />, color:"text-blue-400"},
                          {name:"VPC", icon:<FaNetworkWired />, color:"text-purple-400"},
                          {name:"RDS", icon:<FaDatabase />, color:"text-blue-300"},
                        ].map(s => (
                          <span key={s.name} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs text-gray-300 inter-font hover:border-blue-500/50 transition-colors cursor-default">
                            <span className={s.color + " text-sm"}>{s.icon}</span>{s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Programming */}
                    <div className="relative rounded-2xl border border-green-500/40 bg-gradient-to-br from-green-950/50 to-slate-950/70 p-5 overflow-hidden group transition-all hover:border-green-400/70 hover:shadow-[0_0_25px_rgba(34,197,94,0.15)]">
                      <div className="absolute inset-0 rounded-2xl bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-3 mb-5 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-green-500/15 border border-green-500/40 flex items-center justify-center text-green-400 flex-shrink-0">
                          <FaCode size={22} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold geist-font text-base sm:text-lg leading-tight">Programming</h3>
                          <p className="text-green-400/80 text-[11px] inter-font mt-0.5 tracking-wide">Code · Create · Solve</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {[
                          {name:"Python", icon:<FaPython />, color:"text-yellow-400"},
                          {name:"JavaScript", icon:<FaJs />, color:"text-yellow-300"},
                          {name:"HTML", icon:<FaHtml5 />, color:"text-orange-500"},
                          {name:"CSS", icon:<FaCss3Alt />, color:"text-blue-400"},
                        ].map(s => (
                          <span key={s.name} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs text-gray-300 inter-font hover:border-green-500/50 transition-colors cursor-default">
                            <span className={s.color + " text-sm"}>{s.icon}</span>{s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AI / GenAI */}
                    <div className="relative rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-950/50 to-slate-950/70 p-5 overflow-hidden group transition-all hover:border-purple-400/70 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]">
                      <div className="absolute inset-0 rounded-2xl bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-3 mb-5 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-400 flex-shrink-0">
                          <FaMicrochip size={22} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold geist-font text-base sm:text-lg leading-tight">AI / GenAI</h3>
                          <p className="text-purple-400/80 text-[11px] inter-font mt-0.5 tracking-wide">Explore · Build · Innovate</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {[
                          {name:"Generative AI", icon:<FaMicrochip />, color:"text-purple-400"},
                          {name:"RAG", icon:<FaDatabase />, color:"text-blue-400"},
                          {name:"Vectorless RAG", icon:<FaServer />, color:"text-cyan-400"},
                          {name:"Hugging Face", icon:<FaRobot />, color:"text-yellow-400"},
                          {name:"LLMs", icon:<FaCodeBranch />, color:"text-green-400"},
                        ].map(s => (
                          <span key={s.name} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs text-gray-300 inter-font hover:border-purple-500/50 transition-colors cursor-default">
                            <span className={s.color + " text-sm"}>{s.icon}</span>{s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Databases */}
                    <div className="relative rounded-2xl border border-orange-500/40 bg-gradient-to-br from-orange-950/50 to-slate-950/70 p-5 overflow-hidden group transition-all hover:border-orange-400/70 hover:shadow-[0_0_25px_rgba(249,115,22,0.15)]">
                      <div className="absolute inset-0 rounded-2xl bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-3 mb-5 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/40 flex items-center justify-center text-orange-400 flex-shrink-0">
                          <FaDatabase size={22} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold geist-font text-base sm:text-lg leading-tight">Databases</h3>
                          <p className="text-orange-400/80 text-[11px] inter-font mt-0.5 tracking-wide">Store · Manage · Retrieve</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {[
                          {name:"Firebase", icon:<SiFirebase />, color:"text-yellow-400"},
                          {name:"MySQL", icon:<SiMysql />, color:"text-blue-400"},
                        ].map(s => (
                          <span key={s.name} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs text-gray-300 inter-font hover:border-orange-500/50 transition-colors cursor-default">
                            <span className={s.color + " text-sm"}>{s.icon}</span>{s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tools */}
                    <div className="relative rounded-2xl border border-red-500/40 bg-gradient-to-br from-red-950/50 to-slate-950/70 p-5 overflow-hidden group transition-all hover:border-red-400/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]">
                      <div className="absolute inset-0 rounded-2xl bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-3 mb-5 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/40 flex items-center justify-center text-red-400 flex-shrink-0">
                          <FaTools size={22} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold geist-font text-base sm:text-lg leading-tight">Tools</h3>
                          <p className="text-red-400/80 text-[11px] inter-font mt-0.5 tracking-wide">Develop · Integrate · Automate</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {[
                          {name:"Git", icon:<FaGit />, color:"text-orange-500"},
                          {name:"GitHub", icon:<FaGithub />, color:"text-gray-200"},
                          {name:"Docker", icon:<FaDocker />, color:"text-blue-400"},
                          {name:"VS Code", icon:<FaCode />, color:"text-blue-500"},
                          {name:"Arduino IDE", icon:<SiArduino />, color:"text-cyan-400"},
                          {name:"ThingSpeak", icon:<FaChartBar />, color:"text-blue-300"},
                          {name:"Twilio", icon:<SiTwilio />, color:"text-red-400"},
                          {name:"N8N", icon:<FaCodeBranch />, color:"text-orange-400"},
                          {name:"Cloudinary", icon:<FaCloud />, color:"text-blue-400"},
                        ].map(s => (
                          <span key={s.name} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs text-gray-300 inter-font hover:border-red-500/50 transition-colors cursor-default">
                            <span className={s.color + " text-sm"}>{s.icon}</span>{s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Other Skills */}
                    <div className="relative rounded-2xl border border-teal-500/40 bg-gradient-to-br from-teal-950/50 to-slate-950/70 p-5 overflow-hidden group transition-all hover:border-teal-400/70 hover:shadow-[0_0_25px_rgba(20,184,166,0.15)]">
                      <div className="absolute inset-0 rounded-2xl bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-3 mb-5 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-500/40 flex items-center justify-center text-teal-400 flex-shrink-0">
                          <FaUsers size={22} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold geist-font text-base sm:text-lg leading-tight">Other Skills</h3>
                          <p className="text-teal-400/80 text-[11px] inter-font mt-0.5 tracking-wide">Learn · Lead · Collaborate</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {[
                          {name:"Linux", icon:<FaLinux />, color:"text-yellow-400"},
                          {name:"R&D", icon:<FaFlask />, color:"text-orange-400"},
                          {name:"Leadership", icon:<FaUserTie />, color:"text-blue-400"},
                          {name:"People Management", icon:<FaUsers />, color:"text-teal-400"},
                          {name:"Communication", icon:<FaComments />, color:"text-green-400"},
                          {name:"Teamwork", icon:<FaHandsHelping />, color:"text-purple-400"},
                        ].map(s => (
                          <span key={s.name} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs text-gray-300 inter-font hover:border-teal-500/50 transition-colors cursor-default">
                            <span className={s.color + " text-sm"}>{s.icon}</span>{s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Footer label */}
                  <div className="text-center mt-10">
                    <span className="text-muted-foreground/60 font-mono text-[11px] tracking-[0.4em] uppercase">— Continuously Learning —</span>
                  </div>
                </div>


                {/* Internship Experience */}
                <div id="internship" className="max-w-6xl mx-auto mb-20 px-4 sm:px-6 relative">
                    {/* Section Header */}
                    <div className="text-center mb-12 relative">
                        <div className="inline-flex items-center justify-center border border-cyan-500/50 rounded-full px-5 py-1 mb-5">
                            <span className="text-cyan-400 font-mono text-[11px] tracking-[0.35em] uppercase">Experience</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black geist-font leading-tight text-white">
                            Internship <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">Experience</span>
                        </h2>
                        <p className="text-muted-foreground inter-font text-sm sm:text-base mt-3 max-w-xl mx-auto">
                            Hands-on industrial engineering and electrical maintenance exposure at SAIL.
                        </p>
                        <div className="w-14 h-0.5 bg-cyan-500/60 mx-auto mt-4" />
                    </div>

                    <div className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#060D1A] via-[#040814] to-[#02050A] p-6 sm:p-10 text-left shadow-[0_0_50px_rgba(6,182,212,0.12)] hover:border-cyan-400/60 transition-all overflow-hidden group">
                        {/* Ambient Cyan Glow */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />

                        {/* Left Gradient Accent Bar */}
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-teal-400 shadow-[0_0_15px_rgba(6,182,212,0.6)]"></div>

                        {/* Header Tag */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            <span>Industrial Internship</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black geist-font text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 mb-1 tracking-tight">
                            Salem Steel Plant
                        </h3>
                        <p className="text-sm sm:text-base text-gray-400 font-medium inter-font mb-6 flex flex-wrap items-center gap-2">
                            <span>Steel Authority of India Limited (SAIL)</span>
                            <span className="hidden sm:inline w-1 h-1 rounded-full bg-cyan-400"></span>
                            <span className="text-cyan-400/90 font-mono text-xs">Govt. of India Enterprise</span>
                        </p>
                        
                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 relative z-10">
                            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-colors">
                                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">Role</span>
                                <span className="text-xs sm:text-sm font-semibold text-white geist-font">Intern (Electrical Maintenance)</span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-colors">
                                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">Duration</span>
                                <span className="text-xs sm:text-sm font-semibold text-white geist-font">11-12-2025 to 24-12-2025</span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-colors">
                                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">Session</span>
                                <span className="text-xs sm:text-sm font-semibold text-white geist-font">2:00 PM – 5:00 PM</span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-colors">
                                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">Location</span>
                                <span className="text-xs sm:text-sm font-semibold text-white geist-font">Salem, Tamil Nadu</span>
                            </div>
                        </div>

                        {/* View Certificate Button */}
                        <button 
                            onClick={() => setShowCertificates(true)} 
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 transition-all cursor-pointer flex items-center gap-2 border border-cyan-400/40 relative z-10"
                        >
                            <FaFolder size={13} className="text-white" />
                            <span>View Certificate</span>
                        </button>
                    </div>
                </div>


                {/* Leadership & Impact Section - Exact Match to Reference Design */}
                <div id="leadership" className="max-w-7xl mx-auto mb-20 px-4 sm:px-6">
                  <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#060D1A] via-[#040814] to-[#02050A] border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.18)] p-6 sm:p-10 lg:p-12">
                    
                    {/* Background ambient lighting */}
                    <div className="absolute top-0 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />
                    <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none" />

                    {/* Main Grid: Left content (68%) & Right portrait (32%) */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                      
                      {/* LEFT COLUMN: Header + Carousel + Pillars */}
                      <div className="lg:col-span-8 flex flex-col justify-between">
                        
                        {/* Top Header */}
                        <div>
                          <p className="text-slate-400 font-mono text-[10px] sm:text-xs tracking-[0.28em] uppercase mb-1 font-medium">
                            DEPARTMENT OF
                          </p>
                          <p className="text-slate-400 font-mono text-[10px] sm:text-xs tracking-[0.28em] uppercase mb-2 font-medium">
                            ELECTRICAL AND ELECTRONICS ENGINEERING
                          </p>
                          
                          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black geist-font uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-200 to-blue-500 leading-tight drop-shadow-[0_12px_35px_rgba(56,189,248,0.5)] mt-1 select-none">
                            Leadership Skill
                          </h2>

                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-4 text-cyan-400 font-mono text-[10px] sm:text-xs tracking-[0.24em] uppercase">
                            <span>TEAMWORK</span>
                            <span className="text-cyan-600/60 font-bold">|</span>
                            <span>LEADERSHIP</span>
                            <span className="text-cyan-600/60 font-bold">|</span>
                            <span>COORDINATION</span>
                            <span className="text-cyan-600/60 font-bold">|</span>
                            <span>INNOVATION</span>
                            <span className="text-cyan-600/60 font-bold">|</span>
                            <span>IMPACT</span>
                          </div>
                        </div>

                        {/* Three Leadership Containers */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 my-8 sm:my-10">
                          {leadershipSlides.map((item, idx) => {
                            const isSelected = leadershipIndex === idx;
                            return (
                              <div
                                key={item.id}
                                onClick={() => {
                                  setLeadershipIndex(idx);
                                  setPhotoModal({
                                    show: true,
                                    title: item.galleryTitle,
                                    images: item.galleryImages,
                                  });
                                }}
                                className={`group relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer overflow-hidden border ${
                                  isSelected
                                    ? 'border-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.4),inset_0_0_15px_rgba(56,189,248,0.15)] bg-gradient-to-b from-[#0C1A32] to-[#070F1E] scale-[1.02]'
                                    : 'border-white/10 hover:border-cyan-400/60 bg-[#0B1424]/90 hover:bg-[#0C1A32]/80 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] hover:scale-[1.02]'
                                }`}
                              >
                                {/* Background subtle shine */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 group-hover:bg-cyan-400/15 rounded-full blur-2xl transition-all pointer-events-none" />

                                <div>
                                  {/* Photo Thumbnail */}
                                  <div className="relative rounded-xl overflow-hidden mb-3.5 h-36 sm:h-40 border border-white/10 group-hover:border-cyan-400/40 transition-colors">
                                    <img
                                      src={item.image}
                                      alt={item.college}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                                    
                                    {/* Photo count badge */}
                                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 text-cyan-300 text-[10px] font-mono font-semibold group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-400 transition-all shadow-md">
                                      <FaFolder size={10} />
                                      <span>{item.galleryImages.length} Photos</span>
                                    </div>
                                  </div>

                                  {/* Emblem + Title */}
                                  <div className="flex items-center gap-2.5 mb-2.5">
                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${item.emblemColor} flex items-center justify-center text-white font-black text-xs shadow-md flex-shrink-0 border border-white/20 group-hover:scale-110 transition-transform`}>
                                      {item.emblemText}
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="text-white font-bold geist-font text-sm sm:text-base tracking-wide truncate group-hover:text-cyan-300 transition-colors">
                                        {item.college}
                                      </h4>
                                      <p className="text-[10px] tracking-wider text-cyan-300/90 uppercase font-mono truncate">
                                        {item.subtitle}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Quote */}
                                  <p className="text-xs font-serif italic text-slate-300 mb-3 line-clamp-2">
                                    "{item.quote}"
                                  </p>
                                </div>

                                {/* Tags & Action Button */}
                                <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                                  <div className="flex flex-wrap gap-1">
                                    {item.tags.map((t) => (
                                      <span
                                        key={t}
                                        className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 group-hover:border-cyan-400/30 group-hover:text-cyan-200 transition-colors"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>

                                  <button
                                    type="button"
                                    className="w-full py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-400/40 hover:border-cyan-400 text-cyan-300 hover:text-black text-xs font-bold font-mono tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
                                  >
                                    <FaFolder size={11} />
                                    <span>OPEN PHOTOS</span>
                                    <FaExternalLinkAlt size={9} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Bottom 4 Pillars / Metrics Strip */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                              <FaUsers size={18} />
                            </div>
                            <div>
                              <h4 className="text-white font-bold geist-font text-xs sm:text-sm tracking-wider uppercase">PEOPLE</h4>
                              <p className="text-slate-400 inter-font text-[10px] sm:text-xs">Build Teams</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 flex-shrink-0">
                              <FaLightbulb size={18} />
                            </div>
                            <div>
                              <h4 className="text-white font-bold geist-font text-xs sm:text-sm tracking-wider uppercase">IDEAS</h4>
                              <p className="text-slate-400 inter-font text-[10px] sm:text-xs">Bring Ideas</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                              <FaCog size={18} />
                            </div>
                            <div>
                              <h4 className="text-white font-bold geist-font text-xs sm:text-sm tracking-wider uppercase">EXECUTION</h4>
                              <p className="text-slate-400 inter-font text-[10px] sm:text-xs">Make It Happen</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-300 flex-shrink-0">
                              <FaChartLine size={18} />
                            </div>
                            <div>
                              <h4 className="text-white font-bold geist-font text-xs sm:text-sm tracking-wider uppercase">GROWTH</h4>
                              <p className="text-slate-400 inter-font text-[10px] sm:text-xs">Create Impact</p>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* RIGHT COLUMN: Quote + Cutout Portrait + Student Leader Plate */}
                      <div className="lg:col-span-4 relative flex flex-col justify-between items-center lg:items-end mt-8 lg:mt-0">
                        
                        {/* Quote */}
                        <div className="self-end text-right pr-2 sm:pr-6 z-10 mb-4">
                          <div className="w-8 h-[2px] bg-slate-500/70 ml-auto mb-2" />
                          <p className="text-slate-300 font-serif tracking-[0.2em] text-xs sm:text-sm uppercase leading-relaxed font-medium">
                            "A LEADER<br />
                            EMPOWERS<br />
                            <span className="text-cyan-400 font-bold">OTHERS"</span>
                          </p>
                        </div>

                        {/* Cutout Portrait */}
                        <div className="relative w-full flex justify-center lg:justify-end items-end h-[360px] sm:h-[440px] lg:h-[520px]">
                          <img
                            src="https://res.cloudinary.com/oaktnbdl/image/upload/v1790166500/portfolio/root/about-profile.png"
                            alt="President Prasanth Senthil"
                            className="h-full object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] z-10 transition-transform duration-500 hover:scale-[1.02]"
                          />
                        </div>

                        {/* Stylized Angled "Student Leader" Plate in Bottom-Right Corner */}
                        <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 lg:-bottom-12 lg:-right-12 z-20 pointer-events-none">
                          <div className="relative bg-gradient-to-br from-slate-600/90 via-slate-700/90 to-slate-900 border-t-2 border-l-2 border-cyan-400/70 shadow-[0_0_25px_rgba(6,182,212,0.3)] pl-8 pr-12 pt-6 pb-8 rounded-tl-3xl transform rotate-[-3deg] skew-x-[-4deg]">
                            <div className="transform rotate-[3deg] skew-x-[4deg] text-left">
                              <span
                                className="block text-3xl sm:text-4xl font-serif italic text-cyan-100 tracking-wide leading-none"
                                style={{ fontFamily: '"Brush Script MT", "Caveat", "Segoe Script", cursive' }}
                              >
                                Student
                              </span>
                              <span
                                className="block text-2xl sm:text-3xl font-serif italic text-cyan-400 tracking-wide leading-none mt-1 pl-4"
                                style={{ fontFamily: '"Brush Script MT", "Caveat", "Segoe Script", cursive' }}
                              >
                                Leader
                              </span>
                              <svg className="w-24 sm:w-32 h-3 text-cyan-400 mt-1" viewBox="0 0 100 12" fill="none">
                                <path d="M2,8 Q40,2 98,6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                              </svg>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                </div>

                {/* Featured Projects — 3D Coverflow Carousel Section */}
                <div id="projects" className="max-w-7xl mx-auto mb-16 sm:mb-20 px-3 sm:px-6 scroll-mt-24 sm:scroll-mt-28">
                    {/* Section Header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center border border-purple-500/40 bg-purple-500/10 rounded-full px-4 py-1 mb-2.5">
                            <span className="text-purple-300 font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase">Interactive Showcase</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black geist-font text-white leading-tight">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">Projects</span>
                        </h2>
                        <p className="text-slate-400 inter-font text-xs sm:text-sm mt-1.5 max-w-lg mx-auto px-2">
                            Cutting-edge full-stack software applications and IoT hardware systems. Swipe or click arrows to explore one by one.
                        </p>

                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-5">
                            {[
                                { key: 'all', label: 'All Projects', count: allProjects.length },
                                { key: 'software', label: 'Software', count: allProjects.filter(p => p.category === 'software').length },
                                { key: 'hardware', label: 'Hardware & IoT', count: allProjects.filter(p => p.category === 'hardware').length },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => {
                                        setProjectFilter(tab.key);
                                        setProjectIndex(0);
                                    }}
                                    className={`px-3 sm:px-4 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                                        projectFilter === tab.key
                                            ? 'bg-purple-500/25 text-purple-200 border-purple-400/80 shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105'
                                            : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/25'
                                    }`}
                                >
                                    {tab.label} <span className="text-[10px] opacity-75">({tab.count})</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 3D Coverflow Carousel Container with Touch Swipe */}
                    <div 
                        className="relative my-3 sm:my-6 max-w-4xl lg:max-w-5xl mx-auto touch-pan-y"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Ambient Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none rounded-3xl" />

                        {/* Prev Button */}
                        <button
                            onClick={() => setProjectIndex((prev) => (prev - 1 + totalProjects) % totalProjects)}
                            className="absolute -left-1 sm:-left-3 md:-left-5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border border-purple-400/70 bg-[#090414]/90 backdrop-blur-md flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-600/30 hover:scale-110 transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)] cursor-pointer"
                            title="Previous Project"
                            aria-label="Previous Project"
                        >
                            <FaChevronLeft size={13} />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={() => setProjectIndex((prev) => (prev + 1) % totalProjects)}
                            className="absolute -right-1 sm:-right-3 md:-right-5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border border-purple-400/70 bg-[#090414]/90 backdrop-blur-md flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-600/30 hover:scale-110 transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)] cursor-pointer"
                            title="Next Project"
                            aria-label="Next Project"
                        >
                            <FaChevronRight size={13} />
                        </button>

                        {/* 3 Visible Cards */}
                        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 px-1 sm:px-4 overflow-hidden min-h-[390px] sm:min-h-[420px]">
                            {visibleProjects.map(({ item, pos, idx }) => {
                                const isCenter = pos === 'center';
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => !isCenter && setProjectIndex(idx)}
                                        className={`transition-all duration-500 flex flex-col justify-between ${
                                            isCenter
                                                ? 'w-[92%] sm:w-[54%] md:w-[48%] lg:w-[44%] max-w-[430px] z-20 scale-100 rounded-2xl sm:rounded-3xl border-2 border-purple-500/80 shadow-[0_0_35px_rgba(139,92,246,0.35),inset_0_0_15px_rgba(139,92,246,0.12)] bg-gradient-to-b from-[#140b25] via-[#0d071a] to-[#07030e] p-3.5 sm:p-5'
                                                : 'hidden sm:flex sm:w-[22%] md:w-[21%] z-10 scale-90 opacity-55 hover:opacity-85 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0c0617]/90 p-3 sm:p-3.5 cursor-pointer'
                                        }`}
                                    >
                                        {/* Media Thumbnail */}
                                        <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden mb-3 border border-white/10 ${isCenter ? 'h-36 sm:h-40 md:h-44' : 'h-28 sm:h-32 md:h-36'}`}>
                                            {item.mediaType === 'video' ? (
                                                <video
                                                    src={item.mediaSrc}
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    webkit-playsinline="true"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <img
                                                    src={item.mediaSrc}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                                            
                                            {/* Category / Live Badge */}
                                            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                                                <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-purple-300 border border-purple-400/40 shadow-sm">
                                                    {item.categoryLabel}
                                                </span>
                                                {item.isLive && (
                                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 flex items-center gap-1 shadow-sm">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                        Live
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Emblem + Title */}
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr ${item.emblemColor} flex items-center justify-center text-white font-black text-xs shadow-md flex-shrink-0 border border-white/20`}>
                                                {item.emblemText}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-white font-bold geist-font text-sm sm:text-base md:text-lg tracking-wide truncate">
                                                    {item.title}
                                                </h4>
                                                <p className="text-[9px] sm:text-[10px] tracking-widest text-purple-300 uppercase font-mono truncate">
                                                    {item.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Quote / Headline */}
                                        <p className="text-xs sm:text-[13px] font-serif italic text-purple-100/90 mb-1.5 line-clamp-1">
                                            "{item.quote}"
                                        </p>

                                        {/* Detailed Description */}
                                        <p className="text-[11px] sm:text-xs text-slate-300/90 inter-font leading-relaxed mb-3 line-clamp-2">
                                            {item.desc}
                                        </p>

                                        {/* Tags & Action */}
                                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-white/10">
                                            <div className="flex flex-wrap gap-1">
                                                {item.tags.map((t) => (
                                                    <span
                                                        key={t}
                                                        className={`text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-md ${
                                                            isCenter
                                                                ? 'bg-purple-500/15 border border-purple-400/30 text-purple-200 font-semibold'
                                                                : 'bg-white/5 border border-white/10 text-slate-400'
                                                        }`}
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            {isCenter && item.link ? (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-[11px] sm:text-xs font-mono tracking-wide flex items-center gap-1.5 transition-all hover:scale-105 shadow-[0_0_12px_rgba(139,92,246,0.5)] cursor-pointer ml-auto"
                                                >
                                                    <span>LIVE DEMO</span>
                                                    <FaExternalLinkAlt size={9} />
                                                </a>
                                            ) : isCenter ? (
                                                <span className="text-[9px] sm:text-[10px] font-mono text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2 py-1 rounded-lg ml-auto">
                                                    Hardware System
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Mobile Swipe Hint */}
                        <div className="sm:hidden text-center mt-2.5 text-[10px] text-purple-300/70 font-mono tracking-widest flex items-center justify-center gap-1.5">
                            <span>← SWIPE TO EXPLORE →</span>
                        </div>

                        {/* Pagination Indicator Pills */}
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5">
                            {filteredProjects.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setProjectIndex(idx)}
                                    className={`h-1.5 transition-all rounded-full cursor-pointer ${
                                        idx === currentProjectIdx
                                            ? 'w-7 sm:w-9 bg-gradient-to-r from-purple-500 to-indigo-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]'
                                            : 'w-3 sm:w-4 bg-white/20 hover:bg-white/40'
                                    }`}
                                    title={`Go to project ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Career Journey — Road Map */}
                <div id="milestones" className="max-w-7xl mx-auto mb-20 px-4 sm:px-6">
                    <CareerJourney setPhotoModal={setPhotoModal} />
                </div>
            </div>

        {/* Footer Section */}
        <footer className="w-full border-t border-white/10 bg-black/40 backdrop-blur-lg py-12 px-4 sm:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              
              {/* Brand & About */}
              <div className="md:col-span-1 flex flex-col space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                    PS
                  </div>
                  <span className="geist-font text-xl font-bold text-white tracking-wide">Prasanth S</span>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm inter-font leading-relaxed">
                  AWS Cloud & DevOps Engineer | Software Engineer (Fresher) passionate about building scalable cloud solutions and innovative IoT systems.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <a href="https://linkedin.com/in/prasanth-senthil-kumar-333s151/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#0A66C2] transition-all border border-white/10" title="LinkedIn">
                    <FiLinkedin size={18} />
                  </a>
                  <a href="https://github.com/PRASANTH-7-SENTHIL" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#333] transition-all border border-white/10" title="GitHub">
                    <FiGithub size={18} />
                  </a>
                  <a href="https://www.instagram.com/dhoni_prasanth7_07/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-white hover:bg-pink-600/30 transition-all border border-white/10" title="Instagram">
                    <FiInstagram size={18} />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col space-y-3 text-left">
                <h4 className="text-white font-bold geist-font text-base tracking-wide border-b border-white/10 pb-2">Quick Links</h4>
                <a href="#about" className="text-muted-foreground hover:text-[#A855F7] transition-colors text-xs sm:text-sm inter-font">About Me</a>
                <a href="#technical-skills" className="text-muted-foreground hover:text-[#A855F7] transition-colors text-xs sm:text-sm inter-font">Technical Skills</a>
                <a href="#internship" className="text-muted-foreground hover:text-[#A855F7] transition-colors text-xs sm:text-sm inter-font">Internship</a>
                <a href="#leadership" className="text-muted-foreground hover:text-[#A855F7] transition-colors text-xs sm:text-sm inter-font">Leadership</a>
                <a href="#projects" className="text-muted-foreground hover:text-[#A855F7] transition-colors text-xs sm:text-sm inter-font">Featured Projects</a>
                <a href="#milestones" className="text-muted-foreground hover:text-[#A855F7] transition-colors text-xs sm:text-sm inter-font">Milestones & Awards</a>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col space-y-3 text-left">
                <h4 className="text-white font-bold geist-font text-base tracking-wide border-b border-white/10 pb-2">Contact Details</h4>
                <div className="flex items-center gap-3 text-muted-foreground text-xs sm:text-sm inter-font">
                  <FaEnvelope className="text-[#A855F7] flex-shrink-0" />
                  <a href="mailto:prasanthsenthilkumar09@gmail.com" className="hover:text-white transition-colors break-all">prasanthsenthilkumar09@gmail.com</a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-xs sm:text-sm inter-font">
                  <FaPhoneAlt className="text-[#A855F7] flex-shrink-0" />
                  <a href="tel:+917200608333" className="hover:text-white transition-colors">+91 7200608333</a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-xs sm:text-sm inter-font">
                  <FaMapMarkerAlt className="text-[#A855F7] flex-shrink-0" />
                  <span>Salem, Tamil Nadu, India</span>
                </div>
              </div>

              {/* Resume & Call To Action */}
              <div className="flex flex-col space-y-4 text-left">
                <h4 className="text-white font-bold geist-font text-base tracking-wide border-b border-white/10 pb-2">Resume & Connect</h4>
                <p className="text-muted-foreground text-xs sm:text-sm inter-font">
                  Looking for a dedicated AWS Cloud & DevOps Engineer? Feel free to download my resume or get in touch!
                </p>
                <button onClick={() => window.open('/resume.pdf', '_blank')} className="primary-button px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 w-full">
                  Download Resume
                </button>
              </div>

            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground inter-font">
              <p>© {new Date().getFullYear()} Prasanth Senthil Kumar. All rights reserved.</p>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                Back to Top <FaArrowUp size={12} />
              </button>
            </div>
          </div>
        </footer>

      {showCertificates && (
        <div 
          onClick={() => setShowCertificates(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#0F172A] to-[#020617] border border-cyan-500/40 rounded-2xl p-4 sm:p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] cursor-default"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white geist-font">Internship Certificates</h2>
                <p className="text-[11px] sm:text-xs text-cyan-400 font-mono mt-0.5">Tap certificate to view full screen</p>
              </div>
              <button 
                onClick={() => setShowCertificates(false)} 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-cyan-400 text-2xl font-bold flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                title="Close"
              >
                &times;
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-6">
                <div 
                  onClick={() => setSelectedImage("https://res.cloudinary.com/oaktnbdl/image/upload/v1790166768/portfolio/internship/internship-1.jpg")}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400 bg-black/40 cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02]"
                >
                  <img src="https://res.cloudinary.com/oaktnbdl/image/upload/v1790166768/portfolio/internship/internship-1.jpg" alt="Certificate 1" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div 
                  onClick={() => setSelectedImage("https://res.cloudinary.com/oaktnbdl/image/upload/v1790166769/portfolio/internship/internship-2.jpg")}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400 bg-black/40 cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02]"
                >
                  <img src="https://res.cloudinary.com/oaktnbdl/image/upload/v1790166769/portfolio/internship/internship-2.jpg" alt="Certificate 2" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Gallery Modal */}
      {photoModal.show && (
        <div 
          onClick={() => setPhotoModal({ show: false, title: '', images: [] })}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#0F172A] to-[#020617] border border-cyan-500/40 rounded-2xl p-4 sm:p-6 shadow-[0_0_60px_rgba(6,182,212,0.25)] cursor-default"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10 sticky top-0 bg-[#0F172A]/95 backdrop-blur-md z-10 -mx-4 px-4 sm:-mx-6 sm:px-6 pt-1">
              <div>
                <h2 className="text-base sm:text-2xl font-bold text-white geist-font leading-snug">
                  {photoModal.title}
                </h2>
                <p className="text-[10px] sm:text-xs text-cyan-400 font-mono mt-0.5">
                  {photoModal.images.length} Photos · Tap image to view full screen
                </p>
              </div>
              <button 
                onClick={() => setPhotoModal({ show: false, title: '', images: [] })} 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-cyan-400 text-2xl font-bold flex items-center justify-center cursor-pointer transition-transform hover:scale-105 flex-shrink-0"
                title="Close gallery"
              >
                &times;
              </button>
            </div>

            {/* Photo Grid — 2 in a row on mobile, compact thumbnails, tap to open */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
              {photoModal.images.map((src, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(src)}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400 bg-black/40 cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.03]"
                >
                  <img 
                    src={src} 
                    alt={`${photoModal.title} ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-1.5 py-0.5 rounded text-[9px] text-cyan-300 font-mono">
                    Enlarge
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / Enlarged Fullscreen Image Preview — tap anywhere to close */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-6 cursor-pointer"
        >
          {/* Top Bar */}
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

          {/* Full Screen Image view */}
          <div className="relative max-w-full max-h-[88vh] flex items-center justify-center p-2">
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-h-[85vh] max-w-[95vw] object-contain rounded-2xl border border-cyan-400/40 shadow-[0_0_50px_rgba(6,182,212,0.35)]"
            />
          </div>
        </div>
      )}

      {/* Floating WhatsApp Quick Connect Button */}
      {/* Only visible from #projects section downwards (Projects, Milestones, Contact/Footer) */}
      <div
        className={`fixed bottom-6 right-5 sm:right-7 z-50 transition-all duration-500 ease-out transform ${
          showWhatsApp 
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
            : 'opacity-0 translate-y-12 pointer-events-none scale-75'
        }`}
      >
        <a
          href="https://wa.me/917200608333"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_0_25px_rgba(37,211,102,0.6)] hover:shadow-[0_0_35px_rgba(37,211,102,0.85)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {/* Subtle glowing ring animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping pointer-events-none" />
          
          {/* WhatsApp Icon */}
          <FaWhatsapp className="relative z-10 text-2xl sm:text-3xl drop-shadow" />

          {/* Hover Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-[#25D366]/40 text-white text-xs font-mono font-medium whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 hidden sm:block">
            Chat on WhatsApp 💬
          </span>
        </a>
      </div>
    </div>
  );
};

export default PortfolioPage;

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { 
  FaAws, FaServer, FaDatabase, FaUserShield, FaChartLine, FaNetworkWired, FaEnvelopeOpenText, FaProjectDiagram,
  FaCode, FaTools, FaLightbulb, FaFlask, FaUsers, FaUserTie, FaComments, FaHandsHelping, FaChartBar, FaCodeBranch,
  FaPython, FaJs, FaHtml5, FaCss3Alt, FaReact, FaGit, FaGithub, FaDocker, FaLinux, FaWindows
} from 'react-icons/fa';
import { 
  SiFirebase, SiMysql, SiArduino, SiTwilio 
} from 'react-icons/si';

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

// --- MAIN CUSTOMIZABLE PORTFOLIO COMPONENT ---
const PortfolioPage = ({
  logo = defaultData.logo,
  navLinks = defaultData.navLinks,
  resume = defaultData.resume,
  hero = defaultData.hero,
  ctaButtons = defaultData.ctaButtons,
  projects = defaultData.projects,
  stats = defaultData.stats,
  showAnimatedBackground = true,
}) => {
  const [showCertificates, setShowCertificates] = useState(false);
  const [photoModal, setPhotoModal] = useState({ show: false, title: '', images: [] });

  const milestonesData = [
    {
        category: "Hackathon",
        items: [
            { id: 1, title: "Best Innovation Award", role: "Hackathon Winner", location: "Erode Sengundar Engineering College", images: ['/certificates/award_cert.jpeg', '/certificates/hackathon_cert.jpeg'] },
            { id: 2, title: "National Level Hackathon", role: "Participant & Finalist", location: "KPR Institute", images: ['/kpr_hackathon/kpr_certificate.jpeg', '/kpr_hackathon/img1.jpeg', '/kpr_hackathon/img2.jpeg', '/kpr_hackathon/img3.jpeg', '/kpr_hackathon/img4.jpeg', '/kpr_hackathon/img5.jpeg', '/kpr_hackathon/img6.jpeg'] },
            { id: 3, title: "National Level Hackathon", role: "Participant & Finalist", location: "SRM IST", images: ['/srm_hackathon/srm_cert.jpeg', '/srm_hackathon/img1.jpeg', '/srm_hackathon/img2.jpeg', '/srm_hackathon/img3.jpeg', '/srm_hackathon/img4.jpeg', '/srm_hackathon/img5.jpeg', '/srm_hackathon/img6.jpeg', '/srm_hackathon/img7.jpeg', '/srm_hackathon/img8.jpeg', '/srm_hackathon/img9.jpeg', '/srm_hackathon/img10.jpeg', '/srm_hackathon/img11.jpeg', '/srm_hackathon/img12.jpeg', '/srm_hackathon/img13.jpeg'] }
        ]
    },
    {
        category: "Paper Presentation",
        items: [
            { id: 4, title: "2× Winner", role: "Paper Presentation", location: "Salem Local Center", images: ['/salem_paper/cert1.jpeg', '/salem_paper/cert2.jpeg', '/salem_paper/cert3.jpeg', '/salem_paper/event.jpeg'] },
            { id: 5, title: "2× Winner", role: "Paper Presentation", location: "Sengunthar Engineering College", images: ['/sengunthar_paper/cert1.jpeg', '/sengunthar_paper/cert2.jpeg', '/sengunthar_paper/img1.jpeg', '/sengunthar_paper/img2.jpeg'] }
        ]
    },
    {
        category: "Project",
        items: [
            { id: 6, title: "2× Winner", role: "Project Expo", location: "SONA College of Technology", images: ['/sona_expo/cert.jpeg', '/sona_expo/img1.jpeg', '/sona_expo/img2.jpeg', '/sona_expo/img3.jpeg', '/sona_expo/img4.jpeg', '/sona_expo/img5.jpeg'] },
            { id: 7, title: "2× Winner", role: "Project Expo", location: "Government Engineering College Salem", images: ['/gce_expo/cert1.jpeg', '/gce_expo/cert2.jpeg'] }
        ]
    },
    {
        category: "Ideathon",
        items: [
            { id: 8, title: "1× Winner", role: "Ideathon", location: "Mahendra Engineering College", images: ['/ideathon/cert.jpeg', '/ideathon/img1.jpeg', '/ideathon/img2.jpeg', '/ideathon/img3.jpeg', '/ideathon/img4.jpeg'] }
        ]
    },
    {
        category: "International Conference",
        items: [
            { id: 9, title: "International Conference", role: "Publication / Presentation", location: "Annapoorana Engineering College", images: ['/annapoorana/img1.jpeg', '/annapoorana/img2.jpeg', '/annapoorana/img3.jpeg', '/annapoorana/img4.jpeg', '/annapoorana/img5.jpeg'] }
        ]
    },
    {
        category: "Non-Technical",
        items: [
            { id: 10, title: "3rd Prize", role: "Photography", location: "Dhirajlal Gandhi College of Technology", images: ['/photography/img1.jpeg', '/photography/img2.jpeg', '/photography/img3.jpeg'] }
        ]
    },
    {
        category: "Sports",
        items: [
            { id: 11, title: "4th Prize", role: "Captain (₹4000 Cash Prize)", location: "Inter-College Cricket Tournament", images: ['/cricket/cert1.jpeg', '/cricket/cert2.jpeg', '/cricket/img1.jpeg', '/cricket/img2.jpeg', '/cricket/img3.jpeg'] }
        ]
    }
  ];

  return (
    <div className="bg-background text-foreground geist-font min-h-screen relative overflow-hidden">
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
          background: #C3E41D;
          color: black;
          transition: all 0.3s ease;
        }
        .primary-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(195, 228, 29, 0.4);
        }

        .glass-card {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: transform 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-5px);
          border-color: rgba(195, 228, 29, 0.5);
        }

        .project-image {
          background: rgba(255, 255, 255, 0.05);
        }

        .skill-badge {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .gradient-text {
          background: linear-gradient(to right, #C3E41D, #4ade80);
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
          background: #C3E41D;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(195, 228, 29, 0.4);
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
          background: rgba(195, 228, 29, 0.4);
          border-radius: 10px;
        }
        .horizontal-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(195, 228, 29, 0.8);
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
      `}</style>

      {showAnimatedBackground && <AuroraBackground />}
      <div className="relative z-10">
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
                        <a key={link.label} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors inter-font text-sm">{link.label}</a>
                    ))}
                </div>
                <button onClick={resume.onClick} className="glass-button px-4 py-2 rounded-lg text-foreground text-sm font-medium inter-font">{resume.label}</button>
            </div>
        </nav>
        <div className="divider" />
        <main id="about" className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 md:py-20 overflow-x-hidden">
            <div className="max-w-6xl w-full mx-auto text-center">
                <div className="mb-8 float-animation flex flex-col items-center max-w-full">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 mb-6 shadow-2xl">
                      <img src="/profile.png" alt="Prasanth S" className="w-full h-full object-cover object-[center_top]" />
                    </div>

                    <div className="inline-block py-1 px-4 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                      <span className="text-green-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">Available for work</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] geist-font font-bold text-foreground tracking-tight mb-4 break-words">
                        Hi, I'm <br />
                        <span className="gradient-text block tracking-tight mt-2">PRASANTH S</span>
                    </h1>

                    <h2 className="text-base sm:text-xl md:text-2xl text-gray-300 font-medium tracking-wide mb-4 geist-font max-w-full px-2 break-words">
                        AWS Cloud & DevOps Engineer | Software Engineer (Fresher)
                    </h2>

                    <p className="text-sm sm:text-lg md:text-xl max-w-2xl leading-relaxed inter-font font-light text-muted-foreground mx-auto mb-6 px-2 break-words">
                        Building scalable cloud solutions, smart web applications, and intelligent hardware systems.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-gray-300 justify-center mb-6 inter-font text-xs sm:text-base max-w-full px-2">
                        <span className="flex items-center gap-2 hover:text-white transition-colors">
                            +91 7200608333
                        </span>
                        <span className="hidden sm:block text-[#C3E41D]">•</span>
                        <span className="flex items-center gap-2 hover:text-white transition-colors break-all">
                            prasanthsenthilkumar09@gmail.com
                        </span>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
                    <button onClick={() => { window.location.hash = '#projects'; }} className="primary-button px-6 py-3 rounded-lg font-medium text-sm w-full sm:w-auto min-w-[160px]">
                      View Projects
                    </button>
                    <button onClick={() => window.open('/resume.pdf', '_blank')} className="glass-button w-full sm:w-auto min-w-[160px] inter-font text-sm font-medium text-foreground rounded-lg px-6 py-3">
                      View Resume
                    </button>
                </div>
                <div className="flex items-center justify-center gap-4 mb-16 mt-6">
                    <a href="https://linkedin.com/in/prasanth-senthil-kumar-333s151/" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-white/5 text-gray-300 hover:text-white hover:bg-[#0A66C2] transition-colors shadow-lg border border-white/10 hover:border-transparent">
                      <FiLinkedin size={24} />
                    </a>
                    <a href="https://github.com/PRASANTH-7-SENTHIL" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-white/5 text-gray-300 hover:text-white hover:bg-[#333] transition-colors shadow-lg border border-white/10 hover:border-transparent">
                      <FiGithub size={24} />
                    </a>
                </div>
                
                <div className="max-w-4xl mx-auto mb-16 px-4 sm:px-6 float-animation">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 geist-font text-center">
                        Career Objective
                    </h2>
                    <p className="text-sm sm:text-lg leading-relaxed inter-font text-muted-foreground text-center glass-card p-5 sm:p-8 rounded-2xl">
                        "Aspiring AWS Cloud and DevOps engineer with a strong interest in software development, seeking an opportunity to apply my skills in cloud computing, automation, and scalable system development to build innovative solutions."
                    </p>
                </div>

                <div className="divider mb-16" />

                <div id="technical-skills" className="max-w-6xl mx-auto mb-16 px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 geist-font text-center flex items-center justify-center gap-2">
                        Technical Skills <span className="text-xs font-normal text-muted-foreground inter-font">(Scroll &rarr;)</span>
                    </h2>
                    <div className="horizontal-scroll-container">
                        <div className="glass-card p-5 sm:p-6 rounded-2xl text-left horizontal-scroll-item">
                            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#C3E41D] geist-font flex items-center gap-2"><FaAws /> AWS Cloud & DevOps</h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    {name: "EC2", icon: <FaServer />}, {name: "S3", icon: <FaDatabase />}, {name: "IAM", icon: <FaUserShield />}, 
                                    {name: "CloudWatch", icon: <FaChartLine />}, {name: "VPC", icon: <FaNetworkWired />}, {name: "RDS", icon: <FaDatabase />}, 
                                    {name: "SNS", icon: <FaEnvelopeOpenText />}, {name: "Lambda", icon: <FaAws />}, {name: "CI/CD Pipeline", icon: <FaProjectDiagram />}
                                ].map(skill => (
                                    <span key={skill.name} className="skill-badge px-3 py-1.5 rounded-md text-xs sm:text-sm text-muted-foreground inter-font flex items-center gap-2">
                                        <span className="text-[#C3E41D]">{skill.icon}</span> {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="glass-card p-5 sm:p-6 rounded-2xl text-left horizontal-scroll-item">
                            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#C3E41D] geist-font flex items-center gap-2"><FaCode /> Programming</h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    {name: "Python", icon: <FaPython />}, {name: "JavaScript", icon: <FaJs />}, {name: "HTML", icon: <FaHtml5 />}, 
                                    {name: "CSS", icon: <FaCss3Alt />}, {name: "React", icon: <FaReact />}
                                ].map(skill => (
                                    <span key={skill.name} className="skill-badge px-3 py-1.5 rounded-md text-xs sm:text-sm text-muted-foreground inter-font flex items-center gap-2">
                                        <span className="text-blue-400">{skill.icon}</span> {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-5 sm:p-6 rounded-2xl text-left horizontal-scroll-item">
                            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#C3E41D] geist-font flex items-center gap-2"><FaDatabase /> Databases</h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    {name: "Firebase", icon: <SiFirebase />}, {name: "MySQL", icon: <SiMysql />}, {name: "SQL", icon: <FaDatabase />}
                                ].map(skill => (
                                    <span key={skill.name} className="skill-badge px-3 py-1.5 rounded-md text-xs sm:text-sm text-muted-foreground inter-font flex items-center gap-2">
                                        <span className="text-orange-400">{skill.icon}</span> {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-5 sm:p-6 rounded-2xl text-left horizontal-scroll-item">
                            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#C3E41D] geist-font flex items-center gap-2"><FaTools /> Tools</h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    {name: "Git", icon: <FaGit />}, {name: "GitHub", icon: <FaGithub />}, {name: "Docker", icon: <FaDocker />}, 
                                    {name: "VS Code", icon: <FaCode />}, {name: "Arduino IDE", icon: <SiArduino />}, 
                                    {name: "ThingSpeak", icon: <FaChartBar />}, {name: "Twilio", icon: <SiTwilio />}, {name: "N8N", icon: <FaCodeBranch />}
                                ].map(skill => (
                                    <span key={skill.name} className="skill-badge px-3 py-1.5 rounded-md text-xs sm:text-sm text-muted-foreground inter-font flex items-center gap-2">
                                        <span className="text-purple-400">{skill.icon}</span> {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-5 sm:p-6 rounded-2xl text-left horizontal-scroll-item">
                            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#C3E41D] geist-font flex items-center gap-2"><FaLightbulb /> Other Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    {name: "Problem Solving", icon: <FaLightbulb />}, {name: "Research", icon: <FaFlask />}, 
                                    {name: "Teamwork", icon: <FaUsers />}, {name: "Leadership", icon: <FaUserTie />}, 
                                    {name: "Communication", icon: <FaComments />}, {name: "Adaptability", icon: <FaHandsHelping />}
                                ].map(skill => (
                                    <span key={skill.name} className="skill-badge px-3 py-1.5 rounded-md text-xs sm:text-sm text-muted-foreground inter-font flex items-center gap-2">
                                        <span className="text-yellow-400">{skill.icon}</span> {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="divider mb-16" />

                {/* Internship Experience */}
                <div id="internship" className="max-w-6xl mx-auto mb-16 px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 md:mb-12 geist-font text-center">
                        Internship Experience
                    </h2>
                    <div className="glass-card p-5 sm:p-8 rounded-2xl text-left float-animation group relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-[#C3E41D]"></div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#C3E41D] geist-font mb-1">Salem Steel Plant</h3>
                        <p className="text-base sm:text-lg text-foreground mb-4 font-medium inter-font">(Steel Authority of India Limited)</p>
                        
                        <div className="space-y-2 text-muted-foreground inter-font text-sm sm:text-base mb-6">
                            <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"><span className="font-semibold text-gray-300 sm:w-24">Role:</span> <span>Intern (Electrical Maintenance)</span></p>
                            <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"><span className="font-semibold text-gray-300 sm:w-24">Duration:</span> <span>11-12-2025 to 24-12-2025</span></p>
                            <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"><span className="font-semibold text-gray-300 sm:w-24">Session:</span> <span>2:00 PM – 5:00 PM</span></p>
                            <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"><span className="font-semibold text-gray-300 sm:w-24">Location:</span> <span>Salem, Tamil Nadu</span></p>
                        </div>
                        <button onClick={() => setShowCertificates(true)} className="glass-button px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2 border-[#C3E41D]/30 hover:border-[#C3E41D]">
                            View Certificate
                        </button>
                    </div>
                </div>

                <div className="divider mb-16" />

                {/* Leadership Section */}
                <div id="leadership" className="max-w-7xl mx-auto mb-16 px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 md:mb-12 geist-font text-center flex items-center justify-center gap-2">
                        Leadership & Coordinating <span className="text-xs font-normal text-muted-foreground inter-font">(Scroll &rarr;)</span>
                    </h2>
                    <div className="horizontal-scroll-container">
                        
                        {/* 1. Symposium President */}
                        <div className="glass-card p-5 sm:p-6 rounded-2xl text-left float-animation group relative overflow-hidden horizontal-scroll-item">
                            <h3 className="text-lg sm:text-xl font-bold text-[#C3E41D] geist-font mb-2">Department Symposium President</h3>
                            <p className="text-muted-foreground text-xs sm:text-sm inter-font mb-6">Led the organization and execution of the annual department-level tech symposium.</p>
                            <button onClick={() => setPhotoModal({
                                show: true,
                                title: 'Symposium Gallery',
                                images: Array.from({length: 23}, (_, i) => `/symposium/img-${i+1}.jpeg`).concat(Array.from({length: 11}, (_, i) => `/symposium/sympo-${i+1}.jpg`))
                            })} className="glass-button px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2 border-[#C3E41D]/30 hover:border-[#C3E41D]">
                                View Photos
                            </button>
                        </div>

                        {/* 2. Quiz Coordinator */}
                        <div className="glass-card p-5 sm:p-6 rounded-2xl text-left float-animation group relative overflow-hidden horizontal-scroll-item" style={{ animationDelay: '0.2s' }}>
                            <h3 className="text-lg sm:text-xl font-bold text-[#C3E41D] geist-font mb-2">Department Quiz Coordinator</h3>
                            <p className="text-muted-foreground text-xs sm:text-sm inter-font mb-4">Coordinated logistics and question sets for the department-level technical quiz.</p>
                        </div>

                        {/* 3. Class Quiz Organizer */}
                        <div className="glass-card p-5 sm:p-6 rounded-2xl text-left float-animation group relative overflow-hidden horizontal-scroll-item" style={{ animationDelay: '0.4s' }}>
                            <h3 className="text-lg sm:text-xl font-bold text-[#C3E41D] geist-font mb-2">Class Quiz Organizer</h3>
                            <p className="text-muted-foreground text-xs sm:text-sm inter-font mb-4">Organized engaging quiz sessions to foster knowledge sharing and healthy competition.</p>
                        </div>

                        {/* 4. Cricket Team Captain */}
                        <div className="glass-card p-5 sm:p-6 rounded-2xl text-left float-animation group relative overflow-hidden horizontal-scroll-item" style={{ animationDelay: '0.6s' }}>
                            <h3 className="text-lg sm:text-xl font-bold text-[#C3E41D] geist-font mb-2">Inter-College Cricket Team Captain</h3>
                            <p className="text-muted-foreground text-xs sm:text-sm inter-font mb-6">Captained the college cricket team, strategizing matches and leading to victories.</p>
                            <button onClick={() => setPhotoModal({
                                show: true,
                                title: 'Cricket Team Gallery',
                                images: ['/cricket/cert1.jpeg', '/cricket/cert2.jpeg', '/cricket/img1.jpeg', '/cricket/img2.jpeg', '/cricket/img3.jpeg']
                            })} className="glass-button px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2 border-[#C3E41D]/30 hover:border-[#C3E41D]">
                                View Photos
                            </button>
                        </div>

                    </div>
                </div>

                <div className="divider mb-16" />
                <div id="projects" className="max-w-7xl mx-auto mb-16 px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 md:mb-12 geist-font text-center">
                        Featured Projects
                    </h2>
                    
                    {/* Software Projects */}
                    <div className="mb-16">
                        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-[#C3E41D] geist-font border-b border-white/10 pb-2 flex items-center justify-between">
                            <span>Software Projects</span>
                            <span className="text-xs font-normal text-muted-foreground inter-font">(Scroll &rarr;)</span>
                        </h3>
                        <div className="horizontal-scroll-container">
                            <div className="glass-card rounded-2xl p-5 sm:p-6 text-left float-animation group horizontal-scroll-item">
                                <div className="rounded-xl h-40 sm:h-48 mb-4 overflow-hidden border border-white/10 relative">
                                    <video src="/pstex.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="text-lg font-medium text-card-foreground mb-2 geist-font">PS TEX</h3>
                                <p className="text-muted-foreground text-xs sm:text-sm inter-font mb-4">A comprehensive textile management system.</p>
                            </div>
                            <a href="https://ai-smart-education-system-1egk.vercel.app/" target="_blank" rel="noopener noreferrer" className="block cursor-pointer horizontal-scroll-item">
                                <div className="glass-card rounded-2xl p-5 sm:p-6 text-left float-animation group h-full" style={{ animationDelay: '0.2s' }}>
                                    <div className="rounded-xl h-40 sm:h-48 mb-4 overflow-hidden border border-white/10 relative">
                                        <img src="/ai-smart-education.png" alt="Smart Education" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h3 className="text-lg font-medium text-card-foreground mb-2 geist-font group-hover:text-[#C3E41D] transition-colors">AI Smart Education System</h3>
                                    <p className="text-muted-foreground text-xs sm:text-sm inter-font mb-4">A smart platform integrating real-time weather data and AI.</p>
                                </div>
                            </a>
                            <div className="glass-card rounded-2xl p-5 sm:p-6 text-left float-animation group horizontal-scroll-item" style={{ animationDelay: '0.4s' }}>
                                <div className="rounded-xl h-40 sm:h-48 mb-4 overflow-hidden border border-white/10 relative">
                                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Smart Employee" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="text-lg font-medium text-card-foreground mb-2 geist-font flex items-center justify-between gap-2 flex-wrap">
                                    Smart Employee Management System
                                    <span className="text-[10px] sm:text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full">On Progress</span>
                                </h3>
                                <p className="text-muted-foreground text-xs sm:text-sm inter-font mb-4">An end-to-end platform for tracking employee metrics and shift workflows.</p>
                            </div>
                        </div>
                    </div>

                    {/* Hardware & IoT Projects */}
                    <div>
                        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-[#C3E41D] geist-font border-b border-white/10 pb-2 flex items-center justify-between">
                            <span>Hardware Projects</span>
                            <span className="text-xs font-normal text-muted-foreground inter-font">(Scroll &rarr;)</span>
                        </h3>
                        <div className="horizontal-scroll-container">
                            
                            {/* Weather Based Smart Education Video Project */}
                            <div className="glass-card rounded-2xl p-5 sm:p-6 text-left float-animation group relative overflow-hidden horizontal-scroll-item">
                                <div className="rounded-xl h-40 sm:h-48 mb-4 overflow-hidden border border-white/10 relative">
                                    <video src="/weather-smart-education.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="text-lg font-medium text-card-foreground mb-2 geist-font">Weather Based Smart Education System</h3>
                                <p className="text-muted-foreground text-xs sm:text-sm inter-font mb-4">An IoT solution optimizing learning environments based on weather parameters.</p>
                            </div>

                            {/* AI-Based Smart Irrigation */}
                            <div className="glass-card rounded-2xl p-5 sm:p-6 text-left float-animation group relative overflow-hidden horizontal-scroll-item" style={{ animationDelay: '0.2s' }}>
                                <div className="rounded-xl h-40 sm:h-48 mb-4 overflow-hidden border border-white/10 relative">
                                    <img src="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=800" alt="Smart Irrigation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="text-lg font-medium text-card-foreground mb-2 geist-font">AI-Based Smart Irrigation System</h3>
                                <p className="text-muted-foreground text-xs sm:text-sm inter-font mb-4">AI algorithms determining optimal watering cycles using soil moisture data.</p>
                            </div>

                            {/* LPG Gas Leakage Detector */}
                            <div className="glass-card rounded-2xl p-5 sm:p-6 text-left float-animation group relative overflow-hidden horizontal-scroll-item" style={{ animationDelay: '0.4s' }}>
                                <div className="rounded-xl h-40 sm:h-48 mb-4 overflow-hidden border border-white/10 relative">
                                    <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800" alt="LPG Gas Leakage Detector" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="text-lg font-medium text-card-foreground mb-2 geist-font">LPG Gas Leakage Detector</h3>
                                <p className="text-muted-foreground text-xs sm:text-sm inter-font mb-4">Safety mechanism capable of real-time monitoring of air quality.</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="divider mb-16" />

                {/* Milestones & Awards */}
                <div id="milestones" className="max-w-6xl mx-auto mb-24 md:mb-32 px-4 sm:px-6 relative mt-16 md:mt-20">
                    <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-12 md:mb-24 geist-font text-center">
                        Milestones & Awards
                    </h2>
                    
                    <div className="relative">
                        {/* Main Vertical Path */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:w-2 bg-gradient-to-b from-[#C3E41D] via-[#4ade80] to-[#C3E41D] md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(195,228,29,0.5)]"></div>
                        
                        <div className="space-y-12 md:space-y-24">
                            {milestonesData.map((categoryGroup, index) => {
                                const isEven = index % 2 === 0;
                                return (
                                    <div key={index} className={`relative flex flex-col md:flex-row items-start w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                        
                                        {/* Central Map Pin */}
                                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-10 top-0">
                                            <div className="map-pin scale-75 md:scale-100">
                                                <div className="map-pin-inner"></div>
                                            </div>
                                        </div>

                                        {/* Spacer for the other half */}
                                        <div className="hidden md:block md:w-1/2"></div>
                                        
                                        {/* Content Card */}
                                        <div className={`w-full md:w-1/2 relative flex flex-col ${isEven ? 'items-start md:pl-16 md:pr-4' : 'items-start md:items-end md:pr-16 md:pl-4'} pl-10 md:pl-16 pt-0`}>
                                            
                                            {/* Dashed Pole (Horizontal connector for desktop) */}
                                            <div className={`hidden md:block absolute top-[17px] w-12 border-t-2 border-dashed border-[#C3E41D] ${isEven ? 'left-4' : 'right-4'}`}></div>

                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#C3E41D] geist-font mb-4 sm:mb-6 mt-0.5 md:mt-0">{categoryGroup.category}</h3>
                                            
                                            <div className="flex flex-col gap-4 sm:gap-6 w-full">
                                                {categoryGroup.items.map(item => (
                                                    <div key={item.id} className="glass-card p-4 sm:p-6 rounded-2xl text-left float-animation group relative overflow-hidden transition-all hover:bg-white/5 border border-white/5 hover:border-[#C3E41D]/50 w-full">
                                                        <h4 className="text-base sm:text-lg font-bold text-white geist-font mb-1">{item.title}</h4>
                                                        <p className="text-[#C3E41D] font-medium inter-font mb-1 text-xs sm:text-sm">{item.role}</p>
                                                        <p className="text-muted-foreground text-xs sm:text-sm inter-font mb-4 flex items-start gap-2 break-words">
                                                            <svg className="w-4 h-4 opacity-70 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                                            <span className="break-words">{item.location}</span>
                                                        </p>
                                                        <button onClick={() => setPhotoModal({
                                                            show: true,
                                                            title: `${item.location} - ${item.category}`,
                                                            images: item.images
                                                        })} className="glass-button px-3.5 py-1.5 rounded-full text-xs font-semibold text-foreground flex items-center gap-2 border-white/10 hover:border-[#C3E41D] w-fit">
                                                            View Certificates
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="divider mb-16" />
                <div id="skills" className="flex flex-col sm:flex-row justify-center items-center gap-8 text-center mb-16">
                    {stats.map((stat, index) => (
                        <React.Fragment key={stat.label}>
                            <div>
                                <div className="text-3xl md:text-4xl font-light text-foreground mb-1 geist-font tracking-tight">{stat.value}</div>
                                <div className="text-muted-foreground text-sm inter-font font-normal">{stat.label}</div>
                            </div>
                            {index < stats.length - 1 && <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-gray-700 to-transparent" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </main>
      </div>

      {showCertificates && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <button onClick={() => setShowCertificates(false)} className="absolute top-4 right-4 text-white hover:text-[#C3E41D] text-3xl font-bold leading-none">&times;</button>
            <h2 className="text-2xl font-bold text-white mb-6 geist-font">Internship Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img src="/internship/internship-1.jpg" alt="Certificate 1" className="w-full rounded-xl border border-white/10" />
                <img src="/internship/internship-2.jpg" alt="Certificate 2" className="w-full rounded-xl border border-white/10" />
            </div>
          </div>
        </div>
      )}

      {/* Photo Gallery Modal */}
      {photoModal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <button onClick={() => setPhotoModal({ show: false, title: '', images: [] })} className="absolute top-4 right-4 text-white hover:text-[#C3E41D] text-3xl font-bold leading-none z-10">&times;</button>
            <h2 className="text-2xl font-bold text-white mb-6 geist-font">{photoModal.title}</h2>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {photoModal.images.map((src, idx) => (
                    <img key={idx} src={src} alt={`${photoModal.title} ${idx + 1}`} className="w-full rounded-xl border border-white/10 break-inside-avoid shadow-lg" loading="lazy" />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;

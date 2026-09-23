import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";

/* ─────────────────────────────────────────────
   MILESTONE DATA  (matches GlobalMilestones.jsx)
───────────────────────────────────────────── */
const stops = [
  {
    id: "01", frac: 0.92, icon: "🏆", label: "Innovation Arena", tag: "Hackathon",
    activity: "HACKATHON", year: "2024 — 2025",
    achievement: "Best Innovation Award & Finalist",
    location: "Erode Sengundar · KPR Institute · SRM IST",
    desc: "Built high-impact solutions across national hackathons, winning the Best Innovation Award and competing as a finalist among top national engineering squads.",
    spotImage: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166800/portfolio/milestones/hackathon.jpg",
    items: [
      { id: 1, title: "Best Innovation Award", role: "Hackathon Winner", location: "Erode Sengundar Engineering College", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166529/portfolio/certificates/award_cert.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166535/portfolio/certificates/hackathon_cert.jpg'] },
      { id: 2, title: "National Level Hackathon", role: "Participant & Finalist", location: "KPR Institute", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166790/portfolio/kpr_hackathon/kpr_certificate.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166771/portfolio/kpr_hackathon/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166774/portfolio/kpr_hackathon/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166778/portfolio/kpr_hackathon/img3.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166785/portfolio/kpr_hackathon/img4.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166786/portfolio/kpr_hackathon/img5.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166788/portfolio/kpr_hackathon/img6.jpg'] },
      { id: 3, title: "National Level Hackathon", role: "Participant & Finalist", location: "SRM IST", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166885/portfolio/srm_hackathon/srm_cert.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166864/portfolio/srm_hackathon/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166872/portfolio/srm_hackathon/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166874/portfolio/srm_hackathon/img3.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166875/portfolio/srm_hackathon/img4.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166877/portfolio/srm_hackathon/img5.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166878/portfolio/srm_hackathon/img6.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166880/portfolio/srm_hackathon/img7.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166882/portfolio/srm_hackathon/img8.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166884/portfolio/srm_hackathon/img9.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166866/portfolio/srm_hackathon/img10.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166868/portfolio/srm_hackathon/img11.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166869/portfolio/srm_hackathon/img12.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166871/portfolio/srm_hackathon/img13.jpg'] }
    ],
    images: ["https://res.cloudinary.com/oaktnbdl/image/upload/v1790166529/portfolio/certificates/award_cert.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166535/portfolio/certificates/hackathon_cert.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166790/portfolio/kpr_hackathon/kpr_certificate.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166885/portfolio/srm_hackathon/srm_cert.jpg"],
    color: "#38bdf8", glow: "rgba(56,189,248,0.5)",
  },
  {
    id: "02", frac: 0.78, icon: "🏫", label: "Presentation Hall", tag: "Paper Presentation",
    activity: "PAPER PRESENTATION", year: "2024",
    achievement: "2× Winner — Technical Papers",
    location: "Salem Local Center · Sengunthar Engg College",
    desc: "Authored and presented technical papers on advanced electrical machines and intelligent energy systems, securing two 1st prizes across academic forums.",
    spotImage: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166808/portfolio/milestones/presentation.jpg",
    items: [
      { id: 4, title: "2× Winner", role: "Paper Presentation", location: "Salem Local Center", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166838/portfolio/salem_paper/cert1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166840/portfolio/salem_paper/cert2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166842/portfolio/salem_paper/cert3.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166844/portfolio/salem_paper/event.jpg'] },
      { id: 5, title: "2× Winner", role: "Paper Presentation", location: "Sengunthar Engineering College", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166849/portfolio/sengunthar_paper/cert1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166851/portfolio/sengunthar_paper/cert2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166853/portfolio/sengunthar_paper/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166854/portfolio/sengunthar_paper/img2.jpg'] }
    ],
    images: ["https://res.cloudinary.com/oaktnbdl/image/upload/v1790166838/portfolio/salem_paper/cert1.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166840/portfolio/salem_paper/cert2.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166849/portfolio/sengunthar_paper/cert1.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166851/portfolio/sengunthar_paper/cert2.jpg"],
    color: "#a855f7", glow: "rgba(168,85,247,0.5)",
  },
  {
    id: "03", frac: 0.64, icon: "🏢", label: "Project Lab", tag: "Project",
    activity: "PROJECT", year: "2024 — 2025",
    achievement: "2× Winner — Project Expos",
    location: "SONA College of Technology · GCE Salem",
    desc: "Engineered scalable software and hardware systems including AI Smart Education System and IoT Smart Water Monitoring, clinching multiple expo winner awards.",
    spotImage: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166811/portfolio/milestones/project.jpg",
    items: [
      { id: 6, title: "2× Winner", role: "Project Expo", location: "SONA College of Technology", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166856/portfolio/sona_expo/cert.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166857/portfolio/sona_expo/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166858/portfolio/sona_expo/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166860/portfolio/sona_expo/img3.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166862/portfolio/sona_expo/img4.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166863/portfolio/sona_expo/img5.jpg'] },
      { id: 7, title: "2× Winner", role: "Project Expo", location: "Government Engineering College Salem", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166569/portfolio/gce_expo/cert1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166571/portfolio/gce_expo/cert2.jpg'] }
    ],
    images: ["https://res.cloudinary.com/oaktnbdl/image/upload/v1790166856/portfolio/sona_expo/cert.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166857/portfolio/sona_expo/img1.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166569/portfolio/gce_expo/cert1.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166571/portfolio/gce_expo/cert2.jpg"],
    color: "#3b82f6", glow: "rgba(59,130,246,0.5)",
  },
  {
    id: "04", frac: 0.50, icon: "💡", label: "Idea Park", tag: "Ideathon",
    activity: "IDEATHON", year: "2024",
    achievement: "1× Winner — Ideathon",
    location: "Mahendra Engineering College",
    desc: "Formulated innovative engineering architectures addressing real-world civic challenges, winning 1st place in the national-level ideathon pitch.",
    spotImage: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166804/portfolio/milestones/ideathon.jpg",
    items: [
      { id: 8, title: "1× Winner", role: "Ideathon", location: "Mahendra Engineering College", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166741/portfolio/ideathon/cert.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166743/portfolio/ideathon/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166745/portfolio/ideathon/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166763/portfolio/ideathon/img3.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166765/portfolio/ideathon/img4.jpg'] }
    ],
    images: ["https://res.cloudinary.com/oaktnbdl/image/upload/v1790166741/portfolio/ideathon/cert.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166743/portfolio/ideathon/img1.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166745/portfolio/ideathon/img2.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166763/portfolio/ideathon/img3.jpg"],
    color: "#ef4444", glow: "rgba(239,68,68,0.5)",
  },
  {
    id: "05", frac: 0.36, icon: "🌐", label: "Convention Center", tag: "International Conference",
    activity: "INTERNATIONAL CONFERENCE", year: "2025",
    achievement: "International Conference Presentation",
    location: "Annapoorana Engineering College",
    desc: "Presented research findings before an international panel of scholars, exploring emerging technological breakthroughs and interdisciplinary research.",
    spotImage: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166797/portfolio/milestones/conference.jpg",
    items: [
      { id: 9, title: "International Conference", role: "Publication / Presentation", location: "Annapoorana Engineering College", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166504/portfolio/annapoorana/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166515/portfolio/annapoorana/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166523/portfolio/annapoorana/img3.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166526/portfolio/annapoorana/img4.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166528/portfolio/annapoorana/img5.jpg'] }
    ],
    images: ["https://res.cloudinary.com/oaktnbdl/image/upload/v1790166504/portfolio/annapoorana/img1.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166515/portfolio/annapoorana/img2.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166523/portfolio/annapoorana/img3.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166526/portfolio/annapoorana/img4.jpg"],
    color: "#10b981", glow: "rgba(16,185,129,0.5)",
  },
  {
    id: "06", frac: 0.22, icon: "🎪", label: "Community Ground", tag: "Non-Technical",
    activity: "NON-TECHNICAL", year: "2024",
    achievement: "3rd Prize — Photography & Creative Arts",
    location: "Dhirajlal Gandhi College of Technology",
    desc: "Celebrated for photographic perspective and creative framing, capturing cultural narratives and proving versatile visual communication beyond engineering.",
    spotImage: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166793/portfolio/milestones/community.jpg",
    items: [
      { id: 10, title: "3rd Prize", role: "Photography", location: "Dhirajlal Gandhi College of Technology", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166817/portfolio/photography/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166819/portfolio/photography/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166821/portfolio/photography/img3.jpg'] }
    ],
    images: ["https://res.cloudinary.com/oaktnbdl/image/upload/v1790166817/portfolio/photography/img1.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166819/portfolio/photography/img2.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166821/portfolio/photography/img3.jpg"],
    color: "#f59e0b", glow: "rgba(245,158,11,0.5)",
  },
  {
    id: "07", frac: 0.08, icon: "🏟️", label: "Sports Stadium", tag: "Sports",
    activity: "SPORTS", year: "2024 — 2025",
    achievement: "4th Prize Captain (₹4000 Cash Prize)",
    location: "Inter-College Cricket Tournament",
    desc: "Captained the collegiate cricket team with strategic field management, discipline, and stamina, clinching 4th place and a ₹4000 cash award in inter-college play.",
    spotImage: "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166815/portfolio/milestones/sports.jpg",
    items: [
      { id: 11, title: "4th Prize", role: "Captain (₹4000 Cash Prize)", location: "Inter-College Cricket Tournament", images: ['https://res.cloudinary.com/oaktnbdl/image/upload/v1790166546/portfolio/cricket/cert1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166555/portfolio/cricket/cert2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166561/portfolio/cricket/img1.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166564/portfolio/cricket/img2.jpg', 'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166565/portfolio/cricket/img3.jpg'] }
    ],
    images: ["https://res.cloudinary.com/oaktnbdl/image/upload/v1790166546/portfolio/cricket/cert1.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166561/portfolio/cricket/img1.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166564/portfolio/cricket/img2.jpg", "https://res.cloudinary.com/oaktnbdl/image/upload/v1790166565/portfolio/cricket/img3.jpg"],
    color: "#06b6d4", glow: "rgba(6,182,212,0.5)",
  },
];

const ROAD_D = `M 450 1460
  C 450 1340, 150 1340, 150 1240
  C 150 1130, 470 1130, 470 1030
  C 470 920, 760 920, 760 820
  C 760 720, 430 720, 430 620
  C 430 520, 130 520, 130 420
  C 130 320, 460 320, 460 220
  C 460 140, 620 140, 620 80`;

function getPathPoint(pathEl, frac) {
  const len = pathEl.getTotalLength();
  return pathEl.getPointAtLength(frac * len);
}
function getTangent(pathEl, frac) {
  const len = pathEl.getTotalLength();
  const d = 0.003;
  const p1 = pathEl.getPointAtLength(Math.max(0, frac - d) * len);
  const p2 = pathEl.getPointAtLength(Math.min(1, frac + d) * len);
  return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}
function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

/* pre-generate stable particle data outside component */
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  cx: (i * 193.7 + 45) % 1150,
  cy: (i * 137.3 + 80) % 1500,
  r: i % 4 === 0 ? 3.5 : i % 3 === 0 ? 2.5 : 1.5,
  color: i % 3 === 0 ? "#38bdf8" : i % 3 === 1 ? "#a855f7" : "#10b981",
  duration: 4 + (i % 5),
  delay: (i * 0.7) % 5,
  dx: ((i * 43) % 41) - 20,
  dy: -30 - (i * 17) % 40,
}));

export default function CareerJourney({ setPhotoModal }) {
  const pathRef = useRef(null);
  const animRef = useRef(null);
  const mapCardRef = useRef(null);
  const sectionRef = useRef(null);

  const [carFrac, setCarFrac] = useState(1.0);
  const [carAngle, setCarAngle] = useState(0);
  const [carPos, setCarPos] = useState({ x: 450, y: 1460 });
  const [visitedSet, setVisitedSet] = useState(new Set());
  const [activeStop, setActiveStop] = useState(null);
  const [exploreStop, setExploreStop] = useState(null);
  const [panel, setPanel] = useState(null);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHoveringMap, setIsHoveringMap] = useState(false);
  const [inView, setInView] = useState(false);

  /* Section entry observer */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const positions = stops.map(s => {
      const pt = getPathPoint(path, s.frac);
      return { x: pt.x, y: pt.y };
    });
    setMarkerPositions(positions);
    const startPt = getPathPoint(path, 1.0);
    setCarPos({ x: startPt.x, y: startPt.y });
    setCarAngle(getTangent(path, 1.0));
  }, []);

  const travelTo = useCallback((stopIdx) => {
    if (isAnimating) return;
    const path = pathRef.current;
    if (!path) return;
    const targetFrac = stops[stopIdx].frac;
    const startFrac = carFrac;
    const dist = Math.abs(targetFrac - startFrac);
    const duration = Math.min(2400, Math.max(800, dist * 3500));
    setIsAnimating(true);
    setExploreStop(null);
    setActiveStop(null);
    const t0 = performance.now();
    const step = (now) => {
      let t = Math.min(1, (now - t0) / duration);
      const eased = easeInOut(t);
      const frac = startFrac + (targetFrac - startFrac) * eased;
      const pt = getPathPoint(path, frac);
      const ang = getTangent(path, frac);
      setCarPos({ x: pt.x, y: pt.y });
      setCarAngle(ang);
      setCarFrac(frac);
      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        setIsAnimating(false);
        setVisitedSet(prev => new Set([...prev, stopIdx]));
        setActiveStop(stopIdx);
        setExploreStop(stopIdx);
      }
    };
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(step);
  }, [carFrac, isAnimating]);

  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);

  /* 3D tilt on mouse move */
  const handleMouseMove = useCallback((e) => {
    const el = mapCardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHoveringMap(false);
  }, []);

  const explorePos = exploreStop !== null && markerPositions[exploreStop]
    ? { x: markerPositions[exploreStop].x, y: markerPositions[exploreStop].y + 138 }
    : null;

  const mapTransform = isHoveringMap
    ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.01,1.01,1.01)`
    : "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";

  return (
    <div
      ref={sectionRef}
      className="w-full flex flex-col"
      style={{
        minHeight: "100vh",
        paddingTop: "2rem",
        paddingBottom: "1rem",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(60px) scale(0.97)",
        transition: "opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      {/* Section Header */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center border border-cyan-500/50 rounded-full px-4 py-0.5 mb-2">
          <span className="text-cyan-400 font-mono text-[10px] tracking-[0.35em] uppercase">Career Journey</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black geist-font leading-tight text-white">
          My Career is a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
            Journey
          </span>
        </h2>
        <p className="text-gray-400 inter-font text-xs sm:text-sm mt-2 max-w-2xl mx-auto">
          Every experience is a destination. Click any place on the road — the car travels there.
          Then hit <span className="text-cyan-400 font-semibold">Explore</span> to dive in.
        </p>
        <div className="w-10 h-0.5 bg-cyan-500/60 mx-auto mt-2" />
      </div>

      {/* Journey Map */}
      <div className="relative w-full max-w-5xl lg:max-w-6xl mx-auto select-none flex-1 flex flex-col">
        {/* Ambient glow that shifts with tilt */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 30%, rgba(56,189,248,0.18) 0%, rgba(168,85,247,0.1) 40%, transparent 75%)",
            filter: "blur(28px)",
            transform: `translate(${tilt.y * 3}px, ${tilt.x * -2}px)`,
            transition: "transform 0.15s ease-out",
          }}
        />

        {/* 3D tilt card */}
        <div
          ref={mapCardRef}
          className="relative rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-[#060d1a]/95 via-[#040814]/98 to-[#02050a] overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)] flex-1 flex flex-col"
          style={{
            transform: mapTransform,
            transition: isHoveringMap ? "transform 0.08s linear" : "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringMap(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-6 pt-4 pb-1">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-mono text-xs tracking-[0.25em] uppercase">
                📍 Interactive Milestone Map
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase font-semibold">Live Journey</span>
            </div>
          </div>

          {/* SVG — fills remaining card height */}
          <svg
            viewBox="0 0 1150 1500"
            className="w-full flex-1 block"
            style={{ width: "100%", height: "auto", maxHeight: "calc(100vh - 230px)", objectFit: "contain" }}
          >
            <defs>
              <filter id="car-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-explore" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              {/* Shimmer sweep gradient */}
              <linearGradient id="shimmer-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)">
                  <animate attributeName="offset" values="-1;2" dur="2.4s" repeatCount="indefinite" />
                </stop>
                <stop offset="30%" stopColor="rgba(255,255,255,0.14)">
                  <animate attributeName="offset" values="-0.5;2.5" dur="2.4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="rgba(255,255,255,0)">
                  <animate attributeName="offset" values="0;3" dur="2.4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>

            {/* Twinkling background stars */}
            {Array.from({ length: 65 }).map((_, i) => (
              <circle
                key={i}
                cx={(i * 137.5 + 11) % 1150}
                cy={(i * 97.3 + 7) % 1500}
                r={i % 5 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 0.8}
                fill={i % 4 === 0 ? "#38bdf8" : "#ffffff"}
              >
                <animate
                  attributeName="opacity"
                  values={`${0.04 + (i % 5) * 0.03};${0.2 + (i % 5) * 0.07};${0.04 + (i % 5) * 0.03}`}
                  dur={`${3 + (i % 4)}s`}
                  begin={`${(i * 0.23) % 4}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* Floating depth particles */}
            {PARTICLES.map((p, i) => (
              <circle key={`fp-${i}`} cx={p.cx} cy={p.cy} r={p.r} fill={p.color} opacity="0">
                <animate attributeName="opacity"
                  values="0;0.55;0" dur={`${p.duration}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="translate"
                  values={`0,0; ${p.dx},${p.dy}; 0,0`}
                  dur={`${p.duration}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Road layers */}
            <path d={ROAD_D} fill="none" stroke="rgba(6,182,212,0.06)" strokeWidth="76" strokeLinecap="round" />
            <path d={ROAD_D} fill="none" stroke="#0f172a" strokeWidth="62" strokeLinecap="round" />
            <path d={ROAD_D} fill="none" stroke="rgba(56,189,248,0.18)" strokeWidth="64" strokeLinecap="round" />

            {/* Traveling shimmer along road */}
            <path d={ROAD_D} fill="none" strokeLinecap="round" strokeWidth="6">
              <animate attributeName="stroke"
                values="rgba(56,189,248,0.0);rgba(56,189,248,0.6);rgba(168,85,247,0.6);rgba(16,185,129,0.5);rgba(56,189,248,0.0)"
                dur="5s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="6;24;6" dur="5s" repeatCount="indefinite" />
            </path>

            {/* Center dashes / hidden path for car */}
            <path
              ref={pathRef}
              d={ROAD_D}
              fill="none"
              stroke="rgba(100,116,139,0.55)"
              strokeWidth="3.5"
              strokeDasharray="18 18"
              strokeLinecap="round"
            />
            <path d={ROAD_D} fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="12" strokeLinecap="round" />

            {/* START marker with breathing ring */}
            <g transform="translate(450,1460)">
              <circle r="26" fill="rgba(6,182,212,0.15)" stroke="#22d3ee" strokeWidth="1.5" opacity="0.7">
                <animate attributeName="r" values="26;40;26" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0.1;0.7" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle r="26" fill="rgba(6,182,212,0.15)" stroke="#22d3ee" strokeWidth="2.5" opacity="0.8" />
              <circle r="15" fill="#0891b2" />
              <circle r="7" fill="#e0f2fe" />
              <text y="52" textAnchor="middle" fill="#94a3b8" fontSize="24"
                fontFamily="system-ui" fontWeight="700" paintOrder="stroke"
                stroke="rgba(2,5,10,0.95)" strokeWidth="4">
                📍 My Location / Start Here
              </text>
            </g>

            {/* Destination markers */}
            {stops.map((s, i) => {
              const pos = markerPositions[i];
              if (!pos) return null;
              const isVisited = visitedSet.has(i);
              const isActive = activeStop === i;
              return (
                <g
                  key={s.id}
                  transform={`translate(${pos.x},${pos.y})`}
                  onClick={() => !isAnimating && travelTo(i)}
                  style={{ cursor: isAnimating ? "not-allowed" : "pointer" }}
                >
                  {/* Waypoint pin */}
                  <g>
                    {isActive && (
                      <circle r="34" fill="none" stroke={s.color} strokeWidth="2.5" opacity="0.5">
                        <animate attributeName="r" from="24" to="44" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.7" to="0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle r="22" fill={isActive ? `${s.color}40` : "rgba(15,23,42,0.9)"} stroke={s.color} strokeWidth="2.5" />
                    <circle r="10" fill={isActive ? "#ffffff" : s.color} />
                    <text y="1" textAnchor="middle" dominantBaseline="central" fill={isActive ? "#000" : "#fff"} fontSize="10" fontWeight="900">
                      {s.id}
                    </text>
                  </g>

                  {/* Connector line */}
                  <line
                    x1="22" y1="0"
                    x2={s.spotImage ? "60" : "50"} y2="0"
                    stroke={isActive ? s.color : "rgba(56,189,248,0.5)"}
                    strokeWidth="3" strokeDasharray="6 4"
                  />

                  {s.spotImage ? (
                    <g>
                      <defs>
                        <clipPath id={`clip-spot-${s.id}`}>
                          <rect x="60" y="-88" width="270" height="175" rx="18" />
                        </clipPath>
                      </defs>

                      {/* 3D drop-shadow */}
                      <rect x="66" y="-82" width="270" height="175" rx="18"
                        fill="rgba(0,0,0,0.6)" style={{ filter: "blur(9px)" }} />

                      {/* Active pulse ring */}
                      {isActive && (
                        <rect x="50" y="-98" width="290" height="195" rx="24"
                          fill="none" stroke={s.color} strokeWidth="3.5" opacity="0.65">
                          <animate attributeName="opacity" from="0.8" to="0" dur="1.6s" repeatCount="indefinite" />
                          <animate attributeName="width" from="270" to="306" dur="1.6s" repeatCount="indefinite" />
                          <animate attributeName="height" from="175" to="211" dur="1.6s" repeatCount="indefinite" />
                          <animate attributeName="x" from="60" to="42" dur="1.6s" repeatCount="indefinite" />
                          <animate attributeName="y" from="-88" to="-106" dur="1.6s" repeatCount="indefinite" />
                        </rect>
                      )}

                      {/* Landmark image */}
                      <image
                        href={s.spotImage} x="60" y="-88" width="270" height="175"
                        clipPath={`url(#clip-spot-${s.id})`}
                        preserveAspectRatio="xMidYMid slice"
                      />

                      {/* Shimmer overlay when active */}
                      {isActive && (
                        <rect x="60" y="-88" width="270" height="175" rx="18"
                          fill="url(#shimmer-grad)"
                          clipPath={`url(#clip-spot-${s.id})`}
                          opacity="0.6" />
                      )}

                      {/* Card border */}
                      <rect x="60" y="-88" width="270" height="175" rx="18"
                        fill="none"
                        stroke={isActive ? s.color : isVisited ? `${s.color}ee` : "rgba(56,189,248,0.75)"}
                        strokeWidth={isActive ? "4" : "2.5"} />

                      {/* Badge */}
                      <g transform="translate(70, -78)">
                        <rect x="0" y="0" width="56" height="28" rx="8"
                          fill="rgba(6,13,26,0.92)" stroke={s.color} strokeWidth="1.5" />
                        <text x="28" y="15" textAnchor="middle" dominantBaseline="central"
                          fill="#ffffff" fontSize="13" fontWeight="800">
                          {s.id} {s.icon}
                        </text>
                      </g>

                      {/* Label */}
                      <text x="195" y="-102" textAnchor="middle"
                        fill={isActive ? s.color : "#ffffff"}
                        fontSize="24" fontWeight="900" fontFamily="system-ui"
                        stroke="rgba(2,5,10,0.95)" strokeWidth="6" paintOrder="stroke"
                        style={{ userSelect: "none" }}>
                        {s.label}
                      </text>

                      {/* Tag */}
                      <text x="195" y="114" textAnchor="middle"
                        fill={isActive ? s.color : "rgba(148,163,184,0.95)"}
                        fontSize="16" fontFamily="monospace" fontWeight="700"
                        style={{ userSelect: "none" }}>
                        {s.tag}
                      </text>
                    </g>
                  ) : (
                    <g transform="translate(100, 0)">
                      {isActive && (
                        <>
                          <circle r="52" fill="none" stroke={s.color} strokeWidth="3" opacity="0.45">
                            <animate attributeName="r" from="42" to="66" dur="1.6s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.5" to="0" dur="1.6s" repeatCount="indefinite" />
                          </circle>
                          <circle r="42" fill={`${s.color}22`} stroke={s.color} strokeWidth="3.5" />
                        </>
                      )}
                      {!isActive && (
                        <circle r="42"
                          fill={isVisited ? `${s.color}18` : "rgba(15,23,42,0.85)"}
                          stroke={isVisited ? `${s.color}75` : "rgba(100,116,139,0.45)"}
                          strokeWidth="2.5" />
                      )}
                      <circle r="30"
                        fill={isActive ? `${s.color}40` : isVisited ? `${s.color}20` : "rgba(30,41,59,0.95)"}
                        stroke={isActive ? s.color : "rgba(51,65,85,0.85)"}
                        strokeWidth="1.5" />
                      <text textAnchor="middle" dominantBaseline="central" fontSize="32"
                        style={{ userSelect: "none" }}>{s.icon}</text>
                      <text y="-58" textAnchor="middle"
                        fill={isActive ? s.color : "#cbd5e1"}
                        fontSize="18" fontWeight="800" fontFamily="system-ui"
                        stroke="rgba(2,5,10,0.95)" strokeWidth="4.5" paintOrder="stroke"
                        style={{ userSelect: "none" }}>
                        {s.label}
                      </text>
                      <text y="64" textAnchor="middle"
                        fill={isActive ? `${s.color}bb` : "rgba(100,116,139,0.9)"}
                        fontSize="14" fontFamily="monospace"
                        style={{ userSelect: "none" }}>
                        {s.tag}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Explore button */}
            {explorePos && exploreStop !== null && (() => {
              const s = stops[exploreStop];
              return (
                <g
                  transform={`translate(${explorePos.x},${explorePos.y})`}
                  onClick={() => setPanel(s)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Breathing outer ring */}
                  <rect x="-115" y="-46" width="230" height="74" rx="37"
                    fill="none" stroke={s.color} strokeWidth="3" opacity="0.6">
                    <animate attributeName="width" values="230;252;230" dur="1.4s" repeatCount="indefinite" />
                    <animate attributeName="height" values="74;88;74" dur="1.4s" repeatCount="indefinite" />
                    <animate attributeName="x" values="-115;-126;-115" dur="1.4s" repeatCount="indefinite" />
                    <animate attributeName="y" values="-46;-53;-46" dur="1.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.12;0.6" dur="1.4s" repeatCount="indefinite" />
                  </rect>
                  <rect x="-95" y="-30" width="190" height="60" rx="30"
                    fill={s.color} filter="url(#glow-explore)" opacity="0.92" />
                  <rect x="-95" y="-30" width="190" height="60" rx="30"
                    fill={s.color} stroke="#ffffff" strokeWidth="2.5" />
                  {/* Shimmer sweep on button */}
                  <rect x="-95" y="-30" width="190" height="60" rx="30"
                    fill="url(#shimmer-grad)" opacity="0.5" />
                  <text textAnchor="middle" dominantBaseline="central"
                    fill="#000000" fontSize="26" fontWeight="900"
                    fontFamily="system-ui" style={{ userSelect: "none" }}>
                    Explore →
                  </text>
                </g>
              );
            })()}

            {/* Car with glow halo */}
            <g transform={`translate(${carPos.x},${carPos.y}) rotate(${carAngle})`}>
              <circle r="45" fill="rgba(6,182,212,0.18)" filter="url(#car-glow)">
                <animate attributeName="r" values="40;54;40" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.18;0.06;0.18" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <text textAnchor="middle" dominantBaseline="central" fontSize="60"
                style={{ userSelect: "none", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.95))" }}>
                🚗
              </text>
            </g>
          </svg>

          {/* Bottom legend */}
          <div className="relative z-10 px-5 pb-4 pt-2 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {stops.map((s, i) => (
              <button
                key={s.id}
                onClick={() => !isAnimating && travelTo(i)}
                disabled={isAnimating}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all border ${
                  activeStop === i
                    ? "scale-105"
                    : visitedSet.has(i)
                    ? "border-white/20 text-gray-300 hover:scale-105"
                    : "border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20"
                } ${isAnimating ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
                style={activeStop === i ? { color: s.color, borderColor: s.color } : {}}
              >
                {s.spotImage ? (
                  <img src={s.spotImage} alt={s.label} className="w-4 h-4 rounded-full object-cover border border-cyan-400/60 inline-block" />
                ) : (
                  <span>{s.icon}</span>
                )}
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {panel && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/88 backdrop-blur-md px-4 py-6"
          onClick={e => { if (e.target === e.currentTarget) setPanel(null); }}
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border bg-gradient-to-br from-[#060d1a] via-[#040814] to-[#02050a] shadow-2xl"
            style={{
              borderColor: `${panel.color}50`,
              boxShadow: `0 0 70px ${panel.glow}, 0 0 120px ${panel.glow}`,
              animation: "slideUpPanel 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <div className="h-1 w-full sticky top-0 z-20" style={{ background: `linear-gradient(to right, ${panel.color}, transparent)` }} />
            <div className="p-6 sm:p-8">
              <button
                onClick={() => setPanel(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer z-20"
              >
                <FaTimes size={13} />
              </button>

              {panel.spotImage && (
                <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-5 border border-white/15 shadow-xl">
                  <img src={panel.spotImage} alt={panel.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-400/40">
                      📍 {panel.label}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border"
                  style={{ background: `${panel.color}20`, borderColor: `${panel.color}50` }}>
                  {panel.icon}
                </div>
                <div>
                  <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold font-mono tracking-wider uppercase mb-1"
                    style={{ background: `${panel.color}22`, color: panel.color, border: `1px solid ${panel.color}50` }}>
                    {panel.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black geist-font text-white leading-tight">{panel.label}</h3>
                </div>
              </div>

              {/* College Items / Achievements List */}
              {panel.items && panel.items.length > 0 && (
                <div className="space-y-3.5 mb-6">
                  <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Colleges & Participations ({panel.items.length})
                  </p>
                  {panel.items.map((item) => (
                    <div
                      key={item.id}
                      className="relative p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-sm sm:text-base geist-font group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-yellow-400 font-semibold text-xs mt-0.5 inter-font">
                          {item.role}
                        </p>
                        <p className="text-slate-400 text-xs mt-1.5 flex items-center gap-1.5 inter-font">
                          <span>📍</span> {item.location}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          if (setPhotoModal) {
                            setPhotoModal({
                              show: true,
                              title: `${item.title} — ${item.location}`,
                              images: item.images
                            });
                          }
                        }}
                        className="px-4 py-2 rounded-xl text-white text-xs font-bold font-mono tracking-wide flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer border flex-shrink-0"
                        style={{
                          background: `linear-gradient(to right, ${panel.color}40, ${panel.color}20)`,
                          borderColor: `${panel.color}70`,
                          boxShadow: `0 0 15px ${panel.glow}`
                        }}
                      >
                        <FaExternalLinkAlt size={10} />
                        <span>View Certificates</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs sm:text-sm text-gray-400 inter-font leading-relaxed mb-5">{panel.desc}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setPanel(null)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 text-xs font-bold transition-all cursor-pointer text-center"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUpPanel {
          from { opacity: 0; transform: translateY(40px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

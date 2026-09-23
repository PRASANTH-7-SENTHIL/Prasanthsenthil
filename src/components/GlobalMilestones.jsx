import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  FaTrophy, FaLightbulb, FaLaptopCode, FaGlobeAsia, 
  FaCamera, FaAward, FaExternalLinkAlt, FaCompass,
  FaUsers, FaChartLine, FaFileAlt
} from 'react-icons/fa';

const globalMilestones = [
  {
    id: "01",
    index: 0,
    country: "INDIA",
    flag: "🇮🇳",
    activity: "HACKATHON",
    tagline: "Home to Ideas",
    quote: "A small step from here to a bigger world.",
    lat: 20.5937,
    lon: 78.9629,
    year: "2024 — 2025",
    achievement: "Best Innovation Award & Finalist",
    location: "Erode Sengundar · KPR Institute · SRM IST",
    description: "Built high-impact solutions across national hackathons, winning the Best Innovation Award and competing as a finalist among top national engineering squads.",
    image: "/landmarks/india.jpg",
    images: [
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166529/portfolio/certificates/award_cert.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166535/portfolio/certificates/hackathon_cert.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166790/portfolio/kpr_hackathon/kpr_certificate.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166885/portfolio/srm_hackathon/srm_cert.jpg'
    ],
    stats: [
      { label: "Ideas", desc: "Top Ranked", icon: "lightbulb" },
      { label: "People", desc: "3+ Teams", icon: "users" },
      { label: "Growth", desc: "Winner & Finalist", icon: "growth" }
    ],
    highlightColor: "#38bdf8",
    accentGlow: "rgba(56, 189, 248, 0.4)"
  },
  {
    id: "02",
    index: 1,
    country: "RUSSIA",
    flag: "🇷🇺",
    activity: "PAPER PRESENTATION",
    tagline: "Research Without Limits",
    quote: "Rigorous inquiry turns technical ideas into published impact.",
    lat: 61.5240,
    lon: 105.3188,
    year: "2024",
    achievement: "2× Winner — Technical Papers",
    location: "Salem Local Center · Sengunthar Engg College",
    description: "Authored and presented technical papers on advanced electrical machines and intelligent energy systems, securing two 1st prizes across academic forums.",
    image: "/landmarks/russia.jpg",
    images: [
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166838/portfolio/salem_paper/cert1.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166840/portfolio/salem_paper/cert2.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166842/portfolio/salem_paper/cert3.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166844/portfolio/salem_paper/event.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166849/portfolio/sengunthar_paper/cert1.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166851/portfolio/sengunthar_paper/cert2.jpg'
    ],
    stats: [
      { label: "Papers", desc: "2 Published", icon: "doc" },
      { label: "Awards", desc: "2× Winner", icon: "trophy" },
      { label: "Impact", desc: "Peer Reviewed", icon: "growth" }
    ],
    highlightColor: "#a855f7",
    accentGlow: "rgba(168, 85, 247, 0.4)"
  },
  {
    id: "03",
    index: 2,
    country: "AMERICA",
    flag: "🇺🇸",
    activity: "PROJECT",
    tagline: "Innovation Hub",
    quote: "Transforming engineering concepts into deployable full-stack products.",
    lat: 37.0902,
    lon: -95.7129,
    year: "2024 — 2025",
    achievement: "2× Winner — Project Expos",
    location: "SONA College of Technology · GCE Salem",
    description: "Engineered scalable software and hardware systems including AI Smart Education System and IoT Smart Water Monitoring, clinching multiple expo winner awards.",
    image: "/landmarks/america.jpg",
    images: [
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166856/portfolio/sona_expo/cert.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166857/portfolio/sona_expo/img1.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166858/portfolio/sona_expo/img2.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166569/portfolio/gce_expo/cert1.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166571/portfolio/gce_expo/cert2.jpg'
    ],
    stats: [
      { label: "Builds", desc: "Full Stack & IoT", icon: "laptop" },
      { label: "Awards", desc: "2× Winner", icon: "trophy" },
      { label: "Tech", desc: "AI / Cloud", icon: "growth" }
    ],
    highlightColor: "#3b82f6",
    accentGlow: "rgba(59, 130, 246, 0.4)"
  },
  {
    id: "04",
    index: 3,
    country: "JAPAN",
    flag: "🇯🇵",
    activity: "IDEATHON",
    tagline: "Technology & Discipline",
    quote: "Precision thinking and user-centric ideation solve complex problems.",
    lat: 36.2048,
    lon: 138.2529,
    year: "2024",
    achievement: "1× Winner — Ideathon",
    location: "Mahendra Engineering College",
    description: "Formulated innovative engineering architectures addressing real-world civic challenges, winning 1st place in the national-level ideathon pitch.",
    image: "/landmarks/japan.jpg",
    images: [
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166741/portfolio/ideathon/cert.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166743/portfolio/ideathon/img1.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166745/portfolio/ideathon/img2.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166763/portfolio/ideathon/img3.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166765/portfolio/ideathon/img4.jpg'
    ],
    stats: [
      { label: "Ideation", desc: "Rapid Pitch", icon: "lightbulb" },
      { label: "Prize", desc: "1st Place", icon: "trophy" },
      { label: "Vision", desc: "Next-Gen Tech", icon: "growth" }
    ],
    highlightColor: "#ef4444",
    accentGlow: "rgba(239, 68, 68, 0.4)"
  },
  {
    id: "05",
    index: 4,
    country: "AUSTRALIA",
    flag: "🇦🇺",
    activity: "INTERNATIONAL CONFERENCE",
    tagline: "Growth Through Diversity",
    quote: "Exchanging technical perspectives across global academia.",
    lat: -25.2744,
    lon: 133.7751,
    year: "2025",
    achievement: "International Conference Presentation",
    location: "Annapoorana Engineering College",
    description: "Presented research findings before an international panel of scholars, exploring emerging technological breakthroughs and interdisciplinary research.",
    image: "/landmarks/australia.jpg",
    images: [
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166504/portfolio/annapoorana/img1.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166515/portfolio/annapoorana/img2.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166523/portfolio/annapoorana/img3.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166526/portfolio/annapoorana/img4.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166528/portfolio/annapoorana/img5.jpg'
    ],
    stats: [
      { label: "Forum", desc: "International", icon: "globe" },
      { label: "Scholars", desc: "Global Reach", icon: "users" },
      { label: "Topics", desc: "Future Systems", icon: "growth" }
    ],
    highlightColor: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.4)"
  },
  {
    id: "06",
    index: 5,
    country: "CHINA",
    flag: "🇨🇳",
    activity: "NON-TECHNICAL",
    tagline: "Collaboration for a Smarter Tomorrow",
    quote: "Creativity and observation unlock new dimensions of leadership.",
    lat: 35.8617,
    lon: 104.1954,
    year: "2024",
    achievement: "3rd Prize — Photography & Creative Arts",
    location: "Dhirajlal Gandhi College of Technology",
    description: "Celebrated for photographic perspective and creative framing, capturing cultural narratives and proving versatile visual communication beyond pure engineering.",
    image: "/landmarks/china.jpg",
    images: [
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166817/portfolio/photography/img1.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166819/portfolio/photography/img2.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166821/portfolio/photography/img3.jpg'
    ],
    stats: [
      { label: "Visuals", desc: "Photo Story", icon: "camera" },
      { label: "Award", desc: "3rd Prize", icon: "trophy" },
      { label: "Perspective", desc: "Creative Eye", icon: "growth" }
    ],
    highlightColor: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.4)"
  },
  {
    id: "07",
    index: 6,
    country: "PORTUGAL",
    flag: "🇵🇹",
    activity: "SPORTS",
    tagline: "Exploring New Horizons",
    quote: "Resilience, stamina, and team spirit forge lasting leadership.",
    lat: 39.3999,
    lon: -8.2245,
    year: "2024 — 2025",
    achievement: "4th Prize Captain (₹4000 Cash Prize)",
    location: "Inter-College Cricket Tournament",
    description: "Captained the collegiate cricket team with strategic field management, discipline, and stamina, clinching 4th place and a ₹4000 cash award in inter-college play.",
    image: "/landmarks/portugal.jpg",
    images: [
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166546/portfolio/cricket/cert1.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166555/portfolio/cricket/cert2.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166561/portfolio/cricket/img1.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166564/portfolio/cricket/img2.jpg', 
      'https://res.cloudinary.com/oaktnbdl/image/upload/v1790166565/portfolio/cricket/img3.jpg'
    ],
    stats: [
      { label: "Role", desc: "Team Captain", icon: "trophy" },
      { label: "Prize", desc: "₹4000 Cash", icon: "award" },
      { label: "Squad", desc: "Tournament", icon: "users" }
    ],
    highlightColor: "#06b6d4",
    accentGlow: "rgba(6, 182, 212, 0.4)"
  }
];

function latLongToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function getTargetQuaternion(lat, lon) {
  const unitVec = latLongToVector3(lat, lon, 1).normalize();
  const targetVec = new THREE.Vector3(0.05, 0.05, 1).normalize();
  const quat = new THREE.Quaternion();
  quat.setFromUnitVectors(unitVec, targetVec);
  return quat;
}

export default function GlobalMilestones({ setPhotoModal }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const activeMilestone = globalMilestones[activeIndex];

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const earthGroupRef = useRef(null);
  const cloudsMeshRef = useRef(null);
  const markersRef = useRef([]);
  const targetQuatRef = useRef(new THREE.Quaternion());
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const blueBackLight = new THREE.DirectionalLight(0x0088ff, 1.8);
    blueBackLight.position.set(-5, -2, -3);
    scene.add(blueBackLight);

    const starCount = 600;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      const radius = 20 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      starPositions[idx] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[idx + 2] = radius * Math.cos(phi);

      const brightness = 0.6 + Math.random() * 0.4;
      starColors[idx] = 0.5 * brightness;
      starColors[idx + 1] = 0.8 * brightness;
      starColors[idx + 2] = 1.0 * brightness;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    const earthGroup = new THREE.Group();
    earthGroupRef.current = earthGroup;
    scene.add(earthGroup);

    const initialQuat = getTargetQuaternion(globalMilestones[0].lat, globalMilestones[0].lon);
    earthGroup.quaternion.copy(initialQuat);
    targetQuatRef.current.copy(initialQuat);

    const textureLoader = new THREE.TextureLoader();
    const earthRadius = 2.15;

    const dayTexture = textureLoader.load('https://res.cloudinary.com/oaktnbdl/image/upload/v1790166965/portfolio/textures/earth_day.jpg');
    const lightsTexture = textureLoader.load('https://res.cloudinary.com/oaktnbdl/image/upload/v1790166968/portfolio/textures/earth_lights.png');
    const specularTexture = textureLoader.load('https://res.cloudinary.com/oaktnbdl/image/upload/v1790166970/portfolio/textures/earth_specular.jpg');
    const cloudsTexture = textureLoader.load('https://res.cloudinary.com/oaktnbdl/image/upload/v1790166962/portfolio/textures/earth_clouds.png');

    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: dayTexture,
      roughnessMap: specularTexture,
      roughness: 0.45,
      metalness: 0.1,
      emissiveMap: lightsTexture,
      emissive: new THREE.Color(0xffd570),
      emissiveIntensity: 1.15
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    const cloudsGeo = new THREE.SphereGeometry(earthRadius + 0.025, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    cloudsMeshRef.current = cloudsMesh;
    earthGroup.add(cloudsMesh);

    const atmosphereVertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const atmosphereFragmentShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vec3 viewDir = normalize(-vPosition);
        float intensity = pow(0.72 - dot(vNormal, viewDir), 2.6);
        gl_FragColor = vec4(0.22, 0.68, 1.0, 1.0) * intensity * 1.8;
      }
    `;

    const atmosGeo = new THREE.SphereGeometry(earthRadius * 1.14, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosMesh);

    const ringGeo = new THREE.RingGeometry(earthRadius * 1.25, earthRadius * 1.265, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00b4d8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI * 0.45;
    scene.add(ringMesh);

    const markers = [];
    globalMilestones.forEach((m, idx) => {
      const markerGroup = new THREE.Group();
      const pos = latLongToVector3(m.lat, m.lon, earthRadius + 0.015);
      markerGroup.position.copy(pos);

      const normal = pos.clone().normalize();
      markerGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

      const coreGeo = new THREE.CircleGeometry(0.045, 24);
      const coreMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0x38bdf8 : 0xffffff,
        side: THREE.DoubleSide,
        depthTest: false
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      markerGroup.add(coreMesh);

      const waveGeo = new THREE.RingGeometry(0.05, 0.09, 24);
      const waveMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0x38bdf8 : 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        depthTest: false,
        blending: THREE.AdditiveBlending
      });
      const waveMesh = new THREE.Mesh(waveGeo, waveMat);
      markerGroup.add(waveMesh);

      const waveGeo2 = new THREE.RingGeometry(0.09, 0.13, 24);
      const waveMat2 = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
        depthTest: false,
        blending: THREE.AdditiveBlending
      });
      const waveMesh2 = new THREE.Mesh(waveGeo2, waveMat2);
      markerGroup.add(waveMesh2);

      const pinGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.22, 12);
      pinGeo.translate(0, 0.11, 0);
      const pinMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.rotation.x = Math.PI * 0.5;
      markerGroup.add(pinMesh);

      earthGroup.add(markerGroup);

      markers.push({
        group: markerGroup,
        coreMat,
        waveMesh,
        waveMat,
        waveMesh2,
        waveMat2
      });
    });
    markersRef.current = markers;

    let animationFrameId;
    let startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      if (earthGroupRef.current) {
        earthGroupRef.current.quaternion.slerp(targetQuatRef.current, 0.075);
      }

      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y += 0.0006;
      }

      const curActive = activeIndexRef.current;
      markersRef.current.forEach((m, idx) => {
        const isActive = idx === curActive;
        const pulseSpeed = isActive ? 3.5 : 2.0;
        const pulse = (Math.sin(elapsed * pulseSpeed + idx) + 1) * 0.5;

        if (isActive) {
          m.coreMat.color.setHex(0xffffff);
          m.waveMesh.scale.setScalar(1 + pulse * 0.6);
          m.waveMat.opacity = 0.9 - pulse * 0.4;
          m.waveMesh2.scale.setScalar(1 + pulse * 0.9);
          m.waveMat2.opacity = 0.5 - pulse * 0.3;
        } else {
          m.coreMat.color.setHex(0x94a3b8);
          m.waveMesh.scale.setScalar(1 + pulse * 0.2);
          m.waveMat.opacity = 0.3;
          m.waveMesh2.scale.setScalar(1);
          m.waveMat2.opacity = 0.15;
        }
      });

      atmosMesh.rotation.y = elapsed * 0.02;
      ringMesh.rotation.z = elapsed * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      if (scrollHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / scrollHeight));
      setScrollPercent(progress);

      const exactIndex = progress * (globalMilestones.length - 1);
      const roundedIndex = Math.min(
        globalMilestones.length - 1,
        Math.max(0, Math.round(exactIndex))
      );

      if (roundedIndex !== activeIndex) {
        setActiveIndex(roundedIndex);
      }

      const baseIdx = Math.min(globalMilestones.length - 2, Math.max(0, Math.floor(exactIndex)));
      const alpha = exactIndex - baseIdx;
      const q1 = getTargetQuaternion(globalMilestones[baseIdx].lat, globalMilestones[baseIdx].lon);
      const q2 = getTargetQuaternion(globalMilestones[baseIdx + 1].lat, globalMilestones[baseIdx + 1].lon);

      const targetQuat = q1.clone().slerp(q2, alpha);
      targetQuatRef.current.copy(targetQuat);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const scrollToMilestone = (idx) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollHeight = container.offsetHeight - window.innerHeight;
    const targetScroll = (idx / (globalMilestones.length - 1)) * scrollHeight;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: containerTop + targetScroll,
      behavior: 'smooth'
    });
  };

  const getMilestoneIcon = (iconName) => {
    switch (iconName) {
      case 'lightbulb': return <FaLightbulb className="text-cyan-400" />;
      case 'users': return <FaUsers className="text-blue-400" />;
      case 'growth': return <FaChartLine className="text-emerald-400" />;
      case 'trophy': return <FaTrophy className="text-amber-400" />;
      case 'laptop': return <FaLaptopCode className="text-blue-400" />;
      case 'globe': return <FaGlobeAsia className="text-teal-400" />;
      case 'doc': return <FaFileAlt className="text-purple-400" />;
      case 'camera': return <FaCamera className="text-amber-400" />;
      default: return <FaAward className="text-cyan-400" />;
    }
  };

  return (
    <section 
      ref={containerRef}
      id="milestones" 
      className="relative w-full bg-[#02050e] text-white select-none"
      style={{ height: '480vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8 lg:p-12">
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-transparent rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/8 rounded-full blur-[120px]" />
        </div>

        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        <div className="relative z-10 flex items-start justify-between w-full max-w-7xl mx-auto">
          <div>
            <p className="text-slate-400 font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase font-semibold">
              A GLOBAL JOURNEY
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black geist-font tracking-tight mt-1 leading-none">
              ONE WORLD <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                MANY OPPORTUNITIES
              </span>
            </h2>
            <p className="text-slate-400 inter-font text-xs sm:text-sm mt-2 font-medium tracking-wide">
              Exploring Possibilities Beyond Borders
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-12 h-[1px] bg-cyan-400/40 hidden sm:block" />
            <span className="font-mono text-sm sm:text-lg font-bold text-slate-300 tracking-widest">
              <span className="text-cyan-400 text-lg sm:text-2xl">{activeMilestone.id}</span> / 07
            </span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-7xl mx-auto items-center flex-1 my-auto pointer-events-none">
          
          <div className="lg:col-span-5 pointer-events-auto">
            <div 
              key={activeMilestone.id}
              className="glass-card rounded-2xl p-5 sm:p-7 border border-cyan-400/40 bg-gradient-to-br from-slate-950/85 via-slate-900/80 to-[#061022]/90 backdrop-blur-2xl shadow-[0_0_35px_rgba(6,182,212,0.25)] transition-all duration-500 transform translate-y-0"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-cyan-400/50 flex-shrink-0 shadow-lg group">
                  <img 
                    src={activeMilestone.image} 
                    alt={activeMilestone.country}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400/80 tracking-wider">
                      {activeMilestone.id} / 07
                    </span>
                    <span className="text-xs">{activeMilestone.flag}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black geist-font text-white tracking-wide mt-0.5 leading-tight">
                    {activeMilestone.country}
                  </h3>
                  <p className="text-xs text-cyan-300 font-mono tracking-wider">
                    {activeMilestone.tagline}
                  </p>
                </div>
              </div>

              <div className="mb-3 pt-2 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 tracking-[0.25em] uppercase block">
                    ACTIVITY
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black geist-font text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 tracking-wide">
                    {activeMilestone.activity}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase block">
                    YEAR
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono">
                    {activeMilestone.year}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-serif italic mb-2 leading-relaxed">
                "{activeMilestone.quote}"
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 mb-4">
                <p className="text-xs font-semibold text-cyan-200 inter-font">
                  🏆 {activeMilestone.achievement}
                </p>
                <p className="text-[11px] text-slate-400 inter-font mt-0.5">
                  📍 {activeMilestone.location}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 border-t border-white/10">
                {activeMilestone.stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-xs flex-shrink-0">
                      {getMilestoneIcon(s.icon)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-bold geist-font text-[11px] tracking-wider uppercase truncate">
                        {s.label}
                      </p>
                      <p className="text-slate-400 inter-font text-[9px] truncate">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setPhotoModal({
                  show: true,
                  title: `${activeMilestone.country} — ${activeMilestone.activity}`,
                  images: activeMilestone.images
                })}
                className="w-full mt-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600/30 via-cyan-500/30 to-blue-500/20 border border-cyan-400/50 hover:border-cyan-300 hover:bg-cyan-500/40 text-cyan-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
              >
                <span>VIEW CERTIFICATES &amp; DETAILS</span>
                <FaExternalLinkAlt size={11} />
              </button>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4 pointer-events-none" />

          <div className="hidden lg:flex lg:col-span-3 flex-col items-end pointer-events-auto">
            <div className="relative flex flex-col space-y-4 pl-4">
              
              <div className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-slate-800" />
              <div 
                className="absolute left-[7px] top-3 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-300 transition-all duration-300"
                style={{ 
                  height: `${(activeIndex / (globalMilestones.length - 1)) * 92}%` 
                }}
              />

              {globalMilestones.map((m, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={m.id}
                    onClick={() => scrollToMilestone(idx)}
                    className={`relative flex items-center gap-3 cursor-pointer group transition-all duration-300 ${
                      isActive ? 'translate-x-[-4px]' : 'opacity-50 hover:opacity-85'
                    }`}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <div 
                        className={`rounded-full transition-all duration-300 ${
                          isActive 
                            ? 'w-4 h-4 bg-cyan-400 shadow-[0_0_15px_rgba(56,189,248,1)] ring-4 ring-cyan-500/30' 
                            : 'w-2.5 h-2.5 bg-slate-600 group-hover:bg-slate-400'
                        }`} 
                      />
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-mono text-xs font-bold transition-colors ${
                          isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                        }`}>
                          {m.id}
                        </span>
                        <span className={`geist-font text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                        }`}>
                          {m.country}
                        </span>
                      </div>
                      <p className={`font-mono text-[10px] tracking-wider uppercase transition-colors ${
                        isActive ? 'text-cyan-300 font-semibold' : 'text-slate-500'
                      }`}>
                        {m.activity}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          
          <div className="hidden sm:block text-left">
            <p className="font-mono text-[10px] text-slate-400 tracking-[0.25em] uppercase">
              DIFFERENT PLACES
            </p>
            <p className="font-mono text-[11px] text-cyan-400 font-semibold tracking-[0.2em] uppercase">
              SAME PASSION
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase">
              <span className="inline-block w-3 h-4 border border-slate-500 rounded-full relative">
                <span className="w-1 h-1 bg-cyan-400 rounded-full absolute left-1/2 -translate-x-1/2 top-1 animate-bounce" />
              </span>
              <span>SCROLL TO EXPLORE</span>
            </div>

            <div className="flex items-center gap-2">
              {globalMilestones.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToMilestone(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? 'w-8 bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]'
                      : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  title={`Go to ${globalMilestones[idx].country}`}
                />
              ))}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 text-right">
            <div>
              <p className="font-mono text-[10px] text-slate-400 tracking-[0.25em] uppercase">
                IDEAS HAVE
              </p>
              <p className="font-mono text-[11px] text-cyan-400 font-semibold tracking-[0.2em] uppercase">
                NO BORDERS
              </p>
            </div>
            <FaCompass className="text-cyan-400 text-lg animate-spin" style={{ animationDuration: '30s' }} />
          </div>

        </div>

      </div>
    </section>
  );
}

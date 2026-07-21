import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Inline Button component
const Button = React.forwardRef(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// BlurText animation component
const BlurText = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export default function LandingPage() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const menuItems = [
    { label: "HOME", href: "/portfolio", highlight: true },
    { label: "ABOUT", href: "/portfolio#about" },
    { label: "PROJECTS", href: "/portfolio#projects" },
    { label: "EXPERIENCE", href: "/portfolio#experience" },
    { label: "EDUCATION", href: "/portfolio#education" },
    { label: "CONTACT", href: "/portfolio#contact" },
  ];

  return (
    <div 
      className="min-h-screen text-foreground transition-colors"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
        fontFamily: '"Times New Roman", Times, serif',
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Menu Button */}
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50 text-neutral-500 hover:text-black dark:hover:text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              ) : (
                <Menu className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              )}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full left-0 w-[200px] md:w-[240px] border-none shadow-2xl mt-2 ml-4 p-4 rounded-lg z-[100]"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
                }}
              >
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300"
                    style={{
                      color: item.highlight ? "#C3E41D" : isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C3E41D";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = item.highlight ? "#C3E41D" : (isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)");
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Signature */}
          <div className="text-4xl font-bold" style={{ color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)" }}>
            P
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity"
            style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)" }}
            aria-label="Toggle theme"
          >
            <div
              className="absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300"
              style={{
                backgroundColor: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                transform: isDark ? "translateX(2rem)" : "translateX(0)",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col">
        {/* Centered Main Name */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
          `}</style>
          <div className="relative text-center animate-float">
            <div>
              <BlurText
                text="PRASANTH"
                delay={80}
                animateBy="letters"
                direction="top"
                className="font-bold text-[50px] sm:text-[80px] md:text-[110px] lg:text-[150px] leading-[0.8] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#C3E41D" }}
              />
            </div>
            <div className="mt-4 md:mt-8">
              <BlurText
                text="SENTHIL KUMAR"
                delay={50}
                animateBy="letters"
                direction="top"
                className="font-bold text-[35px] sm:text-[50px] md:text-[70px] lg:text-[100px] leading-[0.8] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#C3E41D" }}
              />
            </div>

            {/* Profile Picture */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-[85px] h-[120px] sm:w-[120px] sm:h-[170px] md:w-[150px] md:h-[210px] lg:w-[180px] lg:h-[250px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer">
                <img
                  src="/profile.png"
                  alt="Profile"
                  className="w-full h-full object-cover object-[center_top]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline and Button */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-28 xl:bottom-32 left-1/2 -translate-x-1/2 w-full px-6 flex flex-col items-center">
          <BlurText
            text="Hii Innovators........."
            delay={150}
            animateBy="words"
            direction="top"
            className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white mb-6"
          />
          
          {/* Explore My Skills Button */}
          <button 
            onClick={() => navigate('/portfolio')}
            className="group relative px-6 py-3 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            style={{ 
              backgroundColor: "#C3E41D", 
              color: "#000"
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore My Skills
              <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

      </main>
    </div>
  );
}

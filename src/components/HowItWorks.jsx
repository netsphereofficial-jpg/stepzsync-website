import { useRef, useState, useEffect } from "react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Walk Anywhere",
      description: "Open the app and start walking. Your local park, neighborhood, or treadmill—it all counts.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="#00D4FF" strokeWidth="2">
          <path d="M24 8v8M24 28v12M20 12l4-4 4 4M20 36l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="24" cy="20" r="4"/>
          <path d="M16 32c0-4.418 3.582-8 8-8s8 3.582 8 8" strokeLinecap="round"/>
        </svg>
      ),
      color: "#00D4FF"
    },
    {
      number: "02",
      title: "Join a Race",
      description: "Pick a route anywhere in the world. New York, Tokyo, Paris—your steps move you on the real map.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="#39FF14" strokeWidth="2">
          <circle cx="24" cy="24" r="16"/>
          <path d="M24 8v4M24 36v4M8 24h4M36 24h4" strokeLinecap="round"/>
          <circle cx="24" cy="24" r="6"/>
          <path d="M30 18l6-6" strokeLinecap="round"/>
          <path d="M34 14l2-2" strokeLinecap="round"/>
        </svg>
      ),
      color: "#39FF14"
    },
    {
      number: "03",
      title: "Compete Live",
      description: "See other racers in real-time. Push harder. Cross the finish line first.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="#FF2E63" strokeWidth="2">
          <circle cx="16" cy="20" r="6"/>
          <circle cx="32" cy="20" r="6"/>
          <path d="M16 28c-4 0-8 2-8 6v4h16v-4c0-4-4-6-8-6z"/>
          <path d="M32 28c-4 0-8 2-8 6v4h16v-4c0-4-4-6-8-6z"/>
          <path d="M20 10l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "#FF2E63"
    }
  ];

  // ---- Scroll reveal (self-contained, dependency-free, build/no-JS safe) ----
  const sectionRef = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ---- Pointer tilt + glow-follow (gated to fine pointer; touch unaffected) ----
  const canTilt = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleCardMove = (e) => {
    if (!canTilt()) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 12; // ±6deg
    const rotateX = (0.5 - py) * 12; // ±6deg
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    card.style.transition = "transform 0.4s ease-out";
    card.style.transform = "";
    window.setTimeout(() => {
      card.style.transition = "";
    }, 400);
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{ scrollMarginTop: "96px" }}
      className={`section-anchor py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden reveal ${shown ? "is-visible" : ""}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-premium opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center section-header">
          <p
            className="eyebrow-lock text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-[#FF6B35] mb-4"
            style={{ transitionDelay: "0ms" }}
          >
            Simple as Walking
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
            Three Steps to Your First Race
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connecting Line — grows scaleX(0)->scaleX(1) on reveal */}
          <div
            className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-[#FF6B35]/30 origin-left"
            style={{
              transform: shown ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.6s ease-out",
              transitionDelay: "260ms",
            }}
            aria-hidden="true"
          ></div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              className="relative bg-[#021F29] border border-[#0F3460]/50 rounded-3xl p-8 lg:p-10 card-hover group will-change-transform"
              style={{
                transitionDelay: `${Math.min(index, 4) * 80}ms`,
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s ease-out ${Math.min(index, 4) * 80}ms, transform 0.6s ease-out ${Math.min(index, 4) * 80}ms`,
              }}
            >
              {/* Pointer-following radial glow overlay (fine-pointer only) */}
              <div className="tilt-glow"></div>

              {/* Number Background */}
              <div className="absolute top-4 right-4 text-7xl font-bold opacity-10" style={{ color: step.color }}>
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-6 relative z-10 transition-transform group-hover:scale-110">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="relative z-10 text-xl font-bold mb-3">{step.title}</h3>
              <p className="relative z-10 text-sm text-gray-400 leading-relaxed">{step.description}</p>

              {/* Step Number Badge */}
              <div
                className="absolute -top-4 left-8 px-4 py-1 rounded-full text-sm font-semibold z-10"
                style={{ backgroundColor: step.color + '20', color: step.color }}
              >
                Step {step.number}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Visual — fades in on reveal */}
        <div
          className="mt-20 flex justify-center"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease-out 360ms, transform 0.7s ease-out 360ms",
          }}
        >
          <div className="flex items-center gap-4 text-gray-500">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#FF6B35]"></div>
            <span className="text-sm uppercase tracking-wider">Start walking in under 60 seconds</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#FF6B35]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

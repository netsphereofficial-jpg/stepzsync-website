import { useEffect, useRef, useState } from "react";

export default function AppGallery() {
  const screenshots = [
    { src: "/images/App screen_01.png", alt: "Race map view" },
    { src: "/images/App screen_02.png", alt: "Live tracking" },
    { src: "/images/App screen_03.png", alt: "Leaderboard" },
    { src: "/images/App screen_04.png", alt: "Race selection" },
    { src: "/images/App screen_06.png", alt: "Profile stats" },
    { src: "/images/App screen_07.png", alt: "Global routes" },
  ];

  // --- Canonical scroll-reveal (dependency-free, build/no-JS safe) ---
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Engage the .reveal hidden base only AFTER mount so first paint / no-JS
    // renders fully visible (content can never be trapped).
    if (typeof document !== "undefined") {
      document.body.dataset.mounted = "true";
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const el = ref.current;
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

  // --- Pointer tilt + glow-follow (fine-pointer/hover gated) ---
  const handlePointerMove = (e) => {
    const card = e.currentTarget;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (px - 0.5) * 12; // ±6deg
    const rotateX = (0.5 - py) * 12; // ±6deg
    const frame = card.querySelector("[data-tilt-frame]");
    if (frame) {
      frame.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    }
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
  };

  const handlePointerLeave = (e) => {
    const card = e.currentTarget;
    const frame = card.querySelector("[data-tilt-frame]");
    if (frame) {
      frame.style.transform = "";
    }
  };

  return (
    <section
      ref={ref}
      className={`section-anchor reveal ${shown ? "is-visible" : ""} py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden`}
    >
      {/* Background gradient (dialed down for atmosphere, not clutter) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue rounded-full opacity-5 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center section-header">
          <p className="eyebrow-lock text-electric-blue uppercase text-xs md:text-sm font-semibold tracking-[0.25em] mb-4">
            Experience the App
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
            See It In <span className="text-neon-green">Action</span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Stunning race views, real-time tracking, and competitive leaderboards
          </p>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              className={`group relative cursor-pointer reveal ${shown ? "is-visible" : ""}`}
              style={{
                transitionDelay: shown ? `${Math.min(index, 4) * 80}ms` : "0ms",
              }}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              <div
                data-tilt-frame
                className="phone-frame-mini relative overflow-hidden rounded-2xl border border-white/10 hover:border-electric-blue/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-electric-blue/20 will-change-transform"
              >
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {/* Pointer-following glow overlay (fine-pointer gated via CSS) */}
                <div className="tilt-glow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";

export default function Social() {
  const features = [
    {
      title: "Build Your Crew",
      description: "Add friends, follow top racers, create teams. Your personal walking community.",
      icon: (
        <svg className="w-8 h-8 text-[#FF2E63]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
        </svg>
      )
    },
    {
      title: "Talk While You Walk",
      description: "In-race messaging. Trash talk your opponents. Cheer on teammates.",
      icon: (
        <svg className="w-8 h-8 text-[#2759FF]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      title: "Climb the Rankings",
      description: "Weekly, monthly, all-time boards. Regional and global. See where you stand.",
      icon: (
        <svg className="w-8 h-8 text-[#39FF14]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"/>
        </svg>
      )
    }
  ];

  // ---- Canonical scroll-reveal (dependency-free, build/no-JS safe) ----
  const sectionRef = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Mark body as mounted so .reveal's hidden base state can engage
    // (CSS gates the hidden state under body[data-mounted]).
    document.body.dataset.mounted = "true";

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

  // ---- Counter-parallax for floating cards (rAF, ref-driven, fine-pointer) ----
  const floatNotifRef = useRef(null);
  const floatOnlineRef = useRef(null);
  const floatHeartRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let ticking = false;
    const apply = () => {
      ticking = false;
      const isMobile = window.innerWidth < 768;
      const factor = isMobile ? 0.025 : 0.05;
      // Counter-parallax: floating cards drift opposite the scroll for depth.
      const raw = (window.scrollY - (window.innerHeight || 0)) * factor;
      const y = Math.max(-40, Math.min(40, raw));
      if (floatNotifRef.current)
        floatNotifRef.current.style.setProperty("--parallax", `${(-y).toFixed(1)}px`);
      if (floatOnlineRef.current)
        floatOnlineRef.current.style.setProperty("--parallax", `${y.toFixed(1)}px`);
      if (floatHeartRef.current)
        floatHeartRef.current.style.setProperty("--parallax", `${(-y * 0.6).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- Optional hover tilt on feature cards (fine-pointer only) ----
  const handleTiltMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 6;
    const ry = (px - 0.5) * 6;
    card.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
    card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };
  const handleTiltLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = "";
  };

  // Staggered reveal delay helper for the left column beat (header -> body
  // -> supporting). Returns 0 until shown so nothing is trapped.
  const beat = (ms) => ({ transitionDelay: shown ? `${ms}ms` : "0ms" });

  return (
    <section
      id="social"
      ref={sectionRef}
      style={{ scrollMarginTop: "96px" }}
      className={`section-anchor py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden ${shown ? "is-visible" : ""}`}
    >
      {/* Background accent — pink orb, atmospheric drift */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#FF2E63] rounded-full opacity-5 blur-3xl -translate-y-1/2 animate-float motion-reduce:animate-none pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Eyebrow — neon-pink owned accent, locks in on reveal */}
            <p
              className={`reveal eyebrow-lock ${shown ? "is-visible" : ""} text-[#FF2E63] uppercase text-xs md:text-sm font-semibold`}
              style={beat(0)}
            >
              Better Together
            </p>

            {/* Headline */}
            <h2
              className={`reveal ${shown ? "is-visible" : ""} text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]`}
              style={beat(90)}
            >
              Walk With Friends.<br/>
              <span className="text-[#FF2E63]">Compete With the World.</span>
            </h2>

            {/* Feature Blocks */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`reveal ${shown ? "is-visible" : ""} group relative bg-[#021F29] border border-[#0F3460]/50 rounded-2xl p-5 card-hover hover:border-[#FF2E63]/40 transition-all duration-300 [transform-style:preserve-3d]`}
                  style={{ transitionDelay: shown ? `${180 + Math.min(index, 4) * 80}ms` : "0ms" }}
                  onPointerMove={handleTiltMove}
                  onPointerLeave={handleTiltLeave}
                >
                  {/* pointer-following glow, gated to fine-pointer via .tilt-glow */}
                  <div className="tilt-glow"></div>
                  <div className="relative flex gap-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof — fades in last */}
            <div
              className={`reveal ${shown ? "is-visible" : ""} flex items-center gap-4 pt-4`}
              style={beat(450)}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] bg-gradient-to-br from-[#2759FF] to-[#FF2E63]"
                    style={{
                      backgroundImage: `linear-gradient(${45 + i * 30}deg, #2759FF, #FF2E63)`
                    }}
                  ></div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] bg-[#021F29] flex items-center justify-center text-xs font-medium text-gray-400">
                  +9K
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Join <span className="text-white font-semibold num-tabular">10,000+</span> active walkers
              </p>
            </div>
          </div>

          {/* Right Content - Phone with Messages */}
          <div
            className={`reveal ${shown ? "is-visible" : ""} relative flex justify-center lg:justify-end`}
            style={beat(180)}
          >
            <div className="relative">
              {/* Main Phone — anchored foreground, gentle float */}
              <div className="phone-frame w-[280px] md:w-[300px] animate-float motion-reduce:animate-none">
                <div className="phone-screen">
                  <img
                    src="/images/messages-list.jpeg"
                    alt="StepzSync Messages"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Floating Notification Card — overflow-prone at 375px, show >=sm.
                  Counter-parallax drift via --parallax on top of the float loop. */}
              <div
                ref={floatNotifRef}
                className="hidden sm:block absolute -left-8 top-16 bg-[#021F29] border border-[#0F3460] rounded-xl p-4 shadow-xl animate-float motion-reduce:animate-none"
                style={{ animationDelay: "0.5s", transform: "translateY(var(--parallax, 0px)) rotate(-3deg)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00BFFF] to-[#2759FF]"></div>
                  <div>
                    <p className="text-white text-sm font-medium">Skylar</p>
                    <p className="text-[#FF2E63] text-xs">wants to race!</p>
                  </div>
                </div>
              </div>

              {/* Online Friends Indicator — overflow-prone at 375px, show >=sm. */}
              <div
                ref={floatOnlineRef}
                className="hidden sm:block absolute -right-4 bottom-24 bg-[#021F29] border border-[#39FF14]/30 rounded-xl px-4 py-2 glow-green"
                style={{ transform: "translateY(var(--parallax, 0px))" }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B35] border border-[#021F29]"></div>
                    <div className="w-6 h-6 rounded-full bg-[#00BFFF] border border-[#021F29]"></div>
                    <div className="w-6 h-6 rounded-full bg-[#FF2E63] border border-[#021F29]"></div>
                  </div>
                  <span className="text-[#39FF14] text-xs font-medium num-tabular">3 friends online</span>
                </div>
              </div>

              {/* Heart Animation — slight counter-parallax for depth */}
              <div
                ref={floatHeartRef}
                className="absolute -right-8 top-1/3"
                style={{ transform: "translateY(var(--parallax, 0px))" }}
              >
                <svg className="w-6 h-6 text-[#FF2E63] animate-bounce motion-reduce:animate-none" fill="currentColor" viewBox="0 0 20 20" style={{animationDelay: '0.2s'}}>
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

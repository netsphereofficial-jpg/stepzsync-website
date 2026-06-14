import { useEffect, useRef, useState } from "react";

export default function GlobalMarathons() {
  const pastEvents = [
    { name: "NYC Central Park", participants: "3,241", status: "Completed" },
    { name: "London Thames Path", participants: "2,156", status: "Completed" },
    { name: "Sydney Harbour", participants: "1,892", status: "Completed" }
  ];

  const achievements = [
    { name: "Marathon Finisher", icon: "M12 15l-2 5l9-11l-5 1l2-5l-9 11z" },
    { name: "Continental Champion", icon: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" },
    { name: "Distance Legend", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" }
  ];

  const sectionRef = useRef(null);
  const parallaxRef = useRef(null);
  const [shown, setShown] = useState(false);

  // Animated values for the "live event ticker" feel.
  const [registered, setRegistered] = useState(0); // -> 2847
  const [distance, setDistance] = useState(0); // -> 42.2
  const [dayCount, setDayCount] = useState(0); // -> 15
  const [progress, setProgress] = useState(0); // -> 71

  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll-reveal observer (dependency-free, build/no-JS safe).
  useEffect(() => {
    if (reduceMotion) {
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
  }, [reduceMotion]);

  // Count-up the featured stats + progress bar once, on reveal.
  useEffect(() => {
    if (!shown) return;
    if (reduceMotion) {
      setRegistered(2847);
      setDistance(42.2);
      setDayCount(15);
      setProgress(71);
      return;
    }
    let raf;
    const duration = 1100;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const e = ease(t);
      setRegistered(Math.round(2847 * e));
      setDistance(Math.round(42.2 * e * 10) / 10);
      setDayCount(Math.round(15 * e));
      setProgress(Math.round(71 * e));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, reduceMotion]);

  // Subtle parallax drift on the decorative background layer (ref-driven,
  // never React state). Halved below 768px, clamped so nothing overflows.
  useEffect(() => {
    if (reduceMotion) return;
    const layer = parallaxRef.current;
    if (!layer) return;
    let raf = 0;
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      // -1 (section below viewport) .. 1 (above); 0 ~ centered.
      const rel = (rect.top + rect.height / 2 - viewH / 2) / viewH;
      const mobile = window.innerWidth < 768;
      const amp = mobile ? 18 : 36;
      const offset = Math.max(-amp, Math.min(amp, -rel * amp));
      layer.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  // Reveal ladder helper: header 0 / featured 90 / past 180 / achievements 270.
  const ladder = (ms) => ({
    transitionDelay: shown ? `${ms}ms` : "0ms"
  });

  return (
    <section
      id="marathons"
      ref={sectionRef}
      style={{ scrollMarginTop: "96px" }}
      className={`section-anchor py-24 lg:py-32 relative overflow-hidden reveal ${
        shown ? "is-visible" : ""
      }`}
    >
      {/* Background Map (parallax drift layer) */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 opacity-10 will-change-transform pointer-events-none"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* World rings */}
          <ellipse cx="600" cy="300" rx="500" ry="250" fill="none" stroke="#00D4FF" strokeWidth="1"/>
          <ellipse cx="600" cy="300" rx="400" ry="200" fill="none" stroke="#00D4FF" strokeWidth="0.5"/>
          <ellipse cx="600" cy="300" rx="300" ry="150" fill="none" stroke="#00D4FF" strokeWidth="0.5"/>

          {/* Connection lines */}
          <path d="M200,250 Q400,150 600,200 T1000,280" fill="none" stroke="#00D4FF" strokeWidth="1" strokeDasharray="5,5"/>
          <path d="M150,350 Q350,400 550,320 T950,350" fill="none" stroke="#00D4FF" strokeWidth="1" strokeDasharray="5,5"/>

          {/* City dots */}
          <circle cx="280" cy="200" r="4" fill="#39FF14" className="animate-pulse-glow"/>
          <circle cx="520" cy="180" r="4" fill="#39FF14" className="animate-pulse-glow" style={{animationDelay: '0.3s'}}/>
          <circle cx="750" cy="220" r="4" fill="#39FF14" className="animate-pulse-glow" style={{animationDelay: '0.6s'}}/>
          <circle cx="900" cy="280" r="4" fill="#39FF14" className="animate-pulse-glow" style={{animationDelay: '0.9s'}}/>
          <circle cx="400" cy="350" r="4" fill="#FF2E63" className="animate-pulse-glow" style={{animationDelay: '1.2s'}}/>
        </svg>
      </div>

      {/* Animated traveling dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#39FF14] rounded-full animate-travel"></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-[#00BFFF] rounded-full animate-travel" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-[#FF2E63] rounded-full animate-travel" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="section-header text-center">
          <p className="eyebrow-lock text-electric-blue uppercase text-xs md:text-sm font-semibold tracking-[0.25em] mb-4">
            Worldwide Events
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
            Run the World's Greatest Routes
          </h2>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Monthly global marathons. Thousands of participants. One epic journey.
          </p>
        </div>

        {/* Featured Marathon Card */}
        <div
          className="max-w-2xl mx-auto mb-16 reveal"
          style={ladder(90)}
        >
          <div className="bg-[#021F29] border border-[#0F3460] rounded-3xl overflow-hidden card-hover transition-colors duration-300 hover:border-electric-blue/60">
            {/* Card Header with gradient */}
            <div className="relative h-48 bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] flex items-center justify-center overflow-hidden">
              {/* Tokyo skyline silhouette suggestion */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#021F29] to-transparent"></div>
              <svg className="w-full h-32 opacity-30" viewBox="0 0 400 100">
                <rect x="20" y="40" width="30" height="60" fill="#0F3460"/>
                <rect x="60" y="20" width="25" height="80" fill="#0F3460"/>
                <rect x="95" y="50" width="35" height="50" fill="#0F3460"/>
                <rect x="140" y="10" width="20" height="90" fill="#0F3460"/>
                <polygon points="150,10 160,0 170,10" fill="#FF2E63"/>
                <rect x="170" y="35" width="40" height="65" fill="#0F3460"/>
                <rect x="220" y="25" width="30" height="75" fill="#0F3460"/>
                <rect x="260" y="45" width="35" height="55" fill="#0F3460"/>
                <rect x="305" y="30" width="25" height="70" fill="#0F3460"/>
                <rect x="340" y="50" width="40" height="50" fill="#0F3460"/>
              </svg>
              <div className="absolute top-4 right-4 bg-[#39FF14] text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full animate-pulse motion-reduce:animate-none"></span>
                UPCOMING
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 lg:p-8">
              <h3 className="text-xl font-bold mb-2">Tokyo City Marathon</h3>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-[#00BFFF]/20 text-[#00BFFF] px-3 py-1 rounded-full text-sm">Starts soon</span>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#39FF14] num-tabular" aria-live="polite">
                    {registered.toLocaleString("en-US")}
                  </p>
                  <p className="text-gray-500 text-sm">Registered</p>
                </div>
                <div className="text-center border-x border-[#0F3460]">
                  <p className="text-2xl font-bold num-tabular">{distance.toFixed(1)}</p>
                  <p className="text-gray-500 text-sm">Kilometers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold num-tabular">{dayCount}</p>
                  <p className="text-gray-500 text-sm">Day Event</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Registration filling up</span>
                  <span className="text-[#FF6B35] num-tabular">{progress}%</span>
                </div>
                <div className="relative h-2 bg-[#0F3460] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF2E63] rounded-full transition-[width] duration-[900ms] ease-out"
                    style={{ width: `${progress}%` }}
                  >
                    {/* sheen shimmer riding the fill */}
                    <span
                      className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      style={{
                        transform: shown
                          ? "translateX(300%)"
                          : "translateX(-100%)",
                        transition: "transform 1100ms ease-out"
                      }}
                    ></span>
                  </div>
                </div>
              </div>

              {/* CTA — primary conversion action */}
              <a
                href="#download"
                aria-label="Reserve your spot in the Tokyo City Marathon"
                className="btn-primary group w-full py-4 text-base animate-breathe active:scale-[0.97] transition-transform focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span className="btn-sheen"></span>
                <span className="relative">Reserve Your Spot</span>
              </a>
            </div>
          </div>
        </div>

        {/* Past Events */}
        <div className="mb-16 reveal" style={ladder(180)}>
          <h4 className="text-center text-gray-400 uppercase tracking-wider text-sm mb-6">Past Global Events</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {pastEvents.map((event, index) => (
              <div
                key={index}
                className="bg-[#021F29]/50 border border-[#0F3460]/30 rounded-xl p-4 flex items-center justify-between transition-all duration-300 hover:border-electric-blue/40 hover:-translate-y-0.5 reveal"
                style={ladder(180 + Math.min(index, 4) * 80)}
              >
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-gray-500 text-sm">{event.participants} participants</p>
                </div>
                <span className="text-[#39FF14] text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="text-center reveal" style={ladder(270)}>
          <h4 className="text-gray-400 uppercase tracking-wider text-sm mb-6">Earn Exclusive Achievements</h4>
          <div className="flex justify-center gap-8 flex-wrap">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 reveal"
                style={ladder(270 + Math.min(index, 4) * 80)}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF2E63] flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d={achievement.icon} clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-400">{achievement.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

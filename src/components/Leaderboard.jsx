import { useEffect, useRef, useState } from "react";

export default function Leaderboard() {
  const topRacers = [
    { rank: 1, name: "Sarah Chen", country: "🇺🇸", steps: "2.4M", badge: "🏆" },
    { rank: 2, name: "Marcus Silva", country: "🇧🇷", steps: "2.1M", badge: "🥈" },
    { rank: 3, name: "Yuki Tanaka", country: "🇯🇵", steps: "1.9M", badge: "🥉" },
    { rank: 4, name: "Emma Schmidt", country: "🇩🇪", steps: "1.7M", badge: "" },
    { rank: 5, name: "Raj Patel", country: "🇮🇳", steps: "1.5M", badge: "" },
  ];

  const sectionRef = useRef(null);
  const orbPinkRef = useRef(null);
  const orbGreenRef = useRef(null);
  const [shown, setShown] = useState(false);
  const [liveCount, setLiveCount] = useState(10423);

  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll-reveal (canonical, dependency-free). Set the mounted flag so the
  // .reveal hidden base only applies after JS runs — no-JS/SSR stays visible.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.dataset.mounted = "true";
    }
    if (reduceMotion) {
      setShown(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  // Count-up "10,423 Racing" once on reveal (ease-out rAF), then settle.
  useEffect(() => {
    if (!shown) return;
    const target = 10423;
    if (reduceMotion) {
      setLiveCount(target);
      return;
    }
    let raf;
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setLiveCount(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setLiveCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, reduceMotion]);

  // Parallax drift on the decorative orbs (rAF-throttled, writes refs not state).
  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) * 0.05;
        const factor = window.innerWidth < 768 ? 0.5 : 1;
        const shift = Math.max(-40, Math.min(40, progress * factor));
        if (orbPinkRef.current) {
          orbPinkRef.current.style.transform = `translateY(${shift}px)`;
        }
        if (orbGreenRef.current) {
          orbGreenRef.current.style.transform = `translateY(${-shift}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  // Magnetic micro-shift for the secondary CTA (gated to fine-pointer/hover).
  const ctaRef = useRef(null);
  const onCtaMove = (e) => {
    const el = ctaRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const mx = Math.max(-6, Math.min(6, dx * 0.15));
    const my = Math.max(-6, Math.min(6, dy * 0.15));
    el.style.transform = `translate(${mx}px, ${my}px)`;
  };
  const onCtaLeave = () => {
    const el = ctaRef.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  return (
    <section
      ref={sectionRef}
      style={{ scrollMarginTop: "96px" }}
      className={`section-anchor reveal ${shown ? "is-visible" : ""} py-24 lg:py-32 bg-gradient-to-b from-[#0F0F14] to-[#0A0A0A] relative overflow-hidden`}
    >
      {/* Background accents — atmosphere, with parallax drift */}
      <div
        ref={orbPinkRef}
        className="absolute top-1/4 left-0 w-72 h-72 bg-[#FF2E63] rounded-full opacity-5 blur-3xl motion-reduce:transform-none"
      ></div>
      <div
        ref={orbGreenRef}
        className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#39FF14] rounded-full opacity-5 blur-3xl motion-reduce:transform-none"
      ></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Leaderboard Card */}
          <div
            className="relative transition-all duration-700 ease-out"
            style={{
              transitionDelay: shown ? "90ms" : "0ms",
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(28px)",
            }}
          >
            {/* Floating badge (decorative — hidden on very small screens to avoid clipping) */}
            <div className="hidden sm:block absolute -top-6 -right-6 bg-[#39FF14] text-black rounded-2xl px-6 py-3 rotate-6 z-10 shadow-2xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-xs font-bold uppercase">Live Now</p>
                  <p className="text-sm font-black num-tabular" aria-live="polite">
                    {liveCount.toLocaleString("en-US")} Racing
                  </p>
                </div>
              </div>
            </div>

            {/* Leaderboard card */}
            <div className="bg-[#0F0F14] rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Global Leaders</h3>
                <span className="text-xs uppercase tracking-wider text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                  This Month
                </span>
              </div>

              <div className="space-y-4">
                {topRacers.map((racer, index) => (
                  <div
                    key={index}
                    style={{
                      transitionDelay: shown ? `${index * 80}ms` : "0ms",
                      opacity: shown ? 1 : 0,
                      transform: shown ? "translateY(0)" : "translateY(16px)",
                    }}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      racer.rank <= 3
                        ? 'bg-gradient-to-r from-[#2759FF]/20 to-transparent border border-[#2759FF]/30'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className={`text-xl font-bold w-8 num-tabular ${
                        racer.rank === 1 ? 'text-[#FFD700]' :
                        racer.rank === 2 ? 'text-[#C0C0C0]' :
                        racer.rank === 3 ? 'text-[#CD7F32]' :
                        'text-gray-500'
                      }`}>
                        #{racer.rank}
                      </span>
                      {racer.badge && <span className="text-2xl">{racer.badge}</span>}
                      <div className="flex-1">
                        <p className="font-semibold text-white">{racer.name}</p>
                        <p className="text-xs text-gray-500">
                          {racer.country} {racer.steps} steps
                        </p>
                      </div>
                    </div>
                    {racer.rank <= 3 && (
                      <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse motion-reduce:animate-none"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="text-[#00BFFF] font-semibold">You're ranked #847</span> — Keep moving to climb!
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div
              className="transition-all duration-700 ease-out"
              style={{
                transitionDelay: shown ? "90ms" : "0ms",
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(28px)",
              }}
            >
              <div className="inline-block">
                <p className={`eyebrow-lock ${shown ? "is-visible" : ""} text-[#FF2E63] uppercase text-xs md:text-sm font-semibold glow-red px-4 py-2 rounded-full border border-[#FF2E63]/30 bg-[#FF2E63]/10`}>
                  Compete Globally
                </p>
              </div>
            </div>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] transition-all duration-700 ease-out"
              style={{
                transitionDelay: shown ? "180ms" : "0ms",
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(28px)",
              }}
            >
              Race Against the<br/>
              <span className="text-[#39FF14]">Best in the World</span>
            </h2>

            <p
              className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl transition-all duration-700 ease-out"
              style={{
                transitionDelay: shown ? "270ms" : "0ms",
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(28px)",
              }}
            >
              Join thousands of active racers competing on real routes across the globe. Track your ranking in real-time, earn badges, and push yourself to climb the leaderboard.
            </p>

            <div
              className="space-y-4 transition-all duration-700 ease-out"
              style={{
                transitionDelay: shown ? "360ms" : "0ms",
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(28px)",
              }}
            >
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#2759FF]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">50+ Countries</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Compete with racers from every continent</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#FF2E63]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Live Updates</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Watch positions change in real-time as racers move</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🏅</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Earn Achievements</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Unlock badges and rewards as you compete</p>
                </div>
              </div>
            </div>

            {/* CTA — App Store (iOS) + Google Play, responsive row */}
            <div
              className="pt-4 transition-all duration-700 ease-out"
              style={{
                transitionDelay: shown ? "450ms" : "0ms",
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(28px)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse motion-reduce:animate-none"></span>
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">Available now</span>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <a
                  ref={ctaRef}
                  onMouseMove={onCtaMove}
                  onMouseLeave={onCtaLeave}
                  href="https://apps.apple.com/us/app/stepzsync/id6752641870"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download StepzSync on the App Store to join the leaderboard"
                  className="btn-secondary group w-full sm:w-auto px-6 py-3.5 flex items-center gap-3"
                >
                  <svg className="w-8 h-8 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-90">Join the Competition</div>
                    <div className="text-lg font-bold -mt-1">Download Now</div>
                  </div>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.netsphere.stepzsync"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get StepzSync on Google Play"
                  className="btn-secondary group w-full sm:w-auto px-6 py-3.5 flex items-center gap-3"
                >
                  <svg className="w-8 h-8 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M3.6 1.8 13.4 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1z" fill="#00D4FF"/>
                    <path d="M16.8 8.4 13.4 12l-2.4-2.4 3.4-3.4 2.4 2.2z" fill="#39FF14"/>
                    <path d="M16.8 15.6 14.4 17.8 11 14.4 13.4 12l3.4 3.6z" fill="#FF2E63"/>
                    <path d="M20.4 10.9c.7.4.7 1.8 0 2.2l-3.6 2.5-2.6-2.6 2.6-2.6 3.6 2.5z" fill="#FF6B35"/>
                  </svg>
                  <div className="text-left"><div className="text-xs opacity-90">GET IT ON</div><div className="text-lg font-bold -mt-1">Google Play</div></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

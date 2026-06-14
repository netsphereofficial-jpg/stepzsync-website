import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [stepCount, setStepCount] = useState(12847);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // --- Scroll-reveal (canonical, build-safe) -----------------------------
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Mark body mounted so the .reveal base-hidden state only applies post-mount.
    document.body.dataset.mounted = 'true';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // --- Count-up for the phone "Steps Today" chip -------------------------
  // Animates 0 -> 12,847 once on mount, THEN hands off to the live interval
  // above (which keeps incrementing from the seed). Wrapped, never replaces.
  const [displayCount, setDisplayCount] = useState(stepCount);
  const handedOff = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handedOff.current = true;
      return;
    }
    const seed = 12847;
    const duration = 1200;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplayCount(Math.round(seed * eased));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        handedOff.current = true;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Once the count-up has finished, mirror the live stepCount.
  useEffect(() => {
    if (handedOff.current) setDisplayCount(stepCount);
  }, [stepCount]);

  // --- Parallax (rAF-throttled, passive; writes to refs, not state) ------
  const glowRef = useRef(null);
  const mapRef = useRef(null);
  const chipsRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrollY(y);
        const isMobile = window.innerWidth < 768;
        const f = isMobile ? 0.5 : 1; // halve amplitude below 768px
        const clamp = (v) => Math.max(-40, Math.min(40, v));
        if (glowRef.current) {
          glowRef.current.style.transform = `translateY(${clamp(y * 0.05 * f)}px)`;
        }
        if (mapRef.current) {
          mapRef.current.style.transform = `translateY(${clamp(y * 0.04 * f)}px)`;
        }
        if (chipsRef.current) {
          chipsRef.current.style.transform = `translateY(${clamp(y * -0.04 * f)}px)`;
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // --- Magnetic micro-shift on the primary App Store badge ---------------
  const appBtnRef = useRef(null);
  const canHover = useRef(false);
  useEffect(() => {
    canHover.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  const onBtnMove = (e) => {
    if (!canHover.current) return;
    const el = appBtnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    const max = 6;
    const dx = Math.max(-max, Math.min(max, mx * 0.25));
    const dy = Math.max(-max, Math.min(max, my * 0.25));
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const onBtnLeave = () => {
    const el = appBtnRef.current;
    if (el) el.style.transform = 'translate(0, 0)';
  };

  // Stagger helper: tie transitionDelay to the reveal beat.
  const delay = (ms) => ({ transitionDelay: shown ? `${ms}ms` : '0ms' });

  return (
    <section ref={ref} className="relative min-h-screen gradient-hero grid-pattern overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid dots (slow parallax drift) */}
        <div ref={glowRef} className="absolute inset-0 will-change-transform">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00D4FF] rounded-full opacity-40 animate-pulse-glow motion-reduce:animate-none"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#39FF14] rounded-full opacity-40 animate-pulse-glow motion-reduce:animate-none" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-[#00BFFF] rounded-full opacity-40 animate-pulse-glow motion-reduce:animate-none" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#FF2E63] rounded-full opacity-40 animate-pulse-glow motion-reduce:animate-none" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Map outline suggestion (raised opacity ~12%, parallax drift) */}
        <svg
          ref={mapRef}
          className="absolute inset-0 w-full h-full opacity-[0.12] will-change-transform"
          viewBox="0 0 1000 600"
          aria-hidden="true"
        >
          <path
            id="hero-map-route"
            d="M100,300 Q250,200 400,280 T600,250 T800,300 T950,280"
            stroke="#00D4FF"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M50,350 Q200,400 350,320 T550,380 T750,330 T900,380"
            stroke="#00D4FF"
            strokeWidth="2"
            fill="none"
          />
          {/* Avatar dot traveling the route — literally shows steps on a map */}
          <circle r="6" fill="#39FF14" className="motion-reduce:hidden">
            <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
              <mpath href="#hero-map-route" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="9s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 reveal ${shown ? 'is-visible' : ''}`}>
            {/* Eyebrow — cyan owned accent, pulsing dot, lock-in settle */}
            <p className="flex items-center gap-2 text-[#00D4FF] uppercase text-xs md:text-sm font-semibold eyebrow-lock" style={delay(0)}>
              <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse motion-reduce:animate-none"></span>
              Real Steps. Real Races. Real Time.
            </p>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
              <span
                className="block reveal tracking-[-0.02em] [transition:opacity_0.7s_ease-out,transform_0.7s_ease-out]"
                style={delay(90)}
              >
                Your Steps Move
              </span>
              <span
                className="block reveal tracking-[-0.02em] [transition:opacity_0.7s_ease-out,transform_0.7s_ease-out]"
                style={delay(160)}
              >
                You Across
              </span>
              <span
                className="block text-gradient-neon pb-1 reveal [transition:opacity_0.7s_ease-out,transform_0.7s_ease-out]"
                style={delay(230)}
              >
                the World
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl reveal [transition:opacity_0.7s_ease-out,transform_0.7s_ease-out]"
              style={delay(300)}
            >
              Race with real players from around the world on a live virtual map.
              See everyone moving in real time as you walk outdoors or on a treadmill on real-world routes.
            </p>

            {/* CTA Group — responsive row, stacks on mobile */}
            <div
              className="flex flex-col sm:flex-row flex-wrap gap-4 reveal [transition:opacity_0.7s_ease-out,transform_0.7s_ease-out]"
              style={delay(400)}
            >
              {/* App Store badge (primary action, secondary visual style) */}
              <a
                ref={appBtnRef}
                href="https://apps.apple.com/us/app/stepzsync/id6752641870"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download StepzSync on the App Store"
                onMouseMove={onBtnMove}
                onMouseLeave={onBtnLeave}
                className="btn-secondary group w-full sm:w-auto gap-3 px-6 py-3.5 text-base hover:border-[#39FF14]/40 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(57,255,20,0.18)]"
              >
                <svg className="w-8 h-8 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-90">Download on the</div>
                  <div className="text-lg font-bold -mt-1">App Store</div>
                </div>
              </a>

              {/* Google Play badge — mirrors the App Store badge size/shape */}
              <a
                href="https://play.google.com/store/apps/details?id=com.netsphere.stepzsync"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get StepzSync on Google Play"
                className="btn-secondary group w-full sm:w-auto gap-3 px-6 py-3.5 text-base hover:border-[#39FF14]/40 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(57,255,20,0.18)]"
              >
                <svg className="w-8 h-8 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M3.6 1.8 13.4 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1z" fill="#00D4FF" />
                  <path d="M16.8 8.4 13.4 12l-2.4-2.4 3.4-3.4 2.4 2.2z" fill="#39FF14" />
                  <path d="M16.8 15.6 14.4 17.8 11 14.4 13.4 12l3.4 3.6z" fill="#FF2E63" />
                  <path d="M20.4 10.9c.7.4.7 1.8 0 2.2l-3.6 2.5-2.6-2.6 2.6-2.6 3.6 2.5z" fill="#FF6B35" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-90">GET IT ON</div>
                  <div className="text-lg font-bold -mt-1">Google Play</div>
                </div>
              </a>

              {/* Secondary: Watch How It Works — cyan accent */}
              <a
                href="#how-it-works"
                className="group inline-flex items-center justify-center w-full sm:w-auto gap-2 border border-[#00D4FF]/30 text-white px-6 py-3.5 rounded-xl font-medium transition-all duration-200 hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]"
              >
                <svg className="w-5 h-5 text-[#00D4FF] transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch How It Works
              </a>
            </div>

            {/* Trust Indicators */}
            <div
              className="flex flex-wrap gap-6 pt-4 reveal [transition:opacity_0.7s_ease-out,transform_0.7s_ease-out]"
              style={delay(500)}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse motion-reduce:animate-none"></span>
                <span className="text-gray-400 text-sm">10K+ Active Racers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00BFFF] rounded-full"></span>
                <span className="text-gray-400 text-sm">50+ Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full"></span>
                <span className="text-gray-400 text-sm">Real-Time GPS</span>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup (foreground stays anchored) */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative animate-float motion-reduce:animate-none">
              {/* Phone Frame */}
              <div className="phone-frame w-[280px] md:w-[300px]">
                <div className="phone-screen">
                  <img
                    src="/images/Treadmill.png"
                    alt="StepzSync App Dashboard"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Floating Elements (slight counter-parallax) */}
              <div ref={chipsRef} className="will-change-transform">
                {/* Live Badge */}
                <div className="absolute -top-4 -right-4 bg-[#021F29] border border-[#39FF14]/50 rounded-xl px-4 py-2 flex items-center gap-2 glow-green">
                  <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse motion-reduce:animate-none"></span>
                  <span className="text-[#39FF14] font-semibold text-sm">LIVE</span>
                </div>

                {/* Step Counter (count-up then live, tabular-nums) */}
                <div className="absolute -left-8 top-1/4 bg-[#021F29] border border-[#0F3460] rounded-xl px-4 py-3 glow-cyan">
                  <p className="text-[#00D4FF] text-xs uppercase tracking-wider">Steps Today</p>
                  <p className="text-white text-2xl font-bold num-tabular" aria-live="polite">
                    {displayCount.toLocaleString()}
                  </p>
                </div>

                {/* Race Position (with race-flavor delta cue) */}
                <div className="absolute -right-6 bottom-1/3 bg-[#021F29] border border-[#0F3460] rounded-xl px-4 py-3">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Position</p>
                  <p className="text-[#FF6B35] text-2xl font-bold flex items-baseline gap-1.5">
                    #3
                    <span className="text-[#39FF14] text-xs font-semibold">&#9650; 2</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator — fades out past ~200px scroll */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce motion-reduce:animate-none transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - scrollY / 200), pointerEvents: scrollY > 180 ? 'none' : 'auto' }}
        aria-hidden="true"
      >
        <span className="text-gray-500 text-sm">Scroll to explore</span>
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

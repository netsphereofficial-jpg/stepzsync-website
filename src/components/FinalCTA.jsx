import { useState, useEffect, useRef } from 'react';

export default function FinalCTA() {
  const [userCount, setUserCount] = useState(10247);

  // --- Scroll-reveal (self-contained, dependency-free, build/no-JS safe) ---
  const sectionRef = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
      { threshold: 0.15, rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // --- Count-up on reveal, THEN hand off to the existing live interval ---
  // (the interval below is preserved verbatim in behaviour: +0..1 every 3s)
  const SEED = 10247;
  const [displayCount, setDisplayCount] = useState(SEED);
  const countedRef = useRef(false);

  useEffect(() => {
    if (!shown) return;
    if (countedRef.current) return;
    countedRef.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayCount(SEED);
      return;
    }

    const duration = 1200;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplayCount(Math.round(SEED * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown]);

  // Existing live ticker — preserved verbatim.
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Once the count-up has run at least once, defer to the live ticker value.
  const liveValue = countedRef.current && displayCount >= SEED ? userCount : displayCount;

  // --- Parallax on decorative layers (rAF-throttled, ref-driven, no state) ---
  const particlesRef = useRef(null);
  const footprintRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // progress of section through viewport, centred ~0
        const progress = (rect.top + rect.height / 2 - window.innerHeight / 2);
        const isMobile = window.innerWidth < 768;
        const factor = isMobile ? 0.025 : 0.05;
        const clamp = (v) => Math.max(-40, Math.min(40, v));
        const yParticles = clamp(progress * factor);
        const yFoot = clamp(progress * -factor);
        if (particlesRef.current) {
          particlesRef.current.style.transform = `translate3d(0, ${yParticles}px, 0)`;
        }
        if (footprintRef.current) {
          footprintRef.current.style.transform = `translate3d(-50%, ${yFoot}px, 0)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // --- Magnetic primary CTA (gated to fine-pointer/hover) ---
  const ctaRef = useRef(null);
  const finePointer = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const onCtaMove = (e) => {
    if (!finePointer()) return;
    const el = ctaRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    const clamp = (v) => Math.max(-6, Math.min(6, v * 0.3));
    el.style.transform = `translate(${clamp(mx)}px, ${clamp(my)}px)`;
  };
  const onCtaLeave = () => {
    const el = ctaRef.current;
    if (el) el.style.transform = 'translate(0, 0)';
  };

  // Reveal-driven cascade. Inner .reveal elements toggle .is-visible
  // individually (CSS settle rule is `.reveal.is-visible`); the staggered
  // transitionDelay makes them cascade the moment the section scrolls in.
  const step = (ms) => ({ transitionDelay: shown ? `${ms}ms` : '0ms' });

  // Footprints draw bottom -> top on reveal (walking into frame).
  const prints = [
    { cx: 35, cy: 380 },
    { cx: 65, cy: 340 },
    { cx: 35, cy: 300 },
    { cx: 65, cy: 260 },
    { cx: 35, cy: 220 },
    { cx: 65, cy: 180 },
  ];

  return (
    <section
      id="download"
      ref={sectionRef}
      style={{ scrollMarginTop: '96px' }}
      className={`reveal section-anchor min-h-screen flex items-center justify-center relative overflow-hidden ${shown ? 'is-visible' : ''}`}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#16213E] via-[#1A1A2E] to-[#0A0A0A]"></div>

      {/* Floating Particles (with gentle parallax) */}
      <div
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform"
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-green rounded-full opacity-40 motion-reduce:animate-none"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-10%',
              animation: `float ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Footprint Trail — footsteps walking up into frame on reveal */}
      <div
        ref={footprintRef}
        className="absolute bottom-0 left-1/2 opacity-8 will-change-transform"
        style={{ transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        <svg className="w-48 h-96" viewBox="0 0 100 400" fill="#00D4FF">
          {prints.map((p, i) => (
            <ellipse
              key={i}
              cx={p.cx}
              cy={p.cy}
              rx="12"
              ry="18"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? 'translateY(0)' : 'translateY(24px)',
                transformBox: 'fill-box',
                transformOrigin: 'center',
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                // bottom-most footprint first, walking upward
                transitionDelay: shown ? `${300 + i * 120}ms` : '0ms',
              }}
            />
          ))}
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-24 text-center">
        {/* Headline Stack — hero-tier rank */}
        <div className="mb-8 space-y-2">
          <h2
            className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.02em] leading-[0.95] reveal ${shown ? 'is-visible' : ''}`}
            style={step(0)}
          >
            Every Step
          </h2>
          <h2
            className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.02em] leading-[0.95] reveal ${shown ? 'is-visible' : ''}`}
            style={step(90)}
          >
            Takes You
          </h2>
          <h2
            className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.02em] leading-[0.95] reveal ${shown ? 'is-visible' : ''}`}
            style={step(180)}
          >
            <span className="text-gradient-neon pb-1 inline-block">Somewhere New</span>
          </h2>
        </div>

        {/* Emotional Subhead */}
        <p
          className={`text-base md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto mb-12 reveal ${shown ? 'is-visible' : ''}`}
          style={step(270)}
        >
          Your daily walk just became an adventure. Your steps just became a sport. Your world just got bigger.
        </p>

        {/* Primary CTA — single biggest conversion action (neon-green) */}
        <div className={`mb-8 reveal ${shown ? 'is-visible' : ''}`} style={step(360)}>
          <a
            ref={ctaRef}
            onMouseMove={onCtaMove}
            onMouseLeave={onCtaLeave}
            href="https://apps.apple.com/us/app/stepzsync/id6752641870"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download StepzSync on the App Store"
            className="btn-primary group inline-flex items-center gap-4 px-10 py-5 text-xl animate-breathe w-full sm:w-auto active:scale-[0.97]"
            style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
          >
            <span className="btn-sheen" aria-hidden="true"></span>
            <svg className="w-7 h-7 relative transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <span className="relative">Download StepzSync Free</span>
          </a>
        </div>

        {/* Platform Text — live-product pulse dot */}
        <p
          className={`text-gray-500 mb-8 flex items-center justify-center gap-2 reveal ${shown ? 'is-visible' : ''}`}
          style={step(450)}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-neon-green animate-pulse motion-reduce:animate-none" aria-hidden="true"></span>
          Available on iOS &amp; Android
        </p>

        {/* Store Badges — responsive row (stack on mobile) */}
        <div className={`flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 mb-12 reveal ${shown ? 'is-visible' : ''}`} style={step(540)}>
          {/* App Store */}
          <a
            href="https://apps.apple.com/us/app/stepzsync/id6752641870"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download StepzSync on the App Store"
            className="btn-secondary group w-full sm:w-auto px-6 py-3.5 flex items-center gap-3 hover:-translate-y-0.5"
          >
            <svg className="w-8 h-8 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="white">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-90">Download on the</div>
              <div className="text-lg font-bold -mt-1">App Store</div>
            </div>
          </a>

          {/* Google Play */}
          <a
            href="https://play.google.com/store/apps/details?id=com.netsphere.stepzsync"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get StepzSync on Google Play"
            className="btn-secondary group w-full sm:w-auto px-6 py-3.5 flex items-center gap-3 hover:-translate-y-0.5"
          >
            <svg className="w-8 h-8 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M3.6 1.8 13.4 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1z" fill="#00D4FF"/>
              <path d="M16.8 8.4 13.4 12l-2.4-2.4 3.4-3.4 2.4 2.2z" fill="#39FF14"/>
              <path d="M16.8 15.6 14.4 17.8 11 14.4 13.4 12l3.4 3.6z" fill="#FF2E63"/>
              <path d="M20.4 10.9c.7.4.7 1.8 0 2.2l-3.6 2.5-2.6-2.6 2.6-2.6 3.6 2.5z" fill="#FF6B35"/>
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-90">GET IT ON</div>
              <div className="text-lg font-bold -mt-1">Google Play</div>
            </div>
          </a>
        </div>

        {/* Live Counter */}
        <div className={`reveal ${shown ? 'is-visible' : ''}`} style={step(630)}>
          <p className="text-gray-500 text-sm" aria-live="polite">
            Join{' '}
            <span className="text-neon-green font-bold num-tabular">
              {liveValue.toLocaleString()}
            </span>{' '}
            walkers already racing worldwide
          </p>
        </div>
      </div>
    </section>
  );
}

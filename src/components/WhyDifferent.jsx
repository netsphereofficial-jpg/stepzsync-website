import { useEffect, useRef, useState } from 'react';

export default function WhyDifferent() {
  const features = [
    { text: "GPS-accurate movement", color: "#00D4FF" },
    { text: "Live opponent positions", color: "#FF2E63" },
    { text: "Real city routes", color: "#2759FF" },
    { text: "No fake animations", color: "#39FF14" }
  ];

  const sectionRef = useRef(null);
  const [shown, setShown] = useState(false);

  // Parallax layer refs (written directly, never through React state).
  const orbRef = useRef(null);
  const realPhoneRef = useRef(null);
  const otherPhoneRef = useRef(null);

  // Scroll-reveal observer (build/no-JS safe: base state visible until mount).
  useEffect(() => {
    document.body.dataset.mounted = 'true';

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

  // Slow counter-drift parallax between the two phones + orb (desktop/fine only).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const sec = sectionRef.current;
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        // Progress through viewport, centered around 0.
        const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        const clamp = (v) => Math.max(-40, Math.min(40, v));

        if (orbRef.current) {
          orbRef.current.style.transform = `translateY(calc(-50% + ${clamp(progress * 50)}px))`;
        }
        if (realPhoneRef.current) {
          realPhoneRef.current.style.transform = `translateY(${clamp(progress * -26)}px) rotate(3deg)`;
        }
        if (otherPhoneRef.current) {
          otherPhoneRef.current.style.transform = `translateY(${clamp(progress * 30)}px) rotate(-6deg) scale(0.9)`;
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

  // Reveal-driven transition delay helper.
  const delay = (ms) => ({ transitionDelay: shown ? `${ms}ms` : '0ms' });

  return (
    <section
      ref={sectionRef}
      className={`reveal ${shown ? 'is-visible' : ''} py-24 lg:py-32 bg-[#0F0F14] relative overflow-hidden`}
    >
      {/* Background accent — neon-green orb, atmosphere only, slow parallax drift */}
      <div
        ref={orbRef}
        className="absolute top-1/2 left-0 w-96 h-96 bg-neon-green rounded-full opacity-5 blur-3xl -translate-y-1/2 motion-reduce:animate-none will-change-transform"
      ></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Eyebrow with glow — neon-green is this section's owned accent */}
            <div className="inline-block reveal is-visible" style={delay(0)}>
              <p className="eyebrow-lock text-neon-green uppercase text-xs md:text-sm font-semibold glow-green px-4 py-2 rounded-full border border-neon-green/30 bg-neon-green/10">
                Not a Simulation
              </p>
            </div>

            {/* Headline — section-tier: solid green (gradient reserved for hero-tier) */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
              <span
                className="reveal block"
                style={delay(90)}
              >
                Real People.
              </span>
              <span
                className="reveal block"
                style={delay(160)}
              >
                Real Routes.
              </span>
              <span
                className="reveal block text-neon-green"
                style={delay(230)}
              >
                Real Competition.
              </span>
            </h2>

            {/* Body */}
            <p
              className="reveal text-base md:text-lg text-gray-400 leading-relaxed max-w-xl"
              style={delay(300)}
            >
              Forget virtual treadmills and animated avatars. StepzSync connects your actual steps to actual geography. When you walk 5,000 steps, your avatar moves exactly that distance on a real-world map. Race against real humans moving in real-time.
            </p>

            {/* Feature List — each item staggers, checkmark circles keep per-feature color */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="reveal flex items-center gap-3 group"
                  style={delay(380 + Math.min(index, 4) * 80)}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: feature.color + '20' }}
                  >
                    <svg className="w-4 h-4" fill={feature.color} viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Badge — reveals last */}
            <div
              className="reveal inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 rounded-xl px-5 py-3 rotate-[-2deg] glow-green mt-4"
              style={delay(740)}
            >
              <svg className="w-5 h-5 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="text-neon-green font-semibold">100% Real Movement</span>
            </div>
          </div>

          {/* Right Content - Phone Comparison */}
          <div
            className="reveal relative flex justify-center"
            style={delay(360)}
          >
            <div className="relative">
              {/* "Other Apps" Phone (dimmed) — decorative + overflow-prone at 375px, hide below sm */}
              <div
                ref={otherPhoneRef}
                className="hidden sm:block absolute -left-8 top-8 opacity-40 transform -rotate-6 scale-90 will-change-transform"
              >
                <div className="bg-gray-800 rounded-3xl p-3 border border-gray-700">
                  <div className="w-48 h-80 bg-gray-900 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">Generic</p>
                      <p className="text-gray-600 text-xs">Step Counter</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-red-500/20 border border-red-500 rounded-full p-1">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-center mt-3 text-gray-600 text-sm">Other Apps</p>
              </div>

              {/* StepzSync Phone (highlighted) — stays at all breakpoints */}
              <div
                ref={realPhoneRef}
                className="relative z-10 transform rotate-3 will-change-transform"
              >
                <div className="phone-frame w-64 glow-green">
                  <div className="phone-screen">
                    <img
                      src="/images/my-races.jpeg"
                      alt="StepzSync Race View"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-neon-green text-dark-bg rounded-full p-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-center mt-4 text-white font-semibold">StepzSync</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

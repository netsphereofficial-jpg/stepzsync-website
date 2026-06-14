import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-progress rail: rAF-throttled, passive, writes width directly to the
  // DOM node (no React re-render). Independent of the `scrolled` state above so
  // the existing 50px threshold logic stays byte-identical.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = progressRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      el.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Race Types', href: '#race-types' },
    { name: 'Community', href: '#social' },
    { name: 'Global Events', href: '#marathons' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#16213E]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-1 text-2xl font-bold rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF] transition-all duration-200"
          >
            <span className="text-white">Stepz</span>
            <span
              className="text-[#39FF14] transition-all duration-300"
              style={scrolled ? { textShadow: '0 0 14px rgba(57, 255, 20, 0.55)' } : undefined}
            >
              Sync
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors relative group rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2759FF] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Button — identity/secondary, stays brand-blue (not page primary) */}
          <a
            href="https://apps.apple.com/us/app/stepzsync/id6752641870"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download StepzSync on the App Store"
            className="hidden md:block bg-[#2759FF] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#1e47cc] transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2759FF]"
          >
            Get the App
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden text-white p-2 rounded-md transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A0A0A]/98 backdrop-blur-lg border-b border-[#16213E]">
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white text-lg py-2 rounded-md transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]"
                >
                  {link.name}
                </a>
              ))}

              {/* Store badges — responsive row: stacked on mobile, side-by-side >=sm */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <a
                  href="https://apps.apple.com/us/app/stepzsync/id6752641870"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download StepzSync on the App Store"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-secondary group flex-1 gap-3 px-4 py-3 hover:border-[#39FF14]/40 hover:shadow-[0_0_30px_rgba(57,255,20,0.18)]"
                >
                  <svg className="w-8 h-8 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-90">Download on the</div>
                    <div className="text-lg font-bold -mt-1">App Store</div>
                  </div>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.netsphere.stepzsync"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get StepzSync on Google Play"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-secondary group flex-1 gap-3 px-4 py-3 hover:border-[#39FF14]/40 hover:shadow-[0_0_30px_rgba(57,255,20,0.18)]"
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

              {/* Primary identity CTA — stays brand-blue */}
              <a
                href="https://apps.apple.com/us/app/stepzsync/id6752641870"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download StepzSync on the App Store"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#2759FF] text-white px-5 py-3 rounded-full font-medium text-center mt-2 transition-all duration-200 active:scale-[0.97] hover:bg-[#1e47cc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2759FF]"
              >
                Get the App
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Scroll-progress rail — 2px gradient bar driven by rAF (no re-render) */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent pointer-events-none">
        <div
          ref={progressRef}
          className="h-full"
          style={{
            width: '0%',
            background: 'linear-gradient(90deg, #39FF14, #00D4FF)',
          }}
        />
      </div>
    </nav>
  );
}

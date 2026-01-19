import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          <a href="#" className="flex items-center gap-1 text-2xl font-bold">
            <span className="text-white">Stepz</span>
            <span className="text-[#39FF14]">Sync</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2759FF] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="https://apps.apple.com/us/app/stepzsync/id6752641870"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download StepzSync on the App Store"
            className="hidden md:block bg-[#2759FF] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#1e47cc] transition-colors"
          >
            Get the App
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
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
                  className="text-gray-300 hover:text-white text-lg py-2"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://apps.apple.com/us/app/stepzsync/id6752641870"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download StepzSync on the App Store"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#2759FF] text-white px-5 py-3 rounded-full font-medium text-center mt-4"
              >
                Get the App
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

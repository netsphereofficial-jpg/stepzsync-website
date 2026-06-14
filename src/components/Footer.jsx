import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  // Self-contained, dependency-free scroll-reveal (build/no-JS safe).
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
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
  const productLinks = [
    { name: "Features", href: "#how-it-works" },
    { name: "Race Types", href: "#race-types" },
    { name: "Global Events", href: "#marathons" },
    { name: "Community", href: "#social" }
  ];

  const companyLinks = [
    { name: "About Us", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Support", href: "#" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Delete Account", href: "/delete-account" }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
        </svg>
      )
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: "TikTok",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    }
  ];

  return (
    <footer ref={ref} className={`reveal ${shown ? 'is-visible' : ''} bg-[#0A0A0A] border-t border-[#16213E] py-16`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="inline-flex items-center gap-1 text-2xl font-bold mb-4 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]">
              <span className="text-white">Stepz</span>
              <span className="text-[#39FF14]">Sync</span>
            </a>
            <p className="text-gray-500 text-sm mb-6">
              Real Steps. Real Races.<br/>Real Competition.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-500 hover:text-[#2759FF] transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2759FF]"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-white transition-colors text-sm rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-white transition-colors text-sm rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Download */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get the App</h4>
            <p className="flex items-center gap-2 text-gray-500 text-xs mb-4">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse motion-reduce:animate-none" aria-hidden="true"></span>
              Live now — race worldwide
            </p>
            {/* Two real store badges, responsive row: stack on mobile, side-by-side from sm. */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="https://apps.apple.com/us/app/stepzsync/id6752641870"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download StepzSync on the App Store"
                className="btn-secondary group flex items-center gap-3 px-4 py-3"
              >
                <svg className="w-8 h-8 text-white transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
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
                className="btn-secondary group flex items-center gap-3 px-4 py-3"
              >
                <svg className="w-8 h-8 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#16213E] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 StepzSync. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-600 hover:text-gray-400 transition-colors text-sm rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

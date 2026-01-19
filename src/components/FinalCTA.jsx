import { useState, useEffect } from 'react';

export default function FinalCTA() {
  const [userCount, setUserCount] = useState(10247);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="download" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#16213E] via-[#1A1A2E] to-[#0A0A0A]"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#39FF14] rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-10%',
              animation: `float ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Footprint Trail */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-10">
        <svg className="w-48 h-96" viewBox="0 0 100 400" fill="#00D4FF">
          <ellipse cx="35" cy="380" rx="12" ry="18"/>
          <ellipse cx="65" cy="340" rx="12" ry="18"/>
          <ellipse cx="35" cy="300" rx="12" ry="18"/>
          <ellipse cx="65" cy="260" rx="12" ry="18"/>
          <ellipse cx="35" cy="220" rx="12" ry="18"/>
          <ellipse cx="65" cy="180" rx="12" ry="18"/>
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-24 text-center">
        {/* Headline Stack */}
        <div className="mb-8 space-y-2">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold animate-slide-up">
            Every Step
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold animate-slide-up" style={{animationDelay: '0.1s'}}>
            Takes You
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#39FF14] glow-green animate-slide-up" style={{animationDelay: '0.2s'}}>
            Somewhere New
          </h2>
        </div>

        {/* Emotional Subhead */}
        <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-12 animate-slide-up" style={{animationDelay: '0.3s'}}>
          Your daily walk just became an adventure. Your steps just became a sport. Your world just got bigger.
        </p>

        {/* Primary CTA */}
        <div className="mb-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <a
            href="https://apps.apple.com/us/app/stepzsync/id6752641870"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download StepzSync on the App Store"
            className="inline-flex items-center gap-4 bg-[#2759FF] text-white px-10 py-5 rounded-full font-bold text-xl animate-breathe hover:scale-105 transition-transform"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Download StepzSync Free
          </a>
        </div>

        {/* Platform Text */}
        <p className="text-gray-500 mb-8 animate-slide-up" style={{animationDelay: '0.5s'}}>
          Available on iOS
        </p>

        {/* App Store Badge */}
        <div className="flex justify-center mb-12 animate-slide-up" style={{animationDelay: '0.6s'}}>
          <a
            href="https://apps.apple.com/us/app/stepzsync/id6752641870"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download StepzSync on the App Store"
            className="bg-black border border-gray-700 rounded-xl px-6 py-3 flex items-center gap-3 hover:border-gray-500 transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <div className="text-left">
              <p className="text-xs text-gray-400">Download on the</p>
              <p className="text-white font-semibold">App Store</p>
            </div>
          </a>
        </div>

        {/* Live Counter */}
        <div className="animate-slide-up" style={{animationDelay: '0.7s'}}>
          <p className="text-gray-500 text-sm">
            Join <span className="text-[#39FF14] font-bold">{userCount.toLocaleString()}</span> walkers already racing worldwide
          </p>
        </div>
      </div>
    </section>
  );
}

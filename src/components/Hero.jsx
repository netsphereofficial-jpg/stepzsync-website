import { useState, useEffect } from 'react';

export default function Hero() {
  const [stepCount, setStepCount] = useState(12847);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen gradient-hero grid-pattern overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00D4FF] rounded-full opacity-40 animate-pulse-glow"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#39FF14] rounded-full opacity-40 animate-pulse-glow" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-[#00BFFF] rounded-full opacity-40 animate-pulse-glow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#FF2E63] rounded-full opacity-40 animate-pulse-glow" style={{animationDelay: '1.5s'}}></div>

        {/* Map outline suggestion */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 600">
          <path
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
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <p className="text-[#00BFFF] uppercase tracking-[0.2em] text-sm font-medium animate-slide-up">
              Real Steps. Real Races. Real Time.
            </p>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block animate-slide-up" style={{animationDelay: '0.1s'}}>Your Steps Move</span>
              <span className="block animate-slide-up" style={{animationDelay: '0.2s'}}>You Across</span>
              <span className="block text-[#39FF14] animate-slide-up" style={{animationDelay: '0.3s'}}>the World</span>
            </h1>

            {/* Subheadline */}
            <p className="text-gray-400 text-lg md:text-xl max-w-lg animate-slide-up" style={{animationDelay: '0.4s'}}>
              Race anyone, anywhere. Walk your local streets while competing on real global routes. Every step counts—live.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{animationDelay: '0.5s'}}>
              <a
                href="#download"
                className="inline-flex items-center gap-3 bg-[#2759FF] text-white px-8 py-4 rounded-full font-semibold text-lg animate-breathe hover:scale-105 transition-transform"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                Download Free
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-4 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                </svg>
                Watch How It Works
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4 animate-slide-up" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></span>
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

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative animate-float">
              {/* Phone Frame */}
              <div className="phone-frame w-[280px] md:w-[300px]">
                <div className="phone-screen">
                  <img
                    src="/images/dashboard.jpeg"
                    alt="StepzSync App Dashboard"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              {/* Live Badge */}
              <div className="absolute -top-4 -right-4 bg-[#021F29] border border-[#39FF14]/50 rounded-xl px-4 py-2 flex items-center gap-2 glow-green">
                <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></span>
                <span className="text-[#39FF14] font-semibold text-sm">LIVE</span>
              </div>

              {/* Step Counter */}
              <div className="absolute -left-8 top-1/4 bg-[#021F29] border border-[#0F3460] rounded-xl px-4 py-3 glow-cyan">
                <p className="text-[#00D4FF] text-xs uppercase tracking-wider">Steps Today</p>
                <p className="text-white text-2xl font-bold">{stepCount.toLocaleString()}</p>
              </div>

              {/* Race Position */}
              <div className="absolute -right-6 bottom-1/3 bg-[#021F29] border border-[#0F3460] rounded-xl px-4 py-3">
                <p className="text-gray-400 text-xs uppercase tracking-wider">Position</p>
                <p className="text-[#FF6B35] text-2xl font-bold">#3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-500 text-sm">Scroll to explore</span>
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>
  );
}

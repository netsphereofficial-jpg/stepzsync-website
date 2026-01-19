export default function Leaderboard() {
  const topRacers = [
    { rank: 1, name: "Sarah Chen", country: "🇺🇸", steps: "2.4M", badge: "🏆" },
    { rank: 2, name: "Marcus Silva", country: "🇧🇷", steps: "2.1M", badge: "🥈" },
    { rank: 3, name: "Yuki Tanaka", country: "🇯🇵", steps: "1.9M", badge: "🥉" },
    { rank: 4, name: "Emma Schmidt", country: "🇩🇪", steps: "1.7M", badge: "" },
    { rank: 5, name: "Raj Patel", country: "🇮🇳", steps: "1.5M", badge: "" },
  ];

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-[#0F0F14] to-[#0A0A0A] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#FF2E63] rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#39FF14] rounded-full opacity-5 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Leaderboard Card */}
          <div className="relative">
            {/* Floating badge */}
            <div className="absolute -top-6 -right-6 bg-[#39FF14] text-black rounded-2xl px-6 py-3 rotate-6 z-10 shadow-2xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-xs font-bold uppercase">Live Now</p>
                  <p className="text-sm font-black">10,423 Racing</p>
                </div>
              </div>
            </div>

            {/* Leaderboard card */}
            <div className="bg-[#0F0F14] rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Global Leaders</h3>
                <span className="text-xs uppercase tracking-wider text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                  This Month
                </span>
              </div>

              <div className="space-y-4">
                {topRacers.map((racer, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      racer.rank <= 3
                        ? 'bg-gradient-to-r from-[#2759FF]/20 to-transparent border border-[#2759FF]/30'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className={`text-xl font-bold w-8 ${
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
                      <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-gray-400 text-sm">
                  <span className="text-[#00BFFF] font-semibold">You're ranked #847</span> — Keep moving to climb!
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <p className="text-[#FF2E63] uppercase tracking-[0.2em] text-sm font-bold glow-red px-4 py-2 rounded-full border border-[#FF2E63]/30 bg-[#FF2E63]/10">
                Compete Globally
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Race Against the<br/>
              <span className="text-[#39FF14]">Best in the World</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Join thousands of active racers competing on real routes across the globe. Track your ranking in real-time, earn badges, and push yourself to climb the leaderboard.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#2759FF]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">50+ Countries</h4>
                  <p className="text-gray-400 text-sm">Compete with racers from every continent</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#FF2E63]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Live Updates</h4>
                  <p className="text-gray-400 text-sm">Watch positions change in real-time as racers move</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🏅</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Earn Achievements</h4>
                  <p className="text-gray-400 text-sm">Unlock badges and rewards as you compete</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="https://apps.apple.com/us/app/stepzsync/id6752641870"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download StepzSync on the App Store to join the leaderboard"
                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl font-semibold text-base hover:scale-105 transition-transform border border-white/10 hover:border-white/30"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-90">Join the Competition</div>
                  <div className="text-lg font-bold -mt-1">Download Now</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

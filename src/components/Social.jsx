export default function Social() {
  const features = [
    {
      title: "Build Your Crew",
      description: "Add friends, follow top racers, create teams. Your personal walking community.",
      icon: (
        <svg className="w-8 h-8 text-[#FF2E63]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
        </svg>
      )
    },
    {
      title: "Talk While You Walk",
      description: "In-race messaging. Trash talk your opponents. Cheer on teammates.",
      icon: (
        <svg className="w-8 h-8 text-[#2759FF]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      title: "Climb the Rankings",
      description: "Weekly, monthly, all-time boards. Regional and global. See where you stand.",
      icon: (
        <svg className="w-8 h-8 text-[#39FF14]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"/>
        </svg>
      )
    }
  ];

  return (
    <section id="social" className="py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#FF2E63] rounded-full opacity-5 blur-3xl -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <p className="text-[#FF2E63] uppercase tracking-[0.2em] text-sm font-medium">
              Better Together
            </p>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Walk With Friends.<br/>
              <span className="text-[#FF2E63]">Compete With the World.</span>
            </h2>

            {/* Feature Blocks */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#021F29] border border-[#0F3460]/50 rounded-2xl p-5 card-hover"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] bg-gradient-to-br from-[#2759FF] to-[#FF2E63]"
                    style={{
                      backgroundImage: `linear-gradient(${45 + i * 30}deg, #2759FF, #FF2E63)`
                    }}
                  ></div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] bg-[#021F29] flex items-center justify-center text-xs font-medium text-gray-400">
                  +9K
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Join <span className="text-white font-semibold">10,000+</span> active walkers
              </p>
            </div>
          </div>

          {/* Right Content - Phone with Messages */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Phone */}
              <div className="phone-frame w-[280px] md:w-[300px] animate-float">
                <div className="phone-screen">
                  <img
                    src="/images/messages-list.jpeg"
                    alt="StepzSync Messages"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Floating Notification Cards */}
              <div className="absolute -left-8 top-16 bg-[#021F29] border border-[#0F3460] rounded-xl p-4 shadow-xl transform -rotate-3 animate-float" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00BFFF] to-[#2759FF]"></div>
                  <div>
                    <p className="text-white text-sm font-medium">Skylar</p>
                    <p className="text-[#FF2E63] text-xs">wants to race!</p>
                  </div>
                </div>
              </div>

              {/* Online Friends Indicator */}
              <div className="absolute -right-4 bottom-24 bg-[#021F29] border border-[#39FF14]/30 rounded-xl px-4 py-2 glow-green">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B35] border border-[#021F29]"></div>
                    <div className="w-6 h-6 rounded-full bg-[#00BFFF] border border-[#021F29]"></div>
                    <div className="w-6 h-6 rounded-full bg-[#FF2E63] border border-[#021F29]"></div>
                  </div>
                  <span className="text-[#39FF14] text-xs font-medium">3 friends online</span>
                </div>
              </div>

              {/* Heart Animation */}
              <div className="absolute -right-8 top-1/3">
                <svg className="w-6 h-6 text-[#FF2E63] animate-bounce" fill="currentColor" viewBox="0 0 20 20" style={{animationDelay: '0.2s'}}>
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

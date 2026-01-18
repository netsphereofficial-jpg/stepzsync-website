export default function RaceTypes() {
  const races = [
    {
      title: "Quick Race",
      badge: "5-15 min",
      description: "Jump into an instant race. Matched with opponents at your level. Perfect for a lunch break.",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
          <path d="M20 8L26 20H14L20 8Z" fill="#FF6B35"/>
          <path d="M20 32V20" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="20" cy="20" r="14" stroke="#FF6B35" strokeWidth="2" opacity="0.3"/>
        </svg>
      ),
      color: "#FF6B35",
      cta: "Start Quick Race"
    },
    {
      title: "Open Race",
      badge: "Public",
      badgeColor: "#39FF14",
      description: "Join public races worldwide. Pick any city, any route. Compete with the global community.",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="14" stroke="#00BFFF" strokeWidth="2"/>
          <path d="M20 6V34M6 20H34" stroke="#00BFFF" strokeWidth="1.5" opacity="0.5"/>
          <circle cx="20" cy="20" r="6" fill="#00BFFF" opacity="0.3"/>
          <circle cx="20" cy="20" r="2" fill="#00BFFF"/>
          <path d="M28 12L32 8" stroke="#00BFFF" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      color: "#00BFFF",
      cta: "Browse Races"
    },
    {
      title: "Private Race",
      badge: "Invite Only",
      description: "Create your own race. Challenge friends, family, or coworkers. Set your rules.",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
          <rect x="12" y="18" width="16" height="14" rx="2" stroke="#FF2E63" strokeWidth="2"/>
          <path d="M16 18V14C16 11.7909 17.7909 10 20 10V10C22.2091 10 24 11.7909 24 14V18" stroke="#FF2E63" strokeWidth="2"/>
          <circle cx="20" cy="25" r="2" fill="#FF2E63"/>
        </svg>
      ),
      color: "#FF2E63",
      cta: "Create Private"
    },
    {
      title: "Solo Race",
      badge: "Personal Best",
      description: "Race against yourself. Beat your records. Track improvement over time.",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="14" r="6" stroke="#00D4FF" strokeWidth="2"/>
          <path d="M12 32C12 26.4772 15.5817 22 20 22C24.4183 22 28 26.4772 28 32" stroke="#00D4FF" strokeWidth="2"/>
          <path d="M26 8L30 4" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="30" cy="4" r="2" fill="#00D4FF"/>
        </svg>
      ),
      color: "#00D4FF",
      cta: "Go Solo"
    }
  ];

  return (
    <section id="race-types" className="py-24 lg:py-32 gradient-premium relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#00BFFF] uppercase tracking-[0.2em] text-sm font-medium mb-4">
            Choose Your Challenge
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Four Ways to Race
          </h2>
        </div>

        {/* Race Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {races.map((race, index) => (
            <div
              key={index}
              className="group relative bg-[#021F29] border border-[#0F3460]/50 rounded-3xl p-6 lg:p-8 card-hover overflow-hidden"
            >
              {/* Background Gradient Accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to top, ${race.color}40, transparent)`
                }}
              ></div>

              {/* Icon */}
              <div className="mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3">
                {race.icon}
              </div>

              {/* Title & Badge */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold">{race.title}</h3>
              </div>

              {/* Badge */}
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{
                  backgroundColor: (race.badgeColor || race.color) + '20',
                  color: race.badgeColor || race.color
                }}
              >
                {race.badge}
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {race.description}
              </p>

              {/* CTA */}
              <a
                href="#download"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors group/link"
                style={{ color: race.color }}
              >
                {race.cta}
                <svg
                  className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>

              {/* Hover Border Glow */}
              <div
                className="absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ borderColor: race.color + '50' }}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <div className="text-center mt-16">
          <p className="text-gray-500">
            Can't decide? Try a <span className="text-[#FF6B35]">Quick Race</span> first—it takes less than 5 minutes.
          </p>
        </div>
      </div>
    </section>
  );
}

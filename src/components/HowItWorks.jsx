export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Walk Anywhere",
      description: "Open the app and start walking. Your local park, neighborhood, or treadmill—it all counts.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="#00D4FF" strokeWidth="2">
          <path d="M24 8v8M24 28v12M20 12l4-4 4 4M20 36l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="24" cy="20" r="4"/>
          <path d="M16 32c0-4.418 3.582-8 8-8s8 3.582 8 8" strokeLinecap="round"/>
        </svg>
      ),
      color: "#00D4FF"
    },
    {
      number: "02",
      title: "Join a Race",
      description: "Pick a route anywhere in the world. New York, Tokyo, Paris—your steps move you on the real map.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="#39FF14" strokeWidth="2">
          <circle cx="24" cy="24" r="16"/>
          <path d="M24 8v4M24 36v4M8 24h4M36 24h4" strokeLinecap="round"/>
          <circle cx="24" cy="24" r="6"/>
          <path d="M30 18l6-6" strokeLinecap="round"/>
          <path d="M34 14l2-2" strokeLinecap="round"/>
        </svg>
      ),
      color: "#39FF14"
    },
    {
      number: "03",
      title: "Compete Live",
      description: "See other racers in real-time. Push harder. Cross the finish line first.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="#FF2E63" strokeWidth="2">
          <circle cx="16" cy="20" r="6"/>
          <circle cx="32" cy="20" r="6"/>
          <path d="M16 28c-4 0-8 2-8 6v4h16v-4c0-4-4-6-8-6z"/>
          <path d="M32 28c-4 0-8 2-8 6v4h16v-4c0-4-4-6-8-6z"/>
          <path d="M20 10l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "#FF2E63"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-premium opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="text-[#FF6B35] uppercase tracking-[0.2em] text-sm font-medium mb-4">
            Simple as Walking
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Three Steps to Your First Race
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-[#00D4FF]/30"></div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative bg-[#021F29] border border-[#0F3460]/50 rounded-3xl p-8 lg:p-10 card-hover group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Number Background */}
              <div className="absolute top-4 right-4 text-7xl font-bold opacity-10" style={{ color: step.color }}>
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-6 relative z-10 transition-transform group-hover:scale-110">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.description}</p>

              {/* Step Number Badge */}
              <div
                className="absolute -top-4 left-8 px-4 py-1 rounded-full text-sm font-semibold"
                style={{ backgroundColor: step.color + '20', color: step.color }}
              >
                Step {step.number}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Visual */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-4 text-gray-500">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#00D4FF]"></div>
            <span className="text-sm uppercase tracking-wider">Start walking in under 60 seconds</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#00D4FF]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

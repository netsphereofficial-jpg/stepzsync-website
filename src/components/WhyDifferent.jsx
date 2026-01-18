export default function WhyDifferent() {
  const features = [
    { text: "GPS-accurate movement", color: "#00D4FF" },
    { text: "Live opponent positions", color: "#FF2E63" },
    { text: "Real city routes", color: "#2759FF" },
    { text: "No fake animations", color: "#39FF14" }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#0F0F14] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#39FF14] rounded-full opacity-5 blur-3xl -translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Eyebrow with glow */}
            <div className="inline-block">
              <p className="text-[#39FF14] uppercase tracking-[0.2em] text-sm font-bold glow-green px-4 py-2 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10">
                Not a Simulation
              </p>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Real People.<br/>
              Real Routes.<br/>
              <span className="text-[#39FF14]">Real Competition.</span>
            </h2>

            {/* Body */}
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              Forget virtual treadmills and animated avatars. StepzSync connects your actual steps to actual geography. When you walk 5,000 steps, your avatar moves exactly that distance on a real-world map. Race against real humans moving in real-time.
            </p>

            {/* Feature List */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: feature.color + '20' }}
                  >
                    <svg className="w-4 h-4" fill={feature.color} viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-xl px-5 py-3 rotate-[-2deg] glow-green mt-4">
              <svg className="w-5 h-5 text-[#39FF14]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="text-[#39FF14] font-semibold">100% Real Movement</span>
            </div>
          </div>

          {/* Right Content - Phone Comparison */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* "Other Apps" Phone (dimmed) */}
              <div className="absolute -left-8 top-8 opacity-40 transform -rotate-6 scale-90">
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

              {/* StepzSync Phone (highlighted) */}
              <div className="relative z-10 transform rotate-3">
                <div className="phone-frame w-64 glow-green">
                  <div className="phone-screen">
                    <img
                      src="/images/my-races.jpeg"
                      alt="StepzSync Race View"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-[#39FF14] text-black rounded-full p-2">
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

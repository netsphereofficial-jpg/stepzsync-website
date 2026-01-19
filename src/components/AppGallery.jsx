export default function AppGallery() {
  const screenshots = [
    { src: "/images/App screen_01.png", alt: "Race map view" },
    { src: "/images/App screen_02.png", alt: "Live tracking" },
    { src: "/images/App screen_03.png", alt: "Leaderboard" },
    { src: "/images/App screen_04.png", alt: "Race selection" },
    { src: "/images/App screen_06.png", alt: "Profile stats" },
    { src: "/images/App screen_07.png", alt: "Global routes" },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2759FF] rounded-full opacity-10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#00BFFF] uppercase tracking-[0.2em] text-sm font-medium mb-4">
            Experience the App
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            See It In <span className="text-[#39FF14]">Action</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stunning race views, real-time tracking, and competitive leaderboards
          </p>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="phone-frame-mini overflow-hidden rounded-2xl border border-white/10 hover:border-[#00BFFF]/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00BFFF]/20">
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

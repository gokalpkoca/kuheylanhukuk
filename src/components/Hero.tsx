import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-2">
            KÜHEYLAN
          </h1>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-gold tracking-[0.2em]">
            HUKUK
          </p>
          <div className="w-16 h-px bg-gold mx-auto mt-8 mb-8" />
        </div>

        <p className="font-serif text-lg sm:text-xl md:text-2xl text-foreground/90 italic leading-relaxed max-w-2xl mx-auto">
          "Uzmanlık, Deneyim, Çözüm Odaklı Yaklaşım"
        </p>

        <a
          href="#hakkimizda"
          className="inline-block mt-12 px-8 py-3 border border-gold text-gold uppercase text-sm tracking-[0.15em] font-medium hover:bg-gold hover:text-primary-foreground transition-all duration-300"
        >
          Keşfedin
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gold/40 animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;

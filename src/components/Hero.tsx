import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}>

        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/40" />
      </div>

      {/* Content - Left aligned like Bayraktar */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-primary" />
            <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium">
              KÜHEYLAN HUKUK BÜROSU
            </p>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-4">
            Profesyonel
            <br />
            <span className="text-primary italic">Hukuk</span> Ekibi
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
            Uzmanlık, Deneyim, Çözüm Odaklı Yaklaşım
          </p>

          <a
            href="#ekibimiz"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-primary/10 border border-primary text-foreground uppercase text-sm tracking-[0.15em] font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded">

            Ekibimizi İnceleyin
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

      </div>

      {/* Slide indicator */}
      


    </section>);

};

export default Hero;
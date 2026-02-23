import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="hakkimizda" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-muted rounded overflow-hidden border border-border">
              <div className="w-full h-full bg-gradient-to-br from-muted to-background flex items-center justify-center">
                <div className="text-center">
                  <span className="font-serif text-6xl font-bold text-primary/20">K</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium">
                {t("about.subtitle")}
              </p>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-2">
              {t("about.title1")}{" "}
              <span className="text-primary italic">{t("about.title2")}</span>
            </h2>

            <div className="w-12 h-px bg-muted-foreground/40 mt-6 mb-8" />

            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg mb-6">
              {t("about.description1")}
            </p>
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg mb-8">
              {t("about.description2")}
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-3 px-6 py-3 border border-primary text-primary uppercase text-sm tracking-[0.1em] font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded"
            >
              {t("about.cta")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

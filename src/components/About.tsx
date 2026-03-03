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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-4">
            {t("about.tagline")}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            {t("about.main_title")}
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg text-justify">
              {t("about.description1")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-serif text-xl md:text-2xl text-foreground font-bold mb-4">
              {t("about.section2_title")}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg text-justify">
              {t("about.section2_desc")}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-serif text-xl md:text-2xl text-foreground font-bold mb-4">
              {t("about.section3_title")}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg text-justify">
              {t("about.section3_desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="font-serif text-xl md:text-2xl text-foreground font-bold mb-4">
              {t("about.section4_title")}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg text-justify">
              {t("about.section4_desc")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

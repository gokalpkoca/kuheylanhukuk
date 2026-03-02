import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { practiceAreas } from "@/data/practiceAreas";
import { useLanguage } from "@/context/LanguageContext";

const PracticeAreas = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="faaliyet-alanlari" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            {t("practice.title1")} <span className="text-primary italic">{t("practice.title2")}</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t("practice.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <a
            href="#faaliyet-alanlari"
            className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
          >
            {t("practice.view_all")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        <div className="overflow-x-auto pb-4 pt-2 -mx-4 px-4">
          <div className="flex gap-5 min-w-max">
            {practiceAreas.map((area, i) => (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group cursor-pointer w-48 shrink-0"
              >
                <Link to={`/faaliyet-alanlari/${area.slug}`}>
                  <div className="aspect-[3/4] bg-card border border-border rounded overflow-hidden relative hover:border-primary hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-[transform,box-shadow,border-color] duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <area.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="font-serif text-sm text-foreground text-center font-medium leading-snug">
                        {t(`pa.${area.slug}`)}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;

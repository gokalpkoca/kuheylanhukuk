import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Globe } from "lucide-react";
import mertDenizPhoto from "@/assets/mert-deniz.jpeg";
import { useLanguage } from "@/context/LanguageContext";

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="ekibimiz" className="py-24 lg:py-32 bg-dark-surface">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
            {t("team.subtitle")}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-dark-surface-foreground font-bold">
            {t("team.title")}
          </h2>
          <div className="w-16 h-px bg-white/30 mx-auto mt-6 mb-8" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-dark-surface-muted text-justify max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          {t("team.description")}
        </motion.p>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="border border-white/10 rounded bg-white/5 p-8 lg:p-12">
            {/* Top: Photo + Name + Contact */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
              <div className="w-32 h-32 rounded-full border-2 border-gold overflow-hidden shrink-0">
                <img
                  src={mertDenizPhoto}
                  alt="Mert Deniz Küheylan"
                  className="w-full h-full object-cover object-[center_15%]"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-serif text-2xl lg:text-3xl text-dark-surface-foreground font-bold mb-1 transition-all duration-300 hover:scale-105 hover:text-primary cursor-default">
                  {t("team.member_name")}
                </h3>
                <p className="text-gold text-sm tracking-wider mb-4 transition-all duration-300 hover:scale-105 hover:text-primary cursor-default">
                  {t("team.founder")}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 text-dark-surface-muted text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gold" />
                    <span>av.mdkuheylan@hotmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gold" />
                    <span>{t("team.languages_spoken")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Intro */}
            <p className="text-dark-surface-muted leading-relaxed mb-8 text-justify">
              {t("team.bio_intro")}
            </p>

            {/* Section: Mesleki Tecrübe */}
            <div className="mb-8">
              <h4 className="font-serif text-lg text-dark-surface-foreground font-semibold mb-3 border-l-2 border-gold pl-4 transition-all duration-300 hover:scale-[1.03] hover:text-primary origin-left cursor-default">
                {t("team.bio_experience_title")}
              </h4>
              <p className="text-dark-surface-muted leading-relaxed mb-3 text-justify">
                {t("team.bio_experience_1")}
              </p>
              <p className="text-dark-surface-muted leading-relaxed text-justify">
                {t("team.bio_experience_2")}
              </p>
            </div>

            {/* Section: Çok Yönlü Bakış */}
            <div className="mb-8">
              <h4 className="font-serif text-lg text-dark-surface-foreground font-semibold mb-3 border-l-2 border-gold pl-4 transition-all duration-300 hover:scale-[1.03] hover:text-primary origin-left cursor-default">
                {t("team.bio_strategy_title")}
              </h4>
              <p className="text-dark-surface-muted leading-relaxed text-justify">
                {t("team.bio_strategy_desc")}
              </p>
            </div>

            {/* Section: Sivil Toplum */}
            <div className="mb-8">
              <h4 className="font-serif text-lg text-dark-surface-foreground font-semibold mb-3 border-l-2 border-gold pl-4">
                {t("team.bio_civil_title")}
              </h4>
              <p className="text-dark-surface-muted leading-relaxed mb-4 text-justify">
                {t("team.bio_civil_intro")}
              </p>

              <div className="space-y-4 pl-4">
                <div>
                  <h5 className="text-dark-surface-foreground text-sm font-semibold mb-1">
                    {t("team.bio_civil_uni_title")}
                  </h5>
                  <p className="text-dark-surface-muted text-sm leading-relaxed text-justify">
                    {t("team.bio_civil_uni_desc")}
                  </p>
                </div>
                <div>
                  <h5 className="text-dark-surface-foreground text-sm font-semibold mb-1">
                    {t("team.bio_civil_pro_title")}
                  </h5>
                  <ul className="text-dark-surface-muted text-sm leading-relaxed space-y-1.5 list-disc list-inside">
                    <li>{t("team.bio_civil_pro_1")}</li>
                    <li>{t("team.bio_civil_pro_2")}</li>
                    <li>{t("team.bio_civil_pro_3")}</li>
                    <li>{t("team.bio_civil_pro_4")}</li>
                    <li>{t("team.bio_civil_pro_5")}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Closing */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-dark-surface-muted leading-relaxed text-justify">
                {t("team.bio_closing")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;

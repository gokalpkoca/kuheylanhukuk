import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Globe } from "lucide-react";
import mertDenizPhoto from "@/assets/mert-deniz.jpeg";
import { useLanguage } from "@/context/LanguageContext";

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const team = [
    {
      name: "Mert Deniz Küheylan",
      title: t("team.founder"),
      initials: "MDK",
      bio: t("team.bio"),
      email: "av.mdkuheylan@hotmail.com",
      languages: ["Türkçe", "İngilizce", "Almanca"],
    },
  ];

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
          className="text-dark-surface-muted text-center max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          {t("team.description")}
        </motion.p>

        <div className="flex justify-center max-w-md mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="border border-white/10 rounded bg-white/5 p-8 hover:border-gold transition-colors duration-300"
            >
              <div className="w-24 h-24 rounded-full border-2 border-gold overflow-hidden mx-auto mb-6">
                <img src={mertDenizPhoto} alt={member.name} className="w-full h-full object-cover object-[center_15%]" />
              </div>

              <div className="text-center">
                <h3 className="font-serif text-xl text-dark-surface-foreground font-semibold mb-1">
                  {member.name}
                </h3>
                <p className="text-gold text-sm uppercase tracking-wider mb-4">{member.title}</p>
                <p className="text-dark-surface-muted text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                <div className="flex items-center justify-center gap-2 text-dark-surface-muted text-xs mb-4">
                  <Mail className="w-3.5 h-3.5 text-gold" />
                  <span>{member.email}</span>
                </div>

                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <Globe className="w-3.5 h-3.5 text-gold" />
                  {member.languages.map((lang) => (
                    <span
                      key={lang}
                      className="text-xs px-2 py-0.5 bg-white/10 text-dark-surface-muted rounded"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

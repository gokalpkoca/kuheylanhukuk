import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Map,
  ClipboardCheck,
  CheckCircle2,
  UserRound,
  PhoneCall,
  Eye,
  Target,
  Lock,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const steps = [
  { key: "1", Icon: MessageSquare, anim: "pa-anim-tap" },
  { key: "2", Icon: Map, anim: "pa-anim-unfurl" },
  { key: "3", Icon: ClipboardCheck, anim: "pa-anim-page" },
  { key: "4", Icon: CheckCircle2, anim: "pa-anim-guard" },
];

const principles = [
  { key: "1", Icon: UserRound, anim: "pa-anim-lift" },
  { key: "2", Icon: PhoneCall, anim: "pa-anim-swing" },
  { key: "3", Icon: Eye, anim: "pa-anim-shine" },
  { key: "4", Icon: Target, anim: "pa-anim-guard" },
  { key: "5", Icon: Lock, anim: "pa-anim-drop" },
  { key: "6", Icon: GraduationCap, anim: "pa-anim-case" },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="calisma-surecimiz" className="py-24 lg:py-32 bg-muted/40">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-4">
            {t("process.subtitle")}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            {t("process.title")}
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-muted-foreground leading-relaxed text-justify sm:text-center">
            {t("process.intro")}
          </p>
          <div className="w-16 h-px bg-muted-foreground/40 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map(({ key, Icon, anim }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative h-full bg-card border border-border rounded-xl p-7 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
            >
              <span className="absolute top-5 right-6 font-serif text-4xl text-primary/15 font-bold select-none">
                0{key}
              </span>
              <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center mb-5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className={`w-5 h-5 pa-icon ${anim}`} aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg text-foreground font-semibold mb-3 group-hover:text-primary transition-colors">
                {t(`process.step${key}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`process.step${key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-serif text-2xl md:text-3xl text-foreground font-bold text-center mb-10"
        >
          {t("process.principles.title")}
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map(({ key, Icon, anim }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
              className="group flex items-start gap-4 bg-card border border-border rounded-xl p-6 transition-colors hover:border-primary/50"
            >
              <span className="shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Icon className={`w-5 h-5 pa-icon ${anim}`} aria-hidden="true" />
              </span>
              <div>
                <h4 className="font-serif text-base text-foreground font-semibold mb-1.5">
                  {t(`process.principle${key}.title`)}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`process.principle${key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/#iletisim"
            className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary uppercase text-sm tracking-[0.15em] font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {t("process.cta")}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Process;

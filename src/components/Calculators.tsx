import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Percent,
  Car,
  Clock,
  Gavel,
  FileEdit,
  Wallet,
  BadgeDollarSign,
  Home,
  Receipt,
  Globe2,
  Calculator as CalcIcon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { calculators } from "@/data/calculators";
import { calcIconAnim } from "@/lib/calculatorIconAnim";

const icons: Record<string, React.ElementType> = {
  "adi-faiz-hesaplama": Percent,
  "arac-deger-kaybi-hesaplama": Car,
  "fazla-mesai-hesaplama": Clock,
  "icra-masrafi-hesaplama": Gavel,
  "islah-harci-hesaplama": FileEdit,
  "kidem-tazminati-hesaplama": Wallet,
  "kidem-ve-ihbar-tazminati-hesaplama": BadgeDollarSign,
  "kira-stopaj-hesaplama": Home,
  "serbest-meslek-makbuzu-hesaplama": Receipt,
  "yurt-disi-borclanma-hesaplama": Globe2,
};

const Calculators = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const displayed = calculators.slice(0, 6);

  return (
    <section id="hesaplama-araclari" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-4">
            {t("calc.subtitle")}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            {t("nav.hesaplama")}
          </h2>
          <div className="w-16 h-px bg-muted-foreground/40 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((calc, i) => {
            const Icon = icons[calc.slug] ?? CalcIcon;
            return (
              <motion.div
                key={calc.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.08 }}
              >
                <Link
                  to={`/hesaplama-araclarimiz/${calc.slug}`}
                  className="group block h-full bg-card border border-border rounded-xl p-7 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center mb-5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className={`w-5 h-5 ${calcIconAnim(calc.slug)}`} />
                  </div>
                  <h3 className="font-serif text-lg text-foreground font-semibold mb-3 group-hover:text-primary transition-colors">
                    {calc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{calc.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                    {t("calc.compute")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/hesaplama-araclarimiz"
            className="inline-block px-8 py-3 border border-primary text-primary uppercase text-sm tracking-[0.15em] font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {t("calc.view_all")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Calculators;

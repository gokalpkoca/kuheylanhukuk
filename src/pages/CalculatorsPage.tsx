import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
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

const CalculatorsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Hesaplama Araçları | Küheylan Hukuk Bürosu"
        description="Kıdem ve ihbar tazminatı, fazla mesai, adi faiz, icra masrafı, kira stopajı ve daha fazlası için ücretsiz hukuki hesaplama araçları."
        path="/hesaplama-araclarimiz"
      />
      <Navbar />

      <PageHeader eyebrow="Küheylan Hukuk" title="Hesaplama Araçlarımız" />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <p className="text-muted-foreground text-justify max-w-3xl mb-12">
            Aşağıdaki araçlar, sık karşılaşılan hukuki hesaplamaları hızlıca yapabilmeniz için hazırlanmıştır.
            Sonuçlar bilgilendirme amaçlıdır ve hukuki mütalaa niteliği taşımaz.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc, i) => {
              const Icon = icons[calc.slug] ?? CalcIcon;
              return (
              <motion.div
                key={calc.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              >
                <Link
                  to={`/hesaplama-araclarimiz/${calc.slug}`}
                  className="group block h-full bg-card border border-border rounded-xl p-7 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center mb-5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className={`w-5 h-5 ${calcIconAnim(calc.slug)}`} />
                  </div>
                  <h2 className="font-serif text-lg text-foreground font-semibold mb-3 group-hover:text-primary transition-colors">
                    {calc.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{calc.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                    Hesapla
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CalculatorsPage;

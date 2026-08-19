import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { practiceAreas } from "@/data/practiceAreas";
import { useLanguage } from "@/context/LanguageContext";
import { paIconAnim } from "@/lib/practiceAreaIconAnim";

const PracticeAreasPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Faaliyet Alanları | Küheylan Hukuk Bürosu"
        description="Ceza, gayrimenkul, şirketler, iş, aile, miras, idare ve daha birçok alanda uzman hukuki hizmetler."
        path="/faaliyet-alanlari"
      />
      <Navbar />
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Ana Sayfa
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
              {t("nav.faaliyet_alanlari")}
            </h1>
            <div className="w-16 h-px bg-muted-foreground/40 mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area, i) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    to={`/faaliyet-alanlari/${area.slug}`}
                    className="group flex items-center gap-4 p-6 border border-border rounded bg-card hover:border-primary hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className={`w-6 h-6 text-primary ${paIconAnim(area.slug)}`} />
                    </div>
                    <span className="font-serif text-base text-foreground font-medium group-hover:text-primary transition-colors">
                      {t(`pa.${area.slug}`)}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PracticeAreasPage;

import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { practiceAreas } from "@/data/practiceAreas";
import { useLanguage } from "@/context/LanguageContext";

const PracticeAreaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const area = practiceAreas.find((a) => a.slug === slug);
  const currentIndex = practiceAreas.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? practiceAreas[currentIndex - 1] : null;
  const next = currentIndex < practiceAreas.length - 1 ? practiceAreas[currentIndex + 1] : null;

  if (!area) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl text-foreground font-bold mb-4">Sayfa Bulunamadı</h1>
          <Link to="/#faaliyet-alanlari" className="text-primary hover:underline">
            {t("practice.back")}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = area.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/#faaliyet-alanlari"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("nav.faaliyet_alanlari")}
            </Link>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded bg-primary/10 flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
                {t(`pa.${area.slug}`)}
              </h1>
            </div>

            <div className="w-16 h-px bg-muted-foreground/40 mb-10" />

            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              {area.description}
            </p>

            <div className="border-t border-border pt-10">
              <h3 className="font-serif text-xl text-foreground font-semibold mb-6">
                {t("practice.view_all")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {practiceAreas
                  .filter((a) => a.slug !== slug)
                  .map((a) => (
                    <Link
                      key={a.slug}
                      to={`/faaliyet-alanlari/${a.slug}`}
                      className="px-4 py-3 border border-border rounded text-sm text-muted-foreground hover:border-primary hover:text-primary transition-all"
                    >
                      {t(`pa.${a.slug}`)}
                    </Link>
                  ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
              {prev ? (
                <Link
                  to={`/faaliyet-alanlari/${prev.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t(`pa.${prev.slug}`)}
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  to={`/faaliyet-alanlari/${next.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(`pa.${next.slug}`)}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PracticeAreaDetail;

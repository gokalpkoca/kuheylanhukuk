import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { practiceAreas } from "@/data/practiceAreas";
import { allArticles } from "@/data/articles";
import { translatedTitle, formatDate } from "@/lib/articleI18n";
import { useLanguage } from "@/context/LanguageContext";

const PracticeAreaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
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
  const slugFromPdf = (pdfUrl?: string) =>
    pdfUrl ? (pdfUrl.split("/").pop() || "").replace(/\.pdf$/i, "") : "";
  const relatedArticles = allArticles.filter((a) => a.category === area.slug);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${t(`pa.${area.slug}`)} | Küheylan Hukuk Bürosu`}
        description={area.description.slice(0, 155)}
        path={`/faaliyet-alanlari/${area.slug}`}
      />
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

            {/* İlgili Makaleler */}
            <section className="border-t border-border pt-10 mb-14">
              <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
                <h2 className="font-serif text-xl md:text-2xl text-foreground font-semibold">
                  {t("practice.related")}
                </h2>
                {relatedArticles.length > 0 && (
                  <span className="text-xs uppercase tracking-widest text-primary">
                    {relatedArticles.length} {t("practice.article_count")}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-6 max-w-xl">
                {t("practice.related_desc")}
              </p>

              {relatedArticles.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedArticles.map((a, i) => {
                    const aSlug = slugFromPdf(a.pdfUrl);
                    return (
                      <motion.div
                        key={aSlug}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.05 }}
                      >
                        <Link
                          to={`/blog/${aSlug}`}
                          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
                        >
                          <span className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100" />
                          <h3 className="font-serif text-base md:text-lg text-foreground font-semibold leading-snug transition-colors group-hover:text-primary">
                            {translatedTitle(aSlug, language, a.title)}
                          </h3>
                          <div className="mt-4 flex items-center justify-between gap-3">
                            <span className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5 text-primary" />
                              {formatDate(a.date, language, t)}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:gap-2.5">
                              {t("practice.read_more")}
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <p className="rounded-lg border border-dashed border-border bg-card/50 p-6 text-sm text-muted-foreground">
                  {t("practice.related_none")}
                </p>
              )}
            </section>

            {/* Diğer faaliyet alanları */}
            <section className="border-t border-border pt-10">
              <h2 className="font-serif text-xl md:text-2xl text-foreground font-semibold mb-2">
                {t("practice.other_title")}
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-xl">
                {t("practice.other_desc")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {practiceAreas
                  .filter((a) => a.slug !== slug)
                  .map((a) => {
                    const AIcon = a.icon;
                    return (
                      <Link
                        key={a.slug}
                        to={`/faaliyet-alanlari/${a.slug}`}
                        className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-md hover:shadow-primary/10"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-primary/10 transition-colors group-hover:bg-primary/20">
                          <AIcon className="h-4.5 w-4.5 text-primary" />
                        </span>
                        <span className="font-serif text-sm text-foreground font-medium leading-snug transition-colors group-hover:text-primary">
                          {t(`pa.${a.slug}`)}
                        </span>
                        <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-primary opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    );
                  })}
              </div>
            </section>

            {/* Önceki / Sonraki */}
            <nav className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-border pt-8">
              {prev ? (
                <Link
                  to={`/faaliyet-alanlari/${prev.slug}`}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-md hover:shadow-primary/10"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">
                      {t("practice.prev")}
                    </span>
                    <span className="block font-serif text-sm text-foreground font-medium transition-colors group-hover:text-primary">
                      {t(`pa.${prev.slug}`)}
                    </span>
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
              {next && (
                <Link
                  to={`/faaliyet-alanlari/${next.slug}`}
                  className="group flex items-center justify-end gap-3 rounded-lg border border-border bg-card p-4 text-right transition-all duration-300 hover:border-primary hover:shadow-md hover:shadow-primary/10"
                >
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">
                      {t("practice.next")}
                    </span>
                    <span className="block font-serif text-sm text-foreground font-medium transition-colors group-hover:text-primary">
                      {t(`pa.${next.slug}`)}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </nav>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PracticeAreaDetail;

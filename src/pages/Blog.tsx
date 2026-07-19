import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Calendar, ArrowRight, ArrowLeft, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { practiceAreas } from "@/data/practiceAreas";
import { allArticles } from "@/data/articles";
import { translatedTitle, formatDate } from "@/lib/articleI18n";



const ITEMS_PER_PAGE = 9;

const Blog = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const initialDept = searchParams.get("dept") || "";
  const [selectedDept, setSelectedDept] = useState(initialDept);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, language } = useLanguage();


  useEffect(() => {
    const dept = searchParams.get("dept") || "";
    setSelectedDept(dept);
    setCurrentPage(1);
  }, [searchParams]);

  const filtered = allArticles
    .map((a) => {
      const slug = a.pdfUrl ? a.pdfUrl.split("/").pop()!.replace(/\.pdf$/i, "") : "";
      return {
        ...a,
        slug,
        displayTitle: slug ? translatedTitle(slug, language, a.title) : a.title,
        displayDate: formatDate(a.date, language, t),
      };
    })
    .filter((a) => selectedDept === "" || a.category === selectedDept)
    .filter((a) => searchQuery === "" || a.displayTitle.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);


  const handleDeptChange = (dept: string) => {
    setSelectedDept(prev => prev === dept ? "" : dept);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Makaleler | Küheylan Hukuk Bürosu"
        description="Küheylan Hukuk Bürosu avukatlarının kaleme aldığı hukuki rehberler ve güncel makaleler."
        path="/blog"
      />
      <Navbar />
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Ana Sayfa
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
              {t("nav.makaleler")}
            </h1>
            <div className="w-16 h-px bg-muted-foreground/40 mt-6" />
          </motion.div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Makale ara..."
              className="w-full pl-11 pr-10 py-3 border border-border rounded bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch("")}
                aria-label="Aramayı temizle"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-10 auto-rows-fr">
            {practiceAreas.map((area) => {
              const Icon = area.icon;
              return (
                <button
                  key={area.slug}
                  onClick={() => handleDeptChange(area.slug)}
                  className={`flex items-center gap-2.5 px-4 py-3 text-xs uppercase tracking-wider rounded border transition-all duration-200 text-left min-h-[52px] ${
                    selectedDept === area.slug
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{t(`pa.${area.slug}`)}</span>
                </button>
              );
            })}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((article, i) => {
              const CardInner = (
                <>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{article.displayDate}</span>
                  </div>
                  <h2 className="font-serif text-base text-foreground font-medium leading-snug mb-3 flex-1">
                    {article.displayTitle}
                  </h2>
                  <p className="text-xs text-primary/80 mb-4">{t(`pa.${article.category}`)}</p>
                  <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-200 self-start">
                    {t("blog.read_more")}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </>
              );
              const className =
                "border border-border rounded bg-card p-6 hover:border-primary hover:-translate-y-1 transition-all duration-300 group flex flex-col cursor-pointer";
              return (
                <motion.article
                  key={article.slug || article.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  {article.pdfUrl ? (
                    <Link to={`/blog/${article.slug}`} className={className}>
                      {CardInner}
                    </Link>
                  ) : (
                    <div className={className}>{CardInner}</div>
                  )}
                </motion.article>
              );
            })}

          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">{t("news.not_found")}</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-border rounded text-sm text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Önceki
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded text-sm transition-colors ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-border rounded text-sm text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Sonraki
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

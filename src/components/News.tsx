import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { allArticles } from "@/data/articles";

const News = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? allArticles : allArticles.slice(0, 6);
  const { t } = useLanguage();

  return (
    <section id="haberler" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
            {t("news.subtitle")}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            {t("news.title")}
          </h2>
          <div className="w-16 h-px bg-foreground/20 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.08 }}
              className="border border-border rounded bg-card hover:border-gold hover:-translate-y-1 transition-all duration-300 group flex flex-col shadow-sm"
            >
              <Link
                to={`/blog/${slugFromPdf(article.pdfUrl)}`}
                aria-label={`${t("news.read_more")}: ${article.title}`}
                className="flex flex-col flex-1 p-6"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  <span>{article.date}</span>
                </div>
                <h3 className="font-serif text-base text-foreground font-medium leading-snug mb-3 flex-1">
                  {article.title}
                </h3>
                <p className="text-xs text-gold/80 mb-4">{t(`pa.${article.category}`)}</p>
                <span className="inline-flex items-center gap-1.5 text-gold text-sm font-medium group-hover:gap-3 transition-all duration-200 self-start">
                  {t("news.read_more")}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>


        {!showAll && allArticles.length > 6 && (
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-block px-8 py-3 border border-gold text-gold uppercase text-sm tracking-[0.15em] font-medium hover:bg-gold hover:text-primary-foreground transition-all duration-300"
            >
              {t("news.view_all")}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;

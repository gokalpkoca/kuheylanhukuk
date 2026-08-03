import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { allArticles } from "@/data/articles";
import { useLanguage } from "@/context/LanguageContext";
import { translatedTitle, translatedBlocks, formatDate } from "@/lib/articleI18n";

function slugFromPdf(pdfUrl?: string) {
  if (!pdfUrl) return "";
  const base = pdfUrl.split("/").pop() || "";
  return base.replace(/\.pdf$/i, "");
}

const isHeading = (text: string) =>
  text.length <= 90 &&
  !/[.:;]$/.test(text) &&
  text.split(" ").length <= 12 &&
  !text.startsWith('"') &&
  text !== text.toLowerCase();

const ArticleDetail = () => {
  const { slug = "" } = useParams();
  const { t, language, dir } = useLanguage();
  const article = allArticles.find((a) => slugFromPdf(a.pdfUrl) === slug);
  const blocks = article ? translatedBlocks(slug, language) : [];

  if (!article || !blocks.length) return <Navigate to="/blog" replace />;

  const title = translatedTitle(slug, language, article.title);
  const displayDate = formatDate(article.date, language, t);


  // First block is usually a category label; drop it if short & matches
  const rendered = blocks.slice();
  if (rendered[0] && rendered[0].text.length < 40 && !rendered[0].text.includes(".")) {
    rendered.shift();
  }

  const description = (blocks.find((b) => b.text.length > 80)?.text || title).slice(0, 155);
  const url = `https://kuheylanhukuk.com/blog/${slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: article.date,
    inLanguage: language.toLowerCase(),
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Küheylan Hukuk Bürosu" },
    publisher: {
      "@type": "Organization",
      name: "Küheylan Hukuk Bürosu",
      logo: { "@type": "ImageObject", url: "https://kuheylanhukuk.com/favicon.png" },
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("blog.back_home"), item: "https://kuheylanhukuk.com/" },
      { "@type": "ListItem", position: 2, name: t("nav.makaleler"), item: "https://kuheylanhukuk.com/blog" },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };


  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <SEO
        title={`${title} | Küheylan Hukuk Bürosu`}
        description={description}
        path={`/blog/${slug}`}
        type="article"
        jsonLd={[articleLd, breadcrumbLd]}
      />

      <Navbar />
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("blog.back_to_list")}
            </Link>

            <p className="text-xs uppercase tracking-wider text-primary mb-3">
              {t(`pa.${article.category}`)}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{displayDate}</span>
            </div>
            <div className="w-16 h-px bg-muted-foreground/40 mt-6 mb-10" />


            <article className="space-y-5 text-justify text-foreground/90 leading-relaxed">
              {(() => {
                const nodes: JSX.Element[] = [];
                let i = 0;
                while (i < rendered.length) {
                  const b = rendered[i];
                  if (isHeading(b.text)) {
                    const heading = (
                      <h2
                        key={`h-${i}`}
                        className="font-serif text-xl md:text-2xl text-foreground font-semibold mt-8 mb-2 text-left"
                      >
                        {b.text}
                      </h2>
                    );
                    nodes.push(heading);
                    if (isFaqHeading(b.text)) {
                      const items: { q: string; a: string }[] = [];
                      let j = i + 1;
                      while (j < rendered.length && !isHeading(rendered[j].text)) {
                        const text = rendered[j].text;
                        const qEnd = text.indexOf("?");
                        if (qEnd > 0) {
                          items.push({
                            q: text.slice(0, qEnd + 1).trim(),
                            a: text.slice(qEnd + 1).trim(),
                          });
                        } else {
                          items.push({ q: text.slice(0, 90).trim(), a: text.slice(90).trim() });
                        }
                        j++;
                      }
                      if (items.length) {
                        nodes.push(
                          <Accordion key={`faq-${i}`} type="single" collapsible className="mt-2">
                            {items.map((item, k) => (
                              <AccordionItem key={k} value={`faq-${i}-${k}`}>
                                <AccordionTrigger className="text-left text-base font-medium">
                                  {item.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-justify text-foreground/90 leading-relaxed">
                                  {item.a}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        );
                        i = j;
                        continue;
                      }
                    }
                    i++;
                    continue;
                  }
                  nodes.push(
                    <p key={`p-${i}`} className="text-base">
                      {b.text}
                    </p>
                  );
                  i++;
                }
                return nodes;
              })()}
            </article>

          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;

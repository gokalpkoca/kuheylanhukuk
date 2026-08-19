import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, ChevronDown, Clock, Download, Link2, List, ChevronDown as TocChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const isFaqHeading = (text: string) =>
  /(sıkça\s+sorulan|sikca\s+sorulan|frequently\s+asked|faq|часто\s+задаваемые|الأسئلة|أسئلة)/i.test(
    text
  );

const isSignature = (text: string) =>
  /(kuheylanhukuk\.com|info@kuheylan)/i.test(text);

const slugifyHeading = (text: string, i: number) =>
  `s-${i}-${text
    .toLocaleLowerCase("tr")
    .replace(/[^a-z0-9çğıöşü]+/gi, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40)}`;

const ArticleDetail = () => {
  const { slug = "" } = useParams();
  const { t, language, dir } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [tocHasMore, setTocHasMore] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const tocListRef = useRef<HTMLUListElement>(null);



  const article = allArticles.find((a) => slugFromPdf(a.pdfUrl) === slug);
  const blocks = article ? translatedBlocks(slug, language) : [];

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  useEffect(() => {
    const onResize = () => setTocOpen(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);




  const related = useMemo(
    () =>
      article
        ? allArticles
            .filter((a) => a.category === article.category && slugFromPdf(a.pdfUrl) !== slug)
            .slice(0, 3)
        : [],
    [article, slug]
  );

  if (!article || !blocks.length) return <Navigate to="/blog" replace />;

  const title = translatedTitle(slug, language, article.title);
  const displayDate = formatDate(article.date, language, t);

  const rendered = useMemo(() => {
    const r = blocks.slice();
    if (r[0] && r[0].text.length < 40 && !r[0].text.includes(".")) {
      r.shift();
    }
    return r;
  }, [blocks]);

  const words = rendered.reduce((n, b) => n + b.text.split(/\s+/).length, 0);
  const readingMinutes = Math.max(1, Math.round(words / 200));

  const toc = useMemo(
    () =>
      rendered
        .map((b, i) => ({ text: b.text, id: slugifyHeading(b.text, i) }))
        .filter((_, i) => isHeading(rendered[i].text) && !isSignature(rendered[i].text)),
    [rendered]
  );

  useEffect(() => {
    const list = tocListRef.current;
    if (!list) return;
    const update = () => {
      setTocHasMore(list.scrollTop + list.clientHeight < list.scrollHeight - 4);
    };
    update();
    list.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(list);
    return () => {
      list.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [toc]);

  // --- Auto-generated meta title & description -------------------------------
  const clean = (s: string) =>
    s.replace(/\s+/g, " ").replace(/\s*\|\s*/g, " - ").trim();

  const truncate = (s: string, max: number) => {
    const v = clean(s);
    if (v.length <= max) return v;
    const cut = v.slice(0, max);
    const at = Math.max(cut.lastIndexOf(" "), cut.lastIndexOf(","), cut.lastIndexOf("."));
    return `${cut.slice(0, at > max * 0.6 ? at : max).replace(/[.,;:\-\s]+$/, "")}…`;
  };

  const BRAND = "Küheylan Hukuk Bürosu";
  const metaTitle = (() => {
    const base = truncate(title, 60 - BRAND.length - 3);
    return `${base} | ${BRAND}`;
  })();

  const description = (() => {
    const body = rendered.find(
      (b) => !isHeading(b.text) && !isSignature(b.text) && clean(b.text).length > 90
    );
    const source =
      body?.text ||
      rendered.find((b) => !isHeading(b.text) && clean(b.text).length > 40)?.text ||
      `${title} hakkında Küheylan Hukuk Bürosu tarafından hazırlanan hukuki rehber.`;
    return truncate(source, 155);
  })();


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

  // Collect Q&A pairs from any FAQ section for FAQPage structured data
  const faqItems: { q: string; a: string }[] = [];
  for (let i = 0; i < rendered.length; i++) {
    if (!isHeading(rendered[i].text) || !isFaqHeading(rendered[i].text)) continue;
    let j = i + 1;
    while (j < rendered.length && !isHeading(rendered[j].text)) {
      const text = rendered[j].text;
      const qEnd = text.indexOf("?");
      if (qEnd > 0) {
        faqItems.push({ q: text.slice(0, qEnd + 1).trim(), a: text.slice(qEnd + 1).trim() });
      } else {
        faqItems.push({ q: text.slice(0, 90).trim(), a: text.slice(90).trim() });
      }
      j++;
    }
    i = j - 1;
  }
  const faqLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: language.toLowerCase(),
          mainEntity: faqItems
            .filter((item) => item.q && item.a)
            .map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
        }
      : null;
  const structuredData =
    faqLd && faqLd.mainEntity.length > 0 ? [articleLd, breadcrumbLd, faqLd] : [articleLd, breadcrumbLd];

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const downloadPdf = () => {
    const prev = document.title;
    document.title = title;
    window.print();
    setTimeout(() => {
      document.title = prev;
    }, 500);
  };

  const scrollTocDown = () => {
    const list = tocListRef.current;
    if (list) list.scrollBy({ top: list.clientHeight * 0.75, behavior: "smooth" });
  };


  let paragraphIndex = 0;

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <SEO
        title={metaTitle}
        description={description}
        path={`/blog/${slug}`}
        type="article"
        publishedTime={article.date}
        locale={language.toLowerCase() === "tr" ? "tr_TR" : language.toLowerCase()}
        jsonLd={structuredData}
      />

      <Navbar />

      {/* Reading progress */}
      <div className="no-print fixed top-0 left-0 right-0 z-40 h-0.5 bg-transparent" aria-hidden="true">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="pb-24">
        {/* Header */}
        <header className="print-header relative overflow-hidden border-b border-border bg-secondary/40 pt-28 lg:pt-36 pb-12">
          <div className="absolute inset-0 opacity-[0.35] page-header-lines" aria-hidden="true" />
          <div className="container relative mx-auto px-4 lg:px-8 max-w-3xl">
            <nav className="no-print flex items-center gap-2 text-xs text-muted-foreground mb-6" aria-label="breadcrumb">
              <Link to="/" className="hover:text-primary transition-colors">
                {t("blog.back_home")}
              </Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-primary transition-colors">
                {t("nav.makaleler")}
              </Link>
            </nav>

            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary">
              {t(`pa.${article.category}`)}
            </span>

            <div className="relative mt-6">
              <span className="absolute -left-4 md:-left-5 top-1.5 bottom-1.5 w-1.5 bg-primary rounded-full hidden sm:block" aria-hidden="true" />
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-serif text-3xl md:text-4xl lg:text-[2.85rem] text-foreground font-bold leading-[1.12]"
              >
                {title}
              </motion.h1>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {displayDate}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                {readingMinutes} {t("article.reading_time")}
              </span>
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Link2 className="w-3.5 h-3.5" />
                {copied ? t("article.copied") : t("article.share")}
              </button>
              <button
                type="button"
                onClick={downloadPdf}
                className="no-print inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                {t("article.download_pdf")}
              </button>
            </div>
          </div>
        </header>

        <div className="print-container container mx-auto px-4 lg:px-8 max-w-6xl mt-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="min-w-0">
              <article className="print-article space-y-6 text-foreground/90 leading-relaxed">
                {(() => {
                  const nodes: JSX.Element[] = [];
                  let i = 0;
                  let headingNo = 0;
                  while (i < rendered.length) {
                    const b = rendered[i];
                    if (isHeading(b.text) && !isSignature(b.text)) {
                      headingNo += 1;
                      nodes.push(
                      <motion.h2
                        key={`h-${i}`}
                        id={slugifyHeading(b.text, i)}
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="scroll-mt-28 group relative pt-12 first:pt-2 text-left"
                      >
                        <span className="flex items-center gap-3" aria-hidden="true">
                          <span className="h-px w-6 bg-primary" />
                          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
                            {String(headingNo).padStart(2, "0")}
                          </span>
                        </span>
                        <span className="mt-2.5 block font-serif text-2xl md:text-[2.125rem] font-bold text-foreground leading-[1.15] tracking-[-0.01em] break-words text-balance">
                          {b.text}
                        </span>
                        <span
                          className="mt-4 block h-px w-full bg-border group-hover:bg-primary/40 transition-colors duration-300"
                          aria-hidden="true"
                        />

                      </motion.h2>

                      );

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
                            <Accordion
                              key={`faq-${i}`}
                              type="single"
                              collapsible
                              className="mt-4 rounded border border-border bg-card px-4"
                            >
                              {items.map((item, k) => (
                                <AccordionItem key={k} value={`faq-${i}-${k}`} className="last:border-0">
                                  <AccordionTrigger className="text-left text-base font-medium hover:text-primary">
                                    {item.q}
                                  </AccordionTrigger>
                                  <AccordionContent className="text-base text-justify text-foreground/85 leading-relaxed">
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

                    if (isSignature(b.text)) {
                      nodes.push(
                        <aside
                          key={`sig-${i}`}
                          className="mt-12 rounded border-l-2 border-primary bg-secondary/50 p-6 text-sm text-muted-foreground whitespace-pre-line"
                        >
                          {b.text}
                        </aside>
                      );
                      i++;
                      continue;
                    }

                    paragraphIndex++;
                    const isLede = paragraphIndex === 1;
                    nodes.push(
                      <p
                        key={`p-${i}`}
                        className={
                          isLede
                            ? "text-lg md:text-xl leading-relaxed text-foreground font-light text-justify whitespace-pre-line"
                            : "text-base md:text-[1.0625rem] leading-[1.85] text-justify whitespace-pre-line"
                        }
                      >
                        {b.text}
                      </p>
                    );
                    i++;
                  }
                  return nodes;
                })()}
              </article>

              <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <Link
                  to="/blog"
                  className="no-print inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("blog.back_to_list")}
                </Link>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={share}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    {copied ? t("article.copied") : t("article.share")}
                  </button>
                  <button
                    type="button"
                    onClick={downloadPdf}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-2 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t("article.download_pdf")}
                  </button>
                </div>
              </div>

              {related.length > 0 && (
                <section className="no-print mt-16">
                  <h2 className="font-serif text-xl md:text-2xl text-foreground font-semibold mb-6">
                    {t("article.related")}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((a) => {
                      const s = slugFromPdf(a.pdfUrl);
                      return (
                        <Link
                          key={s}
                          to={`/blog/${s}`}
                          className="group flex flex-col rounded border border-border bg-card p-5 hover:border-primary hover:-translate-y-1 transition-all duration-300"
                        >
                          <span className="text-xs text-muted-foreground mb-3">
                            {formatDate(a.date, language, t)}
                          </span>
                          <span className="font-serif text-base text-foreground font-medium leading-snug flex-1">
                            {translatedTitle(s, language, a.title)}
                          </span>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-primary text-sm group-hover:gap-3 transition-all">
                            {t("blog.read_more")}
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Table of contents */}
            {toc.length > 1 && (
              <aside className="no-print order-first lg:order-last min-w-0">
                <nav className="lg:sticky lg:top-28 border border-border rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                  <details className="group" open={tocOpen} onToggle={(e) => setTocOpen(e.currentTarget.open)}>
                    <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors">
                      <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        <List className="w-3.5 h-3.5 text-primary" />
                        {t("article.toc")}
                      </span>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground group-open:rotate-180 transition-transform duration-300">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </span>
                    </summary>
                    <div className="relative">
                      <ul
                        ref={tocListRef}
                        className="space-y-3 max-h-[55vh] overflow-y-auto px-5 pb-5 border-t border-border"
                      >
                        {toc.map((item) => (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              className="block text-sm leading-snug text-muted-foreground hover:text-primary transition-colors"
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                      {tocHasMore && (
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center bg-gradient-to-t from-card via-card/80 to-transparent pb-2">
                          <button
                            type="button"
                            onClick={scrollTocDown}
                            className="pointer-events-auto inline-flex items-center rounded-full bg-primary text-white p-1.5 shadow-md hover:bg-primary/90 transition-colors"
                            aria-label="Daha fazla başlık"
                            title="Daha fazla başlık"
                          >
                            <TocChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                  </details>
                </nav>
              </aside>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;

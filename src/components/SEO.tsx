import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Robots directive. Defaults to indexable with rich snippet allowances. */
  robots?: string;
  /** ISO date for article publication (adds article:published_time). */
  publishedTime?: string;
  /** og:locale value, e.g. tr_TR */
  locale?: string;
}

const BASE = "https://kuheylanhukuk.com";

const SEO = ({
  title,
  description,
  path,
  type = "website",
  jsonLd,
  robots = "index, follow, max-image-preview:large, max-snippet:-1",
  publishedTime,
  locale,
}: SEOProps) => {
  const url = `${BASE}${path}`;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content="Küheylan Hukuk Bürosu" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {locale && <meta property="og:locale" content={locale} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ldArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

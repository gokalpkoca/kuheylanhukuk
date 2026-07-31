import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEO
        title="Sayfa Bulunamadı | Küheylan Hukuk Bürosu"
        description="Aradığınız sayfa bulunamadı veya taşınmış olabilir. Küheylan Hukuk Bürosu ana sayfasına dönerek faaliyet alanlarımıza ve bilgi havuzuna ulaşabilirsiniz."
        path={location.pathname}
      />
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          Aradığınız sayfa bulunamadı.
        </p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Ana sayfaya dön
        </a>
      </div>
    </div>
  );
};

export default NotFound;

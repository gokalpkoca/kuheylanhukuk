import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const COOKIE_KEY = "cookie_consent_accepted";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-[100] bg-card border border-border rounded-lg shadow-2xl shadow-black/30 p-6"
        >
          <button
            onClick={accept}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>

          <h3 className="font-serif text-base font-semibold text-foreground mb-3">
            {t("cookie.title")}
          </h3>

          <p className="text-xs text-muted-foreground leading-relaxed mb-1">
            {t("cookie.description")}
          </p>
          <a
            href="/aydinlatma-metni"
            className="text-xs text-primary hover:underline"
          >
            {t("cookie.learn_more")}
          </a>

          <div className="flex gap-3 mt-4">
            <button
              onClick={accept}
              className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90 transition-opacity"
            >
              {t("cookie.accept")}
            </button>
            <button
              onClick={accept}
              className="px-6 py-2 border border-border text-muted-foreground text-sm font-medium rounded hover:border-primary hover:text-primary transition-colors"
            >
              {t("cookie.reject")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import loadingLogo from "@/assets/loading-logo.png";

let hasShownOnce = false;

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(!hasShownOnce);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    if (hasShownOnce) return;
    hasShownOnce = true;
    const timer = setTimeout(() => setIsLoading(false), 1600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key={location.pathname}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.img
            src={loadingLogo}
            alt="Küheylan Hukuk"
            width={320}
            height={400}
            className="w-32 h-40 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.p
            className="mt-6 font-serif-heading text-xl tracking-widest text-foreground dark:text-[#413432]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
          >
            {t("loading.title")}
          </motion.p>
          <motion.div
            className="mt-8 h-0.5 bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

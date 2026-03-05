import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import loadingLogo from "@/assets/loading-logo.png";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key={location.pathname}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.img
            src={loadingLogo}
            alt="Küheylan Hukuk"
            className="w-32 h-32 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.p
            className="mt-6 font-serif-heading text-xl tracking-widest text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            KÜHEYLAN HUKUK
          </motion.p>
          <motion.div
            className="mt-8 h-0.5 bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

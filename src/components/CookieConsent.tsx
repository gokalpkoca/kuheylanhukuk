import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const COOKIE_KEY = "cookie_consent_accepted";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

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
            Çerez Politikası
          </h3>

          <div className="text-xs text-muted-foreground leading-relaxed space-y-2 max-h-48 overflow-y-auto pr-2">
            <p>
              Use the classic 1990s anime production pipeline: hand-painted background art (背景美術), cel-layered compositing (セル合成), analog cel shading with a limited muted palette (リミテッドアニメ), thin hand-inked lineart (線撮), optical film grain from scanned animation cels, slight multi-plane depth (多層合成), soft atmospheric haze used by studios like Madhouse and Sunrise.
            </p>
            <p>
              Retain all original reflections, shadows, and lighting direction exactly as they are. Convert natural highlights (including water reflections, metallic shine, glass glare, etc.) into 1990s-style specular cel highlights.
            </p>
            <p>
              Color grading: Use low-saturation, muted late-afternoon tones with grounded realism — no modern digital vibrancy. Match the palettes of Perfect Blue, Cowboy Bebop, early Madhouse works, and 90s Sunrise realism.
            </p>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={accept}
              className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90 transition-opacity"
            >
              Kabul Et
            </button>
            <button
              onClick={accept}
              className="px-6 py-2 border border-border text-muted-foreground text-sm font-medium rounded hover:border-primary hover:text-primary transition-colors"
            >
              Reddet
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

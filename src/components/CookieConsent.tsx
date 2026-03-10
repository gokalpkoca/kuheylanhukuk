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

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
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
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-[100] bg-card border border-border rounded-lg shadow-2xl shadow-black/30 p-6"
        >
          <button
            onClick={accept}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>

          <h3 className="font-serif text-base font-semibold text-foreground mb-3">
            KİŞİSEL VERİLERİN İŞLENMESİ VE ÇEREZ POLİTİKASINA İLİŞKİN AYDINLATMA METNİ
          </h3>

          <div className="text-xs text-muted-foreground leading-relaxed space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
            <p>
              Küheylan Hukuk Bürosu ("Büro") tarafından işletilen web sitesinde kullanılan çerezlere ve bu yolla işlenen kişisel verilere ilişkin bu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca veri sahiplerini bilgilendirmek amacıyla hazırlanmıştır.
            </p>
            <p>
              <strong className="text-foreground">Veri Sorumlusu:</strong> İstanbul Barosu'na kayıtlı, Burhaniye, Neşet Bey Sk. NO:12 Kat:3 D:5, 34676 Üsküdar/İstanbul adresinde mukim Küheylan Hukuk Bürosu (Vergi No: 6050532173).
            </p>
            <p>
              <strong className="text-foreground">Çerezler:</strong> Sitenin temel fonksiyonlarının yerine getirilmesi, performans analizi, kullanıcı tercihlerinin hatırlanması ve hukuki güvenliğin sağlanması amacıyla kullanılmaktadır.
            </p>
            <p>
              <strong className="text-foreground">İşlenen Veriler:</strong> IP adresi, tarayıcı bilgileri, giriş-çıkış kayıtları, dil seçimi ve site içi gezinme hareketleri.
            </p>
            <p>
              <strong className="text-foreground">Haklarınız (KVKK Md. 11):</strong> Kişisel verilerinizin işlenip işlenmediğini öğrenme, düzeltme, silme ve itiraz etme haklarına sahipsiniz.
            </p>
            <p>
              Detaylı bilgi için{" "}
              <a href="/aydinlatma-metni" className="text-primary hover:underline">
                Aydınlatma Metninin tamamını okuyunuz
              </a>.
            </p>
          </div>

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

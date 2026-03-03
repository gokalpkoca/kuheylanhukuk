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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[99]"
            onClick={accept}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full z-[100] bg-card border border-border rounded-lg shadow-2xl shadow-black/40 p-6 md:p-8 flex flex-col max-h-[90vh]"
          >
            <button
              onClick={accept}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-sm md:text-base font-semibold text-foreground mb-4 pr-8">
              KİŞİSEL VERİLERİN İŞLENMESİ VE ÇEREZ POLİTİKASINA İLİŞKİN AYDINLATMA METNİ
            </h3>

            <div className="text-xs text-muted-foreground leading-relaxed space-y-4 overflow-y-auto flex-1 pr-2">
              <p>
                Küheylan Hukuk Bürosu (bundan böyle "Büro" olarak anılacaktır) tarafından işletilen web sitesinde kullanılan çerezlere ve bu yolla işlenen kişisel verilere ilişkin bu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca veri sahiplerini bilgilendirmek amacıyla hazırlanmıştır.
              </p>

              <div>
                <h4 className="text-foreground font-semibold mb-1">1. VERİ SORUMLUSUNUN KİMLİĞİ</h4>
                <p>Veri Sorumlusu, İstanbul Barosu'na kayıtlı olarak faaliyet gösteren, Burhaniye, Neşet Bey Sk. NO:12 Kat:3 D:5, 34676 Üsküdar/İstanbul adresinde mukim Küheylan Hukuk Bürosu'dur (Vergi No: 6050532173).</p>
              </div>

              <div>
                <h4 className="text-foreground font-semibold mb-1">2. BU BİLDİRİM NEDEN GÖNDERİLİYOR?</h4>
                <p>KVKK kapsamında Büro, web sitesi ziyaretçilerine (veri sahiplerine) kendileri hakkında toplanan verilerin mahiyeti, işlenme amacı ve hakları konusunda bilgi vermekle yükümlüdür. Bu metin, şeffaflık ilkemiz gereği çerez kullanım detaylarını içerir.</p>
              </div>

              <div>
                <h4 className="text-foreground font-semibold mb-1">3. ÇEREZLER VE KULLANIM AMAÇLARI</h4>
                <p className="mb-2">Çerezler, web sitesinin verimli çalışması ve kullanıcı deneyiminin iyileştirilmesi için cihazınıza depolanan küçük metin dosyalarıdır. Sitemizde şu amaçlarla çerez kullanılmaktadır:</p>
                <ul className="list-disc list-inside space-y-1 mb-2">
                  <li>Sitenin temel fonksiyonlarının (oturum yönetimi, güvenlik) yerine getirilmesi.</li>
                  <li>Sitenin performansının analiz edilmesi ve kullanıcı tercihlerinin hatırlanması.</li>
                  <li>Hukuki ve ticari güvenliğin sağlanması.</li>
                </ul>
                <p className="font-semibold text-foreground mb-1">Çerez Türleri</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong className="text-foreground">Zorunlu Çerezler:</strong> Sitenin çalışması için teknik olarak gerekli olan, rıza gerektirmeyen çerezlerdir.</li>
                  <li><strong className="text-foreground">İşlevsel ve Analitik Çerezler:</strong> Dil tercihi gibi ayarlarınızı hatırlayan veya ziyaret istatistiklerini anonim olarak tutan çerezlerdir (Açık rızanıza tabidir).</li>
                  <li><strong className="text-foreground">Reklam/Pazarlama Çerezleri:</strong> İlgi alanlarınıza göre içerik sunan üçüncü taraf çerezleridir (Açık rızanıza tabidir).</li>
                </ul>
              </div>

              <div>
                <h4 className="text-foreground font-semibold mb-1">4. İŞLENEN KİŞİSEL VERİLER</h4>
                <p className="mb-1">Web sitemizi ziyaretinizde şu verileriniz işlenebilir:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong className="text-foreground">İşlem Güvenliği Verileri:</strong> IP adresi, tarayıcı bilgileri, internet sitesi giriş-çıkış kayıtları, erişim günlükleri.</li>
                  <li><strong className="text-foreground">Kullanıcı Tercihleri:</strong> Dil seçimi, site içi gezinme hareketleri, doldurulan formlardaki (varsa) tercihler.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-foreground font-semibold mb-1">5. KİŞİSEL VERİLERİN PAYLAŞIMI</h4>
                <p>Kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen şartlar çerçevesinde; yargısal denetimler, hukuki uyuşmazlıklar veya yasal zorunluluklar gereği Mahkemeler, Savcılıklar, İcra Müdürlükleri ve diğer yetkili kamu kurum ve kuruluşları ile paylaşılabilir. Ticari amaçla üçüncü taraflara veri satışı yapılmamaktadır.</p>
              </div>

              <div>
                <h4 className="text-foreground font-semibold mb-1">6. VERİ TOPLAMA YÖNTEMİ VE HUKUKİ SEBEBİ</h4>
                <p className="mb-1">Verileriniz, web sitesine giriş yaptığınızda cihazınız aracılığıyla otomatik yollarla toplanmaktadır.</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong className="text-foreground">Zorunlu Çerezler:</strong> "Veri sorumlusunun meşru menfaatleri" ve "sözleşmenin ifası" hukuki sebebine dayanır.</li>
                  <li><strong className="text-foreground">Diğer Çerezler:</strong> KVKK madde 5/1 uyarınca "Açık Rızanıza" dayanır.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-foreground font-semibold mb-1">7. VERİ SAHİBİNİN HAKLARI (KVKK MADDE 11)</h4>
                <p className="mb-1">Büromuza başvurarak şu haklarınızı kullanabilirsiniz:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme.</li>
                  <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme.</li>
                  <li>İşlenme amacına uygun kullanılıp kullanılmadığını öğrenme.</li>
                  <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme.</li>
                  <li>KVKK şartları çerçevesinde verilerin silinmesini veya yok edilmesini isteme.</li>
                  <li>Verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-foreground font-semibold mb-1">8. İLETİŞİM VE BAŞVURU</h4>
                <p className="mb-2">Yukarıdaki haklarınız kapsamında başvurularınızı; yazılı olarak yukarıda belirtilen fiziksel adresimize elden/posta yoluyla veya info@kuheylanhukuk.com adresine e-posta göndererek iletebilirsiniz.</p>
                <p className="font-semibold text-foreground mb-1">Veri Sorumlusu Bilgileri:</p>
                <ul className="space-y-0.5">
                  <li><strong className="text-foreground">Ünvan:</strong> Küheylan Hukuk Bürosu</li>
                  <li><strong className="text-foreground">Adres:</strong> Burhaniye, Neşet Bey Sk. NO:12 Kat:3 D:5, 34676 Üsküdar/İstanbul</li>
                  <li><strong className="text-foreground">Telefon:</strong> +90 535 227 96 96</li>
                  <li><strong className="text-foreground">E-posta:</strong> info@kuheylanhukuk.com</li>
                  <li><strong className="text-foreground">Vergi No:</strong> 6050532173</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 mt-5 pt-4 border-t border-border">
              <button
                onClick={accept}
                className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90 transition-opacity"
              >
                {t("cookie.accept")}
              </button>
              <button
                onClick={accept}
                className="px-6 py-2.5 border border-border text-muted-foreground text-sm font-medium rounded hover:border-primary hover:text-primary transition-colors"
              >
                {t("cookie.reject")}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

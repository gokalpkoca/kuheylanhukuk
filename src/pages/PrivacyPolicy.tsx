import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Aydınlatma Metni | Küheylan Hukuk Bürosu"
        description="6698 sayılı KVKK kapsamında kişisel verilerin işlenmesi, saklanması ve haklarınıza ilişkin aydınlatma metni ile çerez politikamızın tam metni."
        path="/aydinlatma-metni"
      />
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Ana Sayfa
            </Link>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-10 leading-tight">
              KİŞİSEL VERİLERİN İŞLENMESİ VE ÇEREZ POLİTİKASINA İLİŞKİN AYDINLATMA METNİ
            </h1>

            <div className="prose prose-invert prose-sm max-w-none space-y-8 text-muted-foreground leading-relaxed">
              <p>
                Küheylan Hukuk Bürosu (bundan böyle "Büro" olarak anılacaktır) tarafından işletilen web sitesinde kullanılan çerezlere ve bu yolla işlenen kişisel verilere ilişkin bu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca veri sahiplerini bilgilendirmek amacıyla hazırlanmıştır.
              </p>

              <div>
                <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
                  1. VERİ SORUMLUSUNUN KİMLİĞİ
                </h2>
                <p>
                  Veri Sorumlusu, İstanbul Barosu'na kayıtlı olarak faaliyet gösteren, Burhaniye, Neşet Bey Sk. NO:12 Kat:3 D:5, 34676 Üsküdar/İstanbul adresinde mukim Küheylan Hukuk Bürosu'dur (Vergi No: 6050532173).
                </p>
              </div>

              <div>
                <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
                  2. BU BİLDİRİM NEDEN GÖNDERİLİYOR?
                </h2>
                <p>
                  KVKK kapsamında Büro, web sitesi ziyaretçilerine (veri sahiplerine) kendileri hakkında toplanan verilerin mahiyeti, işlenme amacı ve hakları konusunda bilgi vermekle yükümlüdür. Bu metin, şeffaflık ilkemiz gereği çerez kullanım detaylarını içerir.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
                  3. ÇEREZLER VE KULLANIM AMAÇLARI
                </h2>
                <p>
                  Çerezler, web sitesinin verimli çalışması ve kullanıcı deneyiminin iyileştirilmesi için cihazınıza depolanan küçük metin dosyalarıdır. Sitemizde şu amaçlarla çerez kullanılmaktadır:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li>Sitenin temel fonksiyonlarının (oturum yönetimi, güvenlik) yerine getirilmesi.</li>
                  <li>Sitenin performansının analiz edilmesi ve kullanıcı tercihlerinin hatırlanması.</li>
                  <li>Hukuki ve ticari güvenliğin sağlanması.</li>
                </ul>

                <h3 className="font-serif text-base font-semibold text-foreground mt-6 mb-2">
                  Çerez Türleri
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong className="text-foreground">Zorunlu Çerezler:</strong> Sitenin çalışması için teknik olarak gerekli olan, rıza gerektirmeyen çerezlerdir.</li>
                  <li><strong className="text-foreground">İşlevsel ve Analitik Çerezler:</strong> Dil tercihi gibi ayarlarınızı hatırlayan veya ziyaret istatistiklerini anonim olarak tutan çerezlerdir (Açık rızanıza tabidir).</li>
                  <li><strong className="text-foreground">Reklam/Pazarlama Çerezleri:</strong> İlgi alanlarınıza göre içerik sunan üçüncü taraf çerezleridir (Açık rızanıza tabidir).</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
                  4. İŞLENEN KİŞİSEL VERİLER
                </h2>
                <p>Web sitemizi ziyaretinizde şu verileriniz işlenebilir:</p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li><strong className="text-foreground">İşlem Güvenliği Verileri:</strong> IP adresi, tarayıcı bilgileri, internet sitesi giriş-çıkış kayıtları, erişim günlükleri.</li>
                  <li><strong className="text-foreground">Kullanıcı Tercihleri:</strong> Dil seçimi, site içi gezinme hareketleri, doldurulan formlardaki (varsa) tercihler.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
                  5. KİŞİSEL VERİLERİN PAYLAŞIMI
                </h2>
                <p>
                  Kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen şartlar çerçevesinde; yargısal denetimler, hukuki uyuşmazlıklar veya yasal zorunluluklar gereği Mahkemeler, Savcılıklar, İcra Müdürlükleri ve diğer yetkili kamu kurum ve kuruluşları ile paylaşılabilir. Ticari amaçla üçüncü taraflara veri satışı yapılmamaktadır.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
                  6. VERİ TOPLAMA YÖNTEMİ VE HUKUKİ SEBEBİ
                </h2>
                <p>Verileriniz, web sitesine giriş yaptığınızda cihazınız aracılığıyla otomatik yollarla toplanmaktadır.</p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li><strong className="text-foreground">Zorunlu Çerezler:</strong> "Veri sorumlusunun meşru menfaatleri" ve "sözleşmenin ifası" hukuki sebebine dayanır.</li>
                  <li><strong className="text-foreground">Diğer Çerezler:</strong> KVKK madde 5/1 uyarınca "Açık Rızanıza" dayanır.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
                  7. VERİ SAHİBİNİN HAKLARI (KVKK MADDE 11)
                </h2>
                <p>Büromuza başvurarak şu haklarınızı kullanabilirsiniz:</p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme.</li>
                  <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme.</li>
                  <li>İşlenme amacına uygun kullanılıp kullanılmadığını öğrenme.</li>
                  <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme.</li>
                  <li>KVKK şartları çerçevesinde verilerin silinmesini veya yok edilmesini isteme.</li>
                  <li>Verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
                  8. İLETİŞİM VE BAŞVURU
                </h2>
                <p>
                  Yukarıdaki haklarınız kapsamında başvurularınızı; yazılı olarak yukarıda belirtilen fiziksel adresimize elden/posta yoluyla veya{" "}
                  <a href="mailto:info@kuheylanhukuk.com" className="text-primary hover:underline">
                    info@kuheylanhukuk.com
                  </a>{" "}
                  adresine e-posta göndererek iletebilirsiniz.
                </p>

                <div className="mt-6 p-6 bg-card border border-border rounded-xl space-y-2">
                  <h3 className="font-serif text-base font-semibold text-foreground mb-3">
                    Veri Sorumlusu Bilgileri
                  </h3>
                  <p><strong className="text-foreground">Ünvan:</strong> Küheylan Hukuk Bürosu</p>
                  <p><strong className="text-foreground">Adres:</strong> Burhaniye, Neşet Bey Sk. NO:12 Kat:3 D:5, 34676 Üsküdar/İstanbul</p>
                  <p><strong className="text-foreground">Telefon:</strong>{" "}
                    <a href="tel:+905352279696" className="text-primary hover:underline">+90 535 227 96 96</a>
                  </p>
                  <p><strong className="text-foreground">E-posta:</strong>{" "}
                    <a href="mailto:info@kuheylanhukuk.com" className="text-primary hover:underline">info@kuheylanhukuk.com</a>
                  </p>
                  <p><strong className="text-foreground">Vergi No:</strong> 6050532173</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

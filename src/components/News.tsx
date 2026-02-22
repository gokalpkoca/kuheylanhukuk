import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const allArticles = [
  { title: "Halka Arz Yol Haritası: SPK Mevzuatı Kapsamında Uyum Süreci", date: "16 Şubat 2026", dept: "Sermaye Piyasası Hukuku Departmanı" },
  { title: "TTK Çerçevesinde Acentelik ve Distribütörlük", date: "09 Şubat 2026", dept: "Şirketler Hukuku Departmanı" },
  { title: "Kira Sertifikaları ve Varlık Kiralama Şirketleri Çerçevesinde Türk Hukukunda Faizsiz Finansman Yapısı", date: "02 Şubat 2026", dept: "Sermaye Piyasası Hukuku Departmanı" },
  { title: "Limited Şirket Pay Devri Süreci ve Şartları", date: "26 Ocak 2026", dept: "Şirketler Hukuku Departmanı" },
  { title: "Sermaye Şirketlerinde Bölünme: Tam ve Kısmi Bölünme", date: "20 Ocak 2026", dept: "Şirketler Hukuku Departmanı" },
  { title: "Kripto Varlık Hizmet Sağlayıcılarının Kuruluş ve Faaliyet Esasları", date: "05 Ocak 2026", dept: "Sermaye Piyasası Hukuku Departmanı" },
  { title: "Portföy Yönetim Şirketlerinin Kuruluşu, Faaliyet Alanları ve Düzenleyici Rejimi", date: "26 Aralık 2025", dept: "Sermaye Piyasası Hukuku Departmanı" },
  { title: "Yönetim Kurulu Sorumluluk Serisi-3: Yönetim Kurulu Üyelerinin Cezai Sorumluluğu", date: "23 Aralık 2025", dept: "Şirketler Hukuku Departmanı" },
  { title: "Pay Sahipleri Sözleşmelerinin Hukukî Niteliği, Esas Sözleşme ile İlişkisi ve Üçüncü Kişilere Etkisi", date: "15 Aralık 2025", dept: "Şirketler Hukuku Departmanı" },
  { title: "Halka Açık Ortaklıklarda Pay Devri Rejimi", date: "04 Aralık 2025", dept: "Sermaye Piyasası Hukuku Departmanı" },
  { title: "Zorunlu Pay Alım Teklifi: Yönetim Kontrolü Değişikliklerinde Yatırımcı Koruma Mekanizması", date: "01 Aralık 2025", dept: "Sermaye Piyasası Hukuku Departmanı" },
  { title: "Yönetim Kurulu Üyeleri Sorumluluk Serisi – 2: İbra Kurumu", date: "21 Kasım 2025", dept: "Şirketler Hukuku Departmanı" },
  { title: "TTK Anlamında Birleşme: Kavram, Usul ve Uygulamada Kırılma Noktaları", date: "31 Ekim 2025", dept: "Şirketler Hukuku Departmanı" },
  { title: "Türk Madencilik Hukukunda Ruhsat ve İzin Rejiminin Esasları", date: "30 Ekim 2025", dept: "Hukuk Departmanı" },
  { title: "Halka Açık Ortaklıklarda İlişkili Taraf İşlemleri ve Örtülü Kazanç Aktarımına Karşı Hukuki Çerçeve", date: "17 Ekim 2025", dept: "Sermaye Piyasası Hukuku Departmanı" },
  { title: "Kaydileştirilmiş Sermaye Piyasası Araçları Üzerinde Rehin Hakkı ve Paraya Çevrilmesi", date: "14 Ekim 2025", dept: "Sermaye Piyasası Hukuku Departmanı" },
  { title: "Yönetim Kurulu Üyeleri Sorumluluk Serisi-1: TTK Çerçevesinde Kurumsal Yönetim Perspektifi", date: "10 Ekim 2025", dept: "Şirketler Hukuku Departmanı" },
  { title: "Aracı Kurumların Kuruluş ve Faaliyet Esasları", date: "12 Eylül 2025", dept: "Sermaye Piyasası Hukuku Departmanı" },
  { title: "Fikri ve Sınai Haklarda Hükümsüzlük: Kavram, Sebepler ve Sonuçlar", date: "23 Eylül 2025", dept: "Fikri Mülkiyet Hukuku Departmanı" },
  { title: "Spor Anonim Şirketlerinde İşlem Yasakları: Mali Disiplinin Hukuki Çerçevesi", date: "20 Ağustos 2025", dept: "Spor Hukuku Departmanı" },
  { title: "Şirket Devralamalarında Gizli Riskleri Ortaya Çıkarmak: Due Diligence'ın Önemi", date: "20 Ağustos 2025", dept: "M&A Departmanı" },
  { title: "Tahvil İhracı Süreci: Hukuki Çerçeve ve Uygulama Esasları", date: "20 Ağustos 2025", dept: "Sermaye Piyasası Hukuku Departmanı" },
  { title: "Türkiye'de Gayrimenkul Yatırım Fonlarının Evrimi", date: "20 Ağustos 2025", dept: "Sermaye Piyasası Hukuku Departmanı" },
];

const News = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? allArticles : allArticles.slice(0, 6);

  return (
    <section id="haberler" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
            Güncel Bilgilerden Haberdar Olun
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            Bilgi Havuzu & Haberler
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.08 }}
              className="border border-border rounded bg-card p-6 hover:border-gold hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>{article.date}</span>
              </div>
              <h3 className="font-serif text-base text-foreground font-medium leading-snug mb-3 flex-1">
                {article.title}
              </h3>
              <p className="text-xs text-gold/80 mb-4">{article.dept}</p>
              <button className="inline-flex items-center gap-1.5 text-gold text-sm font-medium hover:gap-3 transition-all duration-200 self-start">
                Devamını Oku
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.article>
          ))}
        </div>

        {!showAll && allArticles.length > 6 && (
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-block px-8 py-3 border border-gold text-gold uppercase text-sm tracking-[0.15em] font-medium hover:bg-gold hover:text-primary-foreground transition-all duration-300"
            >
              Tümünü Gör
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;

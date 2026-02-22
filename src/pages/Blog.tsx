import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

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

const ITEMS_PER_PAGE = 9;
const departments = ["Tümü", ...Array.from(new Set(allArticles.map((a) => a.dept)))];

const Blog = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const initialDept = searchParams.get("dept") || "Tümü";
  const [selectedDept, setSelectedDept] = useState(initialDept);

  useEffect(() => {
    const dept = searchParams.get("dept") || "Tümü";
    setSelectedDept(dept);
    setCurrentPage(1);
  }, [searchParams]);

  const filtered = selectedDept === "Tümü" ? allArticles : allArticles.filter((a) => a.dept === selectedDept);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDeptChange = (dept: string) => {
    setSelectedDept(dept);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Ana Sayfa
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
              Bilgi Havuzu & Makaleler
            </h1>
            <div className="w-16 h-px bg-primary mt-6" />
          </motion.div>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => handleDeptChange(dept)}
                className={`px-4 py-2 text-xs uppercase tracking-wider rounded border transition-all duration-200 ${
                  selectedDept === dept
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((article, i) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border border-border rounded bg-card p-6 hover:border-primary hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>{article.date}</span>
                </div>
                <h2 className="font-serif text-base text-foreground font-medium leading-snug mb-3 flex-1">
                  {article.title}
                </h2>
                <p className="text-xs text-primary/80 mb-4">{article.dept}</p>
                <button className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:gap-3 transition-all duration-200 self-start">
                  Devamını Oku
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">Bu kategoride makale bulunamadı.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-border rounded text-sm text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Önceki
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded text-sm transition-colors ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-border rounded text-sm text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Sonraki
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

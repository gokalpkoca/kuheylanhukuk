import {
  Scale, Gavel, Heart, Newspaper, TreePine, Landmark, Building2,
  TrendingUp, Package, Award, Trophy, Users, Briefcase, FileText, HardHat,
  ShieldCheck, LucideIcon
} from "lucide-react";

export interface PracticeArea {
  icon: LucideIcon;
  label: string;
  slug: string;
  description: string;
}

export const practiceAreas: PracticeArea[] = [
  {
    icon: Landmark,
    label: "Bankacılık & Finans",
    slug: "bankacilik-finans",
    description: "Küheylan Hukuk Bürosu, bankacılık ve finans hukuku alanında; ticari ve kurumsal kredi işlemleri, proje finansmanı, kamu kurumları ve ihracat kredi kuruluşları destekli finansmanlar, İslami finansman yapıları, satın alım finansmanları, menkul kıymet ihraçları ve yapılandırılmış finansman işlemleri dahil olmak üzere geniş bir yelpazede hukuki danışmanlık hizmeti sunmaktadır.\n\nBunun yanı sıra türev işlemler, teminatlı ve teminatsız kredi yapılandırmaları ile mevzuata uyum süreçlerine ilişkin hukuki destek sağlanmakta; işlemlerin yapılandırılması ve yürütülmesi titizlikle takip edilmektedir.\n\nEkibimiz; kredi alanlar ve kredi verenler, sponsorlar, yerli ve yabancı bankalar, kalkınma finansman kuruluşları, özel ve kurumsal yatırımcılar ile ihracat kredi kuruluşları dahil olmak üzere finans piyasasının çeşitli aktörlerini farklı ölçeklerdeki işlemlerde temsil etmiş olup, bu alanda kapsamlı deneyime sahiptir.",
  },
  {
    icon: Newspaper,
    label: "Basın Hukuku",
    slug: "basin-hukuku",
    description: "Basın ve medya kuruluşlarına yönelik yayın hukuku, kişilik hakları, cevap ve düzeltme hakkı, basın özgürlüğü sınırları ve dijital medya hukuku alanlarında uzman hukuki destek sağlanmaktadır.",
  },
  {
    icon: Gavel,
    label: "Ceza Hukuku",
    slug: "ceza-hukuku",
    description: "Ceza davalarının her aşamasında etkin savunma, soruşturma sürecinde hukuki danışmanlık, tutukluluk itirazları, temyiz başvuruları ve beyaz yaka suçları dahil tüm ceza hukuku alanlarında temsil hizmeti verilmektedir.",
  },
  {
    icon: TreePine,
    label: "Çevre Hukuku",
    slug: "cevre-hukuku",
    description: "Çevresel etki değerlendirmesi, çevre izinleri, atık yönetimi, emisyon düzenlemeleri ve çevre mevzuatına uyum konularında hukuki danışmanlık ve dava takibi hizmetleri sunulmaktadır.",
  },
  {
    icon: Package,
    label: "Gümrük Hukuku",
    slug: "gumruk-hukuku",
    description: "İthalat ve ihracat işlemlerinde gümrük mevzuatına uyum, gümrük vergisi uyuşmazlıkları, antrepo işlemleri, menşe kuralları ve serbest bölge hukuku alanlarında kapsamlı hukuki hizmet verilmektedir.",
  },
  {
    icon: FileText,
    label: "İcra & İflas Hukuku",
    slug: "icra-iflas-hukuku",
    description: "Alacak tahsili, icra takibi, iflas ve konkordato süreçleri, yeniden yapılandırma, haciz işlemleri ve borçlu-alacaklı ilişkilerinin hukuki yönetimi konularında deneyimli kadromuzla hizmet sunulmaktadır.",
  },
  {
    icon: ShieldCheck,
    label: "İdare Hukuku",
    slug: "idare-hukuku",
    description: "Küheylan Hukuk Bürosu, idare hukuku alanında idari işlemlerden kaynaklanan uyuşmazlıkların çözümü, tam yargı davalarının yürütülmesi ve hukuka aykırı idari işlemlere karşı iptal davalarının takibi hususlarında hukuki danışmanlık ve temsil hizmeti sunmaktadır.\n\nBu kapsamda kamulaştırma işlemlerine ilişkin uzlaşma süreçleri ve kamulaştırma bedelinin tespiti davaları başta olmak üzere; inşaat ve kamulaştırma mevzuatından doğan uyuşmazlıkların çözümünde etkin hukuki destek sağlanmaktadır.\n\nBüromuz ayrıca vergi hukuku alanında; vergi uyuşmazlıklarının çözümü, vergi cezalarına karşı iptal ve düzeltme başvuruları, yargı öncesi uzlaşma süreçleri ile yargılama aşamasında müvekkillerin temsil edilmesi konularında kapsamlı hizmet vermektedir.",
  },
  {
    icon: HardHat,
    label: "İş Hukuku",
    slug: "is-hukuku",
    description: "İş sözleşmeleri, işçi-işveren uyuşmazlıkları, iş güvenliği, toplu iş hukuku, işe iade davaları ve sosyal güvenlik hukuku alanlarında işveren ve çalışanlara kapsamlı hukuki danışmanlık sağlanmaktadır.",
  },
  {
    icon: Building2,
    label: "Kültür ve Tabiat Varlıkları Hukuku",
    slug: "kultur-tabiat-varliklari-hukuku",
    description: "Kültürel miras ve tabiat varlıklarının korunması, tescil süreçleri, restorasyon izinleri, sit alanı düzenlemeleri ve kültürel varlık ticareti konularında uzman hukuki danışmanlık verilmektedir.",
  },
  {
    icon: Award,
    label: "Fikri Mülkiyet Hukuku",
    slug: "fikri-mulkiyet-hukuku",
    description: "Küheylan Hukuk Bürosu, fikri ve sınai mülkiyet hukuku alanında müvekkillerinin hak ve menfaatlerini etkin biçimde korumak ve bu haklardan azami ölçüde yararlanmalarını sağlamak amacıyla kapsamlı hukuki danışmanlık hizmeti sunmaktadır. Patent, faydalı model, marka, tasarım, coğrafi işaret ve telif hakları başta olmak üzere fikri mülkiyet hukukunun tüm alanlarında profesyonel destek sağlanmaktadır.\n\nBüromuz; hakların tescili, devri, lisanslanması ve korunmasına ilişkin süreçleri yürütmekte, uluslararası marka tescili dahil olmak üzere mülkiyetin ulusal ve uluslararası düzeyde güvence altına alınmasına yönelik hukuki çözümler üretmektedir.\n\nHak ihlallerinden doğan uyuşmazlıklarda dava ve takip süreçleri titizlikle yürütülmekte; marka stratejilerinin oluşturulması, ilgili sözleşmelerin hazırlanması ve müzakere süreçlerinin yönetilmesi hususlarında bütüncül bir yaklaşım benimsenmektedir.",
  },
  {
    icon: Scale,
    label: "Medeni Hukuk",
    slug: "medeni-hukuk",
    description: "Aile hukuku, miras hukuku, eşya hukuku, borçlar hukuku ve kişiler hukuku alanlarında bireysel ve kurumsal müvekkillere kapsamlı hukuki danışmanlık ve dava takibi hizmeti verilmektedir.",
  },
  {
    icon: Heart,
    label: "Sağlık Hukuku",
    slug: "saglik-hukuku",
    description: "Tıbbi malpraktis davaları, hasta hakları, sağlık kuruluşlarının hukuki düzenlemelere uyumu, ilaç ve tıbbi cihaz hukuku alanlarında uzman hukuki danışmanlık sunulmaktadır.",
  },
  {
    icon: TrendingUp,
    label: "Sermaye Piyasası Hukuku",
    slug: "sermaye-piyasasi-hukuku",
    description: "Halka arz süreçleri, SPK düzenlemelerine uyum, yatırım fonları, portföy yönetimi, tahvil ihracı ve sermaye piyasası araçları konularında kapsamlı hukuki danışmanlık verilmektedir.",
  },
  {
    icon: Trophy,
    label: "Spor Hukuku",
    slug: "spor-hukuku",
    description: "Sporcu sözleşmeleri, transfer işlemleri, spor kulübü yönetimi, tahkim süreçleri, spor anonim şirketleri ve uluslararası spor hukuku alanlarında uzman hukuki hizmet sunulmaktadır.",
  },
  {
    icon: Users,
    label: "STK Hukuku",
    slug: "stk-hukuku",
    description: "Dernek ve vakıf kuruluşu, sivil toplum kuruluşlarının hukuki yapılandırması, tüzük hazırlanması, kamu yararı statüsü ve STK faaliyetlerinin mevzuata uygunluğu konularında danışmanlık verilmektedir.",
  },
  {
    icon: Briefcase,
    label: "Şirketler Hukuku",
    slug: "sirketler-hukuku",
    description: "Şirket kuruluşu, birleşme ve devralma, genel kurul işlemleri, yönetim kurulu sorumlulukları, pay devri, sermaye artırımı ve şirketlerin yeniden yapılandırılması konularında kapsamlı hukuki danışmanlık sunulmaktadır.",
  },
];

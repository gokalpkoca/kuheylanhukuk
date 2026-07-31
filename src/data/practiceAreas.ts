import {
  Scale, Gavel, Newspaper, Landmark, Home,
  Package, Award, Trophy, Briefcase, FileText, HardHat,
  ShieldCheck, ShoppingCart, ScrollText, Globe, LucideIcon
} from "lucide-react";

export interface PracticeArea {
  icon: LucideIcon;
  label: string;
  slug: string;
  description: string;
}

const practiceAreasUnsorted: PracticeArea[] = [
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
    description: "Küheylan Hukuk Bürosu, basın ve medya hukuku alanında müvekkillerine kapsamlı hukuki danışmanlık hizmeti sunmaktadır. Bu alan, yapımcılar, yayıncılar ve sektör çalışanları arasında ortaya çıkan uyuşmazlıkların yanı sıra basın ve medya kuruluşları ile idari merciler arasındaki anlaşmazlıkların çözümünü hedeflemektedir. Yazılı, görsel ve işitsel medya faaliyetlerine ilişkin hukuki süreçlerde de danışmanlık sağlanmaktadır.\n\nBüromuz, basın ve medya hukuku alanındaki uzman kadrosu ile sürekli değişen ve hızla gelişen sektör dinamiklerini takip ederek, medya organlarına ve bu alanda faaliyet gösteren kişi ve kurumlara etkin ve sürekli hukuki destek sunmaktadır.",
  },
  {
    icon: Gavel,
    label: "Ceza Hukuku",
    slug: "ceza-hukuku",
    description: "Küheylan Hukuk Bürosu, ceza hukuku alanında müvekkillerine kapsamlı danışmanlık ve temsil hizmeti sunmaktadır. Yakalama, arama, tutuklama gibi süreçlerde şüphelilerin haklarını koruyor ve soruşturma aşamasından yargılama ve infaza kadar tüm süreçlerde hukuki destek sağlıyoruz.\n\nSanık, yargılamanın her aşamasında avukat desteğinden yararlanabilir. Mahkemeler adli para cezası, hapis veya güvenlik tedbiri uygulayabilir; hapis cezaları ertelenebilir, hükmün açıklanması geri bırakılabilir veya adli para cezasına çevrilebilir.\n\nSoruşturma, kovuşturma ve infaz aşamalarını kapsayan ceza hukuku süreçlerinde, müvekkillerimizin haklarını güvence altına almak ve etkin temsil sağlamak temel önceliğimizdir.",
  },
  {
    icon: Home,
    label: "Gayrimenkul Hukuku",
    slug: "gayrimenkul-hukuku",
    description: "Küheylan Hukuk Bürosu, gayrimenkul hukuku alanında müvekkillerinin ihtiyaç ve yatırım hedefleri doğrultusunda kapsamlı hukuki danışmanlık hizmeti sunmaktadır. Stratejik yatırım kararlarının hukuki güvence altına alınması amacıyla süreçler bütüncül bir yaklaşımla değerlendirilmektedir.\n\nBu kapsamda taşınmazlara ilişkin yasal kayıtların incelenmesi, mülkiyet ve hukuki statünün tespiti, durum tespiti (due diligence) raporlarının hazırlanması ile sözleşme süreçlerinin yapılandırılması ve müzakerelerin yürütülmesi konularında profesyonel destek sağlanmaktadır.\n\nBüromuz, gayrimenkul hukukundaki uzmanlığını farklı sektörlerdeki deneyimiyle birleştirerek müvekkillerine etkin, hızlı ve çözüm odaklı hukuki hizmet sunmaktadır.",
  },
  {
    icon: Package,
    label: "Gümrük Hukuku",
    slug: "gumruk-hukuku",
    description: "Küheylan Hukuk Bürosu, gümrük hukuku alanında müvekkillerine kapsamlı danışmanlık ve temsil hizmeti sunmaktadır. Dış ticaret yapan kişi ve şirketlerin karşılaşabileceği hukuki riskleri önceden tespit ediyor ve olası uyuşmazlıklarda hızlı, etkili çözümler üretiyoruz.\n\nGümrük idareleriyle yaşanan sorunlar, idari para cezalarıyla sınırlı kalmayıp ceza soruşturmaları, eşya alıkoymaları ve ticari faaliyetlerin durmasına kadar varabilecek sonuçlar doğurabilir. Bu nedenle deneyimli bir gümrük avukatıyla çalışmak, hem hukuki güvence hem de ticari sürdürülebilirlik sağlar.\n\nAlanında uzman ekibimiz ve çözüm odaklı yaklaşımımız ile gümrük işlemlerinde ortaya çıkan tüm hukuki ihtilaflarda aktif rol alıyor, hem danışmanlık hem de dava süreçlerinde müvekkillerimizi etkin şekilde temsil ediyoruz.",
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
    description: "Küheylan Hukuk Bürosu, iş hukuku alanında müvekkillerine kapsamlı hukuki danışmanlık hizmeti sunmakta; işe alım sürecinden iş ilişkisinin sona ermesine kadar tüm aşamalarda süreçlerin yürürlükteki mevzuata uygun şekilde yürütülmesini sağlamaktadır.\n\nBu çerçevede iş sözleşmelerinin hazırlanması ve feshi, işten çıkarma süreçlerinin yönetimi ve işçilik alacaklarına ilişkin uyuşmazlıkların takibi konularında hukuki destek verilmektedir.\n\nAyrıca iş kazaları ve meslek hastalıklarından doğan hukuki ve cezai sorumlulukların değerlendirilmesi, işe iade davaları ile zorunlu arabuluculuk süreçlerinin yürütülmesi hususlarında da müvekkillere etkin ve çözüm odaklı temsil hizmeti sunulmaktadır.",
  },
  {
    icon: Award,
    label: "Fikri Mülkiyet Hukuku",
    slug: "fikri-mulkiyet-hukuku",
    description: "Küheylan Hukuk Bürosu, fikri ve sınai mülkiyet hukuku alanında müvekkillerinin hak ve menfaatlerini etkin biçimde korumak ve bu haklardan azami ölçüde yararlanmalarını sağlamak amacıyla kapsamlı hukuki danışmanlık hizmeti sunmaktadır. Patent, faydalı model, marka, tasarım, coğrafi işaret ve telif hakları başta olmak üzere fikri mülkiyet hukukunun tüm alanlarında profesyonel destek sağlanmaktadır.\n\nBüromuz; hakların tescili, devri, lisanslanması ve korunmasına ilişkin süreçleri yürütmekte, uluslararası marka tescili dahil olmak üzere mülkiyetin ulusal ve uluslararası düzeyde güvence altına alınmasına yönelik hukuki çözümler üretmektedir.\n\nHak ihlallerinden doğan uyuşmazlıklarda dava ve takip süreçleri titizlikle yürütülmekte; marka stratejilerinin oluşturulması, ilgili sözleşmelerin hazırlanması ve müzakere süreçlerinin yönetilmesi hususlarında bütüncül bir yaklaşım benimsenmektedir.",
  },
  {
    icon: Scale,
    label: "Aile Hukuku",
    slug: "aile-hukuku",
    description: "Aile hukuku, miras hukuku, eşya hukuku, borçlar hukuku ve kişiler hukuku alanlarında bireysel ve kurumsal müvekkillere kapsamlı hukuki danışmanlık ve dava takibi hizmeti verilmektedir.",
  },
  {
    icon: ScrollText,
    label: "Miras Hukuku",
    slug: "miras-hukuku",
    description: "Küheylan Hukuk Bürosu, miras hukuku alanında müvekkillerine kapsamlı danışmanlık ve dava takibi hizmeti sunmaktadır. Vasiyetname ve miras sözleşmelerinin hazırlanmasından, ölüme bağlı tasarrufların iptali veya tenkisine ve miras paylaşımına ilişkin davalara kadar tüm süreçlerde etkin destek sağlamaktayız.\n\nBüromuz, miras hukuku ile ilişkili konularda aile şirketlerine de özel hizmetler sunmaktadır. Bu kapsamda hem miras hem de şirket varlıklarının yönetimi ve korunması, medenî hukuk ve şirketler hukuku perspektifiyle bütüncül bir yaklaşımla ele alınmaktadır. Müvekkillerimizin haklarının güvence altına alınması ve miras süreçlerinin sağlıklı yürütülmesi temel önceliğimizdir.",
  },
  {
    icon: Trophy,
    label: "Spor Hukuku",
    slug: "spor-hukuku",
    description: "Küheylan Hukuk Bürosu, spor hukuku alanında müvekkillerine kapsamlı danışmanlık hizmeti sunmaktadır. Spor hukuku, dinamik ve sürekli değişen kurallar gerektirdiğinden uzmanlık ve mevzuat takibi zorunludur.\n\nBu alanda sağladığımız hizmetler; oyuncular, teknik direktörler ve kulüpler arasındaki ihtilafların çözümü ile kulüpler ve federasyonlar arasındaki ilişkilerin düzenlenmesini kapsamaktadır. Spor hukukundaki hatalı uygulamalar telafisi güç zararlara yol açabileceği için süreçlerin mevzuata uygun şekilde yürütülmesi büyük önem taşır.\n\nSpor kulüplerinin çok uluslu yapısı ve ulusal ile uluslararası federasyonların (FIFA, TFF) varlığı, spor hukukunu diğer hukuk dallarından daha karmaşık ve uzmanlık gerektiren bir alan haline getirmektedir.",
  },
  {
    icon: Briefcase,
    label: "Şirketler Hukuku",
    slug: "sirketler-hukuku",
    description: "Küheylan Hukuk Bürosu, şirketler hukuku alanında uzmanlaşmış ekibiyle yerli ve yabancı sermayeli şirketler, şirketler toplulukları ve holding yapılanmalarına ticaret hukuku kapsamında kapsamlı hukuki danışmanlık hizmeti sunmaktadır.\n\nBüromuz; ticaret hukuku mevzuatına ilişkin günlük hukuki görüşlerin hazırlanması, yönetim kurulu ve genel kurul karar süreçlerinin yürütülmesi, pay devri işlemleri, kurumsal yönetim uygulamaları, şirket yapılanmaları ve tasfiye süreçleri gibi konularda etkin ve çözüm odaklı destek sağlamaktadır.\n\nBu çerçevede anonim ve limited şirketler başta olmak üzere holdingler, özel izne tabi şirketler ile adi ortaklık ve iş birliği modellerinin (JV, SPV) kuruluş süreçleri yürütülmekte; hisse rehin ve hesap rehni sözleşmeleri dahil olmak üzere ilgili tüm sözleşmelerin hazırlanması, incelenmesi ve müzakere edilmesi süreçleri titizlikle yönetilmektedir.",
  },
  {
    icon: ShoppingCart,
    label: "Tüketici Hukuku",
    slug: "tuketici-hukuku",
    description: "Küheylan Hukuk Bürosu, tüketici hakları alanında bireyler ve işletmeler için kapsamlı danışmanlık hizmeti sunmaktadır. Eğitim, sağlık, konut, bankacılık ve diğer hizmet ve mal alımlarında ortaya çıkan haklar, tüketici mevzuatı çerçevesinde korunmaktadır.\n\nDeneyimli ekibimiz, tüketici hakem heyetleri ve mahkemelerde kazandığı yüzlerce dosya ile hem tüketici hem de üretici, ithalatçı ve sağlayıcı taraflar için hukuki destek sağlamaktadır. Hazırlık sürecinde söz sahibi olunmayan sözleşmelerdeki haksız şartların iptali, kanuna aykırı tahsilatlar, bankaların haksız işlemleri, rekabet ihlallerinden kaynaklanan zararlar ve konut teslim sorunları gibi tüm tüketici işlemleri titizlikle takip edilmektedir.",
  },
  {
    icon: Globe,
    label: "Yabancılar ve Vatandaşlık Hukuku",
    slug: "yabancilar-vatandaslik-hukuku",
    description: "Küheylan Hukuk Bürosu, yabancılar ve vatandaşlık hukuku alanında müvekkillerine kapsamlı danışmanlık ve temsil hizmeti sunmaktadır. Türkiye sınırları içinde yabancı gerçek ve tüzel kişilerin ikamet, çalışma, giriş-çıkış, sınır dışı edilme, vatandaşlık kazanma veya kaybetme süreçleri ile ilgili tüm hukuki konularda destek sağlıyoruz.\n\nArtan bireysel başvurular ve idari işlemlerdeki yoğunluk nedeniyle süreçler teknik ve detaylı bir uzmanlık gerektirmektedir. Bu kapsamda büromuz, Türkiye'de yasal ikamet ve çalışma izinlerinin alınması, taşınmaz edinimi, vatandaşlık kazanımı gibi işlemlerde hukuki danışmanlık sağlarken, idari makamların tesis ettiği işlemlere karşı açılan davalarda da müvekkillerimizi etkin şekilde temsil etmektedir.",
  },
];

// Alfabetik sıralama (Türkçe alfabeye göre) — Bilgi Havuzu ve Faaliyet Alanları
// bölümleri aynı diziyi kullandığı için her iki taraftaki sıra birebir aynı olur.
export const practiceAreas: PracticeArea[] = [...practiceAreasUnsorted].sort((a, b) =>
  a.label.localeCompare(b.label, "tr")
);

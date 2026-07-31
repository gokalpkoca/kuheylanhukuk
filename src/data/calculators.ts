export type CalcFieldType = "number" | "date" | "select";

export interface CalcField {
  name: string;
  label: string;
  type: CalcFieldType;
  suffix?: string;
  defaultValue?: string;
  options?: { value: string; label: string }[];
  hint?: string;
}

export interface CalcResult {
  label: string;
  value: string;
  emphasis?: boolean;
}

export interface Calculator {
  slug: string;
  title: string;
  description: string;
  note?: string;
  fields: CalcField[];
  compute: (values: Record<string, string>) => CalcResult[];
}

const num = (v?: string) => {
  if (!v) return 0;
  const parsed = parseFloat(String(v).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

export const formatTL = (v: number) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 2 }).format(
    Number.isFinite(v) ? v : 0,
  );

const daysBetween = (start?: string, end?: string) => {
  if (!start || !end) return 0;
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (Number.isNaN(s) || Number.isNaN(e) || e <= s) return 0;
  return Math.floor((e - s) / 86400000);
};

const STAMP = 0.00759; // damga vergisi oranı
const KIDEM_TAVAN_DEFAULT = "53919.68";

const ihbarWeeks = (days: number) => {
  const months = days / 30;
  if (months < 6) return 2;
  if (months < 18) return 4;
  if (months < 36) return 6;
  return 8;
};

const seniorityText = (days: number) => {
  const y = Math.floor(days / 365);
  const m = Math.floor((days % 365) / 30);
  const d = Math.floor((days % 365) % 30);
  return `${y} yıl ${m} ay ${d} gün`;
};

const calculatorList: Calculator[] = [
  {
    slug: "adi-faiz-hesaplama",
    title: "Adi Faiz Hesaplama",
    description: "Anapara, faiz oranı ve tarih aralığına göre basit (adi) faiz ve toplam alacağı hesaplayın.",
    fields: [
      { name: "anapara", label: "Anapara", type: "number", suffix: "TL" },
      { name: "oran", label: "Yıllık Faiz Oranı", type: "number", suffix: "%", defaultValue: "9" },
      { name: "baslangic", label: "Faiz Başlangıç Tarihi", type: "date" },
      { name: "bitis", label: "Faiz Bitiş Tarihi", type: "date" },
    ],
    compute: (v) => {
      const gun = daysBetween(v.baslangic, v.bitis);
      const faiz = (num(v.anapara) * num(v.oran)) / 100 / 365 * gun;
      return [
        { label: "Faiz İşleyen Gün Sayısı", value: `${gun} gün` },
        { label: "İşlemiş Faiz", value: formatTL(faiz) },
        { label: "Toplam Alacak", value: formatTL(num(v.anapara) + faiz), emphasis: true },
      ];
    },
  },
  {
    slug: "arac-deger-kaybi-hesaplama",
    title: "Araç Değer Kaybı Hesaplama",
    description: "Kaza öncesi piyasa değeri, onarım bedeli, araç yaşı ve kilometresine göre yaklaşık değer kaybı.",
    note: "Sonuç yaklaşık bir tahmindir; kesin değer kaybı bilirkişi/aktüerya raporu ile belirlenir.",
    fields: [
      { name: "deger", label: "Kaza Öncesi Piyasa Değeri", type: "number", suffix: "TL" },
      { name: "onarim", label: "Onarım (Hasar) Bedeli", type: "number", suffix: "TL" },
      { name: "km", label: "Aracın Kilometresi", type: "number", suffix: "km" },
      { name: "yas", label: "Araç Yaşı", type: "number", suffix: "yıl" },
      {
        name: "agirlik",
        label: "Hasar Ağırlığı",
        type: "select",
        defaultValue: "orta",
        options: [
          { value: "hafif", label: "Hafif (kaporta/boya)" },
          { value: "orta", label: "Orta (parça değişimi)" },
          { value: "agir", label: "Ağır (şasi/karoser)" },
        ],
      },
    ],
    compute: (v) => {
      const deger = num(v.deger);
      const onarim = num(v.onarim);
      const km = num(v.km);
      const yas = num(v.yas);
      const agirlikKat = v.agirlik === "hafif" ? 0.35 : v.agirlik === "agir" ? 1.1 : 0.7;
      const kmKat = km > 200000 ? 0.5 : km > 150000 ? 0.65 : km > 100000 ? 0.8 : km > 50000 ? 0.9 : 1;
      const yasKat = yas > 10 ? 0.45 : yas > 7 ? 0.6 : yas > 4 ? 0.8 : yas > 2 ? 0.9 : 1;
      let kayip = onarim * agirlikKat * kmKat * yasKat;
      const ust = deger * 0.25;
      const sinirlandi = deger > 0 && kayip > ust;
      if (sinirlandi) kayip = ust;
      return [
        { label: "Uygulanan Katsayı", value: (agirlikKat * kmKat * yasKat).toFixed(3) },
        { label: "Piyasa Değerine Oranı", value: deger > 0 ? `%${((kayip / deger) * 100).toFixed(2)}` : "-" },
        { label: "Yaklaşık Değer Kaybı", value: formatTL(kayip), emphasis: true },
        ...(sinirlandi
          ? [{ label: "Not", value: "Sonuç piyasa değerinin %25'i ile sınırlandırıldı." }]
          : []),
      ];
    },
  },
  {
    slug: "fazla-mesai-hesaplama",
    title: "Fazla Mesai Hesaplama",
    description: "Brüt aylık ücret ve fazla çalışma saatlerine göre fazla mesai (%50 zamlı) alacağınızı hesaplayın.",
    fields: [
      { name: "ucret", label: "Brüt Aylık Ücret", type: "number", suffix: "TL" },
      { name: "saat", label: "Aylık Fazla Mesai Saati", type: "number", suffix: "saat" },
      { name: "ay", label: "Fazla Mesai Yapılan Ay Sayısı", type: "number", suffix: "ay", defaultValue: "1" },
      {
        name: "tur",
        label: "Çalışma Türü",
        type: "select",
        defaultValue: "fazla",
        options: [
          { value: "fazla", label: "Fazla çalışma (%50 zamlı)" },
          { value: "sure", label: "Fazla sürelerle çalışma (%25 zamlı)" },
          { value: "tatil", label: "Hafta tatili / resmi tatil (%100 zamlı)" },
        ],
      },
    ],
    compute: (v) => {
      const saatlik = num(v.ucret) / 225;
      const zam = v.tur === "sure" ? 1.25 : v.tur === "tatil" ? 2 : 1.5;
      const aylik = saatlik * zam * num(v.saat);
      const toplam = aylik * num(v.ay);
      return [
        { label: "Brüt Saatlik Ücret", value: formatTL(saatlik) },
        { label: "Zamlı Saat Ücreti", value: formatTL(saatlik * zam) },
        { label: "Aylık Fazla Mesai Alacağı", value: formatTL(aylik) },
        { label: "Toplam Brüt Fazla Mesai Alacağı", value: formatTL(toplam), emphasis: true },
      ];
    },
  },
  {
    slug: "icra-masrafi-hesaplama",
    title: "İcra Masrafı Hesaplama",
    description: "Takip konusu alacağa göre başvurma harcı, peşin harç, vekâlet harcı ve tebligat masraflarını hesaplayın.",
    note: "Harç ve masraf tutarları yıllık tarifeye göre değişir; varsayılan değerler güncel tarifeye göre düzenlenebilir.",
    fields: [
      { name: "alacak", label: "Takip Konusu Alacak", type: "number", suffix: "TL" },
      { name: "basvurma", label: "Başvurma Harcı", type: "number", suffix: "TL", defaultValue: "615.40" },
      { name: "vekalet", label: "Vekâlet Suret Harcı", type: "number", suffix: "TL", defaultValue: "96.50" },
      { name: "tebligat", label: "Tebligat Gideri (adet)", type: "number", suffix: "adet", defaultValue: "1" },
      { name: "tebligatBirim", label: "Tebligat Birim Ücreti", type: "number", suffix: "TL", defaultValue: "185" },
      { name: "dosya", label: "Dosya / Baro Pulu vb. Giderler", type: "number", suffix: "TL", defaultValue: "50" },
    ],
    compute: (v) => {
      const pesin = num(v.alacak) * 0.05;
      const tebligat = num(v.tebligat) * num(v.tebligatBirim);
      const toplam = num(v.basvurma) + pesin + num(v.vekalet) + tebligat + num(v.dosya);
      return [
        { label: "Peşin Harç (%5)", value: formatTL(pesin) },
        { label: "Başvurma Harcı", value: formatTL(num(v.basvurma)) },
        { label: "Vekâlet Suret Harcı", value: formatTL(num(v.vekalet)) },
        { label: "Tebligat Gideri", value: formatTL(tebligat) },
        { label: "Diğer Giderler", value: formatTL(num(v.dosya)) },
        { label: "Toplam İcra Masrafı", value: formatTL(toplam), emphasis: true },
      ];
    },
  },
  {
    slug: "islah-harci-hesaplama",
    title: "Islah Harcı Hesaplama",
    description: "Islah ile artırılan dava değeri üzerinden ödenmesi gereken nispi karar ve ilam harcını hesaplayın.",
    fields: [
      { name: "artirim", label: "Islahla Artırılan Miktar", type: "number", suffix: "TL" },
      { name: "oran", label: "Nispi Harç Oranı (binde)", type: "number", suffix: "‰", defaultValue: "68.31" },
      {
        name: "pesin",
        label: "Ödenecek Kısım",
        type: "select",
        defaultValue: "dortte",
        options: [
          { value: "dortte", label: "Peşin harç (1/4)" },
          { value: "tam", label: "Harcın tamamı" },
        ],
      },
    ],
    compute: (v) => {
      const tam = (num(v.artirim) * num(v.oran)) / 1000;
      const odenecek = v.pesin === "tam" ? tam : tam / 4;
      return [
        { label: "Nispi Harcın Tamamı", value: formatTL(tam) },
        { label: "Ödenecek Islah Harcı", value: formatTL(odenecek), emphasis: true },
      ];
    },
  },
  {
    slug: "kidem-tazminati-hesaplama",
    title: "Kıdem Tazminatı Hesaplama",
    description: "İşe giriş ve çıkış tarihi ile giydirilmiş brüt ücrete göre kıdem tazminatınızı hesaplayın.",
    fields: [
      { name: "giris", label: "İşe Giriş Tarihi", type: "date" },
      { name: "cikis", label: "İşten Çıkış Tarihi", type: "date" },
      { name: "ucret", label: "Giydirilmiş Brüt Aylık Ücret", type: "number", suffix: "TL" },
      { name: "tavan", label: "Kıdem Tazminatı Tavanı", type: "number", suffix: "TL", defaultValue: KIDEM_TAVAN_DEFAULT },
    ],
    compute: (v) => {
      const gun = daysBetween(v.giris, v.cikis);
      const tavan = num(v.tavan) > 0 ? num(v.tavan) : Infinity;
      const esas = Math.min(num(v.ucret), tavan);
      const brut = (esas * gun) / 365;
      const damga = brut * STAMP;
      return [
        { label: "Toplam Kıdem Süresi", value: seniorityText(gun) },
        { label: "Esas Alınan Aylık Ücret", value: formatTL(esas) },
        { label: "Brüt Kıdem Tazminatı", value: formatTL(brut) },
        { label: "Damga Vergisi (‰7,59)", value: formatTL(damga) },
        { label: "Net Kıdem Tazminatı", value: formatTL(brut - damga), emphasis: true },
      ];
    },
  },
  {
    slug: "kidem-ve-ihbar-tazminati-hesaplama",
    title: "Kıdem ve İhbar Tazminatı Hesaplama",
    description: "Kıdem süresine göre ihbar süresini belirleyerek kıdem ve ihbar tazminatını birlikte hesaplayın.",
    fields: [
      { name: "giris", label: "İşe Giriş Tarihi", type: "date" },
      { name: "cikis", label: "İşten Çıkış Tarihi", type: "date" },
      { name: "ucret", label: "Giydirilmiş Brüt Aylık Ücret", type: "number", suffix: "TL" },
      { name: "tavan", label: "Kıdem Tazminatı Tavanı", type: "number", suffix: "TL", defaultValue: KIDEM_TAVAN_DEFAULT },
      { name: "vergi", label: "Gelir Vergisi Oranı (ihbar için)", type: "number", suffix: "%", defaultValue: "15" },
    ],
    compute: (v) => {
      const gun = daysBetween(v.giris, v.cikis);
      const tavan = num(v.tavan) > 0 ? num(v.tavan) : Infinity;
      const esas = Math.min(num(v.ucret), tavan);
      const kidemBrut = (esas * gun) / 365;
      const kidemNet = kidemBrut - kidemBrut * STAMP;
      const hafta = ihbarWeeks(gun);
      const ihbarBrut = (num(v.ucret) / 30) * 7 * hafta;
      const ihbarNet = ihbarBrut - ihbarBrut * STAMP - ihbarBrut * (num(v.vergi) / 100);
      return [
        { label: "Toplam Kıdem Süresi", value: seniorityText(gun) },
        { label: "Brüt Kıdem Tazminatı", value: formatTL(kidemBrut) },
        { label: "Net Kıdem Tazminatı", value: formatTL(kidemNet) },
        { label: "İhbar Süresi", value: `${hafta} hafta` },
        { label: "Brüt İhbar Tazminatı", value: formatTL(ihbarBrut) },
        { label: "Net İhbar Tazminatı", value: formatTL(ihbarNet) },
        { label: "Toplam Net Alacak", value: formatTL(kidemNet + ihbarNet), emphasis: true },
      ];
    },
  },
  {
    slug: "kira-stopaj-hesaplama",
    title: "Kira Stopaj Hesaplama",
    description: "İşyeri kira ödemelerinde gelir vergisi stopajını brütten nete veya netten brüte hesaplayın.",
    fields: [
      { name: "tutar", label: "Kira Tutarı", type: "number", suffix: "TL" },
      {
        name: "yon",
        label: "Hesaplama Yönü",
        type: "select",
        defaultValue: "brut",
        options: [
          { value: "brut", label: "Brütten nete" },
          { value: "net", label: "Netten brüte" },
        ],
      },
      { name: "oran", label: "Stopaj Oranı", type: "number", suffix: "%", defaultValue: "20" },
    ],
    compute: (v) => {
      const oran = num(v.oran) / 100;
      const brut = v.yon === "net" ? num(v.tutar) / (1 - oran) : num(v.tutar);
      const stopaj = brut * oran;
      return [
        { label: "Brüt Kira", value: formatTL(brut) },
        { label: "Stopaj (Kesinti)", value: formatTL(stopaj) },
        { label: "Kiraya Verene Ödenecek Net Kira", value: formatTL(brut - stopaj), emphasis: true },
      ];
    },
  },
  {
    slug: "serbest-meslek-makbuzu-hesaplama",
    title: "Serbest Meslek Makbuzu Hesaplama",
    description: "Serbest meslek makbuzunda brüt, stopaj, KDV ve tahsil edilecek tutarı hesaplayın.",
    fields: [
      { name: "tutar", label: "Tutar", type: "number", suffix: "TL" },
      {
        name: "yon",
        label: "Girilen Tutar",
        type: "select",
        defaultValue: "brut",
        options: [
          { value: "brut", label: "Brüt tutar" },
          { value: "net", label: "Net (stopaj sonrası) tutar" },
        ],
      },
      { name: "stopaj", label: "Stopaj Oranı", type: "number", suffix: "%", defaultValue: "20" },
      { name: "kdv", label: "KDV Oranı", type: "number", suffix: "%", defaultValue: "20" },
    ],
    compute: (v) => {
      const sOran = num(v.stopaj) / 100;
      const brut = v.yon === "net" ? num(v.tutar) / (1 - sOran) : num(v.tutar);
      const stopaj = brut * sOran;
      const net = brut - stopaj;
      const kdv = brut * (num(v.kdv) / 100);
      return [
        { label: "Brüt Tutar", value: formatTL(brut) },
        { label: "Stopaj", value: formatTL(stopaj) },
        { label: "Net Tutar", value: formatTL(net) },
        { label: "KDV", value: formatTL(kdv) },
        { label: "Tahsil Edilecek Toplam", value: formatTL(net + kdv), emphasis: true },
      ];
    },
  },
  {
    slug: "yurt-disi-borclanma-hesaplama",
    title: "Yurt Dışı Borçlanma Hesaplama",
    description: "Yurt dışında geçen süreler için 3201 sayılı Kanun kapsamında ödenecek borçlanma tutarını hesaplayın.",
    fields: [
      { name: "gun", label: "Borçlanılacak Gün Sayısı", type: "number", suffix: "gün" },
      { name: "gunluk", label: "Prime Esas Günlük Kazanç", type: "number", suffix: "TL" },
      { name: "oran", label: "Borçlanma Oranı", type: "number", suffix: "%", defaultValue: "45" },
    ],
    compute: (v) => {
      const gunlukBorc = num(v.gunluk) * (num(v.oran) / 100);
      const toplam = gunlukBorc * num(v.gun);
      return [
        { label: "Günlük Borçlanma Tutarı", value: formatTL(gunlukBorc) },
        { label: "Borçlanılan Süre", value: `${num(v.gun)} gün (${(num(v.gun) / 360).toFixed(2)} yıl)` },
        { label: "Ödenecek Toplam Borçlanma Tutarı", value: formatTL(toplam), emphasis: true },
      ];
    },
  },
];

export const calculators = [...calculatorList].sort((a, b) => a.title.localeCompare(b.title, "tr"));

export const getCalculator = (slug?: string) => calculators.find((c) => c.slug === slug);

// Her faaliyet alanı ikonuna özel mikro animasyon eşlemesi.
// Kart üzerine gelindiğinde (group-hover) veya detay sayfası açıldığında (.pa-play) oynar.
const animBySlug: Record<string, string> = {
  "aile-hukuku": "swing",
  "bankacilik-finans": "pillars",
  "basin-hukuku": "flip",
  "ceza-hukuku": "strike",
  "gayrimenkul-hukuku": "doorway",
  "gumruk-hukuku": "drop",
  "icra-iflas-hukuku": "page",
  "idare-hukuku": "guard",
  "is-hukuku": "tap",
  "fikri-mulkiyet-hukuku": "shine",
  "miras-hukuku": "unfurl",
  "spor-hukuku": "lift",
  "sirketler-hukuku": "case",
  "tuketici-hukuku": "glide",
  "yabancilar-vatandaslik-hukuku": "roll",
};

export const paIconAnim = (slug: string) =>
  `pa-icon pa-anim-${animBySlug[slug] ?? "lift"}`;

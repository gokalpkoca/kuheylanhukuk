// Hesaplama araçları ikonlarına özel mikro animasyon eşlemesi.
// Kart üzerine gelindiğinde (group-hover) oynar.
const animBySlug: Record<string, string> = {
  "adi-faiz-hesaplama": "shine",
  "arac-deger-kaybi-hesaplama": "glide",
  "fazla-mesai-hesaplama": "roll",
  "icra-masrafi-hesaplama": "strike",
  "islah-harci-hesaplama": "page",
  "kidem-tazminati-hesaplama": "lift",
  "kidem-ve-ihbar-tazminati-hesaplama": "case",
  "kira-stopaj-hesaplama": "doorway",
  "serbest-meslek-makbuzu-hesaplama": "drop",
  "yurt-disi-borclanma-hesaplama": "roll",
};

export const calcIconAnim = (slug: string) =>
  `pa-icon pa-anim-${animBySlug[slug] ?? "tap"}`;

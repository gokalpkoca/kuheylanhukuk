import articlesI18n from "@/data/articles.i18n.json";
import contentI18n from "@/data/articleContent.i18n.json";
import contentTr from "@/data/articleContent.json";
import type { Language } from "@/context/LanguageContext";

type Block = { lines: string[]; text: string };
const titles = articlesI18n as Record<string, Record<string, string>>;
const contents = contentI18n as Record<string, Record<string, Block[]>>;
const trContent = contentTr as Record<string, Block[]>;

const codeFor = (lang: Language) => lang.toLowerCase();

export function translatedTitle(slug: string, lang: Language, fallback: string): string {
  if (lang === "TR") return fallback;
  return titles[codeFor(lang)]?.[slug] ?? fallback;
}

export function translatedBlocks(slug: string, lang: Language): Block[] {
  if (lang === "TR") return trContent[slug] ?? [];
  return contents[codeFor(lang)]?.[slug] ?? trContent[slug] ?? [];
}

const MONTHS_TR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];

export function formatDate(trDate: string, lang: Language, t: (k: string) => string): string {
  // input: "15 Temmuz 2026"
  const m = trDate.match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/);
  if (!m) return trDate;
  const [, day, monthName, year] = m;
  const monthIdx = MONTHS_TR.findIndex(x => x.toLocaleLowerCase("tr") === monthName.toLocaleLowerCase("tr"));
  if (monthIdx < 0) return trDate;
  const monthKey = `months.${monthIdx + 1}`;
  const monthLocal = t(monthKey);
  if (lang === "EN") return `${monthLocal} ${parseInt(day, 10)}, ${year}`;
  return `${parseInt(day, 10)} ${monthLocal} ${year}`;
}

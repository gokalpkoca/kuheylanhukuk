/**
 * One-off build-time translator for knowledge-base articles.
 * Usage: LOVABLE_API_KEY=... bun scripts/translate-articles.ts
 * Idempotent: only missing (slug, lang) pairs are requested.
 */
import fs from "node:fs";

const LANGS = { en: "English", ar: "Arabic", ru: "Russian" } as const;
type Lang = keyof typeof LANGS;

const articlesTs = fs.readFileSync("src/data/articles.ts", "utf8");
const titles: Record<string, string> = {};
const re = /title:\s*"([^"]+)",[\s\S]*?pdfUrl:\s*"\/articles\/([^"]+)\.pdf"/g;
for (const m of articlesTs.matchAll(re)) titles[m[2]] = m[1];

type Block = { lines: string[]; text: string };
const trContent: Record<string, Block[]> = JSON.parse(
  fs.readFileSync("src/data/articleContent.json", "utf8"),
);
const titlePath = "src/data/articles.i18n.json";
const contentPath = "src/data/articleContent.i18n.json";
const titleOut: Record<string, Record<string, string>> = JSON.parse(
  fs.existsSync(titlePath) ? fs.readFileSync(titlePath, "utf8") : "{}",
);
const contentOut: Record<string, Record<string, Block[]>> = JSON.parse(
  fs.existsSync(contentPath) ? fs.readFileSync(contentPath, "utf8") : "{}",
);

const KEY = process.env.LOVABLE_API_KEY!;
async function ask(system: string, user: string): Promise<string> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": KEY },
      body: JSON.stringify({
        model: "openai/gpt-5.6-sol",
        reasoning_effort: "none",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });
    if (res.ok) {
      const j = await res.json();
      return j.choices?.[0]?.message?.content ?? "";
    }
    if (res.status !== 429 && res.status !== 500) throw new Error(`${res.status} ${await res.text()}`);
    await new Promise((r) => setTimeout(r, 4000 * (attempt + 1)));
  }
  throw new Error("gateway retries exhausted");
}

const sys = (lang: string) =>
  `You are a legal translator. Translate Turkish legal text into ${lang}. Keep formal legal register, keep Turkish statute names recognizable (e.g. "İcra ve İflas Kanunu (Enforcement and Bankruptcy Code)" style is not needed — just translate accurately). Return ONLY a JSON array of strings, same length and order as the input array. No markdown fences, no commentary.`;

function parseArray(raw: string): string[] {
  const cleaned = raw.replace(/^```(?:json)?/m, "").replace(/```\s*$/m, "").trim();
  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  return JSON.parse(cleaned.slice(start, end + 1));
}

const slugs = Object.keys(titles).filter((s) => trContent[s]?.length);
const jobs: { slug: string; lang: Lang }[] = [];
for (const lang of Object.keys(LANGS) as Lang[]) {
  titleOut[lang] ??= {};
  contentOut[lang] ??= {};
  for (const slug of slugs) {
    if (!titleOut[lang][slug] || !contentOut[lang][slug]) jobs.push({ slug, lang });
  }
}
console.log(`${jobs.length} translation jobs`);

let done = 0;
async function run({ slug, lang }: { slug: string; lang: Lang }) {
  const texts = [titles[slug], ...trContent[slug].map((b) => b.text)];
  const out = parseArray(await ask(sys(LANGS[lang]), JSON.stringify(texts)));
  if (out.length !== texts.length) throw new Error(`length mismatch ${slug}/${lang}`);
  titleOut[lang][slug] = out[0];
  contentOut[lang][slug] = out.slice(1).map((text) => ({ lines: [text], text }));
  console.log(`[${++done}/${jobs.length}] ${lang} ${slug}`);
}

const CONCURRENCY = 4;
const queue = [...jobs];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const job = queue.shift()!;
      try {
        await run(job);
      } catch (e) {
        console.error(`FAIL ${job.lang} ${job.slug}:`, (e as Error).message);
      }
      fs.writeFileSync(titlePath, JSON.stringify(titleOut, null, 2));
      fs.writeFileSync(contentPath, JSON.stringify(contentOut, null, 2));
    }
  }),
);
console.log("done");

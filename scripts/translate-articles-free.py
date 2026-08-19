#!/usr/bin/env python3
"""Build-time (one-off) translator for knowledge-base articles.

Uses a free public machine-translation endpoint (no AI credits, no API key).
Results are written as static text into:
  - src/data/articleContent.i18n.json  ({ lang: { slug: [block, ...] } })
  - src/data/articles.i18n.json        ({ lang: { slug: title } })
Idempotent: only missing (slug, lang) pairs are fetched.
"""
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "src/data/articleContent.json")
CONTENT_I18N = os.path.join(ROOT, "src/data/articleContent.i18n.json")
TITLES_I18N = os.path.join(ROOT, "src/data/articles.i18n.json")
ARTICLES_TS = os.path.join(ROOT, "src/data/articles.ts")
LANGS = ["en", "ar", "ru"]
MAX_CHUNK = 1200


def load(path, default):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return default


def save(path, data):
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    os.replace(tmp, path)


def chunks(text):
    parts, cur = [], ""
    for sent in re.split(r"(?<=[.!?:;])\s+", text):
        if len(cur) + len(sent) + 1 > MAX_CHUNK and cur:
            parts.append(cur)
            cur = sent
        else:
            cur = (cur + " " + sent).strip()
    if cur:
        parts.append(cur)
    return parts


def translate_once(text, lang):
    url = (
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl="
        + lang
        + "&dt=t&q="
        + urllib.parse.quote(text)
    )
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.loads(r.read().decode("utf-8"))
    return "".join(seg[0] for seg in data[0] if seg and seg[0])


def translate(text, lang):
    out = []
    for part in chunks(text):
        for attempt in range(6):
            try:
                out.append(translate_once(part, lang))
                break
            except Exception:
                if attempt == 5:
                    out.append(part)
                else:
                    time.sleep(1.5 * (attempt + 1))
    return " ".join(out).strip()


def main():
    content = load(CONTENT, {})
    ci18n = load(CONTENT_I18N, {})
    ti18n = load(TITLES_I18N, {})

    titles = {}
    ts = open(ARTICLES_TS, encoding="utf-8").read()
    for m in re.finditer(r'title:\s*"([^"]+)",[\s\S]*?pdfUrl:\s*"/articles/([^"]+)\.pdf"', ts):
        titles[m.group(2)] = m.group(1)

    for lang in LANGS:
        ci18n.setdefault(lang, {})
        ti18n.setdefault(lang, {})
        todo = [s for s in content if s not in ci18n[lang]]
        print(f"[{lang}] {len(todo)} article(s) to translate", flush=True)
        for n, slug in enumerate(todo, 1):
            blocks = content[slug]
            with ThreadPoolExecutor(max_workers=6) as ex:
                texts = list(ex.map(lambda b: translate(b.get("text", ""), lang), blocks))
            ci18n[lang][slug] = [{"lines": [t], "text": t} for t in texts]
            if slug not in ti18n[lang] and slug in titles:
                ti18n[lang][slug] = translate(titles[slug], lang)
            save(CONTENT_I18N, ci18n)
            save(TITLES_I18N, ti18n)
            print(f"[{lang}] {n}/{len(todo)} {slug}", flush=True)

        for slug, tr in titles.items():
            if slug not in ti18n[lang]:
                ti18n[lang][slug] = translate(tr, lang)
        save(TITLES_I18N, ti18n)

    print("done", flush=True)


if __name__ == "__main__":
    sys.exit(main())

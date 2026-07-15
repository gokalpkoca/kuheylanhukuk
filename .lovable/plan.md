# Yazıların Çok Dilli Hale Getirilmesi

27 makale (başlık + tam içerik) TR, EN, AR, RU dillerinde sunulacak. Dil seçici değiştiğinde hem `/blog` listesi hem `/blog/:slug` detay sayfası ilgili dilde görünecek.

## Yaklaşım: Tek seferlik Lovable AI çevirisi (build-time)

Çeviriler bir kez yapılıp JSON olarak repo'ya kaydedilir. Site yüklendiğinde ek çeviri isteği gitmez — hızlı, kredi tüketmez, offline çalışır.

## Yapılacaklar

1. **Çeviri scripti** — `scripts/translate-articles.ts`
   - Girdi: `src/data/articles.ts` (başlıklar) + `src/data/articleContent.json` (içerik blokları)
   - Lovable AI Gateway'de `google/gemini-2.5-flash` ile her makaleyi EN/AR/RU'ya çevirir
   - Hukuki terminolojiye sadık, resmi ton talimatı verilir
   - Çıktı: `src/data/articles.i18n.json` (başlıklar) + `src/data/articleContent.i18n.json` (bloklar)
   - Idempotent: mevcut çeviriler atlanır, sadece eksikler doldurulur
   - Manuel çalıştırılır (`bun scripts/translate-articles.ts`), her yeni makale eklendiğinde tekrar koşulur

2. **Kategori adları** — Mevcut i18n dosyalarında (`src/i18n/tr.ts`, `en.ts`, `ar.ts`, `ru.ts`) kategori isimleri (aile-hukuku, ceza-hukuku, vs.) zaten çevrili — kullanılacak

3. **Tarih formatı** — Dil paketine ay isimleri eklenip `15 Temmuz 2026` → `July 15, 2026` / `15 يوليو 2026` / `15 июля 2026` şeklinde runtime format edilecek

4. **Blog listesi** (`src/pages/Blog.tsx`) — Aktif dile göre başlık ve tarih gösterilecek

5. **Makale detayı** (`src/pages/ArticleDetail.tsx`) — Aktif dile göre başlık ve blok içerikleri render edilecek. AR seçildiğinde makale gövdesi `dir="rtl"` alacak

6. **SEO** — Her makale için `og:locale` ve `hreflang` alternatifleri Helmet üzerinden eklenecek

## Teknik Detaylar

- **Model:** `google/gemini-2.5-flash` (hızlı + hukuki metinlerde yeterli kalite)
- **Backend:** Çeviri scripti doğrudan Node/Bun'dan Lovable AI Gateway'e çağrı yapar — edge function gerekmez, çünkü tek seferlik build-time işi
- **API anahtarı:** `LOVABLE_API_KEY` ortam değişkeninden okunur (script yerelde `.env`'den, CI'da secret'tan alır). Kullanıcı tarafından girilmez
- **Toplam çağrı:** 27 makale × 3 dil = 81 çeviri isteği (~5-10 dk sürer)
- **Depolama:** Tüm çeviriler repo'da JSON — runtime maliyet yok
- **Fallback:** Bir dilde çeviri eksikse TR gösterilir

## Onay Sonrası İlk Adım

Scripti oluşturup çalıştırırım, çeviriler JSON'a yazılır, sonra Blog + ArticleDetail bileşenlerini dil-farkındalıklı hale getiririm. İşlem sonunda örnek olarak 1-2 makale önizlemesi paylaşırım.

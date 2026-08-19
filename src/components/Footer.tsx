import { Phone, MapPin, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = [
    { label: t("nav.kurumsal"), href: "/#hakkimizda" },
    { label: t("nav.ekibimiz"), href: "/#ekibimiz" },
    { label: t("nav.makaleler"), href: "/blog" },
    { label: t("nav.faaliyet_alanlari"), href: "/faaliyet-alanlari" },
    { label: t("nav.hesaplama"), href: "/hesaplama-araclarimiz" },
    { label: t("nav.kariyer"), href: "/kariyer" },
    { label: t("nav.iletisim"), href: "/iletisim" },
  ];


  return (
    <footer className="bg-dark-surface border-t border-dark-surface font-['Roboto']">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img src={logo} alt="Küheylan Hukuk Bürosu" width={640} height={52} loading="lazy" decoding="async" sizes="(min-width: 1024px) 340px, 90vw" className="h-auto w-full max-w-[340px] object-contain brightness-0 invert" />
            </div>
            <p className="text-dark-surface-muted text-sm leading-relaxed text-justify">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg text-dark-surface-foreground font-semibold mb-6">{t("footer.quick_links")}</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-dark-surface-muted text-sm hover:text-dark-surface-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-dark-surface-foreground font-semibold mb-6">{t("footer.contact")}</h4>
            <a
              href="tel:+905352279696"
              className="inline-flex items-center gap-3 px-6 py-3 border border-dark-surface-accent text-dark-surface-accent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 rounded mb-6"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+90 535 227 96 96</span>
            </a>

            <div className="flex items-center gap-2 mt-4 mb-4">
              <Mail className="w-4 h-4 text-dark-surface-accent shrink-0" />
              <a href="mailto:info@kuheylanhukuk.com" className="text-sm text-dark-surface-muted hover:text-dark-surface-accent transition-colors">
                info@kuheylanhukuk.com
              </a>
            </div>

            <a href="https://maps.google.com/?q=Burhaniye,+Neşet+Bey+Sk.+NO:12+Kat:3+D:5,+34676+Üsküdar/İstanbul" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 mb-4 group">
              <MapPin className="w-4 h-4 text-dark-surface-accent shrink-0 mt-0.5" />
              <p className="text-sm text-dark-surface-muted leading-relaxed group-hover:text-dark-surface-accent transition-colors">
                Burhaniye, Neşet Bey Sk. NO:12 Kat:3 D:5, 34676 Üsküdar/İstanbul, Türkiye
              </p>
            </a>

            <div className="w-full h-40 rounded overflow-hidden border border-white/10 mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5!2d29.035!3d41.025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a3c5f8b0f1%3A0x0!2sBurhaniye%2C+Ne%C5%9Fet+Bey+Sk.+No%3A12%2C+34676+%C3%9Csk%C3%BCdar%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Küheylan Hukuk Bürosu Konum"
              />
            </div>

            <div className="flex gap-4 text-xs text-dark-surface-muted">
              <a href="/aydinlatma-metni" className="hover:text-dark-surface-accent transition-colors">{t("footer.legal")}</a>
              <span>|</span>
              <a href="/aydinlatma-metni" className="hover:text-dark-surface-accent transition-colors">{t("footer.cookies")}</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center space-y-2">
          <p className="text-dark-surface-muted text-xs tracking-wide">
            {t("footer.copyright")}
          </p>
          <p className="text-white/90 text-xs tracking-wide">
            Designed by{" "}
            <a
              href="https://alphy.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-dark-surface-accent transition-colors"
            >
              alphy.studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

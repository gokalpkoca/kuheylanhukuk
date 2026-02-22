import { Phone, MapPin } from "lucide-react";

const footerLinks = [
  { label: "Kurumsal", href: "#hakkimizda" },
  { label: "Ekibimiz", href: "#ekibimiz" },
  { label: "Makaleler", href: "#haberler" },
  { label: "Faaliyet Alanları", href: "#faaliyet-alanlari" },
  { label: "Kariyer", href: "#kariyer" },
  { label: "İletişim", href: "#iletisim" },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1.5 mb-6">
              <span className="font-serif text-xl font-bold text-foreground tracking-wide">
                KÜHEYLAN
              </span>
              <span className="font-serif text-xl font-light text-primary">
                HUKUK
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Büromuzun önceliği, müvekkillerinin karşılaşabileceği hukuki riskleri henüz ortaya
              çıkmadan önlemek, müvekkillerine en uygun ve en doğru çözümleri sunmaktır.
              İngilizce, Almanca, İspanyolca, Fransızca, Arapça ve Rusça dillerinde hizmet verilmektedir.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-foreground font-semibold mb-6">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h4 className="font-serif text-lg text-foreground font-semibold mb-6">İletişim</h4>
            <a
              href="tel:+905352279696"
              className="inline-flex items-center gap-3 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded mb-6"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+90 535 227 96 96</span>
            </a>

            {/* Address - visible on mobile too */}
            <div className="flex items-start gap-2 mt-4 mb-4">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Burhaniye, Neşet Bey Sk. NO:12 Kat:3 D:5, 34676 Üsküdar/İstanbul, Türkiye
              </p>
            </div>

            {/* Embedded Map */}
            <div className="w-full h-40 rounded overflow-hidden border border-border mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5!2d29.034!3d41.023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAxJzIzLjAiTiAyOcKwMDInMDIuNCJF!5e0!3m2!1str!2str!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Küheylan Hukuk Bürosu Konum"
              />
            </div>

            <div className="flex gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Yasal Uyarı</a>
              <span>|</span>
              <a href="#" className="hover:text-primary transition-colors">Çerezler</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-xs tracking-wide">
            © Copyright 2026 — Tüm Hakları Saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

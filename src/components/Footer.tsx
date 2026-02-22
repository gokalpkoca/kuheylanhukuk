import { Phone } from "lucide-react";

const footerLinks = [
  { label: "Kurumsal", href: "#hakkimizda" },
  { label: "Ekibimiz", href: "#ekibimiz" },
  { label: "Bilgi Havuzu & Haberler", href: "#haberler" },
  { label: "Faaliyet Alanları", href: "#faaliyet-alanlari" },
  { label: "Kariyer", href: "#kariyer" },
  { label: "İletişim", href: "#iletisim" },
];

const Footer = () => {
  return (
    <footer className="bg-navy-deep border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-serif text-xl font-bold text-foreground tracking-wide">
                KÜHEYLAN
              </span>
              <span className="font-serif text-xl font-light text-gold">
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
                    className="text-muted-foreground text-sm hover:text-gold transition-colors"
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
              href="tel:+902122227622"
              className="inline-flex items-center gap-3 px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300 mb-6"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+90 212 222 76 22</span>
            </a>
            <div className="flex gap-4 text-xs text-muted-foreground mt-4">
              <a href="#" className="hover:text-gold transition-colors">Yasal Uyarı</a>
              <span>|</span>
              <a href="#" className="hover:text-gold transition-colors">Çerezler</a>
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

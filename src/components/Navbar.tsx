import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";

const navItems = [
  { label: "Kurumsal", href: "#hakkimizda" },
  { label: "Ekibimiz", href: "#ekibimiz" },
  { label: "Bilgi Havuzu & Haberler", href: "#haberler" },
  { label: "Faaliyet Alanları", href: "#faaliyet-alanlari" },
  { label: "Kariyer", href: "#kariyer" },
  { label: "İletişim", href: "#iletisim" },
];

const languages = ["TR", "EN", "AR", "RU", "ES"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLang, setActiveLang] = useState("TR");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-deep/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="font-serif text-xl lg:text-2xl font-bold text-foreground tracking-wide">
              KÜHEYLAN
            </span>
            <span className="font-serif text-xl lg:text-2xl font-light text-gold">
              HUKUK
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors duration-200 tracking-wide uppercase"
              >
                {item.label}
              </a>
            ))}
            
            {/* Language Toggle */}
            <div className="flex items-center gap-1 ml-4 border-l border-border pl-4">
              <Globe className="w-4 h-4 text-gold mr-1" />
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    activeLang === lang
                      ? "bg-gold text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-gold"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="xl:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="xl:hidden bg-navy-deep/98 backdrop-blur-md border-t border-border pb-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-sm uppercase tracking-wide text-muted-foreground hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-1 px-4 pt-3 border-t border-border mt-3">
              <Globe className="w-4 h-4 text-gold mr-1" />
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    activeLang === lang
                      ? "bg-gold text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-gold"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, Phone, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { practiceAreas as practiceAreaData } from "@/data/practiceAreas";
import { useLanguage, Language } from "@/context/LanguageContext";

const languages: Language[] = ["TR", "EN", "AR", "RU", "ES"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t("nav.kurumsal"), href: "#hakkimizda" },
    { label: t("nav.ekibimiz"), href: "#ekibimiz" },
    { label: t("nav.faaliyet_alanlari"), href: "#faaliyet-alanlari", dropdown: true },
    { label: t("nav.makaleler"), href: "#haberler" },
    { label: t("nav.kariyer"), href: "#kariyer" },
    { label: t("nav.iletisim"), href: "/iletisim", isPage: true },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-border"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1.5 shrink-0">
            <span className="font-serif text-lg lg:text-xl font-bold text-foreground tracking-wide">
              KÜHEYLAN
            </span>
            <span className="font-serif text-lg lg:text-xl font-light text-primary">
              HUKUK BÜROSU
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) =>
              (item as any).dropdown ? (
                <div key={item.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide uppercase"
                  >
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-72 bg-card border border-border rounded shadow-xl shadow-black/30 z-50 py-2 max-h-[70vh] overflow-y-auto">
                      {practiceAreaData.map((area) => (
                        <Link
                          key={area.slug}
                          to={`/faaliyet-alanlari/${area.slug}`}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                        >
                          {t(`pa.${area.slug}`)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (item as any).isPage ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide uppercase"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide uppercase"
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          {/* Right side: Phone + Language */}
          <div className="hidden xl:flex items-center gap-4">
            <a
              href="tel:+905352279696"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>0 (535) 227 96 96</span>
            </a>

            <div className="h-5 w-px bg-border" />

            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{language}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {langDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-20 bg-card border border-border rounded shadow-xl shadow-black/30 z-50 py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setLangDropdownOpen(false); }}
                      className={`block w-full text-left px-3 py-1.5 text-sm transition-colors ${
                        language === lang
                          ? "text-primary font-semibold bg-secondary"
                          : "text-muted-foreground hover:text-primary hover:bg-secondary"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="xl:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="xl:hidden bg-card border-t border-border pb-4 rounded-b shadow-xl shadow-black/20">
            {navItems.map((item) =>
              (item as any).dropdown ? (
                <div key={item.href}>
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className="flex items-center justify-between w-full py-3 px-4 text-sm uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileDropdownOpen && (
                    <div className="bg-secondary border-t border-b border-border">
                      {practiceAreaData.map((area) => (
                        <Link
                          key={area.slug}
                          to={`/faaliyet-alanlari/${area.slug}`}
                          onClick={() => { setIsOpen(false); setMobileDropdownOpen(false); }}
                          className="block py-2.5 px-8 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {t(`pa.${area.slug}`)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (item as any).isPage ? (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 text-sm uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 text-sm uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              )
            )}

            {/* Mobile phone & language */}
            <div className="border-t border-border mt-2 pt-3 px-4 space-y-3">
              <a href="tel:+905352279696" className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                0 (535) 227 96 96
              </a>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-primary mr-1" />
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      language === lang
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useState, useEffect, useRef } from "react";
import logo from "@/assets/logo.png";
import { Menu, X, Globe, Phone, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { practiceAreas as practiceAreaData } from "@/data/practiceAreas";
import { useLanguage, Language } from "@/context/LanguageContext";

const languageFlags: Record<Language, string> = {
  TR: "🇹🇷",
  EN: "🇬🇧",
  AR: "🇸🇦",
  RU: "🇷🇺",
};
const languages: Language[] = ["TR", "EN", "AR", "RU"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const [articleDropdownOpen, setArticleDropdownOpen] = useState(false);
  const [mobileArticleDropdownOpen, setMobileArticleDropdownOpen] = useState(false);
  const articleDropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: t("nav.kurumsal"), href: "#hakkimizda" },
    { label: t("nav.ekibimiz"), href: "#ekibimiz" },
    { label: t("nav.faaliyet_alanlari"), href: "/faaliyet-alanlari", dropdown: "practiceAreas", isPage: true },
    { label: t("nav.makaleler"), href: "/blog", dropdown: "articles" },
    { label: t("nav.hesaplama"), href: "/hesaplama-araclarimiz", isPage: true },
    { label: t("nav.kariyer"), href: "/kariyer", isPage: true },
    { label: t("nav.iletisim"), href: "/iletisim", isPage: true },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (articleDropdownRef.current && !articleDropdownRef.current.contains(e.target as Node)) {
        setArticleDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
      // Close mobile menu when clicking outside
      if (isOpen && mobileMenuRef.current && navBarRef.current && !mobileMenuRef.current.contains(e.target as Node) && !navBarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-border"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16 lg:h-24">
          {/* Logo */}
          <a href="/" className="shrink-0">
            <img src={logo} alt="Küheylan Hukuk Bürosu" width={640} height={52} className="h-5 lg:h-[1.5rem] w-auto" />
          </a>

          <div className="hidden xl:flex flex-1 min-w-0 items-center justify-center gap-0 whitespace-nowrap">

            {navItems.map((item) =>
              item.dropdown === "practiceAreas" ? (
              <div key={item.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1 relative px-1.5 py-2 text-[0.72rem] font-medium text-foreground/75 hover:text-primary transition-colors duration-200 tracking-[0.04em] uppercase after:absolute after:left-1.5 after:right-1.5 after:-bottom-0.5 after:h-px after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                  >
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-72 bg-card border border-border rounded shadow-xl shadow-black/30 z-50 py-2 max-h-[70vh] overflow-y-auto">
                      <Link
                        to="/faaliyet-alanlari"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary transition-colors border-b border-border"
                      >
                        {t("nav.tum_faaliyet_alanlari")}
                      </Link>
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
              ) : item.dropdown === "articles" ? (
                <div key={item.href} className="relative" ref={articleDropdownRef}>
                  <button
                    onClick={() => setArticleDropdownOpen(!articleDropdownOpen)}
                    className="flex items-center gap-1 relative px-1.5 py-2 text-[0.72rem] font-medium text-foreground/75 hover:text-primary transition-colors duration-200 tracking-[0.04em] uppercase after:absolute after:left-1.5 after:right-1.5 after:-bottom-0.5 after:h-px after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                  >
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${articleDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {articleDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-card border border-border rounded shadow-xl shadow-black/30 z-50 py-2 max-h-[70vh] overflow-y-auto">
                      <Link
                        to="/blog"
                        onClick={() => setArticleDropdownOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary transition-colors border-b border-border"
                      >
                        {t("nav.tum_makaleler")}
                      </Link>
                      {practiceAreaData.map((area) => (
                        <Link
                          key={area.slug}
                          to={`/blog?dept=${encodeURIComponent(area.slug)}`}
                          onClick={() => setArticleDropdownOpen(false)}
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
                  className="relative px-1.5 py-2 text-[0.72rem] font-medium text-foreground/75 hover:text-primary transition-colors duration-200 tracking-[0.04em] uppercase after:absolute after:left-1.5 after:right-1.5 after:-bottom-0.5 after:h-px after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                  className="relative px-1.5 py-2 text-[0.72rem] font-medium text-foreground/75 hover:text-primary transition-colors duration-200 tracking-[0.04em] uppercase after:absolute after:left-1.5 after:right-1.5 after:-bottom-0.5 after:h-px after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          {/* Right side: Phone + Language */}
          <div className="hidden xl:flex items-center gap-1 shrink-0">
            <a
              href="tel:+905352279696"
              aria-label="Telefon ile arayın: +90 535 227 96 96"
              className="group flex items-center gap-2 rounded-sm bg-primary/[0.06] border border-primary/25 px-2.5 h-9 hover:bg-primary/10 hover:border-primary/50 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="hidden min-[1400px]:inline text-[0.8rem] font-medium tabular-nums tracking-[0.04em] leading-none text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                +90 535 227 96 96
              </span>
            </a>

            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-label="Dil seçimi"
                className="flex items-center gap-1 h-9 px-2 rounded-sm border border-transparent text-[0.8rem] tracking-wide text-foreground/75 hover:text-primary hover:border-border transition-colors shrink-0"
              >
                <span className="text-base leading-none">{languageFlags[language]}</span>
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
                      <span className="text-base leading-none">{languageFlags[lang]}</span> {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={navBarRef}
            className="xl:hidden text-foreground p-2 rounded transition-colors duration-300 hover:text-primary group"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isOpen}
          >
            <span className="relative block w-6 h-5" aria-hidden="true">
              <span
                className={`absolute left-0 h-[2px] w-6 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                  isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 group-hover:w-5"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-6 bg-current rounded-full transition-all duration-200 ${
                  isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100 group-hover:w-4"
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-6 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                  isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0 group-hover:w-5"
                }`}
              />
            </span>
          </button>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div ref={mobileMenuRef} className="xl:hidden bg-card border-t border-border pb-4 rounded-b shadow-xl shadow-black/20 animate-fade-in origin-top">

            {navItems.map((item) =>
              item.dropdown === "practiceAreas" ? (
                <div key={item.href}>
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className="flex items-center justify-between w-full py-3 px-4 text-sm uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      mobileDropdownOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="bg-secondary border-t border-b border-border">
                        <Link
                          to="/faaliyet-alanlari"
                          onClick={() => { setIsOpen(false); setMobileDropdownOpen(false); }}
                          className="block py-2.5 px-8 text-sm font-medium text-foreground hover:text-primary hover:px-9 transition-all duration-200"
                        >
                          {t("nav.tum_faaliyet_alanlari")}
                        </Link>
                        {practiceAreaData.map((area) => (
                          <Link
                            key={area.slug}
                            to={`/faaliyet-alanlari/${area.slug}`}
                            onClick={() => { setIsOpen(false); setMobileDropdownOpen(false); }}
                            className="block py-2.5 px-8 text-sm text-muted-foreground hover:text-primary hover:px-9 transition-all duration-200"
                          >
                            {t(`pa.${area.slug}`)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              ) : item.dropdown === "articles" ? (
                <div key={item.href}>
                  <button
                    onClick={() => setMobileArticleDropdownOpen(!mobileArticleDropdownOpen)}
                    className="flex items-center justify-between w-full py-3 px-4 text-sm uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileArticleDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileArticleDropdownOpen && (
                    <div className="bg-secondary border-t border-b border-border">
                      <Link
                        to="/blog"
                        onClick={() => { setIsOpen(false); setMobileArticleDropdownOpen(false); }}
                        className="block py-2.5 px-8 text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {t("nav.tum_makaleler")}
                      </Link>
                      {practiceAreaData.map((area) => (
                        <Link
                          key={area.slug}
                          to={`/blog?dept=${encodeURIComponent(area.slug)}`}
                          onClick={() => { setIsOpen(false); setMobileArticleDropdownOpen(false); }}
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
                  href={item.href.startsWith("#") ? `/${item.href}` : item.href}
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
                +90 535 227 96 96
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
                    <span className="text-base leading-none">{languageFlags[lang]}</span> {lang}
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

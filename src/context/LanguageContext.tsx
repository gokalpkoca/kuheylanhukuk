import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Language = "TR" | "EN" | "AR" | "RU";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Lazy-load translations
const translationModules: Record<Language, () => Promise<{ default: Record<string, string> }>> = {
  TR: () => import("@/i18n/tr"),
  EN: () => import("@/i18n/en"),
  AR: () => import("@/i18n/ar"),
  RU: () => import("@/i18n/ru"),
};

// Pre-loaded TR translations (default)
import trTranslations from "@/i18n/tr";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("TR");
  const [translations, setTranslations] = useState<Record<string, string>>(trTranslations);

  const setLanguage = useCallback(async (lang: Language) => {
    setLanguageState(lang);
    const mod = await translationModules[lang]();
    setTranslations(mod.default);
  }, []);

  const t = useCallback(
    (key: string) => translations[key] || key,
    [translations]
  );

  const dir = language === "AR" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

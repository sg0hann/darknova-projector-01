
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getTranslation } from "../utils/localization";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, defaultValue?: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Try to get the language from localStorage or use browser language
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.split("-")[0];
      setLanguage(browserLang === "es" ? "es" : "en");
    }
  }, []);

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, defaultValue?: string): string => {
    return getTranslation(language, key, defaultValue);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { en, type TranslationDictionary } from "../messages/en";
import { fr } from "../messages/fr";

export type Locale = "en" | "fr";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // Check localStorage or cookie on initial client mount
    const storedLocale = localStorage.getItem("barriaide_locale") as Locale | null;
    if (storedLocale === "en" || storedLocale === "fr") {
      setLocaleState(storedLocale);
      document.documentElement.lang = storedLocale;
    } else {
      // Auto-detect browser preference
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "fr") {
        setLocaleState("fr");
        document.documentElement.lang = "fr";
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("barriaide_locale", newLocale);
    document.cookie = `barriaide_locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = newLocale;
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "fr" : "en");
  };

  const t = locale === "en" ? en : fr;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

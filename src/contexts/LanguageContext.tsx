"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // English is the base language; visitors can switch to Indonesian and the choice is remembered.
  const [language, setLanguage] = useState<Language>("en");

  // Load language from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("language");
      if (savedLang === "id" || savedLang === "en") setLanguage(savedLang);
    } catch {
      // storage can be blocked (private mode); keep the default
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Save language to localStorage when changed
  const toggleLanguage = () => {
    const newLang = language === "id" ? "en" : "id";
    setLanguage(newLang);
    try {
      localStorage.setItem("language", newLang);
    } catch {
      // ignore: the choice just won't persist
    }
  };

  // Simple translation function (will be enhanced)
  const t = (key: string) => {
    return key; // Placeholder
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
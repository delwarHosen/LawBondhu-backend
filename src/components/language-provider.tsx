"use client";
import * as React from "react";
import {
  type Locale,
  type TranslationKey,
  translate,
  formatDate,
  formatNumber,
} from "@/i18n";
type Ctx = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  date: (value: string | number | Date) => string;
  number: (value: number) => string;
};
const LanguageContext = React.createContext<Ctx | undefined>(undefined);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<Locale>("bn");
  React.useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr";
  }, [locale]);
  const value = React.useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: TranslationKey) => translate(locale, key),
      date: (v: string | number | Date) => formatDate(v, locale),
      number: (v: number) => formatNumber(v, locale),
    }),
    [locale],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

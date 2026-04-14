import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { LazyBackend } from "./lazy-backend";

export const supportedLanguages = ["en", "es"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageLabels: Record<SupportedLanguage, string> = {
  en: "English",
  es: "Español",
};

const i18n = i18next
  .use(LazyBackend)
  .use(LanguageDetector)
  .use(initReactI18next);

i18n.init({
  fallbackLng: "en",
  supportedLngs: supportedLanguages,
  defaultNS: "common",
  ns: ["common"],
  interpolation: {
    escapeValue: false, // React already escapes
  },
  detection: {
    order: ["localStorage", "navigator"],
    lookupLocalStorage: "i18nextLng",
    caches: ["localStorage"],
  },
});

export { i18n };

import { useTranslation } from "react-i18next";
import {
  supportedLanguages,
  languageLabels,
  type SupportedLanguage,
} from "../../infrastructure/i18n";

export interface Language {
  code: SupportedLanguage;
  label: string;
}

const availableLanguages: Language[] = supportedLanguages.map((code) => ({
  code,
  label: languageLabels[code],
}));

export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language as SupportedLanguage;

  const changeLanguage = (language: SupportedLanguage) => {
    i18n.changeLanguage(language);
  };

  return {
    currentLanguage,
    changeLanguage,
    availableLanguages,
  };
}

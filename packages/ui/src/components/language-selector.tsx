import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export interface LanguageSelectorLanguage {
  code: string;
  label: string;
}

export interface LanguageSelectorProps {
  currentLanguage: string;
  languages: LanguageSelectorLanguage[];
  onLanguageChange: (code: string) => void;
}

export function LanguageSelector({
  currentLanguage,
  languages,
  onLanguageChange,
}: LanguageSelectorProps) {
  return (
    <Select value={currentLanguage} onValueChange={onLanguageChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

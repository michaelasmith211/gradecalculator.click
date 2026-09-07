export interface LocaleConfig {
  code: string;
  name: string; // Native name as in reference image
  englishName: string;
  dir: "ltr" | "rtl";
  ogLocale: string;
  column: 1 | 2 | 3;
}

export const DEFAULT_LOCALE = "en";

export const LOCALES: Record<string, LocaleConfig> = {
  // Column 1
  no: { code: "no", name: "Norsk bokmål", englishName: "Norwegian", dir: "ltr", ogLocale: "nb_NO", column: 1 },
  ar: { code: "ar", name: "العربية", englishName: "Arabic", dir: "rtl", ogLocale: "ar_AR", column: 1 },
  az: { code: "az", name: "Azərbaycanca", englishName: "Azerbaijani", dir: "ltr", ogLocale: "az_AZ", column: 1 },
  bg: { code: "bg", name: "Български", englishName: "Bulgarian", dir: "ltr", ogLocale: "bg_BG", column: 1 },
  bn: { code: "bn", name: "বাংলা", englishName: "Bengali", dir: "ltr", ogLocale: "bn_BD", column: 1 },
  cs: { code: "cs", name: "Čeština", englishName: "Czech", dir: "ltr", ogLocale: "cs_CZ", column: 1 },
  da: { code: "da", name: "Dansk", englishName: "Danish", dir: "ltr", ogLocale: "da_DK", column: 1 },
  de: { code: "de", name: "Deutsch", englishName: "German", dir: "ltr", ogLocale: "de_DE", column: 1 },
  el: { code: "el", name: "Ελληνικά", englishName: "Greek", dir: "ltr", ogLocale: "el_GR", column: 1 },
  en: { code: "en", name: "English", englishName: "English", dir: "ltr", ogLocale: "en_US", column: 1 },
  es: { code: "es", name: "Español", englishName: "Spanish", dir: "ltr", ogLocale: "es_ES", column: 1 },
  fa: { code: "fa", name: "فارسی", englishName: "Persian", dir: "rtl", ogLocale: "fa_IR", column: 1 },
  fi: { code: "fi", name: "Suomi", englishName: "Finnish", dir: "ltr", ogLocale: "fi_FI", column: 1 },

  // Column 2
  fr: { code: "fr", name: "Français", englishName: "French", dir: "ltr", ogLocale: "fr_FR", column: 2 },
  he: { code: "he", name: "עברית", englishName: "Hebrew", dir: "rtl", ogLocale: "he_IL", column: 2 },
  hi: { code: "hi", name: "हिन्दी", englishName: "Hindi", dir: "ltr", ogLocale: "hi_IN", column: 2 },
  hr: { code: "hr", name: "Hrvatski", englishName: "Croatian", dir: "ltr", ogLocale: "hr_HR", column: 2 },
  hu: { code: "hu", name: "Magyar", englishName: "Hungarian", dir: "ltr", ogLocale: "hu_HU", column: 2 },
  id: { code: "id", name: "Bahasa Indonesia", englishName: "Indonesian", dir: "ltr", ogLocale: "id_ID", column: 2 },
  it: { code: "it", name: "Italiano", englishName: "Italian", dir: "ltr", ogLocale: "it_IT", column: 2 },
  ja: { code: "ja", name: "日本語", englishName: "Japanese", dir: "ltr", ogLocale: "ja_JP", column: 2 },
  kk: { code: "kk", name: "Қазақша", englishName: "Kazakh", dir: "ltr", ogLocale: "kk_KZ", column: 2 },
  ko: { code: "ko", name: "한국어", englishName: "Korean", dir: "ltr", ogLocale: "ko_KR", column: 2 },
  ms: { code: "ms", name: "Bahasa Melayu", englishName: "Malay", dir: "ltr", ogLocale: "ms_MY", column: 2 },
  nl: { code: "nl", name: "Nederlands", englishName: "Dutch", dir: "ltr", ogLocale: "nl_NL", column: 2 },
  pl: { code: "pl", name: "Polski", englishName: "Polish", dir: "ltr", ogLocale: "pl_PL", column: 2 },

  // Column 3
  pt: { code: "pt", name: "Português", englishName: "Portuguese", dir: "ltr", ogLocale: "pt_PT", column: 3 },
  ro: { code: "ro", name: "Română", englishName: "Romanian", dir: "ltr", ogLocale: "ro_RO", column: 3 },
  ru: { code: "ru", name: "Русский", englishName: "Russian", dir: "ltr", ogLocale: "ru_RU", column: 3 },
  sk: { code: "sk", name: "Slovenčina", englishName: "Slovak", dir: "ltr", ogLocale: "sk_SK", column: 3 },
  sr: { code: "sr", name: "Српски", englishName: "Serbian", dir: "ltr", ogLocale: "sr_RS", column: 3 },
  sv: { code: "sv", name: "Svenska", englishName: "Swedish", dir: "ltr", ogLocale: "sv_SE", column: 3 },
  th: { code: "th", name: "ไทย", englishName: "Thai", dir: "ltr", ogLocale: "th_TH", column: 3 },
  tl: { code: "tl", name: "Tagalog", englishName: "Tagalog", dir: "ltr", ogLocale: "fil_PH", column: 3 },
  tr: { code: "tr", name: "Türkçe", englishName: "Turkish", dir: "ltr", ogLocale: "tr_TR", column: 3 },
  ur: { code: "ur", name: "اردو", englishName: "Urdu", dir: "rtl", ogLocale: "ur_PK", column: 3 },
  uz: { code: "uz", name: "O'zbekcha", englishName: "Uzbek", dir: "ltr", ogLocale: "uz_UZ", column: 3 },
  vi: { code: "vi", name: "Tiếng Việt", englishName: "Vietnamese", dir: "ltr", ogLocale: "vi_VN", column: 3 },
  zh: { code: "zh", name: "中文", englishName: "Chinese (Simplified)", dir: "ltr", ogLocale: "zh_CN", column: 3 },
};

export const ALL_LOCALE_CODES = Object.keys(LOCALES);

export const NON_DEFAULT_LOCALES = ALL_LOCALE_CODES.filter(
  (code) => code !== DEFAULT_LOCALE
);

export function isValidLocale(code: string): boolean {
  return code in LOCALES;
}

export function isRTL(locale: string): boolean {
  return LOCALES[locale]?.dir === "rtl";
}

export function getLocaleConfig(locale: string): LocaleConfig {
  return LOCALES[locale] || LOCALES[DEFAULT_LOCALE];
}

/**
 * Normalizes path for a target locale:
 * e.g. path = "/final-grade-calculator" -> locale "es" -> "/es/final-grade-calculator/"
 * e.g. path = "/es/final-grade-calculator" -> locale "en" -> "/final-grade-calculator/"
 */
export function getLocalizedPath(pathname: string, targetLocale: string): string {
  // Strip leading locale if present
  const segments = pathname.split("/").filter(Boolean);
  let cleanSegments = [...segments];

  if (segments.length > 0 && isValidLocale(segments[0])) {
    cleanSegments = segments.slice(1);
  }

  const cleanPath = cleanSegments.length > 0 ? `/${cleanSegments.join("/")}/` : "/";

  if (targetLocale === DEFAULT_LOCALE) {
    return cleanPath;
  }

  return cleanPath === "/" ? `/${targetLocale}/` : `/${targetLocale}${cleanPath}`;
}

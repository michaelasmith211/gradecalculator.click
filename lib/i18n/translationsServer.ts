import { enTranslations, Translations } from "./translations";
import { column1Translations } from "./messages/column1";
import { column2Translations } from "./messages/column2";
import { column3Translations } from "./messages/column3";

export const ALL_TRANSLATIONS: Record<string, Partial<Translations>> = {
  en: enTranslations,
  ...column1Translations,
  ...column2Translations,
  ...column3Translations,
};

/**
 * Server-only helper to fetch complete translations for a given locale during SSG/SSR.
 */
export function getServerTranslations(locale: string): Translations {
  const locDict = ALL_TRANSLATIONS[locale] || {};
  return {
    ...enTranslations,
    ...locDict,
  };
}

/**
 * Server-only helper to fetch a specific translated string during SSG/SSR.
 */
export function getServerTranslation(locale: string, key: keyof Translations): string {
  const locDict = ALL_TRANSLATIONS[locale];
  if (locDict && locDict[key]) {
    return locDict[key] as string;
  }
  return enTranslations[key] || "";
}

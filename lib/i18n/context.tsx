"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALES,
  isRTL as checkIsRTL,
  getLocalizedPath,
  isValidLocale,
  LocaleConfig,
} from "./locales";
import { getTranslations, Translations } from "./translations";

interface I18nContextType {
  locale: string;
  localeConfig: LocaleConfig;
  t: (key: keyof Translations) => string;
  translations: Translations;
  isRTL: boolean;
  dir: "ltr" | "rtl";
  switchLanguage: (targetLocale: string) => void;
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Detect locale from URL path segment (e.g. /es/...) or fallback to initialLocale / default
  const activeLocale = useMemo(() => {
    if (!pathname) return initialLocale || DEFAULT_LOCALE;
    const firstSegment = pathname.split("/").filter(Boolean)[0];
    if (firstSegment && isValidLocale(firstSegment)) {
      return firstSegment;
    }
    return initialLocale || DEFAULT_LOCALE;
  }, [pathname, initialLocale]);

  const [isModalOpen, setModalOpen] = useState(false);

  const localeConfig = LOCALES[activeLocale] || LOCALES[DEFAULT_LOCALE];
  const isRTL = checkIsRTL(activeLocale);
  const dir = isRTL ? "rtl" : "ltr";
  const translations = useMemo(() => getTranslations(activeLocale), [activeLocale]);

  // Synchronize document dir and lang attributes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = activeLocale;
      document.documentElement.dir = dir;
    }
  }, [activeLocale, dir]);

  const t = (key: keyof Translations): string => {
    return translations[key] || "";
  };

  const switchLanguage = (targetLocale: string) => {
    if (!isValidLocale(targetLocale)) return;
    try {
      localStorage.setItem("grade_calculator_locale", targetLocale);
      document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore storage errors
    }
    const targetPath = getLocalizedPath(pathname || "/", targetLocale);
    router.push(targetPath);
    setModalOpen(false);
  };

  return (
    <I18nContext.Provider
      value={{
        locale: activeLocale,
        localeConfig,
        t,
        translations,
        isRTL,
        dir,
        switchLanguage,
        isModalOpen,
        setModalOpen,
      }}
    >
      <div dir={dir} className={isRTL ? "rtl" : "ltr"}>
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    // Fallback if rendered outside provider
    const fallbackConfig = LOCALES[DEFAULT_LOCALE];
    const fallbackTranslations = getTranslations(DEFAULT_LOCALE);
    return {
      locale: DEFAULT_LOCALE,
      localeConfig: fallbackConfig,
      t: (key: keyof Translations) => fallbackTranslations[key] || "",
      translations: fallbackTranslations,
      isRTL: false,
      dir: "ltr" as const,
      switchLanguage: () => {},
      isModalOpen: false,
      setModalOpen: () => {},
    };
  }
  return context;
}

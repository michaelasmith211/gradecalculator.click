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
  const detectedLocale = useMemo(() => {
    if (typeof window !== "undefined" && window.location.pathname) {
      const firstSegment = window.location.pathname.split("/").filter(Boolean)[0];
      if (firstSegment && isValidLocale(firstSegment)) {
        return firstSegment;
      }
    }
    if (pathname) {
      const firstSegment = pathname.split("/").filter(Boolean)[0];
      if (firstSegment && isValidLocale(firstSegment)) {
        return firstSegment;
      }
    }
    return initialLocale || DEFAULT_LOCALE;
  }, [pathname, initialLocale]);

  const [currentLocale, setCurrentLocale] = useState<string>(detectedLocale);
  const [isModalOpen, setModalOpen] = useState(false);

  // Sync state if pathname or detectedLocale changes
  useEffect(() => {
    if (detectedLocale && detectedLocale !== currentLocale) {
      setCurrentLocale(detectedLocale);
    }
  }, [detectedLocale]);

  const localeConfig = LOCALES[currentLocale] || LOCALES[DEFAULT_LOCALE];
  const isRTL = checkIsRTL(currentLocale);
  const dir = isRTL ? "rtl" : "ltr";
  const translations = useMemo(() => getTranslations(currentLocale), [currentLocale]);

  // Synchronize document dir and lang attributes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = currentLocale;
      document.documentElement.dir = dir;
    }
  }, [currentLocale, dir]);

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

    // 1. Immediately update client-side React state so all UI strings re-render in targetLocale
    setCurrentLocale(targetLocale);
    setModalOpen(false);

    // 2. Compute the exact destination URL
    const currentPath = (typeof window !== "undefined" ? window.location.pathname : pathname) || "/";
    const targetPath = getLocalizedPath(currentPath, targetLocale);

    // 3. Navigate to the localized page URL
    if (typeof window !== "undefined") {
      window.location.href = targetPath;
    } else {
      router.push(targetPath);
    }
  };

  return (
    <I18nContext.Provider
      value={{
        locale: currentLocale,
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

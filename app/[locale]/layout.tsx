import React from "react";
import AppShell from "@/components/AppShell";
import { NON_DEFAULT_LOCALES, isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { getServerTranslations } from "@/lib/i18n/translationsServer";

export async function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({
    locale,
  }));
}

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  const translations = getServerTranslations(currentLocale);

  return (
    <AppShell locale={currentLocale} translations={translations}>
      {children}
    </AppShell>
  );
}

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import CookieConsent from "@/components/CookieConsent";
import { I18nProvider } from "@/lib/i18n/context";
import { Translations } from "@/lib/i18n/translations";

export default function AppShell({
  children,
  locale = "en",
  translations,
}: {
  children: React.ReactNode;
  locale?: string;
  translations?: Partial<Translations>;
}) {
  return (
    <I18nProvider initialLocale={locale} initialTranslations={translations}>
      <Header />
      <main className="flex-grow pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
      <CookieConsent />
    </I18nProvider>
  );
}

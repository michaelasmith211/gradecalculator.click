import React from "react";
import { Metadata } from "next";
import { NON_DEFAULT_LOCALES, isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { getPageSeo } from "@/lib/i18n/pageSeo";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateWebApplicationSchema,
  generateFAQSchema,
  generateHowToSchema,
} from "@/lib/seo/schema";
import HomeView from "@/components/views/HomeView";
import HeroHeader from "@/components/HeroHeader";
import {
  getLocalizedHomeSummary,
  getLocalizedFigureCaption,
  getLocalizedHomeFaqs,
} from "@/lib/i18n/localizedContent";
import { TOOL_NAMES } from "@/lib/i18n/pageSeo";
import { getServerTranslations } from "@/lib/i18n/translationsServer";

export async function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  const seo = getPageSeo("home", currentLocale);

  return constructMetadata({
    title: seo.title,
    description: seo.description,
    path: "/",
    keywords: seo.keywords,
    locale: currentLocale,
  });
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;

  const appSchema = generateWebApplicationSchema({
    name: "Grade Calculator",
    description: "Free online grade calculator to calculate course percentage and GPA instantly.",
    path: `/${currentLocale}/`,
  });

  const localizedBrandName =
    (TOOL_NAMES["grade-calculator"] && TOOL_NAMES["grade-calculator"][currentLocale]) ||
    "Grade Calculator";
  const homeSummary = getLocalizedHomeSummary(currentLocale, localizedBrandName);
  const figureCaption = getLocalizedFigureCaption(currentLocale);
  const homeFaqs = getLocalizedHomeFaqs(currentLocale);
  const localeTranslations = getServerTranslations(currentLocale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <HomeView
        locale={currentLocale}
        homeSummary={homeSummary}
        figureCaption={figureCaption}
        homeFaqs={homeFaqs}
        initialTranslations={localeTranslations}
        heroHeaderSlot={
          <HeroHeader
            title={localizedBrandName}
            tagline={localeTranslations.tagline || "Calculate your grade, percentage, and 4.0 GPA instantly."}
          />
        }
      />
    </>
  );
}

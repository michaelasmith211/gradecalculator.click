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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <HomeView locale={currentLocale} />
    </>
  );
}

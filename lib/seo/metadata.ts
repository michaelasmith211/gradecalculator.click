import { Metadata } from "next";

export const SITE_NAME = "Grade Calculator";
export const SITE_URL = "https://gradecalculator.dev";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

import { ALL_LOCALE_CODES, NON_DEFAULT_LOCALES, LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/locales";

interface PageMetaParams {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  locale?: string;
}

export function constructMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  locale = DEFAULT_LOCALE,
}: PageMetaParams): Metadata {
  // Normalize base path without leading locale (e.g. "/es/final-grade-calculator" -> "/final-grade-calculator")
  const pathSegments = path.split("/").filter(Boolean);
  let cleanSegments = [...pathSegments];
  if (pathSegments.length > 0 && ALL_LOCALE_CODES.includes(pathSegments[0])) {
    cleanSegments = pathSegments.slice(1);
  }
  const basePath = cleanSegments.length > 0 ? `/${cleanSegments.join("/")}` : "";

  // Canonical URL for this specific page
  const canonicalUrl =
    locale === DEFAULT_LOCALE || !locale
      ? `${SITE_URL}${basePath || "/"}`
      : `${SITE_URL}/${locale}${basePath}`;

  // Generate hreflang alternates for all 39 languages + x-default
  const languageAlternates: Record<string, string> = {
    "x-default": `${SITE_URL}${basePath || "/"}`,
    en: `${SITE_URL}${basePath || "/"}`,
  };

  for (const code of NON_DEFAULT_LOCALES) {
    languageAlternates[code] = `${SITE_URL}/${code}${basePath}`;
  }

  // Ensure title contains the main keyword "Grade Calculator" cleanly without redundant repetition
  const formattedTitle = title.toLowerCase().includes("grade calculator")
    ? title
    : `${title} – ${SITE_NAME}`;

  const currentOgLocale = (LOCALES[locale] && LOCALES[locale].ogLocale) || "en_US";

  return {
    title: formattedTitle,
    description,
    keywords: [
      "grade calculator",
      "grade calculator online",
      "free grade calculator",
      "class grade calculator",
      "school grade calculator",
      "student grade calculator",
      "calculate my grade",
      "final grade calculator",
      "weighted grade calculator",
      "gpa calculator",
      "percentage grade calculator",
      "easy grader",
      ...keywords,
    ],
    authors: [{ name: "Grade Calculator Editorial & Academic Team" }],
    creator: "Grade Calculator",
    publisher: "Grade Calculator",
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph: {
      title: formattedTitle,
      description,
      url: canonicalUrl,
      siteName: "GradeCalculator.dev",
      locale: currentOgLocale,
      type,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${formattedTitle} - Free Online Grade Calculator`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
      creator: "@gradecalculato",
      site: "@gradecalculato",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

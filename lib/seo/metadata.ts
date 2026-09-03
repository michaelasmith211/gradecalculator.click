import { Metadata } from "next";

export const SITE_NAME = "Grade Calculator";
export const SITE_URL = "https://gradecalculator.dev";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface PageMetaParams {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
}

export function constructMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
}: PageMetaParams): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  // Ensure title contains the main keyword "Grade Calculator" cleanly without redundant repetition
  const formattedTitle = title.toLowerCase().includes("grade calculator")
    ? title
    : `${title} – ${SITE_NAME}`;

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
      canonical: url,
    },
    openGraph: {
      title: formattedTitle,
      description,
      url,
      siteName: "GradeCalculator.dev",
      locale: "en_US",
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

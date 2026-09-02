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

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: [
      "grade calculator",
      "gpa calculator",
      "final grade calculator",
      "weighted grade calculator",
      "calculate grades",
      "test score grader",
      ...keywords,
    ],
    authors: [{ name: "Grade Calculator Editorial Team" }],
    creator: "Grade Calculator",
    publisher: "Grade Calculator",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${title} - Grade Calculator Online`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [DEFAULT_OG_IMAGE],
      creator: "@gradecalculator",
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

import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateWebApplicationSchema,
  generateFAQSchema,
} from "@/lib/seo/schema";
import HomeView from "@/components/views/HomeView";
import HeroHeader from "@/components/HeroHeader";
import {
  getLocalizedHomeSummary,
  getLocalizedFigureCaption,
  getLocalizedHomeFaqs,
} from "@/lib/i18n/localizedContent";

export const metadata = constructMetadata({
  title: "Grade Calculator – Calculate Your Grade & GPA Instantly",
  description:
    "Free online Grade Calculator to calculate course percentages, letter grades (A-F), weighted averages, and 4.0 GPA instantly. Easy, private, and mobile-friendly.",
  path: "/",
  keywords: [
    "grade calculator",
    "grade calculator online",
    "calculate my grade",
    "calculate grade percentage",
    "letter grade calculator",
    "school grade calculator",
    "student grade calculator",
    "assignment grade calculator",
    "current grade calculator",
    "class grade calculator",
  ],
});

export default function HomePage() {
  const appSchema = generateWebApplicationSchema({
    name: "Grade Calculator",
    description:
      "Free online Grade Calculator to calculate course percentages, letter grades, and 4.0 GPA instantly.",
    path: "/",
  });

  const homeSummary = getLocalizedHomeSummary("en", "Grade Calculator");
  const figureCaption = getLocalizedFigureCaption("en");
  const homeFaqs = getLocalizedHomeFaqs("en");
  const faqSchema = generateFAQSchema(homeFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeView
        locale="en"
        homeSummary={homeSummary}
        figureCaption={figureCaption}
        homeFaqs={homeFaqs}
        heroHeaderSlot={
          <HeroHeader
            title="Grade Calculator"
            tagline="Calculate your grade, percentage, and 4.0 GPA instantly."
          />
        }
      />
    </>
  );
}

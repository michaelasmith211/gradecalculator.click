import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateWebApplicationSchema,
} from "@/lib/seo/schema";
import HomeView from "@/components/views/HomeView";

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <HomeView />
    </>
  );
}

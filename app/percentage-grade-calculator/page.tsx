import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import PercentageGradeCalculator from "@/components/calculators/PercentageGradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Percentage Grade Calculator – Score & Fraction Converter",
  description:
    "Convert points earned into exact percentages, letter grades, and calculate raw points required for any percentage goal on assignments.",
  path: "/percentage-grade-calculator",
  keywords: [
    "percentage grade calculator",
    "grade percentage converter",
    "points to percentage",
    "fraction to percentage grade",
    "score percentage calculator",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "How do you turn a score into a percentage?",
    answer:
      "Divide the points you scored by the total possible points and multiply by 100.\nExample: 38 out of 45 = (38 ÷ 45) × 100 = 84.44% (Grade B).",
  },
  {
    question: "How do I calculate what 80% or 90% of a point total is?",
    answer:
      "Multiply the total points by the percentage in decimal form.\nExample: To get 85% on a 160-point final project: 160 × 0.85 = 136 points needed.",
  },
  {
    question: "What percentage is considered passing in most schools?",
    answer:
      "In the United States standard grading scale, a 60% (D- or D) is usually the lowest passing score for high school graduation credit, while college prerequisite courses often require at least a 70% (C or C-) to count towards major requirements.",
  },
];

export default function PercentageGradeCalculatorPage() {
  const breadcrumbs = [{ name: "Percentage Grade Calculator", url: "/percentage-grade-calculator" }];

  const appSchema = generateWebApplicationSchema({
    name: "Percentage Grade Calculator",
    description: "Convert test fractions, assignment points, and percentages into letter grades.",
    path: "/percentage-grade-calculator",
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Percentage Grade Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Quickly convert test fractions into percentages or calculate how many points you need on an exam to score a target percentage.
        </p>
      </div>

      <PercentageGradeCalculator />

      <AdPlaceholder format="horizontal" slotId="pct-grade-mid-ad" />

      <FAQAccordion faqs={faqs} />

      <RelatedCalculators currentKey="percentage-grade-calculator" />
    </div>
  );
}

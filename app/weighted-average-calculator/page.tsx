import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import WeightedGradeCalculator from "@/components/calculators/WeightedGradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Weighted Average Calculator – Values, Weights & Contributions",
  description:
    "Calculate the statistical weighted average for any data set, grades, or financial models with custom weights and automatic normalization.",
  path: "/weighted-average-calculator",
  keywords: [
    "weighted average calculator",
    "calculate weighted mean",
    "weighted statistical average",
    "weights and values calculator",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "What is a weighted average?",
    answer:
      "A weighted average is a calculation where each data point is multiplied by a numerical weight reflecting its relative importance, rather than treating each value equally as in a simple arithmetic mean.",
  },
  {
    question: "What is the formula for a weighted average?",
    answer:
      "Weighted Average = Σ (x_i × w_i) ÷ Σ w_i, where x_i is each value and w_i is each corresponding weight.",
  },
];

export default function WeightedAverageCalculatorPage() {
  const breadcrumbs = [
    { name: "Weighted Grade Calculator", url: "/weighted-grade-calculator" },
    { name: "Weighted Average", url: "/weighted-average-calculator" },
  ];

  const appSchema = generateWebApplicationSchema({
    name: "Weighted Average Calculator",
    description: "Calculate weighted averages and relative value contributions for grades and statistics.",
    path: "/weighted-average-calculator",
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
          Weighted Average Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Compute the weighted mean of any set of values and weights with instant normalization and visual contributions.
        </p>
      </div>

      <WeightedGradeCalculator title="Weighted Average Calculator" subtitle="Enter your values/scores and their corresponding percentage weights." />

      <AdPlaceholder format="horizontal" slotId="weighted-avg-mid-ad" />

      <FAQAccordion faqs={faqs} />

      <RelatedCalculators currentKey="weighted-average-calculator" recommendedKeys={["weighted-grade-calculator", "average-grade-calculator", "grade-calculator", "gpa-calculator"]} />
    </div>
  );
}

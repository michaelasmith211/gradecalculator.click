import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateWebApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
} from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import PercentageGradeCalculator from "@/components/calculators/PercentageGradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
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
    "calculate percentage grade",
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

  const howToSchema = generateHowToSchema({
    name: "How to Convert Scores into Percentage Grades",
    description: "Step-by-step method to convert fraction scores to percentages.",
    path: "/percentage-grade-calculator",
    steps: [
      {
        name: "Enter Score Earned",
        text: "Input the number of points you achieved on the assignment or exam.",
      },
      {
        name: "Enter Total Points Possible",
        text: "Input the maximum possible points available for that coursework item.",
      },
      {
        name: "View Percentage and Letter Grade",
        text: "The tool computes the decimal fraction, percentage score, letter grade, and 4.0 GPA points.",
      },
    ],
  });

  const tocItems = [
    { id: "calculator", label: "Percentage Converter Tool" },
    { id: "percentage-formulas", label: "Score Conversion Math" },
    { id: "faqs", label: "Frequently Asked Questions" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Percentage Grade Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Quickly convert test fractions into percentages or calculate how many points you need on an exam to score a target percentage.
        </p>
      </div>

      <div id="calculator">
        <PercentageGradeCalculator />
      </div>

      {/* SEO Snippet Box */}
      <SeoSummaryBox
        title="Percentage Conversion Quick Guide"
        quickAnswer="To convert any test score into a percentage, divide the points earned by total possible points and multiply by 100."
        formula="Percentage (%) = (Score Earned ÷ Total Possible) × 100"
        keyTakeaways={[
          "Instant two-way conversion (Points &rarr; Percentage, and Target % &rarr; Points Needed)",
          "Matches standard US Plus/Minus, 10-point, and 7-point letter grade scales",
          "Calculates quality points on a standard 4.0 GPA scale",
        ]}
      />

      <TableOfContents items={tocItems} />

      <AdPlaceholder format="horizontal" slotId="pct-grade-mid-ad" />

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="Percentage Grade Calculator – Score & Fraction Converter"
        description="Convert points earned into exact percentages, letter grades, and calculate raw points required for any goal."
      />

      <RelatedCalculators currentKey="percentage-grade-calculator" />
    </div>
  );
}

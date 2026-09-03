import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateWebApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  generateArticleSchema,
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
  {
    question: "How do decimals and rounding work in grade calculations?",
    answer:
      "Standard academic convention rounds to the nearest whole percentage or tenth (e.g. 89.5% standardly rounds up to 90.0% A-). Always verify your instructor's specific rounding rules in the course syllabus.",
  },
];

export default function PercentageGradeCalculatorPage() {
  const breadcrumbs = [{ name: "Percentage Grade Calculator", url: "/percentage-grade-calculator" }];

  const appSchema = generateWebApplicationSchema({
    name: "Percentage Grade Calculator",
    description: "Convert test fractions, assignment points, and percentages into letter grades.",
    path: "/percentage-grade-calculator",
  });

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

  const articleSchema = generateArticleSchema({
    headline: "Score-to-Percentage Grade Conversion Guide: Formulas & Practical Examples",
    description: "Learn how to convert raw scores into percentages, calculate required point targets, and determine grade letter equivalents.",
    path: "/percentage-grade-calculator",
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const tocItems = [
    { id: "calculator", label: "Percentage Converter Tool" },
    { id: "percentage-formulas", label: "Score Conversion Math & Formulas" },
    { id: "common-fractions", label: "Quick Fraction-to-Percentage Reference" },
    { id: "faqs", label: "Frequently Asked Questions" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Percentage Grade Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Quickly convert test fractions into percentages or calculate how many points you need on an exam or project to score your desired percentage grade.
        </p>
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
          "Includes 1-tap reset and mobile touch input controls",
        ]}
      />

      <TableOfContents items={tocItems} />

      <div id="calculator">
        <PercentageGradeCalculator />
      </div>

      <AdPlaceholder format="horizontal" slotId="pct-grade-mid-ad" />

      {/* Section 1: Formulas */}
      <section id="percentage-formulas" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          The Two Key Percentage Grade Formulas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 text-sm">1. Score to Percentage</span>
            <p className="font-mono text-slate-800">Percentage = (Earned &divide; Total) &times; 100</p>
            <p className="text-slate-600">Example: 46 out of 50 = (46 &divide; 50) &times; 100 = <strong>92.0% (A-)</strong>.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 text-sm">2. Target Percentage to Points</span>
            <p className="font-mono text-slate-800">Points Needed = Total Points &times; (Target % &divide; 100)</p>
            <p className="text-slate-600">Example: Want 85% on 150-pt paper = 150 &times; 0.85 = <strong>127.5 points</strong>.</p>
          </div>
        </div>
      </section>

      {/* Section 2: Quick Reference */}
      <section id="common-fractions" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Common Test Fraction to Percentage Reference
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-slate-500 block">19 / 20</span>
            <span className="text-base font-bold text-slate-900">95.0% (A)</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-slate-500 block">45 / 50</span>
            <span className="text-base font-bold text-slate-900">90.0% (A-)</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-slate-500 block">41 / 50</span>
            <span className="text-base font-bold text-slate-900">82.0% (B-)</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-slate-500 block">35 / 50</span>
            <span className="text-base font-bold text-slate-900">70.0% (C-)</span>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="Percentage Grade Calculator – Score & Fraction Converter"
        description="Convert points earned into exact percentages, letter grades, and calculate raw points required for any goal."
      />

      <RelatedCalculators
        currentKey="percentage-grade-calculator"
        recommendedKeys={[
          "grade-calculator",
          "test-grade-calculator",
          "points-grade-calculator",
          "average-grade-calculator",
        ]}
      />
    </div>
  );
}

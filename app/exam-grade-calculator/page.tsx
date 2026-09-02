import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import TestGradeCalculator from "@/components/calculators/TestGradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Exam Grade Calculator – Midterm & Final Exam Score Checker",
  description:
    "Calculate your score on midterms, finals, and comprehensive exams. Generate grading charts and evaluate exam point values instantly.",
  path: "/exam-grade-calculator",
  keywords: [
    "exam grade calculator",
    "midterm grade calculator",
    "calculate exam score",
    "comprehensive exam grading",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "How do I calculate my exam grade if questions have different point values?",
    answer:
      "If questions have custom point values (e.g. multiple choice worth 2 points each and essays worth 20 points), sum the total points earned and divide by the total exam points possible.",
  },
  {
    question: "How does my midterm exam score affect my final grade?",
    answer:
      "Multiply your midterm exam score (in decimal form) by the midterm weight stated on your course syllabus. For example, an 88% on a midterm worth 25% contributes 22.0 percentage points directly to your course grade.",
  },
];

export default function ExamGradeCalculatorPage() {
  const breadcrumbs = [
    { name: "Test Grade Calculator", url: "/test-grade-calculator" },
    { name: "Exam Grade", url: "/exam-grade-calculator" },
  ];

  const appSchema = generateWebApplicationSchema({
    name: "Exam Grade Calculator",
    description: "Calculate scores and generate charts for midterm and final examinations.",
    path: "/exam-grade-calculator",
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
          Exam Grade Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Score your midterm and final exams with precision. Enter the total exam questions or point total to see your letter grade and score chart.
        </p>
      </div>

      <TestGradeCalculator title="Exam Score & Grade Scale Calculator" subtitle="Enter total exam items and incorrect responses." />

      <AdPlaceholder format="horizontal" slotId="exam-grade-mid-ad" />

      <FAQAccordion faqs={faqs} />

      <RelatedCalculators currentKey="exam-grade-calculator" recommendedKeys={["final-grade-calculator", "test-grade-calculator", "weighted-grade-calculator", "grade-calculator"]} />
    </div>
  );
}

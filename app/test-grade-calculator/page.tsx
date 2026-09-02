import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import TestGradeCalculator from "@/components/calculators/TestGradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Test Grade Calculator – Easy Grader Chart & Score Scale",
  description:
    "Free Test Grade Calculator and Easy Grader sheet. Enter total number of questions and wrong answers to view percentages and complete printable grading charts.",
  path: "/test-grade-calculator",
  keywords: [
    "test grade calculator",
    "easy grader",
    "quiz grade calculator",
    "test score chart",
    "teacher test grader",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "How does the Easy Grader test chart work?",
    answer:
      "Enter the total number of test questions (e.g. 50). The chart automatically creates a full grading table showing the exact percentage and letter grade for 0 wrong, 1 wrong, 2 wrong, all the way down, making it fast and easy for teachers and students to grade papers.",
  },
  {
    question: "How do I calculate a test score percentage?",
    answer:
      "Subtract the number of missed questions from the total questions to get your correct count, divide by the total questions, and multiply by 100.\nExample: Missed 6 out of 40 questions = (34 ÷ 40) × 100 = 85.0% (Grade B).",
  },
];

export default function TestGradeCalculatorPage() {
  const breadcrumbs = [{ name: "Test Grade Calculator", url: "/test-grade-calculator" }];

  const appSchema = generateWebApplicationSchema({
    name: "Test Grade Calculator",
    description: "Generate Easy Grader charts and calculate scores for quizzes and tests.",
    path: "/test-grade-calculator",
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
          Test Grade Calculator & Easy Grader
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Quickly grade tests, quizzes, and exams. Enter total questions and wrong answers to see scores or reference the automatic grading chart below.
        </p>
      </div>

      <TestGradeCalculator />

      <AdPlaceholder format="horizontal" slotId="test-grade-mid-ad" />

      <FAQAccordion faqs={faqs} />

      <RelatedCalculators currentKey="test-grade-calculator" recommendedKeys={["exam-grade-calculator", "percentage-grade-calculator", "average-grade-calculator", "grade-calculator"]} />
    </div>
  );
}

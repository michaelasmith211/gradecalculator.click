import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateWebApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
} from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import TestGradeCalculator from "@/components/calculators/TestGradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
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
    "exam score calculator",
    "quick grader",
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
  {
    question: "How many questions can I miss and still get an A?",
    answer:
      "On a standard 10-point scale (A = 90%), you can miss up to 10% of total questions. On a 50-question test, 10% is 5 questions; on a 100-question test, you can miss up to 10 questions.",
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

  const howToSchema = generateHowToSchema({
    name: "How to Grade a Test with an Easy Grader Chart",
    description: "Step-by-step instructions for calculating test scores from wrong answers.",
    path: "/test-grade-calculator",
    steps: [
      {
        name: "Count Total Questions",
        text: "Input the total number of questions on the test or quiz (e.g., 25 or 50).",
      },
      {
        name: "Input Wrong Answers",
        text: "Enter how many questions were answered incorrectly.",
      },
      {
        name: "Review Score and Grading Table",
        text: "View the percentage score, letter grade, and reference the complete table of scores for all question counts.",
      },
    ],
  });

  const tocItems = [
    { id: "calculator", label: "Interactive Test Grader" },
    { id: "grading-chart", label: "Easy Grader Score Table" },
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
          Test Grade Calculator & Easy Grader
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Quickly grade tests, quizzes, and exams. Enter total questions and wrong answers to see scores or reference the automatic grading chart below.
        </p>
      </div>

      <div id="calculator">
        <TestGradeCalculator />
      </div>

      {/* SEO Snippet Box */}
      <SeoSummaryBox
        title="Test Grade Quick Reference"
        quickAnswer="Test score percentage is calculated by subtracting incorrect answers from total questions, dividing by total questions, and multiplying by 100."
        formula="Test Score (%) = [ (Total Questions - Wrong Answers) ÷ Total Questions ] × 100"
        keyTakeaways={[
          "Generates a full 0–50 wrong answer Easy Grader table instantly",
          "Ideal for teachers grading stacks of quizzes, exams, and worksheets",
          "Interactive slider and number inputs for rapid paper scoring",
        ]}
      />

      <TableOfContents items={tocItems} />

      <AdPlaceholder format="horizontal" slotId="test-grade-mid-ad" />

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="Test Grade Calculator – Easy Grader Chart & Score Scale"
        description="Free Test Grade Calculator and Easy Grader sheet for quick quiz and exam scoring."
      />

      <RelatedCalculators currentKey="test-grade-calculator" recommendedKeys={["exam-grade-calculator", "percentage-grade-calculator", "average-grade-calculator", "grade-calculator"]} />
    </div>
  );
}

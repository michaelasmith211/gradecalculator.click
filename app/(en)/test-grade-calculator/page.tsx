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
  {
    question: "How do I calculate partial credit on questions?",
    answer:
      "If you earned partial credit (such as 0.5 on a 1-point question), you can enter decimals in our percentage calculator tool or count the missed fraction (e.g., 0.5 wrong).",
  },
];

export default function TestGradeCalculatorPage() {
  const breadcrumbs = [{ name: "Test Grade Calculator", url: "/test-grade-calculator" }];

  const appSchema = generateWebApplicationSchema({
    name: "Test Grade Calculator",
    description: "Generate Easy Grader charts and calculate scores for quizzes and tests.",
    path: "/test-grade-calculator",
  });

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

  const articleSchema = generateArticleSchema({
    headline: "Test Grading Guide: Easy Grader Quick Reference Charts & Scoring Math",
    description: "Learn how to use Easy Grader score matrices, compute test percentages from missed questions, and calculate grade scales.",
    path: "/test-grade-calculator",
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const tocItems = [
    { id: "calculator", label: "Interactive Test Grader" },
    { id: "grading-chart-guide", label: "How to Use the Easy Grader Chart" },
    { id: "quick-thresholds", label: "Missed Questions Cutoff Thresholds" },
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
          Test Grade Calculator & Easy Grader
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Quickly grade tests, quizzes, and exams. Enter total questions and wrong answers to see scores or reference the automatic grading chart below.
        </p>
      </div>

      {/* SEO Snippet Box */}
      <SeoSummaryBox
        title="Test Grade Quick Reference"
        quickAnswer="Test score percentage is calculated by subtracting incorrect answers from total questions, dividing by total questions, and multiplying by 100."
        formula="Test Score (%) = [ (Total Questions - Wrong Answers) ÷ Total Questions ] × 100"
        keyTakeaways={[
          "Generates a full 0–50 wrong answer Easy Grader table instantly",
          "Ideal for teachers grading stacks of quizzes, exams, and worksheets",
          "Interactive number inputs and decimal support for rapid paper scoring",
          "Includes 4.0 GPA quality points and letter grade conversions",
        ]}
      />

      <TableOfContents items={tocItems} />

      <div id="calculator">
        <TestGradeCalculator />
      </div>

      <AdPlaceholder format="horizontal" slotId="test-grade-mid-ad" />

      {/* Section 1: Guide */}
      <section id="grading-chart-guide" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          How to Use the Easy Grader Score Chart
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Traditional cardboard "EZ Graders" have been used by educators for decades to speed up test evaluation. Our digital version generates a custom grading matrix for any test size (from 5 to 200 questions) in real time:
        </p>
        <ol className="text-xs sm:text-sm text-slate-700 list-decimal list-inside space-y-2 leading-relaxed">
          <li>Enter your test's total question count in the <strong>Total Questions</strong> field above.</li>
          <li>Scroll through the <strong>Easy Grader Quick Reference</strong> table to find the number of incorrect marks.</li>
          <li>Read off the exact percentage and letter grade immediately without recalculating each paper.</li>
        </ol>
      </section>

      {/* Section 2: Cutoffs */}
      <section id="quick-thresholds" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Missed Questions Cutoff Guide for Popular Test Sizes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm">25-Question Test</span>
            <ul className="text-slate-600 space-y-1 pt-1">
              <li>• <strong>A (90%+):</strong> Miss 0 to 2</li>
              <li>• <strong>B (80%+):</strong> Miss 3 to 5</li>
              <li>• <strong>C (70%+):</strong> Miss 6 to 7</li>
              <li>• <strong>D (60%+):</strong> Miss 8 to 10</li>
            </ul>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm">50-Question Test</span>
            <ul className="text-slate-600 space-y-1 pt-1">
              <li>• <strong>A (90%+):</strong> Miss 0 to 5</li>
              <li>• <strong>B (80%+):</strong> Miss 6 to 10</li>
              <li>• <strong>C (70%+):</strong> Miss 11 to 15</li>
              <li>• <strong>D (60%+):</strong> Miss 16 to 20</li>
            </ul>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm">100-Question Test</span>
            <ul className="text-slate-600 space-y-1 pt-1">
              <li>• <strong>A (90%+):</strong> Miss 0 to 10</li>
              <li>• <strong>B (80%+):</strong> Miss 11 to 20</li>
              <li>• <strong>C (70%+):</strong> Miss 21 to 30</li>
              <li>• <strong>D (60%+):</strong> Miss 31 to 40</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="Test Grade Calculator – Easy Grader Chart & Score Scale"
        description="Free Test Grade Calculator and Easy Grader sheet for quick quiz and exam scoring."
      />

      <RelatedCalculators
        currentKey="test-grade-calculator"
        recommendedKeys={[
          "exam-grade-calculator",
          "percentage-grade-calculator",
          "average-grade-calculator",
          "grade-calculator",
        ]}
      />
    </div>
  );
}

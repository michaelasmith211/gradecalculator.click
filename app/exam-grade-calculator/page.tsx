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
  title: "Exam Grade Calculator – Midterm & Final Exam Score Checker",
  description:
    "Calculate your score on midterms, finals, and comprehensive exams. Generate grading charts and evaluate exam point values instantly.",
  path: "/exam-grade-calculator",
  keywords: [
    "exam grade calculator",
    "midterm grade calculator",
    "calculate exam score",
    "comprehensive exam grading",
    "exam percentage calculator",
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
  {
    question: "What is the best way to calculate exam curves?",
    answer:
      "If an exam is curved, professors either add flat points (e.g., +5% to every student's score) or set the highest score achieved as the new 100% baseline.",
  },
  {
    question: "How do I calculate multiple exam sections?",
    answer:
      "Sum the points earned across Section 1 (e.g., Multiple Choice 40/50) and Section 2 (e.g., Short Answer 45/50) to get 85/100 (85.0%).",
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

  const howToSchema = generateHowToSchema({
    name: "How to Calculate Midterm and Exam Grades",
    description: "Step-by-step method to compute exam percentages and letter grades.",
    path: "/exam-grade-calculator",
    steps: [
      {
        name: "Enter Exam Questions or Points",
        text: "Input the total number of questions or maximum points available on the exam.",
      },
      {
        name: "Input Missed Questions",
        text: "Enter how many questions were answered incorrectly or points deducted.",
      },
      {
        name: "Check Letter Grade and GPA Points",
        text: "Review your final exam percentage and corresponding letter grade.",
      },
    ],
  });

  const articleSchema = generateArticleSchema({
    headline: "How to Calculate Exam & Midterm Grades: Formulas & Curved Grading",
    description: "In-depth guide to exam scoring, question point weightings, curved tests, and final grade contributions.",
    path: "/exam-grade-calculator",
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const tocItems = [
    { id: "calculator", label: "Interactive Exam Grader" },
    { id: "midterm-weighting", label: "Midterm Weight & Course Contribution" },
    { id: "curved-exams", label: "How Exam Curves Work" },
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
          Exam Grade Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Score your midterm and final exams with precision. Enter the total exam questions or point total to see your exact percentage, letter grade, and full Easy Grader scoring chart.
        </p>
      </div>

      {/* SEO Snippet Box */}
      <SeoSummaryBox
        title="Exam Score Quick Guide"
        quickAnswer="Exam percentage is determined by dividing points earned by total exam points possible and multiplying by 100."
        formula="Exam Score (%) = (Points Earned ÷ Total Points Possible) × 100"
        keyTakeaways={[
          "Instant exam score grading chart generation for quick grading",
          "Calculates exact letter grade and 4.0 quality points",
          "Evaluates midterm and final exam contribution to overall course standing",
        ]}
      />

      <TableOfContents items={tocItems} />

      <div id="calculator">
        <TestGradeCalculator
          title="Exam Score & Grade Scale Calculator"
          subtitle="Enter total exam items and incorrect responses."
        />
      </div>

      <AdPlaceholder format="horizontal" slotId="exam-grade-mid-ad" />

      {/* Section 1: Midterm Weighting */}
      <section id="midterm-weighting" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          How Midterm Exam Scores Impact Your Final Grade
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          In high school and college courses, midterms often carry 20% to 30% of your total class grade. To determine how much an exam score contributes to your overall standing:
        </p>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs sm:text-sm text-slate-800 leading-relaxed">
          <strong>Grade Contribution Formula:</strong><br />
          Points Contributed (%) = (Exam Score % &divide; 100) &times; Syllabus Exam Weight %<br />
          Example: 88% on a 25% Midterm &rarr; 0.88 &times; 25 = 22.0% towards your final grade.
        </div>
      </section>

      {/* Section 2: Curved Exams */}
      <section id="curved-exams" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          How Professors Curve Exam Scores
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          When an exam is unusually difficult, instructors often apply one of three curve formulas:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm">Flat Point Curve</span>
            <p className="text-slate-600 leading-relaxed">Adds an equal number of bonus points (e.g. +5 pts) to every student's score.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm">Top Score Baseline</span>
            <p className="text-slate-600 leading-relaxed">Sets the highest student score (e.g. 94%) as the new 100% denominator.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm">Square Root Curve</span>
            <p className="text-slate-600 leading-relaxed">Calculates <code>New Score = &radic;(Raw Score) &times; 10</code> (e.g., 64% becomes 80%).</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="Exam Grade Calculator – Midterm & Final Exam Score Checker"
        description="Calculate your score on midterms, finals, and comprehensive exams with instant grading charts."
      />

      <RelatedCalculators
        currentKey="exam-grade-calculator"
        recommendedKeys={[
          "final-grade-calculator",
          "test-grade-calculator",
          "weighted-grade-calculator",
          "grade-calculator",
        ]}
      />
    </div>
  );
}

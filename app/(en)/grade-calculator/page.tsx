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
import GradeCalculator from "@/components/calculators/GradeCalculator";
import GradeScaleTable from "@/components/GradeScaleTable";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Standard Grade Calculator – Calculate Course Percentage & Letter Grade",
  description:
    "Free online grade calculator to calculate your overall class grade, assignment percentages, total points earned, and letter grade on standard scales.",
  path: "/grade-calculator",
  keywords: [
    "grade calculator",
    "calculate class grade",
    "overall grade calculator",
    "assignment grade calculator",
    "total points grade calculator",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "How do I use this Grade Calculator?",
    answer:
      "Simply enter the name of your assignment, the score you earned, and the total possible points. Click '+ Add Another Assignment' to enter additional coursework. The calculator immediately displays your total points earned, total possible points, overall percentage, and letter grade.",
  },
  {
    question: "Can I customize the grading scale?",
    answer:
      "Yes! Click the 'Grading Scale' button on the calculator header. You can switch between standard plus/minus scales (A+ = 97%), straight 10-point scales (A = 90%), strict 7-point scales, or customize individual percentage cutoffs to match your syllabus.",
  },
  {
    question: "How do I calculate my current grade with missing assignments?",
    answer:
      "Enter only the assignments that have already been graded and returned. The calculator will determine your current standing based strictly on completed work.",
  },
  {
    question: "What is the difference between a points grade and a weighted grade?",
    answer:
      "In a points-based system, all points have equal value (a 100-point exam is worth twice as much as a 50-point quiz). In a weighted grading system, categories have fixed percentage weights (e.g., Homework is worth 20% total regardless of the number of homework points).",
  },
  {
    question: "How do I drop the lowest grade?",
    answer:
      "If your instructor drops your lowest quiz or homework score, simply omit that assignment row from the calculator or remove it using the trash icon.",
  },
];

export default function GradeCalculatorPage() {
  const breadcrumbs = [{ name: "Grade Calculator", url: "/grade-calculator" }];

  const appSchema = generateWebApplicationSchema({
    name: "Standard Grade Calculator",
    description: "Calculate overall course grade, points earned, percentage, and letter grade.",
    path: "/grade-calculator",
  });

  const howToSchema = generateHowToSchema({
    name: "How to Calculate Your Class Grade",
    description: "Step-by-step instructions to calculate your total points and percentage grade.",
    path: "/grade-calculator",
    steps: [
      {
        name: "List Your Graded Coursework",
        text: "Gather all returned homework assignments, quizzes, essays, and exams.",
      },
      {
        name: "Sum Points Earned",
        text: "Add up all points you received across all completed assignments.",
      },
      {
        name: "Sum Total Possible Points",
        text: "Add up the maximum point values for the same completed assignments.",
      },
      {
        name: "Divide and Multiply by 100",
        text: "Divide total points earned by total possible points and multiply by 100 to get your percentage.",
      },
    ],
  });

  const articleSchema = generateArticleSchema({
    headline: "Complete Guide to Calculating Points-Based Course Grades",
    description: "Learn how points-based grading systems work with mathematical formulas, worked examples, and scale cutoffs.",
    path: "/grade-calculator",
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const tocItems = [
    { id: "calculator", label: "Interactive Calculator" },
    { id: "formula", label: "Grade Calculation Formula" },
    { id: "step-by-step-example", label: "Step-by-Step Worked Example" },
    { id: "grading-scales", label: "Grading Scale Reference" },
    { id: "faq", label: "Frequently Asked Questions" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Standard Grade Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Calculate your overall grade percentage, letter grade, and 4.0 GPA points from assignment scores. Fast, accurate, and customized for middle school, high school, and college courses.
        </p>
      </div>

      <SeoSummaryBox
        title="Grade Calculator Quick Overview"
        quickAnswer="To calculate your overall grade in a points-based system, sum all points earned, divide by the total possible points, and multiply by 100."
        formula="Grade (%) = (Total Points Earned ÷ Total Possible Points) × 100"
        keyTakeaways={[
          "Live real-time calculations with dynamic letter grade conversion",
          "Supports standard 4.0 GPA quality points and honors tracking",
          "Customizable grading scale presets (Standard Plus/Minus, 10-Point, 7-Point)",
          "100% private in-browser computation with zero server storage",
        ]}
      />

      <TableOfContents items={tocItems} />

      <div id="calculator">
        <GradeCalculator />
      </div>

      <AdPlaceholder format="horizontal" slotId="grade-calc-mid-ad" />

      {/* Educational Guide Section */}
      <section id="formula" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          How to Calculate Your Class Grade
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Calculating your overall course grade helps you understand where you stand academically and what scores you need on upcoming exams to reach your target GPA.
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs sm:text-sm text-slate-800 leading-relaxed">
          <strong>Standard Points Formula:</strong><br />
          Overall Percentage (%) = (Sum of Points Earned &divide; Sum of Total Possible Points) &times; 100
        </div>

        <div id="step-by-step-example" className="space-y-3 pt-2">
          <h3 className="text-lg font-bold text-slate-900">Step-by-Step Example Calculation</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Suppose you are enrolled in Biology and have received grades on the following four assignments:
          </p>
          <ul className="text-xs sm:text-sm text-slate-700 list-disc list-inside space-y-1.5">
            <li><strong>Lab Report 1:</strong> 45 / 50 points (90.0%)</li>
            <li><strong>Quiz 1:</strong> 18 / 20 points (90.0%)</li>
            <li><strong>Midterm Exam:</strong> 88 / 100 points (88.0%)</li>
            <li><strong>Homework 1:</strong> 29 / 30 points (96.7%)</li>
          </ul>
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs sm:text-sm text-slate-800 space-y-1">
            <div><strong>Total Points Earned:</strong> 45 + 18 + 88 + 29 = <strong>180 points</strong></div>
            <div><strong>Total Possible Points:</strong> 50 + 20 + 100 + 30 = <strong>200 points</strong></div>
            <div><strong>Final Calculation:</strong> (180 &divide; 200) &times; 100 = <strong className="text-indigo-700">90.0%</strong> (Letter Grade: <strong>A-</strong>, 3.7 GPA Points).</div>
          </div>
        </div>
      </section>

      {/* Grade Scale Reference */}
      <section id="grading-scales" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Grading Scale Reference Table
        </h2>
        <GradeScaleTable />
      </section>

      {/* FAQs */}
      <div id="faq">
        <FAQAccordion faqs={faqs} />
      </div>

      {/* Social Share */}
      <SocialShare
        title="Standard Grade Calculator – Calculate Course Percentage & Letter Grade"
        description="Calculate your overall grade percentage, letter grade, and GPA points from assignment scores."
      />

      {/* Related Calculators */}
      <RelatedCalculators currentKey="grade-calculator" />
    </div>
  );
}

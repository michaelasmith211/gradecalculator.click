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
import AverageGradeCalculator from "@/components/calculators/AverageGradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Average Grade Calculator – Calculate Test & Assignment Mean",
  description:
    "Free Average Grade Calculator. Calculate mean, median, high, and low scores for any set of grades or test results. Supports single entry and comma-separated paste.",
  path: "/average-grade-calculator",
  keywords: [
    "average grade calculator",
    "calculate grade average",
    "test score average",
    "mean grade calculator",
    "assignment average calculator",
    "grade mean median calculator",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "How do you calculate a simple grade average?",
    answer:
      "Add together all your numerical grades and divide the sum by the total number of grades.\nExample: If your test scores are 85, 90, and 95:\nSum = 85 + 90 + 95 = 270\nAverage = 270 ÷ 3 = 90.0% (Grade A-).",
  },
  {
    question: "What is the difference between mean and median in grades?",
    answer:
      "The 'mean' is the standard average (sum divided by count). The 'median' is the middle score when all grades are lined up in order from lowest to highest. The median is useful when a single unusually low score (like a 0 on a missed quiz) skews your average downward.",
  },
  {
    question: "Can I drop my lowest grade with this calculator?",
    answer:
      "Yes, simply look at the statistical summary to identify your lowest score and click the trash can icon next to that row to see how your average improves immediately.",
  },
  {
    question: "How do I quickly average 10 or more assignments?",
    answer:
      "Switch to the 'Quick Paste' tab at the top of the calculator and paste your list of numbers separated by commas or spaces (e.g. 85, 92, 78, 100, 88).",
  },
];

export default function AverageGradeCalculatorPage() {
  const breadcrumbs = [{ name: "Average Grade Calculator", url: "/average-grade-calculator" }];

  const appSchema = generateWebApplicationSchema({
    name: "Average Grade Calculator",
    description: "Calculate statistical mean, median, and range across grades and exam scores.",
    path: "/average-grade-calculator",
  });

  const howToSchema = generateHowToSchema({
    name: "How to Calculate the Average of Your Grades",
    description: "Step-by-step instructions for computing the mean and median of multiple coursework scores.",
    path: "/average-grade-calculator",
    steps: [
      {
        name: "List Your Scores",
        text: "Input each grade individually or paste a comma-separated list of numbers (e.g. 88, 92, 79, 95).",
      },
      {
        name: "Sum All Numbers",
        text: "Add up every score in the dataset.",
      },
      {
        name: "Divide by the Count",
        text: "Divide the sum by the total count of assignments to find the mathematical mean percentage.",
      },
      {
        name: "Review Statistics",
        text: "Examine the mean, median, highest score, lowest score, and corresponding letter grade.",
      },
    ],
  });

  const articleSchema = generateArticleSchema({
    headline: "How to Calculate Grade Averages: Mean, Median & Outlier Analysis",
    description: "Complete educational guide on arithmetic averages, finding medians, dropping lowest quiz scores, and interpreting grade distributions.",
    path: "/average-grade-calculator",
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const tocItems = [
    { id: "calculator", label: "Average Grade Calculator" },
    { id: "mean-vs-median", label: "Mean vs. Median in Grading" },
    { id: "dropping-scores", label: "How Dropping Lowest Score Affects Average" },
    { id: "faqs", label: "Frequently Asked Questions" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Average Grade Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Quickly compute the arithmetic average (mean), median, and score distribution for a list of test grades, quizzes, or homework assignments.
        </p>
      </div>

      {/* SEO Snippet Box */}
      <SeoSummaryBox
        title="Grade Average Quick Summary"
        quickAnswer="To calculate the average of multiple test grades, add all the percentage scores together and divide by the total number of tests."
        formula="Average = (Grade₁ + Grade₂ + ... + Gradeₙ) ÷ Count"
        keyTakeaways={[
          "Supports both single-row entry and quick comma-separated copy/pasting",
          "Calculates mean, median, highest score, lowest score, and score count",
          "Translates overall average into standard letter grade (A–F) and 4.0 GPA points",
          "Visual distribution breakdown and instant reset button",
        ]}
      />

      <TableOfContents items={tocItems} />

      <div id="calculator">
        <AverageGradeCalculator />
      </div>

      <AdPlaceholder format="horizontal" slotId="avg-grade-mid-ad" />

      {/* Section 1: Mean vs Median */}
      <section id="mean-vs-median" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Understanding Mean vs. Median in Academic Grading
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          While class syllabi use the arithmetic <strong>mean</strong> as the official overall grade, looking at the <strong>median</strong> is essential when you have an outlier (such as an unexcused 0% on a missed assignment):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 text-sm">Arithmetic Mean</span>
            <p className="font-mono text-slate-800">Mean = Sum of Scores &divide; Count</p>
            <p className="text-slate-600 leading-relaxed">Reflects every single point earned. Sensitive to extreme low or high outliers.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 text-sm">Statistical Median</span>
            <p className="font-mono text-slate-800">Median = Center Value of Sorted List</p>
            <p className="text-slate-600 leading-relaxed">Represents typical daily performance independent of a single zero score.</p>
          </div>
        </div>
      </section>

      {/* Section 2: Dropping Lowest Score */}
      <section id="dropping-scores" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          How Dropping the Lowest Quiz Boosts Your Grade
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Many professors drop your lowest quiz score at the end of the term. Here is a realistic demonstration of how dropping one bad grade dramatically shifts your average:
        </p>
        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs sm:text-sm text-slate-800 space-y-2">
          <div><strong>Five Quiz Scores:</strong> 92, 88, 95, 40 (sick day), 90</div>
          <div><strong>All 5 Quizzes Included:</strong> (92 + 88 + 95 + 40 + 90) &divide; 5 = 405 &divide; 5 = <strong className="text-rose-700">81.0% (Grade: B-)</strong></div>
          <div><strong>Lowest Score (40) Dropped:</strong> (92 + 88 + 95 + 90) &divide; 4 = 365 &divide; 4 = <strong className="text-emerald-700 font-bold text-base">91.25% (Grade: A-)</strong></div>
          <div className="text-slate-600 text-xs pt-1">Dropping the single lowest outlier boosted the final quiz grade by more than 10 full percentage points.</div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="Average Grade Calculator – Calculate Test & Assignment Mean"
        description="Calculate the mean, median, high, and low scores for any set of grades or test results instantly."
      />

      <RelatedCalculators
        currentKey="average-grade-calculator"
        recommendedKeys={[
          "grade-calculator",
          "test-grade-calculator",
          "percentage-grade-calculator",
          "weighted-grade-calculator",
        ]}
      />
    </div>
  );
}

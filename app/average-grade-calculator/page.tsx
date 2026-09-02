import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateWebApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
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
      "Yes, simply look at the statistical summary to identify your lowest score and click the trash can icon next to that row to see how your average improves.",
  },
];

export default function AverageGradeCalculatorPage() {
  const breadcrumbs = [{ name: "Average Grade Calculator", url: "/average-grade-calculator" }];

  const appSchema = generateWebApplicationSchema({
    name: "Average Grade Calculator",
    description: "Calculate statistical mean, median, and range across grades and exam scores.",
    path: "/average-grade-calculator",
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

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

  const tocItems = [
    { id: "calculator", label: "Average Calculator Tool" },
    { id: "mean-vs-median", label: "Mean vs. Median Comparison" },
    { id: "faqs", label: "Frequently Asked Questions" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Average Grade Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Quickly compute the mathematical average (mean), median, and score distribution for a list of test grades, quizzes, or assignments.
        </p>
      </div>

      <div id="calculator">
        <AverageGradeCalculator />
      </div>

      {/* SEO Snippet Box */}
      <SeoSummaryBox
        title="Grade Average Quick Summary"
        quickAnswer="To calculate the average of multiple test grades, add all the percentage scores together and divide by the total number of tests."
        formula="Average = (Grade₁ + Grade₂ + ... + Gradeₙ) ÷ Count"
        keyTakeaways={[
          "Supports both single-row entry and quick comma-separated copy/pasting",
          "Calculates mean, median, highest score, lowest score, and range",
          "Translates overall average into standard letter grade (A–F) and 4.0 GPA points",
        ]}
      />

      <TableOfContents items={tocItems} />

      <AdPlaceholder format="horizontal" slotId="avg-grade-mid-ad" />

      {/* Educational Guide */}
      <section id="mean-vs-median" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Understanding Mean vs. Median in Academic Grading
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          While most class syllabi use the arithmetic <strong>mean</strong> as the official overall grade, looking at the <strong>median</strong> is essential when you have an outlier (such as an unexcused 0% on an illness day).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm">Arithmetic Mean</span>
            <p className="text-slate-600">Sum of all scores divided by number of tests. Vulnerable to skew from zero scores.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm">Statistical Median</span>
            <p className="text-slate-600">The middle score in sorted order. Represents typical performance independent of extreme outliers.</p>
          </div>
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

      <RelatedCalculators currentKey="average-grade-calculator" />
    </div>
  );
}

import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import GradeCalculator from "@/components/calculators/GradeCalculator";
import GradeScaleTable from "@/components/GradeScaleTable";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Grade Calculator – Calculate Course Percentage & Letter Grade",
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
];

export default function GradeCalculatorPage() {
  const breadcrumbs = [{ name: "Grade Calculator", url: "/grade-calculator" }];

  const appSchema = generateWebApplicationSchema({
    name: "Standard Grade Calculator",
    description: "Calculate overall course grade, points earned, percentage, and letter grade.",
    path: "/grade-calculator",
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
          Standard Grade Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Calculate your overall grade percentage, letter grade, and GPA points from assignment scores. Works for middle school, high school, and college courses.
        </p>
      </div>

      <GradeCalculator />

      <AdPlaceholder format="horizontal" slotId="grade-calc-mid-ad" />

      {/* Educational Guide Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          How to Calculate Your Class Grade
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Calculating your overall course grade helps you understand where you stand academically and what scores you need on upcoming exams to reach your target GPA.
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 leading-relaxed">
          <strong>Standard Grade Formula:</strong><br />
          Overall Percentage (%) = (Sum of Points Earned &divide; Sum of Total Possible Points) &times; 100
        </div>

        <h3 className="text-lg font-bold text-slate-900">Step-by-Step Example Calculation</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Suppose you are enrolled in Biology and have received grades on the following four assignments:
        </p>
        <ul className="text-xs text-slate-700 list-disc list-inside space-y-1">
          <li><strong>Lab Report 1:</strong> 45 / 50 points (90%)</li>
          <li><strong>Quiz 1:</strong> 18 / 20 points (90%)</li>
          <li><strong>Midterm Exam:</strong> 88 / 100 points (88%)</li>
          <li><strong>Homework 1:</strong> 29 / 30 points (96.7%)</li>
        </ul>
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Total Points Earned:</strong> 45 + 18 + 88 + 29 = <strong>180 points</strong><br />
          <strong>Total Possible Points:</strong> 50 + 20 + 100 + 30 = <strong>200 points</strong><br />
          <strong>Calculation:</strong> (180 &divide; 200) &times; 100 = <strong>90.0%</strong> (Letter Grade: <strong className="text-indigo-600">A-</strong>).
        </p>
      </section>

      {/* Grade Scale Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Grading Scale Reference
        </h2>
        <GradeScaleTable />
      </section>

      {/* FAQs */}
      <FAQAccordion faqs={faqs} />

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

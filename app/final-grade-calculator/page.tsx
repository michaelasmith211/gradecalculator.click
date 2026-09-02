import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import FinalGradeCalculator from "@/components/calculators/FinalGradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Final Grade Calculator – What Do I Need on My Final?",
  description:
    "Calculate the exact score you need on your final exam to pass or achieve your desired overall class grade. Includes step-by-step formula and scenario tables.",
  path: "/final-grade-calculator",
  keywords: [
    "final grade calculator",
    "what do i need on my final exam",
    "calculate final exam score",
    "final exam grade needed",
    "exam target calculator",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "How do I calculate what I need on my final exam?",
    answer:
      "Use the mathematical formula:\nRequired Score = (Desired Grade - Current Grade × (1 - Final Exam Weight)) ÷ Final Exam Weight.\nFor example, if your current grade is 85%, your goal is 90%, and the final exam is worth 20% of your total grade: Required Score = (90 - 85 × 0.80) ÷ 0.20 = (90 - 68) ÷ 0.20 = 110%.",
  },
  {
    question: "What does it mean if my required final exam score is over 100%?",
    answer:
      "If the calculator shows a score over 100%, it means that even with a perfect score (100%) on the final exam, your cumulative grade will mathematically fall just short of your target grade unless the teacher offers extra credit or curves the exam.",
  },
  {
    question: "What if the required score is negative or 0%?",
    answer:
      "If the calculator shows 0% or a negative score, congratulations! You have already earned enough points throughout the semester that you have guaranteed your desired grade regardless of your final exam result (assuming no attendance or minimum passing requirements).",
  },
  {
    question: "How much is a final exam usually worth?",
    answer:
      "In high school courses, final exams typically range from 10% to 20% of the course grade. In college and university classes, final exams often carry between 20% and 40% (or higher in single-exam courses) of the overall grade.",
  },
];

export default function FinalGradeCalculatorPage() {
  const breadcrumbs = [{ name: "Final Grade Calculator", url: "/final-grade-calculator" }];

  const appSchema = generateWebApplicationSchema({
    name: "Final Grade Calculator",
    description: "Calculate what score you need on your final exam to earn your desired course grade.",
    path: "/final-grade-calculator",
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
          Final Grade Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Wondering what score you need on your final exam to get an A, B, or pass the class? Enter your current grade, goal grade, and exam weight to calculate your target instantly.
        </p>
      </div>

      <FinalGradeCalculator />

      <AdPlaceholder format="horizontal" slotId="final-grade-mid-ad" />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          The Final Exam Grade Formula Explained
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The math behind final exam calculations is based on a standard two-part weighted average. Your final overall course grade consists of two components:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="font-bold text-slate-900 block mb-1">1. Prior Coursework Contribution</span>
            <p className="text-slate-600">Current Grade &times; (1 - Final Exam Weight)</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="font-bold text-slate-900 block mb-1">2. Final Exam Contribution</span>
            <p className="text-slate-600">Final Exam Score &times; Final Exam Weight</p>
          </div>
        </div>

        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl font-mono text-xs text-indigo-950 leading-relaxed">
          <strong>Formula:</strong><br />
          Required Final Exam Score = [ Desired Grade - (Current Grade &times; (1 - Final Exam Weight)) ] &divide; Final Exam Weight
        </div>

        <h3 className="text-lg font-bold text-slate-900">Practical Real-World Example</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Let's walk through an example where Sarah wants to finish her Chemistry class with an <strong>A- (90%)</strong>:
        </p>
        <ul className="text-xs text-slate-700 list-disc list-inside space-y-1">
          <li><strong>Current Grade:</strong> 87%</li>
          <li><strong>Desired Overall Grade:</strong> 90%</li>
          <li><strong>Final Exam Weight:</strong> 25% (0.25 as a decimal)</li>
        </ul>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 space-y-1">
          <div>Step 1: Calculate prior weight = 1 - 0.25 = 0.75</div>
          <div>Step 2: Calculate prior contribution = 87 &times; 0.75 = 65.25%</div>
          <div>Step 3: Subtract from target = 90 - 65.25 = 24.75% needed from exam</div>
          <div>Step 4: Divide by exam weight = 24.75 &divide; 0.25 = <strong className="text-indigo-600">99.0%</strong></div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Sarah needs a <strong>99.0%</strong> on her final exam to reach an overall 90% in the class.
        </p>
      </section>

      <FAQAccordion faqs={faqs} />

      <RelatedCalculators currentKey="final-grade-calculator" />
    </div>
  );
}

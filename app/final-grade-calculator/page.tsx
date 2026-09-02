import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateWebApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
} from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import FinalGradeCalculator from "@/components/calculators/FinalGradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Final Grade Calculator – What Do I Need on My Final Exam?",
  description:
    "Free Final Grade Calculator. Calculate the exact score you need on your final exam to pass or achieve an A, B, or C. Includes formula breakdown and scenario matrix.",
  path: "/final-grade-calculator",
  keywords: [
    "final grade calculator",
    "what do i need on my final exam",
    "calculate final exam score",
    "final exam grade needed",
    "exam target calculator",
    "grade needed on final",
    "how to calculate final grade",
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
  {
    question: "Can I improve my grade with a final exam?",
    answer:
      "Yes! Because final exams typically carry heavy weighting (15% to 35% of total course points), earning a high score can boost a borderline B+ up to an A or save a failing grade into a passing status.",
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

  const howToSchema = generateHowToSchema({
    name: "How to Calculate the Final Exam Score Needed to Pass or Get an A",
    description:
      "Step-by-step method to compute the minimum percentage required on your final exam based on your current standing and syllabus weights.",
    path: "/final-grade-calculator",
    steps: [
      {
        name: "Determine Your Current Grade",
        text: "Check your online grade portal or syllabus to find your current overall percentage prior to the final exam.",
      },
      {
        name: "Choose Your Target Grade",
        text: "Select your desired final course grade cutoff (e.g., 90% for an A-, 80% for a B-, 70% for a C).",
      },
      {
        name: "Identify Final Exam Weight",
        text: "Locate the percentage weight assigned to the final exam on your course syllabus (e.g., 20% or 30%).",
      },
      {
        name: "Apply the Final Exam Formula",
        text: "Calculate Required Score = (Desired Grade - Current Grade × (1 - Exam Weight)) ÷ Exam Weight.",
      },
    ],
  });

  const tocItems = [
    { id: "calculator", label: "Final Exam Calculator" },
    { id: "formula-guide", label: "Final Exam Formula Explained" },
    { id: "worked-example", label: "Step-by-Step Worked Example" },
    { id: "strategies", label: "Final Exam Study Strategies" },
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
          Final Grade Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Wondering what score you need on your final exam to get an A, B, or pass the class? Enter your current grade, goal grade, and exam weight to calculate your target instantly.
        </p>
      </div>

      {/* Calculator Component */}
      <div id="calculator">
        <FinalGradeCalculator />
      </div>

      {/* Quick Summary / SERP Box */}
      <SeoSummaryBox
        title="Final Grade Calculator Quick Guide"
        quickAnswer="To find what score you need on a final exam, subtract the weighted contribution of your current grade from your desired final grade, then divide by the decimal weight of the final exam."
        formula="Required Score = [ Desired Grade - (Current Grade × (1 - Weight)) ] ÷ Weight"
        keyTakeaways={[
          "Instant calculation of minimum final exam score needed",
          "Interactive 'What-If' scenario matrix showing outcomes for scores 50%–100%",
          "Supports high school (10%–20% weight) and college (20%–40% weight) courses",
          "One-click 'Share Result' button to share targets with classmates",
        ]}
      />

      {/* Table of Contents */}
      <TableOfContents items={tocItems} />

      <AdPlaceholder format="horizontal" slotId="final-grade-mid-ad" />

      {/* Educational Guide */}
      <section id="formula-guide" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
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

        <div id="worked-example" className="space-y-3 pt-2">
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
            <div>Step 4: Divide by exam weight = 24.75 &divide; 0.25 = <strong className="text-indigo-600 font-bold">99.0%</strong></div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sarah needs a <strong>99.0%</strong> on her final exam to reach an overall 90% in the class.
          </p>
        </div>

        <div id="strategies" className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Strategic Tips for Final Exam Preparation</h3>
          <ul className="text-xs text-slate-700 list-disc list-inside space-y-1.5 leading-relaxed">
            <li><strong>Identify high-yield study topics:</strong> Review past midterms and quizzes since final exams are typically cumulative.</li>
            <li><strong>Calculate multiple scenarios:</strong> Know both your stretch target (e.g. A-) and your safety floor (e.g. maintaining a solid B).</li>
            <li><strong>Check for syllabus curve policies:</strong> Some professors replace a lower midterm score with a higher final exam grade.</li>
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="Final Grade Calculator – What Do I Need on My Final?"
        description="Calculate the exact score you need on your final exam to pass or achieve your desired class grade."
      />

      <RelatedCalculators currentKey="final-grade-calculator" />
    </div>
  );
}

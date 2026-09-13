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
import GradeNeededCalculator from "@/components/calculators/GradeNeededCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Grade Needed Calculator – What Score Do I Need to Pass?",
  description:
    "Calculate the required average score on remaining assignments, quizzes, and tests to achieve your target final grade in any class.",
  path: "/grade-needed-calculator",
  keywords: [
    "grade needed calculator",
    "what grade do i need",
    "calculate score needed",
    "required grade calculator",
    "pass class calculator",
    "target grade calculator",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "How do I calculate what grade I need to pass a class?",
    answer:
      "Enter your current grade and the percentage of the course that has been graded so far. Set your target grade to the minimum passing score (typically 70% for a C or 60% for a D). The calculator determines the exact average score you must maintain across the remaining assignments.",
  },
  {
    question: "What if the required score on my remaining work is over 100%?",
    answer:
      "This indicates that your goal is mathematically out of reach based solely on standard grading. Speak with your instructor immediately to ask about extra credit opportunities, dropping your lowest quiz, or exam grade replacements.",
  },
  {
    question: "How does remaining coursework weight affect my required score?",
    answer:
      "The more remaining weight left in the semester (e.g., 50% remaining vs 10% remaining), the more room you have to recover from a low mid-semester grade.",
  },
  {
    question: "What if the required score is negative or 0%?",
    answer:
      "If the required score is 0% or negative, you have already mathematically secured your target grade regardless of future assignment scores.",
  },
];

export default function GradeNeededCalculatorPage() {
  const breadcrumbs = [{ name: "Grade Needed Calculator", url: "/grade-needed-calculator" }];

  const appSchema = generateWebApplicationSchema({
    name: "Grade Needed Calculator",
    description: "Determine target score required on remaining coursework to achieve goal grade.",
    path: "/grade-needed-calculator",
  });

  const howToSchema = generateHowToSchema({
    name: "How to Calculate the Grade Needed on Remaining Coursework",
    description: "Step-by-step instructions to find your target percentage on upcoming work.",
    path: "/grade-needed-calculator",
    steps: [
      {
        name: "Enter Current Grade",
        text: "Input your current percentage average across all returned assignments.",
      },
      {
        name: "Enter Graded Coursework Weight",
        text: "Input how much of the syllabus has been completed so far (e.g., 60%).",
      },
      {
        name: "Select Your Goal Grade",
        text: "Input your desired final letter grade cutoff (e.g., 90% for an A).",
      },
      {
        name: "View Required Remaining Average",
        text: "Review the exact percentage average you must maintain across all future tests and assignments.",
      },
    ],
  });

  const articleSchema = generateArticleSchema({
    headline: "How to Calculate the Grade Needed on Remaining Coursework to Pass or Get an A",
    description: "Complete mathematical formula breakdown for calculating required scores on remaining assignments, midterms, and finals.",
    path: "/grade-needed-calculator",
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const tocItems = [
    { id: "calculator", label: "Grade Needed Calculator" },
    { id: "needed-formula", label: "Required Score Formula & Algebra" },
    { id: "worked-example", label: "Step-by-Step Worked Example" },
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
          Grade Needed Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Find out the average score you need across all remaining homework, quizzes, and exams to reach your target final grade in any class.
        </p>
      </div>

      {/* SEO Snippet Box */}
      <SeoSummaryBox
        title="Grade Needed Quick Summary"
        quickAnswer="The grade needed on remaining work is calculated by subtracting your current earned contribution from your goal grade, then dividing by the percentage of the course left."
        formula="Required Average = [ Desired Grade - (Current Grade × Completed Weight) ] ÷ Remaining Weight"
        keyTakeaways={[
          "Calculate target score needed across multiple remaining assignments or projects",
          "Automated feasibility check (flags whether goal is guaranteed, realistic, or impossible)",
          "Supports high school quarters/semesters and college terms",
          "Includes 1-tap clipboard sharing and target saving",
        ]}
      />

      <TableOfContents items={tocItems} />

      <div id="calculator">
        <GradeNeededCalculator />
      </div>

      <AdPlaceholder format="horizontal" slotId="needed-grade-mid-ad" />

      {/* Section 1: Formula */}
      <section id="needed-formula" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          The Grade Needed Formula & Algebraic Derivation
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          When tracking mid-semester progress, your final grade is a combination of work completed so far and work remaining:
        </p>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs sm:text-sm text-slate-800 leading-relaxed">
          <strong>Final Grade Formula:</strong><br />
          Desired Grade = (Current Grade &times; Completed Fraction) + (Required Score &times; Remaining Fraction)<br /><br />
          <strong>Solving for Required Score:</strong><br />
          Required Score = [ Desired Grade - (Current Grade &times; Completed Fraction) ] &divide; Remaining Fraction
        </div>
      </section>

      {/* Section 2: Worked Example */}
      <section id="worked-example" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Step-by-Step Scenario Example
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Suppose you currently have an <strong>82%</strong> in Organic Chemistry, with <strong>60%</strong> of the syllabus graded. You want to finish the course with an <strong>88% (B+)</strong>.
        </p>
        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs sm:text-sm text-slate-800 space-y-1.5">
          <div><strong>1. Completed Weight Fraction:</strong> 60% = 0.60</div>
          <div><strong>2. Remaining Weight Fraction:</strong> 100% - 60% = 40% = 0.40</div>
          <div><strong>3. Current Earned Contribution:</strong> 82 &times; 0.60 = 49.2 percentage points</div>
          <div><strong>4. Remaining Points Needed:</strong> 88 - 49.2 = 38.8 points</div>
          <div><strong>5. Required Average:</strong> 38.8 &divide; 0.40 = <strong className="text-indigo-700 text-base font-bold">97.0%</strong></div>
        </div>
        <p className="text-xs text-slate-600">
          You must average 97.0% across the remaining 40% of the class to finish with an 88%.
        </p>
      </section>

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="Grade Needed Calculator – What Score Do I Need to Pass?"
        description="Calculate the required average score on remaining assignments, quizzes, and tests to achieve your target final grade."
      />

      <RelatedCalculators
        currentKey="grade-needed-calculator"
        recommendedKeys={[
          "final-grade-calculator",
          "weighted-grade-calculator",
          "grade-calculator",
          "average-grade-calculator",
        ]}
      />
    </div>
  );
}

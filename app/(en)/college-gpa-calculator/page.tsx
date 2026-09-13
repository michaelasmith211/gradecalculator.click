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
import GPACalculator from "@/components/calculators/GPACalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "College GPA Calculator – Quality Points & Academic Standing",
  description:
    "Free College GPA Calculator. Calculate university Grade Point Average, credit hours, quality points, and Dean's List standing on a standard 4.0 scale.",
  path: "/college-gpa-calculator",
  keywords: [
    "college gpa calculator",
    "university gpa calculator",
    "calculate college gpa",
    "quality points calculator",
    "deans list gpa calculator",
    "college grade point average",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "How do university quality points work?",
    answer:
      "Quality points represent the numerical weight of your academic work. For every course, multiply the course credit hours (e.g. 3.0 credits) by the letter grade point value (e.g. A = 4.0). A 3-credit course with an 'A' yields 12.0 quality points.",
  },
  {
    question: "What GPA is required for Dean's List in college?",
    answer:
      "Most colleges and universities require a minimum term GPA of 3.50 (or 3.75 at some institutions) across at least 12 graded credit hours to qualify for the Dean's List.",
  },
  {
    question: "What are Latin Honors GPA cutoffs?",
    answer:
      "Standard university Latin honors tiers are:\n• Cum Laude (With Praise): 3.50 – 3.69 GPA\n• Magna Cum Laude (With Great Praise): 3.70 – 3.89 GPA\n• Summa Cum Laude (With Highest Praise): 3.90 – 4.00 GPA.",
  },
  {
    question: "How do Pass/Fail or Audited classes affect college GPA?",
    answer:
      "Pass/Fail (P/F), Satisfactory/Unsatisfactory (S/U), and audited courses earn credit towards graduation requirements if passed, but do not contribute quality points and are excluded from GPA calculation.",
  },
];

export default function CollegeGPACalculatorPage() {
  const breadcrumbs = [
    { name: "GPA Calculator", url: "/gpa-calculator" },
    { name: "College GPA", url: "/college-gpa-calculator" },
  ];

  const appSchema = generateWebApplicationSchema({
    name: "College GPA Calculator",
    description: "Calculate college and university GPA, quality points, and honors standing.",
    path: "/college-gpa-calculator",
  });

  const howToSchema = generateHowToSchema({
    name: "How to Calculate College GPA and Quality Points",
    description: "Step-by-step instructions for computing undergraduate and graduate grade point averages.",
    path: "/college-gpa-calculator",
    steps: [
      {
        name: "List University Courses",
        text: "Input all registered courses for the term along with their assigned credit hours (e.g., 3 or 4 credits).",
      },
      {
        name: "Input Final Letter Grades",
        text: "Select your letter grades (A, A-, B+, etc.) according to your university's official scale.",
      },
      {
        name: "Review Quality Points & Dean's List Eligibility",
        text: "Check your total quality points, term GPA, and academic standing classification.",
      },
    ],
  });

  const articleSchema = generateArticleSchema({
    headline: "Undergraduate College GPA Calculation: Formulas, Quality Points & Honors",
    description: "Comprehensive guide to university GPA computation, credit hour weighting, academic standing, and Latin Honors requirements.",
    path: "/college-gpa-calculator",
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const tocItems = [
    { id: "calculator", label: "College GPA Calculator" },
    { id: "quality-points", label: "Quality Points Explained" },
    { id: "latin-honors", label: "Latin Honors & Dean's List Criteria" },
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
          College GPA Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Accurately calculate your undergraduate or graduate college GPA, credit totals, and total quality points using the standard 4.0 university scale.
        </p>
      </div>

      <SeoSummaryBox
        title="College GPA Quick Reference"
        quickAnswer="College GPA is calculated by dividing total quality points (Credit Hours × Letter Grade Points) by total attempted credit hours."
        formula="College GPA = Total Quality Points ÷ Total Attempted Credit Hours"
        keyTakeaways={[
          "Calculates credit hours, total quality points, and term GPA simultaneously",
          "Automated Dean's List and Latin Honors qualification checks",
          "Includes cumulative GPA recalculation for prior university semesters",
          "Supports all standard undergraduate grading conventions (A through F)",
        ]}
      />

      <TableOfContents items={tocItems} />

      <div id="calculator">
        <GPACalculator
          type="college"
          title="College GPA & Quality Points Calculator"
          subtitle="Enter your university courses, credit hours (1-5 credits), and grades."
        />
      </div>

      <AdPlaceholder format="horizontal" slotId="college-gpa-mid-ad" />

      {/* Section 1: Quality Points */}
      <section id="quality-points" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          How University Quality Points Are Determined
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          In higher education, your Grade Point Average is not a simple average of your letter grades. Because different college courses carry different workloads (expressed in <strong>Credit Hours</strong> or Semester Hours), every course generates <strong>Quality Points</strong>:
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs sm:text-sm text-slate-800 leading-relaxed">
          <strong>Quality Point Formula:</strong><br />
          Quality Points = Course Credit Hours &times; Numerical Grade Value (e.g. 4.0 credits &times; 3.7 [A-] = 14.8 Quality Points)
        </div>
      </section>

      {/* Section 2: Latin Honors */}
      <section id="latin-honors" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Latin Honors & Dean's List Thresholds
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Colleges award academic honors based on cumulative GPA upon graduation:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm">Cum Laude</span>
            <span className="text-indigo-700 font-bold block">3.50 – 3.69 GPA</span>
            <p className="text-slate-600">"With Praise" — Top 15–20% of graduating class.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm">Magna Cum Laude</span>
            <span className="text-purple-700 font-bold block">3.70 – 3.89 GPA</span>
            <p className="text-slate-600">"With Great Praise" — Top 5–10% of graduating class.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm">Summa Cum Laude</span>
            <span className="text-emerald-700 font-bold block">3.90 – 4.00 GPA</span>
            <p className="text-slate-600">"With Highest Praise" — Top 1–3% of graduating class.</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="College GPA Calculator – Quality Points & Academic Standing"
        description="Free College GPA Calculator. Calculate university Grade Point Average and quality points on a 4.0 scale."
      />

      <RelatedCalculators
        currentKey="college-gpa-calculator"
        recommendedKeys={[
          "gpa-calculator",
          "semester-gpa-calculator",
          "final-grade-calculator",
          "weighted-grade-calculator",
        ]}
      />
    </div>
  );
}

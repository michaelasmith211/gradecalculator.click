import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import GPACalculator from "@/components/calculators/GPACalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
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
          College GPA Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Accurately calculate your undergraduate or graduate college GPA, credit totals, and total quality points using the standard 4.0 university scale.
        </p>
      </div>

      <GPACalculator type="college" title="College GPA & Quality Points Calculator" subtitle="Enter your university courses, credit hours (1-5 credits), and grades." />

      <AdPlaceholder format="horizontal" slotId="college-gpa-mid-ad" />

      <FAQAccordion faqs={faqs} />

      <RelatedCalculators currentKey="college-gpa-calculator" recommendedKeys={["gpa-calculator", "semester-gpa-calculator", "final-grade-calculator", "weighted-grade-calculator"]} />
    </div>
  );
}

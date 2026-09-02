import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import GPACalculator from "@/components/calculators/GPACalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Semester GPA Calculator – Calculate Term Grade Point Average",
  description:
    "Calculate your current semester or quarterly GPA instantly. Enter course letter grades and credit hours to determine your term standing and cumulative trajectory.",
  path: "/semester-gpa-calculator",
  keywords: [
    "semester gpa calculator",
    "calculate term gpa",
    "quarter gpa calculator",
    "term grade point average",
    "semester credit calculator",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "How is semester GPA different from cumulative GPA?",
    answer:
      "A semester GPA reflects only the grades earned during a single academic term (e.g. Fall 2026). Cumulative GPA reflects all courses and credits completed across your entire high school or college career.",
  },
  {
    question: "How do credit hours affect semester GPA?",
    answer:
      "Courses with higher credit values (e.g. 4-credit science lecture with lab) have a greater mathematical impact on your semester GPA than 1-credit or 2-credit elective courses.",
  },
  {
    question: "How do I raise my cumulative GPA in one semester?",
    answer:
      "Focus on earning top grades in high-credit courses. Because GPA is weighted by credit hours, an 'A' in a 4-credit class provides 16 quality points, boosting your average much faster than lower-credit electives.",
  },
];

export default function SemesterGPACalculatorPage() {
  const breadcrumbs = [
    { name: "GPA Calculator", url: "/gpa-calculator" },
    { name: "Semester GPA", url: "/semester-gpa-calculator" },
  ];

  const appSchema = generateWebApplicationSchema({
    name: "Semester GPA Calculator",
    description: "Calculate semester and term grade point averages with credit hour weighting.",
    path: "/semester-gpa-calculator",
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
          Semester GPA Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Determine your grade point average for the current semester or quarter. Enter your term courses, grades, and credit hours below.
        </p>
      </div>

      <GPACalculator type="semester" title="Semester GPA Calculator" subtitle="Enter your current term classes to compute your semester GPA." />

      <AdPlaceholder format="horizontal" slotId="sem-gpa-mid-ad" />

      <FAQAccordion faqs={faqs} />

      <RelatedCalculators currentKey="semester-gpa-calculator" recommendedKeys={["gpa-calculator", "college-gpa-calculator", "high-school-gpa-calculator", "final-grade-calculator"]} />
    </div>
  );
}

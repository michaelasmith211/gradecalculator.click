import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import GPACalculator from "@/components/calculators/GPACalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "High School GPA Calculator – Weighted 5.0 & Unweighted 4.0",
  description:
    "Free High School GPA Calculator supporting Honors (+0.5) and AP/IB (+1.0) weighted 5.0 scale alongside standard unweighted 4.0 GPA.",
  path: "/high-school-gpa-calculator",
  keywords: [
    "high school gpa calculator",
    "weighted gpa calculator",
    "ap gpa calculator",
    "honors gpa calculator",
    "unweighted vs weighted gpa",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "How does weighted GPA work for AP, IB, and Honors courses?",
    answer:
      "Weighted GPA awards extra grade points to reflect the rigor of advanced classes. Typically:\n• Regular Courses: A = 4.0, B = 3.0, C = 2.0\n• Honors Courses (+0.5): A = 4.5, B = 3.5, C = 2.5\n• AP / IB Courses (+1.0): A = 5.0, B = 4.0, C = 3.0.",
  },
  {
    question: "Do college admissions look at weighted or unweighted GPA?",
    answer:
      "Most college admissions offices review both. Unweighted GPA shows your raw grade performance across all subjects, while weighted GPA demonstrates that you challenged yourself with difficult college-level coursework.",
  },
  {
    question: "Can a weighted GPA be higher than 4.0?",
    answer:
      "Yes! If a student takes multiple Honors, AP, Dual Enrollment, or IB courses and earns mostly A grades, their weighted GPA can reach 4.2, 4.5, or even higher.",
  },
];

export default function HighSchoolGPACalculatorPage() {
  const breadcrumbs = [
    { name: "GPA Calculator", url: "/gpa-calculator" },
    { name: "High School GPA", url: "/high-school-gpa-calculator" },
  ];

  const appSchema = generateWebApplicationSchema({
    name: "High School GPA Calculator",
    description: "Calculate high school weighted 5.0 and unweighted 4.0 GPA with AP/IB and Honors weight boosts.",
    path: "/high-school-gpa-calculator",
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
          High School GPA Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Calculate both your weighted 5.0 GPA (with AP/IB and Honors bonuses) and your unweighted 4.0 GPA side by side.
        </p>
      </div>

      <GPACalculator type="highschool" title="High School Weighted GPA Calculator" subtitle="Select Regular, Honors (+0.5), or AP/IB (+1.0) for each course." />

      <AdPlaceholder format="horizontal" slotId="hs-gpa-mid-ad" />

      <FAQAccordion faqs={faqs} />

      <RelatedCalculators currentKey="high-school-gpa-calculator" recommendedKeys={["gpa-calculator", "college-gpa-calculator", "semester-gpa-calculator", "grade-calculator"]} />
    </div>
  );
}

import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import GradeCalculator from "@/components/calculators/GradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Points-Based Grade Calculator – Total Points System",
  description:
    "Calculate grades for courses using a strict total points system where each assignment point contributes equally to your final semester grade.",
  path: "/points-grade-calculator",
  keywords: [
    "points based grade calculator",
    "total points grade system",
    "points grade calculator",
    "calculate points grade",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "How does a total points grading system work?",
    answer:
      "In a points-based grading system, your grade is calculated purely by summing all points you have earned on assignments, quizzes, and exams, and dividing that sum by the total possible points available in the course. There are no category percentages.",
  },
  {
    question: "How do I know if my class uses a points system or a weighted system?",
    answer:
      "Review your course syllabus. If the instructor lists assignments with fixed points (e.g. 500 total points in the course) without mentioning category percentage weights, the class uses a points system.",
  },
];

export default function PointsGradeCalculatorPage() {
  const breadcrumbs = [
    { name: "Grade Calculator", url: "/grade-calculator" },
    { name: "Points-Based Grade", url: "/points-grade-calculator" },
  ];

  const appSchema = generateWebApplicationSchema({
    name: "Points-Based Grade Calculator",
    description: "Calculate class grade based on total points earned vs total points possible.",
    path: "/points-grade-calculator",
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
          Points-Based Grade Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          For classes evaluated strictly by total points accumulated. Enter each assignment score and total possible points to see your overall score.
        </p>
      </div>

      <GradeCalculator title="Total Points Grade Calculator" subtitle="Enter your assignment point scores below." />

      <AdPlaceholder format="horizontal" slotId="points-grade-mid-ad" />

      <FAQAccordion faqs={faqs} />

      <RelatedCalculators currentKey="points-grade-calculator" recommendedKeys={["grade-calculator", "weighted-grade-calculator", "percentage-grade-calculator", "final-grade-calculator"]} />
    </div>
  );
}

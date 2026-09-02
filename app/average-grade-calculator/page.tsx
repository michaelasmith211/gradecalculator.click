import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import AverageGradeCalculator from "@/components/calculators/AverageGradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Average Grade Calculator – Calculate Test & Assignment Mean",
  description:
    "Calculate the mean, median, high, and low scores for any set of grades or test results instantly. Enter scores individually or paste comma-separated values.",
  path: "/average-grade-calculator",
  keywords: [
    "average grade calculator",
    "calculate grade average",
    "test score average",
    "mean grade calculator",
    "assignment average calculator",
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Average Grade Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Quickly compute the mathematical average (mean), median, and score distribution for a list of test grades, quizzes, or assignments.
        </p>
      </div>

      <AverageGradeCalculator />

      <AdPlaceholder format="horizontal" slotId="avg-grade-mid-ad" />

      <FAQAccordion faqs={faqs} />

      <RelatedCalculators currentKey="average-grade-calculator" />
    </div>
  );
}

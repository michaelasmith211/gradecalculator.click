import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateWebApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
} from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import GradeCalculator from "@/components/calculators/GradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
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
    "accumulated points grade calculator",
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

  const howToSchema = generateHowToSchema({
    name: "How to Calculate a Points-Based Class Grade",
    description: "Step-by-step instructions to sum points and calculate percentage.",
    path: "/points-grade-calculator",
    steps: [
      {
        name: "Sum Points Earned",
        text: "Add together the raw score points from all homework, quizzes, tests, and projects.",
      },
      {
        name: "Sum Total Possible Points",
        text: "Add together the maximum possible points for every assignment given.",
      },
      {
        name: "Compute Percentage",
        text: "Divide points earned by total possible points and multiply by 100 to get your overall grade.",
      },
    ],
  });

  const tocItems = [
    { id: "calculator", label: "Points Calculator Tool" },
    { id: "points-math", label: "Points vs Weighted Grading" },
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
          Points-Based Grade Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          For classes evaluated strictly by total points accumulated. Enter each assignment score and total possible points to see your overall score.
        </p>
      </div>

      <div id="calculator">
        <GradeCalculator title="Total Points Grade Calculator" subtitle="Enter your assignment point scores below." />
      </div>

      {/* SEO Snippet Box */}
      <SeoSummaryBox
        title="Points-Based Grade Summary"
        quickAnswer="In a total points grading system, all points have equal mathematical weight. Divide total earned points by total possible points to find your class standing."
        formula="Grade (%) = (Sum of Earned Points ÷ Sum of Possible Points) × 100"
        keyTakeaways={[
          "Every point counts equally towards your semester total",
          "A 100-point midterm is worth exactly five times more than a 20-point quiz",
          "Automated letter grade and 4.0 GPA conversion",
        ]}
      />

      <TableOfContents items={tocItems} />

      <AdPlaceholder format="horizontal" slotId="points-grade-mid-ad" />

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="Points-Based Grade Calculator – Total Points System"
        description="Calculate grades for courses using a strict total points system where each assignment point contributes equally."
      />

      <RelatedCalculators currentKey="points-grade-calculator" recommendedKeys={["grade-calculator", "weighted-grade-calculator", "percentage-grade-calculator", "final-grade-calculator"]} />
    </div>
  );
}

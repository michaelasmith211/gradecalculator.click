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
  {
    question: "Is a 100-point test worth more in a points system than a 20-point quiz?",
    answer:
      "Yes. In a total points system, a 100-point exam has five times the mathematical impact on your final grade compared to a 20-point quiz, purely because it offers 5x more points.",
  },
  {
    question: "How does extra credit work in a points system?",
    answer:
      "Extra credit points are simply added directly to your earned points total while the total possible points remain unchanged, boosting your overall course percentage immediately.",
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

  const articleSchema = generateArticleSchema({
    headline: "Points-Based Grading System Explained: Formulas, Examples & Calculations",
    description: "Comprehensive guide to point accumulation grading systems, assignment values, and grade calculations.",
    path: "/points-grade-calculator",
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const tocItems = [
    { id: "calculator", label: "Points Calculator Tool" },
    { id: "points-math", label: "Points vs. Weighted Grading Explained" },
    { id: "worked-example", label: "Worked Point Calculation Example" },
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
          Points-Based Grade Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          For classes evaluated strictly by total points accumulated. Enter each assignment score and total possible points to see your overall percentage, letter grade, and GPA points.
        </p>
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
          "Direct extra credit point addition support",
        ]}
      />

      <TableOfContents items={tocItems} />

      <div id="calculator">
        <GradeCalculator
          title="Total Points Grade Calculator"
          subtitle="Enter your assignment point scores below."
        />
      </div>

      <AdPlaceholder format="horizontal" slotId="points-grade-mid-ad" />

      {/* Section 1: Points vs Weighted */}
      <section id="points-math" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Points-Based vs. Weighted Grading Systems
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Many courses across middle schools, high schools, and universities use a <strong>Total Points System</strong> rather than percentage weighting:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 text-sm">Total Points System</span>
            <p className="text-slate-600 leading-relaxed">
              Every point is equal. If a course has 500 total points available across 10 assignments, your grade is simply <code>(Points Earned &divide; 500) &times; 100</code>.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 text-sm">Weighted Category System</span>
            <p className="text-slate-600 leading-relaxed">
              Categories have fixed percentage weights (e.g. Homework is 20%, Tests are 50%). Points within a category only affect that category's sub-average.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Worked Example */}
      <section id="worked-example" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Worked Total Points Calculation Example
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Suppose a student has the following completed coursework in a 400-point course:
        </p>
        <ul className="text-xs sm:text-sm text-slate-700 list-disc list-inside space-y-1.5">
          <li><strong>Essay 1:</strong> 47 / 50 points (94%)</li>
          <li><strong>Midterm Exam:</strong> 85 / 100 points (85%)</li>
          <li><strong>Lab Project:</strong> 95 / 100 points (95%)</li>
          <li><strong>Weekly Quizzes (5 total):</strong> 45 / 50 points (90%)</li>
        </ul>
        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs sm:text-sm text-slate-800 space-y-1">
          <div><strong>Total Points Earned:</strong> 47 + 85 + 95 + 45 = <strong>272 points</strong></div>
          <div><strong>Total Possible Points:</strong> 50 + 100 + 100 + 50 = <strong>300 points</strong></div>
          <div><strong>Current Grade:</strong> (272 &divide; 300) &times; 100 = <strong className="text-indigo-700 font-bold">90.67%</strong> (Letter Grade: <strong>A-</strong>).</div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="Points-Based Grade Calculator – Total Points System"
        description="Calculate grades for courses using a strict total points system where each assignment point contributes equally."
      />

      <RelatedCalculators
        currentKey="points-grade-calculator"
        recommendedKeys={[
          "grade-calculator",
          "weighted-grade-calculator",
          "percentage-grade-calculator",
          "final-grade-calculator",
        ]}
      />
    </div>
  );
}

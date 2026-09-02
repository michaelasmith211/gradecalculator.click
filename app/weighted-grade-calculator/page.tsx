import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import WeightedGradeCalculator from "@/components/calculators/WeightedGradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Weighted Grade Calculator – Calculate Your Weighted Grade",
  description:
    "Calculate your weighted course grade with category percentages for homework, quizzes, tests, midterms, and final exams. Instant visual contribution breakdown.",
  path: "/weighted-grade-calculator",
  keywords: [
    "weighted grade calculator",
    "calculate weighted grade",
    "weighted average calculator",
    "syllabus grade calculator",
    "grade weight calculator",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "How do you calculate a weighted grade?",
    answer:
      "To calculate a weighted grade:\n1. Multiply each category score (in percent) by its assigned weight percentage.\n2. Add all the resulting products together.\n3. Divide by the total weight (if weights sum to 100%, simply take the sum).\n\nExample: Homework (90% score × 20% weight = 18), Quizzes (80% × 20% = 16), Exams (85% × 60% = 51). Overall Grade = 18 + 16 + 51 = 85.0%.",
  },
  {
    question: "What happens if my syllabus weights do not add up to 100%?",
    answer:
      "If some categories are not yet completed (for example, your mid-semester grades only total 60% of the syllabus), our calculator automatically normalizes your grade by dividing the weighted sum by your current total weight, giving you an accurate reflection of your performance to date.",
  },
  {
    question: "Why do professors use weighted grades instead of total points?",
    answer:
      "Weighted grading gives instructors control over the relative importance of course components. For instance, a professor can ensure that a comprehensive 100-point final exam is worth 40% of the course grade while ten 10-point homework assignments only account for 15%.",
  },
  {
    question: "How do I calculate a category average if I have multiple assignments inside it?",
    answer:
      "First calculate the simple average of all assignments in that category (e.g. if homework scores are 90, 85, and 95, your category average is 90%). Then enter that 90% into the category score field.",
  },
];

export default function WeightedGradeCalculatorPage() {
  const breadcrumbs = [{ name: "Weighted Grade Calculator", url: "/weighted-grade-calculator" }];

  const appSchema = generateWebApplicationSchema({
    name: "Weighted Grade Calculator",
    description: "Calculate course grades when categories carry different percentage weights.",
    path: "/weighted-grade-calculator",
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
          Weighted Grade Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Calculate your overall grade when your syllabus uses weighted categories such as Homework, Quizzes, Projects, Midterm, and Final Exams.
        </p>
      </div>

      <WeightedGradeCalculator />

      <AdPlaceholder format="horizontal" slotId="weighted-grade-mid-ad" />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Understanding Weighted Grading Systems
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          In high school and college courses, teachers frequently assign different percentage weights to distinct categories of work. This ensures that major exams carry more weight than daily homework exercises.
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 leading-relaxed">
          <strong>Mathematical Formula:</strong><br />
          Weighted Grade = [ (Score<sub>1</sub> &times; Weight<sub>1</sub>) + (Score<sub>2</sub> &times; Weight<sub>2</sub>) + ... + (Score<sub>n</sub> &times; Weight<sub>n</sub>) ] &divide; (Total Weight)
        </div>

        <h3 className="text-lg font-bold text-slate-900">Example Category Breakdown Table</h3>
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
              <tr>
                <th className="px-4 py-2.5">Category</th>
                <th className="px-4 py-2.5">Category Score</th>
                <th className="px-4 py-2.5">Weight %</th>
                <th className="px-4 py-2.5">Weighted Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="px-4 py-2 font-semibold text-slate-900">Homework & Labs</td>
                <td className="px-4 py-2">95.0%</td>
                <td className="px-4 py-2">20% (0.20)</td>
                <td className="px-4 py-2 font-bold text-indigo-600">+19.00%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold text-slate-900">Quizzes</td>
                <td className="px-4 py-2">80.0%</td>
                <td className="px-4 py-2">15% (0.15)</td>
                <td className="px-4 py-2 font-bold text-indigo-600">+12.00%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold text-slate-900">Midterm Exam</td>
                <td className="px-4 py-2">86.0%</td>
                <td className="px-4 py-2">30% (0.30)</td>
                <td className="px-4 py-2 font-bold text-indigo-600">+25.80%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold text-slate-900">Final Exam</td>
                <td className="px-4 py-2">92.0%</td>
                <td className="px-4 py-2">35% (0.35)</td>
                <td className="px-4 py-2 font-bold text-indigo-600">+32.20%</td>
              </tr>
              <tr className="bg-slate-50 font-bold text-slate-900">
                <td className="px-4 py-2.5">Total / Overall</td>
                <td className="px-4 py-2.5">-</td>
                <td className="px-4 py-2.5">100%</td>
                <td className="px-4 py-2.5 text-indigo-600 text-sm">89.00% (Grade B+)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <FAQAccordion faqs={faqs} />

      {/* Social Share */}
      <SocialShare
        title="Weighted Grade Calculator – Calculate Your Weighted Grade"
        description="Calculate course grades when categories carry different percentage weights."
      />

      <RelatedCalculators currentKey="weighted-grade-calculator" />
    </div>
  );
}

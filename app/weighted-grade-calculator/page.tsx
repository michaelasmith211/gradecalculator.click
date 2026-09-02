import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateWebApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
} from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import WeightedGradeCalculator from "@/components/calculators/WeightedGradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Weighted Grade Calculator – Calculate Weighted Category Grades",
  description:
    "Free Weighted Grade Calculator. Calculate course grades with category percentage weights (Homework, Quizzes, Midterms, Final Exam). Real-time visual breakdown.",
  path: "/weighted-grade-calculator",
  keywords: [
    "weighted grade calculator",
    "calculate weighted grade",
    "weighted average calculator",
    "syllabus grade calculator",
    "grade weight calculator",
    "weighted category calculator",
    "college weighted grade calculator",
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

  const howToSchema = generateHowToSchema({
    name: "How to Calculate a Weighted Grade",
    description:
      "Step-by-step mathematical instructions for calculating overall course scores with syllabus category percentage weights.",
    path: "/weighted-grade-calculator",
    steps: [
      {
        name: "List Course Categories",
        text: "Identify all grading categories on your syllabus (e.g., Homework, Quizzes, Projects, Midterm, Final Exam).",
      },
      {
        name: "Calculate Each Category Average",
        text: "Sum your scores in each category and divide by total category points to obtain a percentage score.",
      },
      {
        name: "Multiply by Percentage Weights",
        text: "Multiply each category score by its decimal weight (e.g., 90% × 0.20 = 18.0%).",
      },
      {
        name: "Sum Weighted Contributions",
        text: "Add all weighted contributions together and divide by the total weight to get your final overall grade.",
      },
    ],
  });

  const tocItems = [
    { id: "calculator", label: "Interactive Weighted Calculator" },
    { id: "how-weighted-works", label: "Weighted Grading Explained" },
    { id: "example-table", label: "Category Breakdown Table" },
    { id: "normalization", label: "Automatic Weight Normalization" },
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
          Weighted Grade Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Calculate your overall grade when your syllabus uses weighted categories such as Homework, Quizzes, Projects, Midterm, and Final Exams.
        </p>
      </div>

      {/* Interactive Tool */}
      <div id="calculator">
        <WeightedGradeCalculator />
      </div>

      {/* SEO Snippet Box */}
      <SeoSummaryBox
        title="Weighted Grade Summary"
        quickAnswer="A weighted grade multiplies each category average by its assigned percentage weight. Summing these weighted products yields your exact overall course standing."
        formula="Weighted Grade = [ (Score₁ × Weight₁) + (Score₂ × Weight₂) + ... ] ÷ Total Weight"
        keyTakeaways={[
          "Live stacked contribution breakdown visualization for each category",
          "Automatic normalization when weights sum to less than 100% (mid-semester tracking)",
          "Instant conversion to standard letter grades (A–F) and 4.0 GPA points",
          "Unlimited custom category support with instant add/remove controls",
        ]}
      />

      <TableOfContents items={tocItems} />

      <AdPlaceholder format="horizontal" slotId="weighted-grade-mid-ad" />

      {/* Educational Guide */}
      <section id="how-weighted-works" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
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

        <div id="example-table" className="space-y-3 pt-2">
          <h3 className="text-lg font-bold text-slate-900">Example Category Breakdown Table</h3>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
                <tr>
                  <th scope="col" className="px-4 py-2.5">Category</th>
                  <th scope="col" className="px-4 py-2.5">Category Score</th>
                  <th scope="col" className="px-4 py-2.5">Weight %</th>
                  <th scope="col" className="px-4 py-2.5">Weighted Contribution</th>
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
        </div>

        <div id="normalization" className="space-y-2 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">How Weight Normalization Works Mid-Semester</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            If you are checking your grade in the middle of a semester and have only completed Homework (20%) and Midterm (30%) for a total of 50% completed weight:
          </p>
          <p className="text-xs text-slate-700 font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
            Normalized Grade = (19.0% + 25.8%) &divide; (0.50) = 44.8 &divide; 0.50 = <strong>89.60%</strong>
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our tool automatically handles this normalization so your current grade always reflects your true classroom standing.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="Weighted Grade Calculator – Calculate Your Weighted Grade"
        description="Calculate course grades when categories carry different percentage weights."
      />

      <RelatedCalculators currentKey="weighted-grade-calculator" />
    </div>
  );
}

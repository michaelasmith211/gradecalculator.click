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
import WeightedGradeCalculator from "@/components/calculators/WeightedGradeCalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
import SocialShare from "@/components/SocialShare";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata = constructMetadata({
  title: "Weighted Average Calculator – Values, Weights & Contributions",
  description:
    "Calculate the statistical weighted average for any data set, grades, or financial models with custom weights and automatic normalization.",
  path: "/weighted-average-calculator",
  keywords: [
    "weighted average calculator",
    "calculate weighted mean",
    "weighted statistical average",
    "weights and values calculator",
    "weighted grade average",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "What is a weighted average?",
    answer:
      "A weighted average is a statistical mean where each data point contributes proportionally according to an assigned numerical weight (relative importance), rather than treating each value equally as in an unweighted arithmetic mean.",
  },
  {
    question: "What is the formula for a weighted average?",
    answer:
      "Weighted Average = Σ (Score_i × Weight_i) ÷ Σ (Weight_i), where each value is multiplied by its weight, summed together, and divided by the total sum of all weights.",
  },
  {
    question: "What happens if weights do not add up to 100%?",
    answer:
      "Our calculator automatically normalizes your weights so you can calculate your current weighted standing at any point in the semester before all coursework is finished.",
  },
  {
    question: "How does a weighted average differ from a simple average?",
    answer:
      "In a simple average, all items carry the same weight (1/N). In a weighted average, high-impact items like a 40% Final Exam carry four times more influence than a 10% quiz.",
  },
];

export default function WeightedAverageCalculatorPage() {
  const breadcrumbs = [
    { name: "Weighted Grade Calculator", url: "/weighted-grade-calculator" },
    { name: "Weighted Average Calculator", url: "/weighted-average-calculator" },
  ];

  const appSchema = generateWebApplicationSchema({
    name: "Weighted Average Calculator",
    description: "Calculate weighted averages and relative value contributions for grades and statistics.",
    path: "/weighted-average-calculator",
  });

  const howToSchema = generateHowToSchema({
    name: "How to Calculate a Weighted Average",
    description: "Step-by-step mathematical guide to calculating weighted averages.",
    path: "/weighted-average-calculator",
    steps: [
      {
        name: "Multiply Each Score by its Weight",
        text: "For each category or data item, multiply the percentage score by its weight percentage.",
      },
      {
        name: "Sum All Weighted Products",
        text: "Add together the resulting products from each category.",
      },
      {
        name: "Sum All Weights",
        text: "Add up the total sum of all assigned weights.",
      },
      {
        name: "Divide Weighted Sum by Total Weights",
        text: "Divide the sum of weighted products by the total weight sum to obtain your normalized weighted average.",
      },
    ],
  });

  const articleSchema = generateArticleSchema({
    headline: "How to Calculate Weighted Averages: Formulas & Worked Examples",
    description: "Comprehensive tutorial on weighted means, percentage weighting formulas, and academic grade applications.",
    path: "/weighted-average-calculator",
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const tocItems = [
    { id: "calculator", label: "Interactive Weighted Average Calculator" },
    { id: "formula", label: "Weighted Average Formula" },
    { id: "worked-example", label: "Worked Statistical Example" },
    { id: "faq", label: "Frequently Asked Questions" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Weighted Average Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Compute the weighted mean of any set of values and weights with instant normalization, visual category contribution legends, and letter grade conversion.
        </p>
      </div>

      <SeoSummaryBox
        title="Weighted Average Key Facts"
        quickAnswer="To calculate a weighted average, multiply each value by its corresponding weight, sum the resulting products, and divide by the sum of the weights."
        formula="Weighted Average = [ (Score₁ × Weight₁) + (Score₂ × Weight₂) + ... ] ÷ Total Weight"
        keyTakeaways={[
          "Live real-time calculation with weight normalization alerts",
          "Visual stacked category contribution breakdown",
          "Supports both percentage weights and custom numerical point weights",
          "Includes 4.0 GPA quality points and academic standing tracking",
        ]}
      />

      <TableOfContents items={tocItems} />

      <div id="calculator">
        <WeightedGradeCalculator
          title="Weighted Average Calculator"
          subtitle="Enter your scores and their corresponding percentage weights below."
        />
      </div>

      <AdPlaceholder format="horizontal" slotId="weighted-avg-mid-ad" />

      {/* Educational Guide */}
      <section id="formula" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Understanding the Weighted Average Formula
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          In statistics and academic grading, an unweighted average gives identical importance to every item. In contrast, a <strong>weighted average</strong> assigns different levels of importance based on syllabus weightings or dataset significance.
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs sm:text-sm text-slate-800 leading-relaxed">
          <strong>Mathematical Formula:</strong><br />
          Weighted Average = &sum; (w<sub>i</sub> &times; x<sub>i</sub>) &divide; &sum; w<sub>i</sub>
        </div>

        <div id="worked-example" className="space-y-3 pt-2">
          <h3 className="text-lg font-bold text-slate-900">Worked Academic Example</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Consider a college economics syllabus with the following weighted grading categories:
          </p>
          <ul className="text-xs sm:text-sm text-slate-700 list-disc list-inside space-y-1.5">
            <li><strong>Homework (20% Weight):</strong> Score = 95% &rarr; Contribution = 0.20 &times; 95 = 19.0%</li>
            <li><strong>Quizzes (15% Weight):</strong> Score = 84% &rarr; Contribution = 0.15 &times; 84 = 12.6%</li>
            <li><strong>Midterm Exam (25% Weight):</strong> Score = 88% &rarr; Contribution = 0.25 &times; 88 = 22.0%</li>
            <li><strong>Final Exam (40% Weight):</strong> Score = 91% &rarr; Contribution = 0.40 &times; 91 = 36.4%</li>
          </ul>

          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs sm:text-sm text-slate-800 space-y-1">
            <div><strong>Sum of Contributions:</strong> 19.0 + 12.6 + 22.0 + 36.4 = <strong className="text-indigo-700">90.0%</strong></div>
            <div><strong>Letter Grade:</strong> <strong>A-</strong> (3.7 GPA Quality Points).</div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <div id="faq">
        <FAQAccordion faqs={faqs} />
      </div>

      {/* Social Share */}
      <SocialShare
        title="Weighted Average Calculator – Values, Weights & Contributions"
        description="Compute the weighted mean of any set of values and weights with instant normalization."
      />

      {/* Related Calculators */}
      <RelatedCalculators
        currentKey="weighted-average-calculator"
        recommendedKeys={[
          "weighted-grade-calculator",
          "average-grade-calculator",
          "grade-calculator",
          "gpa-calculator",
        ]}
      />
    </div>
  );
}

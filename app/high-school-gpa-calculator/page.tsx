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
import GPACalculator from "@/components/calculators/GPACalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
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
    "high school grade point average",
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
      "Yes! If a student takes multiple Honors, AP, Dual Enrollment, or IB courses and earns mostly A grades, their weighted GPA can reach 4.2, 4.5, or even higher on a 5.0 scale.",
  },
  {
    question: "How are Dual Enrollment college classes weighted in high school?",
    answer:
      "Most high schools award Dual Enrollment college courses the same +1.0 point weight boost as AP and IB courses because they represent accredited college-level curriculum.",
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

  const howToSchema = generateHowToSchema({
    name: "How to Calculate High School Weighted and Unweighted GPA",
    description: "Step-by-step instructions to calculate weighted 5.0 GPA with Honors and AP bonuses.",
    path: "/high-school-gpa-calculator",
    steps: [
      {
        name: "List High School Classes",
        text: "Input each course name and assigned credit count (e.g., 0.5 or 1.0 credit per term).",
      },
      {
        name: "Select Course Level",
        text: "Mark courses as Regular (4.0 max), Honors (+0.5 point bonus), or AP/IB (+1.0 point bonus).",
      },
      {
        name: "Input Semester Grades",
        text: "Select the letter grade earned in each class.",
      },
      {
        name: "Compare Weighted and Unweighted GPA",
        text: "View both your unweighted 4.0 GPA and weighted 5.0 GPA calculated side by side.",
      },
    ],
  });

  const articleSchema = generateArticleSchema({
    headline: "High School GPA Calculation: Weighted 5.0 vs Unweighted 4.0 Scales Explained",
    description: "Complete guide to AP, IB, and Honors grade point weighting, transcript GPA calculations, and college admissions evaluations.",
    path: "/high-school-gpa-calculator",
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const tocItems = [
    { id: "calculator", label: "High School GPA Calculator" },
    { id: "weighted-guide", label: "Weighted vs. Unweighted GPA Comparison" },
    { id: "ap-honors-matrix", label: "AP & Honors Grade Weight Matrix" },
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
          High School GPA Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Calculate both your weighted 5.0 GPA (with AP, IB, and Honors point bonuses) and your unweighted 4.0 GPA side by side for college applications and class rank.
        </p>
      </div>

      <SeoSummaryBox
        title="High School GPA Summary"
        quickAnswer="High school GPA combines standard 4.0 quality points with +0.5 for Honors courses and +1.0 for AP/IB/Dual Enrollment courses to calculate a weighted GPA on a 5.0 scale."
        formula="Weighted GPA = (Sum of Weighted Quality Points) ÷ (Total High School Credits)"
        keyTakeaways={[
          "Calculates weighted 5.0 GPA and standard unweighted 4.0 GPA simultaneously",
          "Includes Honors (+0.5), AP (+1.0), IB (+1.0), and Dual Enrollment support",
          "Helps students track college admission GPA targets, scholarships, and class rank",
          "Supports semester credits (0.5 credit) and full-year courses (1.0 credit)",
        ]}
      />

      <TableOfContents items={tocItems} />

      <div id="calculator">
        <GPACalculator
          type="highschool"
          title="High School Weighted GPA Calculator"
          subtitle="Select Regular, Honors (+0.5), or AP/IB (+1.0) for each course."
        />
      </div>

      <AdPlaceholder format="horizontal" slotId="hs-gpa-mid-ad" />

      {/* Educational Guide */}
      <section id="weighted-guide" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Weighted vs. Unweighted High School GPA
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Understanding the distinction between weighted and unweighted GPA is crucial when preparing high school transcripts and college admissions essays:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 text-sm">Unweighted GPA (4.0 Scale)</span>
            <p className="text-slate-600 leading-relaxed">
              Calculates strictly by letter grades (A = 4.0, B = 3.0, C = 2.0) regardless of whether a course is standard or advanced. Top possible score is 4.0.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 text-sm">Weighted GPA (5.0 Scale)</span>
            <p className="text-slate-600 leading-relaxed">
              Awards +0.5 for Honors courses and +1.0 for AP / IB courses, rewarding students who tackle challenging college-preparatory academics.
            </p>
          </div>
        </div>
      </section>

      {/* Grade Scale Matrix */}
      <section id="ap-honors-matrix" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          High School Grade Weighting Scale
        </h2>
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-[11px]">
              <tr>
                <th className="px-4 py-2.5">Letter Grade</th>
                <th className="px-4 py-2.5 text-center">Percentage</th>
                <th className="px-4 py-2.5 text-center">Regular (4.0)</th>
                <th className="px-4 py-2.5 text-center">Honors (+0.5)</th>
                <th className="px-4 py-2.5 text-center">AP / IB (+1.0)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">A</td>
                <td className="px-4 py-2.5 text-center">93–100%</td>
                <td className="px-4 py-2.5 text-center font-bold">4.0</td>
                <td className="px-4 py-2.5 text-center font-bold text-indigo-700">4.5</td>
                <td className="px-4 py-2.5 text-center font-bold text-purple-700">5.0</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">B</td>
                <td className="px-4 py-2.5 text-center">83–86%</td>
                <td className="px-4 py-2.5 text-center font-bold">3.0</td>
                <td className="px-4 py-2.5 text-center font-bold text-indigo-700">3.5</td>
                <td className="px-4 py-2.5 text-center font-bold text-purple-700">4.0</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">C</td>
                <td className="px-4 py-2.5 text-center">73–76%</td>
                <td className="px-4 py-2.5 text-center font-bold">2.0</td>
                <td className="px-4 py-2.5 text-center font-bold text-indigo-700">2.5</td>
                <td className="px-4 py-2.5 text-center font-bold text-purple-700">3.0</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">D</td>
                <td className="px-4 py-2.5 text-center">63–66%</td>
                <td className="px-4 py-2.5 text-center font-bold">1.0</td>
                <td className="px-4 py-2.5 text-center font-bold text-indigo-700">1.5</td>
                <td className="px-4 py-2.5 text-center font-bold text-purple-700">2.0</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">F</td>
                <td className="px-4 py-2.5 text-center">&lt; 60%</td>
                <td className="px-4 py-2.5 text-center font-bold">0.0</td>
                <td className="px-4 py-2.5 text-center font-bold text-indigo-700">0.0</td>
                <td className="px-4 py-2.5 text-center font-bold text-purple-700">0.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="High School GPA Calculator – Weighted 5.0 & Unweighted 4.0"
        description="Free High School GPA Calculator supporting Honors (+0.5) and AP/IB (+1.0) weighted 5.0 scale."
      />

      <RelatedCalculators
        currentKey="high-school-gpa-calculator"
        recommendedKeys={[
          "gpa-calculator",
          "college-gpa-calculator",
          "semester-gpa-calculator",
          "grade-calculator",
        ]}
      />
    </div>
  );
}

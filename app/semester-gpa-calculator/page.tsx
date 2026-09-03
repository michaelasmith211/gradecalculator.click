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
    "calculate my semester gpa",
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
    question: "How do I calculate cumulative GPA after a new semester?",
    answer:
      "Multiply your prior cumulative GPA by your prior completed credits to get prior quality points. Then add your new semester quality points and divide by the new total career credits.",
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

  const howToSchema = generateHowToSchema({
    name: "How to Calculate Your Semester GPA",
    description: "Step-by-step instructions for computing semester grade point averages with credit hours.",
    path: "/semester-gpa-calculator",
    steps: [
      {
        name: "Enter Term Courses",
        text: "Input each class name, expected letter grade, and credit hour weighting for this semester.",
      },
      {
        name: "Calculate Term Quality Points",
        text: "Multiply each class grade's 4.0 point equivalent by its credit count.",
      },
      {
        name: "Determine Term GPA",
        text: "Sum all term quality points and divide by total semester credits.",
      },
    ],
  });

  const articleSchema = generateArticleSchema({
    headline: "How to Calculate Semester GPA: Credit Hours, Quality Points & Formulas",
    description: "In-depth guide on calculating single-term grade point averages, credit weighting, and cumulative GPA accumulation.",
    path: "/semester-gpa-calculator",
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const tocItems = [
    { id: "calculator", label: "Semester GPA Calculator" },
    { id: "credit-math", label: "Credit Hours & Quality Points Formula" },
    { id: "worked-example", label: "Step-by-Step Term Calculation" },
    { id: "cumulative-impact", label: "Updating Cumulative Career GPA" },
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
          Semester GPA Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Determine your grade point average for the current semester or quarter. Enter your term courses, letter grades, and credit hours to see your exact term standing and Dean's List eligibility.
        </p>
      </div>

      <SeoSummaryBox
        title="Semester GPA Summary"
        quickAnswer="Semester GPA is calculated by multiplying each course's grade point value by its credit hours to determine quality points, then dividing total term quality points by total term credits attempted."
        formula="Semester GPA = (Sum of Quality Points) ÷ (Total Term Credits Attempted)"
        keyTakeaways={[
          "Calculates term GPA for fall, spring, summer, or quarterly academic sessions",
          "Includes built-in cumulative GPA accumulator (enter prior GPA and credits to view updated career standing)",
          "Real-time Dean's List and academic honors qualification badge triggers",
          "Supports all course credit values from 1.0 to 6.0 credits",
        ]}
      />

      <TableOfContents items={tocItems} />

      <div id="calculator">
        <GPACalculator
          type="semester"
          title="Semester GPA Calculator"
          subtitle="Enter your current term classes to compute your semester GPA."
        />
      </div>

      <AdPlaceholder format="horizontal" slotId="sem-gpa-mid-ad" />

      {/* Educational Section 1: Quality Points */}
      <section id="credit-math" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Credit Hours & Quality Points Formula
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          In higher education, not all courses impact your GPA equally. A 4-credit calculus lecture carries twice the mathematical weight of a 2-credit elective. To calculate semester GPA, universities utilize <strong>Quality Points</strong> (also called grade points earned).
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs sm:text-sm text-slate-800 leading-relaxed">
          <strong>Quality Points Formula:</strong><br />
          Quality Points for Course = Course Credit Hours &times; Grade Point Equivalent (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0)
        </div>
      </section>

      {/* Educational Section 2: Worked Example */}
      <section id="worked-example" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Step-by-Step Semester Calculation Example
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Suppose a student is completing a 14-credit semester with the following four courses:
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-[11px]">
              <tr>
                <th className="px-4 py-2.5">Course Name</th>
                <th className="px-4 py-2.5 text-center">Letter Grade</th>
                <th className="px-4 py-2.5 text-center">Grade Points</th>
                <th className="px-4 py-2.5 text-center">Credits</th>
                <th className="px-4 py-2.5 text-right">Quality Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="px-4 py-2.5 font-medium text-slate-900">Calculus I</td>
                <td className="px-4 py-2.5 text-center font-bold text-indigo-700">A</td>
                <td className="px-4 py-2.5 text-center">4.0</td>
                <td className="px-4 py-2.5 text-center">4</td>
                <td className="px-4 py-2.5 text-right font-bold text-slate-900">16.0</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-slate-900">General Chemistry</td>
                <td className="px-4 py-2.5 text-center font-bold text-indigo-700">B+</td>
                <td className="px-4 py-2.5 text-center">3.3</td>
                <td className="px-4 py-2.5 text-center">4</td>
                <td className="px-4 py-2.5 text-right font-bold text-slate-900">13.2</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-slate-900">English Composition</td>
                <td className="px-4 py-2.5 text-center font-bold text-indigo-700">A-</td>
                <td className="px-4 py-2.5 text-center">3.7</td>
                <td className="px-4 py-2.5 text-center">3</td>
                <td className="px-4 py-2.5 text-right font-bold text-slate-900">11.1</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-slate-900">World History</td>
                <td className="px-4 py-2.5 text-center font-bold text-indigo-700">B</td>
                <td className="px-4 py-2.5 text-center">3.0</td>
                <td className="px-4 py-2.5 text-center">3</td>
                <td className="px-4 py-2.5 text-right font-bold text-slate-900">9.0</td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
              <tr>
                <td colSpan={3} className="px-4 py-2.5">Total</td>
                <td className="px-4 py-2.5 text-center">14 Credits</td>
                <td className="px-4 py-2.5 text-right text-indigo-700">49.3 Quality Points</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs sm:text-sm text-slate-800 space-y-1">
          <div><strong>Calculation:</strong> 49.3 Quality Points &divide; 14 Credits = <strong className="text-indigo-700 text-base">3.52 GPA</strong></div>
          <div className="text-slate-600">This term GPA qualifies for Dean's List honors (&ge; 3.50).</div>
        </div>
      </section>

      {/* Educational Section 3: Cumulative Impact */}
      <section id="cumulative-impact" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          How to Update Your Cumulative Career GPA
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          To find your new cumulative GPA after this semester finishes:
        </p>
        <ol className="text-xs sm:text-sm text-slate-700 list-decimal list-inside space-y-2 leading-relaxed">
          <li>Multiply your <strong>Prior Cumulative GPA</strong> by your <strong>Prior Total Credits</strong> to find your prior quality points.</li>
          <li>Add your <strong>New Semester Quality Points</strong> to the prior quality points.</li>
          <li>Divide by your <strong>New Total Career Credits</strong> (prior credits + term credits).</li>
        </ol>
      </section>

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="Semester GPA Calculator – Calculate Term Grade Point Average"
        description="Calculate your current semester or quarterly GPA instantly with credit hour weighting."
      />

      <RelatedCalculators
        currentKey="semester-gpa-calculator"
        recommendedKeys={[
          "gpa-calculator",
          "college-gpa-calculator",
          "high-school-gpa-calculator",
          "final-grade-calculator",
        ]}
      />
    </div>
  );
}

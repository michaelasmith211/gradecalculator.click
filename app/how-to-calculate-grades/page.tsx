import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import GradeScaleTable from "@/components/GradeScaleTable";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import AdPlaceholder from "@/components/AdPlaceholder";
import { BookOpen, CheckCircle2, ArrowRight, Calculator, Award, Lightbulb } from "lucide-react";

export const metadata = constructMetadata({
  title: "How to Calculate Grades – Complete Guide with Formulas & Examples",
  description:
    "Learn step-by-step how to calculate your current grade, weighted averages, final exam needed scores, and GPA with mathematical formulas and student examples.",
  path: "/how-to-calculate-grades",
  type: "article",
  keywords: [
    "how to calculate grades",
    "grade calculation formulas",
    "how to find your grade",
    "calculating weighted grades step by step",
    "how to figure out your grade",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "What is the easiest way to figure out my grade?",
    answer:
      "If all assignments have point values, add all points you earned and divide by all possible points, then multiply by 100. If assignments have weights, multiply each category average by its percentage decimal and add them up.",
  },
  {
    question: "How do zero scores affect my class grade?",
    answer:
      "A zero score has a severe downward impact on your grade because it adds 0 points to your earned numerator while increasing your possible denominator by the full point value of the missed assignment.",
  },
  {
    question: "How do teachers calculate a curved grade?",
    answer:
      "Teachers curve grades in various ways: by adding flat points to every student's score (e.g., +5% across the board), setting the highest achieved score as 100%, or fitting scores onto a bell curve distribution.",
  },
];

export default function HowToCalculateGradesPage() {
  const breadcrumbs = [
    { name: "Guides", url: "/how-to-calculate-grades" },
    { name: "How to Calculate Grades", url: "/how-to-calculate-grades" },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      {/* Title & Intro */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Comprehensive Student Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          How to Calculate Your Class Grade
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          A complete, step-by-step walkthrough of academic grading systems. Learn the exact mathematical formulas for points-based grading, weighted categories, final exam score targets, and GPA.
        </p>
      </header>

      {/* Quick Tool Banner */}
      <div className="p-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h2 className="text-lg font-bold">Want to skip manual calculations?</h2>
          <p className="text-xs text-slate-300 mt-0.5">Use our free online grade calculators to get instant, accurate results.</p>
        </div>
        <Link
          href="/grade-calculator"
          className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm whitespace-nowrap"
        >
          Open Grade Calculator &rarr;
        </Link>
      </div>

      {/* Section 1: Points-Based Grading */}
      <section className="space-y-4 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Method 1: Points-Based Grading System
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          In a points-based grading system (common in middle school, high school, and introductory college courses), each assignment carries a specific number of raw points. Every point has equal weight regardless of the assignment type.
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 leading-relaxed">
          <strong>Points System Formula:</strong><br />
          Grade Percentage (%) = (Total Points Earned &divide; Total Points Possible) &times; 100
        </div>

        <h3 className="text-base font-bold text-slate-900 pt-2">Step-by-Step Example</h3>
        <ol className="text-xs text-slate-700 list-decimal list-inside space-y-2 leading-relaxed">
          <li><strong>Step 1:</strong> Sum your earned scores on all completed assignments.<br />
            Example: Quiz 1 (18/20) + Essay 1 (45/50) + Midterm (86/100) + Homework (20/20) = <strong>169 points earned</strong>.
          </li>
          <li><strong>Step 2:</strong> Sum the maximum possible points.<br />
            Total possible = 20 + 50 + 100 + 20 = <strong>190 points possible</strong>.
          </li>
          <li><strong>Step 3:</strong> Divide earned points by possible points.<br />
            169 &divide; 190 = 0.88947...
          </li>
          <li><strong>Step 4:</strong> Multiply by 100 and round.<br />
            0.88947 &times; 100 = <strong>88.95%</strong> (Letter Grade: <strong className="text-indigo-600">B+</strong>).
          </li>
        </ol>
      </section>

      {/* Section 2: Weighted Grading */}
      <section className="space-y-4 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Method 2: Weighted Grading System
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          In weighted grading, assignments are organized into categories, each assigned a percentage weight toward your final course standing.
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 leading-relaxed">
          <strong>Weighted Grade Formula:</strong><br />
          Weighted Grade = &Sigma; (Category Average &times; Category Decimal Weight)
        </div>

        <h3 className="text-base font-bold text-slate-900 pt-2">Step-by-Step Example</h3>
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
              <tr>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Category Score</th>
                <th className="px-4 py-2">Syllabus Weight</th>
                <th className="px-4 py-2">Calculation</th>
                <th className="px-4 py-2">Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="px-4 py-2 font-semibold text-slate-900">Homework</td>
                <td className="px-4 py-2">92%</td>
                <td className="px-4 py-2">20% (0.20)</td>
                <td className="px-4 py-2">92 &times; 0.20</td>
                <td className="px-4 py-2 font-bold text-indigo-600">+18.40%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold text-slate-900">Quizzes</td>
                <td className="px-4 py-2">85%</td>
                <td className="px-4 py-2">20% (0.20)</td>
                <td className="px-4 py-2">85 &times; 0.20</td>
                <td className="px-4 py-2 font-bold text-indigo-600">+17.00%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold text-slate-900">Midterm Exam</td>
                <td className="px-4 py-2">80%</td>
                <td className="px-4 py-2">25% (0.25)</td>
                <td className="px-4 py-2">80 &times; 0.25</td>
                <td className="px-4 py-2 font-bold text-indigo-600">+20.00%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold text-slate-900">Final Exam</td>
                <td className="px-4 py-2">94%</td>
                <td className="px-4 py-2">35% (0.35)</td>
                <td className="px-4 py-2">94 &times; 0.35</td>
                <td className="px-4 py-2 font-bold text-indigo-600">+32.90%</td>
              </tr>
              <tr className="bg-slate-50 font-bold text-slate-900">
                <td className="px-4 py-2.5">Final Grade</td>
                <td className="px-4 py-2.5">-</td>
                <td className="px-4 py-2.5">100%</td>
                <td className="px-4 py-2.5">Sum</td>
                <td className="px-4 py-2.5 text-indigo-600 text-sm">88.30% (Grade B+)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Final Exam Formula */}
      <section className="space-y-4 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Method 3: Calculating What You Need on Your Final Exam
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Before taking a final exam, you can determine the minimum score required to secure your target grade:
        </p>

        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl font-mono text-xs text-indigo-950 leading-relaxed">
          Required Exam Score = [ Desired Grade - (Current Grade &times; (1 - Exam Weight)) ] &divide; Exam Weight
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Use our interactive <Link href="/final-grade-calculator" className="text-indigo-600 font-bold underline">Final Grade Calculator</Link> to run this formula automatically with customized what-if scenarios.
        </p>
      </section>

      {/* Grade Scale Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Standard Letter Grade Scale
        </h2>
        <GradeScaleTable />
      </section>

      {/* Section 4: Proven Strategies to Raise Your Grade */}
      <section className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>Strategic Tips to Raise Your Course Grade</span>
        </h2>
        <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
          <li><strong>Never leave a zero on the board:</strong> Even a 50% partial credit submission is mathematically infinitely better than a 0% for your average.</li>
          <li><strong>Focus on high-weight assignments:</strong> Spend your study hours proportionate to syllabus weights. A 30% exam demands far more prep time than a 2% homework set.</li>
          <li><strong>Attend professor office hours:</strong> Clarify tricky concepts directly with the person writing your final exam questions.</li>
          <li><strong>Ask about syllabus policies early:</strong> Find out if your lowest quiz score gets dropped or if there are extra credit opportunities.</li>
        </ul>
      </section>

      <AdPlaceholder format="horizontal" slotId="how-to-calc-mid-ad" />

      <FAQAccordion faqs={faqs} />

      {/* Social Share */}
      <SocialShare
        title="How to Calculate Grades – Complete Guide with Formulas & Examples"
        description="Learn step-by-step how to calculate your current grade, weighted averages, and final exam scores."
      />

      <RelatedCalculators currentKey="how-to-calculate-grades" />
    </div>
  );
}

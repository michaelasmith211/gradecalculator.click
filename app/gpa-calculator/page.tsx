import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import GPACalculator from "@/components/calculators/GPACalculator";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import AdPlaceholder from "@/components/AdPlaceholder";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "GPA Calculator – Calculate Your GPA on a 4.0 Scale",
  description:
    "Free GPA Calculator for high school and college students. Calculate semester GPA, cumulative GPA, and quality points on standard 4.0 and weighted 5.0 scales.",
  path: "/gpa-calculator",
  keywords: [
    "gpa calculator",
    "calculate gpa",
    "4.0 gpa calculator",
    "college gpa calculator",
    "cumulative gpa calculator",
    "grade point average calculator",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "How is GPA calculated on a 4.0 scale?",
    answer:
      "To calculate GPA:\n1. Convert each letter grade into its 4.0 numerical point value (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0).\n2. Multiply the grade points by the course credit hours to calculate 'Quality Points'.\n3. Sum all quality points.\n4. Divide total quality points by total credits attempted.",
  },
  {
    question: "What is the difference between Weighted and Unweighted GPA?",
    answer:
      "An unweighted GPA is calculated on a standard 4.0 scale regardless of class difficulty. A weighted GPA awards extra points for challenging courses: typically +0.5 points for Honors classes (up to 4.5) and +1.0 points for Advanced Placement (AP) or International Baccalaureate (IB) courses (up to 5.0).",
  },
  {
    question: "How do I calculate cumulative GPA from past semesters?",
    answer:
      "Multiply your prior cumulative GPA by your prior completed credit hours to get your prior quality points. Add these to your current semester's quality points, and divide by the new total number of credits.",
  },
  {
    question: "What is a good GPA in college and high school?",
    answer:
      "In high school, a 3.0 (B average) is typically the minimum requirement for many four-year colleges, while a 3.5+ is competitive for top state universities, and 3.8+ for selective institutions. In college, maintaining a 3.5+ qualifies students for the Dean's List and Latin Honors (Cum Laude, Magna Cum Laude, Summa Cum Laude).",
  },
];

export default function GPACalculatorPage() {
  const breadcrumbs = [{ name: "GPA Calculator", url: "/gpa-calculator" }];

  const appSchema = generateWebApplicationSchema({
    name: "GPA Calculator",
    description: "Calculate high school and college GPA, quality points, and cumulative grade point average.",
    path: "/gpa-calculator",
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
          GPA Calculator (4.0 Scale)
        </h1>
        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          Calculate your term and cumulative Grade Point Average, credit hours, and quality points. Supports standard 4.0 college scale and weighted honors/AP coursework.
        </p>
      </div>

      <GPACalculator type="standard" />

      <AdPlaceholder format="horizontal" slotId="gpa-mid-ad" />

      {/* GPA Types Navigation Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/semester-gpa-calculator"
          className="p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all block"
        >
          <h3 className="font-bold text-slate-900 text-base mb-1">Semester GPA</h3>
          <p className="text-xs text-slate-600">Calculate single-term grade point averages for midterms and finals.</p>
          <span className="text-xs font-semibold text-indigo-600 mt-2 inline-flex items-center gap-1">
            Open Semester Tool &rarr;
          </span>
        </Link>
        <Link
          href="/college-gpa-calculator"
          className="p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all block"
        >
          <h3 className="font-bold text-slate-900 text-base mb-1">College GPA</h3>
          <p className="text-xs text-slate-600">Detailed credit hours, quality points, and Dean's List honor standings.</p>
          <span className="text-xs font-semibold text-indigo-600 mt-2 inline-flex items-center gap-1">
            Open College Tool &rarr;
          </span>
        </Link>
        <Link
          href="/high-school-gpa-calculator"
          className="p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all block"
        >
          <h3 className="font-bold text-slate-900 text-base mb-1">High School GPA</h3>
          <p className="text-xs text-slate-600">Weighted 5.0 AP/IB & Honors classes vs unweighted standard GPA.</p>
          <span className="text-xs font-semibold text-indigo-600 mt-2 inline-flex items-center gap-1">
            Open High School Tool &rarr;
          </span>
        </Link>
      </section>

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          How GPA and Quality Points Are Calculated
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The Grade Point Average (GPA) is the standard metric used by colleges, universities, and high schools across the United States to summarize student academic achievement.
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 leading-relaxed">
          <strong>GPA Formula:</strong><br />
          GPA = Total Quality Points Earned &divide; Total Credit Hours Attempted<br />
          Where Quality Points for a course = (Credit Hours &times; Grade Point Value)
        </div>

        <h3 className="text-lg font-bold text-slate-900">4.0 Scale Grade Point Values</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">A+ / A = <strong>4.0</strong></div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">A- = <strong>3.7</strong></div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">B+ = <strong>3.3</strong></div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">B = <strong>3.0</strong></div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">B- = <strong>2.7</strong></div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">C+ = <strong>2.3</strong></div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">C = <strong>2.0</strong></div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium">D = <strong>1.0</strong>, F = <strong>0.0</strong></div>
        </div>
      </section>

      <FAQAccordion faqs={faqs} />

      <RelatedCalculators currentKey="gpa-calculator" />
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
} from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
import AdPlaceholder from "@/components/AdPlaceholder";
import { HelpCircle, Calculator, Target, Award, Percent } from "lucide-react";

export const metadata = constructMetadata({
  title: "Grade Calculator FAQ – Answers to All Grading Questions",
  description:
    "Find answers to frequently asked questions about grade calculations, percentage formulas, final exam requirements, weighted averages, and 4.0 GPA scales.",
  path: "/grade-calculator-faq",
  keywords: [
    "grade calculator faq",
    "frequently asked grading questions",
    "how do grades work",
    "grading formula questions",
    "gpa scale questions",
  ],
});

const allFaqs: FAQItem[] = [
  {
    question: "What is a grade calculator?",
    answer:
      "A grade calculator is a free digital tool that computes a student's percentage, letter grade, final exam requirements, and Grade Point Average (GPA) using mathematical algorithms. It eliminates errors associated with manual arithmetic.",
  },
  {
    question: "How do I calculate my current grade?",
    answer:
      "In a points system: Divide total points earned by total points possible and multiply by 100. In a weighted system: Multiply each category's score by its syllabus weight percentage and sum them up.",
  },
  {
    question: "How do I calculate what I need on my final exam?",
    answer:
      "Formula: Required Exam Score = [ Desired Grade - (Current Grade × (1 - Exam Weight)) ] ÷ Exam Weight. Use our Final Grade Calculator to compute this automatically.",
  },
  {
    question: "How do weighted grades work?",
    answer:
      "Weighted grades assign distinct percentages to categories of coursework (e.g. Homework 20%, Midterms 30%, Final Exam 50%). Your score in each category contributes proportionally to your final grade.",
  },
  {
    question: "How do I calculate my GPA on a 4.0 scale?",
    answer:
      "Convert letter grades to numerical quality points (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0). Multiply points by course credits, sum all quality points, and divide by total completed credits.",
  },
  {
    question: "What grade is 90 percent?",
    answer:
      "In standard plus/minus scales, 90% is an A- (3.7 GPA). In standard 10-point non-plus/minus scales, 90% is a solid A (4.0 GPA).",
  },
  {
    question: "What grade is 80 percent?",
    answer:
      "In plus/minus scales, 80% is a B- (2.7 GPA). In straight 10-point scales, 80% is a B (3.0 GPA).",
  },
  {
    question: "What grade is 70 percent?",
    answer:
      "70% corresponds to a C- (1.7 GPA) on a plus/minus scale, or a standard C (2.0 GPA) on a 10-point scale.",
  },
  {
    question: "How do I calculate the percentage of my grade from a fraction?",
    answer:
      "Divide the top number (numerator) by the bottom number (denominator) and multiply by 100. For example, 45/50 = 0.90 × 100 = 90%.",
  },
  {
    question: "Are grade calculations performed securely and privately?",
    answer:
      "Yes! Grade Calculator runs 100% client-side in your web browser. No personal data, course names, or scores are ever sent to our servers.",
  },
];

export default function FAQPage() {
  const breadcrumbs = [
    { name: "Guides", url: "/how-to-calculate-grades" },
    { name: "FAQ", url: "/grade-calculator-faq" },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(allFaqs);

  const articleSchema = generateArticleSchema({
    headline: "Academic Grading & Grade Calculator Frequently Asked Questions",
    description: "Authoritative answers to popular questions on grading formulas, GPA points, exam weights, and curves.",
    path: "/grade-calculator-faq",
  });

  const tocItems = [
    { id: "quick-tools", label: "1. Calculator Tools Directory" },
    { id: "all-faqs", label: "2. Complete FAQ Knowledge Base" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Grade Calculator FAQ
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          Quick answers to the most common questions regarding grading scales, formulas, weighted categories, and GPA calculations.
        </p>
      </header>

      {/* SEO Snippet Box */}
      <SeoSummaryBox
        title="Grading FAQ Highlights"
        quickAnswer="Everything you need to know about calculating course percentages, final exam targets, weighted categories, quality points, and 4.0 GPA conversions."
        keyTakeaways={[
          "All formulas are verified against standard US higher education and secondary guidelines",
          "Calculators update live client-side with 100% privacy",
          "Includes conversion charts for Plus/Minus, 10-point, and 7-point scales",
        ]}
      />

      <TableOfContents items={tocItems} />

      {/* Quick Navigation Cards */}
      <section id="quick-tools" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/grade-calculator"
          className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-sm transition-all"
        >
          <div className="font-bold text-slate-900 text-sm mb-1">Standard Grade</div>
          <div className="text-xs text-slate-500">Calculate points and percentages</div>
        </Link>
        <Link
          href="/final-grade-calculator"
          className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-sm transition-all"
        >
          <div className="font-bold text-slate-900 text-sm mb-1">Final Exam Grade</div>
          <div className="text-xs text-slate-500">Find score needed on final</div>
        </Link>
        <Link
          href="/weighted-grade-calculator"
          className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-sm transition-all"
        >
          <div className="font-bold text-slate-900 text-sm mb-1">Weighted Grade</div>
          <div className="text-xs text-slate-500">Category percentage weights</div>
        </Link>
        <Link
          href="/gpa-calculator"
          className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-sm transition-all"
        >
          <div className="font-bold text-slate-900 text-sm mb-1">4.0 GPA Calculator</div>
          <div className="text-xs text-slate-500">Cumulative & term GPA</div>
        </Link>
      </section>

      <div id="all-faqs">
        <FAQAccordion faqs={allFaqs} title="All Frequently Asked Questions" subtitle="Click any question to view its detailed answer and calculation formula." />
      </div>

      <AdPlaceholder format="horizontal" slotId="faq-mid-ad" />

      {/* Social Share */}
      <SocialShare
        title="Grade Calculator FAQ – Answers to All Grading Questions"
        description="Find answers to frequently asked questions about grade calculations, percentage formulas, and GPA scales."
      />

      <RelatedCalculators currentKey="grade-calculator-faq" />
    </div>
  );
}

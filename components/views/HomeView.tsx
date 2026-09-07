"use client";

import React from "react";
import Link from "next/link";
import GradeCalculator from "@/components/calculators/GradeCalculator";
import GradeScaleTable from "@/components/GradeScaleTable";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
import AdPlaceholder from "@/components/AdPlaceholder";
import {
  Calculator,
  Percent,
  Award,
  GraduationCap,
  Target,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { TOOL_NAMES } from "@/lib/i18n/pageSeo";
import { getLocalizedPath } from "@/lib/i18n/locales";

interface HomeViewProps {
  locale?: string;
}

const defaultHomeFaqs: FAQItem[] = [
  {
    question: "What is a grade calculator?",
    answer:
      "A grade calculator is a free interactive online tool designed for high school and college students to compute their cumulative course grade, overall percentage, letter grade, and grade point average (GPA). It eliminates manual math by aggregating points earned, total possible points, or category weights.",
  },
  {
    question: "How do I calculate my grade?",
    answer:
      "To calculate your current grade in a points-based system:\n1. Add up all points you have earned across homework, quizzes, and exams.\n2. Add up the total possible points.\n3. Divide your total points earned by total points possible.\n4. Multiply by 100 to get your percentage.\n\nExample: If you scored 255 points out of 300 possible points: (255 ÷ 300) × 100 = 85.0% (Letter Grade: B).",
  },
  {
    question: "How do I calculate my final grade?",
    answer:
      "To find what score you need on a final exam:\nUse the formula: Required Score = (Desired Grade - Current Grade × (1 - Exam Weight)) ÷ Exam Weight.\nFor example, if you currently have an 85%, want an overall 90% (A-), and the final is worth 20% (0.20): Required = (90 - 85 × 0.80) ÷ 0.20 = (90 - 68) ÷ 0.20 = 110%. You can use our dedicated Final Grade Calculator to simulate scenarios automatically.",
  },
  {
    question: "How do weighted grades work?",
    answer:
      "In a weighted grading system, assignments are divided into categories with assigned percentages (e.g., Homework 20%, Quizzes 20%, Midterm 25%, Final Exam 35%). Your overall grade is the sum of each category average multiplied by its category percentage weight.",
  },
  {
    question: "How do I calculate my GPA?",
    answer:
      "GPA (Grade Point Average) converts letter grades into numerical quality points on a standard 4.0 scale (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0). Multiply each grade's point value by the course credit hours, sum these quality points, and divide by the total number of credit hours attempted.",
  },
  {
    question: "What grade is 90 percent?",
    answer:
      "In standard US grading scales, a 90% is typically an A- (or an A in non-plus/minus scales). In a strict 7-point scale, a 90% corresponds to a B+.",
  },
  {
    question: "What grade is 80 percent?",
    answer:
      "An 80% is standardly a B- (2.7 GPA points) on a plus/minus scale, or a solid B on standard 10-point scales (80–89%).",
  },
  {
    question: "How do I calculate the percentage of my grade?",
    answer:
      "Divide your total score by the total possible points and multiply the decimal by 100. For instance, scoring 42 out of 50 is (42 ÷ 50) = 0.84, which equals 84%.",
  },
];

export default function HomeView({ locale: propLocale }: HomeViewProps) {
  const { locale: contextLocale, t, localeConfig } = useI18n();
  const currentLocale = propLocale || contextLocale;

  const localizedBrandName =
    (TOOL_NAMES["grade-calculator"] && TOOL_NAMES["grade-calculator"][currentLocale]) ||
    t("brand");

  const tocItems = [
    { id: "calculator", label: `${localizedBrandName} (Interactive)` },
    { id: "how-it-works", label: t("howItWorksTitle") },
    { id: "popular-tools", label: t("popularToolsTitle") },
    { id: "grade-formulas", label: "Grade Calculation Formulas" },
    { id: "grading-scale", label: t("gradeScaleTitle") },
    { id: "benefits", label: "Why Students Trust Our Tool" },
    { id: "faqs", label: t("faqTitle") },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/50 pt-10 pb-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fast & 100% Private Student Calculator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {localizedBrandName}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {t("tagline")}
            </p>
          </div>

          {/* Above-the-fold Interactive Grade Calculator */}
          <div id="calculator">
            <GradeCalculator />
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* On-Page SEO Summary Box */}
        <SeoSummaryBox
          title={`${localizedBrandName} Key Takeaways`}
          quickAnswer="A Grade Calculator computes your cumulative academic percentage and letter grade by dividing the total points you have earned by total points possible, or by multiplying weighted category scores by syllabus percentages."
          formula="Grade (%) = (Total Points Earned ÷ Total Points Possible) × 100"
          keyTakeaways={[
            "Instant client-side calculation with zero delay as you type scores",
            "Customizable letter grade cutoffs (Plus/Minus, 10-Point, 7-Point scales)",
            "100% browser-side privacy (no account or personal data collection)",
            "Available in 39 languages with instant localized calculations",
          ]}
        />

        {/* Quick Jump Navigation */}
        <TableOfContents items={tocItems} title="On This Page" />

        {/* Ad Placeholder 1 */}
        <AdPlaceholder format="horizontal" slotId="home-top-banner" />

        {/* How It Works Section */}
        <section id="how-it-works" className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Visual Workflow Guide</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t("howItWorksTitle")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {t("howItWorksSubtitle")}
            </p>
          </div>

          {/* Infographic */}
          <figure className="my-6 space-y-3">
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-50 to-slate-100/90 p-2 sm:p-4 border border-slate-200/90 shadow-xl shadow-slate-100">
              <img
                src="/images/how-grade-calculator-works-step-by-step.png"
                alt="How GradeCalculator.dev Works – Step-by-Step Grade, GPA, Weighted Average, and Final Exam Calculation Infographic"
                title="How GradeCalculator.dev Works – 6-Step Grade & GPA Calculation Workflow"
                width={1024}
                height={576}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl sm:rounded-2xl object-contain shadow-sm"
              />
            </div>
            <figcaption className="text-center text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
              <strong>Figure 1:</strong> The complete 6-step calculation workflow on <span className="font-bold text-slate-900">GradeCalculator.dev</span> — enter assignments, customize your grading scale, apply category weights, get live scores, compute target final exam requirements, and track academic standing.
            </figcaption>
          </figure>

          {/* 6 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-indigo-600 text-white font-black rounded-xl flex items-center justify-center mb-3.5 text-base shadow-sm shadow-indigo-200">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">{t("step1Title")}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("step1Desc")}
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-indigo-600 text-white font-black rounded-xl flex items-center justify-center mb-3.5 text-base shadow-sm shadow-indigo-200">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">{t("step2Title")}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("step2Desc")}
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-indigo-600 text-white font-black rounded-xl flex items-center justify-center mb-3.5 text-base shadow-sm shadow-indigo-200">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">{t("step3Title")}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("step3Desc")}
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-indigo-600 text-white font-black rounded-xl flex items-center justify-center mb-3.5 text-base shadow-sm shadow-indigo-200">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">{t("step4Title")}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("step4Desc")}
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-indigo-600 text-white font-black rounded-xl flex items-center justify-center mb-3.5 text-base shadow-sm shadow-indigo-200">
                5
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">{t("step5Title")}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("step5Desc")}
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-indigo-600 text-white font-black rounded-xl flex items-center justify-center mb-3.5 text-base shadow-sm shadow-indigo-200">
                6
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">{t("step6Title")}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("step6Desc")}
              </p>
            </div>
          </div>
        </section>

        {/* Specialized Tools Grid */}
        <section id="popular-tools" className="space-y-6">
          <RelatedCalculators currentKey="grade-calculator" />
        </section>

        {/* Grade Scale Reference */}
        <section id="grading-scale" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t("gradeScaleTitle")}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {t("gradeScaleSubtitle")}
            </p>
          </div>
          <GradeScaleTable />
        </section>

        {/* Social Share & Study Groups */}
        <div className="flex justify-center">
          <SocialShare
            title="Grade Calculator – Free Online Grade & GPA Tool"
            description="Calculate your grades and final exam requirements instantly with GradeCalculator.dev."
          />
        </div>

        {/* FAQ Section */}
        <section id="faqs">
          <FAQAccordion faqs={defaultHomeFaqs} title={t("faqTitle")} />
        </section>
      </div>
    </div>
  );
}

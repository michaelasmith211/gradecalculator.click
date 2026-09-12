"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import GradeCalculator from "@/components/calculators/GradeCalculator";
import GradeScaleTable from "@/components/GradeScaleTable";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
import AdPlaceholder from "@/components/AdPlaceholder";
import {
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/locales";
import { TOOL_NAMES } from "@/lib/i18n/pageSeo";
import { registerTranslations, Translations } from "@/lib/i18n/translations";

export interface LocalizedSummary {
  quickAnswer: string;
  formula: string;
  keyTakeaways: string[];
}

export interface HomeFaqItem {
  question: string;
  answer: string;
  category?: string;
}

const DEFAULT_ENGLISH_SUMMARY: LocalizedSummary = {
  quickAnswer:
    "A grade calculator calculates your overall percentage, letter grade, and 4.0 GPA by dividing total earned points by total possible points, or by multiplying weighted category scores by their percentage weights.",
  formula: "Grade (%) = (Total Points Earned ÷ Total Points Possible) × 100",
  keyTakeaways: [
    "Instant browser calculations with zero latency as you type",
    "Customizable grade scales (standard plus/minus, 10-point, and custom cutoffs)",
    "100% private in-browser computation with no data storage or sign-up",
    "Available in 39 languages with instant localized calculations",
  ],
};

const DEFAULT_FIGURE_CAPTION =
  "Figure 1: Step-by-step workflow of GradeCalculator.dev showing assignment score entry, scale selection, weight configuration, live grade calculation, final exam planning, and milestone certificate creation.";

interface HomeViewProps {
  locale?: string;
  homeSummary?: LocalizedSummary;
  figureCaption?: string;
  homeFaqs?: HomeFaqItem[];
  initialTranslations?: Partial<Translations>;
  heroHeaderSlot?: React.ReactNode;
}

export default function HomeView({
  locale: propLocale,
  homeSummary: propHomeSummary,
  figureCaption: propFigureCaption,
  homeFaqs: propHomeFaqs,
  initialTranslations,
  heroHeaderSlot,
}: HomeViewProps) {
  const { locale: contextLocale, t } = useI18n();
  // Prioritize active context locale, fallback to propLocale or default
  const currentLocale = contextLocale || propLocale || "en";

  if (propLocale && initialTranslations) {
    registerTranslations(propLocale, initialTranslations);
  }

  const localizedBrandName =
    (TOOL_NAMES["grade-calculator"] && TOOL_NAMES["grade-calculator"][currentLocale]) ||
    t("brand");

  const homeSummary = propHomeSummary || DEFAULT_ENGLISH_SUMMARY;
  const figureCaption = propFigureCaption || DEFAULT_FIGURE_CAPTION;
  const homeFaqs = propHomeFaqs || [
    {
      question: `${t("brand")} – ${t("howToCalculate")}?`,
      answer: `${t("tagline")}\n1. ${t("step1Desc")}\n2. ${t("step2Desc")}\n3. ${t("step3Desc")}\n4. ${t("step4Desc")}`,
    },
    {
      question: `${t("finalGradeCalculator")} – ${t("scoreNeeded")}?`,
      answer: t("scoreNeededDesc"),
    },
    {
      question: `${t("weightedGradeCalculator")} – ${t("category")} & ${t("weight")}?`,
      answer: t("howItWorksSubtitle"),
    },
    {
      question: `${t("gpaCalculator")} – ${t("cumulativeGpa")}?`,
      answer: t("gradeScaleSubtitle"),
    },
    {
      question: `${t("gradingScale")} & ${t("percentageRange")}?`,
      answer: `${t("gradeScaleTitle")}: A (90-100%), B (80-89%), C (70-79%), D (60-69%), F (<60%).`,
    },
  ];

  const [showInfographic, setShowInfographic] = useState(false);
  const infographicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!infographicRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowInfographic(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(infographicRef.current);
    return () => observer.disconnect();
  }, []);

  const tocItems = [
    { id: "calculator", label: `${localizedBrandName} (Interactive)` },
    { id: "how-it-works", label: t("howItWorksTitle") },
    { id: "popular-tools", label: t("popularToolsTitle") },
    { id: "grading-scale", label: t("gradeScaleTitle") },
    { id: "faqs", label: t("faqTitle") },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/50 pt-10 pb-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {heroHeaderSlot || (
            <div className="text-center max-w-3xl mx-auto mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{localizedBrandName} • 100% Private</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {localizedBrandName}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {t("tagline")}
              </p>
            </div>
          )}

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
          quickAnswer={homeSummary.quickAnswer}
          formula={homeSummary.formula}
          keyTakeaways={homeSummary.keyTakeaways}
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
              <span>{t("howToCalculate")}</span>
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
            <div ref={infographicRef} className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-50 to-slate-100/90 p-2 sm:p-4 border border-slate-200/90 shadow-xl shadow-slate-100 min-h-[180px]">
              {showInfographic ? (
                <img
                  src="/images/how-grade-calculator-works-step-by-step-768w.webp"
                  srcSet="/images/how-grade-calculator-works-step-by-step-480w.webp 480w, /images/how-grade-calculator-works-step-by-step-768w.webp 768w, /images/how-grade-calculator-works-step-by-step.webp 1024w"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 1024px"
                  alt="How GradeCalculator.dev Works – Step-by-Step Grade, GPA, Weighted Average, and Final Exam Calculation Infographic"
                  title="How GradeCalculator.dev Works – 6-Step Grade & GPA Calculation Workflow"
                  width={1024}
                  height={576}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-xl sm:rounded-2xl object-contain shadow-sm"
                />
              ) : (
                <div className="aspect-[16/9] w-full flex items-center justify-center text-slate-400 text-xs sm:text-sm font-medium">
                  <span>How GradeCalculator.dev Works Step-by-Step Infographic</span>
                </div>
              )}
              <noscript>
                <img
                  src="/images/how-grade-calculator-works-step-by-step-768w.webp"
                  alt="How GradeCalculator.dev Works – Step-by-Step Grade, GPA, Weighted Average, and Final Exam Calculation Infographic"
                  width={1024}
                  height={576}
                  className="w-full h-auto rounded-xl sm:rounded-2xl object-contain shadow-sm"
                />
              </noscript>
            </div>
            <figcaption className="text-center text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
              {figureCaption}
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

          {/* Contextual In-Content Linking to Core Calculators */}
          <div className="mt-8 p-6 sm:p-8 bg-gradient-to-br from-indigo-50/80 via-white to-slate-50 border border-indigo-100/80 rounded-2xl shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Looking for Specialized Grading Calculators?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
              Explore our dedicated academic tools designed for specific grading methods, statistical score distributions, and quick test grading:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href={getLocalizedPath("/grade-calculator", currentLocale)}
                prefetch={false}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">
                    Core Tool
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors mt-2">
                    Standard Grade Calculator
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    Detailed points-based grade computation for coursework, homework assignments, and lab reports.
                  </p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 mt-3 flex items-center gap-1">
                  Open Calculator &rarr;
                </span>
              </Link>

              <Link
                href={getLocalizedPath("/average-grade-calculator", currentLocale)}
                prefetch={false}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">
                    Averages &amp; Mean
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors mt-2">
                    Average Grade Calculator
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    Calculate arithmetic mean, median, highest, and lowest scores with instant comma-separated paste.
                  </p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 mt-3 flex items-center gap-1">
                  Open Calculator &rarr;
                </span>
              </Link>

              <Link
                href={getLocalizedPath("/test-grade-calculator", currentLocale)}
                prefetch={false}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">
                    Test Scoring
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors mt-2">
                    Test Grade Calculator
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    Easy Grader scoring chart and instant test percentage conversions for teachers and students.
                  </p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 mt-3 flex items-center gap-1">
                  Open Calculator &rarr;
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Specialized Tools Grid */}
        <section id="popular-tools" className="space-y-6">
          <RelatedCalculators currentKey="home" />
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
            title={`${localizedBrandName} – ${t("tagline")}`}
            description={homeSummary.quickAnswer}
          />
        </div>

        {/* FAQ Section */}
        <section id="faqs">
          <FAQAccordion faqs={homeFaqs} title={t("faqTitle")} />
        </section>
      </div>
    </div>
  );
}

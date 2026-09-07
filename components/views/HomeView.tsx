"use client";

import React, { useMemo } from "react";
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
import { TOOL_NAMES } from "@/lib/i18n/pageSeo";
import {
  getLocalizedHomeSummary,
  getLocalizedFigureCaption,
  getLocalizedHomeFaqs,
} from "@/lib/i18n/localizedContent";

interface HomeViewProps {
  locale?: string;
}

export default function HomeView({ locale: propLocale }: HomeViewProps) {
  const { locale: contextLocale, t } = useI18n();
  // Prioritize active context locale, fallback to propLocale or default
  const currentLocale = contextLocale || propLocale || "en";

  const localizedBrandName =
    (TOOL_NAMES["grade-calculator"] && TOOL_NAMES["grade-calculator"][currentLocale]) ||
    t("brand");

  const homeSummary = useMemo(
    () => getLocalizedHomeSummary(currentLocale, localizedBrandName),
    [currentLocale, localizedBrandName]
  );
  const figureCaption = useMemo(
    () => getLocalizedFigureCaption(currentLocale),
    [currentLocale]
  );
  const homeFaqs = useMemo(
    () => getLocalizedHomeFaqs(currentLocale),
    [currentLocale]
  );

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

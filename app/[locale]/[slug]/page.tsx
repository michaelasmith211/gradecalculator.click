import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NON_DEFAULT_LOCALES, isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { getPageSeo, TOOL_NAMES } from "@/lib/i18n/pageSeo";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateWebApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schema";
import { getTranslations } from "@/lib/i18n/translations";
import {
  getLocalizedSubpageFaqs,
  getLocalizedHomeSummary,
} from "@/lib/i18n/localizedContent";

// Calculator components
import GradeCalculator from "@/components/calculators/GradeCalculator";
import FinalGradeCalculator from "@/components/calculators/FinalGradeCalculator";
import WeightedGradeCalculator from "@/components/calculators/WeightedGradeCalculator";
import GPACalculator from "@/components/calculators/GPACalculator";
import TestGradeCalculator from "@/components/calculators/TestGradeCalculator";
import GradeScaleTable from "@/components/GradeScaleTable";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import AdPlaceholder from "@/components/AdPlaceholder";

export const SUPPORTED_SLUGS = [
  "grade-calculator",
  "final-grade-calculator",
  "weighted-grade-calculator",
  "gpa-calculator",
  "average-grade-calculator",
  "test-grade-calculator",
  "grade-needed-calculator",
  "percentage-grade-calculator",
  "points-grade-calculator",
  "exam-grade-calculator",
  "college-gpa-calculator",
  "semester-gpa-calculator",
  "high-school-gpa-calculator",
  "weighted-average-calculator",
  "grade-scale",
  "gpa-scale",
  "how-to-calculate-grades",
  "grade-calculator-faq",
  "about",
  "contact",
  "privacy-policy",
  "terms-of-use",
  "cookie-policy",
];

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of NON_DEFAULT_LOCALES) {
    for (const slug of SUPPORTED_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED_SLUGS.includes(slug)) {
    return {};
  }
  const currentLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  const seo = getPageSeo(slug, currentLocale);

  return constructMetadata({
    title: seo.title,
    description: seo.description,
    path: `/${slug}`,
    keywords: seo.keywords,
    locale: currentLocale,
  });
}

export default async function LocalizedSubPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!SUPPORTED_SLUGS.includes(slug)) {
    notFound();
  }

  const currentLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  const t = getTranslations(currentLocale);
  const seo = getPageSeo(slug, currentLocale);
  const toolTitle = seo.title.split("–")[0].trim();

  // App Schema
  const appSchema = generateWebApplicationSchema({
    name: toolTitle,
    description: seo.description,
    path: `/${currentLocale}/${slug}/`,
  });

  const breadcrumbs = [
    { name: t.brand, url: `/${currentLocale}/` },
    { name: toolTitle, url: `/${currentLocale}/${slug}/` },
  ];

  const subFaqs = getLocalizedSubpageFaqs(slug, currentLocale, toolTitle);
  const summary = getLocalizedHomeSummary(currentLocale, toolTitle);

  // Render matching interactive calculator component
  const renderCalculatorComponent = () => {
    switch (slug) {
      case "final-grade-calculator":
      case "grade-needed-calculator":
        return <FinalGradeCalculator title={toolTitle} subtitle={seo.description} />;

      case "weighted-grade-calculator":
      case "weighted-average-calculator":
        return <WeightedGradeCalculator title={toolTitle} subtitle={seo.description} />;

      case "gpa-calculator":
      case "college-gpa-calculator":
      case "semester-gpa-calculator":
      case "high-school-gpa-calculator":
        return <GPACalculator title={toolTitle} subtitle={seo.description} />;

      case "test-grade-calculator":
        return <TestGradeCalculator />;

      case "grade-scale":
      case "gpa-scale":
        return (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
            <GradeScaleTable />
          </div>
        );

      case "how-to-calculate-grades":
      case "grade-calculator-faq":
      case "about":
      case "contact":
      case "privacy-policy":
      case "terms-of-use":
      case "cookie-policy":
        return (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">{toolTitle}</h2>
            <p className="text-slate-600 leading-relaxed">{seo.description}</p>
            <div className="pt-4 border-t border-slate-100 flex gap-4">
              <a
                href={`/${currentLocale}/grade-calculator/`}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
              >
                {t.gradeCalculator}
              </a>
            </div>
          </div>
        );

      case "grade-calculator":
      case "percentage-grade-calculator":
      case "points-grade-calculator":
      case "average-grade-calculator":
      case "exam-grade-calculator":
      default:
        return <GradeCalculator title={toolTitle} subtitle={seo.description} />;
    }
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(subFaqs)) }}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/50 pt-8 pb-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={breadcrumbs} />

          <div className="text-center max-w-3xl mx-auto py-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {toolTitle}
            </h1>
            <p className="mt-2 text-base text-slate-600 leading-relaxed font-normal">
              {seo.description}
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="pt-2">{renderCalculatorComponent()}</div>
        </div>
      </section>

      {/* Content & Resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <AdPlaceholder format="horizontal" slotId={`${slug}-banner`} />

        <SeoSummaryBox
          title={`${toolTitle} – ${t.brand}`}
          quickAnswer={seo.description}
          formula={summary.formula}
          keyTakeaways={summary.keyTakeaways}
        />

        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900">{t.gradeScaleTitle}</h2>
            <p className="text-slate-600 text-sm mt-1">{t.gradeScaleSubtitle}</p>
          </div>
          <GradeScaleTable />
        </section>

        <section className="space-y-6">
          <RelatedCalculators currentKey={slug} />
        </section>

        <div className="flex justify-center">
          <SocialShare
            title={`${toolTitle} – GradeCalculator.dev`}
            description={seo.description}
          />
        </div>

        <section>
          <FAQAccordion faqs={subFaqs} title={t.faqTitle} />
        </section>
      </div>
    </div>
  );
}

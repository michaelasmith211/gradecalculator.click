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
import { getServerTranslations } from "@/lib/i18n/translationsServer";
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
import ContactForm from "@/components/ContactForm";
import { Zap, ShieldCheck, Heart, Mail, Clock, MessageSquare, BookOpen, Scale, HelpCircle } from "lucide-react";

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
  const t = getServerTranslations(currentLocale);
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

      case "contact":
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7">
                <ContactForm />
              </div>
              <div className="md:col-span-5 space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-base">Direct Support & Feedback</h3>
                  <div className="space-y-4 text-xs text-slate-600">
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-800">Email Support</div>
                        <a href="mailto:support@gradecalculator.dev" className="text-indigo-600 hover:underline">
                          support@gradecalculator.dev
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-800">Response Window</div>
                        <span>Within 24–48 business hours</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-800">Feature Requests</div>
                        <span>Have a custom grading formula or school scale? Let us know!</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-5 text-xs text-indigo-950 space-y-2">
                  <div className="font-bold text-indigo-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    Zero Data Storage
                  </div>
                  <p className="text-indigo-800/80 leading-relaxed">
                    Grade Calculator does not store coursework grades or personal student records on remote servers. All calculations run strictly in your browser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">{t.aboutUs} – {t.brand}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                At <strong>Grade Calculator</strong> (gradecalculator.dev), we empower students, educators, and parents worldwide with fast, transparent, and mathematically rigorous academic calculation tools. Calculating semester averages, final exam score targets, and cumulative GPA should never require confusing spreadsheets or ad-cluttered websites that lag on mobile devices.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our suite of 15+ calculators is built on modern web standards to ensure instant client-side execution, 100% browser-based data privacy, and zero server storage of personal grades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Mathematical Rigor</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every calculation formula—from weighted harmonic contributions to decimal quality points—is verified and tested against standard institutional benchmarks.
                </p>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Privacy-First Architecture</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We never store, transmit, or monetize your coursework grades. All calculations execute directly in your browser's JavaScript runtime.
                </p>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Always Free & Accessible</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No paywalls, no forced logins, and no intrusive popups. Built to conform to modern WCAG accessibility guidelines.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
              <h3 className="text-xl font-bold">Academic Community & Updates</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Follow Grade Calculator across our official community channels for study tips, grading insights, and calculator releases.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://x.com/gradecalculato"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-indigo-600 rounded-xl border border-white/10 text-xs font-bold transition-all inline-flex items-center gap-2"
                >
                  <span>X (Twitter)</span>
                  <span className="text-slate-300 text-[10px]">@gradecalculato</span>
                </a>
                <a
                  href="https://github.com/michaelasmith211/gradecalculator.click"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-indigo-600 rounded-xl border border-white/10 text-xs font-bold transition-all inline-flex items-center gap-2"
                >
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        );

      case "how-to-calculate-grades":
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Step-by-Step Grade Calculation Guide</h2>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  To compute your current course grade, determine whether your teacher uses a <strong>Point-Based System</strong> or a <strong>Weighted Category System</strong>.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900">1. Total Points System Formula</div>
                  <code className="text-xs text-indigo-700 bg-indigo-50 px-2 py-1 rounded block">
                    Overall Grade (%) = (Total Points Earned ÷ Total Points Possible) × 100
                  </code>
                  <p className="text-xs">
                    Example: If you earned 420 out of 500 total points across assignments: (420 ÷ 500) × 100 = 84.0% (Grade: B).
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900">2. Weighted Category System Formula</div>
                  <code className="text-xs text-indigo-700 bg-indigo-50 px-2 py-1 rounded block">
                    Overall Grade (%) = Σ (Category Score % × Category Weight %) ÷ Σ Weights
                  </code>
                  <p className="text-xs">
                    Example: Homework (90% × 20%) + Midterm (80% × 30%) + Final Exam (85% × 50%) = 18 + 24 + 42.5 = 84.5%.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex gap-4">
                <a
                  href={`/${currentLocale}/grade-calculator/`}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
                >
                  {t.gradeCalculator}
                </a>
              </div>
            </div>
          </div>
        );

      case "grade-calculator-faq":
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
              <p className="text-sm text-slate-600">
                Common questions about calculating course grades, final exam targets, weighted percentages, and GPA.
              </p>
              <FAQAccordion faqs={subFaqs} />
              <div className="pt-4 border-t border-slate-100 flex gap-4">
                <a
                  href={`/${currentLocale}/grade-calculator/`}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
                >
                  {t.gradeCalculator}
                </a>
              </div>
            </div>
          </div>
        );

      case "privacy-policy":
      case "terms-of-use":
      case "cookie-policy":
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">{toolTitle}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{seo.description}</p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-600">
                <div className="font-semibold text-slate-800">Privacy & Policy Commitments:</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Zero personal student data collection or grade tracking.</li>
                  <li>All calculations run client-side in your local browser runtime.</li>
                  <li>Full GDPR and CCPA compliance with granular cookie controls.</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4">
                <a
                  href={`/${currentLocale}/grade-calculator/`}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
                >
                  {t.gradeCalculator}
                </a>
                <a
                  href="/privacy-policy/"
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors"
                >
                  Full English Legal Policy
                </a>
              </div>
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

import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
} from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import GradeScaleTable from "@/components/GradeScaleTable";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
import AdPlaceholder from "@/components/AdPlaceholder";
import { DEFAULT_GRADE_SCALE, STANDARD_10_POINT_SCALE, STRICT_7_POINT_SCALE } from "@/lib/calculations/scales";

export const metadata = constructMetadata({
  title: "Standard Grade Scale – Percentages, Letter Grades & 4.0 GPA",
  description:
    "Comprehensive guide to standard US grading scales, plus/minus grading, 10-point vs 7-point scales, percentage cutoffs, and 4.0 GPA point conversions.",
  path: "/grade-scale",
  type: "article",
  keywords: [
    "grade scale",
    "letter grade scale",
    "standard grading scale",
    "percentage to letter grade",
    "grading system us",
    "college grade scale",
    "high school grading scale",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "What percentage is an A in high school and college?",
    answer:
      "In a standard plus/minus grading system, an A+ is typically 97–100%, an A is 93–96%, and an A- is 90–92%. In straight 10-point systems without plus/minus, any score of 90% or higher is an A.",
  },
  {
    question: "What is the difference between a 10-point scale and a 7-point scale?",
    answer:
      "A 10-point scale awards an 'A' for 90–100%, 'B' for 80–89%, and 'C' for 70–79%. A 7-point scale (used by some strict school districts) requires 93–100% for an 'A', 85–92% for a 'B', and 77–84% for a 'C', making top letter grades more challenging to achieve.",
  },
  {
    question: "Is an A- worth 4.0 GPA points?",
    answer:
      "At most colleges and high schools using plus/minus grading, an A- is awarded 3.7 GPA quality points. An A or A+ receives the maximum unweighted 4.0 points.",
  },
];

export default function GradeScalePage() {
  const breadcrumbs = [
    { name: "Guides", url: "/grade-scale" },
    { name: "Grade Scale Guide", url: "/grade-scale" },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);

  const articleSchema = generateArticleSchema({
    headline: "Standard Grading Scales: Percentages, Letter Grades, and GPA Equivalents",
    description: "Detailed comparison and reference tables for standard plus/minus, 10-point, and 7-point academic grading scales.",
    path: "/grade-scale",
  });

  const tocItems = [
    { id: "standard-scale", label: "1. Plus/Minus Grading Scale" },
    { id: "ten-point-scale", label: "2. Straight 10-Point Scale" },
    { id: "seven-point-scale", label: "3. Strict 7-Point Scale" },
    { id: "faqs", label: "4. Frequently Asked Questions" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Standard Grading Scale Reference
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          Understand how percentage scores translate into letter grades and GPA quality points across high schools and universities.
        </p>
      </header>

      {/* SEO Snippet Box */}
      <SeoSummaryBox
        title="Grade Scale Key Takeaways"
        quickAnswer="A standard US grading scale maps 90–100% to an A (4.0 GPA), 80–89% to a B (3.0 GPA), 70–79% to a C (2.0 GPA), 60–69% to a D (1.0 GPA), and below 60% to an F (0.0 GPA)."
        keyTakeaways={[
          "Plus/Minus scales offer granular distinctions (A- = 3.7 GPA, B+ = 3.3 GPA, B- = 2.7 GPA)",
          "10-Point scales do not differentiate + or - modifiers, awarding flat 4.0 for all scores ≥90%",
          "7-Point scales raise the threshold for an A to 93% and passing (D-) to 70%",
          "Always confirm your institution's specific syllabus cutoff percentages",
        ]}
      />

      <TableOfContents items={tocItems} />

      {/* Scale 1: Plus/Minus Standard */}
      <section id="standard-scale" className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">1. Standard Plus/Minus Grading Scale</h2>
          <p className="text-xs text-slate-600">The most widely used grading standard in modern US higher education and secondary schools.</p>
        </div>
        <GradeScaleTable scale={DEFAULT_GRADE_SCALE} />
      </section>

      {/* Scale 2: Straight 10-Point Scale */}
      <section id="ten-point-scale" className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">2. Straight 10-Point Scale (No Plus/Minus)</h2>
          <p className="text-xs text-slate-600">Common in school districts where grades do not utilize + or - modifiers.</p>
        </div>
        <GradeScaleTable scale={STANDARD_10_POINT_SCALE} />
      </section>

      {/* Scale 3: Strict 7-Point Scale */}
      <section id="seven-point-scale" className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">3. Strict 7-Point Grading Scale</h2>
          <p className="text-xs text-slate-600">Used by select private institutions and specialized academic programs.</p>
        </div>
        <GradeScaleTable scale={STRICT_7_POINT_SCALE} />
      </section>

      <AdPlaceholder format="horizontal" slotId="grade-scale-mid-ad" />

      {/* FAQs */}
      <section id="faqs">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Social Share */}
      <SocialShare
        title="Standard Grade Scale – Percentages, Letter Grades & 4.0 GPA"
        description="Comprehensive guide to standard US grading scales, plus/minus grading, and GPA conversions."
      />

      <RelatedCalculators currentKey="grade-scale" />
    </div>
  );
}

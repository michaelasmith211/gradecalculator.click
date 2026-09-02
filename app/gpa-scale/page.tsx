import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import AdPlaceholder from "@/components/AdPlaceholder";
import { Award, GraduationCap, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "GPA Scale Reference – 4.0 vs 5.0 Weighted Scale Guide",
  description:
    "Complete guide to the 4.0 GPA scale, quality points, honors weighting (+0.5), AP/IB weighting (+1.0), and cumulative GPA calculation.",
  path: "/gpa-scale",
  type: "article",
  keywords: [
    "gpa scale",
    "4.0 gpa scale",
    "5.0 gpa scale",
    "weighted gpa scale",
    "quality points chart",
    "gpa scale chart",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "What is a 4.0 GPA scale?",
    answer:
      "A 4.0 GPA scale is the standard US numerical grading system where an 'A' corresponds to 4.0 points, a 'B' to 3.0 points, a 'C' to 2.0 points, a 'D' to 1.0 point, and an 'F' to 0.0 points.",
  },
  {
    question: "How does a 5.0 weighted GPA scale work?",
    answer:
      "A 5.0 weighted scale awards up to 5.0 grade points for an 'A' earned in college-level Advanced Placement (AP), International Baccalaureate (IB), or Dual Enrollment courses. Honors courses typically award up to 4.5 points for an 'A'.",
  },
  {
    question: "What GPA is considered a 4.0?",
    answer:
      "A 4.0 GPA represents straight A grades across all attempted credit hours on an unweighted scale. Earning an A- (3.7) will bring a cumulative unweighted GPA slightly below a pure 4.0.",
  },
];

export default function GPAScalePage() {
  const breadcrumbs = [
    { name: "Guides", url: "/grade-scale" },
    { name: "GPA Scale Reference", url: "/gpa-scale" },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          GPA Scale & Quality Points Reference
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          Everything you need to know about standard 4.0 unweighted GPA scales, weighted 5.0 scales, credit hours, and Latin Honors standings.
        </p>
      </header>

      {/* Main Table: Quality Points by Course Level */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Complete GPA Quality Points Table
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Compare standard unweighted 4.0 grade points against Honors (+0.5) and AP/IB/College (+1.0) weighted values:
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="px-4 py-2.5">Letter Grade</th>
                <th className="px-4 py-2.5">Percentage</th>
                <th className="px-4 py-2.5">Regular (4.0)</th>
                <th className="px-4 py-2.5">Honors (+0.5)</th>
                <th className="px-4 py-2.5">AP / IB / College (+1.0)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">A+</td>
                <td className="px-4 py-2.5">97–100%</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">4.0</td>
                <td className="px-4 py-2.5 font-bold text-indigo-600">4.5</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600">5.0</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">A</td>
                <td className="px-4 py-2.5">93–96%</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">4.0</td>
                <td className="px-4 py-2.5 font-bold text-indigo-600">4.5</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600">5.0</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">A-</td>
                <td className="px-4 py-2.5">90–92%</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">3.7</td>
                <td className="px-4 py-2.5 font-bold text-indigo-600">4.2</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600">4.7</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">B+</td>
                <td className="px-4 py-2.5">87–89%</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">3.3</td>
                <td className="px-4 py-2.5 font-bold text-indigo-600">3.8</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600">4.3</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">B</td>
                <td className="px-4 py-2.5">83–86%</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">3.0</td>
                <td className="px-4 py-2.5 font-bold text-indigo-600">3.5</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600">4.0</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">B-</td>
                <td className="px-4 py-2.5">80–82%</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">2.7</td>
                <td className="px-4 py-2.5 font-bold text-indigo-600">3.2</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600">3.7</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">C+</td>
                <td className="px-4 py-2.5">77–79%</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">2.3</td>
                <td className="px-4 py-2.5 font-bold text-indigo-600">2.8</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600">3.3</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">C</td>
                <td className="px-4 py-2.5">73–76%</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">2.0</td>
                <td className="px-4 py-2.5 font-bold text-indigo-600">2.5</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600">3.0</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">C-</td>
                <td className="px-4 py-2.5">70–72%</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">1.7</td>
                <td className="px-4 py-2.5 font-bold text-indigo-600">2.2</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600">2.7</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">D</td>
                <td className="px-4 py-2.5">60–69%</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">1.0</td>
                <td className="px-4 py-2.5 font-bold text-indigo-600">1.5</td>
                <td className="px-4 py-2.5 font-bold text-emerald-600">2.0</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold text-slate-900">F</td>
                <td className="px-4 py-2.5">Below 60%</td>
                <td className="px-4 py-2.5 font-semibold text-rose-600">0.0</td>
                <td className="px-4 py-2.5 font-semibold text-rose-600">0.0</td>
                <td className="px-4 py-2.5 font-semibold text-rose-600">0.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* College Academic Standing & Honors Reference */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          College Academic Standings & Latin Honors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm block">Summa Cum Laude</span>
            <p className="text-indigo-600 font-bold">3.80 – 4.00 GPA</p>
            <p className="text-slate-600">"With Highest Honor" – Typically top 1–5% of graduating class.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm block">Magna Cum Laude</span>
            <p className="text-indigo-600 font-bold">3.50 – 3.79 GPA</p>
            <p className="text-slate-600">"With Great Honor" – Top 10–15% of graduating class.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm block">Cum Laude</span>
            <p className="text-indigo-600 font-bold">3.20 – 3.49 GPA</p>
            <p className="text-slate-600">"With Honor" – Dean's honor roll designation.</p>
          </div>
        </div>
      </section>

      <AdPlaceholder format="horizontal" slotId="gpa-scale-mid-ad" />

      <FAQAccordion faqs={faqs} />

      <RelatedCalculators currentKey="gpa-scale" recommendedKeys={["gpa-calculator", "college-gpa-calculator", "high-school-gpa-calculator", "grade-scale"]} />
    </div>
  );
}

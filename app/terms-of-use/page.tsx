import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = constructMetadata({
  title: "Terms of Use – Grade Calculator",
  description:
    "Terms of Use for Grade Calculator (gradecalculator.click). Read our terms and conditions for using our educational calculation tools.",
  path: "/terms-of-use",
});

export default function TermsOfUsePage() {
  const breadcrumbs = [{ name: "Terms of Use", url: "/terms-of-use" }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Use
        </h1>
        <p className="text-xs text-slate-500">Effective Date: January 1, 2026</p>
      </header>

      <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and using <strong>Grade Calculator</strong> (gradecalculator.click), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Educational & Estimation Purpose</h2>
          <p>
            The calculation tools, GPA estimators, final exam required score calculators, and grading charts provided on this website are for educational and planning purposes only. While we make every effort to maintain absolute mathematical accuracy, individual school districts, universities, academic departments, and instructors maintain distinct grading policies, rounding formulas, curve rules, and GPA quality point scales.
          </p>
          <p>
            Official academic standing, graduation eligibility, Dean's List qualifications, and honors designations are determined solely by your educational institution's registrar.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Intellectual Property</h2>
          <p>
            The content, layout, design, data, graphics, and code on Grade Calculator are protected by intellectual property and copyright laws. You may use our tools for personal, non-commercial academic purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Limitation of Liability</h2>
          <p>
            In no event shall Grade Calculator, its developers, or affiliates be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our tools or reliance on mathematical estimations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Modifications to Terms</h2>
          <p>
            We reserve the right to revise these Terms of Use at any time without prior notice. By continuing to use the website after changes are posted, you agree to be bound by the revised terms.
          </p>
        </section>
      </div>
    </div>
  );
}

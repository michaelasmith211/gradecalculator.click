import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";

export const metadata = constructMetadata({
  title: "Contact & Support – Feedback & Help",
  description:
    "Have questions, feedback, or calculator feature requests? Contact the Grade Calculator team for support.",
  path: "/contact",
  keywords: ["contact grade calculator", "support", "feedback", "feature requests"],
});

export default function ContactPage() {
  const breadcrumbs = [{ name: "Contact", url: "/contact" }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Contact & Support
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
          Have feedback, found a calculation discrepancy, or want to suggest a new grading tool? We'd love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="md:col-span-7">
          <ContactForm />
        </div>

        {/* Right Info */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Direct Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We respond to inquiries regarding calculation discrepancies, school scale requests, and partnership proposals.
            </p>
            <div className="pt-2 text-xs font-mono text-indigo-700 font-semibold">
              support@gradecalculator.dev
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2 text-xs text-slate-600">
            <h3 className="font-bold text-slate-900 text-sm">Academic Privacy</h3>
            <p className="leading-relaxed">
              Please do not send sensitive personal student records or student IDs. Our calculators operate client-side and do not require identification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

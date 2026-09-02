import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Calculator, ShieldCheck, Zap, Heart, CheckCircle2, Globe } from "lucide-react";

export const metadata = constructMetadata({
  title: "About Us – Our Mission & Mathematical Accuracy",
  description:
    "Learn about Grade Calculator, our commitment to mathematical precision, student privacy, and providing free, accessible academic planning tools.",
  path: "/about",
  keywords: ["about grade calculator", "grade calculator mission", "student math tools"],
});

export default function AboutPage() {
  const breadcrumbs = [{ name: "About Us", url: "/about" }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          About Grade Calculator
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Empowering students, educators, and parents worldwide with fast, transparent, and accurate grade calculation tools.
        </p>
      </header>

      {/* Mission Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          At <strong>Grade Calculator</strong> (gradecalculator.dev), we believe that every student deserves clear, transparent insight into their academic performance. Calculating semester averages, final exam targets, and GPA should not require confusing spreadsheets or ad-cluttered websites that lag on mobile devices.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Our suite of 15+ calculators is built on modern web technologies to ensure lightning-fast responsiveness, 100% browser-side data privacy, and mathematical rigor across every formula.
        </p>
      </section>

      {/* Core Principles */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Mathematical Rigor</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every calculation formula—from weighted harmonic contributions to decimal quality points—is verified and tested against standard institutional benchmarks.
          </p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Privacy-First Architecture</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We never store, transmit, or monetize your coursework grades. All calculations execute directly in your browser's JavaScript runtime.
          </p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Always Free & Accessible</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No paywalls, no forced logins, and no intrusive popups. Built to conform to modern WCAG accessibility guidelines.
          </p>
        </div>
      </section>

      {/* Institutional Variation Disclaimer */}
      <section className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
        <h2 className="text-base font-bold text-slate-900">Academic Policy Disclaimer</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Please note that grading policies, rounding thresholds, quality point distributions, and scale cutoffs vary across universities, colleges, high schools, and individual instructors. Our calculators provide mathematical models based on standard US conventions; always consult your official syllabus or registrar for binding academic determinations.
        </p>
      </section>

      <RelatedCalculators currentKey="about" />
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema, generateArticleSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import { Cookie, ShieldCheck, Lock, Sliders, Info, Globe, CheckCircle2 } from "lucide-react";

export const metadata = constructMetadata({
  title: "Cookie Policy – Grade Calculator Privacy & Consent",
  description:
    "Learn about the cookies and local storage technologies used on GradeCalculator.dev, their purposes, retention durations, and how to manage your preferences.",
  path: "/cookie-policy",
  type: "article",
  keywords: [
    "cookie policy",
    "grade calculator cookies",
    "gdpr cookie policy",
    "privacy and cookies",
    "cookie consent settings",
  ],
});

export default function CookiePolicyPage() {
  const breadcrumbs = [
    { name: "Legal", url: "/privacy-policy" },
    { name: "Cookie Policy", url: "/cookie-policy" },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const articleSchema = generateArticleSchema({
    headline: "GradeCalculator.dev Cookie Policy & Data Privacy Notice",
    description: "Detailed overview of cookies, storage mechanisms, third-party analytics, and consent management.",
    path: "/cookie-policy",
  });

  const tocItems = [
    { id: "what-are-cookies", label: "1. What Are Cookies & Local Storage?" },
    { id: "cookies-we-use", label: "2. Types of Cookies We Use" },
    { id: "cookie-inventory", label: "3. Complete Cookie Inventory Table" },
    { id: "managing-cookies", label: "4. How to Control & Delete Cookies" },
    { id: "global-compliance", label: "5. GDPR, ePrivacy & CCPA Compliance" },
    { id: "policy-updates", label: "6. Updates to This Policy & Contact" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <Cookie className="w-3.5 h-3.5" />
          <span>Privacy & Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Cookie Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Last Updated: <strong>September 2, 2026</strong>. This policy explains how <strong>GradeCalculator.dev</strong> ("we", "our", or "the Service") uses cookies, browser local storage, and similar technologies to provide, secure, and improve our free academic calculators.
        </p>
      </header>

      {/* Quick Interactive Preferences Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-lg font-bold">Manage Your Cookie Preferences</h2>
          <p className="text-xs text-slate-300">
            You can review or change your consent choices for analytics and advertising at any time.
          </p>
        </div>
        <CookiePreferencesButton />
      </div>

      {/* SEO Summary Box */}
      <SeoSummaryBox
        title="Cookie Policy Key Highlights"
        quickAnswer="GradeCalculator.dev uses minimal, privacy-centric cookies. Our calculation engine operates 100% locally in your browser. We never transmit your grades, coursework, or student data to external servers."
        keyTakeaways={[
          "Strictly Essential storage is used only to save your custom grading scales and privacy choices",
          "Analytics cookies (Google Analytics 4) are anonymous and only loaded with your explicit consent",
          "Full compliance with GDPR (EU/UK), ePrivacy Directive, and CCPA/CPRA (California)",
          "You can withdraw or customize your cookie consent at any moment via our settings modal",
        ]}
      />

      <TableOfContents items={tocItems} />

      {/* Section 1 */}
      <section id="what-are-cookies" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          1. What Are Cookies & Local Storage?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>Cookies</strong> are small text files that websites store on your computer, smartphone, or tablet when you visit a webpage. They enable websites to remember your device, preferences, and session state over time.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>Browser Local Storage</strong> is a modern web standard that allows websites to store structured data directly on your device without sending that data across the internet with every network request. We use local storage to keep our calculators blazing fast and 100% private.
        </p>
      </section>

      {/* Section 2 */}
      <section id="cookies-we-use" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          2. Categories of Cookies We Use
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Lock className="w-4 h-4 text-indigo-600" />
              <span>1. Strictly Necessary</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Essential for the website to function properly. Used for saving your custom grading scale percentage cutoffs in your browser and recording your consent preferences. Cannot be switched off.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>2. Analytics & Performance</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Helps us understand how visitors interact with our calculators by collecting anonymous aggregate data (page visits, bounce rates, device types) via Google Analytics 4.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Globe className="w-4 h-4 text-amber-600" />
              <span>3. Advertising Cookies</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Used by advertising partners to deliver relevant educational ads and prevent the same ad from showing repeatedly. Keeps our tools completely free for students.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Detailed Inventory Table */}
      <section id="cookie-inventory" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          3. Complete Cookie & Local Storage Inventory
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The table below provides a full inventory of the cookies and local storage keys utilized on GradeCalculator.dev:
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th scope="col" className="px-4 py-2.5">Key / Cookie Name</th>
                <th scope="col" className="px-4 py-2.5">Category</th>
                <th scope="col" className="px-4 py-2.5">Provider</th>
                <th scope="col" className="px-4 py-2.5">Duration</th>
                <th scope="col" className="px-4 py-2.5">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="px-4 py-2.5 font-mono font-bold text-slate-900">gc_cookie_consent_v1</td>
                <td className="px-4 py-2.5 font-semibold text-indigo-600">Necessary</td>
                <td className="px-4 py-2.5">GradeCalculator.dev</td>
                <td className="px-4 py-2.5">1 Year</td>
                <td className="px-4 py-2.5">Stores your cookie preferences (analytics and advertising consent states).</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono font-bold text-slate-900">_ga</td>
                <td className="px-4 py-2.5 font-semibold text-emerald-600">Analytics</td>
                <td className="px-4 py-2.5">Google Analytics (GA4)</td>
                <td className="px-4 py-2.5">2 Years</td>
                <td className="px-4 py-2.5">Distinguishes unique anonymous website visitors and tracks page sessions.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono font-bold text-slate-900">_ga_HT87NWEHNT</td>
                <td className="px-4 py-2.5 font-semibold text-emerald-600">Analytics</td>
                <td className="px-4 py-2.5">Google Analytics (GA4)</td>
                <td className="px-4 py-2.5">2 Years</td>
                <td className="px-4 py-2.5">Maintains session state and telemetry for measurement ID G-HT87NWEHNT.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono font-bold text-slate-900">__gads, __gpi</td>
                <td className="px-4 py-2.5 font-semibold text-amber-600">Advertising</td>
                <td className="px-4 py-2.5">Google AdSense</td>
                <td className="px-4 py-2.5">13 Months</td>
                <td className="px-4 py-2.5">Measures ad impressions and protects against fraudulent clicks.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4 */}
      <section id="managing-cookies" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          4. How to Control & Delete Cookies
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          You have full control over your cookie settings. You can modify your preferences at any time using our on-site settings or through your browser configuration:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm">Via On-Site Settings</span>
            <p className="leading-relaxed">
              Click the <strong>"Manage Cookie Preferences"</strong> button at the top of this page or in the footer to toggle Analytics and Advertising categories on or off.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 text-sm">Via Web Browser Controls</span>
            <p className="leading-relaxed">
              Most web browsers (Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge) allow you to block or delete cookies in their Settings &rarr; Privacy & Security menu.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Global Compliance */}
      <section id="global-compliance" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          5. Global Privacy Laws & Regulatory Compliance
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          GradeCalculator.dev is engineered to meet and exceed global privacy requirements:
        </p>
        <ul className="text-xs text-slate-700 list-disc list-inside space-y-2 leading-relaxed">
          <li><strong>European Union (GDPR & ePrivacy):</strong> Non-essential cookies are blocked by default until you grant affirmative, informed opt-in consent.</li>
          <li><strong>United Kingdom (UK GDPR & PECR):</strong> Full compliance with Information Commissioner's Office (ICO) cookie standards.</li>
          <li><strong>California (CCPA / CPRA):</strong> We respect Do Not Track signals and do not sell or share personal student records.</li>
          <li><strong>Canada (PIPEDA) & Brazil (LGPD):</strong> Transparent disclosure of all tracking technologies and immediate revocation mechanisms.</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section id="policy-updates" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          6. Updates to This Cookie Policy & Contact Information
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          We may periodically update this Cookie Policy to reflect new browser privacy features or legal requirements. When changes are made, the "Last Updated" date at the top of this document will be updated.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          If you have questions about our cookie usage or data privacy practices, please contact us at:{" "}
          <a href="mailto:support@gradecalculator.dev" className="text-indigo-600 font-bold underline">
            support@gradecalculator.dev
          </a>{" "}
          or visit our <Link href="/contact" className="text-indigo-600 font-bold underline">Contact Page</Link>.
        </p>
      </section>
    </div>
  );
}

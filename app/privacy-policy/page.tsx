import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = constructMetadata({
  title: "Privacy Policy – Grade Calculator",
  description:
    "Privacy Policy for Grade Calculator (gradecalculator.click). Learn how your data is protected through client-side calculations and privacy standards.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = [{ name: "Privacy Policy", url: "/privacy-policy" }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">Effective Date: January 1, 2026</p>
      </header>

      <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Client-Side Data & Academic Privacy</h2>
          <p>
            At <strong>Grade Calculator</strong> (accessible at <a href="https://gradecalculator.click" className="text-indigo-600 underline">https://gradecalculator.click</a>), one of our main priorities is the privacy of our visitors. Our calculators are designed to execute <strong>entirely in your browser's JavaScript engine</strong>. No assignment names, numerical grades, percentages, or GPA records you type into the calculators are transmitted to our servers or stored in any database.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Log Files & Standard Web Telemetry</h2>
          <p>
            Like most modern web services, we follow a standard procedure of using log files when visitors browse the website. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamps, and referring/exit pages. This information is used for analyzing technical trends, administering the site, preventing malicious traffic, and gathering non-personally identifiable demographic information.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Cookies & Advertising Partners</h2>
          <p>
            Grade Calculator may use standard browser cookies to remember user preferences (such as custom grading scales) between page visits. Third-party vendors, including Google and advertising networks, may use cookies to serve advertisements based on a user's prior visits to this website or other websites on the internet.
          </p>
          <p>
            Users may choose to disable cookies through their individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers' respective websites.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Children's Online Privacy Protection Act (COPPA)</h2>
          <p>
            Grade Calculator does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided personal information on our website, we strongly encourage you to contact us immediately, and we will do our best efforts to promptly remove such information from our records.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Contact Us</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>privacy@gradecalculator.click</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

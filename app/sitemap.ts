import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gradecalculator.click";
  const now = new Date();

  const routes = [
    // Core Tools (Priority 1.0 - 0.9)
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/grade-calculator", priority: 0.95, changeFrequency: "daily" as const },
    { path: "/final-grade-calculator", priority: 0.95, changeFrequency: "daily" as const },
    { path: "/weighted-grade-calculator", priority: 0.95, changeFrequency: "daily" as const },
    { path: "/gpa-calculator", priority: 0.95, changeFrequency: "daily" as const },
    
    // Sub-Calculators (Priority 0.85 - 0.8)
    { path: "/semester-gpa-calculator", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/college-gpa-calculator", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/high-school-gpa-calculator", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/average-grade-calculator", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/percentage-grade-calculator", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/grade-needed-calculator", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/test-grade-calculator", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/exam-grade-calculator", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/weighted-average-calculator", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/points-grade-calculator", priority: 0.85, changeFrequency: "weekly" as const },

    // Educational Guides & Reference (Priority 0.8 - 0.7)
    { path: "/how-to-calculate-grades", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/grade-scale", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/gpa-scale", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/grade-calculator-faq", priority: 0.8, changeFrequency: "weekly" as const },

    // Trust & Legal (Priority 0.5)
    { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/privacy-policy", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/terms-of-use", priority: 0.5, changeFrequency: "yearly" as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

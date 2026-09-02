import { SITE_NAME, SITE_URL } from "./metadata";

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Free online grade calculator suite to calculate course grades, weighted averages, final exam scores, and GPA on a 4.0 scale instantly.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/grade-calculator?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateWebApplicationSchema({
  name,
  description,
  path,
  applicationCategory = "EducationalApplication",
}: {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${name} - ${SITE_NAME}`,
    url: `${SITE_URL}${path}`,
    description,
    applicationCategory,
    operatingSystem: "All (Web Browser)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Instant real-time calculation in browser",
      "Support for customizable letter grading scales",
      "Mobile-friendly touch inputs",
      "No registration or sign up required",
      "100% private and client-side execution",
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

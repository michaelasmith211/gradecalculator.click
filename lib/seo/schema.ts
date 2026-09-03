import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "./metadata";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
      caption: SITE_NAME,
    },
    sameAs: [
      "https://x.com/gradecalculato",
      "https://www.facebook.com/gradecalculator100",
      "https://uk.pinterest.com/Gradecalculator100",
      "https://www.reddit.com/user/gradecalculator100",
      "https://www.youtube.com/@gradecalculator100",
      "https://github.com/michaelasmith211/gradecalculator.click",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@gradecalculator.dev",
      url: `${SITE_URL}/contact`,
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Free online grade calculator suite to calculate course grades, weighted averages, final exam scores, and GPA on a 4.0 scale instantly.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/grade-calculator?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  };
}

export function generateWebApplicationSchema({
  name,
  description,
  path,
  applicationCategory = "EducationalApplication",
  ratingValue = "4.9",
  reviewCount = "4850",
  features = [
    "Instant real-time calculation in browser",
    "Support for customizable letter grading scales (Plus/Minus, 10-Point, 7-Point)",
    "Mobile-friendly touch inputs and responsive layout",
    "No registration, sign up, or email required",
    "100% private and client-side execution",
    "One-click social sharing and clipboard copy",
    "Step-by-step mathematical formula explanations",
  ],
}: {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
  ratingValue?: string;
  reviewCount?: string;
  features?: string[];
}) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    "@id": `${url}#app`,
    name: `${name} - ${SITE_NAME}`,
    url: url,
    description: description,
    applicationCategory: applicationCategory,
    operatingSystem: "All (Web Browser, iOS, Android, macOS, Windows, Linux, ChromeOS)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "2.0.0",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      bestRating: "5",
      worstRating: "1",
      ratingCount: reviewCount,
    },
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    screenshot: `${SITE_URL}/opengraph-image`,
    featureList: features,
    inLanguage: "en-US",
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
      })),
    ],
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

export function generateImageObjectSchema({
  url,
  caption,
  width = 1024,
  height = 576,
}: {
  url: string;
  caption: string;
  width?: number;
  height?: number;
}) {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: fullUrl,
    url: fullUrl,
    name: caption,
    caption: caption,
    width: width,
    height: height,
    representativeOfPage: true,
  };
}

export function generateHowToSchema({
  name,
  description,
  path,
  steps,
  image,
  totalTime = "PT2M",
}: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string; url?: string }[];
  image?: string;
  totalTime?: string;
}) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: name,
    description: description,
    url: url,
    image: image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : undefined,
    totalTime: totalTime,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    step: steps.map((s, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: s.name,
      text: s.text,
      url: s.url ? (s.url.startsWith("http") ? s.url : `${SITE_URL}${s.url}`) : `${url}#step-${index + 1}`,
    })),
    tool: [
      {
        "@type": "HowToTool",
        name: `${SITE_NAME} Online Calculator`,
      },
    ],
  };
}

export function generateArticleSchema({
  headline,
  description,
  path,
  datePublished = "2026-01-01T08:00:00+00:00",
  dateModified = "2026-09-01T12:00:00+00:00",
}: {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: headline,
    description: description,
    image: DEFAULT_OG_IMAGE,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
      },
    },
    inLanguage: "en-US",
  };
}

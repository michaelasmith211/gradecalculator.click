import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { generateWebSiteSchema, generateOrganizationSchema } from "@/lib/seo/schema";

const GA_MEASUREMENT_ID = "G-HT87NWEHNT";

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gradecalculator.dev"),
  title: {
    template: "%s | Grade Calculator",
    default: "Grade Calculator – Calculate Your Grade & GPA Instantly",
  },
  description:
    "Use our free Grade Calculator to calculate percentages, letter grades, weighted grades, averages, and 4.0 GPA instantly. Easy, fast, and mobile-friendly.",
  applicationName: "Grade Calculator",
  authors: [{ name: "Grade Calculator Team" }],
  creator: "Grade Calculator",
  publisher: "Grade Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Grade Calculator",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

import { I18nProvider } from "@/lib/i18n/context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebSiteSchema();
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Strict HTTP-to-HTTPS Redirection & Insecure Request Upgrade */}
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (typeof window !== 'undefined' && window.location.protocol === 'http:' && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
                    window.location.replace('https://' + window.location.hostname + window.location.pathname + window.location.search + window.location.hash);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

        {/* Immediate client-side HTML lang & dir configuration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var p = window.location.pathname.split('/').filter(Boolean)[0];
                  var rtlLocales = ['ar', 'he', 'fa', 'ur'];
                  if (p && p.length === 2) {
                    document.documentElement.lang = p;
                    if (rtlLocales.indexOf(p) !== -1) {
                      document.documentElement.dir = 'rtl';
                    }
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

        {/* Dynamic Route & SPA Google Analytics 4 */}
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />

        {/* Structured Data: WebSite & Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="font-sans antialiased text-slate-900 bg-slate-50/40 flex flex-col min-h-screen selection:bg-indigo-500 selection:text-white">
        <I18nProvider>
          <Header />
          <main className="flex-grow pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
          <CookieConsent />
        </I18nProvider>
      </body>
    </html>
  );
}

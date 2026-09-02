import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { generateWebSiteSchema } from "@/lib/seo/schema";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Favicon & Mobile App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Dynamic Route & SPA Google Analytics 4 */}
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans antialiased text-slate-900 bg-slate-50/40 flex flex-col min-h-screen selection:bg-indigo-500 selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

"use client";

import React, { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

function AnalyticsTracker({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || typeof window === "undefined" || !(window as any).gtag) return;

    const query = searchParams ? searchParams.toString() : "";
    const url = query ? `${pathname}?${query}` : pathname;

    // Send page_view event on every SPA route transition
    (window as any).gtag("config", measurementId, {
      page_path: url,
      page_title: document.title,
    });
  }, [pathname, searchParams, measurementId]);

  return null;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            send_page_view: false // We trigger page views dynamically on route change
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <AnalyticsTracker measurementId={measurementId} />
      </Suspense>
    </>
  );
}

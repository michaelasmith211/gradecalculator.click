"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const [loadGa, setLoadGa] = useState(false);

  useEffect(() => {
    // Defer Google Analytics loading until browser is truly idle or user interacts
    const enableGa = () => {
      setLoadGa(true);
      window.removeEventListener("scroll", enableGa);
      window.removeEventListener("pointerdown", enableGa);
      window.removeEventListener("keydown", enableGa);
    };

    window.addEventListener("scroll", enableGa, { passive: true });
    window.addEventListener("pointerdown", enableGa, { passive: true });
    window.addEventListener("keydown", enableGa, { passive: true });

    // Fallback: load after 4 seconds if completely idle
    const timer = setTimeout(() => {
      enableGa();
    }, 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", enableGa);
      window.removeEventListener("pointerdown", enableGa);
      window.removeEventListener("keydown", enableGa);
    };
  }, []);

  if (!loadGa) return null;

  return (
    <>
      {/* Official Google Analytics 4 (gtag.js) Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname + window.location.search,
            page_title: document.title,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}

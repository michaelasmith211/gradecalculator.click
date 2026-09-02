"use client";

import React, { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import {
  getStoredCookiePreferences,
  COOKIE_CONSENT_EVENT,
  CookiePreferences,
} from "@/lib/cookies/consent";

interface GoogleAnalyticsProps {
  measurementId: string;
}

function AnalyticsTracker({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only send pageviews if analytics consent is granted
    const prefs = getStoredCookiePreferences();
    if (!prefs || !prefs.analytics) return;

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
  useEffect(() => {
    // Check initial stored preferences and sync with gtag
    if (typeof window !== "undefined") {
      const prefs = getStoredCookiePreferences();
      if (prefs && (window as any).gtag) {
        (window as any).gtag("consent", "update", {
          analytics_storage: prefs.analytics ? "granted" : "denied",
          ad_storage: prefs.marketing ? "granted" : "denied",
          ad_user_data: prefs.marketing ? "granted" : "denied",
          ad_personalization: prefs.marketing ? "granted" : "denied",
        });
      }

      const handleConsentChange = (e: Event) => {
        const customEvent = e as CustomEvent<CookiePreferences>;
        const updatedPrefs = customEvent.detail;
        if ((window as any).gtag && updatedPrefs) {
          (window as any).gtag("consent", "update", {
            analytics_storage: updatedPrefs.analytics ? "granted" : "denied",
            ad_storage: updatedPrefs.marketing ? "granted" : "denied",
            ad_user_data: updatedPrefs.marketing ? "granted" : "denied",
            ad_personalization: updatedPrefs.marketing ? "granted" : "denied",
          });

          // If analytics was just granted, fire initial page view
          if (updatedPrefs.analytics) {
            (window as any).gtag("config", measurementId, {
              page_path: window.location.pathname + window.location.search,
              page_title: document.title,
            });
          }
        }
      };

      window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
      return () => {
        window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
      };
    }
  }, [measurementId]);

  return (
    <>
      {/* Google Consent Mode v2 Default Initialization Script */}
      <Script id="google-consent-mode-init" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          // Check if consent was previously given
          var initialConsent = null;
          try {
            var raw = localStorage.getItem('gc_cookie_consent_v1');
            if (raw) initialConsent = JSON.parse(raw);
          } catch(e) {}

          var hasAnalytics = initialConsent ? initialConsent.analytics === true : false;
          var hasMarketing = initialConsent ? initialConsent.marketing === true : false;

          // Set default Consent Mode v2 values
          gtag('consent', 'default', {
            'analytics_storage': hasAnalytics ? 'granted' : 'denied',
            'ad_storage': hasMarketing ? 'granted' : 'denied',
            'ad_user_data': hasMarketing ? 'granted' : 'denied',
            'ad_personalization': hasMarketing ? 'granted' : 'denied',
            'wait_for_update': 500
          });
        `}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            send_page_view: false // Managed dynamically via router
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <AnalyticsTracker measurementId={measurementId} />
      </Suspense>
    </>
  );
}

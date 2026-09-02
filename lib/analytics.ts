/**
 * Lightweight, non-blocking custom analytics event logger.
 * Ready for Google Analytics 4 (GA4), Plausible, or custom beacons.
 */
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window === "undefined") return;

  try {
    // Custom window dataLayer or gtag forwarder if present
    if ((window as any).gtag) {
      (window as any).gtag("event", eventName, params);
    }
    
    // Developer console logger in dev mode
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log(`[Analytics Event] ${eventName}:`, params);
    }
  } catch (err) {
    // Never crash the UI on telemetry error
  }
}

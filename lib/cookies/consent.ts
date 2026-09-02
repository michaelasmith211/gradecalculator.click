export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: number;
}

export const COOKIE_CONSENT_KEY = "gc_cookie_consent_v1";
export const COOKIE_CONSENT_EVENT = "gc_cookie_consent_updated";

export const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: "",
  version: 1,
};

/**
 * Reads stored cookie preferences from localStorage safely in browser environments.
 */
export function getStoredCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.necessary === "boolean") {
      return parsed as CookiePreferences;
    }
  } catch (err) {
    console.error("Failed to read cookie consent preferences:", err);
  }

  return null;
}

/**
 * Saves cookie preferences to localStorage and dispatches a global update event.
 */
export function saveCookiePreferences(prefs: { analytics: boolean; marketing: boolean }) {
  if (typeof window === "undefined") return;

  const updated: CookiePreferences = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    timestamp: new Date().toISOString(),
    version: 1,
  };

  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(updated));

    // Update Google Consent Mode v2 if gtag is available
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("consent", "update", {
        analytics_storage: prefs.analytics ? "granted" : "denied",
        ad_storage: prefs.marketing ? "granted" : "denied",
        ad_user_data: prefs.marketing ? "granted" : "denied",
        ad_personalization: prefs.marketing ? "granted" : "denied",
      });
    }

    // Dispatch event for other components to react dynamically
    window.dispatchEvent(
      new CustomEvent(COOKIE_CONSENT_EVENT, { detail: updated })
    );
  } catch (err) {
    console.error("Failed to save cookie consent preferences:", err);
  }
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Cookie,
  ShieldCheck,
  Check,
  X,
  Sliders,
  Info,
  Lock,
  BarChart3,
  Megaphone,
} from "lucide-react";
import {
  getStoredCookiePreferences,
  saveCookiePreferences,
  CookiePreferences,
} from "@/lib/cookies/consent";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredCookiePreferences();
    if (!stored) {
      // Delay opening banner slightly for smooth page entry
      const timer = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(timer);
    } else {
      setAnalyticsConsent(stored.analytics);
      setMarketingConsent(stored.marketing);
    }
  }, []);

  // Listen for open cookie settings custom event
  useEffect(() => {
    const handleOpenSettings = () => {
      const stored = getStoredCookiePreferences();
      if (stored) {
        setAnalyticsConsent(stored.analytics);
        setMarketingConsent(stored.marketing);
      }
      setShowModal(true);
    };

    window.addEventListener("gc_open_cookie_settings", handleOpenSettings);
    return () => {
      window.removeEventListener("gc_open_cookie_settings", handleOpenSettings);
    };
  }, []);

  if (!mounted) return null;

  const handleAcceptAll = () => {
    saveCookiePreferences({ analytics: true, marketing: true });
    setAnalyticsConsent(true);
    setMarketingConsent(true);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleRejectNonEssential = () => {
    saveCookiePreferences({ analytics: false, marketing: false });
    setAnalyticsConsent(false);
    setMarketingConsent(false);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleSaveCustom = () => {
    saveCookiePreferences({
      analytics: analyticsConsent,
      marketing: marketingConsent,
    });
    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      {/* 1. Floating Cookie Consent Banner */}
      {showBanner && !showModal && (
        <aside
          aria-label="Cookie Consent Banner"
          className="fixed bottom-16 md:bottom-6 left-3 right-3 md:left-auto md:right-6 z-50 max-w-lg bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-2xl p-4 sm:p-5 text-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>We Value Your Privacy</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                We use cookies and local storage to personalize your experience, remember your grading scale settings, and analyze anonymous calculator traffic in accordance with our{" "}
                <Link
                  href="/cookie-policy"
                  className="text-indigo-600 font-semibold underline hover:text-indigo-800"
                >
                  Cookie Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-indigo-600 font-semibold underline hover:text-indigo-800"
                >
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all active:scale-95 text-center order-3 sm:order-1"
            >
              Preferences
            </button>
            <button
              type="button"
              onClick={handleRejectNonEssential}
              className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-95 text-center order-2"
            >
              Reject Non-Essential
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all active:scale-95 text-center order-1 sm:order-3"
            >
              Accept All
            </button>
          </div>
        </aside>
      )}

      {/* 2. Granular Cookie Preferences Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-indigo-600" />
                <h3 id="cookie-modal-title" className="text-base sm:text-lg font-bold text-slate-900">
                  Cookie & Privacy Preferences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
                aria-label="Close preferences modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
              <p className="text-slate-600 leading-relaxed">
                Customize your cookie consent settings below. Essential cookies are required for basic calculator operations and local grading scale preferences. You can enable or disable non-essential categories at any time.
              </p>

              {/* Category 1: Necessary */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Lock className="w-4 h-4 text-indigo-600" />
                    <span>Essential / Strictly Necessary</span>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    Always Active
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Required for site navigation, security, saving custom syllabus grade cutoffs locally on your device, and remembering your privacy choices.
                </p>
              </div>

              {/* Category 2: Analytics */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    <span>Analytics & Performance</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsConsent}
                      onChange={(e) => setAnalyticsConsent(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Allows us to count visits, calculate error-free uptime, and aggregate anonymous traffic patterns via Google Analytics 4 (Measurement ID G-HT87NWEHNT) so we can continuously improve our calculators.
                </p>
              </div>

              {/* Category 3: Marketing / Ads */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Megaphone className="w-4 h-4 text-amber-600" />
                    <span>Personalized Advertising</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Used by our advertising partners to serve relevant, non-intrusive educational advertisements that keep this tool 100% free for students worldwide.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 sm:px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl transition-colors text-center order-2 sm:order-1"
              >
                Reject Non-Essential
              </button>
              <div className="flex items-center gap-2 order-1 sm:order-2">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl shadow-sm transition-all text-center"
                >
                  Save Preferences
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all text-center"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

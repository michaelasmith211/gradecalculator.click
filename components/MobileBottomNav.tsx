"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  Target,
  GraduationCap,
  Percent,
  Share2,
  Check,
  Menu,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/locales";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const { locale, t } = useI18n();

  const isActive = (path: string) => {
    if (path === "/" && (pathname === "/" || pathname === "/grade-calculator")) return true;
    return pathname === path;
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://gradecalculator.dev";
    const title = typeof document !== "undefined" ? document.title : "Grade Calculator";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: "Calculate your grades and GPA instantly!",
          url,
        });
        trackEvent("mobile_nav_share_native");
        return;
      } catch (err) {
        // Fallback
      }
    }

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        trackEvent("mobile_nav_share_copied");
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {}
  };

  const gradePath = getLocalizedPath("/grade-calculator", locale);
  const homePath = getLocalizedPath("/", locale);
  const finalPath = getLocalizedPath("/final-grade-calculator", locale);
  const weightedPath = getLocalizedPath("/weighted-grade-calculator", locale);
  const gpaPath = getLocalizedPath("/gpa-calculator", locale);

  const navItems = [
    {
      name: t("gradeCalculator") || "Grade",
      href: gradePath,
      icon: Calculator,
      active: pathname === gradePath || pathname === homePath,
    },
    {
      name: t("finalGrade") || "Final Exam",
      href: finalPath,
      icon: Target,
      active: pathname === finalPath,
    },
    {
      name: t("weighted") || "Weighted",
      href: weightedPath,
      icon: Percent,
      active: pathname === weightedPath,
    },
    {
      name: t("gpaCalculator") || "4.0 GPA",
      href: gpaPath,
      icon: GraduationCap,
      active: pathname === gpaPath,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              prefetch={false}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all active:scale-95 touch-manipulation min-w-[56px] ${
                item.active
                  ? "text-indigo-600 font-bold"
                  : "text-slate-600 hover:text-indigo-600 font-medium"
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  item.active ? "bg-indigo-50 text-indigo-600" : "text-slate-500"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* 1-Tap Share Button on Mobile */}
        <button
          type="button"
          onClick={handleShare}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-600 hover:text-indigo-600 font-medium transition-all active:scale-95 touch-manipulation min-w-[56px]"
          title="Share this page"
          aria-label="Share page"
        >
          <div className={`p-1 rounded-lg transition-colors ${copied ? "bg-emerald-50 text-emerald-600" : "text-slate-500"}`}>
            {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
          </div>
          <span className={`text-[10px] tracking-tight mt-0.5 ${copied ? "text-emerald-600 font-bold" : ""}`}>
            {copied ? "Copied!" : "Share"}
          </span>
        </button>
      </div>
    </nav>
  );
}

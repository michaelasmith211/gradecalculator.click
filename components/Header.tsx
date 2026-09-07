"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  ChevronDown,
  Menu,
  X,
  BookOpen,
  HelpCircle,
  GraduationCap,
  Sparkles,
  Award,
  Globe,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getLocalizedPath } from "@/lib/i18n/locales";
import LanguageSwitcherModal from "./LanguageSwitcherModal";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const pathname = usePathname();
  const { locale, localeConfig, t } = useI18n();

  const mainTools = [
    { name: t("gradeCalculator"), href: getLocalizedPath("/grade-calculator", locale), desc: "Total points & percentage" },
    { name: t("finalGradeCalculator"), href: getLocalizedPath("/final-grade-calculator", locale), desc: "Target final exam score" },
    { name: t("weightedGradeCalculator"), href: getLocalizedPath("/weighted-grade-calculator", locale), desc: "Category weights (HW/Exams)" },
    { name: t("gpaCalculator"), href: getLocalizedPath("/gpa-calculator", locale), desc: "High school & college GPA" },
    { name: t("averageGradeCalculator"), href: getLocalizedPath("/average-grade-calculator", locale), desc: "Arithmetic mean & median" },
    { name: t("testGradeCalculator"), href: getLocalizedPath("/test-grade-calculator", locale), desc: "Easy Grader scoring chart" },
    { name: t("gradeNeededCalculator"), href: getLocalizedPath("/grade-needed-calculator", locale), desc: "Score required on remaining work" },
    { name: t("percentageCalculator"), href: getLocalizedPath("/percentage-grade-calculator", locale), desc: "Fraction to % converter" },
  ];

  const resources = [
    { name: t("howToCalculate"), href: getLocalizedPath("/how-to-calculate-grades", locale) },
    { name: t("gradeScale"), href: getLocalizedPath("/grade-scale", locale) },
    { name: t("gpaScale"), href: getLocalizedPath("/gpa-scale", locale) },
    { name: t("faq"), href: getLocalizedPath("/grade-calculator-faq", locale) },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            href={getLocalizedPath("/", locale)}
            className="flex items-center gap-2.5 font-extrabold text-xl text-slate-900 tracking-tight group"
          >
            <img
              src="/favicon.png"
              alt="Grade Calculator Logo"
              className="w-8 h-8 rounded-lg shadow-sm object-contain"
            />
            <span>
              Grade<span className="text-indigo-600">Calculator</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 text-sm font-semibold">
            <Link
              href={getLocalizedPath("/grade-calculator", locale)}
              className={`px-2.5 lg:px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                isActive(getLocalizedPath("/grade-calculator", locale))
                  ? "text-indigo-600 bg-indigo-50 font-bold"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              {t("gradeCalculator")}
            </Link>

            <Link
              href={getLocalizedPath("/final-grade-calculator", locale)}
              className={`px-2.5 lg:px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                isActive(getLocalizedPath("/final-grade-calculator", locale))
                  ? "text-indigo-600 bg-indigo-50 font-bold"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              {t("finalGrade")}
            </Link>

            <Link
              href={getLocalizedPath("/weighted-grade-calculator", locale)}
              className={`px-2.5 lg:px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                isActive(getLocalizedPath("/weighted-grade-calculator", locale))
                  ? "text-indigo-600 bg-indigo-50 font-bold"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              {t("weighted")}
            </Link>

            <Link
              href={getLocalizedPath("/gpa-calculator", locale)}
              className={`px-2.5 lg:px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                isActive(getLocalizedPath("/gpa-calculator", locale))
                  ? "text-indigo-600 bg-indigo-50 font-bold"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              {t("gpaCalculator")}
            </Link>

            {/* Dropdown for More Calculators & Guides */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 200)}
                className="flex items-center gap-1 px-2.5 lg:px-3 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none whitespace-nowrap"
                aria-expanded={toolsDropdownOpen}
              >
                <span>{t("toolsMenu")}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {t("calculatorsAndTools")}
                  </div>
                  {mainTools.slice(4).map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      <div className="font-semibold text-slate-900">{tool.name}</div>
                      <div className="text-xs text-slate-600 line-clamp-1">{tool.desc}</div>
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 my-1"></div>
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {t("resourcesMenu")}
                  </div>
                  {resources.map((res) => (
                    <Link
                      key={res.href}
                      href={res.href}
                      className="block px-4 py-1.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-medium"
                    >
                      {res.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Right: Language Selector & CTA */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Language Switcher Trigger Pill */}
            <button
              type="button"
              onClick={() => setLangModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-100/90 hover:bg-indigo-50/80 border border-slate-200/90 hover:border-indigo-200 rounded-full transition-all shadow-xs whitespace-nowrap cursor-pointer"
              title="Change Language (39 Available)"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>{localeConfig.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            <Link
              href={getLocalizedPath("/final-grade-calculator", locale)}
              className="inline-flex items-center justify-center px-3.5 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm hover:shadow transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("calculateFinal")}
            </Link>
          </div>

          {/* Mobile Actions: Language & Hamburger */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => setLangModalOpen(true)}
              className="p-2 text-xs font-bold text-slate-700 bg-slate-100 rounded-lg flex items-center gap-1"
              aria-label="Change Language"
            >
              <Globe className="w-4 h-4 text-indigo-600" />
              <span className="max-w-[80px] truncate">{localeConfig.name}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {/* Mobile Language Switcher Row */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setLangModalOpen(true);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-indigo-50/70 border border-indigo-100 text-indigo-900 text-xs font-semibold"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>Language: {localeConfig.name}</span>
            </div>
            <span className="text-[11px] text-indigo-600 underline">Change (39)</span>
          </button>

          <div className="font-bold text-xs text-slate-700 uppercase tracking-wider px-2">
            {t("toolsMenu")}
          </div>
          <div className="grid grid-cols-1 gap-1">
            {mainTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(tool.href)
                    ? "text-indigo-600 bg-indigo-50 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Calculator className="w-4 h-4 text-indigo-600" />
                {tool.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3">
            <div className="font-bold text-xs text-slate-700 uppercase tracking-wider px-2 mb-2">
              {t("resourcesMenu")}
            </div>
            <div className="grid grid-cols-1 gap-1">
              {resources.map((res) => (
                <Link
                  key={res.href}
                  href={res.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 font-medium"
                >
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  {res.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={getLocalizedPath("/grade-calculator", locale)}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow"
            >
              {t("gradeCalculator")}
            </Link>
          </div>
        </div>
      )}

      {/* Language Switcher 39-Languages Modal */}
      <LanguageSwitcherModal
        isOpen={langModalOpen}
        onClose={() => setLangModalOpen(false)}
      />
    </header>
  );
}

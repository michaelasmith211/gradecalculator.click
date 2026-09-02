"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Menu, X, ChevronDown, GraduationCap, Percent, BookOpen } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const mainTools = [
    { name: "Grade Calculator", href: "/grade-calculator", desc: "Calculate overall course percentage & letter grade" },
    { name: "Final Grade Calculator", href: "/final-grade-calculator", desc: "Calculate score needed on final exam" },
    { name: "Weighted Grade Calculator", href: "/weighted-grade-calculator", desc: "Category weights (Homework, Exams, etc.)" },
    { name: "GPA Calculator", href: "/gpa-calculator", desc: "Calculate 4.0 & weighted GPA with credits" },
    { name: "Percentage Calculator", href: "/percentage-grade-calculator", desc: "Convert scores, fractions, and percentages" },
    { name: "Grade Needed Calculator", href: "/grade-needed-calculator", desc: "Determine required score on upcoming work" },
    { name: "Test Grade Calculator", href: "/test-grade-calculator", desc: "Quick test & quiz score grading table" },
    { name: "Points Grade Calculator", href: "/points-grade-calculator", desc: "Total points based grading system" },
  ];

  const resources = [
    { name: "How to Calculate Grades", href: "/how-to-calculate-grades" },
    { name: "Grade Scale Guide", href: "/grade-scale" },
    { name: "GPA Scale Reference", href: "/gpa-scale" },
    { name: "FAQ Knowledge Base", href: "/grade-calculator-faq" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-xl text-slate-900 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
            title="Grade Calculator Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight tracking-tight font-extrabold text-slate-900">
                Grade<span className="text-indigo-600">Calculator</span>
              </span>
              <span className="text-[10px] text-slate-500 tracking-wider uppercase font-semibold">
                Fast & Accurate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/grade-calculator"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isActive("/grade-calculator") || isActive("/")
                  ? "text-indigo-600 bg-indigo-50/80"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              Grade Calculator
            </Link>

            <Link
              href="/final-grade-calculator"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isActive("/final-grade-calculator")
                  ? "text-indigo-600 bg-indigo-50/80"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              Final Grade
            </Link>

            <Link
              href="/weighted-grade-calculator"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isActive("/weighted-grade-calculator")
                  ? "text-indigo-600 bg-indigo-50/80"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              Weighted Grade
            </Link>

            <Link
              href="/gpa-calculator"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isActive("/gpa-calculator")
                  ? "text-indigo-600 bg-indigo-50/80"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              GPA Calculator
            </Link>

            {/* Dropdown for More Calculators */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 200)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
                aria-expanded={toolsDropdownOpen}
              >
                <span>More Calculators</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Calculators & Tools
                  </div>
                  {mainTools.slice(4).map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      <div className="font-medium text-slate-900">{tool.name}</div>
                      <div className="text-xs text-slate-500 line-clamp-1">{tool.desc}</div>
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 my-1"></div>
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Educational Guides
                  </div>
                  {resources.map((res) => (
                    <Link
                      key={res.href}
                      href={res.href}
                      className="block px-4 py-1.5 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      {res.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/final-grade-calculator"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Calculate Final Grade
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          <div className="font-semibold text-xs text-slate-400 uppercase tracking-wider px-2">
            Top Calculators
          </div>
          <div className="grid grid-cols-1 gap-1">
            {mainTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(tool.href)
                    ? "text-indigo-600 bg-indigo-50 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Calculator className="w-4 h-4 text-slate-400" />
                {tool.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3">
            <div className="font-semibold text-xs text-slate-400 uppercase tracking-wider px-2 mb-2">
              Grade Guides & Scales
            </div>
            <div className="grid grid-cols-1 gap-1">
              {resources.map((res) => (
                <Link
                  key={res.href}
                  href={res.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50"
                >
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  {res.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/grade-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
            >
              Start Grade Calculation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

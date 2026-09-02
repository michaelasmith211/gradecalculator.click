import React from "react";
import Link from "next/link";
import { ShieldCheck, Cpu } from "lucide-react";
import CookiePreferencesButton from "./CookiePreferencesButton";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-xl text-white hover:text-indigo-400 transition-colors"
            >
              <img
                src="/favicon.png"
                alt="Grade Calculator Icon"
                className="w-9 h-9 rounded-xl shadow object-contain"
              />
              <span className="tracking-tight text-xl font-black">
                Grade<span className="text-indigo-400">Calculator</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The fastest, most accurate online grade calculator suite. Calculate course averages, final exam score requirements, weighted categories, and GPA on a 4.0 scale with zero lag and 100% privacy.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Private (Browser-Only)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Instant Math Engine</span>
              </div>
            </div>
          </div>

          {/* Col 2: Core Calculators */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Grade Calculators
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/grade-calculator" className="hover:text-white transition-colors">
                  Grade Calculator
                </Link>
              </li>
              <li>
                <Link href="/final-grade-calculator" className="hover:text-white transition-colors">
                  Final Grade Calculator
                </Link>
              </li>
              <li>
                <Link href="/weighted-grade-calculator" className="hover:text-white transition-colors">
                  Weighted Grade Calculator
                </Link>
              </li>
              <li>
                <Link href="/points-grade-calculator" className="hover:text-white transition-colors">
                  Points-Based Calculator
                </Link>
              </li>
              <li>
                <Link href="/grade-needed-calculator" className="hover:text-white transition-colors">
                  Grade Needed Calculator
                </Link>
              </li>
              <li>
                <Link href="/test-grade-calculator" className="hover:text-white transition-colors">
                  Test & Quiz Grader
                </Link>
              </li>
              <li>
                <Link href="/exam-grade-calculator" className="hover:text-white transition-colors">
                  Exam Grade Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: GPA & Averages */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              GPA & Averages
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/gpa-calculator" className="hover:text-white transition-colors">
                  4.0 GPA Calculator
                </Link>
              </li>
              <li>
                <Link href="/college-gpa-calculator" className="hover:text-white transition-colors">
                  College GPA Calculator
                </Link>
              </li>
              <li>
                <Link href="/semester-gpa-calculator" className="hover:text-white transition-colors">
                  Semester GPA Calculator
                </Link>
              </li>
              <li>
                <Link href="/high-school-gpa-calculator" className="hover:text-white transition-colors">
                  High School GPA Calculator
                </Link>
              </li>
              <li>
                <Link href="/average-grade-calculator" className="hover:text-white transition-colors">
                  Average Grade Calculator
                </Link>
              </li>
              <li>
                <Link href="/percentage-grade-calculator" className="hover:text-white transition-colors">
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link href="/weighted-average-calculator" className="hover:text-white transition-colors">
                  Weighted Average Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Legal */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Guides & Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/how-to-calculate-grades" className="hover:text-white transition-colors">
                  How to Calculate Grades
                </Link>
              </li>
              <li>
                <Link href="/grade-scale" className="hover:text-white transition-colors">
                  Standard Grade Scale
                </Link>
              </li>
              <li>
                <Link href="/gpa-scale" className="hover:text-white transition-colors">
                  GPA Scale Guide
                </Link>
              </li>
              <li>
                <Link href="/grade-calculator-faq" className="hover:text-white transition-colors">
                  Grade Calculator FAQ
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} Grade Calculator (gradecalculator.dev). All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <Link href="/cookie-policy" className="hover:text-slate-300 transition-colors">
              Cookies
            </Link>
            <Link href="/terms-of-use" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Support
            </Link>
            <CookiePreferencesButton
              className="hover:text-indigo-400 text-slate-400 transition-colors cursor-pointer bg-transparent shadow-none p-0 inline-flex items-center gap-1 font-normal text-xs"
              label="Cookie Settings"
            />
          </div>
        </div>

        {/* Academic Disclaimer */}
        <div className="mt-4 text-[11px] text-slate-600 text-center sm:text-left leading-relaxed">
          Disclaimer: Grade Calculator is designed for educational estimation purposes. Grading policies, rounding rules, quality point distributions, and weighting formulas vary across individual schools, colleges, and professors. Always confirm official grades with your academic instructor or registrar.
        </div>
      </div>
    </footer>
  );
}

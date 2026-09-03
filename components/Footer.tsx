import React from "react";
import Link from "next/link";
import { ShieldCheck, Cpu } from "lucide-react";
import CookiePreferencesButton from "./CookiePreferencesButton";

// Official Social Media Channels
export const SOCIAL_LINKS = [
  {
    name: "X (Twitter)",
    href: "https://x.com/gradecalculato",
    label: "Follow @gradecalculato on X",
    svg: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/gradecalculator100",
    label: "Grade Calculator on Facebook",
    svg: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "https://uk.pinterest.com/Gradecalculator100",
    label: "Grade Calculator on Pinterest",
    svg: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.98-.12-2.49.03-3.56l.8-4.57s-.2-.4-.2-1c0-1.42.82-2.48 1.85-2.48.87 0 1.29.65 1.29 1.44 0 .88-.56 2.19-.85 3.4-.24 1.02.51 1.86 1.52 1.86 1.82 0 3.22-1.92 3.22-4.69 0-2.45-1.76-4.17-4.28-4.17-2.92 0-4.63 2.19-4.63 4.45 0 .88.34 1.82.76 2.33.08.1.1.19.07.31l-.29 1.17c-.05.19-.16.23-.36.14-1.34-.62-2.18-2.58-2.18-4.16 0-3.38 2.46-6.49 7.09-6.49 3.72 0 6.61 2.65 6.61 6.2 0 3.7-2.33 6.67-5.57 6.67-1.09 0-2.11-.57-2.46-1.24l-.67 2.56c-.24.93-.9 2.1-1.34 2.81A11.99 11.99 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
      </svg>
    ),
  },
  {
    name: "Reddit",
    href: "https://www.reddit.com/user/gradecalculator100",
    label: "u/gradecalculator100 on Reddit",
    svg: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.703zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-4.502 4.167a.348.348 0 0 0-.25.105.347.347 0 0 0 0 .493c.738.739 1.948.88 2.002.88.054 0 1.264-.141 2.002-.88a.347.347 0 0 0 0-.493.348.348 0 0 0-.493 0c-.54.54-1.397.674-1.509.674-.112 0-.969-.134-1.509-.674a.349.349 0 0 0-.243-.105z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@gradecalculator100",
    label: "Grade Calculator on YouTube",
    svg: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Mission & Social Handles */}
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

            {/* Official Social Media Channels */}
            <div className="pt-2 space-y-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Follow & Connect With Us
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {SOCIAL_LINKS.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.label}
                    title={soc.label}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all border border-slate-700 hover:border-indigo-500 shadow-sm flex items-center justify-center group"
                  >
                    {soc.svg}
                  </a>
                ))}
              </div>
            </div>

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

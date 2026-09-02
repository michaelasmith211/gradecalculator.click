import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateWebApplicationSchema, generateFAQSchema } from "@/lib/seo/schema";
import GradeCalculator from "@/components/calculators/GradeCalculator";
import GradeScaleTable from "@/components/GradeScaleTable";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import AdPlaceholder from "@/components/AdPlaceholder";
import {
  Calculator,
  Percent,
  Award,
  GraduationCap,
  Target,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Grade Calculator – Calculate Your Grade & GPA Instantly",
  description:
    "Use our free Grade Calculator to calculate percentages, letter grades, weighted grades, and averages instantly. Easy, fast, and mobile-friendly.",
  path: "/",
  keywords: [
    "grade calculator",
    "grade calculator online",
    "calculate my grade",
    "calculate grade percentage",
    "letter grade calculator",
    "school grade calculator",
    "student grade calculator",
    "assignment grade calculator",
    "current grade calculator",
  ],
});

const homeFaqs: FAQItem[] = [
  {
    question: "What is a grade calculator?",
    answer:
      "A grade calculator is a free interactive online tool designed for high school and college students to compute their cumulative course grade, overall percentage, letter grade, and grade point average (GPA). It eliminates manual math by aggregating points earned, total possible points, or category weights.",
  },
  {
    question: "How do I calculate my grade?",
    answer:
      "To calculate your current grade in a points-based system:\n1. Add up all points you have earned across homework, quizzes, and exams.\n2. Add up the total possible points.\n3. Divide your total points earned by total points possible.\n4. Multiply by 100 to get your percentage.\n\nExample: If you scored 255 points out of 300 possible points: (255 ÷ 300) × 100 = 85.0% (Letter Grade: B).",
  },
  {
    question: "How do I calculate my final grade?",
    answer:
      "To find what score you need on a final exam:\nUse the formula: Required Score = (Desired Grade - Current Grade × (1 - Exam Weight)) ÷ Exam Weight.\nFor example, if you currently have an 85%, want an overall 90% (A-), and the final is worth 20% (0.20): Required = (90 - 85 × 0.80) ÷ 0.20 = (90 - 68) ÷ 0.20 = 110%. You can use our dedicated Final Grade Calculator to simulate scenarios automatically.",
  },
  {
    question: "How do weighted grades work?",
    answer:
      "In a weighted grading system, assignments are divided into categories with assigned percentages (e.g., Homework 20%, Quizzes 20%, Midterm 25%, Final Exam 35%). Your overall grade is the sum of each category average multiplied by its category percentage weight.",
  },
  {
    question: "How do I calculate my GPA?",
    answer:
      "GPA (Grade Point Average) converts letter grades into numerical quality points on a standard 4.0 scale (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0). Multiply each grade's point value by the course credit hours, sum these quality points, and divide by the total number of credit hours attempted.",
  },
  {
    question: "What grade is 90 percent?",
    answer:
      "In standard US grading scales, a 90% is typically an A- (or an A in non-plus/minus scales). In a strict 7-point scale, a 90% corresponds to a B+.",
  },
  {
    question: "What grade is 80 percent?",
    answer:
      "An 80% is standardly a B- (2.7 GPA points) on a plus/minus scale, or a solid B on standard 10-point scales (80–89%).",
  },
  {
    question: "How do I calculate the percentage of my grade?",
    answer:
      "Divide your total score by the total possible points and multiply the decimal by 100. For instance, scoring 42 out of 50 is (42 ÷ 50) = 0.84, which equals 84%.",
  },
];

export default function HomePage() {
  const appSchema = generateWebApplicationSchema({
    name: "Grade Calculator",
    description:
      "Free online grade calculator to calculate course percentage, letter grades, and GPA instantly.",
    path: "/",
  });

  const faqSchema = generateFAQSchema(homeFaqs);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/50 pt-10 pb-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fast & 100% Private Student Calculator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Grade Calculator
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Calculate your grades, percentages, weighted averages, GPA, and final exam scores instantly.
            </p>
          </div>

          {/* Above-the-fold Interactive Grade Calculator */}
          <GradeCalculator />
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Ad Placeholder 1 */}
        <AdPlaceholder format="horizontal" slotId="home-top-banner" />

        {/* How It Works Section */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Four simple steps to calculate your class standing and letter grade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 font-black rounded-xl flex items-center justify-center mx-auto mb-4 text-lg">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Enter Your Scores</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Type the score you received and the total possible points for each quiz, paper, or homework.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 font-black rounded-xl flex items-center justify-center mx-auto mb-4 text-lg">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Add Assignments</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click "+ Add Another Assignment" to include as many coursework items as you have on your syllabus.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 font-black rounded-xl flex items-center justify-center mx-auto mb-4 text-lg">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Calculate Average</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculations update live in your browser without clicking submit or reloading the page.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 font-black rounded-xl flex items-center justify-center mx-auto mb-4 text-lg">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">See Letter Grade</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                View your exact percentage, letter grade (A, B, C), 4.0 GPA points, and academic status.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Calculators Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Popular Grade Calculation Tools
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Choose the specialized calculator that matches your grading system.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/final-grade-calculator"
              className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Final Grade Calculator
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Calculate what score you need on your final exam to pass or secure an A, B, or C in your course.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1">
                <span>Calculate Exam Target</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/weighted-grade-calculator"
              className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Percent className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Weighted Grade Calculator
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Support for syllabus weights (Homework 20%, Midterm 30%, Finals 40%) with visual breakdowns.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1">
                <span>Calculate Weighted Grade</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/gpa-calculator"
              className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                  4.0 GPA Calculator
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Calculate semester, college, and high school cumulative Grade Point Average and quality points.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1">
                <span>Calculate GPA</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/percentage-grade-calculator"
              className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Percentage Grade Calculator
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Convert assignment fractions to percentages and check corresponding letter grade brackets.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1">
                <span>Convert Percentages</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/grade-needed-calculator"
              className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Grade Needed Calculator
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Determine the average score required across all remaining coursework to achieve your target grade.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1">
                <span>Find Required Score</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/test-grade-calculator"
              className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Test Grade & Easy Grader
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Generate quick score charts and grading tables for test questions wrong and right.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1">
                <span>View Easy Grader</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* Grade Scale Reference Table */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Standard Grading Scale
              </h2>
              <p className="text-xs text-slate-600">
                Default percentage cutoffs, letter grade designations, and 4.0 GPA equivalencies.
              </p>
            </div>
            <Link
              href="/grade-scale"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Explore Complete Scale Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <GradeScaleTable />
        </section>

        {/* Educational Content: How to Calculate Your Grade */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              How to Calculate Your Grade: Complete Guide
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you are in middle school, high school, or university, calculating your current grade and understanding how future assignments impact your GPA is essential for academic planning. Most academic institutions evaluate student performance using either a <strong>total points system</strong> or a <strong>weighted grading system</strong>.
            </p>
          </div>

          {/* Points System vs Weighted System */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-2">
                1. Points-Based Grading Formula
              </h3>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                In a points-based system, every assignment has a fixed point value. To find your overall score, divide the total earned points by the total possible points:
              </p>
              <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-xs text-indigo-900 font-semibold mb-3">
                Grade (%) = (Total Points Earned &divide; Total Points Possible) &times; 100
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Example:</strong> Suppose you earned 85/100 on Homework 1, 92/100 on Homework 2, and 78/100 on Exam 1. Your total points earned are 255 out of 300 possible points. (255 &divide; 300) &times; 100 = <strong>85% (Grade B)</strong>.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-2">
                2. Weighted Grading Formula
              </h3>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                In a weighted system, each assignment category accounts for a specific percentage of your final grade. The weighted average formula is:
              </p>
              <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-xs text-indigo-900 font-semibold mb-3">
                Weighted Grade = &Sigma; (Category Score &times; Category Weight) &divide; &Sigma; Weights
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Example:</strong> Homework is worth 20% (you have 95%), Quizzes 20% (you have 80%), Midterm 25% (you have 85%), and Final 35% (you have 90%).<br />
                Weighted Grade = (95&times;0.20) + (80&times;0.20) + (85&times;0.25) + (90&times;0.35) = 19 + 16 + 21.25 + 31.5 = <strong>87.75% (Grade B+)</strong>.
              </p>
            </div>
          </div>

          {/* Practical Tips */}
          <div className="p-5 bg-indigo-50/70 border border-indigo-100 rounded-xl">
            <h3 className="font-bold text-indigo-950 text-sm mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Key Principles for Academic Planning</span>
            </h3>
            <ul className="text-xs text-indigo-900 space-y-1.5 list-disc list-inside">
              <li>Check your syllabus early in the semester to confirm whether your professor uses points or category weights.</li>
              <li>Track all assignments in real time rather than waiting for midterm or final grade reports.</li>
              <li>Calculate your required final exam score early to know the exact buffer you have going into finals week.</li>
              <li>Keep in mind that letter grade cutoffs can vary by school (e.g. some institutions use 90% for an A, while others require 93%).</li>
            </ul>
          </div>
        </section>

        {/* Why Use Our Grade Calculator */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Why Use Our Grade Calculator?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Engineered for student convenience, speed, and privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Instant Calculations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All calculations run natively in your browser using pure client-side math. Results update immediately as you type each number.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">100% Private (No Account)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No sign up, no email required, and no grade data is ever sent to a server. Your academic coursework information stays on your device.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Mobile-First & Accessible</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fully responsive design with large touch targets, keyboard navigation support, and zero horizontal scrolling on phones and tablets.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <FAQAccordion faqs={homeFaqs} />

        {/* Social Sharing Bar */}
        <SocialShare
          title="Grade Calculator – Calculate Your Grade & GPA Instantly"
          description="Free, fast, and 100% private online grade calculator for high school and college students."
        />

        {/* Related Calculators Cross-linking */}
        <RelatedCalculators currentKey="grade-calculator" />
      </div>
    </div>
  );
}

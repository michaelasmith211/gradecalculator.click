import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  generateWebApplicationSchema,
  generateFAQSchema,
  generateHowToSchema,
} from "@/lib/seo/schema";
import GradeCalculator from "@/components/calculators/GradeCalculator";
import GradeScaleTable from "@/components/GradeScaleTable";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";
import RelatedCalculators from "@/components/RelatedCalculators";
import SocialShare from "@/components/SocialShare";
import SeoSummaryBox from "@/components/SeoSummaryBox";
import TableOfContents from "@/components/TableOfContents";
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
    "Free online Grade Calculator to calculate course percentages, letter grades (A-F), weighted averages, and 4.0 GPA instantly. Easy, private, and mobile-friendly.",
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
    "class grade calculator",
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

  const howToSchema = generateHowToSchema({
    name: "How to Calculate Your Class Grade with a Grade Calculator",
    description:
      "Learn how to calculate your overall grade percentage and letter grade step-by-step using assignment scores.",
    path: "/",
    steps: [
      {
        name: "Enter Assignment Scores",
        text: "Input the points you earned and the total points possible for each assignment, quiz, exam, or homework.",
      },
      {
        name: "Add Additional Coursework",
        text: "Click '+ Add Another Assignment' to enter all graded items listed on your course syllabus.",
      },
      {
        name: "Review Instant Calculation",
        text: "The calculator instantly computes your total points earned, total possible points, overall percentage, and letter grade.",
      },
      {
        name: "Customize Grading Scale Cutoffs",
        text: "Click 'Grading Scale' to adjust percentage boundaries to match your school or university syllabus.",
      },
    ],
  });

  const tocItems = [
    { id: "calculator", label: "Interactive Grade Calculator" },
    { id: "how-it-works", label: "How to Use This Calculator" },
    { id: "popular-tools", label: "Specialized Grade Tools" },
    { id: "grade-formulas", label: "Grade Calculation Formulas" },
    { id: "grading-scale", label: "Standard Grading Scale" },
    { id: "benefits", label: "Why Students Trust Our Tool" },
    { id: "faqs", label: "Frequently Asked Questions" },
  ];

  return (
    <div className="min-h-screen">
      {/* Structured Data: WebApplication, FAQPage, HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
              Calculate your grades, percentages, weighted averages, GPA, and final exam scores instantly with zero lag.
            </p>
          </div>

          {/* Above-the-fold Interactive Grade Calculator */}
          <div id="calculator">
            <GradeCalculator />
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* On-Page SEO Summary & SERP Featured Snippet Box */}
        <SeoSummaryBox
          title="Grade Calculator Key Takeaways"
          quickAnswer="A Grade Calculator computes your cumulative academic percentage and letter grade by dividing the total points you have earned by total points possible, or by multiplying weighted category scores by syllabus percentages."
          formula="Grade (%) = (Total Points Earned ÷ Total Points Possible) × 100"
          keyTakeaways={[
            "Instant client-side calculation with zero delay as you type scores",
            "Customizable letter grade cutoffs (Plus/Minus, 10-Point, 7-Point scales)",
            "100% browser-side privacy (no account or personal data collection)",
            "Compatible with middle school, high school, and college courses",
          ]}
        />

        {/* Quick Jump Navigation / Table of Contents */}
        <TableOfContents items={tocItems} title="On This Page" />

        {/* Ad Placeholder 1 */}
        <AdPlaceholder format="horizontal" slotId="home-top-banner" />

        {/* How It Works Section */}
        <section id="how-it-works" className="space-y-6">
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
        <section id="popular-tools" className="space-y-6">
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
                  Calculate grades with weighted categories like Homework (20%), Midterm (30%), and Final (50%).
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
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                  4.0 GPA Calculator
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Calculate semester GPA, cumulative GPA, and quality points on a 4.0 scale with Honors and AP support.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1">
                <span>Calculate Your GPA</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/average-grade-calculator"
              className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Average Grade Calculator
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Calculate mean, median, highest, and lowest scores from a list of test grades or assignment scores.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1">
                <span>Calculate Average</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/test-grade-calculator"
              className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Test Grade Calculator
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Easy grader chart for teachers and students. See percentages and grades for any number of wrong questions.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1">
                <span>Open Test Grader</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/grade-needed-calculator"
              className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Grade Needed Calculator
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Calculate the exact points or percentage needed on upcoming assignments to maintain your GPA.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1">
                <span>Find Grade Needed</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* Detailed Educational Guide */}
        <section id="grade-formulas" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Calculate Grades: Step-by-Step Guide
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Understanding how your teachers and professors calculate grades gives you complete control over your academic trajectory. Below are the two primary grading systems used in North American and international schools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Method 1 */}
            <div className="space-y-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Method 1</span>
              <h3 className="text-lg font-bold text-slate-900">Points-Based Grading System</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In a total points system, all assignments are added together into a single numerator (points earned) and divided by the denominator (points possible).
              </p>
              <div className="p-3 bg-white border border-slate-200 rounded-xl font-mono text-xs text-slate-800">
                Grade % = (Earned Points ÷ Total Points) &times; 100
              </div>
              <div className="text-xs text-slate-700 space-y-1">
                <strong>Worked Example:</strong>
                <p>Assignment 1: 45/50 (90%)</p>
                <p>Assignment 2: 88/100 (88%)</p>
                <p>Assignment 3: 20/20 (100%)</p>
                <p className="pt-1 font-semibold text-indigo-700">
                  Total = 153 / 170 = <strong>90.00% (Letter Grade A-)</strong>
                </p>
              </div>
            </div>

            {/* Method 2 */}
            <div className="space-y-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Method 2</span>
              <h3 className="text-lg font-bold text-slate-900">Weighted Grading System</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In a weighted grading system, assignment types belong to categories with fixed syllabus weights (e.g. Tests 50%, Homework 20%, Quizzes 30%).
              </p>
              <div className="p-3 bg-white border border-slate-200 rounded-xl font-mono text-xs text-slate-800">
                Weighted Grade = &Sigma; (Category Score &times; Category Weight)
              </div>
              <div className="text-xs text-slate-700 space-y-1">
                <strong>Worked Example:</strong>
                <p>Homework (20% weight): 95% score &rarr; 19.00 points</p>
                <p>Quizzes (30% weight): 85% score &rarr; 25.50 points</p>
                <p>Exams (50% weight): 88% score &rarr; 44.00 points</p>
                <p className="pt-1 font-semibold text-emerald-700">
                  Overall = 19.0 + 25.5 + 44.0 = <strong>88.50% (Letter Grade B+)</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-indigo-950 text-sm">Need a complete guide with deep formulas?</h4>
              <p className="text-xs text-indigo-800 mt-0.5">Read our comprehensive walkthrough of grade curves, dropped lowest scores, and GPA scales.</p>
            </div>
            <Link
              href="/how-to-calculate-grades"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
            >
              Read Complete Guide &rarr;
            </Link>
          </div>
        </section>

        {/* Grading Scale Table */}
        <section id="grading-scale" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Standard Letter Grade Scale & GPA Points
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Reference chart for standard percentage ranges, letter grades, and 4.0 grade point averages.
            </p>
          </div>
          <GradeScaleTable />
        </section>

        {/* Ad Placeholder 2 */}
        <AdPlaceholder format="horizontal" slotId="home-mid-banner" />

        {/* Features / Why Choose Our Tool */}
        <section id="benefits" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Why Students & Teachers Trust GradeCalculator.dev
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Engineered for speed, privacy, accuracy, and ease of use.
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
        <section id="faqs">
          <FAQAccordion faqs={homeFaqs} />
        </section>

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

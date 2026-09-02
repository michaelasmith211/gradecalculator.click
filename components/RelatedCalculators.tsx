import React from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Percent, Award, BookOpen, Target, CheckCircle2 } from "lucide-react";

export interface CalculatorLinkItem {
  name: string;
  href: string;
  description: string;
  category?: string;
}

const ALL_TOOLS: Record<string, CalculatorLinkItem> = {
  "grade-calculator": {
    name: "Standard Grade Calculator",
    href: "/grade-calculator",
    description: "Calculate overall percentages, total points earned, and letter grades across all your coursework.",
    category: "General",
  },
  "final-grade-calculator": {
    name: "Final Grade Calculator",
    href: "/final-grade-calculator",
    description: "Find out the exact score needed on your final exam to pass the class or earn your desired letter grade.",
    category: "Exams",
  },
  "weighted-grade-calculator": {
    name: "Weighted Grade Calculator",
    href: "/weighted-grade-calculator",
    description: "Compute course grade when assignments, quizzes, midterms, and finals carry distinct category percentages.",
    category: "Weighted",
  },
  "gpa-calculator": {
    name: "Standard 4.0 GPA Calculator",
    href: "/gpa-calculator",
    description: "Calculate high school and college grade point averages with credit hour weighting.",
    category: "GPA",
  },
  "college-gpa-calculator": {
    name: "College GPA Calculator",
    href: "/college-gpa-calculator",
    description: "Tailored for undergraduate and graduate credit hours, quality points, and Dean's List standing.",
    category: "GPA",
  },
  "semester-gpa-calculator": {
    name: "Semester GPA Calculator",
    href: "/semester-gpa-calculator",
    description: "Determine your term grade point average and project your cumulative academic trajectory.",
    category: "GPA",
  },
  "high-school-gpa-calculator": {
    name: "High School GPA Calculator",
    href: "/high-school-gpa-calculator",
    description: "Calculate weighted 5.0 AP/IB & Honors GPA alongside standard unweighted 4.0 GPA.",
    category: "GPA",
  },
  "grade-needed-calculator": {
    name: "Grade Needed Calculator",
    href: "/grade-needed-calculator",
    description: "Calculate target scores on upcoming assignments or projects to maintain your goal grade.",
    category: "Planning",
  },
  "average-grade-calculator": {
    name: "Average Grade Calculator",
    href: "/average-grade-calculator",
    description: "Calculate the mathematical mean, median, highest, and lowest score across any set of grades.",
    category: "Averages",
  },
  "percentage-grade-calculator": {
    name: "Percentage Grade Calculator",
    href: "/percentage-grade-calculator",
    description: "Convert points to percentages, test fractions, and see corresponding letter grade brackets.",
    category: "General",
  },
  "test-grade-calculator": {
    name: "Test Grade Calculator",
    href: "/test-grade-calculator",
    description: "Instant grading chart and test score checker for students and teachers.",
    category: "Tests",
  },
  "exam-grade-calculator": {
    name: "Exam Grade Calculator",
    href: "/exam-grade-calculator",
    description: "Calculate midterm, quiz, and comprehensive exam scores and their impact on your final standing.",
    category: "Exams",
  },
  "points-grade-calculator": {
    name: "Points-Based Grade Calculator",
    href: "/points-grade-calculator",
    description: "For classes evaluated strictly by total points accumulated without arbitrary category weighting.",
    category: "Points",
  },
  "weighted-average-calculator": {
    name: "Weighted Average Calculator",
    href: "/weighted-average-calculator",
    description: "Calculate general weighted averages for any set of numbers, weights, and statistical data.",
    category: "Averages",
  },
  "how-to-calculate-grades": {
    name: "How to Calculate Grades Guide",
    href: "/how-to-calculate-grades",
    description: "Step-by-step mathematical guide with formulas and real student examples.",
    category: "Guide",
  },
  "grade-scale": {
    name: "Standard Grade Scale Table",
    href: "/grade-scale",
    description: "Percentage cutoffs, 4.0 GPA equivalencies, and letter grade conversion benchmarks.",
    category: "Scale",
  },
};

interface RelatedCalculatorsProps {
  currentKey: string;
  recommendedKeys?: string[];
  title?: string;
  subtitle?: string;
}

export default function RelatedCalculators({
  currentKey,
  recommendedKeys,
  title = "Related Grade Calculation Tools",
  subtitle = "Explore our suite of specialized student calculators to plan and track your academic success.",
}: RelatedCalculatorsProps) {
  // Default recommendations if none provided
  const defaultList = [
    "final-grade-calculator",
    "weighted-grade-calculator",
    "gpa-calculator",
    "grade-needed-calculator",
    "test-grade-calculator",
    "average-grade-calculator",
  ].filter((key) => key !== currentKey);

  const keysToUse = (recommendedKeys || defaultList).filter((k) => k !== currentKey).slice(0, 6);
  const tools = keysToUse.map((k) => ALL_TOOLS[k]).filter(Boolean);

  return (
    <section className="my-12 pt-8 border-t border-slate-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group relative p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">
                  {tool.category || "Calculator"}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 text-base mb-1.5 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>
            </div>
            <div className="mt-4 text-xs font-semibold text-indigo-600 flex items-center gap-1">
              <span>Open Tool</span>
              <span>&rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

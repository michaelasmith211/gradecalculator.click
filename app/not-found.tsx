import React from "react";
import Link from "next/link";
import { Calculator, ArrowLeft, Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Calculator className="w-8 h-8" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
        404 Error
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
        Page Not Found
      </h1>
      <p className="text-slate-600 text-base max-w-md mx-auto mt-3">
        The grade calculation tool or guide you are looking for doesn't exist or has moved. Explore our core calculators below:
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/final-grade-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-colors"
        >
          <span>Final Grade Calculator</span>
        </Link>
        <Link
          href="/gpa-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-colors"
        >
          <span>GPA Calculator</span>
        </Link>
      </div>
    </div>
  );
}

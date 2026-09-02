"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  RotateCcw,
  AlertCircle,
  Percent,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { calculateWeightedGrade, WeightedCategoryItem } from "@/lib/calculations/grades";
import { trackEvent } from "@/lib/analytics";

interface WeightedGradeCalculatorProps {
  title?: string;
  subtitle?: string;
}

export default function WeightedGradeCalculator({
  title,
  subtitle,
}: WeightedGradeCalculatorProps) {
  const [categories, setCategories] = useState<WeightedCategoryItem[]>([
    { id: "1", name: "Homework & Problem Sets", score: 92, weight: 20 },
    { id: "2", name: "Quizzes & Short Tests", score: 85, weight: 20 },
    { id: "3", name: "Midterm Examination", score: 78, weight: 25 },
    { id: "4", name: "Final Examination", score: 88, weight: 35 },
  ]);

  const result = useMemo(() => calculateWeightedGrade(categories), [categories]);

  const handleAddCategory = () => {
    const nextId = (categories.length + 1).toString() + "-" + Date.now();
    setCategories([
      ...categories,
      {
        id: nextId,
        name: `Category ${categories.length + 1}`,
        score: "",
        weight: "",
      },
    ]);
    trackEvent("weighted_category_added");
  };

  const handleRemoveCategory = (id: string) => {
    if (categories.length <= 1) {
      setCategories([{ id: "1", name: "Category 1", score: "", weight: 100 }]);
      return;
    }
    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleChange = (
    id: string,
    field: "name" | "score" | "weight",
    value: string
  ) => {
    setCategories(
      categories.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
    trackEvent("weighted_grade_calculated");
  };

  const handleReset = () => {
    setCategories([
      { id: "1", name: "Homework", score: "", weight: 20 },
      { id: "2", name: "Quizzes", score: "", weight: 20 },
      { id: "3", name: "Midterm", score: "", weight: 25 },
      { id: "4", name: "Final Exam", score: "", weight: 35 },
    ]);
  };

  // Color palette for contribution breakdown
  const categoryColors = [
    "bg-indigo-500",
    "bg-purple-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-pink-500",
  ];

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-100 overflow-hidden my-4 sm:my-6">
      {/* Header Bar */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">
            {title || "Weighted Grade Calculator"}
          </h2>
          <p className="text-xs text-slate-200 mt-0.5">
            {subtitle || "Calculate your grade based on weighted categories (e.g. Homework 20%, Tests 50%, Final 30%)."}
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="self-end sm:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-lg transition-all border border-white/15 touch-manipulation min-h-[36px]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Column: Categories List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Grading Categories ({categories.length})
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-600 font-semibold">Total Weight:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded ${
                  result.totalWeight === 100
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {result.totalWeight}%
              </span>
            </div>
          </div>

          {/* Desktop Table Header */}
          <div className="grid grid-cols-12 gap-2 text-xs font-bold text-slate-700 px-2 uppercase tracking-wider hidden sm:grid">
            <div className="col-span-6">Category Name</div>
            <div className="col-span-3 text-center">Score / Grade (%)</div>
            <div className="col-span-2 text-center">Weight (%)</div>
            <div className="col-span-1"></div>
          </div>

          {/* List of Category Rows - Touch & Mobile Optimized */}
          <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
            {categories.map((cat, index) => (
              <div
                key={cat.id}
                className="p-3 sm:p-2 bg-slate-50/90 hover:bg-slate-100/90 rounded-xl border border-slate-200 transition-colors space-y-2 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-2 sm:items-center"
              >
                {/* Category Name */}
                <div className="sm:col-span-6">
                  <div className="text-[11px] font-bold text-slate-600 sm:hidden mb-1">
                    Category #{index + 1}
                  </div>
                  <input
                    type="text"
                    value={cat.name}
                    placeholder={`Category ${index + 1}`}
                    onChange={(e) => handleChange(cat.id, "name", e.target.value)}
                    className="w-full px-3 py-2 text-base sm:text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Score & Weight on Mobile */}
                <div className="grid grid-cols-12 gap-2 sm:contents">
                  <div className="col-span-5 sm:col-span-3">
                    <div className="text-[10px] font-bold text-slate-600 sm:hidden mb-0.5 text-center">
                      Score %
                    </div>
                    <input
                      type="number"
                      inputMode="decimal"
                      step="any"
                      min="0"
                      max="200"
                      value={cat.score}
                      placeholder="e.g. 88"
                      onChange={(e) => handleChange(cat.id, "score", e.target.value)}
                      className="w-full px-3 py-2 text-base sm:text-sm text-center font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="col-span-5 sm:col-span-2">
                    <div className="text-[10px] font-bold text-slate-600 sm:hidden mb-0.5 text-center">
                      Weight %
                    </div>
                    <input
                      type="number"
                      inputMode="decimal"
                      step="any"
                      min="0"
                      max="100"
                      value={cat.weight}
                      placeholder="e.g. 25"
                      onChange={(e) => handleChange(cat.id, "weight", e.target.value)}
                      className="w-full px-3 py-2 text-base sm:text-sm text-center font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1 flex items-end sm:items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(cat.id)}
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors active:scale-90 touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center"
                      title="Remove category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Category Button */}
          <button
            type="button"
            onClick={handleAddCategory}
            className="w-full py-3 sm:py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 active:scale-[0.99] text-indigo-700 font-bold text-sm rounded-xl border border-indigo-200 flex items-center justify-center gap-2 transition-all shadow-sm touch-manipulation min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Weighted Category</span>
          </button>

          {/* Weight Warning if total != 100 */}
          {result.totalWeight > 0 && result.totalWeight !== 100 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Total weight is <strong>{result.totalWeight}%</strong>. We have normalized your score proportionally. Make sure all categories sum to 100% for an exact syllabus calculation.
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Visual Contribution Breakdown & Score */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-slate-50 to-slate-100/90 rounded-2xl p-5 sm:p-6 border border-slate-200">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Weighted Calculation
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Real-Time
              </span>
            </div>

            {/* Overall Weighted Percentage */}
            <div className="text-center py-6 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm mb-4">
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Weighted Course Grade
              </div>
              <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                {result.totalWeight > 0 ? `${result.overallPercentage}%` : "--"}
              </div>

              {/* Letter Grade Badge */}
              <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
                <span
                  className={`px-4 py-1.5 rounded-full text-base font-extrabold text-white shadow-sm ${
                    result.overallPercentage >= 90
                      ? "bg-emerald-600"
                      : result.overallPercentage >= 80
                      ? "bg-indigo-600"
                      : result.overallPercentage >= 70
                      ? "bg-amber-600"
                      : "bg-rose-600"
                  }`}
                >
                  Grade: {result.letter}
                </span>
                <span className="px-3 py-1.5 rounded-full text-sm font-bold bg-slate-100 text-slate-800 border border-slate-200">
                  {result.gpaPoint.toFixed(1)} GPA
                </span>
              </div>
            </div>

            {/* Visual Multi-Segment Contribution Bar */}
            {result.totalWeight > 0 && (
              <div className="mb-4">
                <div className="text-[11px] font-bold text-slate-600 uppercase mb-1.5 flex justify-between">
                  <span>Category Contribution Map</span>
                  <span>100% Total</span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200">
                  {result.categoryBreakdown.map((cat, idx) => (
                    <div
                      key={cat.id}
                      className={`${categoryColors[idx % categoryColors.length]} transition-all duration-300`}
                      style={{ width: `${Math.max(0, cat.normalizedContribution)}%` }}
                      title={`${cat.name}: +${cat.normalizedContribution}% to final grade`}
                    />
                  ))}
                </div>

                {/* Category Contribution Legend */}
                <div className="mt-3 space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {result.categoryBreakdown.map((cat, idx) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            categoryColors[idx % categoryColors.length]
                          }`}
                        />
                        <span className="font-semibold text-slate-800 truncate">
                          {cat.name}
                        </span>
                        <span className="text-slate-500 ml-1">({cat.weight}%)</span>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0">
                        +{cat.normalizedContribution}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

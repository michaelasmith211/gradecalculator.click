"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  PieChart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { calculateWeightedGrade, WeightedCategoryItem } from "@/lib/calculations/grades";
import { DEFAULT_GRADE_SCALE } from "@/lib/calculations/scales";
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
    { id: "1", name: "Homework & Labs", score: 95, weight: 20 },
    { id: "2", name: "Quizzes", score: 82, weight: 15 },
    { id: "3", name: "Midterm Exam", score: 88, weight: 25 },
    { id: "4", name: "Final Exam", score: 90, weight: 30 },
    { id: "5", name: "Participation", score: 100, weight: 10 },
  ]);

  const result = useMemo(() => calculateWeightedGrade(categories, DEFAULT_GRADE_SCALE), [categories]);

  const handleAddCategory = () => {
    const nextId = (categories.length + 1).toString() + "-" + Date.now();
    setCategories([
      ...categories,
      { id: nextId, name: `Category ${categories.length + 1}`, score: "", weight: "" },
    ]);
    trackEvent("weighted_category_added");
  };

  const handleRemoveCategory = (id: string) => {
    if (categories.length <= 1) {
      setCategories([{ id: "1", name: "Category 1", score: "", weight: "" }]);
      return;
    }
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleChange = (id: string, field: "name" | "score" | "weight", val: string) => {
    setCategories(
      categories.map((cat) => (cat.id === id ? { ...cat, [field]: val } : cat))
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

  const colors = [
    "bg-indigo-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-purple-500",
    "bg-rose-500",
    "bg-sky-500",
    "bg-teal-500",
  ];

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-100 overflow-hidden my-4 sm:my-6">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2">
            <span>{title || "Weighted Grade Calculator"}</span>
            {result.categoryBreakdown.length > 0 && result.overallPercentage >= 90 && (
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 animate-pulse">
                <Sparkles className="w-3 h-3 inline mr-0.5" /> High Honors
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {subtitle || "Calculate your overall score based on syllabus percentage weights for each category."}
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
        {/* Left: Categories Input Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Categories & Weights ({categories.length})
            </span>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500">Weight Total:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded ${
                  result.isWeights100
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {result.totalWeight}% {result.isWeights100 ? "✓ 100%" : "(Normalized)"}
              </span>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 text-xs font-bold text-slate-500 px-2 uppercase tracking-wider hidden sm:grid">
            <div className="col-span-6">Category Name</div>
            <div className="col-span-3 text-center">Your Score (%)</div>
            <div className="col-span-2 text-center">Weight (%)</div>
            <div className="col-span-1"></div>
          </div>

          {/* Row Inputs - Touch & Mobile Optimized */}
          <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                className="p-3 sm:p-2 bg-slate-50/90 hover:bg-slate-100/90 rounded-xl border border-slate-200 transition-colors space-y-2 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-2 sm:items-center"
              >
                {/* Category Name */}
                <div className="sm:col-span-6">
                  <div className="text-[11px] font-bold text-slate-400 sm:hidden mb-1">
                    Category #{idx + 1}
                  </div>
                  <input
                    type="text"
                    value={cat.name}
                    placeholder="e.g. Homework"
                    onChange={(e) => handleChange(cat.id, "name", e.target.value)}
                    className="w-full px-3 py-2 text-base sm:text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Score & Weight on Mobile */}
                <div className="grid grid-cols-12 gap-2 sm:contents">
                  <div className="col-span-5 sm:col-span-3">
                    <div className="text-[10px] font-bold text-slate-400 sm:hidden mb-0.5 text-center">
                      Score %
                    </div>
                    <input
                      type="number"
                      inputMode="decimal"
                      step="any"
                      value={cat.score}
                      placeholder="Score %"
                      onChange={(e) => handleChange(cat.id, "score", e.target.value)}
                      className="w-full px-3 py-2 text-base sm:text-sm text-center font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="col-span-5 sm:col-span-2">
                    <div className="text-[10px] font-bold text-slate-400 sm:hidden mb-0.5 text-center">
                      Weight %
                    </div>
                    <input
                      type="number"
                      inputMode="decimal"
                      step="any"
                      value={cat.weight}
                      placeholder="Weight %"
                      onChange={(e) => handleChange(cat.id, "weight", e.target.value)}
                      className="w-full px-3 py-2 text-base sm:text-sm text-center font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1 flex items-end sm:items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(cat.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors active:scale-90 touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center"
                      title="Remove category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddCategory}
            className="w-full py-3 sm:py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 active:scale-[0.99] text-indigo-700 font-bold text-sm rounded-xl border border-indigo-200 flex items-center justify-center gap-2 transition-all shadow-sm touch-manipulation min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Another Category</span>
          </button>
        </div>

        {/* Right: Results & Contribution Breakdown */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-slate-50 to-slate-100/90 rounded-2xl p-5 sm:p-6 border border-slate-200">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Overall Weighted Grade
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Live
              </span>
            </div>

            {/* Score Big Card */}
            <div className="text-center py-6 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm mb-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Weighted Average Score
              </div>
              <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                {result.categoryBreakdown.length > 0 ? `${result.overallPercentage}%` : "--"}
              </div>

              {result.categoryBreakdown.length > 0 && (
                <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-sm font-black px-4 py-1.5 rounded-full bg-indigo-600 text-white shadow-sm">
                    Grade: {result.letter}
                  </span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                    {result.gpaPoint.toFixed(1)} GPA
                  </span>
                </div>
              )}
            </div>

            {/* Visual Contribution Stacked Bar */}
            {result.categoryBreakdown.length > 0 && (
              <div className="mb-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <PieChart className="w-4 h-4 text-indigo-600" />
                    <span>Contribution Breakdown</span>
                  </span>
                  <span>{result.overallPercentage}% Total</span>
                </div>

                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                  {result.categoryBreakdown.map((cat, idx) => {
                    const widthPercent = (cat.weightedContribution / Math.max(1, result.overallPercentage)) * 100;
                    return (
                      <div
                        key={cat.id}
                        className={`h-full ${colors[idx % colors.length]} transition-all`}
                        style={{ width: `${widthPercent}%` }}
                        title={`${cat.name}: +${cat.weightedContribution}% points`}
                      />
                    );
                  })}
                </div>

                {/* Category Legend list */}
                <div className="space-y-1 pt-1">
                  {result.categoryBreakdown.map((cat, idx) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between text-xs p-2 bg-white rounded-lg border border-slate-100 shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`} />
                        <span className="font-semibold text-slate-800">{cat.name || "Category"}</span>
                      </div>
                      <div className="text-slate-600 font-mono text-[11px]">
                        <span className="font-bold text-indigo-700">+{cat.weightedContribution}%</span>
                        <span className="text-slate-400 ml-1">({cat.weight}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!result.isWeights100 && result.totalWeight > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Mid-Semester Normalized: </strong>
                  Your weights sum to {result.totalWeight}% (less than 100%). Your score has been normalized to reflect your standing to date.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

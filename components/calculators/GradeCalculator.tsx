"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  RotateCcw,
  Sliders,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Share2,
} from "lucide-react";
import { calculatePointsGrade, AssignmentItem } from "@/lib/calculations/grades";
import { DEFAULT_GRADE_SCALE, GradeCutoff } from "@/lib/calculations/scales";
import ScaleSettingsModal from "./ScaleSettingsModal";
import GradeSocialCardStudio from "../GradeSocialCardStudio";
import { trackEvent } from "@/lib/analytics";

interface GradeCalculatorProps {
  initialAssignments?: AssignmentItem[];
  title?: string;
  subtitle?: string;
}

export default function GradeCalculator({
  initialAssignments,
  title,
  subtitle,
}: GradeCalculatorProps) {
  const [items, setItems] = useState<AssignmentItem[]>(
    initialAssignments || [
      { id: "1", name: "Assignment 1", earned: 88, total: 100 },
      { id: "2", name: "Assignment 2", earned: 92, total: 100 },
      { id: "3", name: "Assignment 3", earned: 78, total: 100 },
    ]
  );

  const [scale, setScale] = useState<GradeCutoff[]>(DEFAULT_GRADE_SCALE);
  const [scaleModalOpen, setScaleModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Compute results reactively
  const result = useMemo(() => calculatePointsGrade(items, scale), [items, scale]);

  const handleAddItem = () => {
    const nextId = (items.length + 1).toString() + "-" + Date.now();
    const newItems = [
      ...items,
      { id: nextId, name: `Assignment ${items.length + 1}`, earned: "", total: 100 },
    ];
    setItems(newItems);
    trackEvent("assignment_added", { totalRows: newItems.length });
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) {
      setItems([{ id: "1", name: "Assignment 1", earned: "", total: 100 }]);
      return;
    }
    setItems(items.filter((item) => item.id !== id));
  };

  const handleChange = (id: string, field: "name" | "earned" | "total", value: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
    trackEvent("grade_calculated");
  };

  const handleReset = () => {
    setItems([
      { id: "1", name: "Assignment 1", earned: "", total: 100 },
      { id: "2", name: "Assignment 2", earned: "", total: 100 },
      { id: "3", name: "Assignment 3", earned: "", total: 100 },
    ]);
  };

  const loadSample = (type: "highschool" | "college") => {
    if (type === "college") {
      setItems([
        { id: "1", name: "Midterm Exam", earned: 88, total: 100 },
        { id: "2", name: "Term Paper", earned: 94, total: 100 },
        { id: "3", name: "Weekly Problem Sets", earned: 185, total: 200 },
        { id: "4", name: "Lab Reports", earned: 45, total: 50 },
      ]);
    } else {
      setItems([
        { id: "1", name: "Chapter 1 Quiz", earned: 18, total: 20 },
        { id: "2", name: "History Essay", earned: 47, total: 50 },
        { id: "3", name: "Unit Test", earned: 86, total: 100 },
        { id: "4", name: "Homework Packet", earned: 30, total: 30 },
      ]);
    }
    trackEvent("sample_loaded", { sampleType: type });
  };

  // Color helper based on percentage
  const getBadgeColor = (percent: number) => {
    if (percent >= 90) return "bg-emerald-600 text-white shadow-emerald-500/20";
    if (percent >= 80) return "bg-indigo-600 text-white shadow-indigo-500/20";
    if (percent >= 70) return "bg-amber-600 text-white shadow-amber-500/20";
    if (percent >= 60) return "bg-orange-600 text-white shadow-orange-500/20";
    return "bg-rose-600 text-white shadow-rose-500/20";
  };

  const getProgressBarColor = (percent: number) => {
    if (percent >= 90) return "from-emerald-500 to-emerald-600";
    if (percent >= 80) return "from-indigo-500 to-indigo-600";
    if (percent >= 70) return "from-amber-500 to-amber-600";
    if (percent >= 60) return "from-orange-500 to-orange-600";
    return "from-rose-500 to-rose-600";
  };

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-100/80 overflow-hidden my-4 sm:my-6">
      {/* Calculator Header Bar */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2">
            <span>{title || "Grade Calculator"}</span>
            {result.validItemCount > 0 && result.percentage >= 90 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 animate-pulse">
                <Sparkles className="w-3 h-3" /> Excellent
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-200 mt-0.5">
            {subtitle || "Enter your assignment scores below to calculate your overall grade and GPA."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setScaleModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-lg transition-all border border-white/15 touch-manipulation min-h-[36px]"
            title="Configure grading cutoff scale"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Grading Scale</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-lg transition-all border border-white/15 touch-manipulation min-h-[36px]"
            title="Reset calculator inputs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs on Left, Results on Right */}
      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Column: Assignment Rows */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Assignments ({items.length})
            </span>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-600 font-semibold">Quick Samples:</span>
              <button
                type="button"
                onClick={() => loadSample("college")}
                className="px-2 py-0.5 bg-slate-100 hover:bg-indigo-50 text-indigo-700 font-bold rounded text-xs transition-colors active:scale-95 touch-manipulation"
              >
                College
              </button>
              <button
                type="button"
                onClick={() => loadSample("highschool")}
                className="px-2 py-0.5 bg-slate-100 hover:bg-indigo-50 text-indigo-700 font-bold rounded text-xs transition-colors active:scale-95 touch-manipulation"
              >
                High School
              </button>
            </div>
          </div>

          {/* Desktop Column Header */}
          <div className="grid grid-cols-12 gap-2 text-xs font-bold text-slate-700 px-2 uppercase tracking-wider hidden sm:grid">
            <div className="col-span-6">Assignment Name</div>
            <div className="col-span-3 text-center">Score Earned</div>
            <div className="col-span-2 text-center">Possible</div>
            <div className="col-span-1"></div>
          </div>

          {/* List of Assignment Row Inputs - Touch & Mobile Optimized */}
          <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="p-3 sm:p-2 bg-slate-50/90 hover:bg-slate-100/90 rounded-xl border border-slate-200 transition-colors space-y-2 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-2 sm:items-center"
              >
                {/* Assignment Name */}
                <div className="sm:col-span-6">
                  <div className="text-[11px] font-bold text-slate-600 sm:hidden mb-1">
                    Assignment #{index + 1}
                  </div>
                  <input
                    type="text"
                    value={item.name}
                    placeholder={`Assignment ${index + 1}`}
                    onChange={(e) => handleChange(item.id, "name", e.target.value)}
                    className="w-full px-3 py-2 text-base sm:text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label={`Assignment ${index + 1} name`}
                  />
                </div>

                {/* Score Earned & Total Grid on Mobile */}
                <div className="grid grid-cols-12 gap-2 sm:contents">
                  <div className="col-span-5 sm:col-span-3">
                    <div className="text-[10px] font-bold text-slate-600 sm:hidden mb-0.5 text-center">
                      Score
                    </div>
                    <input
                      type="number"
                      inputMode="decimal"
                      step="any"
                      value={item.earned}
                      placeholder="Earned"
                      onChange={(e) => handleChange(item.id, "earned", e.target.value)}
                      className="w-full px-3 py-2 text-base sm:text-sm text-center font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label={`Assignment ${index + 1} score earned`}
                    />
                  </div>

                  <div className="col-span-5 sm:col-span-2">
                    <div className="text-[10px] font-bold text-slate-600 sm:hidden mb-0.5 text-center">
                      Out of
                    </div>
                    <input
                      type="number"
                      inputMode="decimal"
                      step="any"
                      value={item.total}
                      placeholder="Total"
                      onChange={(e) => handleChange(item.id, "total", e.target.value)}
                      className="w-full px-3 py-2 text-base sm:text-sm text-center font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label={`Assignment ${index + 1} total possible points`}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1 flex items-end sm:items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors active:scale-90 touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center"
                      title="Remove assignment"
                      aria-label={`Delete ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Row Button */}
          <button
            type="button"
            onClick={handleAddItem}
            className="w-full py-3 sm:py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 active:scale-[0.99] text-indigo-700 font-bold text-sm rounded-xl border border-indigo-200 flex items-center justify-center gap-2 transition-all shadow-sm touch-manipulation min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Another Assignment</span>
          </button>
        </div>

        {/* Right Column: Prominent Results Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-slate-50 to-slate-100/90 rounded-2xl p-5 sm:p-6 border border-slate-200">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Calculation Results
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Live
              </span>
            </div>

            {/* Overall Percentage Card */}
            <div className="text-center py-6 px-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm mb-4">
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Overall Course Grade
              </div>
              <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight transition-all">
                {result.validItemCount > 0 ? `${result.percentage}%` : "--"}
              </div>

              {/* Progress Bar */}
              {result.validItemCount > 0 && (
                <div className="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getProgressBarColor(
                      result.percentage
                    )} transition-all duration-300 rounded-full`}
                    style={{ width: `${Math.min(100, Math.max(0, result.percentage))}%` }}
                  />
                </div>
              )}

              {/* Letter Grade & GPA Point Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                <span
                  className={`px-4 py-1.5 rounded-full text-base font-extrabold shadow-sm ${
                    result.validItemCount > 0
                      ? getBadgeColor(result.percentage)
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  Grade: {result.letter}
                </span>
                <span className="px-3 py-1.5 rounded-full text-sm font-bold bg-slate-100 text-slate-800 border border-slate-200">
                  {result.gpaPoint.toFixed(1)} GPA
                </span>
              </div>
            </div>

            {/* Score Breakdown Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="text-[11px] font-semibold text-slate-600 uppercase">
                  Points Earned
                </div>
                <div className="text-xl font-bold text-slate-900 mt-0.5">
                  {result.totalEarned.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="text-[11px] font-semibold text-slate-600 uppercase">
                  Total Points
                </div>
                <div className="text-xl font-bold text-slate-900 mt-0.5">
                  {result.totalPossible.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Academic Status Note */}
            <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-950 flex items-start gap-2.5">
              <TrendingUp className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Academic Standing: </span>
                {result.validItemCount === 0 ? (
                  <span>Enter assignment points to view your standing.</span>
                ) : result.percentage >= 90 ? (
                  <span>Outstanding performance! Currently tracking for Honors / A Grade.</span>
                ) : result.percentage >= 80 ? (
                  <span>Solid performance (B Grade). Within reach of an A with upcoming tests!</span>
                ) : result.percentage >= 70 ? (
                  <span>Passing (C Grade). Focus on high-value assignments to boost your standing.</span>
                ) : (
                  <span>Needs improvement. Use our Final Grade Calculator to map passing targets.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scale Settings Modal */}
      <ScaleSettingsModal
        isOpen={scaleModalOpen}
        onClose={() => setScaleModalOpen(false)}
        scale={scale}
        onSave={(newScale: GradeCutoff[]) => setScale(newScale)}
      />

      {/* Inline Interactive Social Share Card Studio (Story format first) */}
      {result.validItemCount > 0 && (
        <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          <GradeSocialCardStudio
            data={{
              type: "grade",
              title: title || "Course Grade",
              scoreDisplay: `${result.percentage}%`,
              scoreLabel: "Overall Course Grade",
              letterGrade: result.letter,
              gpaPoint: result.gpaPoint,
              additionalMetrics: [
                { label: "Points Earned", value: `${result.totalEarned} / ${result.totalPossible}` },
                { label: "Assignments", value: `${result.validItemCount} Graded Items` },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2, RotateCcw, Sliders, CheckCircle, Award, Sparkles, BookOpen } from "lucide-react";
import { calculatePointsGrade, AssignmentItem } from "@/lib/calculations/grades";
import { DEFAULT_GRADE_SCALE, GradeCutoff } from "@/lib/calculations/scales";
import ScaleSettingsModal from "./ScaleSettingsModal";
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
      { id: "1", name: "Assignment 1", earned: 85, total: 100 },
      { id: "2", name: "Assignment 2", earned: 92, total: 100 },
      { id: "3", name: "Assignment 3", earned: 78, total: 100 },
    ]
  );

  const [scale, setScale] = useState<GradeCutoff[]>(DEFAULT_GRADE_SCALE);
  const [scaleModalOpen, setScaleModalOpen] = useState(false);

  // Compute results reactively
  const result = useMemo(() => calculatePointsGrade(items, scale), [items, scale]);

  const handleAddItem = () => {
    const nextId = (items.length + 1).toString() + "-" + Date.now();
    const newItems = [...items, { id: nextId, name: `Assignment ${items.length + 1}`, earned: "", total: 100 }];
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
    if (percent >= 90) return "bg-emerald-500 text-white";
    if (percent >= 80) return "bg-indigo-600 text-white";
    if (percent >= 70) return "bg-amber-500 text-white";
    if (percent >= 60) return "bg-orange-500 text-white";
    return "bg-rose-500 text-white";
  };

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-100 overflow-hidden my-6">
      {/* Calculator Header Bar */}
      <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            {title || "Grade Calculator"}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {subtitle || "Enter your assignment scores below to calculate your overall grade and GPA."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setScaleModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
            title="Configure grading cutoff scale"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Grading Scale</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
            title="Reset calculator inputs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs on Left/Top, Prominent Results on Right/Bottom */}
      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Assignment Rows */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Assignments ({items.length})
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Quick Samples:</span>
              <button
                type="button"
                onClick={() => loadSample("college")}
                className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                College
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => loadSample("highschool")}
                className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                High School
              </button>
            </div>
          </div>

          {/* Column Header Titles */}
          <div className="grid grid-cols-12 gap-2 text-xs font-bold text-slate-500 px-2 uppercase tracking-wider hidden sm:grid">
            <div className="col-span-6">Assignment Name</div>
            <div className="col-span-3 text-center">Score Earned</div>
            <div className="col-span-3 text-center">Total Possible</div>
          </div>

          {/* List of Assignment Row Inputs */}
          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-2 p-2 bg-slate-50/80 hover:bg-slate-100/80 rounded-xl border border-slate-200 transition-colors items-center"
              >
                <div className="col-span-12 sm:col-span-6">
                  <input
                    type="text"
                    value={item.name}
                    placeholder={`Assignment ${index + 1}`}
                    onChange={(e) => handleChange(item.id, "name", e.target.value)}
                    className="w-full px-3 py-2 text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label={`Assignment ${index + 1} name`}
                  />
                </div>
                <div className="col-span-5 sm:col-span-3">
                  <input
                    type="number"
                    step="any"
                    value={item.earned}
                    placeholder="Earned"
                    onChange={(e) => handleChange(item.id, "earned", e.target.value)}
                    className="w-full px-3 py-2 text-sm text-center font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label={`Assignment ${index + 1} score earned`}
                  />
                </div>
                <div className="col-span-5 sm:col-span-2">
                  <input
                    type="number"
                    step="any"
                    value={item.total}
                    placeholder="Total"
                    onChange={(e) => handleChange(item.id, "total", e.target.value)}
                    className="w-full px-3 py-2 text-sm text-center font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label={`Assignment ${index + 1} total possible points`}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove assignment"
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Row Button */}
          <button
            type="button"
            onClick={handleAddItem}
            className="w-full py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm rounded-xl border border-indigo-200/80 flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Assignment</span>
          </button>
        </div>

        {/* Right Column: Prominent Results Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-slate-50 to-slate-100/90 rounded-2xl p-6 border border-slate-200">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Calculation Results
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Live & Automatic
              </span>
            </div>

            {/* Overall Percentage Card */}
            <div className="text-center py-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm mb-6">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Overall Grade Percentage
              </div>
              <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                {result.validItemCount > 0 ? `${result.percentage}%` : "--"}
              </div>

              {/* Letter Grade & GPA Point Badge */}
              {result.validItemCount > 0 && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span
                    className={`text-sm font-black px-3.5 py-1 rounded-full shadow-sm ${getBadgeColor(
                      result.percentage
                    )}`}
                  >
                    Letter Grade: {result.letter}
                  </span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {result.gpaPoint.toFixed(1)} GPA
                  </span>
                </div>
              )}
            </div>

            {/* Visual Grade Bar */}
            <div className="mb-6 space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Performance Indicator</span>
                <span>{result.validItemCount > 0 ? `${result.percentage}%` : "0%"}</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(0, result.percentage))}%` }}
                />
              </div>
            </div>

            {/* Points Summary Statistics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-slate-500 font-medium">Points Earned</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  {result.totalEarned}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-slate-500 font-medium">Total Possible</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  {result.totalPossible}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-slate-500 font-medium">Assignments Counted</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  {result.validItemCount}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-slate-500 font-medium">Academic Status</div>
                <div className="text-sm font-bold text-indigo-700 mt-1 truncate">
                  {result.description}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Client-side calculation (No data stored)</span>
            <button
              onClick={() => setScaleModalOpen(true)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Modify Scale Cutoffs &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Scale Configuration Modal */}
      <ScaleSettingsModal
        isOpen={scaleModalOpen}
        onClose={() => setScaleModalOpen(false)}
        scale={scale}
        onSave={(newScale) => setScale(newScale)}
      />
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { RotateCcw, Plus, Trash2, BarChart2, Calculator } from "lucide-react";
import { calculateScoreStats } from "@/lib/calculations/grades";
import { getLetterGrade } from "@/lib/calculations/scales";
import { trackEvent } from "@/lib/analytics";

export default function AverageGradeCalculator() {
  const [inputMode, setInputMode] = useState<"list" | "quick">("list");
  const [scores, setScores] = useState<string[]>(["85", "92", "78", "90", "88"]);
  const [quickInput, setQuickInput] = useState<string>("85, 92, 78, 90, 88");

  const parsedScores = useMemo(() => {
    if (inputMode === "quick") {
      return quickInput
        .split(/[,\s\n]+/)
        .map((s) => parseFloat(s.trim()))
        .filter((s) => !isNaN(s));
    }
    return scores.map((s) => parseFloat(s)).filter((s) => !isNaN(s));
  }, [inputMode, scores, quickInput]);

  const stats = useMemo(() => calculateScoreStats(parsedScores), [parsedScores]);
  const letterInfo = useMemo(() => getLetterGrade(stats.mean), [stats.mean]);

  const handleAddScore = () => {
    setScores([...scores, ""]);
  };

  const handleRemoveScore = (index: number) => {
    setScores(scores.filter((_, i) => i !== index));
  };

  const handleScoreChange = (index: number, val: string) => {
    const updated = [...scores];
    updated[index] = val;
    setScores(updated);
    trackEvent("average_grade_calculated");
  };

  const handleReset = () => {
    setScores(["", "", ""]);
    setQuickInput("");
  };

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-100 overflow-hidden my-4 sm:my-6">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">Average Grade Calculator</h2>
          <p className="text-xs text-slate-200 mt-0.5">
            Calculate arithmetic mean, median, highest, and lowest score across any set of grades.
          </p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Mode Switcher */}
          <div className="bg-white/10 p-0.5 rounded-lg flex text-xs font-semibold">
            <button
              type="button"
              onClick={() => setInputMode("list")}
              className={`px-3 py-1 rounded-md transition-all active:scale-95 touch-manipulation min-h-[32px] ${
                inputMode === "list" ? "bg-white text-slate-900 shadow-sm" : "text-white/90 hover:text-white"
              }`}
            >
              List Mode
            </button>
            <button
              type="button"
              onClick={() => setInputMode("quick")}
              className={`px-3 py-1 rounded-md transition-all active:scale-95 touch-manipulation min-h-[32px] ${
                inputMode === "quick" ? "bg-white text-slate-900 shadow-sm" : "text-white/90 hover:text-white"
              }`}
            >
              Quick Paste
            </button>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-lg transition-all border border-white/15 touch-manipulation min-h-[32px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4">
          {inputMode === "list" ? (
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider text-slate-700">
                <span>Enter Individual Scores</span>
                <span className="text-slate-600">{scores.length} items</span>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {scores.map((score, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600 w-8 text-right">
                      #{idx + 1}
                    </span>
                    <input
                      type="number"
                      inputMode="decimal"
                      step="any"
                      value={score}
                      onChange={(e) => handleScoreChange(idx, e.target.value)}
                      placeholder="e.g. 88"
                      className="flex-1 px-3 py-2 text-base sm:text-sm font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveScore(idx)}
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all active:scale-90 touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center"
                      title="Delete score"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddScore}
                className="mt-3 w-full py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 active:scale-[0.99] text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 flex items-center justify-center gap-1.5 transition-all touch-manipulation min-h-[44px]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Score</span>
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <span>Paste Comma or Space-Separated Scores</span>
              </div>
              <textarea
                rows={5}
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="Paste scores like: 85, 92, 78, 100, 88..."
                className="w-full px-3 py-2 text-base sm:text-sm font-mono text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-[11px] text-slate-600 mt-1 font-medium">
                You can paste scores separated by commas, spaces, or newlines.
              </p>
            </div>
          )}
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-b from-slate-50 to-slate-100/90 rounded-2xl p-5 sm:p-6 border border-slate-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Statistical Summary
            </div>

            {/* Arithmetic Mean Card */}
            <div className="text-center py-6 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm mb-4">
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Grade Average (Mean)
              </div>
              <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                {stats.count > 0 ? `${stats.mean}%` : "--"}
              </div>
              {stats.count > 0 && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="px-4 py-1 rounded-full text-sm font-bold bg-indigo-600 text-white shadow-sm">
                    Grade: {letterInfo.letter}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                    {letterInfo.gpaPoint.toFixed(1)} GPA
                  </span>
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-600 font-semibold block">Median Score</span>
                <span className="text-lg font-bold text-slate-900">
                  {stats.count > 0 ? `${stats.median}%` : "--"}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-600 font-semibold block">Total Count</span>
                <span className="text-lg font-bold text-slate-900">{stats.count}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-600 font-semibold block">Highest Score</span>
                <span className="text-lg font-bold text-emerald-700">
                  {stats.count > 0 ? `${stats.highest}%` : "--"}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-600 font-semibold block">Lowest Score</span>
                <span className="text-lg font-bold text-rose-700">
                  {stats.count > 0 ? `${stats.lowest}%` : "--"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

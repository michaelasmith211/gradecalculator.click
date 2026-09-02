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
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-100 overflow-hidden my-6">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Average Grade Calculator</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Calculate the arithmetic mean, median, highest, and lowest score across any set of grades.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="bg-white/10 p-0.5 rounded-lg flex text-xs font-semibold">
            <button
              type="button"
              onClick={() => setInputMode("list")}
              className={`px-3 py-1 rounded-md transition-colors ${
                inputMode === "list" ? "bg-white text-slate-900 shadow-sm" : "text-white/80 hover:text-white"
              }`}
            >
              List Mode
            </button>
            <button
              type="button"
              onClick={() => setInputMode("quick")}
              className={`px-3 py-1 rounded-md transition-colors ${
                inputMode === "quick" ? "bg-white text-slate-900 shadow-sm" : "text-white/80 hover:text-white"
              }`}
            >
              Quick Paste
            </button>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4">
          {inputMode === "list" ? (
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>Enter Individual Scores</span>
                <span>{scores.length} items</span>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {scores.map((score, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 w-8 text-right">#{idx + 1}</span>
                    <input
                      type="number"
                      step="any"
                      value={score}
                      onChange={(e) => handleScoreChange(idx, e.target.value)}
                      placeholder={`e.g. 88`}
                      className="flex-1 px-3 py-2 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveScore(idx)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddScore}
                className="mt-3 w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Score</span>
              </button>
            </div>
          ) : (
            <div>
              <label htmlFor="quickScores" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Paste or Type Comma-Separated Scores
              </label>
              <textarea
                id="quickScores"
                rows={6}
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="e.g. 85, 92, 78, 90, 88.5"
                className="w-full p-3 font-mono text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-slate-400 mt-1">
                Separate numbers by commas, spaces, or line breaks.
              </p>
            </div>
          )}
        </div>

        {/* Right Results */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-b from-slate-50 to-slate-100/90 rounded-2xl p-6 border border-slate-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Statistical Summary
            </div>

            {/* Average Main Output */}
            <div className="text-center py-6 bg-white rounded-2xl border border-slate-200 shadow-sm mb-6">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Arithmetic Mean (Average)
              </div>
              <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                {stats.count > 0 ? `${stats.mean}%` : "--"}
              </div>

              {stats.count > 0 && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-sm font-black px-3.5 py-1 rounded-full bg-indigo-600 text-white shadow-sm">
                    Letter: {letterInfo.letter}
                  </span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {letterInfo.gpaPoint.toFixed(1)} GPA
                  </span>
                </div>
              )}
            </div>

            {/* Sub Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                <div className="text-slate-500">Median</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">{stats.count > 0 ? stats.median : "--"}</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                <div className="text-slate-500">Highest</div>
                <div className="text-lg font-bold text-emerald-600 mt-0.5">{stats.count > 0 ? stats.highest : "--"}</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                <div className="text-slate-500">Lowest</div>
                <div className="text-lg font-bold text-rose-600 mt-0.5">{stats.count > 0 ? stats.lowest : "--"}</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                <div className="text-slate-500">Count</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">{stats.count}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-[11px] text-slate-500">
            Formula: Average = Sum of all scores &divide; Total number of scores
          </div>
        </div>
      </div>
    </div>
  );
}

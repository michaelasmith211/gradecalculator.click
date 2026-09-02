"use client";

import React, { useState, useMemo } from "react";
import { Percent, RotateCcw, CheckCircle2 } from "lucide-react";
import { getLetterGrade } from "@/lib/calculations/scales";
import { trackEvent } from "@/lib/analytics";

export default function PercentageGradeCalculator() {
  const [earned, setEarned] = useState<string>("46");
  const [total, setTotal] = useState<string>("50");

  const earnedNum = parseFloat(earned);
  const totalNum = parseFloat(total);

  const percentage = useMemo(() => {
    if (isNaN(earnedNum) || isNaN(totalNum) || totalNum <= 0) return null;
    return Math.round(((earnedNum / totalNum) * 100) * 100) / 100;
  }, [earnedNum, totalNum]);

  const letterInfo = useMemo(() => {
    if (percentage === null) return null;
    return getLetterGrade(percentage);
  }, [percentage]);

  const handleReset = () => {
    setEarned("46");
    setTotal("50");
  };

  // Quick fractions
  const [fractionPercent, setFractionPercent] = useState<string>("85");
  const [fractionTotal, setFractionTotal] = useState<string>("150");

  const calculatedPoints = useMemo(() => {
    const p = parseFloat(fractionPercent);
    const t = parseFloat(fractionTotal);
    if (isNaN(p) || isNaN(t)) return null;
    return Math.round(((p / 100) * t) * 100) / 100;
  }, [fractionPercent, fractionTotal]);

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-100 overflow-hidden my-4 sm:my-6">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">Percentage Grade Calculator</h2>
          <p className="text-xs text-slate-200 mt-0.5">
            Convert fractions and points earned into exact percentages and letter grades instantly.
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

      {/* Tool 1: Fraction to Percentage */}
      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border-b border-slate-200">
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            1. Convert Score to Percentage
          </span>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-slate-700 font-semibold block mb-1">Points Earned</label>
              <input
                type="number"
                inputMode="decimal"
                step="any"
                value={earned}
                onChange={(e) => setEarned(e.target.value)}
                placeholder="46"
                className="w-full px-3 py-2.5 text-base sm:text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <span className="text-slate-600 font-bold text-xl pt-5">/</span>
            <div className="flex-1">
              <label className="text-xs text-slate-700 font-semibold block mb-1">Total Possible</label>
              <input
                type="number"
                inputMode="decimal"
                step="any"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="50"
                className="w-full px-3 py-2.5 text-base sm:text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="w-full bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 text-center flex flex-col items-center justify-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Percentage Score
            </div>
            <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
              {percentage !== null ? `${percentage}%` : "--"}
            </div>
            {letterInfo && (
              <div className="mt-3 flex items-center gap-2">
                <span className="px-4 py-1.5 rounded-full text-sm font-extrabold bg-indigo-600 text-white shadow-sm">
                  Grade: {letterInfo.letter}
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-200">
                  {letterInfo.gpaPoint.toFixed(1)} GPA
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tool 2: Percentage of Total Points */}
      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-slate-50/50">
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            2. Find Points Needed for a Given %
          </span>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-slate-700 font-semibold block mb-1">Target Percentage (%)</label>
              <input
                type="number"
                inputMode="decimal"
                step="any"
                value={fractionPercent}
                onChange={(e) => setFractionPercent(e.target.value)}
                placeholder="85"
                className="w-full px-3 py-2.5 text-base sm:text-lg font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <span className="text-slate-600 font-bold text-xs pt-5 font-medium">of</span>
            <div className="flex-1">
              <label className="text-xs text-slate-700 font-semibold block mb-1">Total Points</label>
              <input
                type="number"
                inputMode="decimal"
                step="any"
                value={fractionTotal}
                onChange={(e) => setFractionTotal(e.target.value)}
                placeholder="150"
                className="w-full px-3 py-2.5 text-base sm:text-lg font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="w-full bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 text-center flex flex-col items-center justify-center shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Points Required
            </div>
            <div className="text-4xl sm:text-5xl font-black text-indigo-700 tracking-tight">
              {calculatedPoints !== null ? `${calculatedPoints} pts` : "--"}
            </div>
            <div className="text-xs text-slate-600 mt-1 font-medium">
              out of {fractionTotal} total points possible
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

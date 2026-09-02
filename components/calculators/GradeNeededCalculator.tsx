"use client";

import React, { useState, useMemo } from "react";
import { Target, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function GradeNeededCalculator() {
  const [currentGrade, setCurrentGrade] = useState<string>("82");
  const [completedWeight, setCompletedWeight] = useState<string>("60");
  const [targetGrade, setTargetGrade] = useState<string>("88");

  const currentNum = parseFloat(currentGrade);
  const completedWeightNum = parseFloat(completedWeight);
  const targetNum = parseFloat(targetGrade);

  const remainingWeight = 100 - (isNaN(completedWeightNum) ? 0 : completedWeightNum);

  const result = useMemo(() => {
    if (
      isNaN(currentNum) ||
      isNaN(completedWeightNum) ||
      isNaN(targetNum) ||
      completedWeightNum >= 100 ||
      completedWeightNum <= 0
    ) {
      return null;
    }

    const completedFraction = completedWeightNum / 100;
    const remainingFraction = remainingWeight / 100;
    const currentContribution = currentNum * completedFraction;
    const remainingContributionNeeded = targetNum - currentContribution;
    const requiredScore = remainingContributionNeeded / remainingFraction;
    const rounded = Math.round(requiredScore * 100) / 100;

    return {
      requiredScore: rounded,
      remainingWeight,
      currentContribution: Math.round(currentContribution * 100) / 100,
      remainingContributionNeeded: Math.round(remainingContributionNeeded * 100) / 100,
      isPossible: rounded <= 100,
      isGuaranteed: rounded <= 0,
    };
  }, [currentNum, completedWeightNum, targetNum, remainingWeight]);

  const handleReset = () => {
    setCurrentGrade("82");
    setCompletedWeight("60");
    setTargetGrade("88");
  };

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-100 overflow-hidden my-6">
      <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Grade Needed Calculator</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Calculate the average score required on your remaining coursework to achieve your target class grade.
          </p>
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

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1">
              1. Current Grade Average (%)
            </label>
            <input
              type="number"
              value={currentGrade}
              onChange={(e) => setCurrentGrade(e.target.value)}
              placeholder="e.g. 82"
              className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1">
              2. Percentage of Course Completed So Far (%)
            </label>
            <input
              type="number"
              value={completedWeight}
              onChange={(e) => setCompletedWeight(e.target.value)}
              placeholder="e.g. 60"
              className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-xs text-slate-500 mt-1 block">
              Remaining course weight: <strong>{remainingWeight}%</strong>
            </span>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1">
              3. Desired Target Final Grade (%)
            </label>
            <input
              type="number"
              value={targetGrade}
              onChange={(e) => setTargetGrade(e.target.value)}
              placeholder="e.g. 88"
              className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-b from-indigo-50/50 via-slate-50 to-slate-100/80 rounded-2xl p-6 border border-indigo-100">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Required Score on Remaining Work
            </div>

            {result ? (
              <div className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm text-center mb-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Required Average
                </div>
                <div
                  className={`text-5xl sm:text-6xl font-black tracking-tight ${
                    !result.isPossible
                      ? "text-rose-600"
                      : result.isGuaranteed
                      ? "text-emerald-600"
                      : "text-indigo-600"
                  }`}
                >
                  {result.requiredScore}%
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-800">
                  average needed across the remaining <strong>{result.remainingWeight}%</strong> of the class.
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center text-slate-400">
                Enter your current grade and completed percentage.
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500">
            Formula: Required Average = (Target Grade - (Current Grade &times; Completed %)) &divide; Remaining %
          </div>
        </div>
      </div>
    </div>
  );
}

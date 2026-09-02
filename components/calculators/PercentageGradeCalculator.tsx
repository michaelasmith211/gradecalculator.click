"use client";

import React, { useState } from "react";
import { Percent, ArrowRight, RotateCcw } from "lucide-react";
import { getLetterGrade } from "@/lib/calculations/scales";

export default function PercentageGradeCalculator() {
  // Tab 1: Points to %
  const [earned, setEarned] = useState<string>("43");
  const [total, setTotal] = useState<string>("50");

  // Tab 2: % to Points
  const [targetPercent, setTargetPercent] = useState<string>("85");
  const [totalPoints, setTotalPoints] = useState<string>("150");

  // Calculations
  const earnedNum = parseFloat(earned);
  const totalNum = parseFloat(total);
  const calcPercent = !isNaN(earnedNum) && !isNaN(totalNum) && totalNum > 0 ? (earnedNum / totalNum) * 100 : null;
  const roundedPercent = calcPercent !== null ? Math.round(calcPercent * 100) / 100 : 0;
  const letter = calcPercent !== null ? getLetterGrade(roundedPercent).letter : "--";

  const targetNum = parseFloat(targetPercent);
  const totalPtsNum = parseFloat(totalPoints);
  const calcPointsNeeded = !isNaN(targetNum) && !isNaN(totalPtsNum) ? (targetNum / 100) * totalPtsNum : null;

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-100 overflow-hidden my-4 sm:my-6">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">Percentage Grade Calculator</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Convert assignment fractions to percentages and calculate required points for target percentages.
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Tool 1: Fraction / Points to Percentage */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              1. Points to Percentage & Letter Grade
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your score and total points (e.g. 43 / 50).
            </p>

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Points Earned</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={earned}
                  onChange={(e) => setEarned(e.target.value)}
                  placeholder="43"
                  className="w-full px-3 py-2 text-base font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <span className="text-slate-400 font-bold text-xl pt-5">/</span>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Total Points</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="50"
                  className="w-full px-3 py-2 text-base font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
            <div className="text-xs text-slate-500 font-medium">Resulting Score</div>
            <div className="text-4xl font-black text-indigo-600 mt-1">
              {calcPercent !== null ? `${roundedPercent}%` : "--"}
            </div>
            <div className="text-xs font-bold text-slate-700 mt-1">
              Letter Grade: <span className="text-indigo-600">{letter}</span>
            </div>
          </div>
        </div>

        {/* Tool 2: Percentage to Points Value */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              2. Calculate Points for a Target %
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Find how many raw points you need to earn a specific percentage.
            </p>

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Target %</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={targetPercent}
                  onChange={(e) => setTargetPercent(e.target.value)}
                  placeholder="85"
                  className="w-full px-3 py-2 text-base font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <span className="text-slate-400 font-bold text-xs pt-5">of</span>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Total Points</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={totalPoints}
                  onChange={(e) => setTotalPoints(e.target.value)}
                  placeholder="150"
                  className="w-full px-3 py-2 text-base font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
            <div className="text-xs text-slate-500 font-medium">Points Required</div>
            <div className="text-4xl font-black text-emerald-600 mt-1">
              {calcPointsNeeded !== null ? `${Math.round(calcPointsNeeded * 100) / 100}` : "--"}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">
              points needed out of {totalPoints || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

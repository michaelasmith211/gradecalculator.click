"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Share2,
  Check,
  Sparkles,
  Trophy,
} from "lucide-react";
import { calculateFinalExamNeeded, FinalExamInput } from "@/lib/calculations/finalExam";
import GradeSocialCardStudio from "../GradeSocialCardStudio";
import { trackEvent } from "@/lib/analytics";

interface FinalGradeCalculatorProps {
  title?: string;
  subtitle?: string;
}

export default function FinalGradeCalculator({
  title,
  subtitle,
}: FinalGradeCalculatorProps) {
  const [currentGrade, setCurrentGrade] = useState<string>("85");
  const [desiredGrade, setDesiredGrade] = useState<string>("90");
  const [examWeight, setExamWeight] = useState<string>("20");
  const [copiedResult, setCopiedResult] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const result = useMemo(() => {
    return calculateFinalExamNeeded({
      currentGrade,
      desiredGrade,
      examWeight,
    });
  }, [currentGrade, desiredGrade, examWeight]);

  const handleReset = () => {
    setCurrentGrade("85");
    setDesiredGrade("90");
    setExamWeight("20");
    trackEvent("final_grade_reset");
  };

  const handleQuickDesired = (target: number) => {
    setDesiredGrade(target.toString());
    trackEvent("final_grade_calculated", { target });
  };

  const handleShareResult = async () => {
    if (!result) return;
    const shareText = `I need a ${result.requiredScore}% on my final exam to finish with a ${result.desiredGrade}%! Calculate yours at https://gradecalculator.dev/final-grade-calculator/`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "My Final Exam Score Needed",
          text: shareText,
          url: "https://gradecalculator.dev/final-grade-calculator/",
        });
        trackEvent("share_result_native", { tool: "final_grade" });
        return;
      } catch (err) {
        // Fallback
      }
    }

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setCopiedResult(true);
        trackEvent("share_result_copied", { tool: "final_grade" });
        setTimeout(() => setCopiedResult(false), 2500);
      }
    } catch (err) {}
  };

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-100 overflow-hidden my-4 sm:my-6">
      {/* Top Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2">
            <span>{title || "Final Grade Calculator"}</span>
            {result && result.requiredScore <= 100 && (
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                Target Planner
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-200 mt-0.5">
            {subtitle || "Calculate the exact minimum score you need on your final exam to reach your goal grade."}
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
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-5">
          {/* Current Grade */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="currentGrade" className="text-sm font-bold text-slate-800">
                1. Your Current Grade (%)
              </label>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                Before Final
              </span>
            </div>
            <div className="relative">
              <input
                id="currentGrade"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                max="200"
                value={currentGrade}
                onChange={(e) => setCurrentGrade(e.target.value)}
                placeholder="e.g. 85.5"
                className="w-full px-4 py-3 text-base sm:text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-4 top-3 text-slate-500 font-bold text-base sm:text-lg">%</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={parseFloat(currentGrade) || 0}
              onChange={(e) => setCurrentGrade(e.target.value)}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none touch-manipulation"
            />
          </div>

          {/* Desired Final Grade */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="desiredGrade" className="text-sm font-bold text-slate-800">
                2. Your Desired Overall Grade (%)
              </label>
              <span className="text-xs font-semibold text-slate-600">
                Target Letter Cutoff
              </span>
            </div>
            <div className="relative">
              <input
                id="desiredGrade"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                max="100"
                value={desiredGrade}
                onChange={(e) => setDesiredGrade(e.target.value)}
                placeholder="e.g. 90"
                className="w-full px-4 py-3 text-base sm:text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-4 top-3 text-slate-500 font-bold text-base sm:text-lg">%</span>
            </div>

            {/* Quick Desired Grade Targets - Swipeable on mobile */}
            <div className="flex items-center gap-1.5 pt-1 text-xs overflow-x-auto pb-1">
              <span className="text-slate-700 font-bold shrink-0">Quick:</span>
              <button
                type="button"
                onClick={() => handleQuickDesired(93)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 font-bold rounded-lg transition-all active:scale-95 shrink-0 touch-manipulation min-h-[36px]"
              >
                A (93%)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDesired(90)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 font-bold rounded-lg transition-all active:scale-95 shrink-0 touch-manipulation min-h-[36px]"
              >
                A- (90%)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDesired(83)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 font-bold rounded-lg transition-all active:scale-95 shrink-0 touch-manipulation min-h-[36px]"
              >
                B (83%)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDesired(80)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 font-bold rounded-lg transition-all active:scale-95 shrink-0 touch-manipulation min-h-[36px]"
              >
                B- (80%)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDesired(70)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 font-bold rounded-lg transition-all active:scale-95 shrink-0 touch-manipulation min-h-[36px]"
              >
                C (70%)
              </button>
            </div>
          </div>

          {/* Final Exam Weight */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="examWeight" className="text-sm font-bold text-slate-800">
                3. Final Exam Weight (%)
              </label>
              <span className="text-xs font-semibold text-slate-600">
                Syllabus Weight
              </span>
            </div>
            <div className="relative">
              <input
                id="examWeight"
                type="number"
                inputMode="decimal"
                step="any"
                min="1"
                max="100"
                value={examWeight}
                onChange={(e) => setExamWeight(e.target.value)}
                placeholder="e.g. 20 or 30"
                className="w-full px-4 py-3 text-base sm:text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-4 top-3 text-slate-500 font-bold text-base sm:text-lg">%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={parseFloat(examWeight) || 0}
              onChange={(e) => setExamWeight(e.target.value)}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none touch-manipulation"
            />
          </div>
        </div>

        {/* Right Output Results Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-b from-indigo-50/50 via-slate-50 to-slate-100/80 rounded-2xl p-5 sm:p-6 border border-indigo-100">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
              <span>Required Exam Score</span>
              <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Instant
              </span>
            </div>

            {/* Prominent Score Output Card */}
            {result ? (
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-indigo-100 shadow-sm text-center mb-4">
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  You Need on Final Exam
                </div>
                <div
                  className={`text-5xl sm:text-6xl font-black tracking-tight ${
                    result.isImpossible
                      ? "text-rose-600"
                      : result.isGuaranteed
                      ? "text-emerald-600"
                      : "text-indigo-600"
                  }`}
                >
                  {result.requiredScore}%
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-800">
                  on your final exam to secure a <strong>{result.desiredGrade}%</strong> overall.
                </div>

                {/* Status Advice Alert */}
                <div className="mt-4 text-xs">
                  {result.isImpossible ? (
                    <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl flex items-center gap-2 text-left">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>
                        Mathematically, 100% on the final exam yields{" "}
                        <strong>{result.whatIfScenarios.find((s) => s.examScore === 100)?.resultingFinalGrade}%</strong>. Ask your instructor about extra credit!
                      </span>
                    </div>
                  ) : result.isGuaranteed ? (
                    <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl flex items-center gap-2 text-left">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>
                        Congratulations! You have already locked in your desired grade regardless of your exam score.
                      </span>
                    </div>
                  ) : (
                    <div className="p-3 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl flex items-center gap-2 text-left">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-600" />
                      <span>
                        Achievable goal! With dedicated revision on high-yield topics, this target is well within reach.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-sm text-slate-500">
                Enter your current grade and final exam weight above.
              </div>
            )}

            {/* Scenario Breakdown Matrix */}
            {result && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  "What-If" Final Score Scenario Matrix
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="px-3 py-2">If you score</th>
                        <th className="px-3 py-2 text-center">Final Course Grade</th>
                        <th className="px-3 py-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {result.whatIfScenarios.map((sc) => {
                        const meetsTarget = sc.resultingFinalGrade >= result.desiredGrade;
                        return (
                          <tr
                            key={sc.examScore}
                            className={meetsTarget ? "bg-emerald-50/50 font-semibold" : ""}
                          >
                            <td className="px-3 py-2 font-medium text-slate-900">
                              {sc.examScore}% on exam
                            </td>
                            <td className="px-3 py-2 text-center font-bold text-slate-900">
                              {sc.resultingFinalGrade}%
                            </td>
                            <td className="px-3 py-2 text-center">
                              {meetsTarget ? (
                                <span className="text-emerald-700 font-bold text-[11px] inline-flex items-center gap-0.5">
                                  ✓ Goal Met
                                </span>
                              ) : (
                                <span className="text-slate-500 text-[11px]">-</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inline Interactive Social Share Card Studio (Story format first) */}
      {result && (
        <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          <GradeSocialCardStudio
            data={{
              type: "final",
              title: title || "Final Exam Target",
              scoreDisplay: `${result.requiredScore}%`,
              scoreLabel: "Score Needed on Final Exam",
              letterGrade: `Target: ${result.desiredGrade}%`,
              additionalMetrics: [
                { label: "Current Grade", value: `${result.currentGrade}%` },
                { label: "Exam Weight", value: `${result.examWeightPercent}%` },
              ],
              statusText: result.isGuaranteed
                ? "Grade already secured!"
                : result.isImpossible
                ? "Extra credit needed"
                : "Achievable exam goal",
            }}
          />
        </div>
      )}
    </div>
  );
}

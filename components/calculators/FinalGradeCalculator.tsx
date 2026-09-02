"use client";

import React, { useState, useMemo } from "react";
import { Calculator, RotateCcw, HelpCircle, CheckCircle2, AlertTriangle, ArrowRight, Share2, Check, Copy } from "lucide-react";
import { calculateFinalExamNeeded, FinalExamInput } from "@/lib/calculations/finalExam";
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
    const shareText = `I need a ${result.requiredScore}% on my final exam to finish with a ${result.desiredGrade}%! Calculate yours at https://gradecalculator.click/final-grade-calculator/`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Final Exam Score Needed",
          text: shareText,
          url: "https://gradecalculator.click/final-grade-calculator/",
        });
        trackEvent("share_result_native", { tool: "final_grade" });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setCopiedResult(true);
        trackEvent("share_result_copied", { tool: "final_grade" });
        setTimeout(() => setCopiedResult(false), 2500);
      }
    } catch (err) {
      // Ignored
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-100 overflow-hidden my-6">
      {/* Top Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            {title || "Final Grade Calculator"}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {subtitle || "Calculate the exact minimum score you need on your final exam to reach your goal grade."}
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Current Grade */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="currentGrade" className="text-sm font-bold text-slate-800">
                1. Your Current Grade (%)
              </label>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Before Final
              </span>
            </div>
            <div className="relative">
              <input
                id="currentGrade"
                type="number"
                step="any"
                min="0"
                max="200"
                value={currentGrade}
                onChange={(e) => setCurrentGrade(e.target.value)}
                placeholder="e.g. 85.5"
                className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-4 top-3.5 text-slate-400 font-bold text-lg">%</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={parseFloat(currentGrade) || 0}
              onChange={(e) => setCurrentGrade(e.target.value)}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Desired Final Grade */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="desiredGrade" className="text-sm font-bold text-slate-800">
                2. Your Desired Overall Grade (%)
              </label>
              <span className="text-xs font-semibold text-slate-500">
                Target Letter Cutoff
              </span>
            </div>
            <div className="relative">
              <input
                id="desiredGrade"
                type="number"
                step="any"
                min="0"
                max="100"
                value={desiredGrade}
                onChange={(e) => setDesiredGrade(e.target.value)}
                placeholder="e.g. 90"
                className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-4 top-3.5 text-slate-400 font-bold text-lg">%</span>
            </div>

            {/* Quick Desired Grade Targets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
              <span className="text-slate-500 font-medium">Quick Targets:</span>
              <button
                type="button"
                onClick={() => handleQuickDesired(93)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 font-semibold rounded-md transition-colors"
              >
                A (93%)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDesired(90)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 font-semibold rounded-md transition-colors"
              >
                A- (90%)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDesired(83)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 font-semibold rounded-md transition-colors"
              >
                B (83%)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDesired(80)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 font-semibold rounded-md transition-colors"
              >
                B- (80%)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDesired(70)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 font-semibold rounded-md transition-colors"
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
              <span className="text-xs font-semibold text-slate-500">
                Syllabus Weight
              </span>
            </div>
            <div className="relative">
              <input
                id="examWeight"
                type="number"
                step="any"
                min="1"
                max="100"
                value={examWeight}
                onChange={(e) => setExamWeight(e.target.value)}
                placeholder="e.g. 20 or 30"
                className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-4 top-3.5 text-slate-400 font-bold text-lg">%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={parseFloat(examWeight) || 0}
              onChange={(e) => setExamWeight(e.target.value)}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Output Results Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-b from-indigo-50/50 via-slate-50 to-slate-100/80 rounded-2xl p-6 border border-indigo-100">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
              <span>Required Exam Score</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold">
                Instant Calculation
              </span>
            </div>

            {/* Prominent Score Output Card */}
            {result ? (
              <div className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm text-center mb-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  You Need
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
                  on your final exam to finish with <span className="text-indigo-600 font-bold">{result.desiredGrade}%</span>.
                </div>

                {/* Status Message Pill */}
                <div className="mt-3 p-3 rounded-xl bg-slate-50 text-xs text-slate-600 border border-slate-100">
                  {result.statusMessage}
                </div>

                {/* Share Result Button */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleShareResult}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all border border-indigo-200 shadow-sm"
                  >
                    {copiedResult ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Result Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share This Result</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center text-slate-400">
                Enter your current grade, goal grade, and final exam weight.
              </div>
            )}

            {/* Formula Breakdown Accordion/Card */}
            {result && (
              <div className="bg-white rounded-xl p-4 border border-slate-200 text-xs space-y-2 text-slate-600">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Mathematical Step-by-Step Breakdown</span>
                </div>
                <div className="font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-slate-700 leading-relaxed overflow-x-auto text-[11px]">
                  Required Score = (Desired Grade - Current Grade &times; (1 - Weight)) &divide; Weight<br />
                  = ({result.desiredGrade} - {result.currentGrade} &times; {result.priorWeightDecimal}) &divide; {result.examWeightDecimal}<br />
                  = ({result.desiredGrade} - {result.priorContribution}) &divide; {result.examWeightDecimal}<br />
                  = {result.remainingNeeded} &divide; {result.examWeightDecimal} = <strong className="text-indigo-600 font-bold">{result.requiredScore}%</strong>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-[11px] text-slate-500">
            Tip: Most college final exams are worth between 15% and 35% of the total semester grade.
          </div>
        </div>
      </div>

      {/* What-If Scenario Matrix Table */}
      {result && result.whatIfScenarios.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50/60 p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-2">
            "What-If" Final Exam Scenario Table
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            See how different final exam scores will affect your final overall course grade:
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 text-center text-xs">
            {result.whatIfScenarios.map((scen) => {
              const isPassingTarget = scen.resultingFinalGrade >= result.desiredGrade;
              return (
                <div
                  key={scen.examScore}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isPassingTarget
                      ? "bg-emerald-50/80 border-emerald-300 text-emerald-950 font-bold"
                      : "bg-white border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="text-[11px] text-slate-500">Exam: {scen.examScore}%</div>
                  <div className="text-base font-black mt-0.5">
                    {scen.resultingFinalGrade}%
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{scen.letterGradeDescription}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

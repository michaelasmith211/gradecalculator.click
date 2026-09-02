"use client";

import React, { useState, useMemo } from "react";
import { Check, X, RotateCcw, ListFilter, CheckCircle2 } from "lucide-react";
import { generateTestGradeChart, calculateSingleScore } from "@/lib/calculations/testGrader";
import { getLetterGrade } from "@/lib/calculations/scales";

interface TestGradeCalculatorProps {
  title?: string;
  subtitle?: string;
}

export default function TestGradeCalculator({
  title,
  subtitle,
}: TestGradeCalculatorProps) {
  const [totalQuestions, setTotalQuestions] = useState<string>("50");
  const [wrongAnswers, setWrongAnswers] = useState<string>("4");

  const totalNum = parseInt(totalQuestions, 10);
  const wrongNum = parseInt(wrongAnswers, 10);
  const correctNum = !isNaN(totalNum) && !isNaN(wrongNum) ? Math.max(0, totalNum - wrongNum) : 0;

  const singleScore = useMemo(() => {
    return calculateSingleScore(correctNum, totalNum);
  }, [correctNum, totalNum]);

  const chartRows = useMemo(() => {
    return generateTestGradeChart(totalNum || 50, 30);
  }, [totalNum]);

  const handleReset = () => {
    setTotalQuestions("50");
    setWrongAnswers("4");
  };

  const gpaVal = getLetterGrade(singleScore.percentage).gpaPoint;

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-100 overflow-hidden my-4 sm:my-6">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">
            {title || "Test & Quiz Grade Calculator"}
          </h2>
          <p className="text-xs text-slate-200 mt-0.5">
            {subtitle || "Calculate single test scores and view a complete Easy Grader grading chart."}
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

      {/* Top Section: Quick Test Score Checker */}
      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border-b border-slate-200">
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label htmlFor="totalQuestions" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Total Questions
              </label>
              <input
                id="totalQuestions"
                type="number"
                inputMode="decimal"
                min="1"
                value={totalQuestions}
                onChange={(e) => setTotalQuestions(e.target.value)}
                placeholder="50"
                className="w-full px-3 sm:px-4 py-3 text-base sm:text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="wrongAnswers" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Number Wrong
              </label>
              <input
                id="wrongAnswers"
                type="number"
                inputMode="decimal"
                min="0"
                value={wrongAnswers}
                onChange={(e) => setWrongAnswers(e.target.value)}
                placeholder="4"
                className="w-full px-3 sm:px-4 py-3 text-base sm:text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="text-xs text-slate-600 flex items-center justify-between pt-1 font-medium">
            <span>Correct: <strong className="text-slate-900">{correctNum}</strong></span>
            <span>Total: <strong className="text-slate-900">{totalNum || 0}</strong></span>
          </div>
        </div>

        {/* Right: Instant Score Result */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="w-full bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 text-center flex flex-col items-center justify-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Score Earned
            </div>
            <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
              {singleScore.percentage}%
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full text-sm font-extrabold bg-indigo-600 text-white shadow-sm">
                Grade: {singleScore.letter}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-200">
                {gpaVal.toFixed(1)} GPA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Full Easy Grader Table */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-indigo-700" />
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Easy Grader Quick Reference ({totalNum || 50} Questions)
            </span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-800 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th scope="col" className="px-4 py-2.5">Wrong Answers</th>
                <th scope="col" className="px-4 py-2.5">Score Fraction</th>
                <th scope="col" className="px-4 py-2.5">Percentage</th>
                <th scope="col" className="px-4 py-2.5">Letter Grade</th>
                <th scope="col" className="px-4 py-2.5">GPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {chartRows.map((row) => {
                const rowGpa = getLetterGrade(row.percentage).gpaPoint;
                return (
                  <tr
                    key={row.wrong}
                    className={`hover:bg-slate-50 ${row.wrong === wrongNum ? "bg-indigo-50/80 font-bold" : ""}`}
                  >
                    <td className="px-4 py-2 font-semibold text-slate-900">
                      {row.wrong === 0 ? "0 (Perfect)" : `-${row.wrong} Wrong`}
                    </td>
                    <td className="px-4 py-2 text-slate-700">{row.correct} / {totalNum || 50}</td>
                    <td className="px-4 py-2 font-bold text-slate-900">{row.percentage}%</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-900">
                        {row.letter}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-slate-700 font-medium">{rowGpa.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

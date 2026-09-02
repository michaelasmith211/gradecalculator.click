"use client";

import React, { useState, useMemo } from "react";
import { Check, X, RotateCcw, ListFilter } from "lucide-react";
import { generateTestGradeChart, calculateSingleScore } from "@/lib/calculations/testGrader";

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
    return generateTestGradeChart(totalNum || 50, 25);
  }, [totalNum]);

  const handleReset = () => {
    setTotalQuestions("50");
    setWrongAnswers("4");
  };

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-100 overflow-hidden my-6">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            {title || "Test & Quiz Grade Calculator"}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {subtitle || "Calculate single test scores and view a complete Easy Grader grading chart."}
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

      {/* Top Section: Quick Test Score Checker */}
      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-slate-200">
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="totalQuestions" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Total Questions
              </label>
              <input
                id="totalQuestions"
                type="number"
                min="1"
                value={totalQuestions}
                onChange={(e) => setTotalQuestions(e.target.value)}
                placeholder="50"
                className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="wrongAnswers" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Number Wrong
              </label>
              <input
                id="wrongAnswers"
                type="number"
                min="0"
                value={wrongAnswers}
                onChange={(e) => setWrongAnswers(e.target.value)}
                placeholder="4"
                className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-4 pt-1">
            <span>Correct Answers: <strong className="text-slate-800">{correctNum}</strong></span>
            <span>Total Questions: <strong className="text-slate-800">{totalNum || 0}</strong></span>
          </div>
        </div>

        {/* Right: Instant Score Result */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Test Score Result
            </span>
            <div className="text-5xl sm:text-6xl font-black text-indigo-600 tracking-tight">
              {singleScore.percentage}%
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm font-bold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                Letter Grade: {singleScore.letter}
              </span>
              <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full">
                {singleScore.fraction} Correct
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Easy Grader Chart Table */}
      <div className="p-6 lg:p-8 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Easy Grader Chart ({totalNum || 50} Questions)
            </h3>
            <p className="text-xs text-slate-500">
              Quick grading reference sheet showing scores for each wrong answer.
            </p>
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto border border-slate-200 rounded-xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100/80 text-slate-600 uppercase text-[11px] font-bold sticky top-0">
              <tr>
                <th className="px-4 py-2.5">Wrong (-pts)</th>
                <th className="px-4 py-2.5">Correct</th>
                <th className="px-4 py-2.5">Percentage</th>
                <th className="px-4 py-2.5">Letter Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {chartRows.map((row) => {
                const isCurrent = row.wrong === wrongNum;
                return (
                  <tr
                    key={row.wrong}
                    className={`transition-colors ${
                      isCurrent ? "bg-indigo-50/90 font-bold text-indigo-900" : "hover:bg-slate-50/70"
                    }`}
                  >
                    <td className="px-4 py-2 font-bold text-rose-600">-{row.wrong}</td>
                    <td className="px-4 py-2 font-medium">{row.correct}</td>
                    <td className="px-4 py-2 font-bold">{row.percentage}%</td>
                    <td className="px-4 py-2">
                      <span className="font-black px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-800">
                        {row.letter}
                      </span>
                    </td>
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

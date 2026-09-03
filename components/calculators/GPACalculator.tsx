"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  RotateCcw,
  Award,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { calculateGPA, GPACourseItem } from "@/lib/calculations/gpa";
import InteractiveShareCardModal from "../InteractiveShareCardModal";
import { trackEvent } from "@/lib/analytics";

interface GPACalculatorProps {
  type?: "standard" | "college" | "semester" | "highschool";
  title?: string;
  subtitle?: string;
}

export default function GPACalculator({
  type = "standard",
  title,
  subtitle,
}: GPACalculatorProps) {
  const [courses, setCourses] = useState<GPACourseItem[]>([
    { id: "1", name: "Calculus I", grade: "A", credits: 4, level: type === "highschool" ? "ap_ib" : "regular" },
    { id: "2", name: "English Composition", grade: "B+", credits: 3, level: "regular" },
    { id: "3", name: "Physics & Lab", grade: "A-", credits: 4, level: type === "highschool" ? "honors" : "regular" },
    { id: "4", name: "World History", grade: "B", credits: 3, level: "regular" },
  ]);

  const [priorGpa, setPriorGpa] = useState<string>("");
  const [priorCredits, setPriorCredits] = useState<string>("");
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateGPA(courses, priorGpa, priorCredits);
  }, [courses, priorGpa, priorCredits]);

  const handleAddCourse = () => {
    const nextId = (courses.length + 1).toString() + "-" + Date.now();
    setCourses([
      ...courses,
      { id: nextId, name: `Course ${courses.length + 1}`, grade: "A", credits: 3, level: "regular" },
    ]);
    trackEvent("gpa_course_added");
  };

  const handleRemoveCourse = (id: string) => {
    if (courses.length <= 1) {
      setCourses([{ id: "1", name: "Course 1", grade: "A", credits: 3, level: "regular" }]);
      return;
    }
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleChange = (id: string, field: keyof GPACourseItem, value: any) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
    trackEvent("gpa_calculated");
  };

  const handleReset = () => {
    setCourses([
      { id: "1", name: "Course 1", grade: "A", credits: 3, level: "regular" },
      { id: "2", name: "Course 2", grade: "A", credits: 3, level: "regular" },
      { id: "3", name: "Course 3", grade: "B+", credits: 3, level: "regular" },
      { id: "4", name: "Course 4", grade: "B", credits: 3, level: "regular" },
    ]);
    setPriorGpa("");
    setPriorCredits("");
  };

  const letterOptions = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-100 overflow-hidden my-4 sm:my-6">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2">
            <span>
              {title ||
                (type === "college"
                  ? "College GPA Calculator"
                  : type === "highschool"
                  ? "High School GPA Calculator"
                  : type === "semester"
                  ? "Semester GPA Calculator"
                  : "4.0 GPA Calculator")}
            </span>
            {result.validCourseCount > 0 && result.gpa >= 3.5 && (
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 animate-pulse">
                <Sparkles className="w-3 h-3 inline mr-0.5" /> Dean's List
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-200 mt-0.5">
            {subtitle || "Calculate your term and cumulative Grade Point Average and quality points."}
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
        {/* Left: Courses Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Current Courses ({courses.length})
            </span>
            <span className="text-xs text-slate-600 font-semibold">Standard 4.0 Scale</span>
          </div>

          {/* Desktop Table Header */}
          <div className="grid grid-cols-12 gap-2 text-xs font-bold text-slate-700 px-2 uppercase tracking-wider hidden sm:grid">
            <div className="col-span-5">Course Name</div>
            <div className="col-span-2 text-center">Grade</div>
            <div className="col-span-2 text-center">Credits</div>
            <div className="col-span-2 text-center">{type === "highschool" ? "Weight" : "Level"}</div>
            <div className="col-span-1"></div>
          </div>

          {/* Row Inputs - Touch & Mobile Optimized */}
          <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
            {courses.map((course, idx) => (
              <div
                key={course.id}
                className="p-3 sm:p-2 bg-slate-50/90 hover:bg-slate-100/90 rounded-xl border border-slate-200 transition-colors space-y-2 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-2 sm:items-center"
              >
                {/* Course Name */}
                <div className="sm:col-span-5">
                  <div className="text-[11px] font-bold text-slate-600 sm:hidden mb-1">
                    Course #{idx + 1}
                  </div>
                  <input
                    type="text"
                    value={course.name}
                    placeholder={`Course ${idx + 1}`}
                    onChange={(e) => handleChange(course.id, "name", e.target.value)}
                    className="w-full px-3 py-2 text-base sm:text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Grade, Credits, Level on Mobile */}
                <div className="grid grid-cols-12 gap-2 sm:contents">
                  <div className="col-span-4 sm:col-span-2">
                    <div className="text-[10px] font-bold text-slate-600 sm:hidden mb-0.5 text-center">
                      Grade
                    </div>
                    <select
                      value={course.grade}
                      onChange={(e) => handleChange(course.id, "grade", e.target.value)}
                      className="w-full px-2 py-2 text-base sm:text-sm text-center font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {letterOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <div className="text-[10px] font-bold text-slate-600 sm:hidden mb-0.5 text-center">
                      Credits
                    </div>
                    <input
                      type="number"
                      inputMode="decimal"
                      step="any"
                      min="0"
                      max="10"
                      value={course.credits}
                      placeholder="Credits"
                      onChange={(e) => handleChange(course.id, "credits", e.target.value)}
                      className="w-full px-2 py-2 text-base sm:text-sm text-center font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <div className="text-[10px] font-bold text-slate-600 sm:hidden mb-0.5 text-center">
                      Level
                    </div>
                    <select
                      value={course.level || "regular"}
                      onChange={(e) => handleChange(course.id, "level", e.target.value)}
                      className="w-full px-1.5 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="regular">Regular</option>
                      <option value="honors">Honors (+0.5)</option>
                      <option value="ap_ib">AP/IB (+1.0)</option>
                    </select>
                  </div>

                  <div className="col-span-1 flex items-end sm:items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(course.id)}
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors active:scale-90 touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center"
                      title="Remove course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddCourse}
            className="w-full py-3 sm:py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 active:scale-[0.99] text-indigo-700 font-bold text-sm rounded-xl border border-indigo-200 flex items-center justify-center gap-2 transition-all shadow-sm touch-manipulation min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Another Course</span>
          </button>

          {/* Cumulative GPA Accumulator */}
          <div className="mt-6 pt-4 border-t border-slate-200 bg-slate-50/90 p-4 rounded-xl">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
              Optional: Calculate Cumulative GPA
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Prior Cumulative GPA</label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min="0"
                  max="5.0"
                  value={priorGpa}
                  onChange={(e) => setPriorGpa(e.target.value)}
                  placeholder="e.g. 3.65"
                  className="w-full px-3 py-2 text-base sm:text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Prior Credits Completed</label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  value={priorCredits}
                  onChange={(e) => setPriorCredits(e.target.value)}
                  placeholder="e.g. 45"
                  className="w-full px-3 py-2 text-base sm:text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-slate-50 to-slate-100/90 rounded-2xl p-5 sm:p-6 border border-slate-200">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                GPA Calculation
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Live
              </span>
            </div>

            {/* GPA Big Score */}
            <div className="text-center py-6 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm mb-4">
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Term Grade Point Average
              </div>
              <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                {result.validCourseCount > 0 ? result.gpa.toFixed(2) : "--"}
              </div>

              {result.validCourseCount > 0 && (
                <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-600 text-white shadow-sm">
                    {result.totalCredits} Credits Attempted
                  </span>
                  {type === "highschool" && result.gpa !== result.unweightedGpa && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-600 text-white shadow-sm">
                      Unweighted: {result.unweightedGpa.toFixed(2)} GPA
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="text-[11px] font-semibold text-slate-600 uppercase">
                  Quality Points
                </div>
                <div className="text-xl font-bold text-slate-900 mt-0.5">
                  {result.totalQualityPoints.toFixed(1)}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="text-[11px] font-semibold text-slate-600 uppercase">
                  Total Credits
                </div>
                <div className="text-xl font-bold text-slate-900 mt-0.5">
                  {result.totalCredits}
                </div>
              </div>
            </div>

            {/* Cumulative GPA Display if populated */}
            {result.cumulativeGpa !== undefined && result.cumulativeCredits !== undefined && (
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl mb-4 text-center">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                  New Cumulative GPA
                </div>
                <div className="text-3xl font-black text-indigo-700 mt-1">
                  {result.cumulativeGpa.toFixed(2)}
                </div>
                <div className="text-[11px] text-indigo-700 mt-0.5 font-semibold">
                  Across {result.cumulativeCredits} Total Career Credits
                </div>
              </div>
            )}

            {/* Interactive Share GPA Card Button */}
            {result.validCourseCount > 0 && (
              <button
                type="button"
                onClick={() => setShareModalOpen(true)}
                className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 active:scale-[0.98] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-indigo-200 transition-all touch-manipulation min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Create & Share GPA Card</span>
                <Share2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Social Share Card Modal */}
      {result.validCourseCount > 0 && (
        <InteractiveShareCardModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          data={{
            type: "gpa",
            title: title || (type === "highschool" ? "High School GPA" : "College GPA"),
            scoreDisplay: `${result.gpa.toFixed(2)}`,
            scoreLabel: "Grade Point Average (4.0)",
            letterGrade: result.gpa >= 3.5 ? "Dean's List" : "Honor Roll",
            gpaPoint: result.gpa,
            additionalMetrics: [
              { label: "Total Credits", value: `${result.totalCredits} Credits` },
              { label: "Quality Points", value: `${result.totalQualityPoints.toFixed(1)} Pts` },
            ],
          }}
        />
      )}
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2, RotateCcw, Award, GraduationCap, Sparkles } from "lucide-react";
import { calculateGPA, GPACourseItem } from "@/lib/calculations/gpa";
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
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-100 overflow-hidden my-6">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            {title || (type === "college" ? "College GPA Calculator" : type === "highschool" ? "High School GPA Calculator" : type === "semester" ? "Semester GPA Calculator" : "4.0 GPA Calculator")}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {subtitle || "Calculate your term and cumulative Grade Point Average and quality points."}
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
        {/* Left: Courses Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Current Courses ({courses.length})
            </span>
            <span className="text-xs text-slate-500 font-medium">Standard 4.0 Scale</span>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 text-xs font-bold text-slate-500 px-2 uppercase tracking-wider hidden sm:grid">
            <div className="col-span-5">Course Name</div>
            <div className="col-span-2 text-center">Grade</div>
            <div className="col-span-2 text-center">Credits</div>
            <div className="col-span-2 text-center">{type === "highschool" ? "Weight" : "Level"}</div>
            <div className="col-span-1"></div>
          </div>

          {/* Row Inputs */}
          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {courses.map((course, idx) => (
              <div
                key={course.id}
                className="grid grid-cols-12 gap-2 p-2 bg-slate-50/80 hover:bg-slate-100/80 rounded-xl border border-slate-200 transition-colors items-center"
              >
                <div className="col-span-12 sm:col-span-5">
                  <input
                    type="text"
                    value={course.name}
                    placeholder={`Course ${idx + 1}`}
                    onChange={(e) => handleChange(course.id, "name", e.target.value)}
                    className="w-full px-3 py-2 text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <select
                    value={course.grade}
                    onChange={(e) => handleChange(course.id, "grade", e.target.value)}
                    className="w-full px-2 py-2 text-sm text-center font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {letterOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    max="10"
                    value={course.credits}
                    placeholder="Credits"
                    onChange={(e) => handleChange(course.id, "credits", e.target.value)}
                    className="w-full px-2 py-2 text-sm text-center font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <select
                    value={course.level || "regular"}
                    onChange={(e) => handleChange(course.id, "level", e.target.value)}
                    className="w-full px-2 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="regular">Regular (4.0)</option>
                    <option value="honors">Honors (+0.5)</option>
                    <option value="ap_ib">AP/IB (+1.0)</option>
                  </select>
                </div>
                <div className="col-span-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveCourse(course.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddCourse}
            className="w-full py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm rounded-xl border border-indigo-200/80 flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Course</span>
          </button>

          {/* Cumulative GPA Accumulator */}
          <div className="mt-6 pt-4 border-t border-slate-200 bg-slate-50/70 p-4 rounded-xl">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
              Optional: Calculate Cumulative GPA
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-600 font-medium block mb-1">Prior Cumulative GPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="5.0"
                  value={priorGpa}
                  onChange={(e) => setPriorGpa(e.target.value)}
                  placeholder="e.g. 3.65"
                  className="w-full px-3 py-2 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-slate-600 font-medium block mb-1">Prior Credits Completed</label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={priorCredits}
                  onChange={(e) => setPriorCredits(e.target.value)}
                  placeholder="e.g. 45"
                  className="w-full px-3 py-2 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-slate-50 to-slate-100/90 rounded-2xl p-6 border border-slate-200">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                GPA Calculation
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                4.0 Standard
              </span>
            </div>

            {/* GPA Big Score */}
            <div className="text-center py-6 bg-white rounded-2xl border border-slate-200 shadow-sm mb-6">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Term Grade Point Average
              </div>
              <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                {result.validCourseCount > 0 ? result.gpa.toFixed(2) : "--"}
              </div>

              {result.validCourseCount > 0 && (
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                    {result.academicStanding}
                  </span>
                  {type === "highschool" && (
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                      Unweighted: {result.unweightedGpa.toFixed(2)}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Cumulative GPA Card if entered */}
            {result.cumulativeGpa !== undefined && (
              <div className="mb-6 p-4 bg-indigo-600 text-white rounded-2xl text-center shadow-md">
                <div className="text-xs font-semibold text-indigo-100 uppercase tracking-wider">
                  Updated Cumulative GPA
                </div>
                <div className="text-4xl font-black mt-1">
                  {result.cumulativeGpa.toFixed(2)}
                </div>
                <div className="text-xs text-indigo-100 mt-1">
                  Across {result.cumulativeCredits} total completed credits
                </div>
              </div>
            )}

            {/* Stats Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-slate-500 font-medium">Term Credits</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  {result.totalCredits}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-slate-500 font-medium">Quality Points</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  {result.totalQualityPoints}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-slate-500 font-medium">Courses Counted</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  {result.validCourseCount}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-slate-500 font-medium">Grading System</div>
                <div className="text-xs font-bold text-indigo-700 mt-1">
                  4.0 Scale System
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[11px] text-slate-500">
            Quality points = Course Credits &times; Grade Point Value (e.g. 4 credits of A = 16.0 quality points).
          </div>
        </div>
      </div>
    </div>
  );
}

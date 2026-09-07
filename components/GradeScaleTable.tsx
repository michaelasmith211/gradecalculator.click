"use client";

import React from "react";
import { DEFAULT_GRADE_SCALE, GradeCutoff } from "@/lib/calculations/scales";
import { useI18n } from "@/lib/i18n/context";

interface GradeScaleTableProps {
  scale?: GradeCutoff[];
  highlightPercentage?: number;
}

export default function GradeScaleTable({
  scale = DEFAULT_GRADE_SCALE,
  highlightPercentage,
}: GradeScaleTableProps) {
  const { t } = useI18n();

  return (
    <div className="w-full overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">
          {t("gradeScaleTitle")}
        </h3>
        <span className="text-xs text-slate-700 font-semibold">{t("gradingScale")}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100/70 text-slate-700 uppercase tracking-wider text-[11px] font-bold">
            <tr>
              <th scope="col" className="px-4 py-2.5">{t("letterGrade")}</th>
              <th scope="col" className="px-4 py-2.5">{t("percentageRange")}</th>
              <th scope="col" className="px-4 py-2.5">{t("gpa")}</th>
              <th scope="col" className="px-4 py-2.5">{t("academicStanding")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {scale.map((cutoff, idx) => {
              const nextCutoff = scale[idx - 1];
              const maxPercent = nextCutoff ? nextCutoff.minPercent - 1 : 100;
              const rangeStr =
                cutoff.minPercent === 0
                  ? `< ${scale[scale.length - 2]?.minPercent || 60}%`
                  : `${cutoff.minPercent}% – ${maxPercent}%`;

              const isHighlighted =
                highlightPercentage !== undefined &&
                highlightPercentage >= cutoff.minPercent &&
                (nextCutoff === undefined || highlightPercentage < nextCutoff.minPercent);

              return (
                <tr
                  key={cutoff.letter}
                  className={`transition-colors ${
                    isHighlighted
                      ? "bg-indigo-50/80 font-bold text-indigo-950"
                      : "hover:bg-slate-50/70"
                  }`}
                >
                  <td className="px-4 py-2.5 font-bold text-slate-900 flex items-center gap-2">
                    <span
                      className={`inline-block w-6 text-center py-0.5 rounded text-xs ${
                        cutoff.letter.startsWith("A")
                          ? "bg-emerald-100 text-emerald-800 font-black"
                          : cutoff.letter.startsWith("B")
                          ? "bg-blue-100 text-blue-800 font-black"
                          : cutoff.letter.startsWith("C")
                          ? "bg-amber-100 text-amber-800 font-black"
                          : cutoff.letter.startsWith("D")
                          ? "bg-orange-100 text-orange-800 font-black"
                          : "bg-rose-100 text-rose-800 font-black"
                      }`}
                    >
                      {cutoff.letter}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-medium">{rangeStr}</td>
                  <td className="px-4 py-2.5 font-semibold text-slate-900">
                    {cutoff.gpaPoint.toFixed(1)}
                  </td>
                  <td className="px-4 py-2.5 text-slate-600">{cutoff.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

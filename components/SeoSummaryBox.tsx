import React from "react";
import { Lightbulb, CheckCircle2, Calculator } from "lucide-react";

interface SeoSummaryBoxProps {
  title?: string;
  keyTakeaways: string[];
  formula?: string;
  quickAnswer?: string;
}

export default function SeoSummaryBox({
  title = "Quick Summary & Key Takeaways",
  keyTakeaways,
  formula,
  quickAnswer,
}: SeoSummaryBoxProps) {
  return (
    <aside className="my-6 p-5 sm:p-6 bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border border-indigo-100/90 rounded-2xl shadow-sm space-y-4" aria-label="Key Takeaways Summary">
      <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-sm sm:text-base tracking-tight">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <Lightbulb className="w-4 h-4" />
        </div>
        <span>{title}</span>
      </div>

      {quickAnswer && (
        <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed bg-white/80 p-3.5 rounded-xl border border-indigo-50">
          {quickAnswer}
        </p>
      )}

      {formula && (
        <div className="p-3 bg-slate-900 text-indigo-300 font-mono text-xs rounded-xl border border-slate-800 overflow-x-auto flex items-center gap-2">
          <Calculator className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="text-white font-bold">{formula}</span>
        </div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-700">
        {keyTakeaways.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-normal">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

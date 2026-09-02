"use client";

import React, { useState } from "react";
import { X, RotateCcw, Check, Settings2 } from "lucide-react";
import { DEFAULT_GRADE_SCALE, STANDARD_10_POINT_SCALE, STRICT_7_POINT_SCALE, GradeCutoff } from "@/lib/calculations/scales";

interface ScaleSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  scale: GradeCutoff[];
  onSave: (newScale: GradeCutoff[]) => void;
}

export default function ScaleSettingsModal({
  isOpen,
  onClose,
  scale,
  onSave,
}: ScaleSettingsModalProps) {
  const [currentScale, setCurrentScale] = useState<GradeCutoff[]>(scale);

  if (!isOpen) return null;

  const handlePresetSelect = (preset: GradeCutoff[]) => {
    setCurrentScale(preset);
  };

  const handleCutoffChange = (letter: string, val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setCurrentScale((prev) =>
        prev.map((item) => (item.letter === letter ? { ...item, minPercent: num } : item))
      );
    }
  };

  const handleSave = () => {
    onSave(currentScale);
    onClose();
  };

  const handleReset = () => {
    setCurrentScale(DEFAULT_GRADE_SCALE);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">Customize Grading Scale</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Preset Scale
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handlePresetSelect(DEFAULT_GRADE_SCALE)}
                className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 hover:border-indigo-600 hover:bg-indigo-50 text-slate-800 transition-all text-center"
              >
                Standard Plus/Minus (93/90/87)
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect(STANDARD_10_POINT_SCALE)}
                className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 hover:border-indigo-600 hover:bg-indigo-50 text-slate-800 transition-all text-center"
              >
                Straight 10-Point (A: 90, B: 80)
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect(STRICT_7_POINT_SCALE)}
                className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 hover:border-indigo-600 hover:bg-indigo-50 text-slate-800 transition-all text-center"
              >
                Strict 7-Point (A: 93+, B: 85+)
              </button>
            </div>
          </div>

          {/* Scale Table Inputs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Minimum Percentage Cutoffs (%)
            </label>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 max-h-60 overflow-y-auto">
              {currentScale.map((item) => (
                <div key={item.letter} className="flex items-center justify-between px-4 py-2 hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="font-bold w-8 text-slate-900">{item.letter}</span>
                    <span className="text-xs text-slate-500">{item.description}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">&ge;</span>
                    <input
                      type="number"
                      value={item.minPercent}
                      onChange={(e) => handleCutoffChange(item.letter, e.target.value)}
                      className="w-16 px-2 py-1 text-center font-bold text-slate-900 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <span className="text-xs text-slate-500">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Default
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
            >
              <Check className="w-4 h-4" />
              Apply Scale
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

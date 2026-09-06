"use client";

import React, { useState, useMemo, useEffect } from "react";
import { X, Search, Globe, Check, ArrowRight } from "lucide-react";
import { LOCALES, LocaleConfig, isRTL, DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { useI18n } from "@/lib/i18n/context";

interface LanguageSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LanguageSwitcherModal({
  isOpen,
  onClose,
}: LanguageSwitcherModalProps) {
  const { locale, switchLanguage, t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Filter languages by query
  const filteredLocales = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const list = Object.values(LOCALES);
    if (!q) return list;
    return list.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.englishName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Group into 3 columns matching reference image when not searching
  const column1 = useMemo(() => filteredLocales.filter((l) => l.column === 1), [filteredLocales]);
  const column2 = useMemo(() => filteredLocales.filter((l) => l.column === 2), [filteredLocales]);
  const column3 = useMemo(() => filteredLocales.filter((l) => l.column === 3), [filteredLocales]);

  if (!isOpen) return null;

  const renderLocaleItem = (l: LocaleConfig) => {
    const isSelected = l.code === locale;
    const isLangRTL = isRTL(l.code);

    return (
      <button
        key={l.code}
        onClick={() => switchLanguage(l.code)}
        dir={isLangRTL ? "rtl" : "ltr"}
        className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between group ${
          isSelected
            ? "bg-indigo-600 text-white font-bold shadow-sm shadow-indigo-200"
            : "text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/80 font-medium"
        }`}
      >
        <div className="flex items-baseline gap-2 truncate">
          <span className="text-[15px] tracking-tight">{l.name}</span>
          {l.englishName !== l.name && (
            <span
              className={`text-xs ${
                isSelected ? "text-indigo-200" : "text-slate-400 group-hover:text-indigo-400"
              }`}
            >
              ({l.englishName})
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {isLangRTL && (
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                isSelected
                  ? "bg-indigo-700 text-indigo-100"
                  : "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
              }`}
            >
              RTL
            </span>
          )}
          {isSelected && <Check className="w-4 h-4 text-white" />}
        </div>
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{t("selectLanguage")}</h2>
              <p className="text-xs text-slate-500">
                GradeCalculator.dev supports 39 languages with instant calculation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchLanguage")}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-800"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 3-Column Language List matching User Image */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-grow">
          {searchQuery ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {filteredLocales.map(renderLocaleItem)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Column 1 */}
              <div className="space-y-1">
                {column1.map(renderLocaleItem)}
              </div>

              {/* Column 2 */}
              <div className="space-y-1">
                {column2.map(renderLocaleItem)}
              </div>

              {/* Column 3 */}
              <div className="space-y-1">
                {column3.map(renderLocaleItem)}
              </div>
            </div>
          )}

          {filteredLocales.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <Globe className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="font-semibold">No languages match &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching by English or native script</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>Active:</span>
            <span className="font-bold text-indigo-600">
              {LOCALES[locale]?.name || "English"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

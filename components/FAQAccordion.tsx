"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQAccordion({
  faqs,
  title = "Frequently Asked Questions",
  subtitle = "Find quick answers to common questions about grading formulas, scale variations, and calculations.",
}: FAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // first open by default

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="my-12 pt-8 border-t border-slate-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndexes.includes(idx);
          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-indigo-600 transition-colors focus:outline-none focus:bg-slate-50"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                  <p className="whitespace-pre-line">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

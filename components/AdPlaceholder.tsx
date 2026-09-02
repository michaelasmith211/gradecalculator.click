import React from "react";

interface AdPlaceholderProps {
  slotId?: string;
  format?: "horizontal" | "rectangle" | "leaderboard";
  className?: string;
}

export default function AdPlaceholder({
  slotId = "default-ad-slot",
  format = "horizontal",
  className = "",
}: AdPlaceholderProps) {
  // Fixed heights prevent Cumulative Layout Shift (CLS)
  const heightClasses =
    format === "leaderboard"
      ? "h-[90px] max-w-[728px]"
      : format === "rectangle"
      ? "h-[250px] max-w-[300px]"
      : "h-[100px] max-w-4xl";

  return (
    <aside
      aria-label="Advertisement space"
      className={`my-6 mx-auto w-full flex flex-col items-center justify-center bg-slate-50/80 border border-dashed border-slate-200 rounded-xl ${heightClasses} ${className} overflow-hidden`}
    >
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
        Advertisement
      </span>
      <span className="text-xs text-slate-400">
        Ad Slot ({format})
      </span>
    </aside>
  );
}

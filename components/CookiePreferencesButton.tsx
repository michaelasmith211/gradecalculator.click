"use client";

import React from "react";
import { Sliders } from "lucide-react";

interface CookiePreferencesButtonProps {
  className?: string;
  label?: string;
}

export default function CookiePreferencesButton({
  className,
  label = "Manage Cookie Preferences",
}: CookiePreferencesButtonProps) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("gc_open_cookie_settings"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ||
        "inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all touch-manipulation whitespace-nowrap"
      }
    >
      <Sliders className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}

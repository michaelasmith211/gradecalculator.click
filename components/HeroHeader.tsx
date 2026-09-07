import React from "react";
import { Sparkles } from "lucide-react";

interface HeroHeaderProps {
  title: string;
  tagline: string;
  badgeText?: string;
}

export default function HeroHeader({ title, tagline, badgeText }: HeroHeaderProps) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-6">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{badgeText || `${title} • 100% Private`}</span>
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {title}
      </h1>
      <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
        {tagline}
      </p>
    </div>
  );
}

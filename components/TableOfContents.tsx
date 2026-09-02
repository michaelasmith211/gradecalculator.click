import React from "react";
import { ListTree, ChevronRight } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
}

export default function TableOfContents({
  items,
  title = "Table of Contents",
}: TableOfContentsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      className="my-6 p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl"
      aria-label="Table of Contents"
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
        <ListTree className="w-4 h-4 text-indigo-700" />
        <span>{title}</span>
      </div>
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-center gap-1.5 text-slate-800 hover:text-indigo-700 hover:underline transition-colors p-1.5 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
            >
              <span className="text-[11px] font-mono text-indigo-700 font-bold">
                {index + 1}.
              </span>
              <span className="truncate">{item.label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 ml-auto shrink-0" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

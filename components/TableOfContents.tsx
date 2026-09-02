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
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
        <ListTree className="w-4 h-4 text-indigo-600" />
        <span>{title}</span>
      </div>
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-center gap-1.5 text-slate-700 hover:text-indigo-600 hover:underline transition-colors p-1.5 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="text-[11px] font-mono text-indigo-500 font-bold">
                {index + 1}.
              </span>
              <span className="font-medium truncate">{item.label}</span>
              <ChevronRight className="w-3 h-3 text-slate-400 ml-auto shrink-0" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

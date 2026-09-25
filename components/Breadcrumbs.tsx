import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  const firstUrl = items[0]?.url || "/";
  const matchLocale = firstUrl.match(/^\/([a-z]{2})\//);
  const homeUrl = matchLocale ? `/${matchLocale[1]}/` : "/";

  // Helper to ensure all internal URLs end with a canonical trailing slash
  const normalizeUrl = (u: string) => {
    if (!u || u.startsWith("http") || u.startsWith("#")) return u;
    return u.endsWith("/") ? u : `${u}/`;
  };

  // Filter out redundant home item if already represented by Home icon
  const displayItems =
    items[0]?.url === homeUrl || items[0]?.url === "/" ? items.slice(1) : items;

  return (
    <nav aria-label="Breadcrumbs" className="py-2">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-600 font-medium">
        <li>
          <Link
            href={homeUrl}
            className="flex items-center gap-1 text-slate-600 hover:text-indigo-700 transition-colors"
            title="Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const targetUrl = normalizeUrl(item.url);
          return (
            <li key={targetUrl} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              {isLast ? (
                <span className="font-bold text-slate-900 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={targetUrl}
                  className="text-slate-600 hover:text-indigo-700 transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

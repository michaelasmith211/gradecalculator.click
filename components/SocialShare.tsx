"use client";

import React, { useState, useEffect } from "react";
import {
  Share2,
  Copy,
  Check,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  Mail,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface SocialShareProps {
  title?: string;
  description?: string;
  url?: string;
  className?: string;
  compact?: boolean;
}

export default function SocialShare({
  title = "Grade Calculator – Fast & Free Grade & GPA Calculations",
  description = "Calculate grades, percentages, final exam requirements, and 4.0 GPA instantly.",
  url,
  className = "",
  compact = false,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url || "https://gradecalculator.click");

  useEffect(() => {
    if (typeof window !== "undefined" && !url) {
      setCurrentUrl(window.location.href);
    }
  }, [url]);

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        trackEvent("social_share_copy", { url: currentUrl });
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: currentUrl,
        });
        trackEvent("social_share_native", { url: currentUrl });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-emerald-500 hover:text-white hover:border-emerald-500",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:bg-slate-900 hover:text-white hover:border-slate-900",
      textColor: "text-slate-800",
      bgColor: "bg-slate-100",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-blue-600 hover:text-white hover:border-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-sky-700 hover:text-white hover:border-sky-700",
      textColor: "text-sky-700",
      bgColor: "bg-sky-50",
    },
    {
      name: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`,
      color: "hover:bg-indigo-600 hover:text-white hover:border-indigo-600",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  if (compact) {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
            title="Share via device"
            aria-label="Share via device"
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          title="Copy page link"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied!" : "Copy Link"}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`p-5 bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 border border-slate-200 rounded-2xl ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 mb-0.5">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share This Tool</span>
          </span>
          <p className="text-sm font-bold text-slate-900">
            Help classmates and study groups calculate their grades easily!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Native Device Share on Mobile */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          {/* Social Icons */}
          {shareLinks.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("social_share_click", { platform: platform.name })}
                className={`p-2 rounded-xl border border-slate-200 bg-white ${platform.textColor} ${platform.color} transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                title={`Share on ${platform.name}`}
                aria-label={`Share on ${platform.name}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              copied
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

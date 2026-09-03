"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Download,
  Copy,
  Check,
  Share2,
  Sparkles,
  Twitter,
  MessageCircle,
  Eye,
  EyeOff,
  Palette,
  Layers,
  Award,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export interface GradeCardData {
  type: "grade" | "final" | "gpa" | "weighted" | "test";
  title?: string;
  scoreDisplay: string; // e.g. "92.5%" or "3.85" or "78%"
  scoreLabel?: string; // e.g. "Overall Grade", "Target Exam Score", "Term GPA"
  letterGrade?: string; // e.g. "A", "B+", "A-"
  gpaPoint?: number; // e.g. 4.0, 3.7
  additionalMetrics?: { label: string; value: string }[];
  statusText?: string;
}

interface InteractiveShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GradeCardData;
}

type CardTheme = "midnight" | "indigo" | "sunset" | "emerald" | "minimal";

interface ThemeConfig {
  id: CardTheme;
  name: string;
  bgGradient: string[];
  canvasBg: string[];
  accentColor: string;
  textColor: string;
  secondaryText: string;
  cardBg: string;
  border: string;
  badgeBg: string;
  badgeText: string;
}

const THEMES: Record<CardTheme, ThemeConfig> = {
  indigo: {
    id: "indigo",
    name: "Electric Indigo",
    bgGradient: ["from-slate-900", "via-indigo-950", "to-slate-900"],
    canvasBg: ["#0f172a", "#1e1b4b", "#0f172a"],
    accentColor: "#6366f1",
    textColor: "#ffffff",
    secondaryText: "#94a3b8",
    cardBg: "rgba(255, 255, 255, 0.08)",
    border: "rgba(99, 102, 241, 0.3)",
    badgeBg: "#4f46e5",
    badgeText: "#ffffff",
  },
  midnight: {
    id: "midnight",
    name: "Midnight Gold",
    bgGradient: ["from-slate-950", "via-zinc-900", "to-slate-950"],
    canvasBg: ["#09090b", "#18181b", "#09090b"],
    accentColor: "#f59e0b",
    textColor: "#ffffff",
    secondaryText: "#a1a1aa",
    cardBg: "rgba(255, 255, 255, 0.06)",
    border: "rgba(245, 158, 11, 0.3)",
    badgeBg: "#d97706",
    badgeText: "#ffffff",
  },
  emerald: {
    id: "emerald",
    name: "Emerald Honor",
    bgGradient: ["from-slate-950", "via-emerald-950", "to-slate-900"],
    canvasBg: ["#022c22", "#064e3b", "#022c22"],
    accentColor: "#10b981",
    textColor: "#ffffff",
    secondaryText: "#a7f3d0",
    cardBg: "rgba(255, 255, 255, 0.08)",
    border: "rgba(16, 185, 129, 0.3)",
    badgeBg: "#059669",
    badgeText: "#ffffff",
  },
  sunset: {
    id: "sunset",
    name: "Sunset Scholar",
    bgGradient: ["from-slate-950", "via-rose-950", "to-amber-950"],
    canvasBg: ["#4c0519", "#701a75", "#1c1917"],
    accentColor: "#f43f5e",
    textColor: "#ffffff",
    secondaryText: "#fecdd3",
    cardBg: "rgba(255, 255, 255, 0.08)",
    border: "rgba(244, 63, 94, 0.3)",
    badgeBg: "#e11d48",
    badgeText: "#ffffff",
  },
  minimal: {
    id: "minimal",
    name: "Clean Light",
    bgGradient: ["from-slate-50", "via-white", "to-indigo-50/40"],
    canvasBg: ["#f8fafc", "#ffffff", "#eef2ff"],
    accentColor: "#4f46e5",
    textColor: "#0f172a",
    secondaryText: "#475569",
    cardBg: "#ffffff",
    border: "#cbd5e1",
    badgeBg: "#4f46e5",
    badgeText: "#ffffff",
  },
};

export default function InteractiveShareCardModal({
  isOpen,
  onClose,
  data,
}: InteractiveShareCardModalProps) {
  const [selectedTheme, setSelectedTheme] = useState<CardTheme>("indigo");
  const [courseName, setCourseName] = useState<string>("My Semester Course");
  const [customNote, setCustomNote] = useState<string>("Calculated with GradeCalculator.dev 🎓");
  const [showPercentage, setShowPercentage] = useState<boolean>(true);
  const [showGPA, setShowGPA] = useState<boolean>(true);
  const [copiedStatus, setCopiedStatus] = useState<"none" | "image" | "link">("none");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize course name if provided
  useEffect(() => {
    if (data.title) {
      setCourseName(data.title);
    }
  }, [data.title]);

  const activeTheme = THEMES[selectedTheme];

  // Draw the high-resolution 1200x630 share card on HTML5 canvas
  const drawCardToCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;

    const isLight = selectedTheme === "minimal";

    // 1. Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, activeTheme.canvasBg[0]);
    gradient.addColorStop(0.5, activeTheme.canvasBg[1]);
    gradient.addColorStop(1, activeTheme.canvasBg[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle background mesh glow
    ctx.save();
    ctx.beginPath();
    ctx.arc(1050, 150, 320, 0, Math.PI * 2);
    ctx.fillStyle = isLight
      ? "rgba(79, 70, 229, 0.08)"
      : `${activeTheme.accentColor}18`;
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(150, 500, 280, 0, Math.PI * 2);
    ctx.fillStyle = isLight
      ? "rgba(147, 51, 234, 0.05)"
      : "rgba(99, 102, 241, 0.08)";
    ctx.fill();
    ctx.restore();

    // 2. Outer Border & Inner Card Container
    const cardMargin = 50;
    const cardWidth = width - cardMargin * 2;
    const cardHeight = height - cardMargin * 2;
    const cardRadius = 28;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(cardMargin, cardMargin, cardWidth, cardHeight, cardRadius);
    ctx.fillStyle = isLight ? "#ffffff" : "rgba(255, 255, 255, 0.05)";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = isLight ? "#e2e8f0" : "rgba(255, 255, 255, 0.12)";
    ctx.stroke();
    ctx.restore();

    // 3. Header: Brand Logo & Title
    ctx.save();
    // Brand icon box
    ctx.beginPath();
    ctx.roundRect(cardMargin + 40, cardMargin + 40, 48, 48, 12);
    ctx.fillStyle = "#4f46e5";
    ctx.fill();

    // White calculator glyph icon representation
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GC", cardMargin + 40 + 24, cardMargin + 40 + 24);

    // Brand Name Text
    ctx.textAlign = "left";
    ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
    ctx.fillText("GradeCalculator.dev", cardMargin + 105, cardMargin + 65);

    // Verified badge top right
    ctx.beginPath();
    ctx.roundRect(cardMargin + cardWidth - 210, cardMargin + 42, 170, 42, 21);
    ctx.fillStyle = isLight ? "#eef2ff" : "rgba(99, 102, 241, 0.2)";
    ctx.fill();
    ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#4f46e5" : "#a5b4fc";
    ctx.textAlign = "center";
    ctx.fillText("Verified Grade ✨", cardMargin + cardWidth - 125, cardMargin + 68);
    ctx.restore();

    // 4. Course Title & Note
    ctx.save();
    ctx.textAlign = "left";
    ctx.font = "bold 38px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#1e293b" : "#f8fafc";
    ctx.fillText(courseName || "Academic Course Grade", cardMargin + 40, cardMargin + 160);

    ctx.font = "500 22px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#64748b" : "#94a3b8";
    ctx.fillText(customNote, cardMargin + 40, cardMargin + 200);
    ctx.restore();

    // 5. Central Score Box / Big Grade
    const scoreBoxX = cardMargin + 40;
    const scoreBoxY = cardMargin + 240;
    const scoreBoxWidth = cardWidth - 80;
    const scoreBoxHeight = 190;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(scoreBoxX, scoreBoxY, scoreBoxWidth, scoreBoxHeight, 20);
    ctx.fillStyle = isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.04)";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = isLight ? "#cbd5e1" : "rgba(255, 255, 255, 0.08)";
    ctx.stroke();

    // Score label
    ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#64748b" : "#94a3b8";
    ctx.textAlign = "left";
    ctx.fillText(
      (data.scoreLabel || "OVERALL COURSE SCORE").toUpperCase(),
      scoreBoxX + 35,
      scoreBoxY + 45
    );

    // Big Score Number
    ctx.font = "900 78px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
    const displayedScore = showPercentage ? data.scoreDisplay : "--";
    ctx.fillText(displayedScore, scoreBoxX + 35, scoreBoxY + 130);

    // Letter Grade Badge next to score
    if (data.letterGrade) {
      const scoreWidth = ctx.measureText(displayedScore).width;
      const badgeX = scoreBoxX + 35 + scoreWidth + 30;
      const badgeY = scoreBoxY + 70;
      const badgeW = 160;
      const badgeH = 65;

      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 16);
      ctx.fillStyle = activeTheme.badgeBg;
      ctx.fill();

      ctx.font = "bold 28px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`Grade: ${data.letterGrade}`, badgeX + badgeW / 2, badgeY + badgeH / 2);
    }

    // GPA Point Badge if active
    if (showGPA && data.gpaPoint !== undefined) {
      const gpaBadgeX = scoreBoxX + scoreBoxWidth - 190;
      const gpaBadgeY = scoreBoxY + 70;

      ctx.beginPath();
      ctx.roundRect(gpaBadgeX, gpaBadgeY, 155, 65, 16);
      ctx.fillStyle = isLight ? "#f1f5f9" : "rgba(255, 255, 255, 0.1)";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = isLight ? "#cbd5e1" : "rgba(255, 255, 255, 0.15)";
      ctx.stroke();

      ctx.font = "bold 26px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${data.gpaPoint.toFixed(1)} GPA`, gpaBadgeX + 77, gpaBadgeY + 32);
    }
    ctx.restore();

    // 6. Footer: URL & Watermark
    ctx.save();
    ctx.textAlign = "left";
    ctx.font = "600 18px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#475569" : "#94a3b8";
    ctx.fillText("Calculate & verify your grades at https://gradecalculator.dev", cardMargin + 40, cardMargin + cardHeight - 30);

    ctx.textAlign = "right";
    ctx.font = "500 16px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#94a3b8" : "#64748b";
    ctx.fillText("100% Free & Private • Zero Lag", cardMargin + cardWidth - 40, cardMargin + cardHeight - 30);
    ctx.restore();
  }, [selectedTheme, courseName, customNote, showPercentage, showGPA, data, activeTheme]);

  // Re-render canvas whenever customization changes or modal opens
  useEffect(() => {
    if (isOpen) {
      // Small timeout to ensure canvas ref is mounted in DOM
      const timer = setTimeout(() => {
        drawCardToCanvas();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, drawCardToCanvas]);

  // Download image as PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageUri = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `grade-card-${courseName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "gradecalculator"}.png`;
    link.href = imageUri;
    link.click();
    trackEvent("social_card_downloaded");
  };

  // Copy PNG image to clipboard
  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        // @ts-ignore
        const item = new ClipboardItem({ "image/png": blob });
        // @ts-ignore
        await navigator.clipboard.write([item]);
        setCopiedStatus("image");
        setTimeout(() => setCopiedStatus("none"), 3000);
        trackEvent("social_card_image_copied");
      });
    } catch (err) {
      // Fallback: copy shareable text link
      handleCopyLink();
    }
  };

  // Copy shareable text link
  const handleCopyLink = async () => {
    const text = `I just calculated my grade on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade: ${data.letterGrade || "A"}). Calculate yours free: https://gradecalculator.dev`;
    await navigator.clipboard.writeText(text);
    setCopiedStatus("link");
    setTimeout(() => setCopiedStatus("none"), 3000);
    trackEvent("social_card_link_copied");
  };

  // Web Share API on mobile
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.toBlob(async (blob) => {
            if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], "grade-card.png", { type: "image/png" })] })) {
              const file = new File([blob], "grade-card.png", { type: "image/png" });
              await navigator.share({
                title: "My Grade Calculation",
                text: `I just calculated my grade on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay}`,
                url: "https://gradecalculator.dev",
                files: [file],
              });
              return;
            }
            await navigator.share({
              title: "My Grade Calculation",
              text: `I just calculated my grade on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay}`,
              url: "https://gradecalculator.dev",
            });
          });
        }
      } catch (e) {
        // Ignored if user cancels share dialog
      }
    } else {
      handleCopyLink();
    }
  };

  // Twitter / X Intent
  const handleTwitterShare = () => {
    const text = encodeURIComponent(
      `I just calculated my grade on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade ${data.letterGrade || "A"}). Calculate yours free:`
    );
    const url = encodeURIComponent("https://gradecalculator.dev");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer");
    trackEvent("social_card_twitter_shared");
  };

  // WhatsApp Intent
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `I just calculated my grade on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade: ${data.letterGrade || "A"}). Check your grade: https://gradecalculator.dev`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank", "noopener,noreferrer");
    trackEvent("social_card_whatsapp_shared");
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 id="share-modal-title" className="text-base sm:text-lg font-bold">
                Shareable Grade Achievement Card
              </h2>
              <p className="text-xs text-slate-300">
                Customize your aesthetic card, export as high-res PNG, or share to social media.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Live Preview Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Card Live Preview</span>
              <span className="text-indigo-600 font-semibold">1200 &times; 630 HD PNG</span>
            </div>

            <div className="w-full overflow-hidden rounded-2xl border border-slate-300 shadow-lg bg-slate-950 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-auto object-contain max-h-[280px] sm:max-h-[340px]"
              />
            </div>
          </div>

          {/* Interactive Customization Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
            {/* Left: Theme & Privacy */}
            <div className="space-y-4">
              {/* Theme Picker */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  <Palette className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Choose Theme</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.values(THEMES).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTheme(t.id)}
                      className={`p-2.5 rounded-xl text-xs font-bold text-left border flex items-center gap-2 transition-all ${
                        selectedTheme === t.id
                          ? "border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm ring-2 ring-indigo-500/20"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ backgroundColor: t.accentColor }}
                      />
                      <span className="truncate">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Privacy Toggles */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Privacy & Visibility</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPercentage(!showPercentage)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                      showPercentage
                        ? "bg-indigo-50 border-indigo-200 text-indigo-800"
                        : "bg-slate-100 border-slate-200 text-slate-600 line-through"
                    }`}
                  >
                    {showPercentage ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>Percentage Score</span>
                  </button>

                  {data.gpaPoint !== undefined && (
                    <button
                      type="button"
                      onClick={() => setShowGPA(!showGPA)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                        showGPA
                          ? "bg-indigo-50 border-indigo-200 text-indigo-800"
                          : "bg-slate-100 border-slate-200 text-slate-600 line-through"
                      }`}
                    >
                      {showGPA ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>GPA Point</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Text Customization */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Course or Subject Title
                </label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g. Calculus II or Fall 2026 Semester"
                  maxLength={40}
                  className="w-full px-3 py-2 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Custom Caption / Note
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Locked in 🔒 or Finals Season Ready 📚"
                  maxLength={50}
                  className="w-full px-3 py-2 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer: Action Buttons */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Quick Social Intent Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleTwitterShare}
              className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-all flex items-center justify-center shadow-xs"
              title="Share on X (Twitter)"
            >
              <Twitter className="w-4 h-4 text-sky-500" />
            </button>
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-all flex items-center justify-center shadow-xs"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
            </button>
            <button
              type="button"
              onClick={handleNativeShare}
              className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-all flex items-center justify-center shadow-xs sm:hidden"
              title="Share on Mobile"
            >
              <Share2 className="w-4 h-4 text-indigo-600" />
            </button>
          </div>

          {/* Right: Export & Copy Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleCopyImage}
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 flex items-center gap-1.5 transition-all shadow-xs"
            >
              {copiedStatus === "image" ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Image Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600" />
                  <span>Copy Image</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-md shadow-indigo-200"
            >
              <Download className="w-4 h-4" />
              <span>Download Card (PNG)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

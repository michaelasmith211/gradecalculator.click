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
  Smartphone,
  Square,
  RectangleHorizontal,
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

export type CardFormat = "wide" | "square" | "story";
export type CardTheme = "midnight" | "indigo" | "sunset" | "emerald" | "minimal";

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

const FORMATS: { id: CardFormat; name: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "wide", name: "Wide (16:9)", desc: "X/Twitter & Discord", icon: RectangleHorizontal },
  { id: "square", name: "Square (1:1)", desc: "Instagram & Feeds", icon: Square },
  { id: "story", name: "Story (9:16)", desc: "Insta Stories & TikTok", icon: Smartphone },
];

export default function InteractiveShareCardModal({
  isOpen,
  onClose,
  data,
}: InteractiveShareCardModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<CardFormat>("wide");
  const [selectedTheme, setSelectedTheme] = useState<CardTheme>("indigo");
  const [courseName, setCourseName] = useState<string>("My Semester Course");
  const [customNote, setCustomNote] = useState<string>("Calculated with GradeCalculator.dev 🎓");
  const [showPercentage, setShowPercentage] = useState<boolean>(true);
  const [showGPA, setShowGPA] = useState<boolean>(true);
  const [copiedStatus, setCopiedStatus] = useState<"none" | "image" | "link">("none");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (data.title) {
      setCourseName(data.title);
    }
  }, [data.title]);

  const activeTheme = THEMES[selectedTheme];

  // Draw 16:9 Wide Format (1200 x 630)
  const drawWideFormat = (ctx: CanvasRenderingContext2D, width: number, height: number, isLight: boolean) => {
    const cardMargin = 45;
    const cardWidth = width - cardMargin * 2;
    const cardHeight = height - cardMargin * 2;
    const cardRadius = 26;

    // Outer Container
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(cardMargin, cardMargin, cardWidth, cardHeight, cardRadius);
    ctx.fillStyle = isLight ? "#ffffff" : "rgba(255, 255, 255, 0.05)";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = isLight ? "#e2e8f0" : "rgba(255, 255, 255, 0.12)";
    ctx.stroke();
    ctx.restore();

    // Top Header: Logo + Verified
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(cardMargin + 35, cardMargin + 35, 46, 46, 12);
    ctx.fillStyle = "#4f46e5";
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GC", cardMargin + 35 + 23, cardMargin + 35 + 23);

    ctx.textAlign = "left";
    ctx.font = "bold 30px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
    ctx.fillText("GradeCalculator.dev", cardMargin + 95, cardMargin + 58);

    // Verified Pill
    ctx.beginPath();
    ctx.roundRect(cardMargin + cardWidth - 200, cardMargin + 38, 165, 40, 20);
    ctx.fillStyle = isLight ? "#eef2ff" : "rgba(99, 102, 241, 0.2)";
    ctx.fill();
    ctx.font = "bold 15px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#4f46e5" : "#a5b4fc";
    ctx.textAlign = "center";
    ctx.fillText("Verified Grade ✨", cardMargin + cardWidth - 117, cardMargin + 63);
    ctx.restore();

    // Course Title & Subtitle
    ctx.save();
    ctx.textAlign = "left";
    ctx.font = "bold 36px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#1e293b" : "#f8fafc";
    ctx.fillText(courseName || "Academic Course Grade", cardMargin + 35, cardMargin + 145);

    ctx.font = "500 20px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#64748b" : "#94a3b8";
    ctx.fillText(customNote, cardMargin + 35, cardMargin + 185);
    ctx.restore();

    // Central Score Box
    const scoreBoxX = cardMargin + 35;
    const scoreBoxY = cardMargin + 225;
    const scoreBoxWidth = cardWidth - 70;
    const scoreBoxHeight = 195;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(scoreBoxX, scoreBoxY, scoreBoxWidth, scoreBoxHeight, 20);
    ctx.fillStyle = isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.04)";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = isLight ? "#cbd5e1" : "rgba(255, 255, 255, 0.08)";
    ctx.stroke();

    ctx.font = "bold 15px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#64748b" : "#94a3b8";
    ctx.textAlign = "left";
    ctx.fillText(
      (data.scoreLabel || "OVERALL COURSE SCORE").toUpperCase(),
      scoreBoxX + 35,
      scoreBoxY + 45
    );

    ctx.font = "900 80px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
    const displayedScore = showPercentage ? data.scoreDisplay : "--";
    ctx.fillText(displayedScore, scoreBoxX + 35, scoreBoxY + 135);

    // Letter Grade Badge
    if (data.letterGrade) {
      const scoreWidth = ctx.measureText(displayedScore).width;
      const badgeX = scoreBoxX + 35 + scoreWidth + 30;
      const badgeY = scoreBoxY + 72;
      const badgeW = 160;
      const badgeH = 65;

      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 16);
      ctx.fillStyle = activeTheme.badgeBg;
      ctx.fill();

      ctx.font = "bold 26px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`Grade: ${data.letterGrade}`, badgeX + badgeW / 2, badgeY + badgeH / 2);
    }

    // GPA Point Badge
    if (showGPA && data.gpaPoint !== undefined) {
      const gpaBadgeX = scoreBoxX + scoreBoxWidth - 190;
      const gpaBadgeY = scoreBoxY + 72;

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

    // Footer Watermark
    ctx.save();
    ctx.textAlign = "left";
    ctx.font = "600 17px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#475569" : "#94a3b8";
    ctx.fillText("Calculate & verify your grades at https://gradecalculator.dev", cardMargin + 35, cardMargin + cardHeight - 25);

    ctx.textAlign = "right";
    ctx.font = "500 15px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#94a3b8" : "#64748b";
    ctx.fillText("100% Free & Private • Instant Results", cardMargin + cardWidth - 35, cardMargin + cardHeight - 25);
    ctx.restore();
  };

  // Draw 1:1 Square Format (1080 x 1080)
  const drawSquareFormat = (ctx: CanvasRenderingContext2D, width: number, height: number, isLight: boolean) => {
    const cardMargin = 55;
    const cardWidth = width - cardMargin * 2;
    const cardHeight = height - cardMargin * 2;
    const cardRadius = 32;

    // Outer Container
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(cardMargin, cardMargin, cardWidth, cardHeight, cardRadius);
    ctx.fillStyle = isLight ? "#ffffff" : "rgba(255, 255, 255, 0.05)";
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = isLight ? "#e2e8f0" : "rgba(255, 255, 255, 0.12)";
    ctx.stroke();
    ctx.restore();

    // Header: Centered Brand & Pill
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(width / 2 - 190, cardMargin + 45, 380, 52, 26);
    ctx.fillStyle = isLight ? "#f1f5f9" : "rgba(255, 255, 255, 0.08)";
    ctx.fill();

    ctx.font = "bold 22px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("GradeCalculator.dev ✨", width / 2, cardMargin + 78);

    // Course Title & Note
    ctx.font = "bold 44px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#1e293b" : "#f8fafc";
    ctx.fillText(courseName || "Course Grade Summary", width / 2, cardMargin + 160);

    ctx.font = "500 24px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#64748b" : "#94a3b8";
    ctx.fillText(customNote, width / 2, cardMargin + 205);
    ctx.restore();

    // Central Medallion Circle for Score
    const centerX = width / 2;
    const centerY = cardMargin + 430;
    const radius = 175;

    ctx.save();
    // Glowing ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2);
    ctx.fillStyle = isLight ? "rgba(79, 70, 229, 0.06)" : `${activeTheme.accentColor}22`;
    ctx.fill();

    // Medallion base
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.07)";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = activeTheme.accentColor;
    ctx.stroke();

    // Label
    ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#64748b" : "#94a3b8";
    ctx.textAlign = "center";
    ctx.fillText((data.scoreLabel || "ACADEMIC SCORE").toUpperCase(), centerX, centerY - 80);

    // Big Score
    ctx.font = "900 96px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
    const displayedScore = showPercentage ? data.scoreDisplay : "--";
    ctx.fillText(displayedScore, centerX, centerY + 20);

    // Badges inside medallion or below
    if (data.letterGrade) {
      ctx.beginPath();
      ctx.roundRect(centerX - 95, centerY + 70, 190, 48, 14);
      ctx.fillStyle = activeTheme.badgeBg;
      ctx.fill();

      ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`Grade: ${data.letterGrade}`, centerX, centerY + 102);
    }
    ctx.restore();

    // Stats Grid Box (2 columns)
    const statsBoxY = cardMargin + 655;
    const statsBoxW = cardWidth - 80;
    const statsBoxH = 180;
    const statsBoxX = cardMargin + 40;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(statsBoxX, statsBoxY, statsBoxW, statsBoxH, 20);
    ctx.fillStyle = isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.04)";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = isLight ? "#e2e8f0" : "rgba(255, 255, 255, 0.08)";
    ctx.stroke();

    // Left Metric
    const col1X = statsBoxX + statsBoxW * 0.25;
    ctx.textAlign = "center";
    ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#64748b" : "#94a3b8";
    ctx.fillText("ACADEMIC STATUS", col1X, statsBoxY + 50);

    ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
    ctx.fillText(
      data.statusText || (data.gpaPoint && data.gpaPoint >= 3.5 ? "Dean's List" : "Honor Standing"),
      col1X,
      statsBoxY + 105
    );

    // Vertical Divider
    ctx.beginPath();
    ctx.moveTo(statsBoxX + statsBoxW * 0.5, statsBoxY + 30);
    ctx.lineTo(statsBoxX + statsBoxW * 0.5, statsBoxY + statsBoxH - 30);
    ctx.strokeStyle = isLight ? "#cbd5e1" : "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Right Metric
    const col2X = statsBoxX + statsBoxW * 0.75;
    ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#64748b" : "#94a3b8";
    ctx.fillText("4.0 SCALE EQUIVALENT", col2X, statsBoxY + 50);

    ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
    ctx.fillText(
      showGPA && data.gpaPoint !== undefined ? `${data.gpaPoint.toFixed(2)} GPA` : "Standard Scale",
      col2X,
      statsBoxY + 105
    );
    ctx.restore();

    // Footer URL
    ctx.save();
    ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#4f46e5" : "#a5b4fc";
    ctx.textAlign = "center";
    ctx.fillText("https://gradecalculator.dev", width / 2, cardMargin + cardHeight - 35);
    ctx.restore();
  };

  // Draw 9:16 Story Format (1080 x 1920)
  const drawStoryFormat = (ctx: CanvasRenderingContext2D, width: number, height: number, isLight: boolean) => {
    const cardMargin = 60;
    const cardWidth = width - cardMargin * 2;
    const cardHeight = height - cardMargin * 2;
    const cardRadius = 36;

    // Outer Container
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(cardMargin, cardMargin, cardWidth, cardHeight, cardRadius);
    ctx.fillStyle = isLight ? "#ffffff" : "rgba(255, 255, 255, 0.05)";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = isLight ? "#e2e8f0" : "rgba(255, 255, 255, 0.12)";
    ctx.stroke();
    ctx.restore();

    // Top Story Header: Badge & Brand
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(width / 2 - 200, cardMargin + 70, 400, 60, 30);
    ctx.fillStyle = isLight ? "#eef2ff" : "rgba(99, 102, 241, 0.2)";
    ctx.fill();

    ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#4f46e5" : "#a5b4fc";
    ctx.textAlign = "center";
    ctx.fillText("GradeCalculator.dev • Report ✨", width / 2, cardMargin + 108);

    // Course Title & Academic Milestone Heading
    ctx.font = "bold 56px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#1e293b" : "#ffffff";
    ctx.fillText(courseName || "Academic Report", width / 2, cardMargin + 230);

    ctx.font = "500 28px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#64748b" : "#94a3b8";
    ctx.fillText(customNote, width / 2, cardMargin + 290);
    ctx.restore();

    // Huge Central Glowing Score Card
    const centerX = width / 2;
    const centerY = cardMargin + 650;
    const scoreRadius = 240;

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, scoreRadius + 20, 0, Math.PI * 2);
    ctx.fillStyle = isLight ? "rgba(79, 70, 229, 0.08)" : `${activeTheme.accentColor}25`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, scoreRadius, 0, Math.PI * 2);
    ctx.fillStyle = isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.08)";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = activeTheme.accentColor;
    ctx.stroke();

    ctx.font = "bold 22px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#64748b" : "#94a3b8";
    ctx.textAlign = "center";
    ctx.fillText((data.scoreLabel || "OVERALL GRADE").toUpperCase(), centerX, centerY - 100);

    ctx.font = "900 130px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
    const displayedScore = showPercentage ? data.scoreDisplay : "--";
    ctx.fillText(displayedScore, centerX, centerY + 30);

    // Badges inside / under score
    if (data.letterGrade) {
      ctx.beginPath();
      ctx.roundRect(centerX - 130, centerY + 90, 260, 64, 20);
      ctx.fillStyle = activeTheme.badgeBg;
      ctx.fill();

      ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`Grade: ${data.letterGrade}`, centerX, centerY + 133);
    }
    ctx.restore();

    // Breakdown Stat Cards (Vertical Stack)
    const startY = cardMargin + 980;
    const cardW = cardWidth - 80;
    const cardH = 130;
    const cardX = cardMargin + 40;

    const metrics = [
      {
        title: "ACADEMIC STANDING",
        val: data.statusText || (data.gpaPoint && data.gpaPoint >= 3.5 ? "Dean's List / Top Tier" : "Passing with Distinction"),
      },
      {
        title: "4.0 GPA CONVERSION",
        val: showGPA && data.gpaPoint !== undefined ? `${data.gpaPoint.toFixed(2)} Quality Points` : "Verified Scale",
      },
      {
        title: "CALCULATION ENGINE",
        val: "100% Client-Side Verified",
      },
    ];

    metrics.forEach((m, idx) => {
      const cy = startY + idx * (cardH + 20);
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(cardX, cy, cardW, cardH, 20);
      ctx.fillStyle = isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.04)";
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = isLight ? "#e2e8f0" : "rgba(255, 255, 255, 0.08)";
      ctx.stroke();

      ctx.textAlign = "left";
      ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = isLight ? "#64748b" : "#94a3b8";
      ctx.fillText(m.title, cardX + 35, cy + 45);

      ctx.font = "bold 34px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
      ctx.fillText(m.val, cardX + 35, cy + 95);
      ctx.restore();
    });

    // Story Bottom Call-to-Action Banner
    const footerY = cardMargin + cardHeight - 180;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(cardX, footerY, cardW, 120, 24);
    ctx.fillStyle = isLight ? "#eef2ff" : "rgba(99, 102, 241, 0.15)";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = isLight ? "#c7d2fe" : "rgba(99, 102, 241, 0.4)";
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.font = "bold 28px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#4f46e5" : "#a5b4fc";
    ctx.fillText("Calculate yours at GradeCalculator.dev 🚀", width / 2, footerY + 52);

    ctx.font = "500 20px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = isLight ? "#64748b" : "#94a3b8";
    ctx.fillText("Free • Fast • 100% Private Student Tool", width / 2, footerY + 90);
    ctx.restore();
  };

  // Main canvas render callback
  const drawCardToCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 1200;
    let height = 630;

    if (selectedFormat === "square") {
      width = 1080;
      height = 1080;
    } else if (selectedFormat === "story") {
      width = 1080;
      height = 1920;
    }

    canvas.width = width;
    canvas.height = height;

    const isLight = selectedTheme === "minimal";

    // Draw Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, activeTheme.canvasBg[0]);
    gradient.addColorStop(0.5, activeTheme.canvasBg[1]);
    gradient.addColorStop(1, activeTheme.canvasBg[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle background mesh glow
    ctx.save();
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.15, Math.min(width, height) * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = isLight
      ? "rgba(79, 70, 229, 0.08)"
      : `${activeTheme.accentColor}18`;
    ctx.fill();
    ctx.restore();

    // Render respective format layout
    if (selectedFormat === "wide") {
      drawWideFormat(ctx, width, height, isLight);
    } else if (selectedFormat === "square") {
      drawSquareFormat(ctx, width, height, isLight);
    } else {
      drawStoryFormat(ctx, width, height, isLight);
    }
  }, [selectedFormat, selectedTheme, courseName, customNote, showPercentage, showGPA, data, activeTheme]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        drawCardToCanvas();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, drawCardToCanvas]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageUri = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    const sanitizedTitle = courseName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "grade";
    link.download = `grade-card-${selectedFormat}-${sanitizedTitle}-gradecalculator.png`;
    link.href = imageUri;
    link.click();
    trackEvent("social_card_downloaded", { format: selectedFormat, theme: selectedTheme });
  };

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
        trackEvent("social_card_image_copied", { format: selectedFormat });
      });
    } catch (err) {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    const text = `I just calculated my grade on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade: ${data.letterGrade || "A"}). Calculate yours free: https://gradecalculator.dev`;
    await navigator.clipboard.writeText(text);
    setCopiedStatus("link");
    setTimeout(() => setCopiedStatus("none"), 3000);
    trackEvent("social_card_link_copied");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.toBlob(async (blob) => {
            if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], `grade-card-${selectedFormat}.png`, { type: "image/png" })] })) {
              const file = new File([blob], `grade-card-${selectedFormat}.png`, { type: "image/png" });
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
        // Cancelled by user
      }
    } else {
      handleCopyLink();
    }
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(
      `I just calculated my grade on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade ${data.letterGrade || "A"}). Calculate yours free:`
    );
    const url = encodeURIComponent("https://gradecalculator.dev");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer");
    trackEvent("social_card_twitter_shared");
  };

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
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Header */}
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
                Choose wide, square, or vertical story formats, pick a theme, and export.
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

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Format Picker Pills (Wide / Square / Story) */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Card Format & Dimensions</span>
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {FORMATS.map((fmt) => {
                const IconComponent = fmt.icon;
                const isSelected = selectedFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`p-3 rounded-2xl text-left border flex flex-col sm:flex-row items-start sm:items-center gap-2.5 transition-all ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/80 text-indigo-900 shadow-sm ring-2 ring-indigo-500/20"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-xs sm:text-sm truncate">{fmt.name}</div>
                      <div className="text-[10px] sm:text-xs text-slate-500 truncate">{fmt.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Preview Canvas Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Live Card Preview</span>
              <span className="text-indigo-600 font-semibold">
                {selectedFormat === "wide"
                  ? "1200 × 630 HD PNG"
                  : selectedFormat === "square"
                  ? "1080 × 1080 Square HD"
                  : "1080 × 1920 Story HD"}
              </span>
            </div>

            <div className="w-full overflow-hidden rounded-2xl border border-slate-300 shadow-lg bg-slate-950 flex items-center justify-center p-2 sm:p-4 min-h-[240px]">
              <canvas
                ref={canvasRef}
                className={`w-auto object-contain transition-all duration-300 ${
                  selectedFormat === "story"
                    ? "max-h-[380px] sm:max-h-[460px] aspect-[9/16]"
                    : selectedFormat === "square"
                    ? "max-h-[320px] sm:max-h-[360px] aspect-square"
                    : "max-h-[260px] sm:max-h-[300px] aspect-[1200/630]"
                }`}
              />
            </div>
          </div>

          {/* Customization Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-1">
            {/* Theme & Privacy */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  <Palette className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Color Theme</span>
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

            {/* Text Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Course / Subject Name
                </label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g. Calculus II or Fall Semester"
                  maxLength={40}
                  className="w-full px-3 py-2 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Custom Caption / Student Note
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

        {/* Modal Action Bar */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Social Quick Share */}
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

          {/* Export & Copy Actions */}
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
              <span>Download {selectedFormat.toUpperCase()} (PNG)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

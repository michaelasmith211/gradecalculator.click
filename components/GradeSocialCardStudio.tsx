"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
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
  Type,
  Zap,
  TrendingUp,
  Bookmark,
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

interface GradeSocialCardStudioProps {
  data: GradeCardData;
}

export type CardFormat = "story" | "square" | "wide";
export type CardTheme = "aurora" | "hyperpop" | "sunset" | "alpine" | "cosmic" | "minimal";

interface ThemeConfig {
  id: CardTheme;
  name: string;
  canvasBg: string[];
  glowColor: string;
  accentColor: string;
  textColor: string;
  secondaryText: string;
  badgeBg: string;
  badgeText: string;
  cardBg: string;
  borderColor: string;
  isLight: boolean;
}

const THEMES: Record<CardTheme, ThemeConfig> = {
  aurora: {
    id: "aurora",
    name: "Midnight Aurora",
    canvasBg: ["#090d16", "#111827", "#090d16"],
    glowColor: "rgba(99, 102, 241, 0.28)",
    accentColor: "#818cf8",
    textColor: "#ffffff",
    secondaryText: "#94a3b8",
    badgeBg: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    badgeText: "#ffffff",
    cardBg: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.12)",
    isLight: false,
  },
  hyperpop: {
    id: "hyperpop",
    name: "Cyber Neon",
    canvasBg: ["#020617", "#0f172a", "#020617"],
    glowColor: "rgba(34, 211, 238, 0.25)",
    accentColor: "#22d3ee",
    textColor: "#ffffff",
    secondaryText: "#cbd5e1",
    badgeBg: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    badgeText: "#ffffff",
    cardBg: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(34, 211, 238, 0.25)",
    isLight: false,
  },
  sunset: {
    id: "sunset",
    name: "Sunset Velvet",
    canvasBg: ["#2a081a", "#4a044e", "#18020c"],
    glowColor: "rgba(244, 63, 94, 0.28)",
    accentColor: "#fb7185",
    textColor: "#ffffff",
    secondaryText: "#fecdd3",
    badgeBg: "linear-gradient(135deg, #f43f5e, #fb923c)",
    badgeText: "#ffffff",
    cardBg: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(251, 113, 133, 0.25)",
    isLight: false,
  },
  alpine: {
    id: "alpine",
    name: "Alpine Emerald",
    canvasBg: ["#022c22", "#064e3b", "#022c22"],
    glowColor: "rgba(52, 211, 153, 0.25)",
    accentColor: "#34d399",
    textColor: "#ffffff",
    secondaryText: "#a7f3d0",
    badgeBg: "linear-gradient(135deg, #059669, #10b981)",
    badgeText: "#ffffff",
    cardBg: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(52, 211, 153, 0.22)",
    isLight: false,
  },
  cosmic: {
    id: "cosmic",
    name: "Cosmic Blue",
    canvasBg: ["#030712", "#1e1b4b", "#030712"],
    glowColor: "rgba(129, 140, 248, 0.28)",
    accentColor: "#a5b4fc",
    textColor: "#ffffff",
    secondaryText: "#cbd5e1",
    badgeBg: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    badgeText: "#ffffff",
    cardBg: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(165, 180, 252, 0.2)",
    isLight: false,
  },
  minimal: {
    id: "minimal",
    name: "Studio Minimal Light",
    canvasBg: ["#ffffff", "#f8fafc", "#f1f5f9"],
    glowColor: "rgba(99, 102, 241, 0.08)",
    accentColor: "#4f46e5",
    textColor: "#0f172a",
    secondaryText: "#64748b",
    badgeBg: "#4f46e5",
    badgeText: "#ffffff",
    cardBg: "#ffffff",
    borderColor: "#e2e8f0",
    isLight: true,
  },
};

const MOTTO_PRESETS = [
  "Locked in for finals 🔒",
  "Dean's List Goal Met 🌟",
  "Academic Weapon ⚡",
  "Solid Term Progress 📚",
  "Goal Target Achieved 🎯",
  "Consistent Hard Work Pays Off 🏆",
];

const FORMATS: { id: CardFormat; name: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "story", name: "Story Card (9:16)", desc: "Instagram & Snapchat Story", icon: Smartphone },
  { id: "square", name: "Square Post (1:1)", desc: "Feeds, Discord & Notes", icon: Square },
  { id: "wide", name: "Wide Banner (16:9)", desc: "Notion & Dashboard Banner", icon: RectangleHorizontal },
];

/**
 * Dynamically scales canvas font size to strictly fit within maxWidth constraints
 */
function setFittedFont(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxSize: number,
  minSize: number,
  maxWidth: number,
  weight = "bold",
  fontStack = "system-ui, -apple-system, sans-serif"
): number {
  let size = maxSize;
  ctx.font = `${weight} ${size}px ${fontStack}`;
  while (ctx.measureText(text).width > maxWidth && size > minSize) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${fontStack}`;
  }
  return size;
}

export default function GradeSocialCardStudio({ data }: GradeSocialCardStudioProps) {
  // Default to story format first as requested by user
  const [selectedFormat, setSelectedFormat] = useState<CardFormat>("story");
  const [selectedTheme, setSelectedTheme] = useState<CardTheme>("aurora");
  const [courseName, setCourseName] = useState<string>("My Course Milestone");
  const [customNote, setCustomNote] = useState<string>("Locked in for finals 🔒");
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

  // Draw 9:16 Vertical Story Format (1080 x 1920)
  const drawStoryFormat = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const margin = 48;
    const cardWidth = width - margin * 2;
    const cardHeight = height - margin * 2;

    // Main Outer Glass Container
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(margin, margin, cardWidth, cardHeight, 36);
    ctx.fillStyle = activeTheme.cardBg;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = activeTheme.borderColor;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    // 1. Top Brand & Category Pill
    const pillW = 340;
    const pillH = 54;
    const pillX = width / 2 - pillW / 2;
    const pillY = margin + 65;

    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 27);
    ctx.fillStyle = activeTheme.isLight ? "#eef2ff" : "rgba(255, 255, 255, 0.08)";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = activeTheme.borderColor;
    ctx.stroke();

    ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.accentColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GradeCalculator.dev • Milestone", width / 2, pillY + pillH / 2);

    // 2. Course Title & Student Goal Memo
    const titleY = pillY + 110;
    setFittedFont(ctx, courseName || "Academic Milestone", 56, 32, cardWidth - 80, "800");
    ctx.fillStyle = activeTheme.isLight ? "#0f172a" : "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(courseName || "Academic Milestone", width / 2, titleY);

    setFittedFont(ctx, `“ ${customNote} ”`, 26, 18, cardWidth - 100, "500");
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText(`“ ${customNote} ”`, width / 2, titleY + 55);

    // 3. Central Hero Score Medallion Box (Modern Glass Hero)
    const heroY = titleY + 120;
    const heroW = cardWidth - 60;
    const heroH = 460;
    const heroX = margin + 30;

    // Glowing Backplate for Hero
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(heroX, heroY, heroW, heroH, 32);
    ctx.fillStyle = activeTheme.isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.04)";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = activeTheme.borderColor;
    ctx.stroke();

    // Soft Inner Circle Glow Ring
    const circleCenterX = heroX + heroW / 2;
    const circleCenterY = heroY + heroH / 2 - 25;
    const ringRadius = 155;

    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, ringRadius + 15, 0, Math.PI * 2);
    ctx.fillStyle = activeTheme.glowColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, ringRadius, 0, Math.PI * 2);
    ctx.fillStyle = activeTheme.isLight ? "#ffffff" : "rgba(15, 23, 42, 0.6)";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = activeTheme.accentColor;
    ctx.stroke();

    // Upper Label inside Medallion
    ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.textAlign = "center";
    ctx.fillText((data.scoreLabel || "OVERALL SCORE").toUpperCase(), circleCenterX, circleCenterY - 70);

    // Dynamic Fitted Score Number
    const displayedScore = showPercentage ? data.scoreDisplay : "--";
    const maxScoreTextWidth = ringRadius * 1.5; // ~232px
    setFittedFont(ctx, displayedScore, 84, 40, maxScoreTextWidth, "900");
    ctx.fillStyle = activeTheme.isLight ? "#0f172a" : "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(displayedScore, circleCenterX, circleCenterY);
    ctx.textBaseline = "alphabetic";

    // Letter Grade Pill underneath score
    if (data.letterGrade) {
      const badgeW = 200;
      const badgeH = 50;
      const badgeX = circleCenterX - badgeW / 2;
      const badgeY = circleCenterY + 50;

      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 16);
      ctx.fillStyle = activeTheme.accentColor;
      ctx.fill();

      setFittedFont(ctx, `GRADE: ${data.letterGrade}`, 22, 16, badgeW - 20, "bold");
      ctx.fillStyle = activeTheme.isLight ? "#ffffff" : "#000000";
      ctx.textAlign = "center";
      ctx.fillText(`GRADE: ${data.letterGrade}`, circleCenterX, badgeY + 33);
    }
    ctx.restore();

    // 4. Bento Grid Information Widgets (3 Cards)
    const bentoStartY = heroY + heroH + 28;
    const bentoH = 120;
    const bentoW = cardWidth - 60;
    const bentoX = margin + 30;

    const bentoItems = [
      {
        tag: "ACADEMIC STANDING",
        value: data.statusText || (data.gpaPoint && data.gpaPoint >= 3.5 ? "Dean's List / Honors Standing" : "Solid Above-Average Progress"),
        sub: "Calculated based on institutional benchmark standards",
      },
      {
        tag: "4.0 GPA SCALE EQUIVALENT",
        value: showGPA && data.gpaPoint !== undefined ? `${data.gpaPoint.toFixed(2)} Quality Points` : "Standard Scale",
        sub: "Weighted Grade Point Average equivalent",
      },
      {
        tag: "CALCULATION ENGINE",
        value: "100% Client-Side Verified Math",
        sub: "Zero data stored • Private mathematical computation",
      },
    ];

    bentoItems.forEach((item, idx) => {
      const bY = bentoStartY + idx * (bentoH + 16);
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(bentoX, bY, bentoW, bentoH, 20);
      ctx.fillStyle = activeTheme.isLight ? "#ffffff" : "rgba(255, 255, 255, 0.035)";
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = activeTheme.borderColor;
      ctx.stroke();

      ctx.textAlign = "left";
      ctx.font = "bold 15px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = activeTheme.accentColor;
      ctx.fillText(item.tag, bentoX + 28, bY + 36);

      setFittedFont(ctx, item.value, 26, 18, bentoW - 60, "bold");
      ctx.fillStyle = activeTheme.textColor;
      ctx.fillText(item.value, bentoX + 28, bY + 74);

      ctx.font = "500 13px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = activeTheme.secondaryText;
      ctx.fillText(item.sub, bentoX + 28, bY + 100);
      ctx.restore();
    });

    // 5. Clean Modern Footer Tagline
    const footerY = margin + cardHeight - 70;
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = "600 17px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.accentColor;
    ctx.fillText("Calculate & verify your grades free at https://gradecalculator.dev", width / 2, footerY);

    ctx.font = "500 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("Personal educational progress snapshot • 100% private in browser", width / 2, footerY + 26);
    ctx.restore();
  };

  // Draw 1:1 Square Format (1080 x 1080)
  const drawSquareFormat = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const margin = 44;
    const cardWidth = width - margin * 2;
    const cardHeight = height - margin * 2;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(margin, margin, cardWidth, cardHeight, 32);
    ctx.fillStyle = activeTheme.cardBg;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = activeTheme.borderColor;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    // Top Brand Tag
    ctx.textAlign = "center";
    ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.accentColor;
    ctx.fillText("GradeCalculator.dev • Academic Snapshot", width / 2, margin + 55);

    // Title & Motto
    setFittedFont(ctx, courseName || "Academic Course Milestone", 42, 26, cardWidth - 60, "800");
    ctx.fillStyle = activeTheme.isLight ? "#0f172a" : "#ffffff";
    ctx.fillText(courseName || "Academic Course Milestone", width / 2, margin + 115);

    setFittedFont(ctx, `“ ${customNote} ”`, 22, 14, cardWidth - 80, "500");
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText(`“ ${customNote} ”`, width / 2, margin + 155);

    // Center Hero Ring Box
    const centerX = width / 2;
    const centerY = margin + 375;
    const ringRadius = 145;

    ctx.beginPath();
    ctx.arc(centerX, centerY, ringRadius + 12, 0, Math.PI * 2);
    ctx.fillStyle = activeTheme.glowColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
    ctx.fillStyle = activeTheme.isLight ? "#ffffff" : "rgba(15, 23, 42, 0.6)";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = activeTheme.accentColor;
    ctx.stroke();

    ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText((data.scoreLabel || "OVERALL SCORE").toUpperCase(), centerX, centerY - 65);

    const displayedScore = showPercentage ? data.scoreDisplay : "--";
    setFittedFont(ctx, displayedScore, 78, 38, ringRadius * 1.5, "900");
    ctx.fillStyle = activeTheme.isLight ? "#0f172a" : "#ffffff";
    ctx.textBaseline = "middle";
    ctx.fillText(displayedScore, centerX, centerY - 2);
    ctx.textBaseline = "alphabetic";

    if (data.letterGrade) {
      const badgeW = 180;
      const badgeH = 44;
      ctx.beginPath();
      ctx.roundRect(centerX - badgeW / 2, centerY + 45, badgeW, badgeH, 14);
      ctx.fillStyle = activeTheme.accentColor;
      ctx.fill();

      setFittedFont(ctx, `GRADE: ${data.letterGrade}`, 20, 14, badgeW - 20, "bold");
      ctx.fillStyle = activeTheme.isLight ? "#ffffff" : "#000000";
      ctx.fillText(`GRADE: ${data.letterGrade}`, centerX, centerY + 74);
    }

    // 2-Column Bento Box at Bottom
    const boxY = margin + 580;
    const boxW = cardWidth - 60;
    const boxH = 150;
    const boxX = margin + 30;

    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 20);
    ctx.fillStyle = activeTheme.isLight ? "#ffffff" : "rgba(255, 255, 255, 0.035)";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = activeTheme.borderColor;
    ctx.stroke();

    const col1X = boxX + boxW * 0.25;
    ctx.font = "bold 14px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.accentColor;
    ctx.fillText("ACADEMIC STANDING", col1X, boxY + 45);

    const statusVal = data.statusText || (data.gpaPoint && data.gpaPoint >= 3.5 ? "Dean's List" : "Honor Progress");
    setFittedFont(ctx, statusVal, 24, 15, boxW * 0.45, "bold");
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(statusVal, col1X, boxY + 90);

    ctx.font = "500 12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("Standard Academic Benchmark", col1X, boxY + 118);

    // Divider Line
    ctx.beginPath();
    ctx.moveTo(boxX + boxW * 0.5, boxY + 25);
    ctx.lineTo(boxX + boxW * 0.5, boxY + boxH - 25);
    ctx.strokeStyle = activeTheme.borderColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const col2X = boxX + boxW * 0.75;
    ctx.font = "bold 14px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.accentColor;
    ctx.fillText("4.0 SCALE EQUIVALENT", col2X, boxY + 45);

    const gpaVal = showGPA && data.gpaPoint !== undefined ? `${data.gpaPoint.toFixed(2)} Quality Points` : "4.0 Scale";
    setFittedFont(ctx, gpaVal, 24, 15, boxW * 0.45, "bold");
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(gpaVal, col2X, boxY + 90);

    ctx.font = "500 12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("Verified Grade Point Average", col2X, boxY + 118);

    // Footer
    ctx.font = "600 15px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.accentColor;
    ctx.fillText("https://gradecalculator.dev", width / 2, margin + cardHeight - 25);
    ctx.restore();
  };

  // Draw 16:9 Landscape Wide Banner (1200 x 630)
  const drawWideFormat = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const margin = 40;
    const cardWidth = width - margin * 2;
    const cardHeight = height - margin * 2;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(margin, margin, cardWidth, cardHeight, 28);
    ctx.fillStyle = activeTheme.cardBg;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = activeTheme.borderColor;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    const leftX = margin + 45;
    const contentW = cardWidth * 0.58;

    // Header Tag
    ctx.textAlign = "left";
    ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.accentColor;
    ctx.fillText("GradeCalculator.dev • Academic Progress Milestone", leftX, margin + 55);

    setFittedFont(ctx, courseName || "Academic Coursework", 40, 24, contentW - 20, "800");
    ctx.fillStyle = activeTheme.isLight ? "#0f172a" : "#ffffff";
    ctx.fillText(courseName || "Academic Coursework", leftX, margin + 112);

    setFittedFont(ctx, `“ ${customNote} ”`, 20, 14, contentW - 20, "500");
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText(`“ ${customNote} ”`, leftX, margin + 155);

    // Left Bento Metrics
    const bW = contentW - 20;
    const bH = 150;
    const bY = margin + 190;

    ctx.beginPath();
    ctx.roundRect(leftX, bY, bW, bH, 18);
    ctx.fillStyle = activeTheme.isLight ? "#ffffff" : "rgba(255, 255, 255, 0.035)";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = activeTheme.borderColor;
    ctx.stroke();

    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.accentColor;
    ctx.fillText("ACADEMIC STANDING", leftX + 25, bY + 38);

    const statusVal = data.statusText || (data.gpaPoint && data.gpaPoint >= 3.5 ? "Dean's List / Honors" : "Solid Above-Average Progress");
    setFittedFont(ctx, statusVal, 22, 15, bW * 0.45, "bold");
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(statusVal, leftX + 25, bY + 75);

    ctx.font = "500 12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("Benchmark Metric", leftX + 25, bY + 105);

    // Divider
    ctx.beginPath();
    ctx.moveTo(leftX + bW * 0.52, bY + 20);
    ctx.lineTo(leftX + bW * 0.52, bY + bH - 20);
    ctx.strokeStyle = activeTheme.borderColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.accentColor;
    ctx.fillText("4.0 GPA EQUIVALENT", leftX + bW * 0.56, bY + 38);

    const gpaVal = showGPA && data.gpaPoint !== undefined ? `${data.gpaPoint.toFixed(2)} Quality Points` : "4.0 Scale";
    setFittedFont(ctx, gpaVal, 22, 15, bW * 0.4, "bold");
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(gpaVal, leftX + bW * 0.56, bY + 75);

    ctx.font = "500 12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("Verified Grade Point", leftX + bW * 0.56, bY + 105);

    // Right Side: Hero Score Medallion
    const rightCenterX = width - margin - (cardWidth - contentW) / 2 + 10;
    const rightCenterY = height / 2;
    const rRadius = 140;

    ctx.beginPath();
    ctx.arc(rightCenterX, rightCenterY, rRadius + 12, 0, Math.PI * 2);
    ctx.fillStyle = activeTheme.glowColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(rightCenterX, rightCenterY, rRadius, 0, Math.PI * 2);
    ctx.fillStyle = activeTheme.isLight ? "#ffffff" : "rgba(15, 23, 42, 0.6)";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = activeTheme.accentColor;
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.font = "bold 15px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText((data.scoreLabel || "OVERALL SCORE").toUpperCase(), rightCenterX, rightCenterY - 60);

    const displayedScore = showPercentage ? data.scoreDisplay : "--";
    setFittedFont(ctx, displayedScore, 74, 36, rRadius * 1.5, "900");
    ctx.fillStyle = activeTheme.isLight ? "#0f172a" : "#ffffff";
    ctx.textBaseline = "middle";
    ctx.fillText(displayedScore, rightCenterX, rightCenterY - 2);
    ctx.textBaseline = "alphabetic";

    if (data.letterGrade) {
      const badgeW = 160;
      const badgeH = 42;
      ctx.beginPath();
      ctx.roundRect(rightCenterX - badgeW / 2, rightCenterY + 45, badgeW, badgeH, 14);
      ctx.fillStyle = activeTheme.accentColor;
      ctx.fill();

      setFittedFont(ctx, `GRADE: ${data.letterGrade}`, 19, 13, badgeW - 16, "bold");
      ctx.fillStyle = activeTheme.isLight ? "#ffffff" : "#000000";
      ctx.fillText(`GRADE: ${data.letterGrade}`, rightCenterX, rightCenterY + 72);
    }

    // Wide Footer
    ctx.textAlign = "left";
    ctx.font = "500 14px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("Personal educational progress snapshot • https://gradecalculator.dev", leftX, height - margin - 22);
    ctx.restore();
  };

  const drawCardToCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 1080;
    let height = 1920;

    if (selectedFormat === "square") {
      width = 1080;
      height = 1080;
    } else if (selectedFormat === "wide") {
      width = 1200;
      height = 630;
    }

    canvas.width = width;
    canvas.height = height;

    // Draw Ambient Gradient Canvas Plate
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, activeTheme.canvasBg[0]);
    gradient.addColorStop(0.5, activeTheme.canvasBg[1]);
    gradient.addColorStop(1, activeTheme.canvasBg[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle Ambient Light Glow Spheres
    ctx.save();
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.2, Math.min(width, height) * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = activeTheme.glowColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(width * 0.2, height * 0.8, Math.min(width, height) * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = activeTheme.glowColor;
    ctx.fill();
    ctx.restore();

    // Render selected format
    if (selectedFormat === "story") {
      drawStoryFormat(ctx, width, height);
    } else if (selectedFormat === "square") {
      drawSquareFormat(ctx, width, height);
    } else {
      drawWideFormat(ctx, width, height);
    }
  }, [selectedFormat, selectedTheme, courseName, customNote, showPercentage, showGPA, data, activeTheme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      drawCardToCanvas();
    }, 50);
    return () => clearTimeout(timer);
  }, [drawCardToCanvas]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageUri = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    const sanitizedTitle = courseName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "grade-milestone";
    link.download = `grade-card-${selectedFormat}-${sanitizedTitle}-gradecalculator.png`;
    link.href = imageUri;
    link.click();
    trackEvent("milestone_card_downloaded", { format: selectedFormat, theme: selectedTheme });
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
        trackEvent("milestone_card_image_copied", { format: selectedFormat });
      });
    } catch (err) {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    const text = `I just checked my grade milestone on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade: ${data.letterGrade || "A"}). Calculate yours free: https://gradecalculator.dev`;
    await navigator.clipboard.writeText(text);
    setCopiedStatus("link");
    setTimeout(() => setCopiedStatus("none"), 3000);
    trackEvent("milestone_card_link_copied");
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
                title: "My Grade Progress Snapshot",
                text: `I just checked my grade milestone on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay}`,
                url: "https://gradecalculator.dev",
                files: [file],
              });
              return;
            }
            await navigator.share({
              title: "My Grade Progress Snapshot",
              text: `I just checked my grade milestone on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay}`,
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
      `I just checked my grade milestone on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade ${data.letterGrade || "A"}). Calculate yours free:`
    );
    const url = encodeURIComponent("https://gradecalculator.dev");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer");
    trackEvent("milestone_card_twitter_shared");
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `I just checked my grade milestone on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade: ${data.letterGrade || "A"}). Check your grade: https://gradecalculator.dev`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank", "noopener,noreferrer");
    trackEvent("milestone_card_whatsapp_shared");
  };

  return (
    <div className="mt-8 pt-8 border-t border-slate-200 bg-gradient-to-b from-slate-50 via-white to-indigo-50/20 rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-xl shadow-indigo-500/5 space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/90 text-indigo-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Interactive Grade Milestone Card Studio</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Design & Share Your Grade Snapshot
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Create an aesthetic personal grade milestone card for your Instagram Story, notes, or study group.
          </p>
        </div>

        {/* Quick Social Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
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
      </div>

      {/* Format Selector: Story (9:16) [Default] | Square (1:1) | Wide (16:9) */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          <Layers className="w-3.5 h-3.5 text-indigo-600" />
          <span>1. Card Layout & Aspect Ratio</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FORMATS.map((fmt) => {
            const IconComponent = fmt.icon;
            const isSelected = selectedFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                type="button"
                onClick={() => setSelectedFormat(fmt.id)}
                className={`p-3.5 rounded-2xl text-left border flex items-center gap-3 transition-all ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/90 text-indigo-950 shadow-md ring-2 ring-indigo-500/20"
                    : "border-slate-200 hover:bg-white bg-white/70 text-slate-700 hover:border-slate-300"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    isSelected ? "bg-indigo-600 text-white shadow-sm shadow-indigo-300" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="font-bold text-xs sm:text-sm truncate">{fmt.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{fmt.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid: Left Customization | Right Canvas Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Customization Controls */}
        <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
          {/* Card Color Themes */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <Palette className="w-3.5 h-3.5 text-indigo-600" />
              <span>2. Color Palette & Aesthetics</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(THEMES).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTheme(t.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left border flex items-center gap-2 transition-all ${
                    selectedTheme === t.id
                      ? "border-indigo-600 bg-indigo-50/90 text-indigo-950 shadow-sm ring-2 ring-indigo-500/20"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: t.accentColor }}
                  />
                  <span className="truncate">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Customization: Course Name & Motto */}
          <div className="space-y-3">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Type className="w-3.5 h-3.5 text-indigo-600" />
              <span>3. Course Title & Goal Motto</span>
            </label>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">Subject / Class Name</span>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="e.g. Calculus II or Fall 2026 Semester"
                maxLength={40}
                className="w-full px-3.5 py-2 text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
              />
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">Personal Goal / Memo</span>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Locked in for finals 🔒"
                maxLength={50}
                className="w-full px-3.5 py-2 text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
              />
            </div>

            {/* Quick Motto Presets */}
            <div>
              <span className="text-[11px] font-bold text-slate-600 block mb-1.5">Quick Motto Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {MOTTO_PRESETS.map((motto) => (
                  <button
                    key={motto}
                    type="button"
                    onClick={() => setCustomNote(motto)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-800 text-slate-700 border border-slate-200 transition-colors"
                  >
                    {motto}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy & Display Toggles */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-indigo-600" />
              <span>4. Privacy & Visible Elements</span>
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowPercentage(!showPercentage)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                  showPercentage
                    ? "bg-indigo-50 border-indigo-200 text-indigo-900"
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
                      ? "bg-indigo-50 border-indigo-200 text-indigo-900"
                      : "bg-slate-100 border-slate-200 text-slate-600 line-through"
                  }`}
                >
                  {showGPA ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>GPA Point</span>
                </button>
              )}
            </div>
          </div>

          {/* Download & Copy Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="w-full sm:flex-1 py-3 px-5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/20 min-h-[46px]"
            >
              <Download className="w-4 h-4" />
              <span>Download {selectedFormat.toUpperCase()} PNG</span>
            </button>

            <button
              type="button"
              onClick={handleCopyImage}
              className="w-full sm:w-auto py-3 px-4 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 transition-all shadow-xs min-h-[46px]"
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
          </div>
        </div>

        {/* Right Column: Live Canvas Preview */}
        <div className="lg:col-span-6 space-y-2 order-1 lg:order-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span>Live Card Preview</span>
            <span className="text-indigo-600 font-bold">
              {selectedFormat === "story"
                ? "1080 × 1920 (Story HD)"
                : selectedFormat === "square"
                ? "1080 × 1080 (Square HD)"
                : "1200 × 630 (Wide HD)"}
            </span>
          </div>

          {/* Canvas Wrapper */}
          <div className="w-full overflow-hidden rounded-2xl border border-slate-300 shadow-2xl bg-slate-950 flex items-center justify-center p-3 sm:p-5">
            <canvas
              ref={canvasRef}
              className={`w-auto object-contain transition-all duration-300 rounded-xl shadow-2xl ${
                selectedFormat === "story"
                  ? "max-h-[440px] sm:max-h-[500px] aspect-[9/16]"
                  : selectedFormat === "square"
                  ? "max-h-[340px] sm:max-h-[390px] aspect-square"
                  : "max-h-[260px] sm:max-h-[310px] aspect-[1200/630]"
              }`}
            />
          </div>

          <div className="text-center text-[11px] text-slate-500 font-medium">
            💡 Tap <strong>Download</strong> or <strong>Copy Image</strong> to share your grade snapshot on Instagram Story, Snapchat, TikTok, or Discord!
          </div>
        </div>
      </div>
    </div>
  );
}

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
  Info,
  ShieldAlert,
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
export type CardTheme = "ivygold" | "parchment" | "emerald" | "crimson" | "obsidian" | "executive";

interface ThemeConfig {
  id: CardTheme;
  name: string;
  canvasBg: string[];
  goldColor: string;
  goldAccent: string;
  textColor: string;
  secondaryText: string;
  ribbonColor: string;
  isLight: boolean;
  borderInner: string;
  pillBg: string;
}

const THEMES: Record<CardTheme, ThemeConfig> = {
  ivygold: {
    id: "ivygold",
    name: "Ivy League Navy",
    canvasBg: ["#080c14", "#0f172a", "#080c14"],
    goldColor: "#f59e0b",
    goldAccent: "#d97706",
    textColor: "#ffffff",
    secondaryText: "#cbd5e1",
    ribbonColor: "#dc2626",
    isLight: false,
    borderInner: "rgba(245, 158, 11, 0.4)",
    pillBg: "rgba(245, 158, 11, 0.15)",
  },
  parchment: {
    id: "parchment",
    name: "Classic Parchment",
    canvasBg: ["#fefbf3", "#fcf7e8", "#f7f0dc"],
    goldColor: "#b45309",
    goldAccent: "#d97706",
    textColor: "#1c1917",
    secondaryText: "#57534e",
    ribbonColor: "#991b1b",
    isLight: true,
    borderInner: "rgba(180, 83, 9, 0.45)",
    pillBg: "rgba(180, 83, 9, 0.12)",
  },
  emerald: {
    id: "emerald",
    name: "Emerald Honors",
    canvasBg: ["#022c22", "#064e3b", "#022c22"],
    goldColor: "#fbbf24",
    goldAccent: "#d97706",
    textColor: "#ffffff",
    secondaryText: "#a7f3d0",
    ribbonColor: "#047857",
    isLight: false,
    borderInner: "rgba(251, 191, 36, 0.4)",
    pillBg: "rgba(251, 191, 36, 0.15)",
  },
  crimson: {
    id: "crimson",
    name: "Crimson Scholar",
    canvasBg: ["#450a0a", "#7f1d1d", "#450a0a"],
    goldColor: "#fcd34d",
    goldAccent: "#f59e0b",
    textColor: "#ffffff",
    secondaryText: "#fecdd3",
    ribbonColor: "#991b1b",
    isLight: false,
    borderInner: "rgba(252, 211, 77, 0.45)",
    pillBg: "rgba(252, 211, 77, 0.15)",
  },
  obsidian: {
    id: "obsidian",
    name: "Obsidian Stealth",
    canvasBg: ["#020617", "#090d16", "#020617"],
    goldColor: "#38bdf8",
    goldAccent: "#0284c7",
    textColor: "#ffffff",
    secondaryText: "#94a3b8",
    ribbonColor: "#0284c7",
    isLight: false,
    borderInner: "rgba(56, 189, 248, 0.4)",
    pillBg: "rgba(56, 189, 248, 0.15)",
  },
  executive: {
    id: "executive",
    name: "Executive White",
    canvasBg: ["#ffffff", "#f8fafc", "#f1f5f9"],
    goldColor: "#1e40af",
    goldAccent: "#3b82f6",
    textColor: "#0f172a",
    secondaryText: "#475569",
    ribbonColor: "#1e40af",
    isLight: true,
    borderInner: "rgba(30, 64, 175, 0.35)",
    pillBg: "rgba(30, 64, 175, 0.1)",
  },
};

const MOTTO_PRESETS = [
  "Dean's List Goal Achieved 🌟",
  "Outstanding Personal Effort 🏆",
  "Academic Weapon • Locked in 🔒",
  "Course Milestone Reached 🎓",
  "Target Goal Met 🎯",
  "Hard Work & Dedication ⚡",
];

const FORMATS: { id: CardFormat; name: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "story", name: "Story Certificate (9:16)", desc: "Instagram & Snapchat Story", icon: Smartphone },
  { id: "square", name: "Plaque Certificate (1:1)", desc: "Square Feed & Discord", icon: Square },
  { id: "wide", name: "Diploma Certificate (16:9)", desc: "Landscape Academic Banner", icon: RectangleHorizontal },
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

/**
 * Draws ornate certificate corner flourishes
 */
function drawCornerFlourish(ctx: CanvasRenderingContext2D, x: number, y: number, dirX: number, dirY: number, size: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  // Corner L shape
  ctx.moveTo(x, y + dirY * size);
  ctx.lineTo(x, y);
  ctx.lineTo(x + dirX * size, y);
  ctx.stroke();

  // Inner decorative secondary corner
  ctx.beginPath();
  ctx.moveTo(x + dirX * 12, y + dirY * (size - 8));
  ctx.lineTo(x + dirX * 12, y + dirY * 12);
  ctx.lineTo(x + dirX * (size - 8), y + dirY * 12);
  ctx.stroke();

  // Little rosette star/circle
  ctx.beginPath();
  ctx.arc(x + dirX * 18, y + dirY * 18, 4, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

/**
 * Draws Certificate Double Borders with Corner Flourishes
 */
function drawCertificateBorders(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  outerMargin: number,
  innerGap: number,
  goldColor: string,
  innerBorderColor: string,
  isLight: boolean
) {
  const w = width - outerMargin * 2;
  const h = height - outerMargin * 2;

  ctx.save();
  // 1. Certificate Paper Background Plate
  ctx.beginPath();
  ctx.roundRect(outerMargin, outerMargin, w, h, 20);
  ctx.fillStyle = isLight ? "#ffffff" : "rgba(255, 255, 255, 0.035)";
  ctx.fill();

  // 2. Thick Gold Foil Border
  ctx.lineWidth = 5;
  ctx.strokeStyle = goldColor;
  ctx.stroke();

  // 3. Inner Delicate Pinstripe Border
  const inX = outerMargin + innerGap;
  const inY = outerMargin + innerGap;
  const inW = w - innerGap * 2;
  const inH = h - innerGap * 2;

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = innerBorderColor;
  ctx.strokeRect(inX, inY, inW, inH);

  // 4. Draw 4 Corner Flourishes
  const fSize = 40;
  drawCornerFlourish(ctx, inX, inY, 1, 1, fSize, goldColor);
  drawCornerFlourish(ctx, inX + inW, inY, -1, 1, fSize, goldColor);
  drawCornerFlourish(ctx, inX, inY + inH, 1, -1, fSize, goldColor);
  drawCornerFlourish(ctx, inX + inW, inY + inH, -1, -1, fSize, goldColor);

  ctx.restore();
}

/**
 * Draws an Embossed Gold Seal Medallion with Ribbons & "SELF-CALCULATED" engraving
 */
function drawGoldenSealMedallion(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  letterGrade: string,
  scoreText: string,
  goldColor: string,
  ribbonColor: string,
  isLight: boolean
) {
  ctx.save();

  // 1. Ribbon Tails
  const rWidth = radius * 0.48;
  const rHeight = radius * 0.85;

  ctx.fillStyle = ribbonColor;
  // Left Ribbon
  ctx.beginPath();
  ctx.moveTo(cx - radius * 0.45, cy + radius * 0.5);
  ctx.lineTo(cx - radius * 0.7, cy + radius + rHeight);
  ctx.lineTo(cx - radius * 0.45, cy + radius + rHeight * 0.7);
  ctx.lineTo(cx - radius * 0.2, cy + radius + rHeight);
  ctx.lineTo(cx - radius * 0.1, cy + radius * 0.5);
  ctx.closePath();
  ctx.fill();

  // Right Ribbon
  ctx.beginPath();
  ctx.moveTo(cx + radius * 0.1, cy + radius * 0.5);
  ctx.lineTo(cx + radius * 0.2, cy + radius + rHeight);
  ctx.lineTo(cx + radius * 0.45, cy + radius + rHeight * 0.7);
  ctx.lineTo(cx + radius * 0.7, cy + radius + rHeight);
  ctx.lineTo(cx + radius * 0.45, cy + radius * 0.5);
  ctx.closePath();
  ctx.fill();

  // 2. Scalloped Starburst Gold Medal Outer Ring (24 teeth)
  ctx.beginPath();
  const numPoints = 24;
  for (let i = 0; i < numPoints * 2; i++) {
    const angle = (i * Math.PI) / numPoints;
    const r = i % 2 === 0 ? radius + 10 : radius;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = goldColor;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(0,0,0,0.15)";
  ctx.stroke();

  // 3. Inner Gold Core
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 14, 0, Math.PI * 2);
  ctx.fillStyle = isLight ? "#ffffff" : "#080c14";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = goldColor;
  ctx.stroke();

  // 4. Dotted Sub-ring
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 24, 0, Math.PI * 2);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = goldColor;
  ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.setLineDash([]); // Reset

  // 5. Text inside Medal
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Top Curved Label stating Self-Calculated
  ctx.font = "bold 12px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = goldColor;
  ctx.fillText("★ SELF-CALCULATED ★", cx, cy - radius * 0.48);

  // Big Bold Score Number (Auto-fitted)
  const maxScoreW = (radius - 30) * 1.5;
  setFittedFont(ctx, scoreText, radius * 0.48, 28, maxScoreW, "900");
  ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
  ctx.fillText(scoreText, cx, cy - 6);

  // Letter Grade Badge
  if (letterGrade) {
    const pillW = radius * 1.1;
    const pillH = 36;
    ctx.beginPath();
    ctx.roundRect(cx - pillW / 2, cy + radius * 0.32, pillW, pillH, 12);
    ctx.fillStyle = goldColor;
    ctx.fill();

    setFittedFont(ctx, `GRADE: ${letterGrade}`, 17, 13, pillW - 12, "bold");
    ctx.fillStyle = isLight ? "#ffffff" : "#000000";
    ctx.fillText(`GRADE: ${letterGrade}`, cx, cy + radius * 0.32 + pillH / 2);
  }

  ctx.restore();
}

export default function GradeSocialCardStudio({ data }: GradeSocialCardStudioProps) {
  // Default to story format first as requested by user
  const [selectedFormat, setSelectedFormat] = useState<CardFormat>("story");
  const [selectedTheme, setSelectedTheme] = useState<CardTheme>("ivygold");
  const [courseName, setCourseName] = useState<string>("Academic Coursework");
  const [customNote, setCustomNote] = useState<string>("Dean's List Goal Achieved 🌟");
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

  // Draw 9:16 Story Certificate (1080 x 1920)
  const drawStoryFormat = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const margin = 50;
    drawCertificateBorders(ctx, width, height, margin, 24, activeTheme.goldColor, activeTheme.borderInner, activeTheme.isLight);

    ctx.save();
    // 1. Certificate Header with Unofficial & Self-Made Clear Attribution
    const topY = margin + 75;
    ctx.textAlign = "center";

    // Unofficial Pill
    ctx.beginPath();
    ctx.roundRect(width / 2 - 210, topY, 420, 42, 21);
    ctx.fillStyle = activeTheme.pillBg;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = activeTheme.borderInner;
    ctx.stroke();

    ctx.font = "bold 15px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.textBaseline = "middle";
    ctx.fillText("★ UNOFFICIAL • SELF-GENERATED RECORD ★", width / 2, topY + 21);
    ctx.textBaseline = "alphabetic";

    // Primary Certificate Header
    ctx.font = "900 48px serif, Georgia, 'Times New Roman', Cambria";
    ctx.fillStyle = activeTheme.isLight ? "#1e293b" : "#ffffff";
    ctx.fillText("CERTIFICATE OF ACHIEVEMENT", width / 2, topY + 95);

    ctx.font = "600 20px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("PERSONAL ACADEMIC MILESTONE & GRADE SNAPSHOT", width / 2, topY + 138);

    // Divider Line
    ctx.beginPath();
    ctx.moveTo(width / 2 - 280, topY + 165);
    ctx.lineTo(width / 2 + 280, topY + 165);
    ctx.strokeStyle = activeTheme.borderInner;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 2. Personal Award Presentation Citation
    ctx.font = "italic 26px serif, Georgia, 'Times New Roman'";
    ctx.fillStyle = activeTheme.isLight ? "#64748b" : "#94a3b8";
    ctx.fillText("In celebration of dedicated study and self-tracked coursework in", width / 2, topY + 230);

    // Big Bold Course Subject
    setFittedFont(ctx, courseName || "Academic Coursework", 56, 34, width - 200, "bold", "serif, Georgia, Cambria");
    ctx.fillStyle = activeTheme.isLight ? "#0f172a" : "#ffffff";
    ctx.fillText(courseName || "Academic Coursework", width / 2, topY + 300);

    // Student Custom Note / Motto
    setFittedFont(ctx, `“ ${customNote} ”`, 26, 18, width - 220, "italic", "serif, Georgia");
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText(`“ ${customNote} ”`, width / 2, topY + 360);

    // 3. Central Embossed Gold Seal Medallion
    const sealY = topY + 615;
    const displayedScore = showPercentage ? data.scoreDisplay : "--";
    drawGoldenSealMedallion(
      ctx,
      width / 2,
      sealY,
      185,
      data.letterGrade || "A",
      displayedScore,
      activeTheme.goldColor,
      activeTheme.ribbonColor,
      activeTheme.isLight
    );

    // 4. Self-Calculated Breakdown Panel
    const panelY = sealY + 255;
    const panelW = width - (margin + 45) * 2;
    const panelH = 260;
    const panelX = margin + 45;

    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH, 16);
    ctx.fillStyle = activeTheme.isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.04)";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = activeTheme.borderInner;
    ctx.stroke();

    // Panel Header
    ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.textAlign = "left";
    ctx.fillText("SELF-CALCULATED ACADEMIC DATA SUMMARY", panelX + 35, panelY + 45);

    // Metric 1: Academic Standing
    ctx.font = "600 15px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("ESTIMATED STANDING:", panelX + 35, panelY + 95);
    const statusVal = data.statusText || (data.gpaPoint && data.gpaPoint >= 3.5 ? "Dean's List / Honors Standing" : "Solid Above-Average Progress");
    ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(statusVal, panelX + 35, panelY + 130);

    // Metric 2: 4.0 GPA
    ctx.font = "600 15px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("QUALITY POINT EQUIVALENT (4.0 SCALE):", panelX + 35, panelY + 185);
    const gpaVal = showGPA && data.gpaPoint !== undefined ? `${data.gpaPoint.toFixed(2)} Quality Points` : "4.0 Scale Standard";
    ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(gpaVal, panelX + 35, panelY + 220);

    // 5. Unofficial Attribution Lines
    const sigY = panelY + panelH + 85;

    // Left Line: Self-Assessment
    ctx.beginPath();
    ctx.moveTo(panelX + 40, sigY + 45);
    ctx.lineTo(panelX + 320, sigY + 45);
    ctx.strokeStyle = activeTheme.borderInner;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = "italic 24px serif, 'Brush Script MT', cursive, Georgia";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.textAlign = "center";
    ctx.fillText("Student Self-Assessment", panelX + 180, sigY + 32);

    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("SELF-REPORTED STUDY DATA", panelX + 180, sigY + 70);

    // Right Line: Calculator Tool
    const rightSigX = panelX + panelW - 180;
    ctx.beginPath();
    ctx.moveTo(panelX + panelW - 320, sigY + 45);
    ctx.lineTo(panelX + panelW - 40, sigY + 45);
    ctx.strokeStyle = activeTheme.borderInner;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = "bold 20px serif, Georgia";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("GradeCalculator.dev", rightSigX, sigY + 32);

    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("EDUCATIONAL STUDY TOOL", rightSigX, sigY + 70);

    // Bottom Explicit Informational Disclaimer
    ctx.font = "600 14px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("UNOFFICIAL STUDENT RECORD • FOR PERSONAL INFORMATIONAL PURPOSES ONLY", width / 2, height - (margin + 42));

    ctx.font = "500 12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.isLight ? "#64748b" : "#94a3b8";
    ctx.fillText("Self-calculated with GradeCalculator.dev • Not an official school transcript or binding diploma", width / 2, height - (margin + 22));
    ctx.restore();
  };

  // Draw 1:1 Square Plaque Certificate (1080 x 1080)
  const drawSquareFormat = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const margin = 45;
    drawCertificateBorders(ctx, width, height, margin, 20, activeTheme.goldColor, activeTheme.borderInner, activeTheme.isLight);

    ctx.save();
    ctx.textAlign = "center";

    // Top Unofficial Banner Tag
    const topY = margin + 55;
    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("★ UNOFFICIAL • SELF-MADE ACHIEVEMENT RECORD ★", width / 2, topY);

    ctx.font = "900 38px serif, Georgia, 'Times New Roman'";
    ctx.fillStyle = activeTheme.isLight ? "#1e293b" : "#ffffff";
    ctx.fillText("CERTIFICATE OF ACHIEVEMENT", width / 2, topY + 48);

    // Subject
    ctx.font = "italic 18px serif, Georgia";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("Personal study milestone & coursework progress in", width / 2, topY + 85);

    setFittedFont(ctx, courseName || "Academic Coursework", 44, 24, width - 180, "bold", "serif, Georgia");
    ctx.fillStyle = activeTheme.isLight ? "#0f172a" : "#ffffff";
    ctx.fillText(courseName || "Academic Coursework", width / 2, topY + 140);

    setFittedFont(ctx, `“ ${customNote} ”`, 19, 13, width - 200, "italic", "serif, Georgia");
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText(`“ ${customNote} ”`, width / 2, topY + 178);

    // Central Medallion Seal
    const sealY = topY + 395;
    const displayedScore = showPercentage ? data.scoreDisplay : "--";
    drawGoldenSealMedallion(
      ctx,
      width / 2,
      sealY,
      150,
      data.letterGrade || "A",
      displayedScore,
      activeTheme.goldColor,
      activeTheme.ribbonColor,
      activeTheme.isLight
    );

    // Data Summary Box
    const boxY = sealY + 195;
    const boxW = width - (margin + 40) * 2;
    const boxH = 95;
    const boxX = margin + 40;

    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 14);
    ctx.fillStyle = activeTheme.isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.04)";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = activeTheme.borderInner;
    ctx.stroke();

    const col1 = boxX + boxW * 0.25;
    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("ESTIMATED STANDING", col1, boxY + 32);

    const statusVal = data.statusText || (data.gpaPoint && data.gpaPoint >= 3.5 ? "Dean's List Goal" : "Solid Progress");
    setFittedFont(ctx, statusVal, 22, 14, boxW * 0.45, "bold");
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(statusVal, col1, boxY + 68);

    const col2 = boxX + boxW * 0.75;
    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("4.0 GPA EQUIVALENT", col2, boxY + 32);

    const gpaVal = showGPA && data.gpaPoint !== undefined ? `${data.gpaPoint.toFixed(2)} Quality Points` : "4.0 Scale Standard";
    setFittedFont(ctx, gpaVal, 22, 14, boxW * 0.45, "bold");
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(gpaVal, col2, boxY + 68);

    // Footer Disclaimer
    ctx.font = "bold 12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("UNOFFICIAL • SELF-CALCULATED WITH GRADECALCULATOR.DEV", width / 2, height - (margin + 30));

    ctx.font = "500 11px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.isLight ? "#64748b" : "#94a3b8";
    ctx.fillText("For personal goal tracking and study motivation. Not an official academic transcript.", width / 2, height - (margin + 14));
    ctx.restore();
  };

  // Draw 16:9 Landscape Diploma (1200 x 630)
  const drawWideFormat = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const margin = 40;
    drawCertificateBorders(ctx, width, height, margin, 18, activeTheme.goldColor, activeTheme.borderInner, activeTheme.isLight);

    ctx.save();
    const leftX = margin + 50;
    const contentW = width * 0.62;

    // Header with Unofficial mention
    ctx.textAlign = "left";
    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("★ UNOFFICIAL • SELF-GENERATED ACHIEVEMENT RECORD ★", leftX, margin + 55);

    ctx.font = "900 36px serif, Georgia, 'Times New Roman'";
    ctx.fillStyle = activeTheme.isLight ? "#1e293b" : "#ffffff";
    ctx.fillText("CERTIFICATE OF ACHIEVEMENT", leftX, margin + 104);

    ctx.font = "italic 19px serif, Georgia";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("In celebration of dedicated study and self-tracked coursework in", leftX, margin + 145);

    setFittedFont(ctx, courseName || "Academic Coursework", 40, 24, contentW - 40, "bold", "serif, Georgia");
    ctx.fillStyle = activeTheme.isLight ? "#0f172a" : "#ffffff";
    ctx.fillText(courseName || "Academic Coursework", leftX, margin + 198);

    setFittedFont(ctx, `“ ${customNote} ”`, 19, 13, contentW - 40, "italic", "serif, Georgia");
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText(`“ ${customNote} ”`, leftX, margin + 238);

    // Metrics Box
    const bW = contentW - 30;
    const bH = 80;
    const bY = margin + 270;
    ctx.beginPath();
    ctx.roundRect(leftX, bY, bW, bH, 12);
    ctx.fillStyle = activeTheme.isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.04)";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = activeTheme.borderInner;
    ctx.stroke();

    ctx.font = "bold 12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("ESTIMATED STANDING", leftX + 25, bY + 28);
    const statusVal = data.statusText || (data.gpaPoint && data.gpaPoint >= 3.5 ? "Dean's List Goal" : "Solid Progress");
    ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(statusVal, leftX + 25, bY + 58);

    ctx.font = "bold 12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("4.0 GPA EQUIVALENT", leftX + bW * 0.55, bY + 28);
    const gpaVal = showGPA && data.gpaPoint !== undefined ? `${data.gpaPoint.toFixed(2)} Quality Points` : "4.0 Scale Standard";
    ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(gpaVal, leftX + bW * 0.55, bY + 58);

    // Attribution lines
    const sigY = margin + 395;
    ctx.beginPath();
    ctx.moveTo(leftX, sigY + 38);
    ctx.lineTo(leftX + 220, sigY + 38);
    ctx.strokeStyle = activeTheme.borderInner;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = "italic 20px serif, 'Brush Script MT', cursive, Georgia";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("Student Self-Assessment", leftX + 10, sigY + 26);

    ctx.font = "bold 11px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("SELF-REPORTED STUDY DATA", leftX, sigY + 56);

    // Right Side: Embossed Gold Seal
    const sealX = width - (margin + 175);
    const sealY = height / 2 - 10;
    const displayedScore = showPercentage ? data.scoreDisplay : "--";
    drawGoldenSealMedallion(
      ctx,
      sealX,
      sealY,
      142,
      data.letterGrade || "A",
      displayedScore,
      activeTheme.goldColor,
      activeTheme.ribbonColor,
      activeTheme.isLight
    );

    // Wide Footer Disclaimer
    ctx.textAlign = "left";
    ctx.font = "bold 11px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("UNOFFICIAL • FOR PERSONAL MOTIVATION & STUDY TRACKING ONLY", leftX, height - margin - 26);

    ctx.font = "500 11px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.isLight ? "#64748b" : "#94a3b8";
    ctx.fillText("Self-calculated on https://gradecalculator.dev • Not an official school transcript", leftX, height - margin - 12);
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

    // Draw Background Canvas Plate
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, activeTheme.canvasBg[0]);
    gradient.addColorStop(0.5, activeTheme.canvasBg[1]);
    gradient.addColorStop(1, activeTheme.canvasBg[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle Certificate Radial Glow
    ctx.save();
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.5, Math.min(width, height) * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = activeTheme.isLight
      ? "rgba(217, 119, 6, 0.04)"
      : `${activeTheme.goldColor}10`;
    ctx.fill();
    ctx.restore();

    // Render format
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
    const sanitizedTitle = courseName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "achievement-certificate";
    link.download = `achievement-certificate-${selectedFormat}-${sanitizedTitle}-gradecalculator.png`;
    link.href = imageUri;
    link.click();
    trackEvent("certificate_card_downloaded", { format: selectedFormat, theme: selectedTheme });
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
        trackEvent("certificate_card_image_copied", { format: selectedFormat });
      });
    } catch (err) {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    const text = `I just designed my Academic Achievement Certificate on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade: ${data.letterGrade || "A"}). Calculate yours free: https://gradecalculator.dev`;
    await navigator.clipboard.writeText(text);
    setCopiedStatus("link");
    setTimeout(() => setCopiedStatus("none"), 3000);
    trackEvent("certificate_card_link_copied");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.toBlob(async (blob) => {
            if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], `achievement-certificate-${selectedFormat}.png`, { type: "image/png" })] })) {
              const file = new File([blob], `achievement-certificate-${selectedFormat}.png`, { type: "image/png" });
              await navigator.share({
                title: "My Academic Achievement Certificate",
                text: `I just designed my Academic Achievement Certificate on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay}`,
                url: "https://gradecalculator.dev",
                files: [file],
              });
              return;
            }
            await navigator.share({
              title: "My Academic Achievement Certificate",
              text: `I just designed my Academic Achievement Certificate on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay}`,
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
      `I just designed my Academic Achievement Certificate on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade ${data.letterGrade || "A"}). Calculate yours free:`
    );
    const url = encodeURIComponent("https://gradecalculator.dev");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer");
    trackEvent("certificate_card_twitter_shared");
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `I just designed my Academic Achievement Certificate on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade: ${data.letterGrade || "A"}). Check your grade: https://gradecalculator.dev`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank", "noopener,noreferrer");
    trackEvent("certificate_card_whatsapp_shared");
  };

  return (
    <div className="mt-8 pt-8 border-t border-slate-200 bg-gradient-to-b from-slate-50 via-white to-amber-50/20 rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-xl shadow-amber-500/5 space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Academic Achievement Certificate Studio</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Personal Achievement Certificate Generator
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Design an achievement certificate for your personal study goals, course completion, or student motivation.
          </p>
        </div>

        {/* Quick Social Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleTwitterShare}
            className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-all flex items-center justify-center shadow-xs"
            title="Share Certificate on X (Twitter)"
          >
            <Twitter className="w-4 h-4 text-sky-500" />
          </button>
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-all flex items-center justify-center shadow-xs"
            title="Share Certificate on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-500" />
          </button>
          <button
            type="button"
            onClick={handleNativeShare}
            className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-all flex items-center justify-center shadow-xs sm:hidden"
            title="Share Certificate on Mobile"
          >
            <Share2 className="w-4 h-4 text-indigo-600" />
          </button>
        </div>
      </div>

      {/* Info Notice Badge */}
      <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-xs text-amber-950">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Informational Achievement Record: </span>
          <span>
            This certificate is a self-generated milestone designed for personal student motivation, goal celebration, and social sharing. It is clearly labeled as an unofficial, self-calculated student record.
          </span>
        </div>
      </div>

      {/* Format Selector: Story (9:16) [Default] | Square (1:1) | Wide (16:9) */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          <span>1. Certificate Format & Presentation Style</span>
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
                    ? "border-amber-600 bg-amber-50/90 text-amber-950 shadow-md ring-2 ring-amber-500/20"
                    : "border-slate-200 hover:bg-white bg-white/70 text-slate-700 hover:border-slate-300"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    isSelected ? "bg-amber-600 text-white shadow-sm shadow-amber-300" : "bg-slate-100 text-slate-600"
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
          {/* Certificate Themes */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <Palette className="w-3.5 h-3.5 text-amber-600" />
              <span>2. Certificate Style & Foil Theme</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(THEMES).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTheme(t.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left border flex items-center gap-2 transition-all ${
                    selectedTheme === t.id
                      ? "border-amber-600 bg-amber-50/90 text-amber-950 shadow-sm ring-2 ring-amber-500/20"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: t.goldColor }}
                  />
                  <span className="truncate">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Customization: Course Name & Motto */}
          <div className="space-y-3">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Type className="w-3.5 h-3.5 text-amber-600" />
              <span>3. Course Subject & Personal Motto</span>
            </label>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">Subject / Class Name</span>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="e.g. Calculus II or Fall 2026 Semester"
                maxLength={40}
                className="w-full px-3.5 py-2 text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
              />
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">Personal Goal / Achievement Memo</span>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Dean's List Goal Achieved 🌟"
                maxLength={50}
                className="w-full px-3.5 py-2 text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
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
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-700 border border-slate-200 transition-colors"
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
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>4. Certificate Seal Elements</span>
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowPercentage(!showPercentage)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                  showPercentage
                    ? "bg-amber-50 border-amber-200 text-amber-900"
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
                      ? "bg-amber-50 border-amber-200 text-amber-900"
                      : "bg-slate-100 border-slate-200 text-slate-600 line-through"
                  }`}
                >
                  {showGPA ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>GPA Point</span>
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="w-full sm:flex-1 py-3 px-5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 active:scale-[0.98] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 min-h-[46px]"
            >
              <Award className="w-4 h-4" />
              <span>Download Certificate ({selectedFormat.toUpperCase()} PNG)</span>
            </button>

            <button
              type="button"
              onClick={handleCopyImage}
              className="w-full sm:w-auto py-3 px-4 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 transition-all shadow-xs min-h-[46px]"
            >
              {copiedStatus === "image" ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Certificate Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600" />
                  <span>Copy Certificate</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Live Certificate Canvas Preview */}
        <div className="lg:col-span-6 space-y-2 order-1 lg:order-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span>Certificate Live Preview</span>
            <span className="text-amber-700 font-bold">
              {selectedFormat === "story"
                ? "1080 × 1920 (Story Certificate)"
                : selectedFormat === "square"
                ? "1080 × 1080 (Award Plaque)"
                : "1200 × 630 (Diploma Banner)"}
            </span>
          </div>

          {/* Canvas Wrapper */}
          <div className="w-full overflow-hidden rounded-2xl border border-amber-900/20 shadow-2xl bg-slate-950 flex items-center justify-center p-3 sm:p-5">
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
            🎓 Personal Academic Achievement Certificate powered by <strong>GradeCalculator.dev</strong>. Self-calculated for personal motivation!
          </div>
        </div>
      </div>
    </div>
  );
}

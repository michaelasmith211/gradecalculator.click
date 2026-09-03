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
  GraduationCap,
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
export type CardTheme = "ivygold" | "parchment" | "emerald" | "crimson" | "cyber" | "executive";

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
}

const THEMES: Record<CardTheme, ThemeConfig> = {
  ivygold: {
    id: "ivygold",
    name: "Ivy League Navy",
    canvasBg: ["#090d16", "#0f172a", "#090d16"],
    goldColor: "#f59e0b",
    goldAccent: "#d97706",
    textColor: "#ffffff",
    secondaryText: "#cbd5e1",
    ribbonColor: "#dc2626",
    isLight: false,
    borderInner: "rgba(245, 158, 11, 0.4)",
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
    borderInner: "rgba(180, 83, 9, 0.5)",
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
  },
  crimson: {
    id: "crimson",
    name: "Crimson Magna",
    canvasBg: ["#450a0a", "#7f1d1d", "#450a0a"],
    goldColor: "#fcd34d",
    goldAccent: "#f59e0b",
    textColor: "#ffffff",
    secondaryText: "#fecdd3",
    ribbonColor: "#991b1b",
    isLight: false,
    borderInner: "rgba(252, 211, 77, 0.45)",
  },
  cyber: {
    id: "cyber",
    name: "Obsidian Stealth",
    canvasBg: ["#020617", "#090d16", "#020617"],
    goldColor: "#38bdf8",
    goldAccent: "#0284c7",
    textColor: "#ffffff",
    secondaryText: "#94a3b8",
    ribbonColor: "#0284c7",
    isLight: false,
    borderInner: "rgba(56, 189, 248, 0.4)",
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
  },
};

const MOTTO_PRESETS = [
  "Dean's List with Highest Honors 🌟",
  "Outstanding Scholastic Achievement 🏆",
  "Academic Weapon • Locked in 🔒",
  "Excellence in Coursework 🎓",
  "Target Goal Secured 🎯",
  "Summa Cum Laude Track ⚡",
];

const FORMATS: { id: CardFormat; name: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "story", name: "Story Certificate (9:16)", desc: "Vertical Instagram & Snapchat", icon: Smartphone },
  { id: "square", name: "Plaque Certificate (1:1)", desc: "Square Feed & Discord", icon: Square },
  { id: "wide", name: "Diploma Certificate (16:9)", desc: "Landscape Official Diploma", icon: RectangleHorizontal },
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
 * Draws ornate guilloché corner flourishes for certificates
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

  // Inner decorative small square
  ctx.beginPath();
  ctx.moveTo(x + dirX * 12, y + dirY * (size - 8));
  ctx.lineTo(x + dirX * 12, y + dirY * 12);
  ctx.lineTo(x + dirX * (size - 8), y + dirY * 12);
  ctx.stroke();

  // Small rosette circle
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

  // 2. Thick Primary Gold Foil Border
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

  // 4. Draw 4 Corner Rosette Flourishes
  const fSize = 40;
  drawCornerFlourish(ctx, inX, inY, 1, 1, fSize, goldColor);
  drawCornerFlourish(ctx, inX + inW, inY, -1, 1, fSize, goldColor);
  drawCornerFlourish(ctx, inX, inY + inH, 1, -1, fSize, goldColor);
  drawCornerFlourish(ctx, inX + inW, inY + inH, -1, -1, fSize, goldColor);

  ctx.restore();
}

/**
 * Draws an Embossed Gold Certificate Seal with Ribbons
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

  // 1. Ribbon Tails hanging from the bottom of the seal
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

  // 3. Inner Gold Embossed Core
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 14, 0, Math.PI * 2);
  ctx.fillStyle = isLight ? "#ffffff" : "#090d16";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = goldColor;
  ctx.stroke();

  // 4. Decorative Dotted Sub-ring
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

  // Top Curved Label
  ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = goldColor;
  ctx.fillText("★ OFFICIAL MERIT ★", cx, cy - radius * 0.48);

  // Big Bold Score Number (Auto-fitted)
  const maxScoreW = (radius - 30) * 1.5;
  setFittedFont(ctx, scoreText, radius * 0.48, 28, maxScoreW, "900");
  ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
  ctx.fillText(scoreText, cx, cy - 6);

  // Letter Grade Pill inside seal
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
  const [customNote, setCustomNote] = useState<string>("Dean's List with Highest Honors 🌟");
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

  // Draw 9:16 Vertical Story Certificate (1080 x 1920)
  const drawStoryFormat = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const margin = 50;
    drawCertificateBorders(ctx, width, height, margin, 24, activeTheme.goldColor, activeTheme.borderInner, activeTheme.isLight);

    ctx.save();
    // 1. Certificate Crest Header
    const topY = margin + 80;
    ctx.textAlign = "center";

    // Little Gold Academic Icon / Stars
    ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("★ ★ ★  ACADEMIC DISTINCTION  ★ ★ ★", width / 2, topY);

    // Primary Certificate Header
    ctx.font = "900 52px serif, Georgia, 'Times New Roman', Cambria";
    ctx.fillStyle = activeTheme.isLight ? "#1e293b" : "#ffffff";
    ctx.fillText("CERTIFICATE OF MERIT", width / 2, topY + 70);

    ctx.font = "600 22px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("OFFICIAL GRADE REPORT & SCHOLASTIC RECORD", width / 2, topY + 115);

    // Divider Line with Gold Diamond
    ctx.beginPath();
    ctx.moveTo(width / 2 - 280, topY + 150);
    ctx.lineTo(width / 2 + 280, topY + 150);
    ctx.strokeStyle = activeTheme.borderInner;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 2. Award Citation Presentation
    ctx.font = "italic 28px serif, Georgia, 'Times New Roman'";
    ctx.fillStyle = activeTheme.isLight ? "#64748b" : "#94a3b8";
    ctx.fillText("This is to officially certify excellence in the subject of", width / 2, topY + 220);

    // Big Bold Course Subject
    setFittedFont(ctx, courseName || "Academic Coursework", 60, 36, width - 200, "bold", "serif, Georgia, Cambria");
    ctx.fillStyle = activeTheme.isLight ? "#0f172a" : "#ffffff";
    ctx.fillText(courseName || "Academic Coursework", width / 2, topY + 295);

    // Student Custom Note / Motto Citation
    setFittedFont(ctx, `“ ${customNote} ”`, 26, 18, width - 220, "italic", "serif, Georgia");
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText(`“ ${customNote} ”`, width / 2, topY + 360);

    // 3. Central Embossed Gold Seal Medallion
    const sealY = topY + 620;
    const displayedScore = showPercentage ? data.scoreDisplay : "--";
    drawGoldenSealMedallion(
      ctx,
      width / 2,
      sealY,
      190,
      data.letterGrade || "A",
      displayedScore,
      activeTheme.goldColor,
      activeTheme.ribbonColor,
      activeTheme.isLight
    );

    // 4. Academic Transcript Breakdown Panel
    const panelY = sealY + 260;
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
    ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.textAlign = "left";
    ctx.fillText("VERIFIED ACADEMIC TRANSCRIPT METRICS", panelX + 35, panelY + 45);

    // Metric 1: Academic Standing
    ctx.font = "600 16px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("HONOR DISTINCTION:", panelX + 35, panelY + 95);
    const statusVal = data.statusText || (data.gpaPoint && data.gpaPoint >= 3.5 ? "Dean's List / Summa Cum Laude" : "Honors Standing");
    ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(statusVal, panelX + 35, panelY + 130);

    // Metric 2: 4.0 GPA
    ctx.font = "600 16px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("GRADE POINT AVERAGE (4.0 SCALE):", panelX + 35, panelY + 185);
    const gpaVal = showGPA && data.gpaPoint !== undefined ? `${data.gpaPoint.toFixed(2)} Quality Points` : "Verified Scale";
    ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(gpaVal, panelX + 35, panelY + 220);

    // 5. Dual Verification Signatures Block
    const sigY = panelY + panelH + 90;

    // Left Signature
    ctx.beginPath();
    ctx.moveTo(panelX + 40, sigY + 50);
    ctx.lineTo(panelX + 320, sigY + 50);
    ctx.strokeStyle = activeTheme.borderInner;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = "italic 26px serif, 'Brush Script MT', cursive, Georgia";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.textAlign = "center";
    ctx.fillText("GradeCalculator Math Engine", panelX + 180, sigY + 35);

    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("DIRECTOR OF COMPUTATION", panelX + 180, sigY + 75);

    // Right Registrar Seal Signature
    const rightSigX = panelX + panelW - 180;
    ctx.beginPath();
    ctx.moveTo(panelX + panelW - 320, sigY + 50);
    ctx.lineTo(panelX + panelW - 40, sigY + 50);
    ctx.strokeStyle = activeTheme.borderInner;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = "bold 22px serif, Georgia";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("GradeCalculator.dev", rightSigX, sigY + 35);

    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("OFFICIAL REGISTRAR SEAL", rightSigX, sigY + 75);

    // Bottom Watermark
    ctx.font = "500 16px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.isLight ? "#64748b" : "#94a3b8";
    ctx.fillText("Verified at https://gradecalculator.dev • 100% Client-Side Privacy", width / 2, height - (margin + 30));
    ctx.restore();
  };

  // Draw 1:1 Square Plaque Certificate (1080 x 1080)
  const drawSquareFormat = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const margin = 45;
    drawCertificateBorders(ctx, width, height, margin, 20, activeTheme.goldColor, activeTheme.borderInner, activeTheme.isLight);

    ctx.save();
    ctx.textAlign = "center";

    // Header
    const topY = margin + 65;
    ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("★ OFFICIAL ACADEMIC ACHIEVEMENT CERTIFICATE ★", width / 2, topY);

    ctx.font = "900 42px serif, Georgia, 'Times New Roman'";
    ctx.fillStyle = activeTheme.isLight ? "#1e293b" : "#ffffff";
    ctx.fillText("CERTIFICATE OF MERIT", width / 2, topY + 55);

    // Subject
    ctx.font = "italic 20px serif, Georgia";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("Awarded for demonstrated excellence in", width / 2, topY + 95);

    setFittedFont(ctx, courseName || "Academic Coursework", 46, 26, width - 180, "bold", "serif, Georgia");
    ctx.fillStyle = activeTheme.isLight ? "#0f172a" : "#ffffff";
    ctx.fillText(courseName || "Academic Coursework", width / 2, topY + 155);

    setFittedFont(ctx, `“ ${customNote} ”`, 20, 14, width - 200, "italic", "serif, Georgia");
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText(`“ ${customNote} ”`, width / 2, topY + 195);

    // Central Medallion Seal
    const sealY = topY + 410;
    const displayedScore = showPercentage ? data.scoreDisplay : "--";
    drawGoldenSealMedallion(
      ctx,
      width / 2,
      sealY,
      155,
      data.letterGrade || "A",
      displayedScore,
      activeTheme.goldColor,
      activeTheme.ribbonColor,
      activeTheme.isLight
    );

    // Transcript Box
    const boxY = sealY + 200;
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

    // 2 Metrics side by side
    const col1 = boxX + boxW * 0.25;
    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("ACADEMIC STANDING", col1, boxY + 32);

    const statusVal = data.statusText || (data.gpaPoint && data.gpaPoint >= 3.5 ? "Dean's List" : "Honor Roll");
    setFittedFont(ctx, statusVal, 22, 14, boxW * 0.45, "bold");
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(statusVal, col1, boxY + 68);

    const col2 = boxX + boxW * 0.75;
    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("GRADE POINT AVERAGE", col2, boxY + 32);

    const gpaVal = showGPA && data.gpaPoint !== undefined ? `${data.gpaPoint.toFixed(2)} Quality Points` : "4.0 Scale";
    setFittedFont(ctx, gpaVal, 22, 14, boxW * 0.45, "bold");
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(gpaVal, col2, boxY + 68);

    // Footer
    ctx.font = "500 14px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.isLight ? "#64748b" : "#94a3b8";
    ctx.fillText("GradeCalculator.dev • Official Verified Academic Certificate", width / 2, height - (margin + 20));
    ctx.restore();
  };

  // Draw 16:9 Landscape Diploma (1200 x 630)
  const drawWideFormat = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const margin = 40;
    drawCertificateBorders(ctx, width, height, margin, 18, activeTheme.goldColor, activeTheme.borderInner, activeTheme.isLight);

    ctx.save();
    // Left Side: Certificate Text Content
    const leftX = margin + 50;
    const contentW = width * 0.62;

    // Header
    ctx.textAlign = "left";
    ctx.font = "bold 14px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("★ OFFICIAL ACADEMIC ACHIEVEMENT CERTIFICATE ★", leftX, margin + 60);

    ctx.font = "900 40px serif, Georgia, 'Times New Roman'";
    ctx.fillStyle = activeTheme.isLight ? "#1e293b" : "#ffffff";
    ctx.fillText("CERTIFICATE OF MERIT", leftX, margin + 112);

    ctx.font = "italic 20px serif, Georgia";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("This is to certify outstanding academic mastery in", leftX, margin + 155);

    setFittedFont(ctx, courseName || "Academic Coursework", 42, 26, contentW - 40, "bold", "serif, Georgia");
    ctx.fillStyle = activeTheme.isLight ? "#0f172a" : "#ffffff";
    ctx.fillText(courseName || "Academic Coursework", leftX, margin + 210);

    setFittedFont(ctx, `“ ${customNote} ”`, 20, 14, contentW - 40, "italic", "serif, Georgia");
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText(`“ ${customNote} ”`, leftX, margin + 250);

    // Metrics Box in Wide
    const bW = contentW - 30;
    const bH = 80;
    const bY = margin + 285;
    ctx.beginPath();
    ctx.roundRect(leftX, bY, bW, bH, 12);
    ctx.fillStyle = activeTheme.isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.04)";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = activeTheme.borderInner;
    ctx.stroke();

    ctx.font = "bold 12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("HONOR DISTINCTION", leftX + 25, bY + 28);
    const statusVal = data.statusText || (data.gpaPoint && data.gpaPoint >= 3.5 ? "Dean's List" : "Honor Standing");
    ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(statusVal, leftX + 25, bY + 58);

    ctx.font = "bold 12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("4.0 GPA EQUIVALENT", leftX + bW * 0.55, bY + 28);
    const gpaVal = showGPA && data.gpaPoint !== undefined ? `${data.gpaPoint.toFixed(2)} Quality Points` : "Verified Scale";
    ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.textColor;
    ctx.fillText(gpaVal, leftX + bW * 0.55, bY + 58);

    // Signatures in Wide
    const sigY = margin + 410;
    ctx.beginPath();
    ctx.moveTo(leftX, sigY + 40);
    ctx.lineTo(leftX + 220, sigY + 40);
    ctx.strokeStyle = activeTheme.borderInner;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = "italic 20px serif, 'Brush Script MT', cursive, Georgia";
    ctx.fillStyle = activeTheme.goldColor;
    ctx.fillText("GradeCalculator Engine", leftX + 15, sigY + 28);

    ctx.font = "bold 11px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.secondaryText;
    ctx.fillText("DIRECTOR OF COMPUTATION", leftX, sigY + 60);

    // Right Side: Embossed Gold Seal
    const sealX = width - (margin + 175);
    const sealY = height / 2 - 10;
    const displayedScore = showPercentage ? data.scoreDisplay : "--";
    drawGoldenSealMedallion(
      ctx,
      sealX,
      sealY,
      145,
      data.letterGrade || "A",
      displayedScore,
      activeTheme.goldColor,
      activeTheme.ribbonColor,
      activeTheme.isLight
    );

    // Footer Watermark
    ctx.textAlign = "left";
    ctx.font = "500 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = activeTheme.isLight ? "#64748b" : "#94a3b8";
    ctx.fillText("Verified Grade Certificate • https://gradecalculator.dev", leftX, height - (margin + 20));
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

    // Subtle Certificate Watermark / Radial Glow
    ctx.save();
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.5, Math.min(width, height) * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = activeTheme.isLight
      ? "rgba(217, 119, 6, 0.04)"
      : `${activeTheme.goldColor}12`;
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
    const sanitizedTitle = courseName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "academic-certificate";
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
    const text = `I just earned an Academic Achievement Certificate on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade: ${data.letterGrade || "A"}). Calculate yours free: https://gradecalculator.dev`;
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
                text: `I just earned an Academic Achievement Certificate on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay}`,
                url: "https://gradecalculator.dev",
                files: [file],
              });
              return;
            }
            await navigator.share({
              title: "My Academic Achievement Certificate",
              text: `I just earned an Academic Achievement Certificate on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay}`,
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
      `I just earned an Academic Achievement Certificate on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade ${data.letterGrade || "A"}). Calculate yours free:`
    );
    const url = encodeURIComponent("https://gradecalculator.dev");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer");
    trackEvent("certificate_card_twitter_shared");
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `I just earned an Academic Achievement Certificate on GradeCalculator.dev! 🎓 Score: ${data.scoreDisplay} (Grade: ${data.letterGrade || "A"}). Check your grade: https://gradecalculator.dev`
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
            Generate Your Official Academic Certificate
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Personalize your authentic merit certificate with gold seals, custom course titles, and export in Story, Plaque, or Diploma formats.
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

      {/* Main Studio Grid: Left Customization | Right Certificate Canvas Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Customization Controls */}
        <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
          {/* Certificate Themes */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <Palette className="w-3.5 h-3.5 text-amber-600" />
              <span>2. Certificate Style & Foil Colors</span>
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
              <span>3. Course Subject & Honors Citation</span>
            </label>

            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">Course / Subject Name</span>
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
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">Honors Citation / Custom Motto</span>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Dean's List with Highest Honors 🌟"
                maxLength={50}
                className="w-full px-3.5 py-2 text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
              />
            </div>

            {/* Quick Citation Presets */}
            <div>
              <span className="text-[11px] font-bold text-slate-600 block mb-1.5">Quick Citation Presets:</span>
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

          {/* Download & Copy Action Buttons */}
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
                : "1200 × 630 (Official Diploma)"}
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
            🎓 Official Academic Merit Certificate powered by <strong>GradeCalculator.dev</strong>. Download as HD PNG or share to your story!
          </div>
        </div>
      </div>
    </div>
  );
}

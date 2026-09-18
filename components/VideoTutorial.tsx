"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Clock, BookOpen, FileText, ChevronDown, ChevronUp, Image as ImageIcon, Sparkles, CheckCircle2 } from "lucide-react";

interface Chapter {
  seconds: number;
  timeLabel: string;
  title: string;
  description: string;
}

const CHAPTERS: Chapter[] = [
  {
    seconds: 0,
    timeLabel: "0:00",
    title: "Overview",
    description: "Introduction to GradeCalculator.dev and the 4 core calculation suites."
  },
  {
    seconds: 4,
    timeLabel: "0:04",
    title: "Step 1: Add Scores",
    description: "Enter coursework points earned and points possible with instant real-time grade updates."
  },
  {
    seconds: 11,
    timeLabel: "0:11",
    title: "Step 2: Weighted Grades",
    description: "Calculate weighted categories (Exams 40%, Homework 30%, Projects 30%) with 100% precision."
  },
  {
    seconds: 18,
    timeLabel: "0:18",
    title: "Step 3: Final Exam Target",
    description: "Find the exact final exam score needed to achieve an A, B, or target course grade."
  },
  {
    seconds: 25,
    timeLabel: "0:25",
    title: "Step 4: College GPA",
    description: "Convert course credits and letter grades into a cumulative 4.0 semester GPA."
  },
  {
    seconds: 31,
    timeLabel: "0:31",
    title: "Step 5: Share & Export",
    description: "Generate 1-click sharing links, download PDF grade reports, or customize the grading scale."
  },
];

interface VideoTutorialProps {
  figureCaption?: string;
}

export default function VideoTutorial({ figureCaption }: VideoTutorialProps) {
  const [activeTab, setActiveTab] = useState<"video" | "infographic">("video");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (seconds: number) => {
    setActiveTab("video");
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const activeChapterIndex = CHAPTERS.slice().reverse().findIndex(ch => currentTime >= ch.seconds);
  const currentChapter = activeChapterIndex >= 0 ? CHAPTERS[CHAPTERS.length - 1 - activeChapterIndex] : CHAPTERS[0];

  return (
    <div className="space-y-6">
      {/* Media Format Switcher */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab("video")}
            className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "video"
                ? "bg-white text-indigo-600 shadow-sm border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Interactive Video Tutorial (35s)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("infographic")}
            className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "infographic"
                ? "bg-white text-indigo-600 shadow-sm border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Step-by-Step Diagram</span>
          </button>
        </div>
      </div>

      {/* Video View */}
      {activeTab === "video" && (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-950 border border-slate-200 shadow-xl shadow-slate-200/50 aspect-[16/9] w-full max-w-4xl mx-auto group">
            <video
              ref={videoRef}
              preload="none"
              controls
              playsInline
              poster="/images/how-grade-calculator-works-video-poster.webp"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={() => {
                if (videoRef.current) {
                  setCurrentTime(videoRef.current.currentTime);
                }
              }}
              className="w-full h-full object-contain"
              aria-label="How GradeCalculator.dev Works – Video Tutorial"
            >
              <source src="/videos/how-grade-calculator-works.mp4" type="video/mp4" />
              <source src="/videos/how-grade-calculator-works.webm" type="video/webm" />
              <track
                src="/videos/how-it-works-captions.vtt"
                kind="captions"
                srcLang="en"
                label="English"
                default
              />
              Your browser does not support HTML5 video playback.
            </video>

            {/* Custom Overlay Play Button (Visible before playing) */}
            {!isPlaying && (
              <div
                onClick={handlePlayClick}
                className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/30 backdrop-blur-[2px] cursor-pointer transition-opacity hover:bg-slate-900/20"
              >
                <button
                  type="button"
                  aria-label="Play Tutorial Video"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/50 transition-transform transform hover:scale-110 active:scale-95"
                >
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
                </button>
                <div className="mt-4 px-4 py-1.5 rounded-full bg-slate-900/80 text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/20 backdrop-blur-sm">
                  Watch 35s Step-by-Step Walkthrough
                </div>
              </div>
            )}
          </div>

          {/* Interactive Chapter Timeline Selector */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Jump to Step (Key Moments)</span>
              </div>
              <span className="text-xs font-medium text-slate-500">
                Current: <strong className="text-indigo-600">{currentChapter.title}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {CHAPTERS.map((chapter) => {
                const isActive = currentChapter.seconds === chapter.seconds;
                return (
                  <button
                    key={chapter.timeLabel}
                    type="button"
                    onClick={() => handleSeek(chapter.seconds)}
                    className={`text-left p-2.5 rounded-xl border transition-all ${
                      isActive
                        ? "bg-indigo-50/80 border-indigo-300 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100/80 border-slate-200/80 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className={`font-mono font-bold ${isActive ? "text-indigo-600" : "text-slate-500"}`}>
                        {chapter.timeLabel}
                      </span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                    </div>
                    <div className={`text-xs font-semibold leading-tight line-clamp-1 ${isActive ? "text-indigo-900" : "text-slate-800"}`}>
                      {chapter.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SEO Crawlable Transcript Accordion */}
          <div className="max-w-4xl mx-auto">
            <button
              type="button"
              onClick={() => setShowTranscript(!showTranscript)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors"
            >
              <span className="inline-flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Video Transcript & Step-by-Step Text Summary</span>
              </span>
              {showTranscript ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {showTranscript && (
              <div className="mt-2 p-5 bg-white rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-4 shadow-sm animate-in fade-in duration-200">
                {CHAPTERS.map((ch) => (
                  <div key={ch.timeLabel} className="flex gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => handleSeek(ch.seconds)}
                      className="font-mono text-xs font-bold text-indigo-600 hover:text-indigo-800 shrink-0 bg-indigo-50 px-2 py-1 rounded h-fit"
                    >
                      {ch.timeLabel}
                    </button>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-0.5">{ch.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{ch.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Infographic View */}
      {activeTab === "infographic" && (
        <figure className="max-w-4xl mx-auto space-y-3">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-50 to-slate-100/90 p-2 sm:p-4 border border-slate-200/90 shadow-xl shadow-slate-100">
            <img
              src="/images/how-grade-calculator-works-step-by-step-768w.webp"
              srcSet="/images/how-grade-calculator-works-step-by-step-480w.webp 480w, /images/how-grade-calculator-works-step-by-step-768w.webp 768w, /images/how-grade-calculator-works-step-by-step.webp 1024w"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 1024px"
              alt="How GradeCalculator.dev Works – Step-by-Step Grade, GPA, Weighted Average, and Final Exam Calculation Infographic"
              title="How GradeCalculator.dev Works – 6-Step Grade & GPA Calculation Workflow"
              width={1024}
              height={576}
              loading="lazy"
              decoding="async"
              className="w-full h-auto rounded-xl sm:rounded-2xl object-contain shadow-sm"
            />
          </div>
          {figureCaption && (
            <figcaption className="text-center text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
              {figureCaption}
            </figcaption>
          )}
        </figure>
      )}
    </div>
  );
}

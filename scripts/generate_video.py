import os
import sys
import math
import struct
import wave
import subprocess
from PIL import Image, ImageDraw, ImageFont

WIDTH = 1280
HEIGHT = 720
FPS = 30
DURATION = 35.0  # seconds
TOTAL_FRAMES = int(DURATION * FPS)

FONT_PATH = "/System/Library/Fonts/Helvetica.ttc"
FONT_BOLD_PATH = "/System/Library/Fonts/HelveticaNeue.ttc"

def get_font(size, bold=False):
    path = FONT_BOLD_PATH if bold else FONT_PATH
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

# Pre-load fonts
font_hero = get_font(44, bold=True)
font_title = get_font(30, bold=True)
font_subtitle = get_font(20, bold=False)
font_section = get_font(18, bold=True)
font_body = get_font(16, bold=False)
font_body_bold = get_font(16, bold=True)
font_small = get_font(13, bold=False)
font_small_bold = get_font(13, bold=True)
font_badge = get_font(12, bold=True)
font_metric = get_font(52, bold=True)
font_metric_sm = get_font(36, bold=True)

# Colors
BG_TOP = (248, 250, 252)       # slate-50
BG_BOTTOM = (241, 245, 249)    # slate-100
CARD_BG = (255, 255, 255)
BORDER_COLOR = (226, 232, 240) # slate-200
PRIMARY = (79, 70, 229)        # indigo-600
PRIMARY_LIGHT = (238, 242, 255)# indigo-50
PRIMARY_DARK = (67, 56, 202)   # indigo-700
TEXT_DARK = (15, 23, 42)       # slate-900
TEXT_MUTED = (100, 116, 139)   # slate-500
SUCCESS = (16, 185, 129)       # emerald-500
SUCCESS_BG = (236, 253, 245)   # emerald-50
ACCENT_AMBER = (245, 158, 11)   # amber-500

def draw_rounded_rect(draw, bbox, radius, fill=None, outline=None, width=1):
    x1, y1, x2, y2 = bbox
    draw.rounded_rectangle([x1, y1, x2, y2], radius=radius, fill=fill, outline=outline, width=width)

def draw_header(img, draw, current_step_label):
    # Top navigation header bar
    draw.rectangle([0, 0, WIDTH, 64], fill=(255, 255, 255))
    draw.line([0, 64, WIDTH, 64], fill=BORDER_COLOR, width=1)

    # Logo
    draw_rounded_rect(draw, (32, 14, 68, 50), radius=8, fill=PRIMARY)
    draw.text((43, 19), "GC", fill=(255, 255, 255), font=font_section)
    draw.text((78, 18), "GradeCalculator", fill=TEXT_DARK, font=get_font(22, bold=True))
    draw.text((254, 21), ".dev", fill=PRIMARY, font=get_font(18, bold=True))

    # Badge in header
    badge_w = 260
    draw_rounded_rect(draw, (WIDTH // 2 - badge_w // 2, 16, WIDTH // 2 + badge_w // 2, 48), radius=16, fill=PRIMARY_LIGHT, outline=BORDER_COLOR)
    draw.text((WIDTH // 2 - badge_w // 2 + 18, 23), current_step_label, fill=PRIMARY, font=font_small_bold)

    # Free Badge on right
    draw_rounded_rect(draw, (WIDTH - 190, 16, WIDTH - 32, 48), radius=8, fill=(241, 245, 249))
    draw.text((WIDTH - 175, 23), "100% Free • Private", fill=TEXT_MUTED, font=font_small_bold)

def draw_footer_timeline(img, draw, frame_idx):
    # Bottom chapter timeline
    bar_y = HEIGHT - 44
    draw.rectangle([0, bar_y, WIDTH, HEIGHT], fill=(255, 255, 255))
    draw.line([0, bar_y, WIDTH, bar_y], fill=BORDER_COLOR, width=1)

    # Progress bar line
    progress = frame_idx / float(TOTAL_FRAMES)
    draw.rectangle([0, bar_y - 3, int(WIDTH * progress), bar_y], fill=PRIMARY)

    # Chapters: (start_time, label)
    chapters = [
        (0.0, "1. Overview"),
        (4.0, "2. Add Scores"),
        (11.0, "3. Weighted Grades"),
        (18.0, "4. Final Exam"),
        (25.0, "5. College GPA"),
        (31.0, "6. Share & Export"),
    ]

    current_sec = frame_idx / float(FPS)
    step_width = WIDTH / len(chapters)

    for idx, (t, label) in enumerate(chapters):
        next_t = chapters[idx + 1][0] if idx + 1 < len(chapters) else DURATION
        is_active = (current_sec >= t and current_sec < next_t)
        cx = int(idx * step_width + step_width / 2)

        color = PRIMARY if is_active else TEXT_MUTED
        font = font_small_bold if is_active else font_small

        # draw small dot
        dot_r = 3 if not is_active else 4
        dot_color = PRIMARY if is_active else BORDER_COLOR
        draw.ellipse([cx - 50 - dot_r, bar_y + 22 - dot_r, cx - 50 + dot_r, bar_y + 22 + dot_r], fill=dot_color)

        draw.text((cx - 40, bar_y + 14), label, fill=color, font=font)

def create_base_frame():
    img = Image.new("RGB", (WIDTH, HEIGHT), color=BG_TOP)
    draw = ImageDraw.Draw(img)
    # Subtle background vignette
    for y in range(65, HEIGHT - 44, 4):
        alpha = (y - 65) / float(HEIGHT - 109)
        r = int(BG_TOP[0] * (1 - alpha) + BG_BOTTOM[0] * alpha)
        g = int(BG_TOP[1] * (1 - alpha) + BG_BOTTOM[1] * alpha)
        b = int(BG_TOP[2] * (1 - alpha) + BG_BOTTOM[2] * alpha)
        draw.line([0, y, WIDTH, y + 3], fill=(r, g, b))
    return img, draw

def render_frame(frame_idx):
    img, draw = create_base_frame()
    t = frame_idx / float(FPS)

    # -------------------------------------------------------------
    # SCENE 1: INTRODUCTION (0.0s - 4.0s, frames 0 - 120)
    # -------------------------------------------------------------
    if t < 4.0:
        draw_header(img, draw, "Step-by-Step Video Tutorial")

        # Main Hero Box
        card_w, card_h = 960, 480
        cx = (WIDTH - card_w) // 2
        cy = 96
        draw_rounded_rect(draw, (cx, cy, cx + card_w, cy + card_h), radius=24, fill=CARD_BG, outline=BORDER_COLOR)

        # Pulse accent circle
        pulse = math.sin(t * 4.0) * 8.0
        draw.ellipse([WIDTH // 2 - 44 - pulse, cy + 50 - pulse, WIDTH // 2 + 44 + pulse, cy + 138 + pulse], fill=PRIMARY_LIGHT)
        draw_rounded_rect(draw, (WIDTH // 2 - 36, cy + 58, WIDTH // 2 + 36, cy + 130), radius=16, fill=PRIMARY)
        draw.text((WIDTH // 2 - 20, cy + 74), "GC", fill=(255, 255, 255), font=get_font(28, bold=True))

        # Hero Title
        title_text = "How GradeCalculator.dev Works"
        draw.text((WIDTH // 2 - 310, cy + 160), title_text, fill=TEXT_DARK, font=font_hero)

        # Subtitle
        sub_text = "Calculate coursework grades, weighted categories, final exams, and 4.0 GPA in seconds."
        draw.text((WIDTH // 2 - 380, cy + 225), sub_text, fill=TEXT_MUTED, font=font_subtitle)

        # 3 Feature highlights
        feats = [
            ("Standard & Weighted", "Calculate raw points or category weights (0-100%)"),
            ("Final Exam Targets", "Find exactly what score you need to reach your goal"),
            ("4.0 GPA Conversion", "Convert letter grades (A-F) to cumulative GPA")
        ]
        feat_w = 270
        gap = 35
        start_x = cx + 45
        feat_y = cy + 295

        for f_idx, (f_title, f_desc) in enumerate(feats):
            fx = start_x + f_idx * (feat_w + gap)
            draw_rounded_rect(draw, (fx, feat_y, fx + feat_w, feat_y + 120), radius=16, fill=(248, 250, 252), outline=BORDER_COLOR)
            draw_rounded_rect(draw, (fx + 16, feat_y + 16, fx + 44, feat_y + 44), radius=8, fill=PRIMARY_LIGHT)
            draw.text((fx + 24, feat_y + 20), "✓", fill=PRIMARY, font=font_section)
            draw.text((fx + 54, feat_y + 21), f_title, fill=TEXT_DARK, font=font_section)
            # wrap desc
            words = f_desc.split(" ")
            line1 = " ".join(words[:4])
            line2 = " ".join(words[4:])
            draw.text((fx + 16, feat_y + 58), line1, fill=TEXT_MUTED, font=font_small)
            draw.text((fx + 16, feat_y + 78), line2, fill=TEXT_MUTED, font=font_small)

    # -------------------------------------------------------------
    # SCENE 2: STEP 1 – ENTER ASSIGNMENTS (4.0s - 11.0s, frames 120 - 330)
    # -------------------------------------------------------------
    elif t < 11.0:
        draw_header(img, draw, "Step 1: Enter Assignment Scores")

        local_t = t - 4.0  # 0.0 to 7.0s
        # Left card: Assignment table
        lw = 740
        lh = 510
        lx = 48
        ly = 90
        draw_rounded_rect(draw, (lx, ly, lx + lw, ly + lh), radius=20, fill=CARD_BG, outline=BORDER_COLOR)

        # Mode Selector Tabs
        draw_rounded_rect(draw, (lx + 24, ly + 20, lx + 360, ly + 62), radius=10, fill=(241, 245, 249))
        draw_rounded_rect(draw, (lx + 28, ly + 24, lx + 188, ly + 58), radius=8, fill=PRIMARY)
        draw.text((lx + 46, ly + 32), "Points (Earned / Total)", fill=(255, 255, 255), font=font_small_bold)
        draw.text((lx + 210, ly + 32), "Weighted Percentages", fill=TEXT_MUTED, font=font_small_bold)

        # Table Header
        th_y = ly + 80
        draw.line([lx + 24, th_y, lx + lw - 24, th_y], fill=BORDER_COLOR, width=1)
        draw.text((lx + 32, th_y + 10), "ASSIGNMENT NAME", fill=TEXT_MUTED, font=font_badge)
        draw.text((lx + 320, th_y + 10), "POINTS EARNED", fill=TEXT_MUTED, font=font_badge)
        draw.text((lx + 470, th_y + 10), "POINTS POSSIBLE", fill=TEXT_MUTED, font=font_badge)
        draw.text((lx + 630, th_y + 10), "GRADE", fill=TEXT_MUTED, font=font_badge)
        draw.line([lx + 24, th_y + 32, lx + lw - 24, th_y + 32], fill=BORDER_COLOR, width=1)

        # Rows data
        # Row 1 appears at 0.5s, Row 2 at 2.2s, Row 3 at 4.2s
        rows = [
            ("Midterm Exam", 85, 100, 0.5),
            ("Research Paper", 95, 100, 2.2),
            ("Weekly Quizzes", 45, 50, 4.2),
            ("Homework Set #1", 20, 20, 5.8)
        ]

        cur_pts = 0
        cur_total = 0
        r_y = th_y + 44

        for r_name, r_pts, r_max, start_time in rows:
            if local_t >= start_time:
                # typing animation
                prog = min(1.0, (local_t - start_time) / 0.8)
                char_count = int(len(r_name) * prog)
                disp_name = r_name[:char_count]
                disp_pts = str(int(r_pts * prog))
                disp_max = str(int(r_max * prog))
                pct = (r_pts / r_max * 100.0) if prog >= 1.0 else (r_pts * prog / max(1, r_max) * 100.0)

                # Row background highlight
                draw_rounded_rect(draw, (lx + 24, r_y - 6, lx + lw - 24, r_y + 46), radius=8, fill=(248, 250, 252), outline=BORDER_COLOR)
                draw.text((lx + 36, r_y + 12), disp_name, fill=TEXT_DARK, font=font_body_bold)
                
                # Input boxes
                draw_rounded_rect(draw, (lx + 320, r_y + 4, lx + 430, r_y + 36), radius=6, fill=(255, 255, 255), outline=PRIMARY if prog < 1.0 else BORDER_COLOR)
                draw.text((lx + 350, r_y + 11), disp_pts, fill=TEXT_DARK, font=font_body_bold)

                draw_rounded_rect(draw, (lx + 470, r_y + 4, lx + 580, r_y + 36), radius=6, fill=(255, 255, 255), outline=BORDER_COLOR)
                draw.text((lx + 500, r_y + 11), disp_max, fill=TEXT_DARK, font=font_body_bold)

                # Grade badge
                draw_rounded_rect(draw, (lx + 624, r_y + 6, lx + 700, r_y + 34), radius=14, fill=SUCCESS_BG)
                draw.text((lx + 636, r_y + 11), f"{pct:.1f}%", fill=SUCCESS, font=font_small_bold)

                cur_pts += int(r_pts * prog)
                cur_total += int(r_max * prog)
            r_y += 62

        # Right card: Live Summary
        rx = lx + lw + 24
        rw = WIDTH - rx - 48
        draw_rounded_rect(draw, (rx, ly, rx + rw, ly + lh), radius=20, fill=CARD_BG, outline=BORDER_COLOR)

        draw.text((rx + 24, ly + 24), "Live Grade Summary", fill=TEXT_DARK, font=font_section)
        draw.text((rx + 24, ly + 50), "Updates instantly on every keystroke", fill=TEXT_MUTED, font=font_small)

        # Big percentage badge
        draw_rounded_rect(draw, (rx + 24, ly + 85, rx + rw - 24, ly + 250), radius=16, fill=PRIMARY_LIGHT, outline=PRIMARY)
        pct_final = (cur_pts / max(1, cur_total)) * 100.0 if cur_total > 0 else 0.0
        draw.text((rx + 50, ly + 110), f"{pct_final:.1f}%", fill=PRIMARY, font=font_metric)
        letter = "A" if pct_final >= 90 else ("B" if pct_final >= 80 else "C")
        draw.text((rx + 50, ly + 180), f"Letter Grade: {letter} (4.0 Scale)", fill=PRIMARY_DARK, font=font_section)

        # Breakdown stats
        draw_rounded_rect(draw, (rx + 24, ly + 270, rx + rw - 24, ly + 475), radius=16, fill=(248, 250, 252), outline=BORDER_COLOR)
        draw.text((rx + 40, ly + 295), "Points Earned:", fill=TEXT_MUTED, font=font_body)
        draw.text((rx + 240, ly + 295), f"{cur_pts} pts", fill=TEXT_DARK, font=font_body_bold)

        draw.text((rx + 40, ly + 335), "Points Possible:", fill=TEXT_MUTED, font=font_body)
        draw.text((rx + 240, ly + 335), f"{cur_total} pts", fill=TEXT_DARK, font=font_body_bold)

        draw.text((rx + 40, ly + 375), "Academic Standing:", fill=TEXT_MUTED, font=font_body)
        draw.text((rx + 240, ly + 375), "Excellent / Honors", fill=SUCCESS, font=font_body_bold)

        draw_rounded_rect(draw, (rx + 40, ly + 418, rx + rw - 40, ly + 458), radius=8, fill=SUCCESS_BG)
        draw.text((rx + 60, ly + 428), "✓ On Track for Dean's List", fill=SUCCESS, font=font_small_bold)

    # -------------------------------------------------------------
    # SCENE 3: STEP 2 – WEIGHTED GRADES (11.0s - 18.0s, frames 330 - 540)
    # -------------------------------------------------------------
    elif t < 18.0:
        draw_header(img, draw, "Step 2: Weighted Categories Calculation")

        local_t = t - 11.0  # 0.0 to 7.0s
        lw = 740
        lh = 510
        lx = 48
        ly = 90
        draw_rounded_rect(draw, (lx, ly, lx + lw, ly + lh), radius=20, fill=CARD_BG, outline=BORDER_COLOR)

        # Mode Selector Tabs (Weighted highlighted)
        draw_rounded_rect(draw, (lx + 24, ly + 20, lx + 360, ly + 62), radius=10, fill=(241, 245, 249))
        draw.text((lx + 46, ly + 32), "Points (Earned / Total)", fill=TEXT_MUTED, font=font_small_bold)
        draw_rounded_rect(draw, (lx + 192, ly + 24, lx + 356, ly + 58), radius=8, fill=PRIMARY)
        draw.text((lx + 208, ly + 32), "Weighted Percentages", fill=(255, 255, 255), font=font_small_bold)

        # Table Header
        th_y = ly + 80
        draw.line([lx + 24, th_y, lx + lw - 24, th_y], fill=BORDER_COLOR, width=1)
        draw.text((lx + 32, th_y + 10), "CATEGORY NAME", fill=TEXT_MUTED, font=font_badge)
        draw.text((lx + 280, th_y + 10), "WEIGHT (%)", fill=TEXT_MUTED, font=font_badge)
        draw.text((lx + 440, th_y + 10), "SCORE (%)", fill=TEXT_MUTED, font=font_badge)
        draw.text((lx + 600, th_y + 10), "CONTRIBUTION", fill=TEXT_MUTED, font=font_badge)
        draw.line([lx + 24, th_y + 32, lx + lw - 24, th_y + 32], fill=BORDER_COLOR, width=1)

        w_rows = [
            ("Major Exams & Midterms", 40, 88.0, 0.4),
            ("Homework & Assignments", 30, 96.0, 2.0),
            ("Term Project & Labs", 20, 92.0, 3.6),
            ("Class Participation", 10, 95.0, 5.0),
        ]

        cur_weight = 0
        cur_contrib = 0.0
        r_y = th_y + 44

        for cat_name, cat_w, cat_s, st in w_rows:
            if local_t >= st:
                prog = min(1.0, (local_t - st) / 0.7)
                disp_w = int(cat_w * prog)
                disp_s = cat_s * prog
                contrib = (cat_w * prog * (cat_s * prog)) / 100.0

                draw_rounded_rect(draw, (lx + 24, r_y - 6, lx + lw - 24, r_y + 46), radius=8, fill=(248, 250, 252), outline=BORDER_COLOR)
                draw.text((lx + 36, r_y + 12), cat_name, fill=TEXT_DARK, font=font_body_bold)

                # Weight box
                draw_rounded_rect(draw, (lx + 280, r_y + 4, lx + 390, r_y + 36), radius=6, fill=(255, 255, 255), outline=PRIMARY)
                draw.text((lx + 315, r_y + 11), f"{disp_w}%", fill=PRIMARY, font=font_body_bold)

                # Score box
                draw_rounded_rect(draw, (lx + 440, r_y + 4, lx + 550, r_y + 36), radius=6, fill=(255, 255, 255), outline=BORDER_COLOR)
                draw.text((lx + 470, r_y + 11), f"{disp_s:.1f}%", fill=TEXT_DARK, font=font_body_bold)

                # Contribution
                draw.text((lx + 610, r_y + 12), f"+{contrib:.2f}%", fill=SUCCESS, font=font_body_bold)

                cur_weight += disp_w
                cur_contrib += contrib
            r_y += 62

        # Formula callout at bottom of left card
        draw_rounded_rect(draw, (lx + 24, ly + lh - 72, lx + lw - 24, ly + lh - 18), radius=10, fill=PRIMARY_LIGHT)
        draw.text((lx + 40, ly + lh - 52), "Formula: Weighted Grade = Σ(Category Weight × Category Score) / Total Weight", fill=PRIMARY_DARK, font=font_small_bold)

        # Right card: Weighted Results
        rx = lx + lw + 24
        rw = WIDTH - rx - 48
        draw_rounded_rect(draw, (rx, ly, rx + rw, ly + lh), radius=20, fill=CARD_BG, outline=BORDER_COLOR)

        draw.text((rx + 24, ly + 24), "Weighted Grade Result", fill=TEXT_DARK, font=font_section)
        draw.text((rx + 24, ly + 50), "All 4 categories factored", fill=TEXT_MUTED, font=font_small)

        # Big percentage badge
        draw_rounded_rect(draw, (rx + 24, ly + 85, rx + rw - 24, ly + 250), radius=16, fill=PRIMARY_LIGHT, outline=PRIMARY)
        draw.text((rx + 50, ly + 110), f"{cur_contrib:.2f}%", fill=PRIMARY, font=font_metric)
        draw.text((rx + 50, ly + 180), "Grade: A (Superior Standing)", fill=PRIMARY_DARK, font=font_section)

        # Weight validation box
        draw_rounded_rect(draw, (rx + 24, ly + 270, rx + rw - 24, ly + 475), radius=16, fill=(248, 250, 252), outline=BORDER_COLOR)
        draw.text((rx + 40, ly + 295), "Total Weight Tallied:", fill=TEXT_MUTED, font=font_body)
        draw.text((rx + 240, ly + 295), f"{cur_weight}% / 100%", fill=SUCCESS if cur_weight == 100 else PRIMARY, font=font_body_bold)

        draw.text((rx + 40, ly + 335), "Quality Factor:", fill=TEXT_MUTED, font=font_body)
        draw.text((rx + 240, ly + 335), "4.00 Grade Pts", fill=TEXT_DARK, font=font_body_bold)

        draw.text((rx + 40, ly + 375), "Category Balance:", fill=TEXT_MUTED, font=font_body)
        draw.text((rx + 240, ly + 375), "100% Complete", fill=SUCCESS, font=font_body_bold)

        draw_rounded_rect(draw, (rx + 40, ly + 418, rx + rw - 40, ly + 458), radius=8, fill=SUCCESS_BG)
        draw.text((rx + 60, ly + 428), "✓ Category Weights Valid (100%)", fill=SUCCESS, font=font_small_bold)

    # -------------------------------------------------------------
    # SCENE 4: STEP 3 – FINAL EXAM TARGET (18.0s - 25.0s, frames 540 - 750)
    # -------------------------------------------------------------
    elif t < 25.0:
        draw_header(img, draw, "Step 3: Final Exam Target Calculator")

        local_t = t - 18.0  # 0.0 to 7.0s
        lw = 680
        lh = 510
        lx = 48
        ly = 90
        draw_rounded_rect(draw, (lx, ly, lx + lw, ly + lh), radius=20, fill=CARD_BG, outline=BORDER_COLOR)

        draw.text((lx + 32, ly + 28), "What score do you need on the Final Exam?", fill=TEXT_DARK, font=get_font(22, bold=True))
        draw.text((lx + 32, ly + 58), "Calculate the exact exam grade required to achieve your course goal.", fill=TEXT_MUTED, font=font_small)

        # Inputs
        inputs = [
            ("Current Course Grade (%)", "86.5%", "Your standing in the class before the exam", 0.5),
            ("Desired Target Grade (%)", "90.0% (A)", "The minimum grade you want to secure", 1.8),
            ("Final Exam Weight (%)", "25.0%", "Percentage of final grade the exam is worth", 3.2),
        ]

        iy = ly + 105
        for lbl, val, desc, st in inputs:
            prog = min(1.0, max(0.0, (local_t - st) / 0.8))
            draw_rounded_rect(draw, (lx + 32, iy, lx + lw - 32, iy + 84), radius=12, fill=(248, 250, 252), outline=PRIMARY if prog > 0 and prog < 1 else BORDER_COLOR)
            draw.text((lx + 48, iy + 16), lbl, fill=TEXT_DARK, font=font_body_bold)
            draw.text((lx + 48, iy + 44), desc, fill=TEXT_MUTED, font=font_small)

            # input pill
            draw_rounded_rect(draw, (lx + lw - 190, iy + 20, lx + lw - 48, iy + 64), radius=8, fill=(255, 255, 255), outline=PRIMARY)
            disp_val = val if prog >= 1.0 else (val[:int(len(val)*prog)])
            draw.text((lx + lw - 165, iy + 30), disp_val, fill=PRIMARY, font=font_body_bold)
            iy += 98

        # Target formula
        draw_rounded_rect(draw, (lx + 32, iy + 10, lx + lw - 32, iy + 60), radius=10, fill=PRIMARY_LIGHT)
        draw.text((lx + 50, iy + 24), "Formula: Required = (Target - Current × (1 - Weight)) / Weight", fill=PRIMARY_DARK, font=font_small_bold)

        # Right card: Final Exam Target Result
        rx = lx + lw + 24
        rw = WIDTH - rx - 48
        draw_rounded_rect(draw, (rx, ly, rx + rw, ly + lh), radius=20, fill=CARD_BG, outline=BORDER_COLOR)

        draw.text((rx + 24, ly + 24), "Exam Target Score", fill=TEXT_DARK, font=font_section)
        draw.text((rx + 24, ly + 50), "Exact score to guarantee an A", fill=TEXT_MUTED, font=font_small)

        # Result box in vibrant emerald green
        draw_rounded_rect(draw, (rx + 24, ly + 85, rx + rw - 24, ly + 240), radius=16, fill=SUCCESS_BG, outline=SUCCESS)
        draw.text((rx + 50, ly + 105), "100.5%", fill=SUCCESS, font=font_metric)
        draw.text((rx + 50, ly + 175), "Required on Final Exam", fill=SUCCESS, font=font_section)

        # What-If scenarios table
        draw_rounded_rect(draw, (rx + 24, ly + 260, rx + rw - 24, ly + 475), radius=16, fill=(248, 250, 252), outline=BORDER_COLOR)
        draw.text((rx + 36, ly + 280), "TARGET SCENARIOS", fill=TEXT_MUTED, font=font_badge)

        scenarios = [
            ("To get an A (90%)", "100.5% required"),
            ("To get an A- (85%)", "80.5% required"),
            ("To get a B+ (80%)", "60.5% required"),
            ("To get a B (75%)", "40.5% required"),
        ]
        sy = ly + 310
        for s_title, s_req in scenarios:
            draw.text((rx + 36, sy), s_title, fill=TEXT_DARK, font=font_small_bold)
            draw.text((rx + 210, sy), s_req, fill=PRIMARY if "80" in s_req or "60" in s_req else TEXT_MUTED, font=font_small_bold)
            sy += 36

    # -------------------------------------------------------------
    # SCENE 5: STEP 4 – GPA & COLLEGE SCALE (25.0s - 31.0s, frames 750 - 930)
    # -------------------------------------------------------------
    elif t < 31.0:
        draw_header(img, draw, "Step 4: Cumulative & Semester GPA Calculation")

        local_t = t - 25.0  # 0.0 to 6.0s
        lw = 740
        lh = 510
        lx = 48
        ly = 90
        draw_rounded_rect(draw, (lx, ly, lx + lw, ly + lh), radius=20, fill=CARD_BG, outline=BORDER_COLOR)

        draw.text((lx + 32, ly + 24), "College Coursework & Quality Points", fill=TEXT_DARK, font=get_font(22, bold=True))
        draw.text((lx + 32, ly + 52), "Standard 4.0 GPA scale with honors / credit weighting.", fill=TEXT_MUTED, font=font_small)

        # Header
        th_y = ly + 80
        draw.line([lx + 24, th_y, lx + lw - 24, th_y], fill=BORDER_COLOR, width=1)
        draw.text((lx + 36, th_y + 10), "COURSE NAME", fill=TEXT_MUTED, font=font_badge)
        draw.text((lx + 280, th_y + 10), "CREDITS", fill=TEXT_MUTED, font=font_badge)
        draw.text((lx + 400, th_y + 10), "LETTER GRADE", fill=TEXT_MUTED, font=font_badge)
        draw.text((lx + 560, th_y + 10), "QUALITY POINTS", fill=TEXT_MUTED, font=font_badge)
        draw.line([lx + 24, th_y + 32, lx + lw - 24, th_y + 32], fill=BORDER_COLOR, width=1)

        courses = [
            ("Biology 101: Cell Biology", 3, "A", 4.0, 12.0),
            ("Calculus I: Differential", 4, "B+", 3.3, 13.2),
            ("World Literature 201", 3, "A-", 3.7, 11.1),
            ("Organic Chemistry Lab", 1, "A", 4.0, 4.0),
        ]

        r_y = th_y + 44
        total_creds = 0
        total_qp = 0.0

        for c_name, c_creds, c_let, c_gp, c_qp in courses:
            draw_rounded_rect(draw, (lx + 24, r_y - 6, lx + lw - 24, r_y + 46), radius=8, fill=(248, 250, 252), outline=BORDER_COLOR)
            draw.text((lx + 36, r_y + 12), c_name, fill=TEXT_DARK, font=font_body_bold)

            # credits
            draw_rounded_rect(draw, (lx + 280, r_y + 4, lx + 360, r_y + 36), radius=6, fill=(255, 255, 255), outline=BORDER_COLOR)
            draw.text((lx + 310, r_y + 11), f"{c_creds}", fill=TEXT_DARK, font=font_body_bold)

            # letter grade pill
            draw_rounded_rect(draw, (lx + 400, r_y + 4, lx + 490, r_y + 36), radius=6, fill=PRIMARY_LIGHT, outline=PRIMARY)
            draw.text((lx + 425, r_y + 11), f"{c_let} ({c_gp})", fill=PRIMARY, font=font_small_bold)

            # quality points
            draw.text((lx + 580, r_y + 12), f"{c_qp:.1f} pts", fill=SUCCESS, font=font_body_bold)

            total_creds += c_creds
            total_qp += c_qp
            r_y += 62

        # Bottom GPA formula
        draw_rounded_rect(draw, (lx + 24, ly + lh - 72, lx + lw - 24, ly + lh - 18), radius=10, fill=PRIMARY_LIGHT)
        draw.text((lx + 40, ly + lh - 52), "GPA Formula = Total Quality Points (40.3) ÷ Total Credit Hours (11) = 3.66 GPA", fill=PRIMARY_DARK, font=font_small_bold)

        # Right card: GPA Summary
        rx = lx + lw + 24
        rw = WIDTH - rx - 48
        draw_rounded_rect(draw, (rx, ly, rx + rw, ly + lh), radius=20, fill=CARD_BG, outline=BORDER_COLOR)

        draw.text((rx + 24, ly + 24), "Semester GPA Result", fill=TEXT_DARK, font=font_section)
        draw.text((rx + 24, ly + 50), "Standard 4.0 Collegiate Scale", fill=TEXT_MUTED, font=font_small)

        # Big GPA Display
        draw_rounded_rect(draw, (rx + 24, ly + 85, rx + rw - 24, ly + 240), radius=16, fill=PRIMARY_LIGHT, outline=PRIMARY)
        draw.text((rx + 50, ly + 105), "3.66", fill=PRIMARY, font=font_metric)
        draw.text((rx + 50, ly + 175), "Cumulative Grade Point Average", fill=PRIMARY_DARK, font=font_small_bold)

        # Academic honor standing
        draw_rounded_rect(draw, (rx + 24, ly + 260, rx + rw - 24, ly + 475), radius=16, fill=(248, 250, 252), outline=BORDER_COLOR)
        draw.text((rx + 40, ly + 285), "Total Credit Hours:", fill=TEXT_MUTED, font=font_body)
        draw.text((rx + 230, ly + 285), "11 Credits", fill=TEXT_DARK, font=font_body_bold)

        draw.text((rx + 40, ly + 325), "Total Quality Pts:", fill=TEXT_MUTED, font=font_body)
        draw.text((rx + 230, ly + 325), "40.30", fill=TEXT_DARK, font=font_body_bold)

        draw.text((rx + 40, ly + 365), "Honors Standing:", fill=TEXT_MUTED, font=font_body)
        draw.text((rx + 230, ly + 365), "Magna Cum Laude", fill=SUCCESS, font=font_body_bold)

        draw_rounded_rect(draw, (rx + 40, ly + 415, rx + rw - 40, ly + 455), radius=8, fill=SUCCESS_BG)
        draw.text((rx + 70, ly + 425), "✓ Dean's List Qualified", fill=SUCCESS, font=font_small_bold)

    # -------------------------------------------------------------
    # SCENE 6: STEP 5 – SHARE & OUTRO (31.0s - 35.0s, frames 930 - 1050)
    # -------------------------------------------------------------
    else:
        draw_header(img, draw, "Step 5: Share, Export & Save Instantly")

        card_w, card_h = 960, 480
        cx = (WIDTH - card_w) // 2
        cy = 96
        draw_rounded_rect(draw, (cx, cy, cx + card_w, cy + card_h), radius=24, fill=CARD_BG, outline=BORDER_COLOR)

        # Outro Icon
        draw_rounded_rect(draw, (WIDTH // 2 - 40, cy + 40, WIDTH // 2 + 40, cy + 120), radius=20, fill=PRIMARY)
        draw.text((WIDTH // 2 - 24, cy + 56), "GC", fill=(255, 255, 255), font=get_font(32, bold=True))

        # Heading
        draw.text((WIDTH // 2 - 340, cy + 145), "Start Calculating Your Grades Now", fill=TEXT_DARK, font=font_hero)
        draw.text((WIDTH // 2 - 300, cy + 210), "Everything is instant, free, and calculated directly in your browser.", fill=TEXT_MUTED, font=font_subtitle)

        # 3 Action Buttons / Features
        actions = [
            ("1-Click Sharing", "Generate a permanent link to share your grades with teachers or advisors."),
            ("PDF / Print Ready", "Export professional grade breakdown reports with one tap."),
            ("39 Languages Supported", "Fully optimized and accessible worldwide with instant recalculation.")
        ]
        act_w = 265
        gap = 35
        start_x = cx + 50
        act_y = cy + 265

        for a_idx, (a_title, a_desc) in enumerate(actions):
            ax = start_x + a_idx * (act_w + gap)
            draw_rounded_rect(draw, (ax, act_y, ax + act_w, act_y + 115), radius=16, fill=(248, 250, 252), outline=BORDER_COLOR)
            draw_rounded_rect(draw, (ax + 16, act_y + 16, ax + 40, act_y + 40), radius=6, fill=PRIMARY_LIGHT)
            draw.text((ax + 22, act_y + 18), "★", fill=PRIMARY, font=font_small_bold)
            draw.text((ax + 48, act_y + 20), a_title, fill=TEXT_DARK, font=font_section)
            words = a_desc.split(" ")
            draw.text((ax + 16, act_y + 52), " ".join(words[:4]), fill=TEXT_MUTED, font=font_small)
            draw.text((ax + 16, act_y + 72), " ".join(words[4:]), fill=TEXT_MUTED, font=font_small)

        # Final URL badge
        draw_rounded_rect(draw, (WIDTH // 2 - 200, cy + 400, WIDTH // 2 + 200, cy + 450), radius=25, fill=PRIMARY)
        draw.text((WIDTH // 2 - 130, cy + 414), "Visit GradeCalculator.dev", fill=(255, 255, 255), font=get_font(20, bold=True))

    draw_footer_timeline(img, draw, frame_idx)
    return img

def generate_video():
    ffmpeg_bin = "/private/tmp/ffmpeg-test/node_modules/@ffmpeg-installer/darwin-arm64/ffmpeg"
    mp4_out = "public/videos/how-grade-calculator-works.mp4"
    webm_out = "public/videos/how-grade-calculator-works.webm"
    poster_out = "public/images/how-grade-calculator-works-video-poster.webp"
    audio_file = "/tmp/bg_audio.wav"

    print("Generating poster thumbnail...")
    # Frame 60 (2 seconds in, high energy title) or Frame 220 (Step 1 with data)
    poster_img = render_frame(220)
    poster_img.save(poster_out, "WEBP", quality=90)
    print(f"Poster saved to {poster_out}")

    print("Encoding MP4 video (H.264 + AAC)...")
    cmd_mp4 = [
        ffmpeg_bin, "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "pipe:0",
        "-i", audio_file,
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "22",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "128k",
        "-shortest",
        "-movflags", "+faststart",
        mp4_out
    ]

    proc_mp4 = subprocess.Popen(cmd_mp4, stdin=subprocess.PIPE, stderr=subprocess.PIPE)

    for idx in range(TOTAL_FRAMES):
        if idx % 90 == 0:
            print(f"Rendering frame {idx}/{TOTAL_FRAMES} ({(idx/TOTAL_FRAMES)*100:.1f}%)...")
        frame = render_frame(idx)
        proc_mp4.stdin.write(frame.tobytes())

    proc_mp4.stdin.close()
    proc_mp4.wait()
    print(f"MP4 generated successfully: {mp4_out} (Exit code: {proc_mp4.returncode})")

    print("Encoding WebM video (VP8 + Vorbis)...")
    cmd_webm = [
        ffmpeg_bin, "-y",
        "-i", mp4_out,
        "-c:v", "libvpx",
        "-b:v", "900k",
        "-c:a", "libvorbis",
        webm_out
    ]
    res_webm = subprocess.run(cmd_webm, capture_output=True)
    print(f"WebM generated successfully: {webm_out} (Exit code: {res_webm.returncode})")

if __name__ == "__main__":
    generate_video()

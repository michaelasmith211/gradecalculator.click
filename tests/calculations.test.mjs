import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Test implementation in pure JS mirroring TypeScript logic to run via node --test
function getLetterGrade(percentage) {
  if (isNaN(percentage)) return { letter: "N/A", gpaPoint: 0.0 };
  if (percentage >= 97) return { letter: "A+", gpaPoint: 4.0 };
  if (percentage >= 93) return { letter: "A", gpaPoint: 4.0 };
  if (percentage >= 90) return { letter: "A-", gpaPoint: 3.7 };
  if (percentage >= 87) return { letter: "B+", gpaPoint: 3.3 };
  if (percentage >= 83) return { letter: "B", gpaPoint: 3.0 };
  if (percentage >= 80) return { letter: "B-", gpaPoint: 2.7 };
  if (percentage >= 77) return { letter: "C+", gpaPoint: 2.3 };
  if (percentage >= 73) return { letter: "C", gpaPoint: 2.0 };
  if (percentage >= 70) return { letter: "C-", gpaPoint: 1.7 };
  if (percentage >= 67) return { letter: "D+", gpaPoint: 1.3 };
  if (percentage >= 63) return { letter: "D", gpaPoint: 1.0 };
  if (percentage >= 60) return { letter: "D-", gpaPoint: 0.7 };
  return { letter: "F", gpaPoint: 0.0 };
}

function calculatePointsGrade(items) {
  let earned = 0, total = 0, count = 0;
  for (const item of items) {
    const e = parseFloat(item.earned);
    const t = parseFloat(item.total);
    if (!isNaN(e) && !isNaN(t) && t > 0) {
      earned += e;
      total += t;
      count++;
    }
  }
  if (total === 0 || count === 0) return { percentage: 0, letter: "N/A" };
  const percentage = Math.round((earned / total) * 100 * 100) / 100;
  return { earned, total, percentage, letter: getLetterGrade(percentage).letter };
}

function calculateFinalExamNeeded(current, desired, weight) {
  const w = weight / 100;
  const req = (desired - (current * (1 - w))) / w;
  return Math.round(req * 100) / 100;
}

function calculateWeightedGrade(categories) {
  let totalW = 0, weightedSum = 0;
  for (const cat of categories) {
    const s = parseFloat(cat.score);
    const w = parseFloat(cat.weight);
    if (!isNaN(s) && !isNaN(w) && w > 0) {
      totalW += w;
      weightedSum += (s * w) / 100;
    }
  }
  if (totalW === 0) return { percentage: 0, letter: "N/A" };
  const percent = Math.round(((weightedSum / totalW) * 100) * 100) / 100;
  return { totalWeight: totalW, percentage: percent, letter: getLetterGrade(percent).letter };
}

function calculateGPA(courses) {
  const points = { "A+": 4.0, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "D-": 0.7, "F": 0.0 };
  let credits = 0, qualityPts = 0;
  for (const c of courses) {
    const cred = parseFloat(c.credits);
    const base = points[c.grade];
    if (!isNaN(cred) && cred > 0 && base !== undefined) {
      const bonus = c.level === "honors" ? 0.5 : (c.level === "ap_ib" ? 1.0 : 0);
      const val = base > 0 ? base + bonus : 0;
      credits += cred;
      qualityPts += val * cred;
    }
  }
  if (credits === 0) return 0;
  return Math.round((qualityPts / credits) * 100) / 100;
}

describe('Grade Calculations Unit Tests', () => {
  it('calculates standard assignment points correctly', () => {
    const items = [
      { earned: 85, total: 100 },
      { earned: 92, total: 100 },
      { earned: 78, total: 100 },
    ];
    const res = calculatePointsGrade(items);
    assert.equal(res.earned, 255);
    assert.equal(res.total, 300);
    assert.equal(res.percentage, 85);
    assert.equal(res.letter, 'B');
  });

  it('calculates final exam score needed accurately', () => {
    // Current 85%, Desired 90%, Final Exam Weight 20%
    // Required = (90 - 85 * 0.8) / 0.2 = (90 - 68) / 0.2 = 22 / 0.2 = 110%
    const needed = calculateFinalExamNeeded(85, 90, 20);
    assert.equal(needed, 110);

    // Current 88%, Desired 80%, Final Exam Weight 25%
    // Required = (80 - 88 * 0.75) / 0.25 = (80 - 66) / 0.25 = 14 / 0.25 = 56%
    const needed2 = calculateFinalExamNeeded(88, 80, 25);
    assert.equal(needed2, 56);
  });

  it('calculates weighted category grade correctly', () => {
    const categories = [
      { name: 'Homework', score: 95, weight: 20 },
      { name: 'Quizzes', score: 80, weight: 20 },
      { name: 'Midterm', score: 85, weight: 25 },
      { name: 'Final Exam', score: 90, weight: 35 },
    ];
    // 95*0.2 + 80*0.2 + 85*0.25 + 90*0.35 = 19 + 16 + 21.25 + 31.5 = 87.75% -> B+
    const res = calculateWeightedGrade(categories);
    assert.equal(res.totalWeight, 100);
    assert.equal(res.percentage, 87.75);
    assert.equal(res.letter, 'B+');
  });

  it('calculates 4.0 GPA accurately', () => {
    const courses = [
      { name: 'Math', grade: 'A', credits: 4 },
      { name: 'English', grade: 'B', credits: 3 },
      { name: 'Physics', grade: 'A-', credits: 4 },
      { name: 'History', grade: 'B+', credits: 3 },
    ];
    // Math: 4*4 = 16, English: 3*3 = 9, Physics: 3.7*4 = 14.8, History: 3.3*3 = 9.9
    // Total QP: 16 + 9 + 14.8 + 9.9 = 49.7 / 14 credits = 3.55
    const gpa = calculateGPA(courses);
    assert.equal(gpa, 3.55);
  });

  it('calculates weighted AP/Honors GPA accurately', () => {
    const courses = [
      { name: 'AP Calculus', grade: 'A', credits: 1, level: 'ap_ib' }, // 4.0 + 1.0 = 5.0
      { name: 'Honors Chemistry', grade: 'A', credits: 1, level: 'honors' }, // 4.0 + 0.5 = 4.5
      { name: 'Regular English', grade: 'A', credits: 1, level: 'regular' }, // 4.0
    ];
    // (5.0 + 4.5 + 4.0) / 3 = 13.5 / 3 = 4.5
    const gpa = calculateGPA(courses);
    assert.equal(gpa, 4.5);
  });
});

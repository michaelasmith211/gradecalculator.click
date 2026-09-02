export interface GPACourseItem {
  id: string;
  name: string;
  grade: string; // Letter grade e.g. "A", "B+", etc.
  credits: number | string; // e.g. 3 or 4
  level?: "regular" | "honors" | "ap_ib" | "college"; // course weight modifier
}

export const LETTER_GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "D-": 0.7,
  "F": 0.0,
};

export interface GPAResult {
  gpa: number;
  unweightedGpa: number;
  totalCredits: number;
  totalQualityPoints: number;
  validCourseCount: number;
  academicStanding: string;
  courseBreakdown: {
    id: string;
    name: string;
    grade: string;
    credits: number;
    basePoints: number;
    weightedPoints: number;
    totalQualityPoints: number;
  }[];
  cumulativeGpa?: number;
  cumulativeCredits?: number;
}

/**
 * Calculates GPA, Quality Points, and Weighted GPA for High School & College.
 */
export function calculateGPA(
  courses: GPACourseItem[],
  priorGpa?: number | string,
  priorCredits?: number | string
): GPAResult {
  let totalCredits = 0;
  let totalQualityPoints = 0;
  let totalUnweightedQualityPoints = 0;
  let validCount = 0;

  const courseBreakdown = [];

  for (const course of courses) {
    const creds = typeof course.credits === "number" ? course.credits : parseFloat(course.credits as string);
    const basePts = LETTER_GRADE_POINTS[course.grade.toUpperCase()] ?? null;

    if (!isNaN(creds) && creds > 0 && basePts !== null) {
      // Calculate weight modifier
      let weightBonus = 0;
      if (course.level === "honors") weightBonus = 0.5;
      else if (course.level === "ap_ib" || course.level === "college") weightBonus = 1.0;

      const weightedPts = basePts > 0 ? basePts + weightBonus : 0; // F usually receives no bonus
      const qualityPts = weightedPts * creds;
      const unweightedQualityPts = basePts * creds;

      totalCredits += creds;
      totalQualityPoints += qualityPts;
      totalUnweightedQualityPoints += unweightedQualityPts;
      validCount++;

      courseBreakdown.push({
        id: course.id,
        name: course.name || `Course ${validCount}`,
        grade: course.grade.toUpperCase(),
        credits: creds,
        basePoints: basePts,
        weightedPoints: weightedPts,
        totalQualityPoints: Math.round(qualityPts * 100) / 100,
      });
    }
  }

  if (totalCredits === 0 || validCount === 0) {
    return {
      gpa: 0,
      unweightedGpa: 0,
      totalCredits: 0,
      totalQualityPoints: 0,
      validCourseCount: 0,
      academicStanding: "No courses entered",
      courseBreakdown: [],
    };
  }

  const gpa = totalQualityPoints / totalCredits;
  const unweightedGpa = totalUnweightedQualityPoints / totalCredits;

  let academicStanding = "Good Standing";
  if (gpa >= 3.8) academicStanding = "Dean's List / Summa Cum Laude Honors";
  else if (gpa >= 3.5) academicStanding = "Dean's List / Magna Cum Laude Honors";
  else if (gpa >= 3.0) academicStanding = "Dean's List / Cum Laude Standing";
  else if (gpa >= 2.0) academicStanding = "Good Academic Standing";
  else academicStanding = "Academic Probation / Needs Improvement";

  const result: GPAResult = {
    gpa: Math.round(gpa * 100) / 100,
    unweightedGpa: Math.round(unweightedGpa * 100) / 100,
    totalCredits: Math.round(totalCredits * 10) / 10,
    totalQualityPoints: Math.round(totalQualityPoints * 100) / 100,
    validCourseCount: validCount,
    academicStanding,
    courseBreakdown,
  };

  // Check cumulative combination
  const priorGpaNum = typeof priorGpa === "number" ? priorGpa : parseFloat(priorGpa as string);
  const priorCreditsNum = typeof priorCredits === "number" ? priorCredits : parseFloat(priorCredits as string);

  if (!isNaN(priorGpaNum) && !isNaN(priorCreditsNum) && priorCreditsNum > 0) {
    const priorQualityPoints = priorGpaNum * priorCreditsNum;
    const combinedCredits = totalCredits + priorCreditsNum;
    const combinedQualityPoints = totalQualityPoints + priorQualityPoints;
    const cumulativeGpa = combinedQualityPoints / combinedCredits;

    result.cumulativeGpa = Math.round(cumulativeGpa * 100) / 100;
    result.cumulativeCredits = Math.round(combinedCredits * 10) / 10;
  }

  return result;
}

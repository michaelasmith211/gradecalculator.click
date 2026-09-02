export interface GradeCutoff {
  letter: string;
  minPercent: number;
  gpaPoint: number;
  description: string;
}

export const DEFAULT_GRADE_SCALE: GradeCutoff[] = [
  { letter: "A+", minPercent: 97, gpaPoint: 4.0, description: "Excellent / Superior" },
  { letter: "A", minPercent: 93, gpaPoint: 4.0, description: "Excellent" },
  { letter: "A-", minPercent: 90, gpaPoint: 3.7, description: "Very Good" },
  { letter: "B+", minPercent: 87, gpaPoint: 3.3, description: "Good / Above Average" },
  { letter: "B", minPercent: 83, gpaPoint: 3.0, description: "Good" },
  { letter: "B-", minPercent: 80, gpaPoint: 2.7, description: "Above Average" },
  { letter: "C+", minPercent: 77, gpaPoint: 2.3, description: "Average / Competent" },
  { letter: "C", minPercent: 73, gpaPoint: 2.0, description: "Average" },
  { letter: "C-", minPercent: 70, gpaPoint: 1.7, description: "Below Average" },
  { letter: "D+", minPercent: 67, gpaPoint: 1.3, description: "Passing / Needs Work" },
  { letter: "D", minPercent: 63, gpaPoint: 1.0, description: "Passing" },
  { letter: "D-", minPercent: 60, gpaPoint: 0.7, description: "Minimum Passing" },
  { letter: "F", minPercent: 0, gpaPoint: 0.0, description: "Failing" },
];

export const STANDARD_10_POINT_SCALE: GradeCutoff[] = [
  { letter: "A", minPercent: 90, gpaPoint: 4.0, description: "Excellent" },
  { letter: "B", minPercent: 80, gpaPoint: 3.0, description: "Good" },
  { letter: "C", minPercent: 70, gpaPoint: 2.0, description: "Average" },
  { letter: "D", minPercent: 60, gpaPoint: 1.0, description: "Below Average" },
  { letter: "F", minPercent: 0, gpaPoint: 0.0, description: "Failing" },
];

export const STRICT_7_POINT_SCALE: GradeCutoff[] = [
  { letter: "A+", minPercent: 98, gpaPoint: 4.0, description: "Superior" },
  { letter: "A", minPercent: 95, gpaPoint: 4.0, description: "Excellent" },
  { letter: "A-", minPercent: 93, gpaPoint: 3.7, description: "Very Good" },
  { letter: "B+", minPercent: 90, gpaPoint: 3.3, description: "Good" },
  { letter: "B", minPercent: 87, gpaPoint: 3.0, description: "Above Average" },
  { letter: "B-", minPercent: 85, gpaPoint: 2.7, description: "Above Average" },
  { letter: "C+", minPercent: 82, gpaPoint: 2.3, description: "Average" },
  { letter: "C", minPercent: 79, gpaPoint: 2.0, description: "Average" },
  { letter: "C-", minPercent: 77, gpaPoint: 1.7, description: "Below Average" },
  { letter: "D+", minPercent: 75, gpaPoint: 1.3, description: "Passing" },
  { letter: "D", minPercent: 72, gpaPoint: 1.0, description: "Passing" },
  { letter: "D-", minPercent: 70, gpaPoint: 0.7, description: "Minimum Passing" },
  { letter: "F", minPercent: 0, gpaPoint: 0.0, description: "Failing" },
];

/**
 * Returns the matching letter grade and metadata for a given percentage based on the active scale.
 */
export function getLetterGrade(
  percentage: number,
  scale: GradeCutoff[] = DEFAULT_GRADE_SCALE
): { letter: string; gpaPoint: number; description: string; status: "Passing" | "Failing" | "Honors" } {
  // Sort descending by minPercent just in case user reordered
  const sortedScale = [...scale].sort((a, b) => b.minPercent - a.minPercent);
  
  // Guard against extreme values or NaN
  if (isNaN(percentage)) {
    return { letter: "N/A", gpaPoint: 0.0, description: "No Grade", status: "Failing" };
  }

  // Find first matching threshold
  for (const cutoff of sortedScale) {
    if (percentage >= cutoff.minPercent) {
      const isHonors = cutoff.minPercent >= 90;
      const isPassing = cutoff.minPercent >= 60 || cutoff.letter !== "F";
      return {
        letter: cutoff.letter,
        gpaPoint: cutoff.gpaPoint,
        description: cutoff.description,
        status: isHonors ? "Honors" : isPassing ? "Passing" : "Failing",
      };
    }
  }

  // Fallback to lowest in scale
  const lowest = sortedScale[sortedScale.length - 1];
  return {
    letter: lowest?.letter || "F",
    gpaPoint: lowest?.gpaPoint || 0.0,
    description: lowest?.description || "Failing",
    status: "Failing",
  };
}

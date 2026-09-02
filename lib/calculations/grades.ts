import { DEFAULT_GRADE_SCALE, GradeCutoff, getLetterGrade } from "./scales";

export interface AssignmentItem {
  id: string;
  name: string;
  earned: number | string;
  total: number | string;
  weight?: number | string;
}

export interface PointsGradeResult {
  totalEarned: number;
  totalPossible: number;
  percentage: number;
  letter: string;
  gpaPoint: number;
  status: "Passing" | "Failing" | "Honors";
  description: string;
  validItemCount: number;
}

export interface WeightedCategoryItem {
  id: string;
  name: string;
  score: number | string; // 0 - 100% or points
  weight: number | string; // % weight
}

export interface WeightedGradeResult {
  totalWeight: number;
  overallPercentage: number;
  letter: string;
  gpaPoint: number;
  status: "Passing" | "Failing" | "Honors";
  description: string;
  categoryBreakdown: {
    id: string;
    name: string;
    score: number;
    weight: number;
    weightedContribution: number;
    normalizedContribution: number;
  }[];
  isWeights100: boolean;
}

/**
 * Calculates grade from a list of assignments with points earned and points possible.
 */
export function calculatePointsGrade(
  items: AssignmentItem[],
  scale: GradeCutoff[] = DEFAULT_GRADE_SCALE
): PointsGradeResult {
  let totalEarned = 0;
  let totalPossible = 0;
  let validCount = 0;

  for (const item of items) {
    const earnedNum = typeof item.earned === "number" ? item.earned : parseFloat(item.earned);
    const totalNum = typeof item.total === "number" ? item.total : parseFloat(item.total);

    if (!isNaN(earnedNum) && !isNaN(totalNum) && totalNum > 0) {
      totalEarned += earnedNum;
      totalPossible += totalNum;
      validCount++;
    }
  }

  if (totalPossible === 0 || validCount === 0) {
    return {
      totalEarned: 0,
      totalPossible: 0,
      percentage: 0,
      letter: "N/A",
      gpaPoint: 0.0,
      status: "Failing",
      description: "Enter assignment scores to calculate grade",
      validItemCount: 0,
    };
  }

  const percentage = (totalEarned / totalPossible) * 100;
  const roundedPercent = Math.round(percentage * 100) / 100;
  const letterInfo = getLetterGrade(roundedPercent, scale);

  return {
    totalEarned: Math.round(totalEarned * 100) / 100,
    totalPossible: Math.round(totalPossible * 100) / 100,
    percentage: roundedPercent,
    letter: letterInfo.letter,
    gpaPoint: letterInfo.gpaPoint,
    status: letterInfo.status,
    description: letterInfo.description,
    validItemCount: validCount,
  };
}

/**
 * Calculates grade from weighted categories (e.g. Homework 20%, Quizzes 30%, Exams 50%).
 */
export function calculateWeightedGrade(
  categories: WeightedCategoryItem[],
  scale: GradeCutoff[] = DEFAULT_GRADE_SCALE
): WeightedGradeResult {
  let totalWeight = 0;
  let weightedSum = 0;

  const validCategories = categories.filter((cat) => {
    const s = typeof cat.score === "number" ? cat.score : parseFloat(cat.score as string);
    const w = typeof cat.weight === "number" ? cat.weight : parseFloat(cat.weight as string);
    return !isNaN(s) && !isNaN(w) && w > 0;
  });

  const categoryBreakdown = validCategories.map((cat) => {
    const score = typeof cat.score === "number" ? cat.score : parseFloat(cat.score as string);
    const weight = typeof cat.weight === "number" ? cat.weight : parseFloat(cat.weight as string);
    const contribution = (score * weight) / 100;
    totalWeight += weight;
    weightedSum += contribution;

    return {
      id: cat.id,
      name: cat.name || "Category",
      score: Math.round(score * 100) / 100,
      weight: Math.round(weight * 100) / 100,
      weightedContribution: Math.round(contribution * 100) / 100,
      normalizedContribution: 0, // calculated below
    };
  });

  if (totalWeight === 0 || categoryBreakdown.length === 0) {
    return {
      totalWeight: 0,
      overallPercentage: 0,
      letter: "N/A",
      gpaPoint: 0.0,
      status: "Failing",
      description: "Enter scores and weights to calculate weighted grade",
      categoryBreakdown: [],
      isWeights100: false,
    };
  }

  // Calculate percentage: if weights don't sum to 100%, normalize by totalWeight
  const overallPercentage = (weightedSum / totalWeight) * 100;
  const roundedPercent = Math.round(overallPercentage * 100) / 100;
  const letterInfo = getLetterGrade(roundedPercent, scale);

  // Fill in normalized contributions
  for (const cat of categoryBreakdown) {
    cat.normalizedContribution = Math.round((cat.weightedContribution / (totalWeight / 100)) * 100) / 100;
  }

  const isWeights100 = Math.abs(totalWeight - 100) < 0.01;

  return {
    totalWeight: Math.round(totalWeight * 100) / 100,
    overallPercentage: roundedPercent,
    letter: letterInfo.letter,
    gpaPoint: letterInfo.gpaPoint,
    status: letterInfo.status,
    description: letterInfo.description,
    categoryBreakdown,
    isWeights100,
  };
}

/**
 * Calculates basic statistics (mean, median, high, low, standard deviation) for a list of scores.
 */
export function calculateScoreStats(scores: number[]): {
  mean: number;
  median: number;
  highest: number;
  lowest: number;
  count: number;
} {
  const valid = scores.filter((s) => !isNaN(s));
  if (valid.length === 0) {
    return { mean: 0, median: 0, highest: 0, lowest: 0, count: 0 };
  }

  const sorted = [...valid].sort((a, b) => a - b);
  const sum = sorted.reduce((acc, curr) => acc + curr, 0);
  const mean = Math.round((sum / sorted.length) * 100) / 100;
  const highest = sorted[sorted.length - 1];
  const lowest = sorted[0];

  let median = 0;
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    median = sorted[mid];
  }

  return {
    mean,
    median: Math.round(median * 100) / 100,
    highest: Math.round(highest * 100) / 100,
    lowest: Math.round(lowest * 100) / 100,
    count: sorted.length,
  };
}

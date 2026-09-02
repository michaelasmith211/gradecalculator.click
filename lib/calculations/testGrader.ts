import { DEFAULT_GRADE_SCALE, getLetterGrade } from "./scales";

export interface TestGraderRow {
  wrong: number;
  correct: number;
  percentage: number;
  letter: string;
}

export function generateTestGradeChart(
  totalQuestions: number,
  maxWrongToShow?: number
): TestGraderRow[] {
  if (isNaN(totalQuestions) || totalQuestions <= 0) {
    return [];
  }

  const limit = Math.min(totalQuestions, maxWrongToShow || Math.min(totalQuestions, 50));
  const rows: TestGraderRow[] = [];

  for (let wrong = 0; wrong <= limit; wrong++) {
    const correct = totalQuestions - wrong;
    const percentage = Math.round(((correct / totalQuestions) * 100) * 100) / 100;
    const letterInfo = getLetterGrade(percentage, DEFAULT_GRADE_SCALE);

    rows.push({
      wrong,
      correct,
      percentage,
      letter: letterInfo.letter,
    });
  }

  return rows;
}

export function calculateSingleScore(earned: number, total: number): {
  percentage: number;
  letter: string;
  fraction: string;
  status: string;
} {
  if (isNaN(earned) || isNaN(total) || total <= 0) {
    return { percentage: 0, letter: "N/A", fraction: "0/0", status: "Invalid" };
  }

  const percentage = Math.round(((earned / total) * 100) * 100) / 100;
  const letterInfo = getLetterGrade(percentage);

  return {
    percentage,
    letter: letterInfo.letter,
    fraction: `${earned}/${total}`,
    status: letterInfo.status,
  };
}

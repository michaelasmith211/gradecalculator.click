export interface FinalExamInput {
  currentGrade: number | string; // e.g. 85
  desiredGrade: number | string; // e.g. 90
  examWeight: number | string;   // e.g. 20 (percent)
}

export interface FinalExamResult {
  requiredScore: number;
  currentGrade: number;
  desiredGrade: number;
  examWeightPercent: number;
  examWeightDecimal: number;
  priorWeightDecimal: number;
  priorContribution: number;
  remainingNeeded: number;
  status: "Achievable" | "HighEffort" | "ExtraCreditNeeded" | "AlreadyGuaranteed";
  statusMessage: string;
  isImpossible: boolean;
  isGuaranteed: boolean;
  whatIfScenarios: {
    examScore: number;
    resultingFinalGrade: number;
    letterGradeDescription: string;
  }[];
}

/**
 * Calculates the required final exam score to achieve a target overall course grade.
 * Formula: Required Final Exam Score = (Desired Grade - Current Grade * (1 - Exam Weight)) / Exam Weight
 */
export function calculateFinalExamNeeded(input: FinalExamInput): FinalExamResult | null {
  const current = typeof input.currentGrade === "number" ? input.currentGrade : parseFloat(input.currentGrade as string);
  const desired = typeof input.desiredGrade === "number" ? input.desiredGrade : parseFloat(input.desiredGrade as string);
  const weight = typeof input.examWeight === "number" ? input.examWeight : parseFloat(input.examWeight as string);

  if (isNaN(current) || isNaN(desired) || isNaN(weight) || weight <= 0) {
    return null;
  }

  const weightDecimal = weight / 100;
  const priorWeightDecimal = 1 - weightDecimal;
  const priorContribution = current * priorWeightDecimal;
  const remainingNeeded = desired - priorContribution;
  const requiredScore = remainingNeeded / weightDecimal;

  const roundedRequired = Math.round(requiredScore * 100) / 100;
  const isGuaranteed = roundedRequired <= 0;
  const isImpossible = roundedRequired > 100;

  let status: FinalExamResult["status"] = "Achievable";
  let statusMessage = `You need ${roundedRequired}% on your final exam to finish with a ${desired}%.`;

  if (isGuaranteed) {
    status = "AlreadyGuaranteed";
    statusMessage = `You have already secured a ${desired}% or higher even with 0% on your final exam!`;
  } else if (roundedRequired > 100) {
    status = "ExtraCreditNeeded";
    statusMessage = `You need ${roundedRequired}% on the final exam. Since this is over 100%, extra credit or curve is required to achieve ${desired}%.`;
  } else if (roundedRequired >= 90) {
    status = "HighEffort";
    statusMessage = `You need a strong score of ${roundedRequired}% on your final exam to finish with ${desired}%.`;
  }

  // Generate "What-If" scenarios matrix (e.g. 50%, 60%, 70%, 80%, 90%, 100%)
  const benchmarkScores = [50, 60, 70, 75, 80, 85, 90, 95, 100];
  const whatIfScenarios = benchmarkScores.map((examScore) => {
    const finalGrade = priorContribution + examScore * weightDecimal;
    const roundedFinal = Math.round(finalGrade * 100) / 100;
    let desc = "Passing";
    if (roundedFinal >= 90) desc = "A Grade";
    else if (roundedFinal >= 80) desc = "B Grade";
    else if (roundedFinal >= 70) desc = "C Grade";
    else if (roundedFinal >= 60) desc = "D Grade";
    else desc = "F Grade";

    return {
      examScore,
      resultingFinalGrade: roundedFinal,
      letterGradeDescription: desc,
    };
  });

  return {
    requiredScore: roundedRequired,
    currentGrade: Math.round(current * 100) / 100,
    desiredGrade: Math.round(desired * 100) / 100,
    examWeightPercent: Math.round(weight * 100) / 100,
    examWeightDecimal: Math.round(weightDecimal * 10000) / 10000,
    priorWeightDecimal: Math.round(priorWeightDecimal * 10000) / 10000,
    priorContribution: Math.round(priorContribution * 100) / 100,
    remainingNeeded: Math.round(remainingNeeded * 100) / 100,
    status,
    statusMessage,
    isImpossible,
    isGuaranteed,
    whatIfScenarios,
  };
}

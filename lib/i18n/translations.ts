
export interface Translations {
  // Brand & Header
  brand: string;
  tagline: string;
  toolsMenu: string;
  resourcesMenu: string;
  selectLanguage: string;
  searchLanguage: string;
  finalGrade: string;
  weighted: string;
  calculateFinal: string;
  calculatorsMenu: string;

  // Calculators Menu
  gradeCalculator: string;
  finalGradeCalculator: string;
  weightedGradeCalculator: string;
  gpaCalculator: string;
  averageGradeCalculator: string;
  testGradeCalculator: string;
  gradeNeededCalculator: string;
  percentageCalculator: string;

  // Resources Menu
  howToCalculate: string;
  gradeScale: string;
  gpaScale: string;
  faq: string;

  // Common Calculator UI
  assignment: string;
  assignmentName: string;
  gradeEarned: string;
  scoreEarned: string;
  totalPossible: string;
  possiblePoints: string;
  weight: string;
  addRow: string;
  reset: string;
  calculate: string;
  calculateGrade: string;
  overallGrade: string;
  letterGrade: string;
  gpa: string;
  academicStanding: string;
  statusPassing: string;
  statusHonors: string;
  statusNeedsWork: string;
  gradingScale: string;
  quickSamples: string;
  college: string;
  highSchool: string;
  percentageRange: string;

  // Final Exam Calculator
  currentGrade: string;
  desiredGrade: string;
  examWeight: string;
  scoreNeeded: string;
  scoreNeededDesc: string;

  // Weighted Calculator
  category: string;
  totalWeight: string;
  normalizedScore: string;

  // GPA Calculator
  courseName: string;
  credits: string;
  totalCredits: string;
  cumulativeGpa: string;

  // Social Sharing Card Studio
  cardStudioTitle: string;
  cardStudioDesc: string;
  downloadPng: string;
  copyImage: string;
  imageCopied: string;
  unofficialRecordNotice: string;

  // How It Works Steps
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  step5Title: string;
  step5Desc: string;
  step6Title: string;
  step6Desc: string;

  // Sections
  popularToolsTitle: string;
  popularToolsSubtitle: string;
  gradeScaleTitle: string;
  gradeScaleSubtitle: string;
  faqTitle: string;
  calculatorsAndTools: string;
  educationalGuides: string;

  // Footer & Legal
  footerDesc: string;
  privacy: string;
  terms: string;
  cookies: string;
  aboutUs: string;
  contactUs: string;
  allRightsReserved: string;
  disclaimerText: string;
}

export const enTranslations: Translations = {
  brand: "Grade Calculator",
  tagline: "Calculate your grade, percentage, and 4.0 GPA instantly.",
  toolsMenu: "Calculators",
  resourcesMenu: "Resources",
  selectLanguage: "Select Language",
  searchLanguage: "Search 39 languages...",
  finalGrade: "Final Grade",
  weighted: "Weighted",
  calculateFinal: "Calculate Final",
  calculatorsMenu: "Calculators",

  gradeCalculator: "Grade Calculator",
  finalGradeCalculator: "Final Grade Calculator",
  weightedGradeCalculator: "Weighted Grade Calculator",
  gpaCalculator: "4.0 GPA Calculator",
  averageGradeCalculator: "Average Grade",
  testGradeCalculator: "Test & Quiz Grader",
  gradeNeededCalculator: "Grade Needed",
  percentageCalculator: "Percentage Calculator",

  howToCalculate: "How to Calculate Grades",
  gradeScale: "Standard Grade Scale",
  gpaScale: "4.0 GPA Scale Chart",
  faq: "Grade Calculator FAQ",

  assignment: "Assignment",
  assignmentName: "Assignment Name",
  gradeEarned: "Earned Points",
  scoreEarned: "Score Earned",
  totalPossible: "Total Points",
  possiblePoints: "Possible",
  weight: "Weight (%)",
  addRow: "Add Assignment",
  reset: "Reset",
  calculate: "Calculate",
  calculateGrade: "Calculate Grade",
  overallGrade: "Overall Course Grade",
  letterGrade: "Letter Grade",
  gpa: "Grade Point Average (GPA)",
  academicStanding: "Academic Standing",
  statusPassing: "Passing with Distinction",
  statusHonors: "Honors Tier",
  statusNeedsWork: "Needs Improvement",
  gradingScale: "Grading Scale",
  quickSamples: "Quick Samples:",
  college: "College",
  highSchool: "High School",
  percentageRange: "Percentage Range",

  currentGrade: "Current Class Grade (%)",
  desiredGrade: "Desired Target Grade (%)",
  examWeight: "Final Exam Weight (%)",
  scoreNeeded: "Score Needed on Final Exam",
  scoreNeededDesc: "Minimum score required on your final exam to achieve your target grade.",

  category: "Category Name",
  totalWeight: "Total Weight",
  normalizedScore: "Normalized Grade",

  courseName: "Course Name",
  credits: "Credits",
  totalCredits: "Total Credits",
  cumulativeGpa: "Cumulative GPA",

  cardStudioTitle: "Academic Achievement Certificate Studio",
  cardStudioDesc: "Generate your personal, unofficial achievement certificate & grade milestone card.",
  downloadPng: "Download Certificate (PNG)",
  copyImage: "Copy Certificate",
  imageCopied: "Certificate Copied!",
  unofficialRecordNotice: "Unofficial Student Record • Self-Calculated for Personal Motivation",

  howItWorksTitle: "How GradeCalculator.dev Works",
  howItWorksSubtitle: "Calculate your grades, percentages, weighted averages, GPA, and final exam scores in just a few clicks.",
  step1Title: "1. Enter Your Assignments",
  step1Desc: "Add your homework, quizzes, tests, and labs with points earned and total points possible.",
  step2Title: "2. Choose Your Grading Scale",
  step2Desc: "Choose standard plus/minus, 10-point, or custom percentage cutoffs matching your syllabus.",
  step3Title: "3. Add Category Weights",
  step3Desc: "Easily toggle weighted categories (e.g., Homework 20%, Exams 80%) for syllabus calculations.",
  step4Title: "4. See Instant Results",
  step4Desc: "View real-time course percentage, letter grade, and 4.0 quality points calculated dynamically.",
  step5Title: "5. Simulate Final Exam Needs",
  step5Desc: "Find out the exact exam score required to pass or achieve your target final letter grade.",
  step6Title: "6. Celebrate & Share Milestones",
  step6Desc: "Generate an unofficial academic achievement certificate card to share your study milestones.",

  popularToolsTitle: "Popular Grade Calculators",
  popularToolsSubtitle: "Explore specialized calculators for semester planning, test grading, and GPA tracking.",
  gradeScaleTitle: "Standard Academic Grading Scale",
  gradeScaleSubtitle: "Conversion table between percentage scores, letter grades, and 4.0 GPA quality points.",
  faqTitle: "Frequently Asked Questions",
  calculatorsAndTools: "Calculators & Tools",
  educationalGuides: "Educational Guides",

  footerDesc: "The fastest, most accurate online grade calculator suite. Calculate course averages, final exam score requirements, weighted categories, and GPA on a 4.0 scale with 100% privacy.",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  cookies: "Cookie Policy",
  aboutUs: "About Us",
  contactUs: "Contact & Feedback",
  allRightsReserved: "All rights reserved.",
  disclaimerText: "Disclaimer: Grade Calculator is designed for educational estimation purposes. Grading policies vary across individual schools, colleges, and professors.",
};

// Client-side translation registry. Defaults to English ('en') for lightweight bundles.
export const TRANSLATIONS: Record<string, Partial<Translations>> = {
  en: enTranslations,
};

export function registerTranslations(locale: string, translations: Partial<Translations>) {
  if (!TRANSLATIONS[locale]) {
    TRANSLATIONS[locale] = translations;
  } else {
    Object.assign(TRANSLATIONS[locale]!, translations);
  }
}

/**
 * Returns translation for a key in a given locale, falling back to English.
 */
export function getTranslation(locale: string, key: keyof Translations): string {
  const locDict = TRANSLATIONS[locale];
  if (locDict && locDict[key]) {
    return locDict[key] as string;
  }
  return enTranslations[key] || "";
}

/**
 * Returns full translations object for a locale with fallback to English.
 */
export function getTranslations(locale: string): Translations {
  const locDict = TRANSLATIONS[locale] || {};
  return {
    ...enTranslations,
    ...locDict,
  };
}


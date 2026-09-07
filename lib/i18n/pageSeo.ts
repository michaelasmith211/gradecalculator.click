import { LOCALES } from "./locales";

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string[];
}

// Localized tool name translations for SEO titles
export const TOOL_NAMES: Record<string, Record<string, string>> = {
  "grade-calculator": {
    en: "Grade Calculator",
    no: "Karakterkalkulator",
    ar: "حاسبة الدرجات",
    az: "Qiymət Kalkulyatoru",
    bg: "Калкулатор за Оценки",
    bn: "গ্রেড ক্যালকুলেটর",
    cs: "Kalkulačka Známek",
    da: "Karakterberegner",
    de: "Notenrechner",
    el: "Υπολογιστής Βαθμολογίας",
    es: "Calculadora de Calificaciones",
    fa: "ماشین حساب نمرات",
    fi: "Arvosanalaskuri",
    fr: "Calculateur de Notes",
    he: "מחשבון ציונים",
    hi: "ग्रेड कैलकुलेटर",
    hr: "Kalkulator Ocjena",
    hu: "Jegy Kalkulátor",
    id: "Kalkulator Nilai",
    it: "Calcolatore di Voti",
    ja: "成績計算機",
    kk: "Баға Калькуляторы",
    ko: "학점 성적 계산기",
    ms: "Kalkulator Gred",
    nl: "Cijfercalculator",
    pl: "Kalkulator Ocen",
    pt: "Calculadora de Notas",
    ro: "Calculator de Note",
    ru: "Калькулятор Оценок",
    sk: "Kalkulačka Známok",
    sr: "Калкулатор Оцена",
    sv: "Betygsräknare",
    th: "เครื่องคำนวณเกรด",
    tl: "Grade Calculator",
    tr: "Not Hesaplama",
    ur: "گریڈ کیلکولیٹر",
    uz: "Baho Kalkulyatori",
    vi: "Máy Tính Điểm Số",
    zh: "成绩计算器",
  },
  "final-grade-calculator": {
    en: "Final Grade Calculator",
    no: "Karakterkalkulator for Eksamen",
    ar: "حاسبة الاختبار النهائي",
    es: "Calculadora de Examen Final",
    fr: "Calculateur d'Examen Final",
    de: "Abschlussprüfungs-Rechner",
    pt: "Calculadora de Exame Final",
    it: "Calcolatore Esame Finale",
    ru: "Калькулятор Итогового Экзамена",
    zh: "期末考试成绩计算器",
    ja: "期末試験目標点数計算機",
    ko: "기말고사 목표 점수 계산기",
    hi: "अंतिम परीक्षा ग्रेड कैलकुलेटर",
  },
  "weighted-grade-calculator": {
    en: "Weighted Grade Calculator",
    no: "Vektet Karakterkalkulator",
    ar: "حاسبة الدرجات الموزونة",
    es: "Calculadora de Calificación Ponderada",
    fr: "Calculateur de Moyenne Pondérée",
    de: "Gewichteter Notenrechner",
    pt: "Calculadora de Média Ponderada",
    it: "Calcolatore Media Ponderata",
    ru: "Калькулятор Взвешенных Оценок",
    zh: "加权成绩计算器",
    ja: "加重成績計算機",
    ko: "가중 성적 계산기",
    hi: "भारित ग्रेड कैलकुलेटर",
  },
  "gpa-calculator": {
    en: "4.0 GPA Calculator",
    no: "4.0 GPA-kalkulator",
    ar: "حاسبة المعدل التراكمي 4.0 GPA",
    es: "Calculadora de GPA 4.0",
    fr: "Calculateur de GPA 4.0",
    de: "4.0 GPA Rechner",
    pt: "Calculadora de GPA 4.0",
    it: "Calcolatore GPA 4.0",
    ru: "Калькулятор GPA 4.0",
    zh: "4.0 GPA 绩点计算器",
    ja: "4.0 GPA 計算機",
    ko: "4.0 GPA 계산기",
    hi: "4.0 GPA कैलकुलेटर",
  },
  "average-grade-calculator": {
    en: "Average Grade Calculator",
    ar: "حاسبة متوسط الدرجات",
    es: "Calculadora de Promedio de Calificaciones",
    fr: "Calculateur de Moyenne des Notes",
    de: "Notendurchschnitt-Rechner",
    pt: "Calculadora de Média de Notas",
    ru: "Калькулятор Среднего Балла",
    zh: "平均分计算器",
    ja: "平均点計算機",
    ko: "평균 성적 계산기",
    hi: "औसत ग्रेड कैलकुलेटर",
  },
  "test-grade-calculator": {
    en: "Test & Quiz Grader",
    ar: "حاسبة درجات الاختبارات والواجبات",
    es: "Calificador de Exámenes y Cuestionarios",
    fr: "Barème d'Évaluation de Test",
    de: "Klausuren- & Test-Notenrechner",
    pt: "Corretor de Provas e Testes",
    ru: "Оценка Тестов и Контрольных",
    zh: "测验评分表计算器",
    ja: "小テスト採点計算機",
    ko: "시험 채점표 계산기",
    hi: "टेस्ट और क्विज़ स्कोरर",
  },
  "grade-needed-calculator": {
    en: "Grade Needed Calculator",
    ar: "حاسبة الدرجة المطلوبة",
    es: "Calculadora de Calificación Necesaria",
    fr: "Calculateur de Note Requise",
    de: "Benötigte Note Berechnen",
    pt: "Calculadora de Nota Necessária",
    ru: "Калькулятор Необходимого Балла",
    zh: "目标所需分数计算器",
    ja: "必要点数計算機",
    ko: "필요 점수 계산기",
    hi: "आवश्यक ग्रेड कैलकुलेटर",
  },
  "percentage-grade-calculator": {
    en: "Percentage Grade Calculator",
    ar: "حاسبة النسبة المئوية للدرجات",
    es: "Calculadora de Porcentajes de Calificación",
    fr: "Calculateur de Pourcentage de Note",
    de: "Prozentrechner für Noten",
    pt: "Calculadora de Porcentagem de Notas",
    ru: "Калькулятор Процента Оценок",
    zh: "百分比成绩计算器",
    ja: "パーセント成績計算機",
    ko: "백분율 성적 계산기",
    hi: "प्रतिशत ग्रेड कैलकुलेटर",
  },
};

import { getTranslation } from "./translations";

/**
 * Returns localized SEO metadata for any route slug and locale.
 */
export function getPageSeo(slug: string, locale: string): PageSeoConfig {
  const locConfig = LOCALES[locale] || LOCALES.en;
  const langName = locConfig.name;
  const toolName =
    (TOOL_NAMES[slug] && TOOL_NAMES[slug][locale]) ||
    (TOOL_NAMES[slug] && TOOL_NAMES[slug].en) ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Default English SEO
  if (locale === "en" || !locale) {
    if (slug === "home" || !slug) {
      return {
        title: "Grade Calculator – Calculate Your Grade & GPA Instantly",
        description:
          "Free online Grade Calculator to calculate course percentages, letter grades (A-F), weighted averages, and 4.0 GPA instantly. Easy, private, and mobile-friendly.",
        keywords: [
          "grade calculator",
          "grade calculator online",
          "calculate my grade",
          "calculate grade percentage",
          "letter grade calculator",
          "school grade calculator",
          "student grade calculator",
        ],
      };
    }
    return {
      title: `${toolName} – Calculate Instantly`,
      description: `Free online ${toolName}. Calculate results instantly with standard grading scales and 100% privacy.`,
      keywords: [toolName.toLowerCase(), `${toolName.toLowerCase()} online`, "grade calculator"],
    };
  }

  // Localized Home
  if (slug === "home" || !slug) {
    const nativeGradeCalc = TOOL_NAMES["grade-calculator"][locale] || getTranslation(locale, "brand") || "Grade Calculator";
    const tagline = getTranslation(locale, "tagline");
    const footerDesc = getTranslation(locale, "footerDesc");
    return {
      title: `${nativeGradeCalc} – GradeCalculator.dev (${langName})`,
      description: `${nativeGradeCalc}: ${tagline} ${footerDesc}`,
      keywords: [
        nativeGradeCalc.toLowerCase(),
        `${nativeGradeCalc.toLowerCase()} online`,
        "grade calculator",
      ],
    };
  }

  // Localized Tool / Guide
  const footerDesc = getTranslation(locale, "footerDesc");
  return {
    title: `${toolName} – GradeCalculator.dev (${langName})`,
    description: `${toolName} (${langName}) – ${footerDesc}`,
    keywords: [toolName.toLowerCase(), `${toolName.toLowerCase()} online`, "grade calculator"],
  };
}

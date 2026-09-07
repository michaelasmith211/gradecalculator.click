import { FAQItem } from "@/components/FAQAccordion";
import { TOOL_NAMES } from "./pageSeo";
import { getTranslations, Translations } from "./translations";

export interface LocalizedSummary {
  quickAnswer: string;
  formula: string;
  keyTakeaways: string[];
}

/**
 * Returns localized SEO Summary Box content for the homepage in any language.
 */
export function getLocalizedHomeSummary(locale: string, localizedBrandName: string): LocalizedSummary {
  const t = getTranslations(locale);

  const summaries: Record<string, LocalizedSummary> = {
    es: {
      quickAnswer:
        "Una Calculadora de Calificaciones calcula tu porcentaje académico acumulado y tu calificación en letra dividiendo los puntos totales obtenidos entre los puntos posibles, o multiplicando las calificaciones ponderadas por los porcentajes del plan de estudios.",
      formula: "Calificación (%) = (Puntos Obtenidos ÷ Puntos Posibles) × 100",
      keyTakeaways: [
        "Cálculo instantáneo en el navegador sin demoras al escribir notas",
        "Escalas de calificación personalizables (estándar, 10 puntos, 7 puntos)",
        "Privacidad 100% en el navegador (sin cuentas ni recopilación de datos)",
        "Disponible en 39 idiomas con cálculos localizados al instante",
      ],
    },
    fr: {
      quickAnswer:
        "Un calculateur de notes calcule votre pourcentage académique cumulé et votre note en divisant le total des points obtenus par le total des points possibles, ou en multipliant les catégories pondérées par leurs coefficients.",
      formula: "Note (%) = (Points Obtenus ÷ Points Possibles) × 100",
      keyTakeaways: [
        "Calcul instantané côté client au fur et à mesure de votre saisie",
        "Barèmes de notation personnalisables (lettres, 10 points, 20 points)",
        "Confidentialité 100% dans votre navigateur (aucun compte requis)",
        "Disponible en 39 langues avec calculs localisés en temps réel",
      ],
    },
    de: {
      quickAnswer:
        "Ein Notenrechner berechnet deinen Gesamtprozentsatz und deine Note, indem er die erzielten Punkte durch die erreichbaren Punkte teilt oder gewichtete Kategorien mit Lehrplan-Prozentsätzen multipliziert.",
      formula: "Note (%) = (Erzielte Punkte ÷ Mögliche Punkte) × 100",
      keyTakeaways: [
        "Sofortige Berechnung im Browser ohne Verzögerung bei der Eingabe",
        "Anpassbare Notenskalen (Plus/Minus, 10-Punkte, Standard)",
        "100% Datenschutz im Browser (keine Registrierung erforderlich)",
        "Verfügbar in 39 Sprachen mit sofortiger lokaler Berechnung",
      ],
    },
    ar: {
      quickAnswer:
        "تقوم حاسبة الدرجات بحساب النسبة المئوية الأكاديمية التراكمية والدرجة الحرفية عن طريق قسمة مجموع النقاط المكتسبة على مجموع النقاط المحتملة، أو بضرب درجات الفئات الموزونة في نسب المنهج الدراسي.",
      formula: "الدرجة (%) = (مجموع النقاط المكتسبة ÷ مجموع النقاط الممكنة) × 100",
      keyTakeaways: [
        "حساب فوري من جانب العميل دون أي تأخير أثناء إدخال الدرجات",
        "مقاييس درجات قابلة للتخصيص (مقياس الحروف، 10 نقاط، والمزيد)",
        "خصوصية بنسبة 100% في المتصفح دون جمع أي بيانات شخصية",
        "متوفر بـ 39 لغة مع إجراء العمليات الحسابية المترجمة فورياً",
      ],
    },
    pt: {
      quickAnswer:
        "A Calculadora de Notas calcula sua porcentagem acadêmica acumulada e nota final dividindo o total de pontos obtidos pelo total de pontos possíveis, ou multiplicando as notas ponderadas pelos pesos das disciplinas.",
      formula: "Nota (%) = (Pontos Obtidos ÷ Pontos Possíveis) × 100",
      keyTakeaways: [
        "Cálculo instantâneo no navegador sem atrasos ao digitar as notas",
        "Escalas de notas personalizáveis (padrão, 10 pontos, conceitos)",
        "100% de privacidade no navegador (sem necessidade de cadastro)",
        "Disponível em 39 idiomas com cálculos localizados instantâneos",
      ],
    },
    ru: {
      quickAnswer:
        "Калькулятор оценок вычисляет ваш совокупный академический процент и оценку, деля общее количество набранных баллов на максимально возможное количество баллов, или умножая весовые коэффициенты на процентные доли.",
      formula: "Оценка (%) = (Набранные баллы ÷ Возможные баллы) × 100",
      keyTakeaways: [
        "Мгновенный расчет в браузере без задержек по мере ввода оценок",
        "Настраиваемые шкалы оценивания (буквенная, 10-балльная, 5-балльная)",
        "100% конфиденциальность в браузере (без регистрации и сбора данных)",
        "Доступен на 39 языках с мгновенными локализованными расчетами",
      ],
    },
    it: {
      quickAnswer:
        "Un calcolatore di voti calcola la tua percentuale accademica cumulativa e il voto finale dividendo i punti totali ottenuti per i punti massimi possibili, oppure moltiplicando i punteggi ponderati per le percentuali del programma.",
      formula: "Voto (%) = (Punti Ottenuti ÷ Punti Possibili) × 100",
      keyTakeaways: [
        "Calcolo istantaneo lato client senza ritardi durante l'inserimento dei punteggi",
        "Scale di valutazione personalizzabili (standard, 10 punti, lettere)",
        "100% privacy nel browser (nessuna registrazione o raccolta dati)",
        "Disponibile in 39 lingue con calcoli localizzati istantanei",
      ],
    },
    hi: {
      quickAnswer:
        "ग्रेड कैलकुलेटर आपके कुल अर्जित अंकों को कुल संभावित अंकों से विभाजित करके, या पाठ्यक्रम के प्रतिशत से भारित श्रेणी के अंकों को गुणा करके आपके कुल प्रतिशत और ग्रेड की गणना करता है।",
      formula: "ग्रेड (%) = (अर्जित कुल अंक ÷ कुल संभावित अंक) × 100",
      keyTakeaways: [
        "अंक दर्ज करते ही ब्राउज़र में बिना किसी देरी के त्वरित गणना",
        "कस्टमाइज़ करने योग्य ग्रेडिंग स्केल (अक्षर ग्रेड, 10-प्वाइंट स्केल)",
        "100% ब्राउज़र गोपनीयता (कोई खाता या व्यक्तिगत डेटा एकत्र नहीं किया जाता)",
        "39 भाषाओं में तत्काल स्थानीयकृत गणना के साथ उपलब्ध",
      ],
    },
    zh: {
      quickAnswer:
        "成绩计算器通过将您获得的总分除以总可能分，或将加权类别分数乘以课程权重，来计算您的总学术百分比和等级成绩。",
      formula: "成绩 (%) = (获得总分 ÷ 总可能分) × 100",
      keyTakeaways: [
        "输入分数时在浏览器端即时计算，零延迟",
        "可自定义的成绩等级分界（标准制、10分制等）",
        "100% 浏览器端隐私（无需注册，不收集任何个人数据）",
        "支持39种语言并提供即时本地化成绩计算",
      ],
    },
    ja: {
      quickAnswer:
        "成績計算機は、獲得した合計点数を可能な合計点数で割るか、シラバスの割合で加重カテゴリーのスコアを掛けることによって、累積的な学業成績パーセンテージと成績評価を計算します。",
      formula: "成績 (%) = (獲得点数 ÷ 配点合計) × 100",
      keyTakeaways: [
        "スコアを入力するとブラウザ側で遅延なく即座に計算",
        "カスタマイズ可能な成績評価基準（レターグレード、10段階評価など）",
        "ブラウザ内完結の100%プライバシー保護（アカウント登録・データ収集なし）",
        "39言語に対応し、即時のローカライズ計算を提供",
      ],
    },
    ko: {
      quickAnswer:
        "학점 및 성적 계산기는 획득한 총점을 총 배점으로 나누거나 가중치 백분율을 곱하여 누적 백분율과 문자 학점을 실시간으로 계산합니다.",
      formula: "성적 (%) = (획득 점수 ÷ 총 배점) × 100",
      keyTakeaways: [
        "점수를 입력하는 즉시 지연 없이 브라우저에서 계산",
        "사용자 지정 성적 평가 기준 (문자 학점, 10점 척도 등)",
        "100% 브라우저 내 프라이버시 보호 (계정 가입이나 개인정보 수집 없음)",
        "39개 언어를 지원하며 즉각적인 현지화 계산 제공",
      ],
    },
    no: {
      quickAnswer:
        "En karakterkalkulator beregner din samlede prosent og bokstavkarakter ved å dele oppnådde poeng på mulige poeng, eller ved å multiplisere vektede kategorier med fagvekter.",
      formula: "Karakter (%) = (Oppnådde Poeng ÷ Maks Poeng) × 100",
      keyTakeaways: [
        "Umiddelbar beregning i nettleseren uten forsinkelse når du skriver",
        "Tilpassbare karakterskalaer (pluss/minus, 10-punkts, egne grenser)",
        "100% personvern i nettleseren (ingen konto eller datainnsamling)",
        "Tilgjengelig på 39 språk med lynraske lokale beregninger",
      ],
    },
    nl: {
      quickAnswer:
        "Een cijfercalculator berekent je cumulatieve academische percentage en lettercijfer door het totaal aantal behaalde punten te delen door de maximaal haalbare punten, of door gewogen categorieën te vermenigvuldigen met vakpercentages.",
      formula: "Cijfer (%) = (Behaalde Punten ÷ Mogelijke Punten) × 100",
      keyTakeaways: [
        "Directe berekening in de browser zonder vertraging tijdens het typen",
        "Aanpasbare cijferschalen (lettercijfers, 10-puntsschaal)",
        "100% privacy in de browser (geen account of gegevensverzameling)",
        "Beschikbaar in 39 talen met directe gelokaliseerde berekeningen",
      ],
    },
    pl: {
      quickAnswer:
        "Kalkulator ocen oblicza Twój łączny procent ocen i ocenę końcową, dzieląc sumę zdobytych punktów przez maksymalną liczbę punktów lub mnożąc wagi kategorii przez procenty programu nauczania.",
      formula: "Ocena (%) = (Zdobyte Punkty ÷ Maksymalna Liczba Punktów) × 100",
      keyTakeaways: [
        "Błyskawiczne obliczenia w przeglądarce bez opóźnień podczas wpisywania ocen",
        "Możliwość dostosowania skal ocen (skala literowa, punktowa)",
        "100% prywatności w przeglądarce (brak konieczności logowania i zbierania danych)",
        "Dostępny w 39 językach z natychmiastowymi zlokalizowanymi obliczeniami",
      ],
    },
    tr: {
      quickAnswer:
        "Not Hesaplama aracı, aldığınız toplam puanı alınabilecek toplam puana bölerek veya ağırlıklı kategori puanlarını ders izlencesi yüzdeleriyle çarparak genel başarı yüzdenizi ve harf notunuzu hesaplar.",
      formula: "Not (%) = (Alınan Puan ÷ Toplam Puan) × 100",
      keyTakeaways: [
        "Puanları girdiğiniz anda tarayıcıda sıfır gecikmeyle anında hesaplama",
        "Özelleştirilebilir harf notu aralıkları (Artı/Eksi, 10 puanlık sistem)",
        "Tarayıcıda %100 gizlilik (hesap açma veya veri toplama yok)",
        "Anında yerelleştirilmiş hesaplamalarla 39 dilde kullanılabilir",
      ],
    },
  };

  if (summaries[locale]) {
    return summaries[locale];
  }

  // Smart fallback for other languages using localized tokens
  return {
    quickAnswer: `${localizedBrandName} ${t.tagline}`,
    formula: `${t.overallGrade} (%) = (${t.scoreEarned} ÷ ${t.totalPossible}) × 100`,
    keyTakeaways: [
      t.tagline,
      `${t.gradingScale}: ${t.percentageRange}, ${t.letterGrade}, ${t.gpa}`,
      "100% Private (Browser-Only)",
      "GradeCalculator.dev (39 Languages)",
    ],
  };
}

/**
 * Returns localized workflow figure caption.
 */
export function getLocalizedFigureCaption(locale: string): string {
  const captions: Record<string, string> = {
    es: "Figura 1: El flujo completo de 6 pasos en GradeCalculator.dev — ingresa calificaciones, personaliza la escala, aplica ponderaciones, obtén resultados en tiempo real y proyecta tu examen final.",
    fr: "Figure 1 : Le flux complet en 6 étapes sur GradeCalculator.dev — entrez vos devoirs, personnalisez le barème, appliquez les coefficients et calculez votre note d'examen final.",
    de: "Abbildung 1: Der vollständige 6-Schritte-Workflow auf GradeCalculator.dev — Aufgaben eingeben, Notenskala anpassen, Gewichtungen anwenden und Abschlussprüfungsnoten berechnen.",
    ar: "الشكل 1: مسار العمل الكامل المكون من 6 خطوات على GradeCalculator.dev — أدخل الواجبات، وخصص مقياس الدرجات، وطبق الأوزان، واحسب متطلبات الاختبار النهائي.",
    pt: "Figura 1: O fluxo de cálculo completo em 6 etapas no GradeCalculator.dev — insira tarefas, personalize a escala, aplique pesos e calcule a nota necessária no exame final.",
    ru: "Рисунок 1: Полный 6-этапный рабочий процесс на GradeCalculator.dev — добавьте задания, настройте шкалу оценок, примените веса и рассчитайте балл для итогового экзамена.",
    it: "Figura 1: Il flusso di lavoro completo in 6 passaggi su GradeCalculator.dev — inserisci i compiti, personalizza la scala, applica i pesi e calcola il voto dell'esame finale.",
    hi: "चित्र 1: GradeCalculator.dev पर संपूर्ण 6-चरणीय गणना प्रवाह — असाइनमेंट दर्ज करें, ग्रेडिंग स्केल कस्टमाइज़ करें, भार लागू करें और अंतिम परीक्षा स्कोर की गणना करें।",
    zh: "图 1：GradeCalculator.dev 上的完整 6 步计算流程 — 输入作业、自定义评分标准、应用权重并计算期末考试所需分数。",
    ja: "図 1：GradeCalculator.dev の完全な 6 ステップ計算ワークフロー — 課題の入力、評価尺度の設定、加重の適用、期末試験の目標スコア計算。",
    ko: "그림 1: GradeCalculator.dev의 완전한 6단계 계산 워크플로 — 과제 입력, 성적 척도 맞춤 설정, 가중치 적용 및 기말고사 목표 점수 시뮬레이션.",
  };

  return captions[locale] || "Figure 1: The complete 6-step calculation workflow on GradeCalculator.dev — enter assignments, customize your grading scale, apply category weights, get live scores, compute target final exam requirements, and track academic standing.";
}

/**
 * Returns localized FAQs for the homepage.
 */
export function getLocalizedHomeFaqs(locale: string): FAQItem[] {
  const t = getTranslations(locale);

  const localizedFaqSets: Record<string, FAQItem[]> = {
    es: [
      {
        question: "¿Qué es una calculadora de calificaciones?",
        answer:
          "Una calculadora de calificaciones es una herramienta en línea gratuita para estudiantes que calcula el promedio del curso, porcentaje general, calificación en letra y promedio de puntos (GPA). Elimina cálculos manuales sumando puntos obtenidos o ponderando porcentajes de categorías.",
      },
      {
        question: "¿Cómo calculo mi calificación?",
        answer:
          "Para calcular tu calificación en un sistema de puntos:\n1. Suma todos los puntos obtenidos en tareas, cuestionarios y exámenes.\n2. Suma el total de puntos posibles.\n3. Divide los puntos obtenidos entre los puntos posibles.\n4. Multiplica por 100 para obtener el porcentaje.\n\nEjemplo: 255 puntos de 300 posibles: (255 ÷ 300) × 100 = 85.0% (Calificación: B).",
      },
      {
        question: "¿Cómo calculo mi nota del examen final?",
        answer:
          "Usa la fórmula: Nota Requerida = (Nota Deseada - Nota Actual × (1 - Peso del Examen)) ÷ Peso del Examen.\nPor ejemplo, si tienes 85%, quieres 90% y el examen vale 20%: (90 - 85 × 0.80) ÷ 0.20 = 110%. Puedes usar nuestra Calculadora de Examen Final para simular escenarios automáticamente.",
      },
      {
        question: "¿Cómo funcionan las calificaciones ponderadas?",
        answer:
          "En un sistema ponderado, las evaluaciones se dividen en categorías con porcentajes asignados (ej. Tareas 20%, Pruebas 20%, Parcial 25%, Examen Final 35%). Tu calificación general es la suma del promedio de cada categoría multiplicado por su porcentaje.",
      },
      {
        question: "¿Cómo calculo mi GPA?",
        answer:
          "El GPA convierte calificaciones en letra en puntos de calidad en una escala estándar 4.0 (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0). Multiplica los puntos de cada curso por sus créditos, suma los puntos y divide entre el total de créditos cursados.",
      },
      {
        question: "¿Qué calificación es un 90 por ciento?",
        answer:
          "En la escala académica estándar, un 90% equivale típicamente a una A- (o una A en escalas sin más/menos). En escalas estrictas de 7 puntos, un 90% corresponde a B+.",
      },
      {
        question: "¿Qué calificación es un 80 por ciento?",
        answer:
          "Un 80% equivale habitualmente a un B- (2.7 GPA) en una escala con más/menos, o a una B sólida en escalas de 10 puntos (80–89%).",
      },
      {
        question: "¿Cómo calculo el porcentaje de mi nota?",
        answer:
          "Divide tu puntuación obtenida entre los puntos máximos posibles y multiplica el decimal resultante por 100. Por ejemplo, obtener 42 de 50 es (42 ÷ 50) = 0.84, lo que equivale al 84%.",
      },
    ],
    fr: [
      {
        question: "Qu'est-ce qu'un calculateur de notes ?",
        answer:
          "Un calculateur de notes est un outil interactif en ligne gratuit conçu pour les élèves et étudiants afin de calculer leur moyenne, leur pourcentage global, leur mention et leur GPA. Il élimine le calcul manuel en regroupant les points ou coefficients.",
      },
      {
        question: "Comment calculer ma note ?",
        answer:
          "Pour calculer votre note dans un système à points :\n1. Additionnez tous les points obtenus.\n2. Additionnez le total des points possibles.\n3. Divisez les points obtenus par les points possibles.\n4. Multipliez par 100 pour obtenir le pourcentage.\n\nExemple : 255 points sur 300 possibles : (255 ÷ 300) × 100 = 85,0%.",
      },
      {
        question: "Comment calculer la note nécessaire à l'examen final ?",
        answer:
          "Utilisez la formule : Note requise = (Note souhaitée - Note actuelle × (1 - Poids de l'examen)) ÷ Poids de l'examen.\nVous pouvez utiliser notre Calculateur d'Examen Final pour obtenir instantanément votre objectif.",
      },
      {
        question: "Comment fonctionnent les notes pondérées ?",
        answer:
          "Dans un système de notation pondérée, les devoirs sont répartis en catégories avec des pourcentages assignés (ex : Devoirs 20%, Partiels 40%, Examen final 40%). La note globale est la somme des moyennes de chaque catégorie multipliées par leurs coefficients.",
      },
      {
        question: "Comment calculer mon GPA ?",
        answer:
          "Le GPA convertit les notes en points de qualité sur une échelle standard de 4,0 (A = 4,0, B = 3,0, C = 2,0, D = 1,0, F = 0,0). Multipliez la valeur en points par les crédits du cours, puis divisez par le total des crédits.",
      },
      {
        question: "Quelle mention correspond à 90 pour cent ?",
        answer:
          "Dans le barème américain standard, 90% correspond généralement à un A-. Dans le système français, cela correspondrait à une note d'environ 18/20 (Très Bien).",
      },
      {
        question: "Quelle mention correspond à 80 pour cent ?",
        answer:
          "Un score de 80% équivaut généralement à un B- (2,7 GPA) ou une note d'environ 16/20 (Mention Bien).",
      },
      {
        question: "Comment calculer le pourcentage de ma note ?",
        answer:
          "Divisez votre note obtenue par le total possible et multipliez par 100. Par exemple, obtenir 42 sur 50 donne (42 ÷ 50) = 0,84, soit 84%.",
      },
    ],
    de: [
      {
        question: "Was ist ein Notenrechner?",
        answer:
          "Ein Notenrechner ist ein kostenloses Online-Tool für Schüler und Studenten, um den Gesamtnotendurchschnitt, den Prozentsatz und den GPA sofort zu berechnen.",
      },
      {
        question: "Wie berechne ich meine Note?",
        answer:
          "Teile die Summe der erreichten Punkte durch die Summe der möglichen Punkte und multipliziere das Ergebnis mit 100. Beispiel: 255 von 300 Punkten entspricht (255 ÷ 300) × 100 = 85,0%.",
      },
      {
        question: "Wie berechne ich die benötigte Abschlussnote?",
        answer:
          "Verwende die Formel: Benötigte Punktzahl = (Wunschnote - Aktuelle Note × (1 - Prüfungsgewichtung)) ÷ Prüfungsgewichtung.",
      },
      {
        question: "Wie funktionieren gewichtete Noten?",
        answer:
          "Bei einem gewichteten Notensystem haben verschiedene Kategorien (Hausaufgaben, Klausuren, Abschlussprüfung) prozentuale Anteile an der Gesamtnote.",
      },
      {
        question: "Wie berechne ich meinen GPA?",
        answer:
          "Der 4.0-GPA wandelt Noten in Qualitätspunkte um (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0), gewichtet mit den jeweiligen Credit Hours.",
      },
      {
        question: "Welche Note entspricht 90 Prozent?",
        answer:
          "Auf der US-Standard-Skala entspricht 90% normalerweise einem A- (bzw. Note 1,3 bis 1,7 im deutschen Notensystem).",
      },
      {
        question: "Welche Note entspricht 80 Prozent?",
        answer:
          "Ein Wert von 80% entspricht üblicherweise einem B- (bzw. Note 2,0 bis 2,3 im deutschen System).",
      },
      {
        question: "Wie berechne ich den Prozentsatz meiner Note?",
        answer:
          "Teile deine Punktzahl durch die maximale Punktzahl und multipliziere mit 100. Beispiel: 42 von 50 Punkten = 84%.",
      },
    ],
    ar: [
      {
        question: "ما هي حاسبة الدرجات؟",
        answer:
          "حاسبة الدرجات هي أداة تفاعلية مجانية عبر الإنترنت للطلاب لحساب معدل الدرجات التراكمي، والنسبة المئوية، والدرجة الحرفية، والمعدل التراكمي (GPA) بشكل فوري.",
      },
      {
        question: "كيف أحسب درجاتي؟",
        answer:
          "لحساب درجتك في نظام النقاط:\n1. اجمع كل النقاط التي حصلت عليها.\n2. اجمع إجمالي النقاط الممكنة.\n3. اقسم مجموع درجاتك على الإجمالي الممكن واضرب في 100.",
      },
      {
        question: "كيف أحسب الدرجة المطلوبة في الاختبار النهائي؟",
        answer:
          "استخدم المعادلة: الدرجة المطلوبة = (الدرجة المستهدفة - الدرجة الحالية × (1 - وزن الاختبار)) ÷ وزن الاختبار.",
      },
      {
        question: "كيف تعمل الدرجات الموزونة؟",
        answer:
          "في النظام الموزون، تُعطى لكل فئة (واجبات، اختبارات، مشروع) نسبة مئوية محددة من الدرجة النهائية.",
      },
      {
        question: "كيف أحسب المعدل التراكمي (GPA)؟",
        answer:
          "يحول نظام 4.0 GPA الدرجات الحرفية إلى نقاط رقمية (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0) مضروبة في عدد الساعات المعتمدة للمادة.",
      },
      {
        question: "ما هي الدرجة المعادلة لنسبة 90 بالمائة؟",
        answer:
          "في معظم الأنظمة الأكاديمية، تعادل نسبة 90% درجة A- أو تقدير ممتاز.",
      },
      {
        question: "ما هي الدرجة المعادلة لنسبة 80 بالمائة؟",
        answer:
          "تعادل نسبة 80% درجة B- أو تقدير جيد جداً (2.7 نقطة في مقياس المعدل التراكمي).",
      },
      {
        question: "كيف أحسب النسبة المئوية للدرجة؟",
        answer:
          "اقسم درجاتك المحققة على الدرجة الكلية ثم اضرب الناتج في 100 (مثلاً: 42 ÷ 50 = 84%).",
      },
    ],
    pt: [
      {
        question: "O que é uma calculadora de notas?",
        answer:
          "Uma calculadora de notas é uma ferramenta online gratuita projetada para estudantes calcularem médias de cursos, porcentagens, conceitos e GPA 4.0 instantaneamente.",
      },
      {
        question: "Como calculo minha nota?",
        answer:
          "Para calcular em um sistema de pontos:\n1. Some todos os pontos obtidos.\n2. Some os pontos máximos possíveis.\n3. Divida os pontos obtidos pelos pontos possíveis e multiplique por 100.",
      },
      {
        question: "Como calcular a nota necessária no exame final?",
        answer:
          "Utilize a fórmula: Nota Necessária = (Nota Alvo - Nota Atual × (1 - Peso da Prova)) ÷ Peso da Prova.",
      },
      {
        question: "Como funcionam as notas ponderadas?",
        answer:
          "Em um sistema ponderado, cada categoria (trabalhos, testes, exame) tem um peso percentual no cálculo da média final.",
      },
      {
        question: "Como calcular o GPA?",
        answer:
          "O GPA converte notas em pontos de qualidade em uma escala de 4.0 (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0) ponderados pelas horas de crédito.",
      },
      {
        question: "Qual nota corresponde a 90 por cento?",
        answer:
          "Em escalas acadêmicas padrão, 90% geralmente corresponde a uma nota A- (ou conceito Excelente).",
      },
      {
        question: "Qual nota corresponde a 80 por cento?",
        answer:
          "Uma pontuação de 80% equivale geralmente a um B- (2.7 GPA) ou conceito Bom.",
      },
      {
        question: "Como calculo a porcentagem da minha nota?",
        answer:
          "Divida sua pontuação pelo total possível e multiplique por 100 (ex: 42 de 50 = 84%).",
      },
    ],
    ru: [
      {
        question: "Что такое калькулятор оценок?",
        answer:
          "Калькулятор оценок — это бесплатный онлайн-инструмент для школьников и студентов, позволяющий мгновенно рассчитывать средний балл, процент успеваемости, буквенную оценку и GPA 4.0.",
      },
      {
        question: "Как рассчитать свою оценку?",
        answer:
          "Разделите сумму набранных баллов на сумму максимально возможных баллов и умножьте на 100. Пример: (255 ÷ 300) × 100 = 85.0%.",
      },
      {
        question: "Как рассчитать балл для итогового экзамена?",
        answer:
          "Используйте формулу: Требуемый балл = (Желаемая оценка - Текущая оценка × (1 - Вес экзамена)) ÷ Вес экзамена.",
      },
      {
        question: "Как работают взвешенные оценки?",
        answer:
          "Во взвешенной системе каждая категория (домашние задания, тесты, экзамен) имеет свой процентный вес в итоговой оценке.",
      },
      {
        question: "Как рассчитать GPA?",
        answer:
          "GPA переводит оценки в баллы по 4-балльной шкале (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0) с учетом кредитов каждого предмета.",
      },
      {
        question: "Какая оценка соответствует 90 процентам?",
        answer:
          "В стандартной шкале 90% соответствует оценке A- (или оценке 5/отлично).",
      },
      {
        question: "Какая оценка соответствует 80 процентам?",
        answer:
          "80% соответствует оценке B- (или оценке 4/хорошо, 2.7 балла GPA).",
      },
      {
        question: "Как рассчитать процент по оценке?",
        answer:
          "Разделите набранный балл на максимальный и умножьте на 100 (например, 42 из 50 = 84%).",
      },
    ],
    it: [
      {
        question: "Cos'è un calcolatore di voti?",
        answer:
          "Un calcolatore di voti è uno strumento online gratuito progettato per consentire agli studenti di calcolare la media dei voti, la percentuale, i voti in lettere e il GPA in tempo reale.",
      },
      {
        question: "Come calcolo il mio voto?",
        answer:
          "Dividi il totale dei punti ottenuti per il totale dei punti possibili e moltiplica per 100. Esempio: (255 ÷ 300) × 100 = 85,0%.",
      },
      {
        question: "Come calcolo il voto necessario all'esame finale?",
        answer:
          "Usa la formula: Punteggio Richiesto = (Voto Obiettivo - Voto Attuale × (1 - Peso Esame)) ÷ Peso Esame.",
      },
      {
        question: "Come funzionano i voti ponderati?",
        answer:
          "In un sistema ponderato, a ciascuna categoria viene assegnato un peso percentuale che determina il voto finale.",
      },
      {
        question: "Come calcolo il GPA?",
        answer:
          "Il GPA converte i voti in lettere su una scala standard da 4.0 in base ai crediti formativi del corso.",
      },
      {
        question: "Quale voto corrisponde al 90 percento?",
        answer:
          "Sulla scala standard internazionale, il 90% corrisponde a un A- (o circa 27-28/30 nel sistema universitario italiano).",
      },
      {
        question: "Quale voto corrisponde all'80 percento?",
        answer:
          "Un punteggio dell'80% corrisponde solitamente a un B- (o circa 24/30).",
      },
      {
        question: "Come si calcola la percentuale del voto?",
        answer:
          "Dividi i punti ottenuti per il totale possibile e moltiplica per 100 (es. 42 su 50 = 84%).",
      },
    ],
    zh: [
      {
        question: "什么是成绩计算器？",
        answer:
          "成绩计算器是一个免费的交互式在线工具，供学生即时计算课程总成绩、百分比、等级成绩以及 4.0 GPA 绩点。",
      },
      {
        question: "如何计算我的成绩？",
        answer:
          "在计分系统中：1. 累加所有获得的得分；2. 累加总配分；3. 得分除以总分后乘以 100 即可得到百分比。例如：(255 ÷ 300) × 100 = 85.0%。",
      },
      {
        question: "如何计算期末考试需要考多少分？",
        answer:
          "使用公式：所需分数 = (目标总成绩 - 当前成绩 × (1 - 期末考试权重)) ÷ 期末考试权重。",
      },
      {
        question: "加权成绩是如何运作的？",
        answer:
          "在加权评分系统中，不同类别（作业、测验、期中考、期末考）按大纲分配不同比例，总成绩为各项加权乘积之和。",
      },
      {
        question: "如何计算 GPA 绩点？",
        answer:
          "标准 4.0 GPA 将字母成绩转换为绩点（A=4.0, B=3.0, C=2.0, D=1.0, F=0.0），并根据课程学分进行加权平均。",
      },
      {
        question: "90% 是什么等级？",
        answer:
          "在标准评分等级中，90% 通常对应 A- 等级（或优异成绩）。",
      },
      {
        question: "80% 是什么等级？",
        answer:
          "80% 通常对应 B-（2.7 GPA）或中上等良好成绩。",
      },
      {
        question: "如何将分数换算为百分比？",
        answer:
          "用得分除以总满分并乘以 100（例如 42 分满分 50 分：(42 ÷ 50) × 100 = 84%）。",
      },
    ],
    ja: [
      {
        question: "成績計算機とは何ですか？",
        answer:
          "成績計算機は、コースの総合得点率、評価記号（A〜F）、および 4.0 基準の GPA を即座に算出できる無料のオンライン計算ツールです。",
      },
      {
        question: "成績はどのように計算しますか？",
        answer:
          "獲得した総得点を満点合計で割り、100を掛けます。例：300点満点中255点の場合、(255 ÷ 300) × 100 = 85.0% となります。",
      },
      {
        question: "期末試験で必要な目標点数の求め方は？",
        answer:
          "計算式：必要点数 = (目標成績 - 現在の成績 × (1 - 期末試験の配点比率)) ÷ 期末試験の配点比率。",
      },
      {
        question: "加重成績とはどのような仕組みですか？",
        answer:
          "課題、小テスト、中間試験、期末試験など、シラバスで指定された配分割合（ウェイト）を掛けて総合評価を算出します。",
      },
      {
        question: "GPAはどのように計算しますか？",
        answer:
          "各コースの評価を 4.0 スケール（A=4.0, B=3.0, C=2.0...）のポイントに換算し、単位数で加重平均して計算します。",
      },
      {
        question: "90パーセントはどの評価ですか？",
        answer:
          "標準的な評価基準では、90%は通常 A-（または優・秀）に相当します。",
      },
      {
        question: "80パーセントはどの評価ですか？",
        answer:
          "80%は通常 B-（GPA 2.7相当、または良）に該当します。",
      },
      {
        question: "得点をパーセンテージに換算するには？",
        answer:
          "得点を配点満点で割り、100を掛けます（例：50点中42点は 84%）。",
      },
    ],
  };

  if (localizedFaqSets[locale]) {
    return localizedFaqSets[locale];
  }

  // Fallback localized FAQs using translation keys
  return [
    {
      question: `${t.brand} – ${t.howToCalculate}?`,
      answer: `${t.tagline}\n1. ${t.step1Desc}\n2. ${t.step2Desc}\n3. ${t.step3Desc}\n4. ${t.step4Desc}`,
    },
    {
      question: `${t.finalGradeCalculator} – ${t.scoreNeeded}?`,
      answer: `${t.scoreNeededDesc}`,
    },
    {
      question: `${t.weightedGradeCalculator} – ${t.category} & ${t.weight}?`,
      answer: `${t.howItWorksSubtitle}`,
    },
    {
      question: `${t.gpaCalculator} – ${t.cumulativeGpa}?`,
      answer: `${t.gradeScaleSubtitle}`,
    },
    {
      question: `${t.gradingScale} & ${t.percentageRange}?`,
      answer: `${t.gradeScaleTitle}: A (90-100%), B (80-89%), C (70-79%), D (60-69%), F (<60%).`,
    },
  ];
}

/**
 * Returns localized FAQs for subpages (e.g. /final-grade-calculator, /weighted-grade-calculator).
 */
export function getLocalizedSubpageFaqs(
  slug: string,
  locale: string,
  toolTitle: string
): FAQItem[] {
  const t = getTranslations(locale);

  const subFaqs: Record<string, FAQItem[]> = {
    es: [
      {
        question: `¿Cómo funciona ${toolTitle}?`,
        answer: `Ingresa las calificaciones de tus tareas, ponderaciones o créditos. La herramienta calcula porcentajes, calificaciones en letra y GPA en tiempo real directamente en tu navegador.`,
      },
      {
        question: "¿Se guardan o comparten mis datos académicos?",
        answer: "No. Todos los cálculos se realizan 100% en tu navegador. No almacenamos ni compartimos tus calificaciones ni datos personales.",
      },
      {
        question: "¿Puedo personalizar la escala de calificación?",
        answer: "Sí. Puedes alternar entre escalas estándar con más/menos, escalas de 10 puntos o porcentajes personalizados según el plan de estudios.",
      },
    ],
    fr: [
      {
        question: `Comment fonctionne ${toolTitle} ?`,
        answer: `Entrez vos notes, coefficients ou crédits. L'outil calcule les pourcentages, mentions et GPA en temps réel directement dans votre navigateur.`,
      },
      {
        question: "Mes données scolaires sont-elles conservées ou partagées ?",
        answer: "Non. Tous les calculs s'exécutent 100% côté client dans votre navigateur. Nous ne stockons ni ne partageons vos données.",
      },
      {
        question: "Puis-je personnaliser le barème de notation ?",
        answer: "Oui. Vous pouvez basculer entre barèmes standards (lettres, 10 points ou pourcentages personnalisés) selon votre programme.",
      },
    ],
    de: [
      {
        question: `Wie funktioniert ${toolTitle}?`,
        answer: `Gib deine Noten, Gewichtungen oder Credits ein. Das Tool berechnet Prozentsätze, Noten und GPA in Echtzeit direkt im Browser.`,
      },
      {
        question: "Werden meine Noten gespeichert oder weitergegeben?",
        answer: "Nein. Alle Berechnungen laufen zu 100% lokal im Browser deines Geräts. Wir speichern keine Noten oder persönlichen Daten.",
      },
      {
        question: "Kann ich die Notenskala anpassen?",
        answer: "Ja. Du kannst zwischen Standard-Skalen, 10-Punkte-Skalen oder individuellen Prozentgrenzen wechseln.",
      },
    ],
    ar: [
      {
        question: `كيف تعمل أداة ${toolTitle}؟`,
        answer: `أدخل درجاتك وأوزان الفئات أو الساعات المعتمدة. تقوم الأداة بحساب النسب والدرجات الحرفية ونقاط المعدل فورياً داخل متصفحك.`,
      },
      {
        question: "هل يتم تخزين بياناتي الدراسية أو مشاركتها؟",
        answer: "لا. تتم جميع العمليات الحسابية بنسبة 100% في المتصفح محلياً دون تخزين أو جمع أي بيانات دراسية أو شخصية.",
      },
      {
        question: "هل يمكنني تخصيص مقياس الدرجات؟",
        answer: "نعم. يمكنك التبديل بين المقاييس القياسية ومقياس الـ 10 نقاط أو النسب المخصصة حسب منهجك الدراسي.",
      },
    ],
    pt: [
      {
        question: `Como funciona a ferramenta ${toolTitle}?`,
        answer: `Insira suas notas, pesos ou créditos. A calculadora processa porcentagens, conceitos e GPA em tempo real diretamente no seu navegador.`,
      },
      {
        question: "Meus dados acadêmicos são armazenados ou compartilhados?",
        answer: "Não. Todos os cálculos ocorrem 100% no seu navegador. Não salvamos nem compartilhamos suas notas ou informações pessoais.",
      },
      {
        question: "Posso personalizar a escala de notas?",
        answer: "Sim. Você pode escolher entre escalas padrão, escala de 10 pontos ou percentuais personalizados conforme seu programa de estudos.",
      },
    ],
    ru: [
      {
        question: `Как работает ${toolTitle}?`,
        answer: `Введите свои оценки, весовые коэффициенты или кредиты. Инструмент в реальном времени рассчитывает проценты, оценки и GPA в вашем браузере.`,
      },
      {
        question: "Сохраняются ли мои академические данные?",
        answer: "Нет. Все вычисления выполняются на 100% локально в вашем браузере. Мы не храним и не передаем ваши личные данные.",
      },
      {
        question: "Можно ли настроить шкалу оценок?",
        answer: "Да. Вы можете переключаться между стандартной шкалой, 10-балльной системой или собственными процентными порогами.",
      },
    ],
    zh: [
      {
        question: `${toolTitle} 如何工作？`,
        answer: `输入您的作业成绩、权重或学分。计算器将在浏览器端实时计算百分比、等级和 GPA 绩点。`,
      },
      {
        question: "我的学业成绩数据会被保存或分享吗？",
        answer: "不会。所有计算 100% 在您的本地浏览器中完成，我们不会存储或共享您的任何学业成绩与个人数据。",
      },
      {
        question: "我可以自定义评分标准吗？",
        answer: "可以。您可以在标准评分制、10分制或自定义分数分界之间自由切换。",
      },
    ],
  };

  if (subFaqs[locale]) {
    return subFaqs[locale];
  }

  // Fallback
  return [
    {
      question: `How does ${toolTitle} work?`,
      answer: `Enter your grades, points, or category weights. The tool calculates percentages, letter grades, and GPA in real time directly in your browser.`,
    },
    {
      question: "Is my academic data stored or shared?",
      answer: "No. All calculations run 100% client-side in your device's browser. We do not store, track, or share your academic grades or personal course data.",
    },
    {
      question: "Can I customize the grading scale?",
      answer: "Yes. You can switch between standard plus/minus scales, 10-point scales, or custom percentage cutoffs matching your school syllabus.",
    },
  ];
}

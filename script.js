const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

/* Scroll-driven vertical emotion timeline */
const emotionSection = document.querySelector(".emotion-section");
const emotionScrollLine = document.querySelector(".emotion-scroll-line");
const emotionSteps = document.querySelectorAll(".emotion-step");
const emotionLineFill = document.getElementById("emotionLineFill");
const murderSection = document.querySelector(".murder-section");

function setEmotionLineGeometry() {
  if (!emotionScrollLine || !emotionLineFill || emotionSteps.length < 2) return;

  const firstDot = emotionSteps[0].querySelector(".emotion-dot");
  const lastDot = emotionSteps[emotionSteps.length - 1].querySelector(".emotion-dot");

  if (!firstDot || !lastDot) return;

  const containerRect = emotionScrollLine.getBoundingClientRect();
  const firstRect = firstDot.getBoundingClientRect();
  const lastRect = lastDot.getBoundingClientRect();

  const firstCenter = firstRect.top + firstRect.height / 2 - containerRect.top;
  const lastCenter = lastRect.top + lastRect.height / 2 - containerRect.top;
  const lineHeight = Math.max(lastCenter - firstCenter, 0);

  emotionScrollLine.style.setProperty("--emotion-line-top", `${firstCenter}px`);
  emotionScrollLine.style.setProperty("--emotion-line-height", `${lineHeight}px`);
}

function updateEmotionTimeline() {
  if (!emotionSection || !emotionLineFill || emotionSteps.length === 0) return;

  setEmotionLineGeometry();

  const rect = emotionSection.getBoundingClientRect();
  const scrollableDistance = rect.height - window.innerHeight;

  const progress = Math.min(
    Math.max((-rect.top) / scrollableDistance, 0),
    1
  );

  const lineHeight = parseFloat(
    getComputedStyle(emotionScrollLine).getPropertyValue("--emotion-line-height")
  ) || 0;

  emotionLineFill.style.height = `${progress * lineHeight}px`;

  const activeIndex = Math.min(
    emotionSteps.length - 1,
    Math.floor(progress * emotionSteps.length + 0.15)
  );

  emotionSteps.forEach((step, index) => {
    step.classList.toggle("active", index <= activeIndex);
  });
}

window.addEventListener("scroll", updateEmotionTimeline);
window.addEventListener("load", updateEmotionTimeline);
window.addEventListener("resize", updateEmotionTimeline);

/* Murder section reveal */
const murderObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.28 }
);

murderObserver.observe(murderSection);

/* Choice section */
const choiceOptions = document.querySelectorAll(".choice-option");
const choiceOutput = document.getElementById("choiceOutput");

const choiceTexts = {
  talk: {
    title: "לדבר עם הבל",
    text: "שיחה הייתה יכולה להחזיר את האחווה למרכז. במקום לראות בהבל איום, קין היה יכול לראות בו אח."
  },
  ask: {
    title: "לשאול למה מנחתו לא התקבלה",
    text: "קין היה יכול להפוך את הדחייה לשאלה וללמידה. זוהי אפשרות של תיקון במקום תגובה מתוך פגיעה."
  },
  pause: {
    title: "להתרחק עד שיירגע",
    text: "לפעמים הבחירה המוסרית הראשונה היא עצירה. לא פתרון מלא, אבל דרך למנוע מהכעס להפוך למעשה."
  },
  anger: {
    title: "לפעול מתוך הכעס",
    text: "זו הדרך שמובילה לטרגדיה. הסיפור מציג את קין לפני נקודת האל־חזור, אבל הוא בוחר לא למשול ברגש."
  }
};

choiceOptions.forEach((button) => {
  button.addEventListener("click", () => {
    choiceOptions.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const selected = choiceTexts[button.dataset.choice];

    choiceOutput.innerHTML = `
      <h3>${selected.title}</h3>
      <p>${selected.text}</p>
    `;
  });
});

/* Clean auto-advance quiz */
const quizQuestions = [
  {
    question: "מי היו הוריהם של קין והבל?",
    answers: ["אברהם ושרה", "יצחק ורבקה", "אדם וחווה"],
    correct: 2
  },
  {
    question: "במה עסק קין?",
    answers: ["רועה צאן", "עובד אדמה", "צייד"],
    correct: 1
  },
  {
    question: "במה עסק הבל?",
    answers: ["סופר", "עובד אדמה", "רועה צאן"],
    correct: 2
  },
  {
    question: "מה הביאו קין והבל לאלוהים?",
    answers: ["מנחה", "עיר חדשה", "בגדים"],
    correct: 0
  },
  {
    question: "איזו מנחה התקבלה?",
    answers: ["מנחת קין", "מנחת הבל", "שתיהן נדחו"],
    correct: 1
  },
  {
    question: "מה הייתה תגובת קין?",
    answers: ["הוא כעס ונפלו פניו", "הוא שמח בשביל הבל", "הוא עזב מיד את הארץ"],
    correct: 0
  },
  {
    question: "מה פירוש “ואתה תמשול בו”?",
    answers: ["האדם יכול לשלוט בדחף ולבחור אחרת", "החטא כבר נעשה", "אין לקין אחריות"],
    correct: 0
  },
  {
    question: "מה עונה קין לשאלה “אי הבל אחיך?”",
    answers: ["“השומר אחי אנוכי?”", "סלח נא כי חטאתי”", "“יצא לשוח בשדה"],
    correct: 0
  }
];

let currentQuestion = 0;
let correctCount = 0;
let answeredQuestions = [];

const quizCounter = document.getElementById("quizCounter");
const quizQuestion = document.getElementById("quizQuestion");
const quizAnswers = document.getElementById("quizAnswers");
const quizFinal = document.getElementById("quizFinal");
const quizScoreText = document.getElementById("quizScoreText");
const resetQuiz = document.getElementById("resetQuiz");

function saveQuiz() {
  localStorage.setItem("kayinHevelCurrentQuestion", currentQuestion);
  localStorage.setItem("kayinHevelCorrectCount", correctCount);
  localStorage.setItem("kayinHevelAnsweredQuestions", JSON.stringify(answeredQuestions));
}

function loadQuiz() {
  const savedCurrent = localStorage.getItem("kayinHevelCurrentQuestion");
  const savedCorrect = localStorage.getItem("kayinHevelCorrectCount");
  const savedAnswered = localStorage.getItem("kayinHevelAnsweredQuestions");

  if (savedCurrent !== null) {
    currentQuestion = Number(savedCurrent);
  }

  if (savedCorrect !== null) {
    correctCount = Number(savedCorrect);
  }

  if (savedAnswered !== null) {
    answeredQuestions = JSON.parse(savedAnswered);
  }
}

function renderQuiz() {
  if (currentQuestion >= quizQuestions.length) {
    showFinalScore();
    return;
  }

  const item = quizQuestions[currentQuestion];

  quizFinal.classList.add("hidden");
  quizQuestion.classList.remove("hidden");
  quizAnswers.classList.remove("hidden");

  quizCounter.textContent = `שאלה ${currentQuestion + 1} מתוך ${quizQuestions.length}`;
  quizQuestion.textContent = item.question;
  quizAnswers.innerHTML = "";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-answer";
    button.textContent = answer;

    button.addEventListener("click", () => {
      const isCorrect = index === item.correct;

      answeredQuestions.push({
        question: item.question,
        selected: answer,
        correct: isCorrect
      });

      if (isCorrect) {
        correctCount++;
      }

      currentQuestion++;
      saveQuiz();

      setTimeout(() => {
        renderQuiz();
      }, 250);
    });

    quizAnswers.appendChild(button);
  });
}

function showFinalScore() {
  quizQuestion.classList.add("hidden");
  quizAnswers.classList.add("hidden");
  quizFinal.classList.remove("hidden");

  quizCounter.textContent = "השאלון הסתיים";
  quizScoreText.textContent = `ענית נכון על ${correctCount} מתוך ${quizQuestions.length} שאלות.`;
}

resetQuiz.addEventListener("click", () => {
  currentQuestion = 0;
  correctCount = 0;
  answeredQuestions = [];

  localStorage.removeItem("kayinHevelCurrentQuestion");
  localStorage.removeItem("kayinHevelCorrectCount");
  localStorage.removeItem("kayinHevelAnsweredQuestions");

  renderQuiz();
});

loadQuiz();
renderQuiz();
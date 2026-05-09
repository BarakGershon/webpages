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

const choiceButtons = document.querySelectorAll(".choice-btn");
const choiceResult = document.getElementById("choiceResult");

const choiceTexts = {
  anger: {
    title: "בחירה: הכעס מנהל את קין",
    className: "warning",
    text: "כאשר קין נותן לכעס לשלוט בו, הוא מפסיק לראות את הבל כאח ורואה בו איום. זו הבחירה שמובילה לאלימות. הפרשנות כאן היא שהסכנה אינה הרגש עצמו, אלא הרגע שבו האדם מוותר על שליטה מוסרית."
  },
  question: {
    title: "בחירה: קין שואל מה אפשר לתקן",
    className: "growth",
    text: "זו הייתה יכולה להיות נקודת מפנה אחרת לגמרי. אם קין היה שואל למה מנחתו לא התקבלה, הסיפור היה הופך מסיפור של רצח לסיפור של למידה וצמיחה. כאן הקנאה הופכת להזדמנות לתיקון."
  },
  brother: {
    title: "בחירה: קין מדבר עם הבל",
    className: "dialogue",
    text: "שיחה עם הבל הייתה יכולה להחזיר את האחווה למרכז. במקום לראות את ההצלחה של הבל כהשפלה, קין היה יכול לראות בו אדם קרוב. הבחירה לדבר היא בחירה להישאר בקשר ולא לברוח לאלימות."
  }
};

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    choiceButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selected = choiceTexts[button.dataset.choice];

    choiceResult.className = "choice-result";
    choiceResult.classList.add(selected.className);
    choiceResult.innerHTML = `
      <h3>${selected.title}</h3>
      <p>${selected.text}</p>
    `;
  });
});

const meterFill = document.getElementById("meterFill");
const moveMeter = document.getElementById("moveMeter");
const meterText = document.getElementById("meterText");

const meterSteps = [
  {
    width: "25%",
    text: "בשלב הראשון יש פגיעה. עדיין יש אפשרות לעצור, לדבר, להבין."
  },
  {
    width: "50%",
    text: "הפגיעה הופכת לקנאה. קין מתחיל להשוות את עצמו להבל ומרגיש שההצלחה של אחיו באה על חשבונו."
  },
  {
    width: "75%",
    text: "הקנאה הופכת לכעס. זהו הרגע שבו הסיפור מזהיר: החטא רובץ בפתח, אבל עדיין אפשר למשול בו."
  },
  {
    width: "100%",
    text: "כשהכעס הופך לאלימות, הבחירה כבר נעשתה. הטרגדיה היא שקין יכול היה לעצור לפני כן."
  }
];

let meterIndex = 0;

moveMeter.addEventListener("click", () => {
  meterIndex = (meterIndex + 1) % meterSteps.length;
  meterFill.style.width = meterSteps[meterIndex].width;
  meterText.textContent = meterSteps[meterIndex].text;
});

const accordionButtons = document.querySelectorAll(".accordion-btn");

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    content.classList.toggle("open");
  });
});

const summaryBtn = document.getElementById("summaryBtn");
const summaryLine = document.getElementById("summaryLine");

summaryBtn.addEventListener("click", () => {
  summaryLine.classList.toggle("hidden");
  summaryBtn.textContent = summaryLine.classList.contains("hidden")
    ? "הצג משפט סיכום קצר"
    : "הסתר משפט סיכום";
});

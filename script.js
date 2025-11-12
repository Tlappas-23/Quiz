// === DOM Elements ===
const startScreen = document.getElementById("start-screen");
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const scoreText = document.getElementById("score-text");
const progressText = document.getElementById("progress-text");

// === Quiz Data ===
const quizData = [
  {
    question: "Which array method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0
  },
  {
    question: "What keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "constant"],
    answer: 2
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["/* */", "//", "#", "<!-- -->"],
    answer: 1
  },
  {
    question: "Which method converts JSON data to a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "toObject()"],
    answer: 0
  },
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Management", "Digital Object Map", "Desktop Oriented Mode"],
    answer: 0
  }
];

// === Quiz State ===
let currentQuestionIndex = 0;
let score = 0;

// === Start Quiz ===
function startQuiz() {
  startScreen.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

// === Load Question ===
function loadQuestion() {
  const current = quizData[currentQuestionIndex];
  questionText.textContent = current.question;
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
  optionsContainer.innerHTML = "";

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-button");
    button.addEventListener("click", () => handleAnswer(index));
    optionsContainer.appendChild(button);
  });

  nextButton.classList.add("hidden");
}

// === Handle User Answer ===
function handleAnswer(selectedIndex) {
  const current = quizData[currentQuestionIndex];
  const optionButtons = document.querySelectorAll(".option-button");

  // Disable all options after one selection
  optionButtons.forEach(btn => btn.disabled = true);

  // Check correctness and apply styles
  if (selectedIndex === current.answer) {
    optionButtons[selectedIndex].classList.add("correct");
    score++;
  } else {
    optionButtons[selectedIndex].classList.add("incorrect");
    optionButtons[current.answer].classList.add("correct");
  }

  nextButton.classList.remove("hidden");
}

// === Next Question or End Quiz ===
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

// === Show Final Score ===
function showScore() {
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${quizData.length}!`;
}

// === Restart Quiz ===
function restartQuiz() {
  scoreContainer.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

// === Event Listeners ===
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

// === Dynamic Footer Year ===
document.getElementById("year").textContent = new Date().getFullYear();


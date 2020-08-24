const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Who is the best singer?",
    answers: [
      { text: "Taio Cruz", correct: false },
      { text: "Lil Wayne", correct: false },
      { text: "Rammstein", correct: false },
      { text: "Tom Macdonald", correct: true },
    ],
  },
  {
    question: "Who is the fittest on earth?",
    answers: [
      { text: "Matt Fraser", correct: false },
      { text: "Noah Ohlsen", correct: false },
      { text: "Rich Froning", correct: true },
      { text: "Ben Smith", correct: false },
    ],
  },
  {
    question: "Who is the best YouTuber?",
    answers: [
      { text: "Ryan Humiston", correct: true },
      { text: "Greg Doucette", correct: true },
      { text: "Chris Bumstead", correct: true },
      { text: "Techlead", correct: true },
    ],
  },
  {
    question: "Is web development awesome??",
    answers: [
      { text: "Slightly", correct: false },
      { text: "YES!!!", correct: true },
      { text: "No", correct: false },
      { text: "Dont know, never tried!", correct: false },
    ],
  },
  {
    question: "Who does the best coding bootcamp?",
    answers: [
      { text: "Code Institute", correct: true },
      { text: "freeCodeCamp", correct: true },
      { text: "Code Academy", correct: true },
      { text: "Clever Programmer", correct: true },
    ],
  },
];

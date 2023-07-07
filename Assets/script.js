var questions = [
  {
    question: "What does the DOM stand for in JavaScript?",
    choices: ["Document Object Model", "Data Oriented Model", "Document Order Model", "Dynamic Object Management"],
    answer: "Document Object Model"
  },
  {
    question: "Which keyword is used to declare a constant variable in JavaScript?",
    choices: ["var", "const", "var", "constvar"],
    answer: "const"
  },
  {
    question: "Which built-in method in JavaScript is used to remove whitespace from both ends of a string?",
    choices: ["trim()", "split()", "concat()", "replace()"],
    answer: "trim()"
  },
  {
    question: "What does the typeof operator in JavaScript return for the boolean data type?",
    choices: ["number", "string", "undefined",  "boolean"],
    answer: "boolean"
  },
  {
    question: "What is the correct syntax for a single-line comment in JavaScript?",
    choices: ["<!-- This is a comment -->", "** This is a comment **", "// This is a comment", "/* This is a comment */"],
    answer: "// This is a comment"
  }
];

var quizContainer = document.getElementById("quiz-container");
var resultContainer = document.getElementById("result-container");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var resultElement = document.getElementById("result");
var initialsInput = document.getElementById("initials");
var scoreForm = document.getElementById("score-form");
var submitButton = document.querySelector("#score-form button[type='submit']");
var timerElement = document.getElementById("timer");
var tryAgainButton = document.getElementById("try-again-button");
var scoreSection = document.getElementById("score-section");
var scoreList = document.getElementById("score-list");

var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;
var timerInterval;
var quizFinished = false;

function startQuiz() {
  startButton.style.display = "none";
  quizContainer.style.display = "block";
  resultContainer.style.display = "none";
  score = 0;
  currentQuestionIndex = 0;
  quizFinished = false;
  startTimer();
  showQuestion();
}

function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach(choice => {
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", function() {
      checkAnswer(choice);
    });
    li.appendChild(button);
    choicesElement.appendChild(li);
  });
}

function checkAnswer(answer) {
  if (quizFinished) {
    return;
  }

  var currentQuestion = questions[currentQuestionIndex];
  if (answer === currentQuestion.answer) {
    score++;
    resultElement.textContent = "Correct!";
  } else {
    resultElement.textContent = "Wrong! The correct answer is: " + currentQuestion.answer;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  resultElement.textContent = "Quiz finished! Your score: " + score;

  submitButton.style.display = "block";
  tryAgainButton.style.display = "block";
  scoreForm.style.display = "block";

  submitButton.addEventListener("click", saveScore);

  quizFinished = true;
  scoreSection.style.display = "block";
}

function startTimer() {
  timerElement.textContent = timeLeft;
  timerInterval = setInterval(function() {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0 || quizFinished) {
      endQuiz();
    }
  }, 1000);
}
function saveScore(event) {
  event.preventDefault();

  var initials = initialsInput.value.trim();
  var scoreItem = document.createElement("li");
  scoreItem.textContent = initials + " - " + score;
  scoreList.appendChild(scoreItem);

  var savedScores = localStorage.getItem("scores");
  var scores = savedScores ? JSON.parse(savedScores) : [];
  scores.push({ initials: initials, score: score });
  
  scores.sort(function(a, b) {
    return b.score - a.score;
  });
  
  localStorage.setItem("scores", JSON.stringify(scores));

  initialsInput.value = "";
  submitButton.style.display = "none";
}

function tryAgain() {
  tryAgainButton.style.display = "none";
  submitButton.style.display = "none";
  scoreSection.style.display = "none";
  restartQuiz();
}

function restartQuiz() {
  quizContainer.style.display = "block";
  resultContainer.style.display = "none";
  score = 0;
  currentQuestionIndex = 0;
  timeLeft = 60;
  startQuiz();
}

var startButton = document.getElementById("start-button");
startButton.addEventListener("click", startQuiz);



scoreForm.style.display = "none"; 
submitButton.style.display = "none";
scoreSection.style.display = "none"; 

var savedScores = localStorage.getItem("scores");
if (savedScores) {
  var scores = JSON.parse(savedScores);
  scores.forEach(function(scoreItem) {
    var li = document.createElement("li");
    li.textContent = scoreItem.initials + " - " + scoreItem.score;
    scoreList.appendChild(li);
  });
  scoreSection.style.display = "block";
}

tryAgainButton.addEventListener("click", tryAgain);

window.addEventListener("DOMContentLoaded", function() {
  submitButton.style.display = "none";
});

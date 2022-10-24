// Array of question objects
var questions = [
  {
    question: "Commonly used data types do not include:",
    answer: "Hyper Text Markup Language",
    options: [
      "booleans",
      "numbers",
      "strings",
      "Hyper Text Markup Language"
    ]
  },
  {
    question: "The condition inside an if/else satement is stored inside:",
    answer: "parentheses",
    options: [
      "parentheses",
      "curly brackets",
      "quotation marks",
      "square brackets"
    ]
  },
  {
    question: "Arrays in JavaScript can be used to store:",
    answer: "all of the above",
    options: [
      "strings",
      "arrays",
      "numbers",
      "all of the above"
    ]
  },
  {
    question: "String values must be enclosed within __ when being assigned to variables.",
    answer: "quotes",
    options: [
      "question marks",
      "quotes",
      "square brackets",
      "parentheses"
    ]
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer: "console.log()",
    options: [
      "for loops",
      "terminal/bash",
      "JavaScript",
      "console.log()"
    ]
  },
  //   {
  //   question: "Your Question is Here",
  //   answer: "Correct answer of the question is here",
  //   options: [
  //     "Option 1",
  //     "option 2",
  //     "option 3",
  //     "option 4"
  //   ]
  // },
];

//Sets element query selections and defines variables
var startButton = document.querySelector(".start");
var startBox = document.querySelector(".start-box");
var quizBox = document.querySelector(".quiz-box");
var finishBox = document.querySelector(".finish-box");
var highScoreBox = document.querySelector(".high-score-box");
var timer = document.querySelector("#timer");
var highScoreLink = document.querySelector('#high-score');
var questionsContainer = document.querySelector(".questions");
var validText = document.querySelector(".validity-text");
var validTextBorder = document.querySelector(".validity");
var finalScore = document.querySelector(".final-score");
var initialInput = document.querySelector(".initial-input");
var submitButton = document.querySelector(".submit-button");
var highScores = document.querySelector(".high-score-list");
var goBack = document.querySelector(".back");
var clearScores = document.querySelector(".clear");
var scoreOutput = document.querySelector(".score-output");
var secondsLeft = 45;
var currentQuestion = 0;
var initialScoreArray;
var highScoreArray;
var score;

// sets Quiz Timer
function setTime() {                          
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      score = 0;
      quizBox.classList.add("hidden");
      finishBox.classList.remove("hidden");
      scoreOutput.textContent = "Final Score: 0";
    }
    else if (secondsLeft < 0) {
      clearInterval(timerInterval);
      secondsLeft = 0;
      score = 0;
      timer.textContent = "Time: " + secondsLeft;
      quizBox.classList.add("hidden");
      finishBox.classList.remove("hidden");
      scoreOutput.textContent = "Final Score: 0";
    }
    else if (currentQuestion === questions.length) {
      clearInterval(timerInterval);
      timer.textContent = "Time: " + secondsLeft;
      score = secondsLeft;
      scoreOutput.textContent = "Final Score: " + score;
    }
  }, 1000);
}

// Clicking on Start button starts quiz
startButton.addEventListener("click", function () {
  startBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  setTime();
});

// Clicking on an answer cycles to the next question
questionsContainer.addEventListener("click", function (event) {

  console.log("Clicked an answer");
  console.log(event);
  if (event.target.matches("li")) {
    console.log(event.target.innerText);
    console.log(questions[currentQuestion].answer);
    if (event.target.innerText === questions[currentQuestion].answer) {
      console.log('correct answer');
      validTextBorder.classList.add('validity-result');
      validText.innerText = 'Correct!';
      currentQuestion++;
    }
    else if (event.target !== questions[currentQuestion].answer) {
      console.log('incorrect answer');
      validTextBorder.classList.add('validity-result');
      validText.innerText = 'Incorrect!';
      secondsLeft = secondsLeft - 10;
      currentQuestion++;
    }

    if (currentQuestion != questions.length) { // 0v2 1v2 2v2
      renderQuestion();
    }
    else {
      score = secondsLeft;
      timer.textContent = "Timer: " + score;
      console.log(score)
      quizBox.classList.add("hidden");
      finishBox.classList.remove("hidden");
      scoreOutput.textContent = "Final Score: " + score;
    }
  }
});

// renders questions based on currentQuestions count
function renderQuestion() {
  // console.log("Rendered")
  document.querySelector(".question-title").innerText = questions[currentQuestion].question;
  document.querySelector(".answer-1").innerText = questions[currentQuestion].options[0];
  document.querySelector(".answer-2").innerText = questions[currentQuestion].options[1];
  document.querySelector(".answer-3").innerText = questions[currentQuestion].options[2];
  document.querySelector(".answer-4").innerText = questions[currentQuestion].options[3];
}

renderQuestion();

// Logs user score to high score list in local storage
function logScore(event) {
  // Prevent default action
  event.preventDefault();
  // console.log(event);
  initialScoreArray = [initialInput.value, score];
  // console.log("this is the initalScoreArray: " + initialScoreArray);
  highScoreArray = JSON.parse(localStorage.getItem('highScore')) ?? [];
  highScoreArray.push(initialScoreArray);
  // console.log("this is the current highScoreArray: " + highScoreArray);
  // add json string of high score array to local storage
  localStorage.setItem("highScore", JSON.stringify(highScoreArray));
  renderHighScores();

  // const highScores = JSON.parse(highScoreString) ?? []; --> example that acccounts for empty array return
}

// Click on Submit button to log user score to local storage
submitButton.addEventListener("click", logScore);

// render the High Score page
function renderHighScores() {
  // hide finish-box, unhide high-score box
  startBox.classList.add("hidden");
  quizBox.classList.add("hidden");
  finishBox.classList.add("hidden");
  highScoreBox.classList.remove('hidden');
  highScoreLink.classList.add('hidden');
  timer.classList.add('hidden');

  var highScoreList = JSON.parse(localStorage.getItem("highScore"));
  highScoreList.sort(function (a, b) { return b[1] - a[1] });
  for (i = 0; i < highScoreList.length; i++) {
    var user = highScoreList[i];
    var listEl = document.createElement('li');
    highScores.appendChild(listEl);
    listEl.textContent = user[0] + ' - ' + user[1];
  }
}

// render High Score page when clicking on the link at the top of the page
highScoreLink.addEventListener("click", renderHighScores);

// Clicking the Back button takes user back to start page (user can retake quiz)
goBack.addEventListener('click', function(){
  startBox.classList.remove('hidden');
  highScoreBox.classList.add('hidden');
  highScoreLink.classList.remove('hidden');
  timer.classList.remove('hidden');
  highScores.innerHTML = "";
  timer.textContent = 'Time: ';
  currentQuestion = 0;
  secondsLeft = 45;
  validTextBorder.classList.remove('validity-result');
  validText.innerText = '';
  renderQuestion();
})

// Clears high scores list from local storage and display
clearScores.addEventListener('click', function(){
localStorage.clear();
highScores.innerHTML = "";

})
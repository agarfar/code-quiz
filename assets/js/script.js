// creating an array and passing the number, questions, options, and answers
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
    answer: "console.log",
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

//selecting all required elements
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
var secondsLeft = 45;
var currentQuestion = 0;
var initialScoreArray;
var highScoreArray;
var score;

function setTime() {                          //Function for timer
  var timerInterval = setInterval(function () {

    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      score = 0;
      quizBox.classList.add("hidden");
      finishBox.classList.remove("hidden");
    }
    else if (secondsLeft <= 0) {
      secondsLeft = 0;
      score = 0;
      timer.textContent = "Time: " + secondsLeft;
      quizBox.classList.add("hidden");
      finishBox.classList.remove("hidden");
    }
  }, 1000);
}

startButton.addEventListener("click", function () {
  startBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  // setTime();
});

questionsContainer.addEventListener("click", function (event) {

  console.log("Clicked an answer");
  console.log(event);
  if (event.target.matches("li")) {
    console.log(event.target.innerText);
    console.log(questions[currentQuestion].answer);
    //TODO: Check validity and save to validity-text
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

    if (currentQuestion != questions.length - 1) { // 0v2 1v2 2v2
      // currentQuestion++;
      renderQuestion();
    }
    else {
      score = secondsLeft;
      console.log(score)
      quizBox.classList.add("hidden");
      finishBox.classList.remove("hidden");
    }
    // currentQuestion++;
  }
});

function renderQuestion() {
  console.log("Rendered")
  //debugger
  document.querySelector(".question-title").innerText = questions[currentQuestion].question;
  document.querySelector(".answer-1").innerText = questions[currentQuestion].options[0];
  document.querySelector(".answer-2").innerText = questions[currentQuestion].options[1];
  document.querySelector(".answer-3").innerText = questions[currentQuestion].options[2];
  document.querySelector(".answer-4").innerText = questions[currentQuestion].options[3];
}

renderQuestion();

function logScore(event) {
  // Prevent default action
  event.preventDefault();
  console.log(event);
  initialScoreArray = [initialInput.value, score];
  console.log("this is the initalScoreArray: " + initialScoreArray);
  highScoreArray = JSON.parse(localStorage.getItem('highScore')) ?? [];
  highScoreArray.push(initialScoreArray);
  console.log("this is the current highScoreArray: " + highScoreArray);
  // add json string of high score array to local storage
  localStorage.setItem("highScore", JSON.stringify(highScoreArray));
  //  work on renderHighScores

  // const highScores = JSON.parse(highScoreString) ?? []; --> example that acccounts for empty array return
}

// Add listener to submit element
submitButton.addEventListener("click", logScore);

function renderHighScores() {
  // hide finish-box, unhide high-score box
  finishBox.classList.add("hidden");
  var highScoreList = JSON.parse(localStorage.getItem("highScore"));
  // write for loop to loop thru high scores and add concatenated index values of each item 
  // into li elements within ordered list

}

highScoreLink.addEventListener("click", renderHighScores);
// renderHighScores();
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
  // you can uncomment the below codes and make duplicate as more as you want to add question
  // but remember you need to give the numb value serialize like 1,2,3,5,6,7,8,9.....
  //   {
  //   numb: 6,
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
var timer = document.querySelector("#timer")
var questionsContainer = document.querySelector(".questions");
var validText = document.querySelector(".validity-text");
var finalScore = document.querySelector(".final-score")
var currentQuestion = 0;
var secondsLeft = 45;

function setTime() {                          //Function for timer
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      quizBox.classList.add("hidden");
      finish-box.classList.remove("hidden");
    }
    else if(secondsLeft <= 0){
      secondsLeft = 0;
      timer.textContent = "Time: " + secondsLeft;
      quizBox.classList.add("hidden");
      finish-box.classList.remove("hidden");
    }
  }, 1000);
}

startButton.addEventListener("click", function () {
  startBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  setTime();


});



questionsContainer.addEventListener("click", function (event) {

  console.log("Clicked an answer");
  console.log(event);
  if (event.target.matches("li")) {
    console.log(event.target.innerText);
    console.log(questions[currentQuestion].answer);
    //TODO: Check validity and save to validity-text
    if (event.target.innerText === questions[currentQuestion].answer){
      console.log('correct answer');
      validText.innerText = 'Correct!';
      currentQuestion++;
    }
    else if(event.target !== questions[currentQuestion].answer){
      console.log('incorrect answer');
      validText.innerText = 'Incorrect!';
      secondsLeft = secondsLeft - 10;
      currentQuestion++;
    }

    if (currentQuestion != questions.length - 1) { // 0v2 1v2 2v2
      // currentQuestion++;
      renderQuestion();
    } 
    else {
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




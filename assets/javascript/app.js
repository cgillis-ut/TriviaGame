var remainingQandAs = [ 
  {
      question: "Who had a reputation of being a crass alcoholic?",
      answers: [ "Stanley", "Phyllis", "Creed", "Meredith" ],
      correctAnswer: "Meredith",

    }, {
      question: "Who did Michael get engaged to before leaving Scranton?",
      answers: [ "Marie", "Jan", "Carol", "Angela" ],
      correctAnswer: "Holly"
    }, {
      question: "How did Michael burn his foot?",
      answers: [ "George Forman Grill", "Rolling Rotisserie", "Toaster", "Microwave Oven" ],
      correctAnswer: "George Forman Grill"
    }, {
      question: "Which country did Toby take a not-so permanent vacation in?",
      answers: [ "Mexico", "Puerto Rico", "Fiji", "Costa Rica" ],
      correctAnswer: "Costa Rica"
    }, {
      question: "What is the name of Andy Bernard's a cappella group?",
      answers: [ "Pitch Perfect", "En Vogue", "Here Comes Treble", "Chord on Blues" ],
      correctAnswer: "Here Comes Treble"
    }

  ];

var timeRemaining = 0;
var timer;
var restart;
var choices;
var pause;
var currentQandA;
var rightAnswers = [];
var wrongAnswers = [];
var unanswered = [];

//in progress....
  function displayResultsPage(){
    $("#current-question").empty();
      $("#choices-container").empty();
      selectImage();
  }


//event delegation to evaluate user clicks 
 $(document).on("click", "span", calculateChoice);
  
  function calculateChoice() {
    //time is paused when user selects a choice
    clearTimeout(timer);
      
    //captures what user clicked
      var userChoice = $(this).attr("data-name");
      
      //evaluates...
      if ( userChoice == currentQandA.correctAnswer ) {
        displayResultsPage();
        //stores obj into right array
        rightAnswers.push(currentQandA);
      $("#results-box").text("YES. That's absolutely right!");
      resumeGame();
    } else if(userChoice !== currentQandA.correctAnswer){
      displayResultsPage();
      $("#results-box").text("Nope, nope & nope.");
      //stores obj into right array
      wrongAnswers.push(currentQandA);
      resumeGame();
    } 
  
  }


//in progress.... building a general game function
function startGame(){
  //stops game when all (5) questions have been asked..
  if((unanswered.length + rightAnswers.length + wrongAnswers.length) == 5){
    //stop timer(s)
    clearTimeout(timer);
    clearTimeout(pause);

    //empty current question
    $("#current-question").empty();
    //display results page
    var gameOver = $("#final-score")
    .html("Well. I bet you're glad this is over..." + 
      "<br>Here's how you did..." + "<br>" + 
      "Correct Answers: " + rightAnswers.length + "<br>" +
      "Incorrect: " + wrongAnswers.length + "<br>" + 
      "Didn't bother to click: " + unanswered.length);

    startAgain();

  } else {
    askQuestion();
    displayChoices();
    }
}

function startAgain(){
  
  //creates start over button
  var startOverButton = $("<button>");
  startOverButton.text("Start Over?");
  $("#final-score").append(startOverButton);


  $("button").on("click", function(){


    //when button is clicked, it will disappear
    $("button").remove();
    
//page will refresh
  location.reload();

  });

}

//posts current question in accompanying div
function askQuestion(){

  //when total length of all arrays = 5
  
  currentQandA = remainingQandAs.pop();
  $("#current-question").text(currentQandA.question);
  // console.log(currentQandA);
  // console.log(remainingQandAs.length);
}




function displayChoices(){
  choices = currentQandA.answers;
      
    for ( var i = 0; i < choices.length; i++ ) {
        var choice = $("<span>");
        choice.text(choices[i]);
    choice.attr("id", "choice-" + i );
        choice.attr("data-name", choices[i] );
        $("#choices-container").append(choice);
  }
} 

var images = ["https://media.giphy.com/media/EpHT6msQPAKE8/giphy.gif", 
        "https://media.giphy.com/media/B8laVxoaaUyCA/giphy.gif",
        "https://media.giphy.com/media/baBWucq2gY0HS/giphy.gif",
        "https://media.giphy.com/media/ToMjGpx9F5ktZw8qPUQ/giphy.gif",
        "https://media.giphy.com/media/BuBz6V1s1dVC0/giphy.gif"
        ];

var currentImage;

function selectImage(){
   currentImage = images.pop();
  $("#image-container").append("<img src='" + currentImage + "'>")
}

function resumeGame(){

  pause = setTimeout(function (){ //should be called resumeGame func with other elements like askquestion, display choices
  restartTimer(); 
  startGame();
  $("#results-box").empty();
  //empty right , unanswered or wrong message, and picture
  $("#image-container").empty();

  }, 3000); 
  //console.log("Total length: " + );
}



function restartTimer() {
    clearTimeout( timer );
    timeRemaining = 5; // in seconds
    initiateTimer();
}

function initiateTimer(){

  //text that says Time-Remaining:
    $("#time-remaining-text").text("Time Remaining: ");

    
   //seconds left
   timer = setTimeout(function () {
      $("#timer").text( timeRemaining );
      timeRemaining = timeRemaining - 1;
      initiateTimer();

      //stops timer at 0
      if ( timeRemaining <= -1 ) {
          clearTimeout(timer);
          displayResultsPage();
      $("#results-box").text("Hey.. Are you there?");
          unanswered.push(currentQandA);
          resumeGame(); 
    } 

    }, 500);
}


//// when document loads
$(document).ready(function(){

 //waiting for user to click button to start
 $(".start").on("click", function(){

    //when button is clicked, it will disappear
    $("button").remove();
    
  //timer will start
  restartTimer();

  startGame();

  
  });

});


        //question/ans obj wil be pushed into already-asked array

  ///when user clicks a choice
    //the timer pauses  

      //if the answer is correct
        //answer gets pushed into correct answers array
        //message will say "you're right!"
        //corresponding image will show
    //after a few seconds timer restarts ---does this mean I'm putting my restartTimer into a setTimeout? still stumped on this
      //a question with 4 choices will show
        //question/ans obj wil be pushed into already-asked array
        

      //if the answer is incorrect
        //answer gets pushed into incorrect answers array
      //message will say "sorry wrong answer!"
        //corresponding image will show
    //after a few seconds timer restarts
      //a question with 4 choices will show
        //question/ans obj wil be pushed into already-asked array

      //if time runs out and user did not click an answer
        //'something' gets pushed into unanswered array --- can you give me a suggestion on how to capture no user input?
      //message will say "time's up!"
        //corresponding image will show 
    //after a few seconds timer restarts

  ///if there are no questions left
    //the timer pauses
    //the amount in correct, incorrect and unanswered questions/ans array will be counted
    //then displayed
    //a button will ask 'start over?'
      //perhaps button will have same function as start button


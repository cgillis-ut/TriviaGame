var remainingQandAs = [ 
	{
      question: "what is the color of the moon?",
      answers: [ "Gray", "Blue", "Red", "Green" ],
      correctAnswer: "Gray",

    }, {
      question: "where does batman live?",
      answers: [ "Gotham", "New York", "LA", "Atlanta" ],
      correctAnswer: "Gotham"
    }, {
      question: "what is 2 + 2?",
      answers: [ "4", "7", "8", "12" ],
      correctAnswer: "4"
    }, {
      question: "what is the microsoft logo?",
      answers: [ "window", "f", "mermaid", "triangle" ],
      correctAnswer: "window"
    }, {
      question: "what is the shape of a wheel?",
      answers: [ "circle", "square", "hexagon", "rectangle" ],
      correctAnswer: "circle"
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
	    // createImage();
	    selectImage();
	}


	

//in progress....
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
			$("#results-box").text("you're correct!");
			resumeGame();
		} else if(userChoice !== currentQandA.correctAnswer){
			displayResultsPage();
			$("#results-box").text("sorry! You're wrong!");
			//stores obj into right array
			wrongAnswers.push(currentQandA);
			resumeGame();
		} 
	
	}


//in progress.... building a general game function
function startGame(){
	askQuestion();
	displayChoices();
}

//posts current question in accompanying div
function askQuestion(){
	currentQandA = remainingQandAs.pop();
	$("#current-question").text(currentQandA.question);
	console.log(currentQandA.question);
}



function displayChoices(){
	choices = currentQandA.answers;
      
    for ( var i = 0; i < choices.length; i++ ) {
        var choice = $("<span>");
        choice.text(choices[i]);
		choice.attr("id", "choice-" + i );
        choice.attr("data-name", choices[i] );
        $("#choices-container").append(choice);
        //<div id="choices-container">
        	//<span id="choice-1" data-name="gray"></span>
       	//</div>



	}
}	

var images = ["assets/images/image1.jpg", 
			  "assets/images/image2.jpg",
			  "assets/images/image3.jpg",
			  "assets/images/image4.jpg",
			  "assets/images/image5.jpg"
			  ];

var correspondingImage;
var currentImage;

function selectImage(){
	 currentImage = images.pop();
	$("#image-container").append("<img src='assets/images/image'" + i + "'.jpg'>")
}

// function createImage() {
// 	for(var i = 1; i < images.length; i++ ){
//         // correspondingImage = currentQandA.image;
//         var image = $("<img>");
//         image.attr("src", "assets/images/image" + i + ".jpg");
//         $("#image-box").append(image); ///if this doesn't work go back to "#image-container", but remember to empty when needed
// 	//**todo: <div id="image-container">
//         	//<img src="assets/images/image+i"> 
//         //</div>
// 	}
// }




function resumeGame(){
 	pause = setTimeout(function (){ //should be called resumeGame func with other elements like askquestion, display choices
	restartTimer(); 
	startGame();
	$("#results-box").empty();
	//empty right , unanswered or wrong message, and picture
	}, 3000); 
}

function restartTimer() {
    clearTimeout( timer );
    timeRemaining = 3; // in seconds
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

      	//while timer is running..do something
      	// askQuestion(); &
      	// displayChoices(); need to be paired

    	//stops timer at 0
    	if ( timeRemaining <= -1 ) {
       	  clearTimeout(timer);
       	  displayResultsPage();
		  $("#results-box").text("Hey.. Are you there?");
       	  unanswered.push(currentQandA);
       	  resumeGame();	
		}	

    }, 1000);
}

// restartTimer();


// if ( timeRemaining <= 0 ) {
  //       //unanswered
  //       unanswered.push( questionObject );
  //       alert( 'Time is UP' );
        
  //         askQuestion();
      
  //     } else {
       
      // }


//// when document loads
$(document).ready(function(){

	//there will be a title ' Totally Trivial Trivia' &
	//start button

 $(".start").on("click", function(){

  //when button is clicked, it will disappear
   $("button").remove();
   	//timer will start
restartTimer();
askQuestion();
displayChoices();
     });
});

//a question with 4 choices will show

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


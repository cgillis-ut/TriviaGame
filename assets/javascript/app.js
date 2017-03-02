
 /*-----do not delete, erase when done <--------- browser:true*/
  "use strict";
  var timeRemaining = 0;
  var questionObject;
  var timer;
  var rightAnswers = [];
  var wrongAnswers = [];
  var unanswered = [];
  var remainingQuestions = [ {
      q: "what is the color of the moon?",
      answer: [ "Gray", "Blue", "Red", "Green" ],
      correct: "Gray",

    }, {
      q: "where does batman live?",
      answer: [ "Gotham", "New York", "LA", "Atlanta" ],
      correct: "Gotham"
    }, {
      q: "what is 2 + 2?",
      answer: [ "4", "7", "8", "12" ],
      correct: "4"
    }, {
      q: "what is the microsoft logo?",
      answer: [ "window", "f", "mermaid", "triangle" ],
      correct: "window"
    },


    {
      q: "what is the shape of a wheel?",
      answer: [ "circle", "square", "hexagon", "rectangle" ],
      correct: "circle"
    }

  ];

  function incrementTimer() {
    $("#time-remaining-text").text("Time Remaining: ");

    timer = setTimeout( function () {
      $("#timer").text( timeRemaining );
      if ( timeRemaining <= 0 ) {
        //unanswered
        unanswered.push( questionObject );
        alert( 'Time is UP' );
        askQuestion();
      } else {
        timeRemaining = timeRemaining - 1;
        incrementTimer();
      }

    }, 1000 );
  }

  function startTimer() {
    clearTimeout( timer );
    timeRemaining = 10; // in seconds
    incrementTimer();
  }

  function askQuestion() {

    if ( remainingQuestions.length <= 0 ) {
      // you done
      clearTimeout(timer);
      alert (" you got correct: " + rightAnswers.length);
      alert (" you got wrong: " + wrongAnswers.length);
      alert (" you got unanswered: " + unanswered.length);
    } 

    else { ///while there are still questions remaining
      startTimer();
      $( '#containerForChoiceOptions' ).html( "" );
      questionObject = remainingQuestions.pop();
      //var answer = prompt( question.q );
      // if ( answer === question.answer )
      //   rightAnswers.push( question );
      // else
      //   wrongAnswers.push( question );
      //   
      var choices = questionObject.answer;
      $( '#asked-question' ).html( questionObject.q );
      for ( var i = 0; i < choices.length; i++ ) {
        var choice = $( '<div>' );
        choice.text( choices[ i ] );
        choice.attr( 'id', "choice-" + i );
        choice.attr( 'index', i );
        $( '#containerForChoiceOptions' ).append( choice );

        choice.click( function () {
          //alert("I GUESSED "+ this.innerHTML);
          if ( this.innerHTML === questionObject.correct ) {
            

          //print you are correct on screen 
          //display image connected to the question

            alert( "YAY" );
            rightAnswers.push( questionObject );
            askQuestion();
          } else {

            //print sorry you're wrong. "The correct answer was ..." on screen
            //display image connected to the question 

            alert( "boo!" );
            wrongAnswers.push( questionObject );
            askQuestion();
          }
        } );
      }
    }
  }

//start screen will have button with event listener
$(document).ready(function(){



//...







 $(".start").on("click", function(){

  //when button is clicked, it will disappear
   $("button").remove();
      askQuestion();
     })
})


//todos: 
  // when question goes unanswered, or is answered - correct or incorrect -- show corresponding image
  //make choice links 'do something when hovered over'
  //add text to final tally page
  //add start over? button
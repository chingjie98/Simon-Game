
var userClickedPattern = [];

var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
// var start = False;
var level = 0;


$(document).keypress(function(){
  if (level == 0){
      $("h1").text("Level " + level);
      nextSequence();
  }
});

$(".btn").click(function(event){

  var userChosenColour = event.target.id;
  playSound(event);
  animatePress(event.target.id);
  userClickedPattern.push(userChosenColour);
  console.log('GamePattern: ' + gamePattern);
  console.log('userClickedPattern: ' + userClickedPattern);
  index = userClickedPattern.length;
  checkAnswer(index-1);


});

function nextSequence(){

  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

}

function playSound(id_identity){

  var audio = new Audio("sounds/" + id_identity.target.id + ".mp3");
  audio.play();

}

function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");

  setTimeout(function() {
  $("." + currentColour).removeClass("pressed");
  //your code to be executed after 1 second
  }, 100);

}

function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length == gamePattern.length){

      setTimeout(function() {
      nextSequence();
      //your code to be executed after 1 second
      }, 500);
    }
  }

  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $(document.body).addClass("game-over");

    setTimeout(function() {
      $(document.body).removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();

  }

}

function startOver(){
  level = 0;
  gamePattern = [];
}

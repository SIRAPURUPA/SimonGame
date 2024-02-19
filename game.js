var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level=0; 

var rate;
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function nextSequence(){
  userClickedPattern=[];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
   if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    rate="success";
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function (){
        nextSequence();
      },1000);
    }
   }
   else{
    rate = "wrong";
   }

   if(rate==="wrong"){

    $("body").addClass("game-over");

    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);

    var aud = new Audio("sounds/"+rate+".mp3");
    aud.play();
    
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
   }
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
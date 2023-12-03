var userClickedPattern = []

buttonColours = ["red", "blue", "green", "yellow"]

gamePattern = []

level = 0;
pressed = true;

$(document).keypress(function() {
    if(pressed){
    nextSequence();
    pressed = false;
    }
})

$(".btn").click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});    


function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    level += 1;
    $("h1").text("Level "+level);
    random_number = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColours[random_number];
    gamePattern.push(randomChosenColor)

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

function animatePress (currentColor) {
    $("#"+currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


function startOver () {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    pressed = true;
}




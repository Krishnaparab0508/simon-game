var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + randomChosenColour).one('click', function () {
        var audio = new Audio('./sounds/' + randomChosenColour + '.mp3');
        audio.play();
    })
    $("h1").text("Level " + level);
    level++;
    userClickedPattern = [];
}
function startOver() {
    level = 0;
    gamePattern = [];
    $("h1").text("Press A Key to Start");
    $("html").one("keypress", function () {
        nextSequence();
    });
}
$("html").one("keypress", function () {
    nextSequence();
});

var userClickedPattern = [];
$(".btn").on('click', function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

})
function playSound() {
    $(".btn").on('click', function () {
        var audio = new Audio('./sounds/' + this.id + '.mp3');
        audio.play();
    })
}
playSound();
function animatePress() {
    $(".btn").on('click', function () {
        var currentColour = this.id;
        $("#" + currentColour).addClass("pressed");
        var timeOut = setTimeout(function () {
            $("#" + currentColour).removeClass("pressed");
        }, 100);
    });
}
animatePress();
$(".btn").on('click', function checkAnswer() {
    var currentLevel = userClickedPattern.length;
    var success = true;
    if (currentLevel === gamePattern.length) {
        for (let i = 0; i < gamePattern.length; i++) {
            if (userClickedPattern[i] !== gamePattern[i]) {
                var wrongAudio = new Audio('./sounds/wrong.mp3');
                wrongAudio.play();
                $("body").addClass("game-over");
                var timeOut2 = setTimeout(function () {
                    $("body").removeClass("game-over");
                }, 200);
                success = false;
            } else {
                console.log("Succes");
            }
        } if (success === true) {
            var timeOut1 = setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        else {
            $("h1").text("Game Over, Press Any Key to Restart");
            $("html").one("keypress", function () {
                startOver();
            });
        }

    }
}
)



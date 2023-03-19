var container = document.querySelector(".container");
var playGame = document.querySelector(".play-game");
var selectInsect = document.querySelector(".select-insect");
var gameMain = document.querySelector(".game-main");
var playButton = document.querySelector(".play-button");
var insect = document.querySelectorAll(".insect");
var timeCount = document.querySelector(".time-count");
var scoreCount = document.querySelector(".score-count");
var gameDisplay = document.querySelector(".game-display");
var gameAlert = document.querySelector(".game-alert");
var playAgain = document.querySelector(".play-again");
var finalScoreBox = document.querySelector(".final-score-box");
var finalScore = document.querySelector(".final-score");

insect[0].classList.add("insect-active");

function startTheGame(element) {

  var image = element.querySelector(".insect img");
  
  for (var i = 0; i < insect.length; i++) {
    insect[i].classList.remove("insect-active");
  }
  
  element.classList.add("insect-active");

  setTimeout(function () {
    selectInsect.classList.remove("viewport-active");
    selectInsect.classList.add("viewport-inactive");
    gameMain.classList.remove("viewport-inactive");
    gameMain.classList.add("viewport-active");
  },0);

  var countNumber = 0;
  var initial = 0;
  var secondCount = 0;

  var insectStart = setInterval(function () {
    var a = Math.trunc(Math.random() * 100);
    var b = Math.trunc(Math.random() * 100);
    var cloneImage = image.cloneNode(true);

    if (selectInsect.classList.contains("viewport-inactive")) {
      if (a > 90 || b > 90) {
        a -= 8;
        b -= 8;
      }

      cloneImage.style = `width: 8%;
														position: absolute;
														top: ${a}%;
														left: ${b}%;
														cursor: pointer`;

      gameDisplay.appendChild(cloneImage);

      cloneImage.addEventListener("click", function () {
        cloneImage.remove();
        countNumber++;
        scoreCount.innerHTML = countNumber;
      });

      initial++;

      if (initial === 15) {
        clearInterval(insectStart);
        for (var j = 0; j < gameDisplay.children.length; j++) {
          gameDisplay.children[j].classList.add('pointer-disable');
        }
        playAgain.classList.add('active');
        finalScoreBox.classList.add('active');
        finalScore.innerHTML = countNumber;
      }

      setTimeout(function () {
        gameAlert.classList.add('alert-active');
        if (initial > 10) {
          gameAlert.classList.remove('alert-active');
        }
      }, 5000)

      playAgain.addEventListener('click', function () {
        playGame.classList.remove("viewport-inactive");
        playGame.classList.add("viewport-active");
        gameMain.classList.remove("viewport-active");
        gameMain.classList.add("viewport-inactive");
        playAgain.classList.remove('active');
        finalScoreBox.classList.remove('active');
        element.classList.remove("insect-active");
        cloneImage.remove();
        countNumber = 0;
        initial = 0;
        secondCount = 0;
        scoreCount.innerHTML = 0;
        timeCount.innerHTML = '00:00';
        finalScore.innerHTML = 0;
      })
    }
  }, 1000);

  var timeStart = setInterval(function () {
    secondCount++;
    if (secondCount > 15) {
      clearInterval(timeStart);
    } else if (secondCount < 10) {
      timeCount.innerHTML = `00:0${secondCount}`;
    } else {
      timeCount.innerHTML = `00:${secondCount}`;
    }
  }, 1000);
}

playButton.addEventListener("click", function () {
  playGame.classList.add("viewport-inactive");
  playGame.classList.remove("viewport-active");
  selectInsect.classList.remove("viewport-inactive");
  selectInsect.classList.add("viewport-active");
  insect[0].classList.add("insect-active");
});

insect.forEach(function (element) {
  element.addEventListener("click", function () {
    startTheGame(element);
  });
});
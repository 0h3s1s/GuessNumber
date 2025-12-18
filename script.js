'use strict';

//FUNCTIONS

// Get a random number
const getRandomNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

// Modify textContent of an element
const displayMessage = function (element, message) {
  document.querySelector(element).textContent = message;
};

// Changes background color of an element
const changeBackgroundColor = function (element, color) {
  document.querySelector(element).style.backgroundColor = color;
};

// Changes text color of an element
const changeTextColor = function (element, color) {
  document.querySelector(element).style.color = color;
};

// VARIABLES
let secretNumber = getRandomNumber(); // Secret Number to be guessed
let score = 20; // Attempts left
let highscore = 0; // Highscore
let win = false;

// CLICK EVENTLISTENERS

// 'Check' guess numbered.
document.querySelector('.check').addEventListener('click', function () {
  if (win === false) {
    if (score !== 0) {
      const guess = Number(document.querySelector('.guess').value);

      // When there's no input
      if (!guess) {
        displayMessage('.message', '⛔ Insert a Number!');

        // When player wins
      } else if (guess === secretNumber) {
        win = true;
        displayMessage('.message', '🎉 Correct Number!');
        changeBackgroundColor('body', '#60b347');

        displayMessage('.number', secretNumber);
        document.querySelector('.number').style.width = '30rem';

        // Check highscore points
        if (score > highscore) {
          highscore = score;
          displayMessage('.highscore', highscore);
        }

        // When guess is wrong
      } else if (guess !== secretNumber) {
        changeBackgroundColor('body', 'red');
        setTimeout(() => {
          changeBackgroundColor('body', '#666');
        }, 250);
        if (score > 1) {
          displayMessage(
            '.message',
            guess > secretNumber ? '📈 Too High' : '📉 Too Low'
          );
          score--;

          // When player has less than 10 attempts, the color changes as showing critical number of attempts
          if (score < 10) {
            changeTextColor('.score', '#c0392b');
          }
          displayMessage('.score', score);
        } else {
          displayMessage('.message', '💥 You Lost the Game!');
          score--;
          displayMessage('.score', 0);
        }
      }
    } else {
      alert('You lost all oportunities so far!');
      alert('Press RESET to play again🥰');
    }
  } else {
    alert('You WON congratz!');
    alert('Press RESET to play again🥰');
  }
});

// Reset game
document.querySelector('.reset').addEventListener('click', function () {
  secretNumber = getRandomNumber();
  score = 20;
  win = false;
  displayMessage('.message', 'Start guessing...');
  displayMessage('.score', score);
  displayMessage('.number', '?');
  changeBackgroundColor('body', '#666');
  changeTextColor('.score', '#2d8a4e');
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
});

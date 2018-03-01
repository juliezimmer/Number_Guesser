// Game Functions:
// Player must guess a number between a min and max.
// Player gets a certain amount of guesses
// Notify player of guesses remaining
// Notify player of correct answer, if unsuccessful guessing number
// Let player choose to play again

// Game variables
let min = 1;
let max =  10;
let correctNum = generateRandomNum(min, max); 
let guessesLeft = 3; 

// UI Elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// Min and Max game parameters
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
game.addEventListener('mousedown', function(e) {
   if (e.target.className === 'play-again') {
      window.location.reload();
   }
})

// Event listener for "guess" and "submit" button
guessBtn.addEventListener('click', function(){
   // This value needs to be a number, not a string, so the string is parsed using parseInt and then set to a variable.
   let guess = parseInt(guessInput.value);

   // validate the input using a conditional: there must be an input value, and it must be between the min and max parameters.
   if(isNaN(guess) || guess < min ||  guess > max) {
      setMessage(`You must enter a number between ${min} and ${max}`, 'red');
   } 
   // if correctNum is chosen
   if(guess === correctNum) { 
     gameOver(true, `${correctNum} is correct. You have successfully guessed the mystery number! Game over!`);
   } else { // incorrect num is chosen
      guessesLeft -= 1;
   }   // No guesses remain. The game is over. correctNum not chosen; 
      if(guessesLeft === 0) {
         gameOver(false, `You had three chances and didn't guess the mystery number. It was ${correctNum}. Better luck next time!`);
      } else {
         // Game continues; player still has guesses remaining.  
         guessInput.style.borderColor = 'red';
         // clear input
         guessInput.value = '';
         setMessage(`${guess} is NOT correct. You have ${guessesLeft} more chances to guess the correct number.`, 'red'); 
      }
});

// Game Over
function gameOver(won,msg) {
   let color;
   won === true ? color = 'green' : color = 'red';

   // disable input
   guessInput.disabled = true;
   // change border color if correct num is chosen 
   guessInput.style.borderColor = color;
   // Set text color
   message.style.color = color;
   // Set message
   setMessage(msg);

   // Play again
   guessBtn.value = 'Play Again?';
   // need to add a class for the new version of this button for an event handler
   // +=  => appends
   guessBtn.className += 'play-again';
}

// generateRandomNum() function 
// generates random number for new game.
function generateRandomNum(min, max){
   return Math.floor(Math.random() * (max - min + 1) + min);
}

// setMessage() function
function setMessage(msg, color) {
   // this sets the color of the message to what is passed in as the value.
   message.style.color = color;
   message.textContent = msg;
};



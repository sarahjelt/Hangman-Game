var win = 0;

var currentWord = "_ _ _ _ _ _";
/* var currentWord2 = "_ _ _ _ _ _ _ _ _";
var currentWord3 = "_ _ _ _ _ _ _ _"; */

var computerChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var userOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var guessesLeft = 16;
console.log(guessesLeft);

var userGuess;

var userPick = [];

render ();

// This function is run whenever the user presses a key.
    document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userGuess = event.key;
    guessArray(userGuess);

    console.log(userGuess);
    // Randomly chooses a choice from the options array. This is the Computer's guess.
    var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
    console.log(computerGuess);

	if (guessesLeft > 0) {
	    // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
	    if (userOptions.includes(userGuess) === true) {

	    if (userGuess === computerGuess) {
	        win++;
	        guessesLeft = 9;
	        userPick.splice(0,10);
	        } else {
	        guessesLeft--;
	        }
	      }
	    }

	//alert if user presses non A–Z key
	    if (userOptions.includes(userGuess) === false) {
	      alert("Psst — I'm thinking of a letter!");
	      //userPick.pop();
	    }

	//reset counter and tally loss, clear past guesses
	if (guessesLeft === 0) {
		loss++;
		guessesLeft = 9;
		userPick.splice(0,10);
	} 

    console.log(guessesLeft);

    render ();
};


// print key presses to screen
function render () {
        document.getElementById("win").innerHTML = win;
        document.getElementById("currentWord").innerHTML = currentWord;
        document.getElementById("guessesLeft").innerHTML = guessesLeft;
        document.getElementById("userGuess").innerHTML = userPick;
    };

//alert if duplicate guessed, push guesses to letters already guessed line
function guessArray (val1) {
	if (userPick.includes(val1) === true) {
        alert("You've already guessed that one!");
        guessesLeft++;
    } else if (userOptions.includes(val1) === true) {
	userPick.push(val1);
	}
  };
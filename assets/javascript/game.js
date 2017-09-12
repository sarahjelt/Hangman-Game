//hangman! use some for loops and an object or summat

//DO NOT push letters to letters guessed if they're part of the currentWord!!

//.splice out underscore to add letter
//.charAt for loop i 

// id win (#)
// id currentWord (the answer -- random from array)
// id guessesLeft
// id userGuess (already guessed)
// id next
// id reset

var win = 0;
var options = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var answers = [
  "hippogriff", "mandrake", "niffler", "acromantula", "basilisk", "dragon", "pixie", "billiwig", "puffskein", "unicorn", "centaur", 
  "erumpent", "thestral", "bowtruckle", "leprechaun", "kappa", "hinkypunk", "merpeople", "ashwinder", "augurey", "bundimun", "chimaera", 
  "chizpurfle", "clabbert", "crup", "demiguise", "diricawl", "doxy", "dugbog", "erkling", "fairy", "flobberworm", "fwooper", 
  "glumbumble", "gnome", "graphorn", "griffin", "grindylow", "hippocampus", "horklump", "imp", "jarvey", "jobberknoll", "kelpie", 
  "knarl", "kneazle", "lethifold", "lobalug", "manticore", "moke", "mooncalf", "murtlap", "nogtail", "nundu", "occamy", 
  "phoenix", "plimpy", "pogrebin", "porlock", "quintaped", "ramora", "runespoor", "salamander", "shrake", "snidget", "sphinx", 
  "streeler", "tebo", "troll", "werewolf", "yeti"
  ];

var guessesLeft = 10;
console.log(guessesLeft);

var userGuess;
var userPick = [];
var werd = [];

// Randomly chooses a choice from the options array. This is the Computer's guess.
var currentWord = answers[Math.floor(Math.random() * answers.length)];
console.log(currentWord);

//call these functions before user keypresses
hideWord(currentWord);
render();

// bigass keypress function -- needs the most work!
    document.onkeyup = function(event) {
    // DONE -- Determines which key was pressed.
    var userGuess = event.key;
    // key presses get pushed to array onscreen
    guessArray(userGuess);
    console.log(userGuess);

	if (guessesLeft > 0) {
	//     // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
	  if (options.includes(userGuess) === true) {

	    if (currentWord.includes(userGuess)) {
    		compare(userGuess);
	   } else {
            guessesLeft--;
	   }
    } //end if guessesLeft > 0

	//alert if user presses non A–Z key
	    if (options.includes(userGuess) === false) {
	      alert("Psst — letters only!");
	    }

	// loss function -- reset word, clear past guesses
	if (guessesLeft === 0) {
		guessesLeft = 10;
		userPick.splice(0,11);
		werd.splice(0, werd.length);
		console.log("i get here");
		currentWord = answers[Math.floor(Math.random() * answers.length)];
		hideWord ();
		console.log(currentWord);
	}

    if (werd.includes("_") === false) {
		win++;
	}

    render();
  }
}; //end bigass function

document.getElementById("reset").onclick = function(event) {
	console.log("i get here");
	win = 0;
	guessesLeft = 10;
	userPick.splice(0,11);
	werd.splice(0,11);
	currentWord = answers[Math.floor(Math.random() * answers.length)];
	console.log(currentWord);
	hideWord();
	compare();
	render();
}

document.getElementById("next").onclick = function(event) {
	guessesLeft = 10;
	userPick.splice(0,11);
	werd.splice(0,11);
	currentWord = answers[Math.floor(Math.random() * answers.length)];
	console.log(currentWord);
	hideWord();
	compare();
	render();
}

// DONE print guesses guessed, number guesses left, number wins, and blanks for answer to screen
function render () {
        document.getElementById("win").innerHTML = win;
        document.getElementById("currentWord").innerHTML = werd.join(" ");
        document.getElementById("guessesLeft").innerHTML = guessesLeft;
        document.getElementById("userGuess").innerHTML = userPick.join(" ");
}

//(1) alert if duplicate guessed, and (2) push guesses to letters already guessed array / (3) pop guesses from letters
// guessed array if they are in currentWord
function guessArray (val1) {
	if (userPick.includes(val1)) {
        alert("You've already guessed that one!");
        guessesLeft++;
	} 
	if (options.includes(val1) === true && userPick.includes(val1) === false) {
	userPick.push(val1);
	} 
	if (currentWord.includes(val1)) {
	userPick.pop(val1);
    }
}

//to get currentWord to turn into _ _ _ _
function hideWord () {
    for (i = 0; i < currentWord.length; i++) {
      werd.push("_");
    }
}

//replace _ with letter at correct spot
function compare (val1) {
    for (i = 0; i < currentWord.length; i++) {
        if (currentWord.charAt(i) === val1) {
            werd.splice(i, 1, val1);
        }
    }
}

// function lose () {
// 	if () {
// 		win++;
// 	}
// }

//placeholder
/*function winner() {
    
}*/
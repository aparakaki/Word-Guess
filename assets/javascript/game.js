var word;
var wordBank = ["apple", "strawberry", "watermelon", "pineapple"];
var lettersUsedArr; //array that stores letters already chosen
var wordArr = []; //array with each character of the word stored
var counter = 10;
var points = 0;
var start = true;

var wordDisp = document.getElementById("wordDisplayed");
var counterText = document.getElementById("chances");
var lUsed = document.getElementById("lettersUsed");
var win = document.getElementById("wins");
win.textContent = points;
counterText.textContent = counter; 

//-------------------------functions---------------------------

function gameStart() {
    word = wordBank[Math.floor(Math.random() * wordBank.length)];

    for (var i = 0; i < word.length; i++) {     //populates the wordArr and word displayed 
        wordArr[i] = "_";                       //with the amount of dashes needed
        wordDisp.textContent += "_ ";
    }
    lettersUsedArr = []                      //resets the letters used
    counter = 10;                            //and counter
    counterText.textContent = counter;
    start = false;
}

function checkLetters(input) {      //checks that the input is a letter
    if (!input.match(/^[a-z]+$/) || input.length > 1) {
        return false;
    }
    return true;
}

function gameOver() {
    if(counter === 0)
    {
        return true;
    }
    return false;
}

function find(x) {                  //if letter is found in the word it adds it to the current diplay
    var found = false;              //if not found, it is added to the array of letter already used

    for (var i = 0; i < word.length; i++) {
        if (word[i] === x) {
            wordArr[i] = x;
            found = true;
        }
    }    

    if(!found) {
        if (lettersUsedArr.indexOf(x) === -1 && x !== "_") {
            lettersUsedArr[10 - counter] = x;
            counter--;
            counterText.textContent = counter;
        }
    }
}

function wordDisplay(){             //updates display of current word progress
    wordDisp.textContent = "";
    for (var i = 0; i < wordArr.length; i++) {
        wordDisp.textContent += wordArr[i] + " ";
    }
}

function lettersUsed(){             //updates the display with the letters already chosen
    lUsed.textContent = "";
    for (var i = 0; i < lettersUsedArr.length; i++) {
        console.log(lettersUsedArr[i]);
        lUsed.textContent += lettersUsedArr[i] + " ";
    }
} 

function gameWon() {                            //checks if there are any letters left to guess
    for (var i = 0; i < wordArr.length; i++) {
        if (wordArr[i] === "_") {
            return false;
        }
    }
    return true;
}

//-----------------------------------------------------------------

document.onkeyup = function(event) {
    userGuess = event.key.toLowerCase();

    if(start) {
        gameStart();
        return;     //first key stroke starts the game
    }
    
    if(gameOver()) {
        return;
    }

    if (!checkLetters(userGuess)) {
        return;
    }

    find(userGuess);
    wordDisplay();
    lettersUsed();    
    
    if (gameWon()) {
        points++;
        win.textContent = points;
        wordDisp.textContent = "";
        lUsed.textContent = "";
        gameStart();
    }


}


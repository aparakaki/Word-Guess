var word;                //word to be guessed
var lettersUsedArr;     //array that stores letters already chosen
var wordArr = [];       //array with each character of the word stored
var counter = 10;       // # of tries
var points = 0;
var start = true;
var indexUsed = [];     //stores indices used
var games = 0;          //number of games played
var wordBank = ["apple", "strawberry", "watermelon", "pineapple", "cantaloupe", 
                "dragonfruit", "persimmon", "tangerine", "lychee", "guava"];
var images = {apple: "apple.jpg", strawberry: "strawberry.jpg", watermelon: "watermelon.jpg", 
            pineapple: "pineapple.jpg", cantaloupe: "cantaloupe.jpg", dragonfruit: "dragonfruit.jpg", 
            persimmon: "persimmon.jpg", tangerine: "tangerine.jpg", lychee: "lychee.jpg", guava: "guava"};

var wordDisp = document.getElementById("wordDisplayed");
var counterText = document.getElementById("chances");
var lUsed = document.getElementById("lettersUsed");
var win = document.getElementById("wins");

win.textContent = points;
counterText.textContent = counter; 


//******************************** functions *********************************
//****************************************************************************

function gameStart() {
    // word = wordBank[Math.floor(Math.random() * wordBank.length)];                            
    word = wordBank[getIndex()];
    wordArr = [];

    for (var i = 0; i < word.length; i++) {     //populates the wordArr and word displayed 
        wordArr[i] = "_";                       //with the amount of dashes needed
        wordDisp.textContent += "_ ";
    }
   
    lettersUsedArr = [];                     //resets the letters used
    counter = 10;                            //and counter
    counterText.textContent = counter;
    start = false;
}

function getIndex() {
    var index;
    var done = false;   //if unique index has been created
    var found = false;  //if index is repeated
    while(!done) {
        index = Math.floor(Math.random() * wordBank.length);
        for (var i = 0; i < indexUsed.length; i++) {
            if (indexUsed[i] === index) {
                found = true;
            }
        }
        if (!found) {
            done = true;
        }
        else {
            found = false;
        }
    }

    indexUsed.push(index);
    return index;
}

function checkLetters(input) {              //checks that the input is a letter
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

function wordDisplay(){                         //updates display of current word progress
    wordDisp.textContent = "";
    for (var i = 0; i < wordArr.length; i++) {
        wordDisp.textContent += wordArr[i] + " ";
    }
}

function lettersUsed(){                          //updates the display with the letters already chosen
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

function displayImage() {
    document.getElementById("imgId").src = "assets/images/" + images[word];
    // console.log(document.getElementById("imgId").src)
}

function endOfGame() {
    win.textContent = points + " out of " + wordBank.length;
    return;
}

//****************************************************************************
//****************************************************************************

document.onkeyup = function(event) {
    userGuess = event.key.toLowerCase();
    
    if(games === wordBank.length) {
        endOfGame();
        return;
    }

    if(start) {                 //first key stroke starts the game
        gameStart();
        document.getElementById("subTitle").style.visibility = "hidden";
        return;     
    }
    
    if (!checkLetters(userGuess)) {     //checks that only letters are being used
        return;
    }

    find(userGuess);
    wordDisplay();
    lettersUsed();    
    
    if (gameWon()) {
        displayImage();
        points++;
        win.textContent = points;
        wordDisp.textContent = "";
        lUsed.textContent = "";
        games++;
        if(games < wordBank.length) {
            gameStart();   
        }
        else {
            endOfGame();
        }
    }

    if(gameOver()) {
        wordDisp.textContent = "";
        lUsed.textContent = "";
        games++;
        if(games < wordBank.length) {
            gameStart();   
        }
        else {
            endOfGame();
        }
    }

}


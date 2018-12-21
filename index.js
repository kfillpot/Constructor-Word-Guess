var Word = require('./Word.js');
var inquirer = require('inquirer');

var selected;
var selectedWord;
var guesses;
var remainGuess;

var wordBank = ["Avery", "Charles", "Ian", "Javier", "Jazmin", "Kasey", "Lidia"];


function randomWord (wordBank) {
    var index = Math.floor(Math.random() * wordBank.length);
    return wordBank[index];
}

var questions = [
    {
        name: 'letterGuessed',
        message: 'Guess a letter - Hint: Members of Legends of Tomorrow',
        validate: function(value) {
            var valid = (value.length === 1) && ('abcdefghijklmnopqrstuvwxyz'.indexOf(value.charAt(0).toLowerCase()) !== -1);
            return valid || 'Please enter a letter';
        },
        when: function() {
            return (!selected.allGuessed() && remainGuess > 0);
        }
    },
    {
        type: 'confirm',
        name: 'playAgain',
        message: 'Play Again?',

        when: function() {
            return (selected.allGuessed() || remainGuess <= 0);
        }
    }
];

// function to reset the game

function resetGame() {
    selectedWord = randomWord(wordBank);
    selected = new Word(selectedWord);
    selected.makeGuess(' ');
    guesses = [];
    remainGuess = 10;
}

function game() {
    if (!selected.allGuessed() && remainGuess > 0) {
        console.log(selected+ '');
    }

    inquirer.prompt(questions).then(answers => {
        if('playAgain' in answers && !answers.playAgain) {
            console.log('thanks for playing');
            process.exit();
        }
        if (answers.playAgain) {
            resetGame();
        }
        if(answers.hasOwnProperty('letterGuessed')) {
            var currentGuess = answers.letterGuessed.toLowerCase();

            if(guesses.indexOf(currentGuess) === -1) {
                guesses.push(currentGuess);
                selected.makeGuess(currentGuess);
                if(selectedWord.toLowerCase().indexOf(currentGuess.toLowerCase()) === -1) {
                    remainGuess--;
                }
            } else {
                console.log('You already guessed', currentGuess);
            }
        }

        if(!selected.allGuessed()) {
            if(remainGuess < 1) {
                console.log('no more guesses');
                console.log(selectedWord, 'was correct.');

            } else {
                console.log('guesses so far:', guesses.join(' '));
                console.log('guesses remaining:', remainGuess);
            }
        } else {
            console.log(selectedWord, 'is correct!');
        }

        game();
    });
}

resetGame();

game();

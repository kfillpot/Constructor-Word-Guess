
var Letter = function(character) {
    this.character = character;
    this.guessed = false;

   this.toString = function() {
        return this.guessed ? this.character : '_';
    }
    this.makeGuess = function(newGuess) {
        if(this.character.toLowerCase() === newGuess.toLowerCase()) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;

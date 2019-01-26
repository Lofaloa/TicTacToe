// Represents a tic tac toe player.
class Player {

    // Constructs this player with the given name. If a strategy is given, this
    // player becomes an AI.
    constructor(name, strategy = null) {
        if (name != 'X' && name != 'O') {
            throw "A player should be either X or O!";
        }
        this._name = name;
        this._strategy = strategy;
        this._score = 0;
    }

    // Gets this player name.
    get name() {
        return this._name;
    }

    // True if this player has a strategy.
    get isAI() {
        return this._strategy != null;
    }

    // Gets this player score.
    get score() {
        return this._score;
    }

    // Sets this player strategy.
    set strategy(value) {
        this._strategy = value; 
    }

    // Sets this player score to 0.
    resetScore() {
        this._score = 0;
    }

    // Adds a point to this player.
    scoreUp() {
        this._score++;
    }

    // Tells if this player is the X player.
    isX() {
        return this.name === 'X';
    }

    // Tells if this player is the O player.
    isO() {
        return this.name === 'O';
    }

    // Makes this player play based on his/ her strategy.
    play() {
        if (!this.isAI) {
            throw this._name + " has no strategy because he is not an AI."; 
        }
        this._strategy.execute();
    }

}
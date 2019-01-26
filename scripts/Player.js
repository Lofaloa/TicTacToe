class Player {

    constructor(name, strategy = null) {
        if (name != 'X' && name != 'O') {
            throw "A player should be either X or O!";
        }
        this._name = name;
        this._strategy = strategy;
        this._score = 0;
    }

    //Gets this player name.
    get name() {
        return this._name;
    }

    get isAI() {
        return this._strategy != null;
    }

    //Gets this player score.
    get score() {
        return this._score;
    }

    set strategy(value) {
        this._strategy = value; 
    }

    // sets this player score to 0.
    resetScore() {
        this._score = 0;
    }

    //Adds a point to this player.
    scoreUp() {
        this._score++;
    }

    //Tells if this player is the X player.
    isX() {
        return this.name === 'X';
    }

    //Tells if this player is the X player.
    isO() {
        return this.name === 'O';
    }

    play() {
        if (!this.isAI) {
            throw this._name + " has no strategy because he is not an AI."; 
        }
        this._strategy.execute();
    }

}
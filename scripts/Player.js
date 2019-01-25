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

    //Adds a point to this player.
    scoreUp() {
        this._score++;
    }

    //Tells if this player is the X player.
    isX() {
        return this.name === 'X';
    }

    play() {
        if (!this.isAI) {
            throw this._name + " has no strategy because he is not an AI."; 
        }
        this._strategy.execute();
    }

}
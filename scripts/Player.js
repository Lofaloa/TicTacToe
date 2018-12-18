class Player {

    constructor(name) {
        if (name != 'X' || name != 'O') {
            throw "A player should be either X or O!";
        }
        this._name = name;
        this._score = 0;
    }

    //Gets this player name.
    get name() {
        return this._name;
    }

    //Gets this player score.
    get score() {
        return this._score;
    }

    //Adds a point to this player.
    scoreUp() {
        this.score++;
    }

    //Tells if this player is the X player.
    isX() {
        return this.name === 'X';
    }

}
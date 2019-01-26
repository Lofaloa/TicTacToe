// Represents a random strategy. All moves are randomly selected.
class RandomStrategy {

    // Constructs this strategy with the game to play with.
    constructor(game) {
        this._game = game;
    }

    // Gets a random coordinate. It is a positive integer between 0 and 2.
    get randomCoordinate() {
        return Math.floor(Math.random() * Board.SIZE);
    }

    // Gets a random position.
    get randomPosition() {
        return {
            row: this.randomCoordinate,
            column: this.randomCoordinate
        };
    }

    // Gets a empty random position.
    get emptyRandomPosition() {
        if (this._game._board.isFull) {
            throw "Cannot find a move because the board is full.";
        }
        let position = this.randomPosition;
        while (!this._game._board.isEmptyAt(position.row, position.column)) {
            position = this.randomPosition;
        }
        return position;
    }

    // Executes this strategy by making a randamly selected move.
    execute() {
        let pos = this.emptyRandomPosition;
        this._game.playAt(pos.row, pos.column);
    }

}
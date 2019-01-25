class RandomStrategy {

    constructor(game) {
        this._game = game;
    }

    getRandomCoordinate() {
        return Math.floor(Math.random() * Board.SIZE);
    }

    getRandomPosition() {
        return {
            row: this.getRandomCoordinate(),
            column: this.getRandomCoordinate()
        };
    }

    findRandomPosition() {
        if (this._game._board.isFull) {
            throw "Cannot find a move because the board is full.";
        }
        let position = this.getRandomPosition();
        while (!this._game._board.isEmptyAt(position.row, position.column)) {
            position = this.getRandomPosition();
        }
        return position;
    }

    execute() {
        let pos = this.findRandomPosition();
        this._game.playAt(pos.row, pos.column);
    }

}
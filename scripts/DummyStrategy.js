class DummyStrategy {

    constructor(game) {
        this._game = game;
    }

    // finds the first empty playable position.
    findEmptyPosition() {
        if (this._game._board.isFull) {
            throw "Cannot find a move because the board is full.";
        }
        for (let row = 0; row < Board.SIZE; row++) {
            for (let column = 0; column < Board.SIZE; column++) {
                if (this._game._board.isEmptyAt(row, column)) {
                    return {row: row, column: column};
                }
            }
        }
        return undefined;
    }

    execute() {
        let pos = this.findEmptyPosition();
        this._game.playAt(pos.row, pos.column);
    }

}
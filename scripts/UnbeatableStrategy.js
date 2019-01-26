// Represents an unbeatable strategy. It either results in victory or a draw game.
class UnbeatableStrategy {

    // Constructs this strategy with the game to play with.
    constructor(game) {
        this._game = game;
    }

    // Gets the available moves. A Move is available if its position is empty. 
    getAvailableMoves(board) {
        let moves = [];
        for (let row = 0; row < Board.SIZE; row++) {
            for (let col = 0; col < Board.SIZE; col++) {
                if (board.isEmptyAt(row, col)) {
                    moves.push({
                        row: row,
                        column: col
                    });
                }
            }
        }
        return moves;
    }

    // Evaluates the state of the given board as follows:
    // if the game is draw then 0 is returned
    // if O wins the game then 1 is returned
    // si X wins the game then -1 is returned
    evaluate(board) {
        if (board == null) throw "Cannot evaluate an null board.";
        if (board.hasAWinningComboFor(Board.O_MARKER)) {
            return 1;
        } else if (board.hasAWinningComboFor(Board.X_MARKER)) {
            return -1;
        } else {
            return 0;
        }
    }

    // Writes marker at the given position in board.
    apply(board, position, marker) {
        if (board == null) throw "No board to write to.";
        board._boxes[position.row][position.column] = marker;
    }

    // Seeks the best move for the maximizing player (O)
    max_move(board) {
        let moves = this.getAvailableMoves(board);
        if (moves.length == 0) {
            return {eval: this.evaluate(board), pos: null};
        } else {
            let max_evaluation = Number.NEGATIVE_INFINITY;
            let max_position = null;
            for (let i = 0; i < moves.length; ++i) {
                let newBoard = board.clone();
                this.apply(newBoard, moves[i], Board.O_MARKER);
                let move = this.min_move(newBoard);
                this.apply(newBoard, moves[i], Board.EMPTY_MARKER);
                if (move.eval > max_evaluation) {
                    max_evaluation = move.eval;
                    max_position = moves[i];
                }
            }
            return {eval: max_evaluation, pos: max_position};
        }
    }

    // Seeks the best move for the minimizing player (X)
    min_move(board) {
        let moves = this.getAvailableMoves(board);
        if (moves.length == 0) {
            return {eval: this.evaluate(board), pos: null};
        } else {
            let min_evaluation = Number.POSITIVE_INFINITY;
            let min_position = null;
            for (let i = 0; i < moves.length; ++i) {
                let newBoard = board.clone();
                this.apply(newBoard, moves[i], Board.X_MARKER);
                let move = this.max_move(newBoard);
                this.apply(newBoard, moves[i], Board.EMPTY_MARKER);
                if (move.eval < min_evaluation) {
                    min_evaluation = move.eval;
                    min_position = moves[i];
                }
            }
            return {eval: min_evaluation, pos: min_position};
        }
    }

    // Seeks the best possible move for the game current player.
    minimax(board, ai_player) {
        if (ai_player.isX()) {
            console.log("X is the AI.");
            let move = this.min_move(board.clone());
            return move;
        } else {
            console.log("O is the AI.");
            let move = this.max_move(board.clone());
            return move;
        }
    }

    // Executes this strategy by making the best possible move.
    execute() {
        let pos = this.minimax(this._game._board, this._game.ai_player).pos;
        this._game.playAt(pos.row, pos.column);
    }

}
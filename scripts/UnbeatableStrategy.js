class UnbeatableStrategy {

    constructor(game) {
        this._game = game;
    }

    getAvailableMoves(board) {
        let positions = [];
        for (let row = 0; row < Board.SIZE; row++) {
            for (let col = 0; col < Board.SIZE; col++) {
                if (board.isEmptyAt(row, col)) {
                    positions.push({
                        row: row,
                        column: col
                    });
                }
            }
        }
        return positions;
    }

    findBestPosition() {
        let empty_positions = this.getAvailableMoves();
        let board = new Board(this._game._board);
        return this.minimax(board, empty_positions, true);
    }

    // gets the value of a move. For instance
    // if draw then 0 is returned
    // if O wins then 1 is returned
    // si X wins then -1 is returned
    getEvaluation(board) {
        if (board.hasAWinningComboFor('O')) {
            return 1;
        } else if (board.hasAWinningComboFor('X')) {
            return -1;
        } else {
            return 0;
        }
    }

    apply(board, position, player) {
        if (board == undefined) throw "No board to write to.";
        board._boxes[position.row][position.column] = player;
    }

    // Seeks the best move for the maximizing player (O)
    max_move(board) {
        let positions = this.getAvailableMoves(board);
        if (positions.length == 0) {
            return this.getEvaluation(board);
        } else {
            let maxEval = Number.NEGATIVE_INFINITY;
            for (let i = 0; i < positions.length; ++i) {
                let newBoard = board.clone();
                this.apply(newBoard, positions[i], 'O');
                let evaluation = this.min_move(newBoard);
                if (evaluation > maxEval) {
                    maxEval = evaluation;
                }
            }
            return maxEval;
        }
    }

    min_move(board) {
        let positions = this.getAvailableMoves(board);
        if (positions.length == 0) {
            return this.getEvaluation(board);
        } else {
            let minEval = Number.POSITIVE_INFINITY;
            for (let i = 0; i < positions.length; ++i) {
                let newBoard = board.clone();
                this.apply(newBoard, positions[i], 'X');
                let evaluation = this.max_move(newBoard);
                if (evaluation < minEval) {
                    minEval = evaluation;
                }
            }
            return minEval;
        }
    }

    minimax(board) {
        return this.max_move(board.clone());
    }

    findBestPosition() {
        let moves = this.getAvailableMoves(this._game._board);
        let currentEvaluation;
        let bestEvaluation = -1;
        let bestMove = null;
        for (let i = 0; i < moves.length; ++i) {
            let newBoard = this._game._board.clone();
            this.apply(newBoard, moves[i], 'O');
            let currentEvaluation = this.minimax(newBoard);
            console.log(currentEvaluation);
            if (currentEvaluation > bestEvaluation) {
                bestEvaluation = currentEvaluation;
                bestMove = moves[i];
            }
        }
        return bestMove;
    }

    execute() {
        let pos = this.findBestPosition();
        this._game.playAt(pos.row, pos.column);
    }

}
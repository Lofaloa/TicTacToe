//Represents a tic tac toe game.
class Game {

	// Constructs this game with an empty board and its two human players. The
	// current player is initially X.
	constructor() {
		this._board = new Board();
		this._players = [new Player('X'), new Player('O')];
		this._currentPlayer = 0;
	}

	// Gets the board of this game.
	get board() {
		return this._board.boxes;
	}

	// Gets the current player of this game.
	get currentPlayer() {
		return this._players[this._currentPlayer];
	}

	// true if one of the two players has won the game.
	get hasWinner() {
		return this.hasWon(this._players[0]) || this.hasWon(this._players[1]);
	}

	// Tells if this game is draw. It is draw if no player wins this game and
	// this game board is full.
	get isDraw() {
		return this._board.isFull && !this.hasWinner;
	}

	// Gets this game AI player. If no player is an AI, null is returned.
	get ai_player() {
		if (this._players[0].isAI) {
			return this._players[0];
		} else if (this._players[1].isAI) {
			return this._players[1];
		} else {
			return null;
		}
	}

	// Sets the specified player as an AI. value is 0 for X and 1 for O.
	set ai_player(value) {
		if (value != 0 && value != 1) throw value + " is not a valid player id.";
		game._players[value].strategy = new UnbeatableStrategy(game);
		this._currentPlayer = 1 - value;
	}

	// Tells if this gane board is empty at the given position.
	isEmpty(row, col) {
		this._board.requireValidPosition(row, col);
		return this._board.isEmptyAt(row, col);
	}

	// Tells if player's marker is at the given position in this game board.
	isPlayerAt(player, row, col) {
		return this.board[row][col] == player;
	}

	// Starts this game.
	start() {
		this._board.clear();
		this._players[0].resetScore();
		this._players[1].resetScore();
	}

	// Starts a new round.
	start_round() {
		this._board.clear();
	}

	// Assigns the cell at the given position to the current player.
	playAt(row, col) {
		if (!this.isEmpty(row, col)) {
			throw "The selected box is not free, please try again.";
		}
		this._board.set(row, col, this.currentPlayer.name);
	}

	// Passes the hand to the next player if the current has not won yet.
	nextPlayer() {
		if (!this.hasWon(this.currentPlayer)) {
			this._currentPlayer = 1 - this._currentPlayer;
		}
	}

	// Tells if the given player has won. A player wins by taking a row, a column
	// or a diagonal of the board.
	hasWon(player) {
		return this._board.hasAWinningComboFor(player.name);
	}

	// Tells if a round of the game is over. It is over if the current player 
	// won or if the board is full. A game can hold an unlimited number of 
	// rounds.
	isOver() {
		return this.hasWon(this.currentPlayer) || this.isDraw;
	}

}
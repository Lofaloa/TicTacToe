class Game {
	//Initializes this game with an empty board and its two players. The current
	//player is initially X.
	constructor() {
		this._board = new Board();
		this._players = [new Player('X'), new Player('O')];
		this._currentPlayer = 0;
	}

	//Gets the board of the game.
	get board() {
		return this._board.boxes;
	}

	//Gets the current player of the game.
	get currentPlayer() {
		return this._players[this._currentPlayer];
	}

	get hasNoWinner() {
		return !this.hasWon(this._players[0]) || !this.hasWon(this._players[1]);
	}

	//Tells if the two players are even. They're even when the board is totally
	//full of player's piece.
	get isEven() {
		return this._board.isFull && this.hasNoWinner;
	}

	//Tells if a given box is empty.
	isEmpty(row, col) {
		return this._board.isEmptyAt(row, col);
	}

	isPlayerAt(player, row, col) {
		return this.board[row][col] == player;
	}

	//Makes start a new round.
	start() {
		this._board.clear();
	}

	//Assigns te requested empty box to the current player.
	playAt(row, col) {
		if (!this.isEmpty(row, col)) {
			throw "The selected box is not free, please try again.";
		}
		this._board.set(row, col, this.currentPlayer.name);
	}

	//Passes the hand to the next player if the current has not won yet.
	nextPlayer() {
		if (!this.hasWon(this.currentPlayer)) {
			this._currentPlayer = 1 - this._currentPlayer;
		}
	}

	//Tells if the given player has won. A player wins by taking a row, a column
	//or a diagonal of the board.
	hasWon(player) {
		return this._board.hasRowOf(player.name) ||
			this._board.hasColumnOf(player.name) ||
			this._board.hasDiagonalOf(player.name);
	}

	//Tells if a round of the game is over. It is over if the current player 
	//won or if the board is full. A game can hold an unlimited number of 
	//rounds.
	isOver() {
		return this.hasWon(this.currentPlayer) || this.isEven;
	}

}
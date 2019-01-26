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

	// true if one of the two players has won the game.
	get hasWinner() {
		return this.hasWon(this._players[0]) || this.hasWon(this._players[1]);
	}

	//Tells if the two players are even. They're even when the board is totally
	//full of player's piece.
	get isEven() {
		return this._board.isFull && !this.hasWinner;
	}

	get ai_player() {
		if (this._players[0].isAI) {
			return this._players[0];
		} else {
			return this._players[1];
		}
	}

	set ai_player(value) {
		game._players[value].strategy = new UnbeatableStrategy(game);
		this._currentPlayer = 1 - value;
	}

	//Tells if a given box is empty.
	isEmpty(row, col) {
		return this._board.isEmptyAt(row, col);
	}

	isPlayerAt(player, row, col) {
		return this.board[row][col] == player;
	}

	start() {
		this._board.clear();
		this._players[0].resetScore();
		this._players[1].resetScore();
	}

	//Makes start a new round.
	start_round() {
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
		return this._board.hasAWinningComboFor(player.name);
	}

	//Tells if a round of the game is over. It is over if the current player 
	//won or if the board is full. A game can hold an unlimited number of 
	//rounds.
	isOver() {
		return this.hasWon(this.currentPlayer) || this.isEven;
	}

}
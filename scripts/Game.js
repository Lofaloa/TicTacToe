class Game {
	//Initializes this game with an empty board and its two players. The current
	//player is initially X.
	constructor() {
		this._board = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
		this._players = [{name: 'X', score: 0},
                     {name: 'O', score: 0}]; 
		this._currentPlayer = 0;
	}

	//Gets the board of the game.
	get board() {
		return this._board;
	}

	//Gets the current player of the game.
	get currentPlayer() {
		return this._players[this._currentPlayer];
	}

	//Tells if the two players are even. They're even when the board is totally
	//full of player's piece.
	get isEven() {
		let i = 0;
		while (i < this.board.length && !this.board[i].includes(' ')) {
			i++;
		}
		return i == this.board.length;
	}

	//Tells if a given box is empty.
	isEmpty(row, col) {
		return this.board[row][col] == ' ';
	}

	//Clears the board from all the players.
	clearBoard() {
		setAllArrayTo(this.board, ' ');
	}

	//Makes start a new round.
	startNewRound() {
		this.clearBoard();	
	}

	//Assigns te requested empty box to the given player.
	setBoxTo(row, col, player) {
		if (this.isEmpty(row, col)) this.board[row][col] = player;
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
		return hasRowOf(this.board, player.name) || 
		       hasColumnOf(this.board, player.name) ||
	         hasDiagonalOf(this.board, player.name);
	}
	
	//Tells if a round of the game is over. It is over if the currentPlayer won
	// or if the board is full.	A game can hold an unlimited number of rounds.
	isRoundOver() {
		return this.hasWon(this.currentPlayer) || this.isEven;	
	}

}

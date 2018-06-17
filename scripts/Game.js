class Game {
	constructor() {
		this._board = [['','',''],['','',''],['','','']];
		this._players = [{name: 'X', score: 0},
                     {name: 'O', score: 0}]; 
		this._currentPlayer = 0;
	}

	get board() {
		return this._board;
	}

	get players() {
		return this._players;
	}

	get currentPlayer() {
		return this._currentPlayer;
	}

	//Clears the board from all the players.
	clearBoard() {
		setAllArrayTo(this.board, '');
	}

	//Makes start a new round.
	startNewRound() {
		this.clearBoard();	
	}

	//Assigns the requested box to the given player.
	setBoxTo(row, col, player) {
		this.board[row][col] = player;
	}

	//Passes the hand to hte next player.
	nextPlayer() {
		this._currentPlayer = 1 - this._currentPlayer;	
	}

	//Increments the score of the player by one.i
	incScore(player) {
		player.score++;
	}

	//Tells if the given palyer has won. A player wins by taking a row, a column
	//or a diagonal of the board.
	hasWon(player) {
		return hasRowOf(this.board, player) || hasColumnOf(this.board, player) ||
	         hasDiagonalOf(this.board, player);
	}
	
	//Tells if a round of the game is over. A game can hold an unlimited number 
	//of rounds.
	isRoundOver() {
		//A round is over when a player wins or the board is full (players are even)	
	}

}

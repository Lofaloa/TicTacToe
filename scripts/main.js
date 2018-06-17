let game = new Game();

//Assigns the given box to the current player of the game.
function writePlayerTo(box) {
		let boxPos = box.data('pos');
		game.setBoxTo(boxPos.row, boxPos.col, game.currentPlayer.name);
		return game.hasWon(game.currentPlayer);
}

//Makes the current player play and passes to the next player if the current
//round is not over.
function makeAMove(box) {
	  if (!game.isRoundOver()) {
			writePlayerTo(box);	
			showMove(box, game.currentPlayer);	
			game.nextPlayer();
		}
}

$('document').ready(function() {
	$('td').click(function() {
		makeAMove($(this));
	});
});

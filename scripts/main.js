let game = new Game();

//Assigns the given box to the current player of the game.
function writePlayerTo(box) {
		let boxPos = box.data('pos');
		game.setBoxTo(boxPos.row, boxPos.col, game.players[game.currentPlayer].name);
		game.nextPlayer();
}

$('document').ready(function() {
	$('td').click(function() {
		writePlayerTo($(this));	
		showMove($(this), game.players[game.currentPlayer]);	
	});
});

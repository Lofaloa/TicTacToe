let game = new Game();

//Assigns the given box to the current player of the game.
function writePlayerTo(box) {
		let boxPos = box.data('pos');
		game.setBoxTo(boxPos.row, boxPos.col, game.currentPlayer.name);
}

//Makes the current player play and passes to the next player if the current
//round is not over.
function makeAMove(box) {
	  if (!game.isRoundOver()) {
			writePlayerTo(box);	
			showMove(box, game.currentPlayer);	
			game.nextPlayer();
		}
		endRound();
}

//Gives a point to the winner. Shows a replay button. If the round is even, 
//no player get a point, the replay button is also displayed.
function endRound() {
	if (game.isRoundOver()) {
		if (!game.isEven) game.currentPlayer.score++;
		showScores();
		showReplayButton();
		$('td').off("click");
	}
}

function startNewRound() {
	clearBoard();
	$('td').click(function() {makeAMove($(this));});
	$('#replay').remove();
}

$('document').ready(function() {
	$('td').click(function() {
		makeAMove($(this));
	});
});

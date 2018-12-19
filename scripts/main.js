let game = new Game();

//Assigns the given box to the current player of the game.
function writePlayerTo(box) {
	let boxPos = box.data('pos');
	game.playAt(boxPos.row, boxPos.col);
}

//Makes the current player play and passes to the next player if the current
//round is not over.
function makeAMove(box) {
	if (!game.isOver()) {
		writePlayerTo(box);
		showMove(box, game.currentPlayer);
		game.nextPlayer();
	}
	showCurrentPlayer();
	endRound();
}

//Gives a point to the winner. Shows a replay button. If the round is even, 
//no player get a point, the replay button is also displayed.
function endRound() {
	if (game.isOver()) {
		game.currentPlayer.scoreUp();
		showScores();
		showReplayButton();
		$('td').off("click");
	}
}

//Starts a new round. 
function startNewRound() {
	clearBoard();
	game.start();
	$('td').click(function () {
		try {
			makeAMove($(this));
		} catch (e) {
			alert(e);
		}
	});
	$('#replay').remove();
	showCurrentPlayer();
}

$('document').ready(function () {
	showCurrentPlayer();
	$('#start').click(function () {
		startNewRound();
		$('#start').remove();
	});
	$("#theme_control").click(toggleTheme);
});
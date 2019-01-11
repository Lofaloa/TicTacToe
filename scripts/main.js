let game = new Game();
let view = new View(game);

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
		view.showMove(box, game.currentPlayer);
		game.nextPlayer();
	}
	view.showCurrentPlayer();
	endRound();
}

//Gives a point to the winner. Shows a replay button. If the round is even, 
//no player get a point, the replay button is also displayed.
function endRound() {
	if (game.isOver()) {
		game.currentPlayer.scoreUp();
		view.showScores();
		view.removeTimer();
		view.showReplayButton();
		$('td').off("click");
	}
}

//Starts a new round. 
function startNewRound() {
	view.clearBoard();
	view.showTimer();
	game.start();
	$('td').click(function () {
		try {
			makeAMove($(this));
		} catch (e) {
			alert(e);
		}
	});
	$('#replay').remove();
	view.showCurrentPlayer();
}

$('document').ready(function () {
	view.showCurrentPlayer();
	$('#start').click(function () {
		console.log("start clicked!");
		startNewRound();
		$('#start').remove();
	});
	$("#theme_control").click(function() {view.toggleTheme()});
});
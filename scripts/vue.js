//Shows the current player in the given box.
function showMove(box, player) {
	$(box).text(player.name);
	if (game.hasWon(player)) console.log(player.name + ' wins the round.');
	if (game.isEven) console.log('The two players are even.');
}

//Shows a replay button.
function showReplayButton() {
	$('body').append('<button id="replay">New round</button>');
}

//Shows the scores in the page.
function showScores() {
	$('#scoreX').text(game._players[0].score);
	$('#scoreO').text(game._players[1].score);
}

//Shows the current player in the given box.
function showMove(box, player) {
	$(box).text(player.name);
	if (game.hasWon(player)) console.log(player.name + ' wins the round.');
	if (game.isEven) console.log('The two players are even.');
}

//Shows a replay button.
function showReplayButton() {
	$('body').append('<button id="replay">New round</button>');
	$('#replay').click(startNewRound);
}

//Shows the scores in the page.
function showScores() {
	$('#scoreX').text(game._players[0].score);
	$('#scoreO').text(game._players[1].score);
}

//Clears the board from all the player.
function clearBoard() {
	game.clearBoard();
	for (let i = 0; i < $('tr').length; i++) {
		for (let j = 0; j < $('td').length; j++) {
			$('tr').eq(i).children().eq(j).text(' ');
		}
	}
}

//Shows the current player in the given box.
function showMove(box, player) {
	showIcon(box);
	if (game.hasWon(player)) console.log(player.name + ' wins the round.');
	if (game.isEven) console.log('The two players are even.');
}

//Shows the icon corresponding to the player.
function showIcon(box) {
	let posBox = $(box).data('pos');
	if (game.board[posBox.row][posBox.col] == 'X') {
		$(box).html("<img src='./images/cross.png' width='50'>");
	} else {
		$(box).html("<img src='./images/circle.jpg' width='50'>");
	}
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
	for (let i = 0; i < $('#board tr').length; i++) {
		for (let j = 0; j < $('#board td').length; j++) {
			$('#board tr').eq(i).children().eq(j).text(' ');
		}
	}
}

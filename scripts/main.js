let board = new Board();
let currentPlayer = 'X';
let polling = setInterval(win, 250);
let scores = {'X': 0, 'O': 0};

//Assigns the value the board and displays it.
function assignValueTo(box, value) {
	let boxPos = $(`#${$(box).attr('id')}`).data('pos');
	box = board.boxes[boxPos.row][boxPos.col] = value;
}

//Displays the given value in the given box.
function displayValueAt(box, value) {
	$(box).text(value);
}

//Plays once.
function play(box, value) {
	assignValueTo(box, value);
	displayValueAt(box, value);
}

function nextPlayer() {
	if (currentPlayer == 'X') {
		currentPlayer = 'O';
	} else {
		currentPlayer = 'X';
	}
}

function hasWon(player) {
	return board.isWinning(player);
}

function win() {
	console.log('test');
	if (hasWon(currentPlayer)) {
		updateScore(currentPlayer);
		$('body').append("<button id='replay'>Replay</button>");
		$('#replay').click(newGame);
		clearInterval(polling);
	}
}

function updateScore(player) {
	if (player == 'X') {
		scores.X++;
		$('#scoreX').text(scores.X);
	} else {
		scores.O++;
		$('#scoreO').text(scores.O);
	}
}

function clearBoard() {
	for (let i = 0; i < board.boxes.length; i++) {
		let tableRow = $('tr').eq(i);
		for (let j = 0; j < board.boxes[i].length; j++) {
			tableRow.children().eq(j).text(' ');
		}
	}
}

function newGame() {
	board = new Board();
	clearBoard();
	$('#replay').hide();
	polling = setInterval(win, 250);
}

$('document').ready(function() {
	$('td').click(function() {
		if (!hasWon(currentPlayer)) { 
			play(this, currentPlayer);
			if (!hasWon(currentPlayer)) nextPlayer();
		}
	});
});

let board = new Board();
let avatars = ['X', 'O'];
let currentPlayer = 0;

//Assigns the value the board and displays it.
function assignValueTo(box, value) {
	let boxPos = $(`#${$(box).attr('id')}`).data('pos');
	board.boxes[boxPos.row][boxPos.col] = value;
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
	if (currentPlayer == 0) {
		currentPlayer = 1;
	} else {
		currentPlayer = 0;
	}
}

function game(box) {
	let isOver = false;
	if (!isOver) {
		play(box, avatars[currentPlayer]);
		isOver = board.hasWinnerOf(board.boxes, avatars[currentPlayer]);
		nextPlayer();
		console.log(isOver)
		if (isOver) console.log('Player ' + (currentPlayer + 1) + ' wins.');
	}
}



$('document').ready(function() {
	$('td').click(function() {
		game(this);
	});
});

let board = new Board();

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

$('document').ready(function() {
	$('td').click(function() {
		play(this, 'X');
	});
});

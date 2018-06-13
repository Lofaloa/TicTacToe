let board = new Board();

//Assigns the value the board and displays it.
function assignValueTo(box, value) {
	let boxId = $(box).children().attr('id');
	let boxPos = getBoxPosition(boxId);
	board.boxes[boxPos.row][boxPos.col] = value;
	$(`#${boxId}`).text(value);
}

// Gets the position of the box identief by its id.
function getBoxPosition(boxId) {
	switch(boxId) {
		case 'topLeft': return {'row': 0, 'col': 0};
			break;
		case 'topMiddle': return {'row': 0, 'col': 1}; 
			break;
		case 'topRight': return {'row': 0, 'col': 2}; 
			break;
		case 'middleLeft': return {'row': 1, 'col': 0}; 
			break;
		case 'center': return {'row': 1, 'col': 1}; 
			break;
		case 'middleRight': return {'row': 1, 'col': 2}; 
			break;
		case 'bottomLeft': return {'row': 2, 'col': 0}; 
			break;
		case 'bottomMiddle': return {'row': 2, 'col': 1}; 
			break;
		case 'bottomRight': return {'row': 2, 'col': 2}; 
			break;
	}
}

$('document').ready(function() {
	$('td').click(function() {assignValueTo(this, 'X');});
});

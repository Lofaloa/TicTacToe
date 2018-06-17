//True if a given row contains only the given player.
function isRowOf(row, player) {
	return row.every(box => box == player);
}

//True if the given board contains a given player's row.
function hasRowOf(board, player) {
	let i = 0;
	let hasRowOf = false;
	while(i < board.length && !hasRowOf) {
		hasRowOf = isRowOf(board[i], player);
		i++;
	}
	return hasRowOf;
} 

//True if a given column of the board contains only given player.
function isColumnOf(board, column, player) {
	let i = 0;
	while (i < board.length && board[i][column] == player) {
	 	i++;
  	}
  	return i == board.length;
}

//True if the board contains a given player's column.
function hasColumnOf(board, player) {
	let i = 0;
	let hasColumnOf = false;
	while (i < board[0].length && !hasColumnOf) {
		hasColumnOf = isColumnOf(board, i, player);
		i++;
	}
	return hasColumnOf;
}

//True if the board descending diagonal belongs to the given player.
function isDescendingDiagonalOf(board, player) {
	let i = 0;
	while (i < board.length && board[i][i] == player) {
    	i++;
  	}
  	return i == board.length;
}

//True if the board's rising diagonal belongs to the given player.
function isRisingDiagonalOf(board, player) {
	let i = 0;
	while (i < board.length && board[i][boxes.length - 1 - i] == player) {
     		i++;
   	}
   	return i == board.length;
}

//True if the given board contains a player's diagonal.
function hasDiagonalOf(board, player) {
	return isDescendingDiagonalOf(board, player) ||
	       isRisingDiagonalOf(board, player);
}

//Sets all the cells of a two dimensional arrat to the same value.
function setAllArrayTo(arr, value) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			arr[i][j] = value;
		}
	}
}

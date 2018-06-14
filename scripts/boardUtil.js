//True if a given row contains only the given.
let isRowOf = (row, avatar) => row.every(box => box == avatar);

//True if the given board contains a row of the given avatar.
function hasRowOf(boxes, avatar) {
	let i = 0;
	let hasRowOf = false;
	while(i < boxes.length && !hasRowOf) {
		hasRowOf = isRowOf(boxes[i], avatar);
		i++;
	}
	return hasRowOf;
} 

//True if a given column of the board contains only the avatar.
function isColumnOf(boxes, column, avatar) {
	let i = 0;
	while (i < boxes.length && boxes[i][column] == avatar) {
	 	i++;
  	}
  	return i == boxes.length;
}

//True if the board contains a column of the given avater.
function hasColumnOf(boxes, avatar) {
	let i = 0;
	let hasColumnOf = false;
	while (i < boxes[0].length && !hasColumnOf) {
		hasColumnOf = isColumnOf(boxes, i, avatar);
		i++;
	}
	return hasColumnOf;
}

//True if the board's descending diagonal is equal to the given type.
function isDescendingDiagonalOf(boxes, avatar) {
	let i = 0;
	while (i < boxes.length && boxes[i][i] == avatar) {
    	i++;
  	}
  	return i == boxes.length;
}

//True if the board's rising diagonal is equal to the given type.
function isRisingDiagonalOf(boxes, avatar) {
	let i = 0;
	while (i < boxes.length && boxes[i][boxes.length - 1 - i] == avatar) {
     		i++;
   	}
   	return i == boxes.length;
}

//True if the given board contains a diagonal of avatars.
function hasDiagonalOf(boxes, avatar) {
	return isDescendingDiagonalOf(boxes, avatar) ||
	       isRisingDiagonalOf(boxes, avatar);
}

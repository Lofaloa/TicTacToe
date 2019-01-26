// Represents a 3 by 3 tic tac toe grid.
class Board {

    //Constructs an empty board.
    constructor() {
        this._boxes = [];
        this.init();
    }

    // Size of this board. This board is 3 by 3.
    static get SIZE() {
        return 3;
    }

    static get X_MARKER() {
        return 'X';
    }

    static get O_MARKER() {
        return 'O';
    }

    static get EMPTY_MARKER() {
        return ' ';
    }

    //Gets this board boxes.
    get boxes() {
        return this._boxes;
    }

    //Tells if this board is full. It is when all boxes are filled.
    get isFull() {
        let i = 0;
        while (i < this.boxes.length && !this.boxes[i].includes(Board.EMPTY_MARKER)) {
            i++;
        }
        return i == this.boxes.length;
    }

    // initializes this board.
    init() {
        this.clear();
        for (let row = 0; row < Board.SIZE; ++row) {
            this.boxes.push([]);
            for (let column = 0; column < Board.SIZE; ++column) {
                this.boxes[row][column] = Board.EMPTY_MARKER; 
            }
        }
    }

    //Throws an exception if the given position is not valid. A position is 
    //valid if it is in this board bounds.
    requireValidPosition(row, column) {
        if (row < 0 || Board.SIZE - 1 < row) throw row + " is not a valid row, it" +
            "should be between 0 and 2";
        if (column < 0 || Board.SIZE - 1 < column) throw row + " is not a valid" +
            "column, it should be between 0 and 2";
    }

    //Tells if this board is empty at the given position.
    isEmptyAt(row, col) {
        this.requireValidPosition(row, col);
        return this.boxes[row][col] == Board.EMPTY_MARKER;
    }

    //Sets the given marker at the given position in this board.
    set(row, col, marker) {
        if (!this.isEmptyAt(row, col)) {
            throw "The board is not empty at row " + row + ", column " + col + "!";
        }
        this._boxes[row][col] = marker;
    }

    //Clears this board. All markers will be erased from this board.
    clear() {
        this.setAllArrayTo(this._boxes, Board.EMPTY_MARKER);
    };

    //True if a given row contains only the given player.
    isRowOf(row, value) {
        return row.every(box => box == value);
    }

    //True if this board contains a given player's row.
    hasRowOf(value) {
        let i = 0;
        let hasRowOf = false;
        while (i < 3 && !hasRowOf) {
            hasRowOf = this.isRowOf(this.boxes[i], value);
            i++;
        }
        return hasRowOf;
    }

    //True if a given column of the board contains only given player.
    isColumnOf(column, value) {
        let i = 0;
        while (i < this.boxes.length && this.boxes[i][column] == value) {
            i++;
        }
        return i == this.boxes.length;
    }

    //True if the board contains a given player's column.
    hasColumnOf(value) {
        let i = 0;
        let hasColumnOf = false;
        while (i < this.boxes[0].length && !hasColumnOf) {
            hasColumnOf = this.isColumnOf(i, value);
            i++;
        }
        return hasColumnOf;
    }

    //True if the board descending diagonal belongs to the given player.
    hasDescendingDiagonalOf(value) {
        let i = 0;
        while (i < this.boxes.length && this.boxes[i][i] == value) {
            i++;
        }
        return i == this.boxes.length;
    }

    //True if the board's rising diagonal belongs to the given player.
    hasRisingDiagonalOf(value) {
        let i = 0;
        while (i < this.boxes.length && this.boxes[i][this.boxes.length - 1 - i] == value) {
            i++;
        }
        return i == this.boxes.length;
    }

    //True if the given board contains a player's diagonal.
    hasDiagonalOf(value) {
        return this.hasDescendingDiagonalOf(value) || this.hasRisingDiagonalOf(value);
    }

    hasAWinningComboFor(player) {
        return this.hasRowOf(player) ||
            this.hasColumnOf(player) ||
            this.hasDiagonalOf(player);
    }

    //Sets all the cells of a two dimensional array to the same value.
    setAllArrayTo(arr, value) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                arr[i][j] = value;
            }
        }
    }

    // Creates a copy of this board.
    clone() {
        let newBoard = new Board();
        for (let row = 0; row < Board.SIZE; ++row) {
            for (let column = 0; column < Board.SIZE; ++column) {
                newBoard.boxes[row][column] = this.boxes[row][column];
            }
        }
        return newBoard;
    }

}
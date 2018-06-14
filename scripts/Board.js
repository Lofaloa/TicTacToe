class Board {
  	constructor() {
    		this._boxes = [[new Box("empty"), new Box("empty"), new Box("empty")],
	                      [new Box("empty"), new Box("empty"), new Box("empty")],
		              [new Box("empty"), new Box("empty"), new Box("empty")]];
  	}

  	//Gets the boxes of the board.
  	get boxes() {
		return this._boxes;
  	}

  	//Tells if the board is full.
  	isFull() {
		for (let i = 0; i < this.boxes.length; i++) {
      			for (let j = 0; i < this.boxes[i].length; j++) {
        			if (this.boxes[i][j] == undefined) return false;
      			}
    		}
  	}

  	hasWinnerOf(avatar) {
  		return hasRowOf(this.boxes, avatar) || hasColumnOf(this.boxes, avatar) ||
	       	hasDiagonalOf(this.boxes, avatar);
  	}

}

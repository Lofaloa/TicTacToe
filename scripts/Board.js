class Board {
  	constructor() {
    		this._boxes = this.init();
  	}

  	//Gets the boxes of the board.
  	get boxes() {
		return this._boxes;
  	}

	set boxes(value) {
		this.boxes = value;
	}

	init() {
		return [[new Box("empty"), new Box("empty"), new Box("empty")],
	                [new Box("empty"), new Box("empty"), new Box("empty")],
		        [new Box("empty"), new Box("empty"), new Box("empty")]];
	}

  	isWinning(avatar) {
  		return hasRowOf(this.boxes, avatar) || hasColumnOf(this.boxes, avatar) ||
	       	hasDiagonalOf(this.boxes, avatar);
  	}

}

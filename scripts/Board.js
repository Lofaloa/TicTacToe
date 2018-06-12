class Board {
  constructor() {
    this._boxes = [new Array(3), new Array(3), new Array(3)];
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

  //True if the board contains a row of the given type.
  hasARowOf(type) {
    let i = 0;
    while(i < this.boxes.length) {
      if (rowAllEqualToType(this.boxes[i]), type) return true;
      i++;
    }
    return false;
  }

  //True if the board contains a column of the given type.
  hasAColumnOf(type) {
    let i = 0;
    while (i < this.boxes[0].length) {
      if (columnAllEqualToType(this.boxes, i, type)) return true;
    }
    return false;
  }

  //True if the board contains a column of the given type.
  hasRisingDiagonal(type) {

  }

  //True if the board contains a column of the given type.
  hasDescendingDiagonal(type) {
    let i = 0;
    while (i < this.boxes.length && this.boxes[i][i] == type) {
      i++;
    }
    return i == this.boxes.length;
  }


}

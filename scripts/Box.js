//Represents one of the box of the board.
class Box {
 	//Initializes this box with the given type.
 	constructor(type) {
  		this._type = type;
  	}

	//Gets the type of this box.
 	get type() {
  		return this._type;
  	}
  
	//Sets the type to the given value.
	set type(value) {
		this._type = value;
	}

  	//Tells if this box is empty.
  	isEmpty() {
    		return this.getType() == "empty";
  	}

}

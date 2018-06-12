//Tells if an array contains all the same values.
let rowAllEqualToType = (arr, type) => arr.every(e => e == type);

//Tells if a column of a two dimensial array has all the same values.
function columnAllEqualToType(arr, column, type) {
  let i = 0;
  while (i < arr.length && arr[i][column] == type) {
    i++;
  }
  return i == arr.length;
}

//True if the board's descending diagonal is equal to the given type.
function descendingDiagonalAllEqualToType(arr, type) {
  let i = 0;
  while (i < arr.length && arr[i][i] == type) {
    i++;
  }
  return i == arr.length;
}

//True if the board's rising diagonal is equal to the given type.
function risingDiagonalAllEqualToType(arr, type) {
   let i = 0;
   while (i < arr.length && arr[i][arr.length - 1 - i] == type) {
     i++;
   }
   return i == arr.length;
}

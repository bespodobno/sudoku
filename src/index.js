
module.exports = function solveSudoku(matrix) {

  if (sudokuSolver(matrix) == true) 
  return matrix;
  
}
//https://www.geeksforgeeks.org/sudoku-backtracking-7/

function sudokuSolver(board){
  let row = -1;
  let col = -1;
  let isEmpty = true;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == 0) {
        row = i;
        col = j;

        // we still have some remaining 
        // missing values in Sudoku 
        isEmpty = false;
        break;
      }
    }
    if (!isEmpty) {
      break;
    }
  }

  // no empty space left 
  if (isEmpty) {
    return true;
  }

  // else for each-row backtrack 
  for (let num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;
      if (sudokuSolver(board)) {
        // prvar(board, n); 
        return true;
      }
      else {
        board[row][col] = 0; // replace it 
      }
    }
  }
  return false;
}

function isSafe(board, row, col, num) {
  // row has the unique (row-clash) 
  for (let d = 0; d < board.length; d++) {
    // if the number we are trying to  
    // place is already present in  
    // that row, return false; 
    if (board[row][d] == num) {
      return false;
    }
  }

  // column has the unique numbers (column-clash) 
  for (let r = 0; r < board.length; r++) {
    // if the number we are trying to 
    // place is already present in 
    // that column, return false; 

    if (board[r][col] == num) {
      return false;
    }
  }

  // corresponding square has 
  // unique number (box-clash) 
  
  let boxRowStart = row - row % 3;
  let boxColStart = col - col % 3;

  for (let r = boxRowStart; r < boxRowStart + 3; r++) {
    for (let d = boxColStart; d < boxColStart + 3; d++) {
      if (board[r][d] == num) {
        return false;
      }
    }
  }

  // if there is no clash, it's safe 
  return true;
} 
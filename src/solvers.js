/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  if (n === 0) {
    return [];
  }
  var board = new Board({ n: n});
  // array to hold all possible board sollutions
  
  var addPiece = function (board, row) {
    for (var c = 0; c < n; c++) {
      //toggle current column/row combination
      board.togglePiece(row, c);
      //check to see if there are any rook conflicts
      if (!board.hasAnyRooksConflicts()) {
        //check how many peices there are compared to n
        if (board.numberPiecesOnBoard() < n) {
          //if there are less than n peices, recurse
          return addPiece(board, row + 1);
        } else {
          //otherwise, push board to solutions array
          console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.captureRows()));
          return board.captureRows();
        }
      }
      //untoggle piece from current row/column combination
      board.togglePiece(row, c);
    }
  };
  // run recursive function with empty board
  return addPiece(board, 0);
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var board = new Board({ n: n});
  // array to hold all possible board sollutions
  var solutions = [];
  
  var addPiece = function (board, row) {
    for (var c = 0; c < n; c++) {
      //toggle current column/row combination
      board.togglePiece(row, c);
      //check to see if there are any rook conflicts
      if (!board.hasAnyRooksConflicts()) {
        //check how many peices there are compared to n
        if (board.numberPiecesOnBoard() < n) {
          //if there are less than n peices, recurse
          addPiece(board, row + 1);
        } else {
          //otherwise, push board to solutions array
          solutions.push(board.captureRows());
        }
      }
      //untoggle piece from current row/column combination
      board.togglePiece(row, c);
    }
  };
  // run recursive function with empty board
  addPiece(board, 0);
  // pick one solution from solutions array
  var solutionCount = solutions.length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return 1;
  }
  var board = new Board({ n: n});
  // array to hold all possible board sollutions
  var solutions = [];
  
  var addPiece = function (board, row) {
    for (var c = 0; c < n; c++) {
      //toggle current column/row combination
      board.togglePiece(row, c);
      //check to see if there are any rook conflicts
      if (!board.hasAnyQueensConflicts()) {
        //check how many peices there are compared to n
        if (board.numberPiecesOnBoard() < n) {
          //if there are less than n peices, recurse
          addPiece(board, row + 1);
        } else {
          //otherwise, push board to solutions array
          solutions.push(board.captureRows());
        }
      }
      //untoggle piece from current row/column combination
      board.togglePiece(row, c);
    }
  };
  // run recursive function with empty board
  addPiece(board, 0);
  // pick one solution from solutions array
  // var solution = JSON.stringify(solutions[0]); //fixme
  var solution = solutions[0];

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var board = new Board({ n: n});
  // array to hold all possible board sollutions
  var solutions = [];
  
  var addPiece = function (board, row) {
    for (var c = 0; c < n; c++) {
      //toggle current column/row combination
      board.togglePiece(row, c);
      //check to see if there are any rook conflicts
      if (!board.hasAnyQueensConflicts()) {
        //check how many peices there are compared to n
        if (board.numberPiecesOnBoard() < n) {
          //if there are less than n peices, recurse
          addPiece(board, row + 1);
        } else {
          //otherwise, push board to solutions array
          solutions.push(board.captureRows());
        }
      }
      //untoggle piece from current row/column combination
      board.togglePiece(row, c);
    }
  };
  // run recursive function with empty board
  addPiece(board, 0);
  // pick one solution from solutions array
  var solutionCount = solutions.length; //fixme
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var thisRow = this.get(rowIndex);
      var pieces = thisRow.reduce((accumulator, element) => accumulator + element);
      return pieces > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var pieces = 0;
      for (var i = 0; i < board.length; i++) {
        pieces += board[i][colIndex];
      }
      return pieces > 1; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.rows();
      var numRows = board.length;
      for (var i = 0; i < numRows; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      var rowIndex = 0;
      var pieces = 0;
      var board = this.rows();
      //debugger;
      for (colIndex; colIndex < board.length && rowIndex < board.length; colIndex++, rowIndex++) {
        if (colIndex >= 0) {
          pieces += board[rowIndex][colIndex];
        }
      }
      return pieces > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      var startIndex = -board.length + 2;
      for (startIndex; startIndex < board.length; startIndex++) {
        if (this.hasMajorDiagonalConflictAt(startIndex)) {
          return true;
        }
      } 
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      var rowIndex = 0;
      var board = this.rows();
      var pieces = 0;
      
      for (colIndex; colIndex > -1 && rowIndex < board.length; colIndex--, rowIndex++) {
        if (colIndex < board.length) {
          pieces += board[rowIndex][colIndex];
        }
      }
      return pieces > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();
      var startIndex = board.length * 2 - 3;
      for (startIndex; startIndex > 0; startIndex--) {
        if (this.hasMinorDiagonalConflictAt(startIndex)) {
          return true;
        }
      } 
      return false;
    },

    /*--------------------  End of Helper Functions  ---------------------*/
    //lol, that's what you think
    
    rowHasPiece: function(rowIndex) {
      var thisRow = this.get(rowIndex);
      var pieces = thisRow.reduce((accumulator, element) => accumulator + element);
      return pieces > 0;
    },
    numberPiecesOnBoard: function() {
      var board = this.rows();
      var pieces = 0;
      board.forEach(function (row) {
        row.forEach(p => pieces += p );
      });
      return pieces;
    },
    
    captureRows: function() {
      var rows = this.rows();
      var copy = [];
      rows.forEach(function(el) {
        copy.push(el.slice());
      });
      return copy;
    }


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

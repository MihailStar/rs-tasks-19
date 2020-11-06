'use strict';

/**
 * @constant
 */
const PLAYER_SYMBOLS = ['x', 'o'];

/**
 * @constant
 */
const WINNING_COMBINATIONS = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],

  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],

  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
];

const playingField = Symbol('playingField');
const currentPlayerSymbol = Symbol('currentPlayerSymbol');

class TicTacToe {
  constructor() {
    this[playingField] = [['', '', ''], ['', '', ''], ['', '', '']];
    [this[currentPlayerSymbol]] = PLAYER_SYMBOLS;
  }

  /**
   * @return {string}
   */
  getCurrentPlayerSymbol() {
    return this[currentPlayerSymbol];
  }

  /**
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @return {?string}
   */
  getFieldValue(rowIndex, columnIndex) {
    const isCellEmpty = this[playingField][rowIndex][columnIndex] === '';

    return isCellEmpty ? null : this[playingField][rowIndex][columnIndex];
  }

  /**
   * @return {?string}
   */
  getWinner() {
    /**
     * @param {string} symbol
     * @return {boolean}
     */
    const isWinner = (symbol) => {
      for (const [
        [rowIndex0, columnIndex0],
        [rowIndex1, columnIndex1],
        [rowIndex2, columnIndex2],
      ] of WINNING_COMBINATIONS) {
        if (
          this[playingField][rowIndex0][columnIndex0] === symbol &&
          this[playingField][rowIndex1][columnIndex1] === symbol &&
          this[playingField][rowIndex2][columnIndex2] === symbol
        ) {
          return true;
        }
      }

      return false;
    };

    return isWinner(PLAYER_SYMBOLS[0])
      ? PLAYER_SYMBOLS[0]
      : isWinner(PLAYER_SYMBOLS[1])
      ? PLAYER_SYMBOLS[1]
      : null;
  }

  /**
   * Ничья?
   * @return {boolean}
   */
  isDraw() {
    const isWinner = Boolean(this.getWinner());

    return this.noMoreTurns() && !isWinner;
  }

  /**
   * @return {boolean}
   */
  isFinished() {
    const isWinner = Boolean(this.getWinner());

    return this.isDraw() || isWinner;
  }

  /**
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @return {void}
   */
  nextTurn(rowIndex, columnIndex) {
    const isCellEmpty = this[playingField][rowIndex][columnIndex] === '';

    if (isCellEmpty) {
      this[playingField][rowIndex][columnIndex] = this[currentPlayerSymbol];

      this[currentPlayerSymbol] =
        this[currentPlayerSymbol] === PLAYER_SYMBOLS[0]
          ? PLAYER_SYMBOLS[1]
          : PLAYER_SYMBOLS[0];
    }
  }

  /**
   * @return {boolean}
   */
  noMoreTurns() {
    const flatPlayingField =
      'flat' in Array.prototype
        ? this[playingField].flat()
        : this[playingField].reduce((array, row) => array.concat(row), []);
    const numberOfCells = flatPlayingField.length;
    const numberOfOccupiedCells = flatPlayingField.filter(
      (cellValue) => cellValue !== '',
    ).length;

    return numberOfCells === numberOfOccupiedCells;
  }
}

module.exports = TicTacToe;

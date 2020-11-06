'use strict';

const range = Symbol('range');

const GuessingGame = class {
  constructor() {
    this[range] = {
      minimum: 0,
      maximum: 0,
    };
  }

  /**
   * @param {number} minimum
   * @param {number} maximum
   * @return {void}
   */
  setRange(minimum, maximum) {
    this[range] = { minimum, maximum };
  }

  /**
   * @return {number}
   */
  guess() {
    return Math.ceil((this[range].minimum + this[range].maximum) / 2);
  }

  /**
   * @return {void}
   */
  lower() {
    this[range].maximum = this.guess();
  }

  /**
   * @return {void}
   */
  greater() {
    this[range].minimum = this.guess();
  }
};

module.exports = GuessingGame;

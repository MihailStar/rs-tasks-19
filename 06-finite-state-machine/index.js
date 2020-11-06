'use strict';

const initialState = Symbol('initialState');
const currentState = Symbol('currentState');
const allStates = Symbol('allStates');
const history = Symbol('history');

class FSM {
  /**
   * Creates new FSM instance
   * @param {Object} config
   * @return {FSM}
   */
  constructor(config) {
    if (!arguments.length) {
      throw new Error();
    }

    this[initialState] = config.initial;
    this[currentState] = config.initial;
    this[allStates] = config.states;
    this[history] = {
      undo: [],
      redo: [],
    };
  }

  /**
   * Returns active state
   * @return {string}
   */
  getState() {
    return this[currentState];
  }

  /**
   * Goes to specified state
   * @param {string} state
   * @return {void}
   */
  changeState(state) {
    if (!this.getStates().includes(state)) {
      throw new Error();
    }

    this[history].undo.push(this[currentState]);
    this[history].redo.length = 0;

    this[currentState] = state;
  }

  /**
   * Changes state according to event transition rules
   * @param {string} event
   * @return {void}
   */
  trigger(event) {
    if (!this[allStates][this[currentState]].transitions[event]) {
      throw new Error();
    }

    this.changeState(this[allStates][this[currentState]].transitions[event]);
  }

  /**
   * Resets FSM state to initial
   * @return {void}
   */
  reset() {
    this[currentState] = this[initialState];
  }

  /**
   * Returns an array of states for which there are specified event transition rules
   * Returns all states if argument is undefined
   * @param {string} [event]
   * @return {Array}
   */
  getStates(event) {
    const stateNames = Object.keys(this[allStates]);

    if (!arguments.length) {
      return stateNames;
    }

    return stateNames.filter(
      (stateName) => this[allStates][stateName].transitions[event],
    );
  }

  /**
   * Goes back to previous state
   * Returns false if undo is not available
   * @return {boolean}
   */
  undo() {
    if (!this[history].undo.length) {
      return false;
    }

    this[history].redo.push(this[currentState]);
    this[currentState] = this[history].undo.pop();

    return true;
  }

  /**
   * Goes redo to state
   * Returns false if redo is not available
   * @return {boolean}
   */
  redo() {
    if (!this[history].redo.length) {
      return false;
    }

    this[history].undo.push(this[currentState]);
    this[currentState] = this[history].redo.pop();

    return true;
  }

  /**
   * Clears transition history
   * @return {void}
   */
  clearHistory() {
    this[history].undo.length = 0;
    this[history].redo.length = 0;
  }
}

module.exports = FSM;

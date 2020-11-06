'use strict';

const Node = require('./node');

/**
 * @tutorial
 * https://tproger.ru/translations/linked-list-for-beginners
 */
class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }

  /**
   * @return {number}
   */
  get length() {
    return this._length;
  }

  /**
   * @param {any} data
   * @return {this}
   */
  append(data) {
    if (this.isEmpty()) {
      const linkedListNode = new Node(data, null, null);

      this._head = linkedListNode;
      this._tail = linkedListNode;
    } else {
      const linkedListNode = new Node(data, this._tail, null);

      this._tail.next = linkedListNode;
      this._tail = linkedListNode;
    }

    this._length += 1;

    return this;
  }

  /**
   * @return {?any}
   */
  head() {
    return this.isEmpty() ? null : this._head.data;
  }

  /**
   * @return {?any}
   */
  tail() {
    return this.isEmpty() ? null : this._tail.data;
  }

  /**
   * @param {number} index
   * @return {?any}
   */
  at(index) {
    let currentIndex = -1;

    for (const item of this) {
      currentIndex += 1;

      if (currentIndex === index) {
        return item.data;
      }
    }

    return null;
  }

  /**
   * @param {number} index
   * @param {any} data
   * @return {this}
   */
  insertAt(index, data) {
    let currentIndex = -1;

    for (const item of this) {
      currentIndex += 1;

      if (currentIndex === index) {
        const linkedListNode = new Node(data, item.prev, item);

        if (item.prev !== null) {
          item.prev.next = linkedListNode;
        } else {
          this._head = linkedListNode;
        }

        item.prev = linkedListNode;
      }
    }

    return this;
  }

  /**
   * @return {Boolean}
   */
  isEmpty() {
    return this._length === 0;
  }

  /**
   * @return {this}
   */
  clear() {
    this._head = null;
    this._tail = null;
    this._length = 0;

    return this;
  }

  /**
   * @return {this}
   */
  deleteAt(index) {
    let currentIndex = -1;

    for (const item of this) {
      currentIndex += 1;

      if (currentIndex === index) {
        if (item.prev !== null) {
          item.prev.next = item.next;
        } else {
          this._head = item.next;
        }

        if (item.next !== null) {
          item.next.prev = item.prev;
        } else {
          this._tail = item.prev;
        }
      }
    }

    return this;
  }

  /**
   * @return {this}
   */
  reverse() {
    for (const item of this) {
      const { next, prev } = item;

      item.prev = next;
      item.next = prev;
    }

    const { _head, _tail } = this;

    this._head = _tail;
    this._tail = _head;

    return this;
  }

  /**
   * @param {any} data
   * @return {number}
   */
  indexOf(data) {
    let currentIndex = -1;

    for (const item of this) {
      currentIndex += 1;

      if (item.data === data) {
        return currentIndex;
      }
    }

    return -1;
  }

  [Symbol.iterator]() {
    let currentItem = this._head;

    return {
      next() {
        if (currentItem !== null) {
          const result = { done: false, value: currentItem };

          currentItem = currentItem.next;

          return result;
        }

        return { done: true, value: undefined };
      },
    };
  }
}

module.exports = LinkedList;

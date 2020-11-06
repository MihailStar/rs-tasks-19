'use strict';

/**
 * @param {string} first
 * @param {string} second
 * @return {string}
 */
const multiply = (first, second) => String(BigInt(first) * BigInt(second));

module.exports = multiply;

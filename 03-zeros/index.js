'use strict';

/**
 * @param {number} number
 * @param {number} divider
 * @return {boolean}
 */
const isMultiple = (number, divider) => number % divider === 0;

/**
 * @param {number} number
 * @return {boolean}
 */
const isEvenNumber = (number) => isMultiple(number, 2);

/**
 * @param {number} number
 * @return {boolean}
 */
const isOddNumber = (number) => !isMultiple(number, 2);

/**
 * @param {string} expressions
 * @return {number}
 * @tutorial
 * https://tproger.ru/problems/how-many-zeros-at-the-end-of-the-factorial-of-100
 */
const zeros = (expressions) => {
  const numberOf = { '2': 0, '5': 0 };

  expressions.split('*').forEach((factorialExpression) => {
    const factorial = Number.parseInt(factorialExpression, 10);

    /**
     * @type {Array<number>}
     */
    let sequenceOfNumbers = Array.from(
      { length: factorial },
      (_, index) => index + 1,
    );

    if (factorialExpression.endsWith('!!')) {
      if (isEvenNumber(factorial)) {
        sequenceOfNumbers = sequenceOfNumbers.filter(isEvenNumber);
      } else {
        sequenceOfNumbers = sequenceOfNumbers.filter(isOddNumber);
      }
    }

    sequenceOfNumbers.forEach((number) => {
      for (let t = number; isMultiple(t, 2); t /= 2) {
        numberOf['2'] += 1;
      }

      for (let f = number; isMultiple(f, 5); f /= 5) {
        numberOf['5'] += 1;
      }
    });
  });

  return Math.min(numberOf['2'], numberOf['5']);
};

module.exports = zeros;

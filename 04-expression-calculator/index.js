'use strict';

/**
 * @param {string} leftOperand
 * @param {string} operator
 * @param {string} rightOperand
 * @return {string}
 * @example calculate('1', '*', '1'); // -> '1'
 */
const calculate = (leftOperand, operator, rightOperand) => {
  return String(
    {
      '*': Number(leftOperand) * Number(rightOperand),
      '/': Number(leftOperand) / Number(rightOperand),
      '+': Number(leftOperand) + Number(rightOperand),
      '-': Number(leftOperand) - Number(rightOperand),
    }[operator],
  );
};

/**
 * @param {string} expression
 * @return {string}
 * @example reduce('1 * 1 / 1 + 1 - 1'); // -> '1'
 */
const reduce = (expression) => {
  const expr = expression.replace(/ +/g, '').split(/([*/+]|(?<=\d)-)/);

  [['*', '/'], ['+', '-']].forEach(([operator1, operator2]) => {
    let leftOperandIndex = 0;

    while (leftOperandIndex < expr.length - 1) {
      const operator = expr[leftOperandIndex + 1];

      if (operator === operator1 || operator === operator2) {
        const leftOperand = expr[leftOperandIndex];
        const rightOperand = expr[leftOperandIndex + 2];

        expr.splice(
          leftOperandIndex,
          3,
          calculate(leftOperand, operator, rightOperand),
        );
      } else {
        leftOperandIndex += 2;
      }
    }
  });

  return expr.join('');
};

/**
 * @param {string} expression
 * @return {number}
 * @example expressionCalculator('1 * ( 1 / 1 + 1 ) - 1'); // -> 1
 */
const expressionCalculator = (expression) => {
  if (expression.match(/\/ *0/)) {
    throw new Error('TypeError: Division by zero.');
  }

  if (
    (expression.match(/\(/g) || []).length !==
    (expression.match(/\)/g) || []).length
  ) {
    throw new Error('ExpressionError: Brackets must be paired');
  }

  let expr = expression;

  while (expr.match(/[()]/)) {
    expr = expr.replace(/\(([^()]+)\)/, (_, match) => reduce(match));
  }

  return Number(reduce(expr));
};

module.exports = {
  expressionCalculator,
};

'use strict';

/**
 * @param {number} number
 * @return {boolean}
 */
const isEvenNumber = (number) => number % 2 === 0;

/**
 * @param {string} string
 * @param {Array<Array<string>>} bracketsConfig
 * @return {boolean}
 */
const check = (string, bracketsConfig) => {
    if (string.length < 2 || !isEvenNumber(string.length)) {
        return false;
    }

    const metaСharacters = [
        ...['$', '(', ')', '*', '+', '.', '<', '>'],
        ...['?', '[', '\\', ']', '^', '{', '|', '}'],
    ];

    const regExp = new RegExp(
        bracketsConfig
            .map(
                ([openingBracket, closingBracket]) =>
                    `${
                        metaСharacters.includes(openingBracket)
                            ? `\\${openingBracket}`
                            : openingBracket
                    }${
                        metaСharacters.includes(closingBracket)
                            ? `\\${closingBracket}`
                            : closingBracket
                    }`,
            )
            .join('|'),
        'g',
    );

    let bracketsString = string;

    while (regExp.test(bracketsString)) {
        bracketsString = bracketsString.replace(regExp, '');
    }

    return bracketsString.length < 1;
};

module.exports = check;

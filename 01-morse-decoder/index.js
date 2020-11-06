'use strict';

/**
 * @constant
 */
const MORSE_TABLE = {
  '.-':     'a',
  '-...':   'b',
  '-.-.':   'c',
  '-..':    'd',
  '.':      'e',
  '..-.':   'f',
  '--.':    'g',
  '....':   'h',
  '..':     'i',
  '.---':   'j',
  '-.-':    'k',
  '.-..':   'l',
  '--':     'm',
  '-.':     'n',
  '---':    'o',
  '.--.':   'p',
  '--.-':   'q',
  '.-.':    'r',
  '...':    's',
  '-':      't',
  '..-':    'u',
  '...-':   'v',
  '.--':    'w',
  '-..-':   'x',
  '-.--':   'y',
  '--..':   'z',
  '.----':  '1',
  '..---':  '2',
  '...--':  '3',
  '....-':  '4',
  '.....':  '5',
  '-....':  '6',
  '--...':  '7',
  '---..':  '8',
  '----.':  '9',
  '-----':  '0',
};

/**
 * @param {string} expr
 * @return {string}
 */
const decode = (expr) =>
  expr
    .split(/\*+/)
    .map((word) => word.match(/\d{10}/g))
    .map((word) =>
      word
        .map(
          (letter) =>
            MORSE_TABLE[
              letter
                .replace(/^0*/, '')
                .replace(/10/g, '.')
                .replace(/11/g, '-')
            ],
        )
        .join(''),
    )
    .join(' ');

module.exports = { decode };

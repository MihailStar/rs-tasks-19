'use strict';

/**
 * @param {Array<number>} [preferences] indices of spichonees, whom they love
 * @return {number} number of love triangles
 */
const getLoveTrianglesCount = (preferences = []) =>
  preferences
    .map((preference) => preference - 1)
    .reduce(
      (counter, preference, spichonee, array) =>
        preference !== spichonee && array[array[preference]] === spichonee
          ? counter + 1
          : counter,
      0,
    ) / 3;

module.exports = getLoveTrianglesCount;

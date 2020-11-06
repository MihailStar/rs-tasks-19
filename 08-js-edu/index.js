/**
 * @param {string} focus
 * target student focus
 * @param {boolean} knowsProgramming
 * if student can do programming and know basics
 * @param {Object<string, number>} config
 * private student ability to perform for different focus modes
 * @return {number}
 * number of weeks needed for finish education
 */
function getTimeForEducation(
  focus = 'family',
  knowsProgramming = true,
  config = { family: 4 },
) {
  const HOURS_TO_LEARN_BASICS = 500;
  const HOURS_TO_LEARN_JAVASCRIPT = 800;

  const hoursToLearn = knowsProgramming
    ? HOURS_TO_LEARN_JAVASCRIPT
    : HOURS_TO_LEARN_JAVASCRIPT + HOURS_TO_LEARN_BASICS;
  const hoursAWeek = config[focus];

  return Math.ceil(hoursToLearn / hoursAWeek);
}

module.exports = getTimeForEducation;

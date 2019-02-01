const IFTTT = require('node-ifttt-maker');

const { iftttKey } = require('../config');

const ifttt = new IFTTT(iftttKey);

function triggerThis (color) {
  return ifttt
    .request({ event: `office-${color}`, method: 'POST' })
    .then(console.log)
    .catch(console.warn);
}

module.exports = triggerThis;

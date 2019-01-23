const IFTTT = require('node-ifttt-maker');

const ifttt = new IFTTT('kPLW1nntsbVKGuWj5EPj4Bo3CW1wyDVVg3Cu3HnYzJO');

function triggerThis (color) {
  return ifttt
    .request({ event: `office-${color}`, method: 'POST' })
    .then(console.log)
    .catch(console.warn);
}

module.exports = triggerThis;

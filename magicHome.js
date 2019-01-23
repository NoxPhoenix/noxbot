const Promise = require('bluebird');
const { Control } = require('magic-home');

module.exports = Promise.promisifyAll(new Control(
  '192.168.0.177',
  { wait_for_reply: false },
));

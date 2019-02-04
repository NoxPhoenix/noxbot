const lights = require('./lights');
const basic = require('./basic');
const custom = require('./custom');

module.exports = {
  ...lights,
  ...basic,
  ...custom,
};

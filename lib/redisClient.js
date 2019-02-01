const Promise = require('bluebird');
const redis = require('redis');

module.exports = Promise.promisifyAll(redis.createClient());


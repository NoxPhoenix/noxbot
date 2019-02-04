const Promise = require('bluebird');
const redis = require('redis');

const { redisUrl } = require('../config');


module.exports = Promise.promisifyAll(redis.createClient(redisUrl));


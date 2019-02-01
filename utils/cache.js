const cache = require('../lib/redisClient');

module.exports = {
  setCache (key, value, expiration = 100) {
    return cache.setAsync(key, value, 'EX', expiration);
  },

  getCache (key) {
    return cache.getAsync(key);
  },

  getExpiration (key) {
    return cache.ttlAsync(key);
  },
};

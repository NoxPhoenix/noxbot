const Promise = require('bluebird');
const sqlite = require('sqlite3');

module.exports = Promise.promisifyAll(new sqlite.Database('data.db'));

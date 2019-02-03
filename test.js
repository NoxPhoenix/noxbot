const Client = require('./lib/sengledClient');
const Promise = require('bluebird');

const cache = require('./utils/cache');

// const { sengledUsername, sengledPassword, sengledDevices } = require('./config');

// const client = new Client({ username: sengledUsername, password: sengledPassword, devices: sengledDevices });

// client.login()
//   .then(() => client.deviceSetGroupColor([0, 255, 0]))
//   .then(() => Promise.delay(500))
//   .then(() => client.deviceSetGroupColor([255, 255, 0]))
//   .then(() => client.deviceSetGroupColor([255, 0, 0]));

// cache.setCache('test', 'value1', 10)
//   .then((res) => {
//     console.log(res);
//     return res;
//   })
//   .then(Promise.delay(1000))
//   .then(() => cache.getCache('test'))
//   .then(console.log);

const { purpleFlash } = require('./utils/lights');

purpleFlash();

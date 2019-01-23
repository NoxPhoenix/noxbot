const IFTTT = require('node-ifttt-maker');
const SengledClient = require('./sengledClient');

const ifttt = new IFTTT('kPLW1nntsbVKGuWj5EPj4Bo3CW1wyDVVg3Cu3HnYzJO');
const event = 'office-pink';

const seng = new SengledClient();

ifttt
  .request({ event, method: 'POST' })
  .then((response) => { console.log(response); })
  .catch((err) => {});

seng.login('mr.mikyo@gmail.com', 'N0xPh03n1xA')
  .then(() => {
    return seng.getDevices()
      .then(console.log())
      .catch(console.log);
  })
  .then(() => {
    return seng.deviceSetOnOff('B0CE18140002526A', true);
  })
  .catch(console.log);

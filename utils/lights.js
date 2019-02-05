const Promise = require('bluebird');
// eslint ignore-next-line
const colorConvert = require('color-convert');

const lightStrip = require('../clients/magicHome');
const sengledClient = require('../clients/sengledClient');
const cache = require('./cache');


function isBetween (value, min, max) {
  return (value >= min) && (value <= max);
}

function setColor (color, colorName) {
  return Promise.all([
    sengledClient.deviceSetGroupColor(color),
    lightStrip.setColorAsync(...color),
  ])
    .then(() => {
      cache.setCache('color', colorName, 50000);
    })
    .catch(console.warn);
}

module.exports = {
  setColor,

  async followFlash () {
    const purple = [191, 0, 255];
    const orange = [252, 171, 65];
    const originalColorName = await cache.getCache('color');
    const originalColorRGB = colorConvert.keyword.rgb(originalColorName);
    return setColor(purple, 'purple')
      .then(() => Promise.delay(150))
      .then(() => setColor(orange, 'orange'))
      .then(() => Promise.delay(150))
      .then(() => setColor(purple, 'purple'))
      .then(() => Promise.delay(150))
      .then(() => setColor(orange, 'orange'))
      .then(() => Promise.delay(150))
      .then(() => setColor(purple, 'purple'))
      .then(() => setColor(originalColorRGB, originalColorName));
  },

  purpleFlash () {
    return lightStrip.setPatternAsync('purple_strobe_flash', 96);
  },

  allColorJump () {
    return lightStrip.setPatternAsync('seven_color_jumping', 97);
  },

  yellowPurple () {
    let on = false;
    let needDelay = false;
    return lightStrip.startEffectMode((effects) => {
      effects.start(() => {
        const seconds = (new Date()).getSeconds();

        if (needDelay) {
          effects.delay(1000);
          needDelay = false;
          return;
        }

        if (!on) {
          if (isBetween(seconds, 0, 19)) {
            effects.setColor(255, 0, 0);
          } else if (isBetween(seconds, 20, 39)) {
            effects.setColor(0, 255, 0);
          } else if (isBetween(seconds, 40, 59)) {
            effects.setColor(0, 0, 255);
          }

          on = true;
          needDelay = true;
        } else {
          effects.setColor(0, 0, 0);
          on = false;
          needDelay = true;
        }
      });
    });
  },
};

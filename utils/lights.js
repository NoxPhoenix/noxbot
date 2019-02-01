const Promise = require('bluebird');

const colorConvert = require('color-convert');
const colorNames = require('colornames');

const lightStrip = require('../lib/magicHome');
const iftttTrigger = require('./IFTTT');

const colors = {
  purple: '#8A2BE2',
  blue: '0064FF',
  yellow: 'FFFF00',
  red: 'FF0000',
  pink: 'F700FF',
  orange: 'FFA200',
  green: '00FF13',
  white: 'FFFFFF',
};

function isBetween (value, min, max) {
  return (value >= min) && (value <= max);
}

module.exports = {
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

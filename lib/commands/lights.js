const lightStrip = require('../../utils/magicHome');
const colorConvert = require('color-convert');
const colorNames = require('colornames');
const moment = require('moment');

const iftttTrigger = require('../../utils/IFTTT');

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

const coolDowns = {};

const nearestColor = require('nearest-color').from(colors);

function changeLightColors ({ rgb, colorName }) {
  return lightStrip.setColorAsync(...rgb)
    .then(() => iftttTrigger(colorName));
}

module.exports = {
  lights ({ chatBot, message }, color) {
    console.log(message);
    const colorLookup = colorNames(color);
    const rgb = colorConvert.hex.rgb(colorLookup);
    const { name: colorName } = nearestColor(colorLookup);
    chatBot.say(`Changing lights to ${color}! Thanks `);
    if (colorLookup) return changeLightColors({ rgb, colorName });
    return null;
  },
};

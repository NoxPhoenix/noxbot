const lightStrip = require('./magicHome');
const colorConvert = require('color-convert');
const colorNames = require('colornames');

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

const nearestColor = require('nearest-color').from(colors);

function changeLightColors ({ rgb, colorName }) {
  return lightStrip.setColorAsync(...rgb)
    .then(() => iftttTrigger(colorName));
}

module.exports = {
  lights (color) {
    console.log('changing...');
    const colorLookup = colorNames(color);
    console.log(colorLookup);
    const rgb = colorConvert.hex.rgb(colorLookup);
    const { name: colorName } = nearestColor(colorLookup);
    console.log(colorName);
    console.log(rgb);
    if (colorLookup) return changeLightColors({ rgb, colorName });
    return null;
  },
};

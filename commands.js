const lightStrip = require('./magicHome');
const colorConvert = require('color-convert');

module.exports = {
  light (color) {
    console.log('changing...');
    const formattedColor = typeof color === 'string' ? colorConvert.keyword.rgb(color) : color;
    console.log(formattedColor);
    return lightStrip.setColorAsync(...formattedColor);
  },
};

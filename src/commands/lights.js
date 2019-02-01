const lightStrip = require('../../lib/magicHome');
const colorConvert = require('color-convert');
const colorNames = require('colornames');

const { IFTTT: iftttTrigger, cache } = require('../../utils');

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
  async lights ({ chatBot, message }, color) {
    const { channel } = message;
    console.log(channel);
    const cacheExpiration = await cache.getExpiration('lights');
    if (cacheExpiration > 0) return chatBot.say(`That's too soon! Lights can be changes again in ${cacheExpiration} seconds!`, channel);
    const colorLookup = colorNames(color);
    const rgb = colorConvert.hex.rgb(colorLookup);
    const { name: colorName } = nearestColor(colorLookup);
    chatBot.say(`Changing lights to ${color}! Thanks @${message.username}`, channel);
    if (colorLookup) {
      return changeLightColors({ rgb, colorName })
        .then(() => cache.setCache('lights', colorName, 60));
    }
    return null;
  },
};

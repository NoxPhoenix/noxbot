const colorConvert = require('color-convert');

const { cache, lights } = require('../../utils');

const cssColorList = 'https://www.w3schools.com/colors/colors_names.asp';

module.exports = {
  async lights ({ chatBot, message }, color) {
    const colorName = color.toLowercase();
    const { channel } = message;
    const cacheExpiration = await cache.getExpiration('lights');
    if (cacheExpiration > 0) return chatBot.say(`That's too soon! Lights can be changes again in ${cacheExpiration} seconds!`, channel);
    const rgb = colorConvert.keyword.rgb(colorName);
    if (!rgb) return chatBot.say(`That is not a valid color, please choose one from this list! ${cssColorList}`, channel);
    chatBot.say(`Changing lights to ${colorName}! Thanks @${message.username}`, channel);
    if (rgb) {
      return lights.setColor(rgb, colorName)
        .then(() => cache.setCache('lights', colorName, 20));
    }
    return null;
  },
};

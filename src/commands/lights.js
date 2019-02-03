const colorConvert = require('color-convert');

const { cache, lights } = require('../../utils');

const cssColorList = 'https://www.w3schools.com/colors/colors_names.asp';

module.exports = {
  async lights ({ chatBot, message }, color) {
    const { channel } = message;
    const cacheExpiration = await cache.getExpiration('lights');
    if (cacheExpiration > 0) return chatBot.say(`That's too soon! Lights can be changes again in ${cacheExpiration} seconds!`, channel);
    const rgb = colorConvert.keyword.rgb(color);
    if (!rgb) return chatBot.say(`That is not a valid color, please choose one from this list! ${cssColorList}`, channel);
    chatBot.say(`Changing lights to ${color}! Thanks @${message.username}`, channel);
    if (rgb) {
      return lights.setColor(rgb, color)
        .then(() => cache.setCache('lights', color, 20));
    }
    return null;
  },
};

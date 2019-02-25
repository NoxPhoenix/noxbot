const colorConvert = require('color-convert');

const { cache, lights: roomLights } = require('../../utils');

const cssColorList = 'https://www.w3schools.com/colors/colors_names.asp';

const noColorResponse = `You forgot to choose a color! Use !lights (COLOR). For a list of available colors ${cssColorList}`;
const invalidColorResponse = `That is not a valid color, please choose one from this list! ${cssColorList}`;
const disallowedColorResponse = `That color is not allowed! Please choose another from ${cssColorList}`

const colorBlackList = [
  'black',
  'brown',
  'saddlebrown',
  'sienna'
];

module.exports = {
  async lights ({ chatBot, message }, color) {
    const { channel } = message;

    if (!color) return chatBot.say(noColorResponse, channel)
    const cacheExpiration = await cache.getExpiration('lights');
    const colorName = color.toLowerCase();

    if (colorBlackList.includes(colorName)) return chatBot.say(disallowedColorResponse, channel);
    if (cacheExpiration > 0) return chatBot.say(`That's too soon! Lights can be changes again in ${cacheExpiration} seconds!`, channel);

    const rgb = colorConvert.keyword.rgb(colorName);
    if (!rgb) return chatBot.say(invalidColorResponse, channel);
    chatBot.say(`Changing lights to ${colorName}! Thanks @${message.username}`, channel);
    if (rgb) {
      return roomLights.setColor(rgb, colorName)
        .then(() => cache.setCache('lights', colorName, 20));
    }
    return null;
  },
};

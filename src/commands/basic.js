module.exports = {
  benice ({ chatBot, message }) {
    const { channel } = message;
    return chatBot.say('Nox! That\'s not very kind!!! Apoligize and be better!', channel);
  },

  car ({ chatBot, message: { channel } }) {
    const response = 'Did you know you have to have a special license to drive a supersonic acrobatic rocket powered battle car?';
    return chatBot.say(response, channel);
  },
};

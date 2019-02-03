const { followFlash } = require('../../utils/lights');

class FollowHandler {
  constructor (chatBot) {
    this.chatBot = chatBot;
    this.chatBot.on('subscription', (subObject) => {
      const { channel, display_name: user } = subObject;
      chatBot.say(`Thanks for subscribing @${user}!`, channel);
      return followFlash();
    });
  }
}

function followHandler (chatBot) {
  return new FollowHandler(chatBot);
}

module.exports = followHandler;

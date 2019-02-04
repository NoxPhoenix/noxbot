const { followFlash } = require('../../utils/lights');

class SubscriptionHandler {
  constructor (chatBot) {
    this.chatBot = chatBot;
    this.chatBot.on('subscription', (subObject) => {
      const { channel, display_name: user } = subObject;
      chatBot.say(`Thanks for subscribing @${user}!`, channel);
      return followFlash();
    });
  }
}

function subscriptionHandler (chatBot) {
  return new SubscriptionHandler(chatBot);
}

module.exports = subscriptionHandler;

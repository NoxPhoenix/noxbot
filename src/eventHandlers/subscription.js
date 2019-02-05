const { followFlash } = require('../../utils/lights');
const alertClient = require('../../clients/streamlabsClient');

class SubscriptionHandler {
  constructor (chatBot, channel) {
    this.chatbot = chatBot;
    this.channel = channel;
    alertClient.on('subscription', (subObject) => {
      const { name: user } = subObject;
      chatBot.say(`HYPE! @${user} has subscribed! Thanks so much!`, this.channel);
      return followFlash();
    });
  }
}

function subscriptionHandler (chatBot) {
  return new SubscriptionHandler(chatBot);
}

module.exports = subscriptionHandler;

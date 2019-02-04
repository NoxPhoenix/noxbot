const { followFlash } = require('../../utils/lights');
const alertClient = require('../../clients/streamlabsClient');

class FollowHandler {
  constructor (chatBot, channel) {
    this.chatbot = chatBot;
    this.channel = channel;
    alertClient.on('follow', (follow) => {
      const { name: user } = follow;
      this.chatBot.say(`Thanks for following @${user}!`, channel);
      return followFlash();
    });
  }
}

function followHandler (chatBot) {
  return new FollowHandler(chatBot);
}

module.exports = followHandler;

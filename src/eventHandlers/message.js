const commands = require('../commands');

function commandAndArgsFromMessage (message) {
  const args = message.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  return { command, args };
}

class MessageHandler {
  constructor (chatBot) {
    this.chatBot = chatBot;
    this.chatBot.on('message', (message) => {
      if (message.message.startsWith('!')) {
        const { command, args } = commandAndArgsFromMessage(message.message);
        if (commands[command]) return commands[command]({ chatBot, message }, ...args);
      }
      return null;
    });
  }
}

function messageHandler (chatBot) {
  return new MessageHandler(chatBot);
}

module.exports = messageHandler;

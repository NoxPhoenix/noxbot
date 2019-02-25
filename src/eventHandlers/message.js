const commands = require('../commands');
const { commands: commandRepository } = require('../../repository');

function commandAndArgsFromMessage (message) {
  const args = message.trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  return { command, args };
}

class MessageHandler {
  constructor (chatBot) {
    this.chatBot = chatBot;
    this.chatBot.on('message', async (message) => {
      const { command, args } = commandAndArgsFromMessage(message.message);
      if (message.message.startsWith('!')) {
        const noxCommand = command.slice(1);
        if (commands[noxCommand]) return commands[noxCommand]({ chatBot, message }, ...args);
      }

      const customCommand = await commandRepository.getCommand(command);

      if (customCommand) return commands.runCustom({ chatBot, message }, customCommand, ...args);
      return null;
    });
  }
}

function messageHandler (chatBot) {
  return new MessageHandler(chatBot);
}

module.exports = messageHandler;

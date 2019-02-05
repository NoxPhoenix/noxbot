const commands = require('../commands');
const { commands: commandRepository } = require('../../repository');

function commandAndArgsFromMessage (message) {
  const args = message.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  return { command, args };
}

class MessageHandler {
  constructor (chatBot) {
    this.chatBot = chatBot;
    this.chatBot.on('message', async (message) => {
      if (message.message.startsWith('!')) {
        const { command, args } = commandAndArgsFromMessage(message.message);

        if (commands[command]) return commands[command]({ chatBot, message }, ...args);

        const allCustomCommands = await commandRepository.getAllCommmands();
        const customCommand = allCustomCommands.find(({ command_name: commandName }) => commandName === `!${command}`);

        if (customCommand) return commands.runCustom({ chatBot, message }, customCommand, ...args);
      }
      return null;
    });
  }
}

function messageHandler (chatBot) {
  return new MessageHandler(chatBot);
}

module.exports = messageHandler;

const { commands } = require('../../repository');

module.exports = {
  addcom ({ chatBot, message }, ...args) {
    const name = args.shift().toLowerCase();
    const response = args.join(' ');
    return commands.addCommand(name, response, message.display_name)
      .then(() => {
        const confirmation = `Command ${name} added successfully!`;
        return chatBot.say(confirmation, message.channel);
      })
      .catch(err => chatBot.say(`Error making command: ${err}`, message.channel));
  },

  delcom ({ chatBot, message }, commandName) {
    const response = `Command ${commandName} deleted successfully`;
    return commands.deleteCommand(commandName)
      .then(() => chatBot.say(response, message.channel));
  },

  runCustom ({ chatBot, message }, { command_name: commandName, response, accumulator }, ...args) {
    const count = accumulator + 1;
    const toUser = args.shift();
    const user = message.username;
    const serializedResponse = response.replace('$(count)', count).replace('$(touser)', toUser).replace('$(user)', user);
    chatBot.say(serializedResponse, message.channel);
    return commands.incrementCommandCount(commandName, accumulator);
  },
};

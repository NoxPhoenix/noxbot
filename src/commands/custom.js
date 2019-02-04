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
    return command
  }
};

const _ = require('lodash');

const { commands } = require('../../repository');

const disallowCommand = (chatBot, channel, customResponse = null) => {
  const defaultResponse = 'You must be mod to use that command!';
  const response = customResponse || defaultResponse;
  return chatBot.say(response, channel);
};

const flags = {
  cooldown: /(-cd=)\S*/gm,
};

const parseFlag = flag => _.first(flag.match((/(?<==)\S*/gm)));

const serializeOptions = (response, count, toUser, user) => {
  const cooldown = parseInt(parseFlag(_.first(response.match(flags.cooldown))));
  console.log(cooldown);
  const responseWithoutVariables = response.replace('$(count)', count).replace('$(touser)', toUser).replace('$(user)', user);
  const serializedResponse = _.values(flags).reduce((string, flag) => string.replace(flag, ''), responseWithoutVariables);
  return {
    cooldown,
    serializedResponse,
  };
};

module.exports = {
  addcom ({ chatBot, message }, ...args) {
    const disallowResponse = 'Only mods can add custom commands!';
    if (!message.mod) return disallowCommand(chatBot, message.channel, disallowResponse);
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
    const disallowResponse = 'Only mods can delete custom commands!';
    if (!message.mod) return disallowCommand(chatBot, message.channel, disallowResponse);
    const response = `Command ${commandName} deleted successfully`;
    return commands.deleteCommand(commandName)
      .then(() => chatBot.say(response, message.channel));
  },

  resetcom ({ chatBot, message }, commandName) {
    const disallowResponse = 'Only mods can reset custom commands!';
    if (!message.mod) return disallowCommand(chatBot, message.channel, disallowResponse);
    return commands.resetCount(commandName)
      .then(() => chatBot.say(`Command ${commandName} count has been reset!`, message.channel));
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


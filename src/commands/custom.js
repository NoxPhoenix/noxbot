const _ = require('lodash');

const { commands } = require('../../repository');
const { cache } = require('../../utils');

const coolDownRegex = /(-cd=\S*)/gm;

const disallowCommand = (chatBot, channel, customResponse = null) => {
  const defaultResponse = 'You must be mod to use that command!';
  const response = customResponse || defaultResponse;
  return chatBot.say(response, channel);
};

const parseCoolDown = (response) => {
  const flagMatch = _.first(response.match(coolDownRegex));
  if (flagMatch) {
    return parseInt(flagMatch.replace('-cd=', ''), 10);
  }
  return null;
};

const parseCommand = (args) => {
  const name = args.shift().toLowerCase();
  const response = args.join(' ');
  const coolDown = parseCoolDown(response);
  const parsedResponse = (coolDown) ? response.replace(coolDownRegex, '') : response;

  return {
    response: parsedResponse,
    name,
    coolDown,
  };
};

module.exports = {
  addcom ({ chatBot, message }, ...args) {
    const disallowResponse = 'Only mods can add custom commands!';
    if (!message.mod && message.username !== 'noxphoenix') return disallowCommand(chatBot, message.channel, disallowResponse);
    const { response, name, coolDown } = parseCommand(args);
    return commands.addCommand(name, response, coolDown, message.display_name)
      .then(() => {
        const confirmation = `Command ${name} added successfully!`;
        return chatBot.say(confirmation, message.channel);
      })
      .catch(err => chatBot.say(`Error making command: ${err}`, message.channel));
  },

  editcom ({ chatBot, message }, ...args) {
    const disallowResponse = 'Only mods can add custom commands!';
    if (!message.mod && message.username !== 'noxphoenix') return disallowCommand(chatBot, message.channel, disallowResponse);
    const { response, name, coolDown } = parseCommand(args);
    return commands.editCommand(name, response, coolDown, message.display_name)
      .then(() => {
        const confirmation = `Command ${name} edited successfully!`;
        return chatBot.say(confirmation, message.channel);
      })
      .catch(err => chatBot.say(`Error editing command: ${err}`, message.channel));
  },

  delcom ({ chatBot, message }, commandName) {
    const disallowResponse = 'Only mods can delete custom commands!';
    if (!message.mod && message.username !== 'noxphoenix') return disallowCommand(chatBot, message.channel, disallowResponse);
    const response = `Command ${commandName} deleted successfully`;
    return commands.deleteCommand(commandName)
      .then(() => chatBot.say(response, message.channel));
  },

  resetcom ({ chatBot, message }, commandName) {
    const disallowResponse = 'Only mods can reset custom commands!';
    if (!message.mod && message.username !== 'noxphoenix') return disallowCommand(chatBot, message.channel, disallowResponse);
    return commands.resetCount(commandName)
      .then(() => chatBot.say(`Command ${commandName} count has been reset!`, message.channel));
  },

  async runCustom ({ chatBot, message }, command, ...args) {
    const {
      accumulator,
      cool_down: coolDown,
      command_name: commandName,
      response,
    } = command;
    const cacheExpiration = (coolDown === null) ? null : await cache.getExpiration(commandName);

    if (cacheExpiration !== null && cacheExpiration > 0) return null;
    const count = accumulator + 1;
    const toUser = args.shift();
    const user = message.username;
    const serializedResponse = response.replace('$(count)', count).replace('$(touser)', toUser).replace('$(user)', user);
    chatBot.say(serializedResponse, message.channel);
    return commands.incrementCommandCount(commandName, accumulator)
      .then(() => cache.setCache(commandName, user, coolDown));
  },
};


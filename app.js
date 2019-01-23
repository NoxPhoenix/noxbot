const TwitchBot = require('twitch-bot');
const commands = require('./commands');

const { oauth } = require('./config');

const chat = new TwitchBot({
  username: 'noxphoenix_bot',
  oauth,
  channels: ['noxphoenix'],
});

chat.on('join', console.log);
chat.on('message', (message) => {
  const command = (message.message.startsWith('!')) ? message.message.split(' ') : [];
  if (command[0] === '!light') {
    return commands.light(command[1]);
  }
  return null;
});
chat.say('hi!', 'noxphoenix');

chat.on('error', console.log);


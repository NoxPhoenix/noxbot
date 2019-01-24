const TwitchBot = require('twitch-bot');

const { oauth } = require('./config');

const messageHandler = require('./lib/eventHandlers/message');

const chat = new TwitchBot({
  username: 'noxphoenix_bot',
  oauth,
  channels: ['noxphoenix'],
});

chat.on('join', (channel) => {
  console.log(`Bot has joined ${channel}`);
  messageHandler(chat);
});

chat.on('error', console.log);


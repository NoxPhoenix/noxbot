const TwitchBot = require('twitch-bot');

const { oauth } = require('./config');

const messageHandler = require('./src/eventHandlers/message');

const chatBot = new TwitchBot({
  username: 'noxphoenix_bot',
  oauth,
  channels: ['noxphoenix', 'snowmnason'],
});

chatBot.on('join', (channel) => {
  console.log(`Bot has joined ${channel}`);
  chatBot.say('Hello! I am here!', channel);
  messageHandler(chatBot);
});

chatBot.on('part', channel => console.log(`Left ${channel}`));

chatBot.on('error', console.log);


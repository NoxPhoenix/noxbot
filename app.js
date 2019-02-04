const TwitchBot = require('twitch-bot');

const { oauth } = require('./config');

const messageHandler = require('./src/eventHandlers/message');
const subHandler = require('./src/eventHandlers/subscription');
const followHandler = require('./src/eventHandlers/follow');

const chatBot = new TwitchBot({
  username: 'noxphoenix_bot',
  oauth,
  channels: ['noxphoenix'],
});

chatBot.on('join', (channel) => {
  console.log(`Bot has joined ${channel}`);
  chatBot.say('Hello! I am here!', channel);
  followHandler(chatBot, channel);
});

messageHandler(chatBot);
subHandler(chatBot);

chatBot.on('part', channel => console.log(`Left ${channel}`));

chatBot.on('error', console.log);

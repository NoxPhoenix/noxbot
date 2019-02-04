const StreamlabsSocketClient = require('streamlabs-socket-client');
const { streamlabsToken } = require('../config');

console.log(streamlabsToken);

const token = streamlabsToken;

const client = new StreamlabsSocketClient({
  token,
  emitTests: true,
});

client.connect();

module.exports = client;

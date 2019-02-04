const StreamlabsSocketClient = require('streamlabs-socket-client');
const { streamlabsToken } = require('../config');

const token = streamlabsToken;

const client = new StreamlabsSocketClient({
  token,
  emitTests: true,
});

client.connect();

module.exports = client;

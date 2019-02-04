const client = require('./clients/streamlabsClient');

client.connect();

client.on('follow', (data) => {
  console.log(data);
});


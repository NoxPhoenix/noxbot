const db = require('../lib/db');

const COMMAND_TABLE_NAME = 'command';

module.exports = {
  addCommand (name, response, creator = 'system') {
    return db.runAsync(
      `INSERT INTO ${COMMAND_TABLE_NAME}
        (command_name, response, created_by)
        VALUES ($name, $response, $creator);`,
      {
        $name: name,
        $response: response,
        $creator: creator,
      },
    )
      .tap(console.log)
      .then(() => db.getAsync(`SELECT * FROM ${COMMAND_TABLE_NAME};`))
      .tap(console.log);
  },
};


module.exports.addCommand('test123', 'res123');

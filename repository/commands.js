const db = require('../clients/db');

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
      .tap(() => db.closeAsync)
      .then(() => db.allAsync(`SELECT * FROM ${COMMAND_TABLE_NAME};`))
      .tap(console.log);
  },

  getAllCommmands () {
    return db.allAsync(`SELECT * FROM ${COMMAND_TABLE_NAME}`)
      .then(console.log);
  },

  deleteCommand (commandName) {
    return db.runAsync(`DELETE FROM ${COMMAND_TABLE_NAME} WHERE command_name = $commandName`, { $commandName: commandName });
  },
};

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
      .then(() => db.allAsync(`SELECT * FROM ${COMMAND_TABLE_NAME} WHERE command_name = $name;`, { $name: name }));
  },

  getAllCommmands () {
    return db.allAsync(`SELECT * FROM ${COMMAND_TABLE_NAME}`);
  },

  deleteCommand (commandName) {
    return db.runAsync(`DELETE FROM ${COMMAND_TABLE_NAME} WHERE command_name = $commandName`, { $commandName: commandName });
  },

  editCommand (commandName, response) {
    return db.runAsync(
      `UPDATE ${COMMAND_TABLE_NAME}
      SET response = $response WHERE command_name = $name;`,
      { $response: response, $name: commandName },
    );
  },

  incrementCommandCount (commandName, currentCount) {
    const count = currentCount + 1;
    return db.runAsync(
      `UPDATE ${COMMAND_TABLE_NAME}
      SET accumulator = $count WHERE command_name = $name;`,
      { $count: count, $name: commandName },
    );
  },

  resetCount (commandName) {
    const count = 0;
    return db.runAsync(
      `UPDATE ${COMMAND_TABLE_NAME}
      SET accumulator = $count WHERE command_name = $name;`,
      { $count: count, $name: commandName },
    );
  },
};

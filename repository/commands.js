const db = require('../clients/db');

const COMMAND_TABLE_NAME = 'command';

module.exports = {
  addCommand (name, response, coolDown, creator = 'system') {
    return db.runAsync(
      `INSERT INTO ${COMMAND_TABLE_NAME}
        (command_name, response, cool_down, created_by)
        VALUES ($name, $response, $coolDown, $creator);`,
      {
        $name: name,
        $response: response,
        $coolDown: coolDown,
        $creator: creator,
      }
    )
      .tap(() => db.closeAsync)
      .then(() => db.allAsync(`SELECT * FROM ${COMMAND_TABLE_NAME} WHERE command_name = $name;`, { $name: name }));
  },

  getAllCommmands () {
    return db.allAsync(`SELECT * FROM ${COMMAND_TABLE_NAME}`);
  },

  getCommand (name) {
    return db.getAsync(`SELECT * FROM ${COMMAND_TABLE_NAME} WHERE command_name = $name`, { $name: name });
  },

  deleteCommand (commandName) {
    return db.runAsync(`DELETE FROM ${COMMAND_TABLE_NAME} WHERE command_name = $commandName`, { $commandName: commandName });
  },

  editCommand (commandName, response, coolDown) {
    return db.runAsync(
      `UPDATE ${COMMAND_TABLE_NAME}
      SET response = $response, cool_down = $coolDown WHERE command_name = $name;`,
      { $response: response, $name: commandName, $coolDown: coolDown }
    );
  },

  incrementCommandCount (commandName, currentCount) {
    const count = currentCount + 1;
    return db.runAsync(
      `UPDATE ${COMMAND_TABLE_NAME}
      SET accumulator = $count WHERE command_name = $name;`,
      { $count: count, $name: commandName }
    );
  },

  resetCount (commandName) {
    const count = 0;
    return db.runAsync(
      `UPDATE ${COMMAND_TABLE_NAME}
      SET accumulator = $count WHERE command_name = $name;`,
      { $count: count, $name: commandName }
    );
  },
};

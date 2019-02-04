const { commands } = require('./repository');

function yeet () {
  return commands.addCommand('test', 'res', 'system')
    .then(console.log)
    .then(() => commands.getAllCommmands())
    .then(console.log)
    .then(() => commands.deleteCommand('test'))
    .then(console.log)
    .then(() => commands.getAllCommmands())
    .then(console.log);
}

yeet();

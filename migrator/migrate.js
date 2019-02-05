const sqlite = require('sqlite');

sqlite.open('./data.db')
  .then(sdb => sdb.migrate({ migrationsPath: './migrator/migrations' }))
  .catch(console.warn);

const sqlite = require('sqlite');

sqlite.open('./data')
  .then(sdb => sdb.migrate({ migrationsPath: './migrator/migrations' }));

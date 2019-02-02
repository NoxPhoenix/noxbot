-- Up
CREATE TABLE command (
  command_name TEXT PRIMARY KEY,
  response TEXT NOT NULL,  
  accumulator INTEGER DEFAULT 0 NOT NULL,
  created_by TEXT NOT NULL
);

CREATE INDEX command_created_by_index
  ON command (created_by);

-- Down
DROP INDEX command_created_by_index;
DROP TABLE command;
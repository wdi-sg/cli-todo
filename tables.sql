DROP TABLE IF EXISTS items;

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  task text,
  done boolean
);
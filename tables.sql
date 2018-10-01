CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name TEXT,
  done BOOLEAN,
  created_at DATE DEFAULT now(),
  updated_at DATE DEFAULT NULL
);

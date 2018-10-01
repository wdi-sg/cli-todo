CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name text,
  complete boolean,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
  );
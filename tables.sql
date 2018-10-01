CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name TEXT,
  complete BOOLEAN,
  created_at DATE DEFAULT now(),
  completed_at DATE

)

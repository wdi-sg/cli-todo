CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  task TEXT,
  done Boolean
);
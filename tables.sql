CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
	completed BOOLEAN,
  name text,
	created_at TIMESTAMP,
	updated_at TIMESTAMP
);

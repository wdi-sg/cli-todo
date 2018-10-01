CREATE TABLE IF NOT EXISTS todo (
	id SERIAL PRIMARY KEY,
	name TEXT,
	done BOOLEAN,
	created_at TIMESTAMP DEFAULT now(),
	updated_at DATE
);
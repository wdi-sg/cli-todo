CREATE TABLE IF NOT EXISTS items (

	id SERIAL PRIMARY KEY,
	name text,
	done boolean,
	created date,
	completed date

);
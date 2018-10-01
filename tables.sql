

CREATE TABLE IF NOT EXISTS todolist(
	  id SERIAL PRIMARY KEY,
    completed BOOLEAN,
    entry TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);


-- CREATE TABLE IF NOT EXISTS pokemon(
-- 	  id SERIAL PRIMARY KEY,
--     name TEXT
-- );


--run from Terminal: psql -d todo -U kencheng -f tables.sql
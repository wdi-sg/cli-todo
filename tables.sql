

CREATE TABLE IF NOT EXISTS todolist(
	  id SERIAL PRIMARY KEY,
    completed BOOLEAN,
    entry TEXT,
    timeadded TIMESTAMP
);


-- CREATE TABLE IF NOT EXISTS pokemon(
-- 	  id SERIAL PRIMARY KEY,
--     name TEXT
-- );


--run from terminal: psql -d todo -U kencheng -f tables.sql
CREATE TABLE IF NOT EXISTS items(
	  id SERIAL PRIMARY KEY,
	  progress TEXT,
    name TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- CREATE TABLE IF NOT EXISTS pokemon(
-- 	  id SERIAL PRIMARY KEY,
--     name TEXT
-- );





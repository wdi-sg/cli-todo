CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    name TEXT,
    done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

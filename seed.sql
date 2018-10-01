

INSERT INTO todolist (completed, entry, created_at) VALUES (false, 'Wash the car', CURRENT_TIMESTAMP);
INSERT INTO todolist (completed, entry, created_at) VALUES (false, 'Walk the dog', CURRENT_TIMESTAMP);
INSERT INTO todolist (completed, entry, created_at) VALUES (true, 'D O T A 2', CURRENT_TIMESTAMP);
INSERT INTO todolist (completed, entry, created_at) VALUES (false, 'B00gie b00gie b00gie', CURRENT_TIMESTAMP);
INSERT INTO todolist (completed, entry, created_at) VALUES (false, 'Test my code', CURRENT_TIMESTAMP);
INSERT INTO todolist (completed, entry, created_at) VALUES (true, 'Fix indents', CURRENT_TIMESTAMP);
INSERT INTO todolist (completed, entry, created_at) VALUES (false, 'Go to bed', CURRENT_TIMESTAMP);


-- run from Terminal: psql -d todo -U kencheng -f seed.sql
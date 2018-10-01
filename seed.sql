

INSERT INTO todolist (completed, entry, created_at) VALUES (false, 'Wash the car', CURRENT_TIMESTAMP);
INSERT INTO todolist (completed, entry, created_at) VALUES (false, 'Walk the dog', CURRENT_TIMESTAMP);
INSERT INTO todolist (completed, entry, created_at) VALUES (true, 'WUDddUUpp', CURRENT_TIMESTAMP);
INSERT INTO todolist (completed, entry, created_at) VALUES (true, 'Test my code', CURRENT_TIMESTAMP);
INSERT INTO todolist (completed, entry, created_at) VALUES (true, 'Fix indents', CURRENT_TIMESTAMP);
INSERT INTO todolist (completed, entry, created_at) VALUES (false, 'Go to bed', CURRENT_TIMESTAMP);


-- run from Terminal: psql -d todo -U kencheng -f seed.sql
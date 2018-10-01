

INSERT INTO todolist (completed, entry, timeadded) VALUES (false, 'Wash the car', CURRENT_TIMESTAMP);
INSERT INTO todolist (completed, entry, timeadded) VALUES (false, 'Walk the dog', CURRENT_TIMESTAMP);
INSERT INTO todolist (completed, entry, timeadded) VALUES (true, 'WUDddUUpp', CURRENT_TIMESTAMP);



-- Test file, run same way i.e. psql -d todo -U kencheng -f seed.sql
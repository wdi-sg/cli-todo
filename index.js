const pg = require('pg');

const configs = {
  user: 'lamesensei',
  host: '127.0.0.1',
  database: 'clitodo',
  port: 5432,
};

const client = new pg.Client(configs);

const displayTasks = () => {
  client.query('SELECT * FROM tasks ORDER BY id ASC', (qerr, res) => {
    if (qerr) {
      console.log(qerr.stack);
    } else {
      let i = 0;
      res.rows.forEach((element) => {
        if (element.done === true) console.log(`${(i += 1)}. [x] - ${element.name}`);
        else console.log(`${(i += 1)}. [ ] - ${element.name}`);
      });
    }
    client.end();
  });
};

// CHECK FOR SHOW QUERY
if (process.argv[2] === 'show') {
  client.connect((cerr) => {
    if (cerr) return console.error(cerr);
    // INIT SELECT QUERY TO DISPLAY ALL TASKS IN LIST
    return displayTasks();
  });
}

// CHECK FOR ADD QUERY
if (process.argv[2] === 'add' && process.argv[3] !== undefined) {
  client.connect((cerr) => {
    if (cerr) return console.error(cerr);
    const text = 'INSERT INTO tasks (name) VALUES ($1);';
    const value = [process.argv[3]];
    // INIT INSERT OF USER INPUT
    client.query(text, value, (ierr, res) => {
      if (ierr) console.log(ierr.stack);
      else displayTasks();
    });
    return null;
  });
}

// CHECK FOR MARK DONE
if (process.argv[2] === 'done' && process.argv[3] !== undefined) {
  client.connect((cerr) => {
    if (cerr) return console.error(cerr);
    const text = 'UPDATE tasks SET done = true WHERE id = ($1);';
    const value = [process.argv[3]];
    // INIT INSERT OF USER INPUT
    client.query(text, value, (ierr, res) => {
      if (ierr) console.log(ierr.stack);
      else displayTasks();
    });
    return null;
  });
}

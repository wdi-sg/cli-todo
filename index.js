const pg = require('pg');

const configs = {
  user: 'lamesensei',
  host: '127.0.0.1',
  database: 'clitodo',
  port: 5432,
};

const client = new pg.Client(configs);

// CHECK FOR SHOW QUERY
if (process.argv[2] === 'show') {
  client.connect((cerr) => {
    if (cerr) return console.error(cerr);
    // INIT SELECT QUERY TO DISPLAY ALL TASKS IN LIST
    client.query('SELECT * FROM tasks', (qerr, res) => {
      if (qerr) {
        console.log(qerr.stack);
      } else {
        res.rows.forEach((element) => {
          console.log(`${element.id}. [ ] - ${element.name}`);
        });
      }
      client.end();
    });
    return null;
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
      if (ierr) {
        console.log(ierr.stack);
      } else {
        // INIT DISPLAY OF ALL TASKS TO SHOW USER INPUT SUCCESS.
        client.query('SELECT * FROM tasks', (qerr, qres) => {
          if (qerr) {
            console.log(qerr.stack);
          } else {
            qres.rows.forEach((element) => {
              console.log(`${element.id}. [ ] - ${element.name}`);
            });
          }
          client.end();
        });
      }
    });
    return null;
  });
}

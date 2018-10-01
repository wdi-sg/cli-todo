const pg = require('pg');

const configs = {
  user: 'lamesensei',
  host: '127.0.0.1',
  database: 'clitodo',
  port: 5432,
};

const client = new pg.Client(configs);

const header = `                                 
88888888888     d8888  .d8888b.  888    d8P   .d8888b.  
    888        d88888 d88P  Y88b 888   d8P   d88P  Y88b 
    888       d88P888 Y88b.      888  d8P    Y88b.      
    888      d88P 888  "Y888b.   888d88K      "Y888b.   
    888     d88P  888     "Y88b. 8888888b        "Y88b. 
    888    d88P   888       "888 888  Y88b         "888 
    888   d8888888888 Y88b  d88P 888   Y88b  Y88b  d88P 
    888  d88P     888  "Y8888P"  888    Y88b  "Y8888P" 
`;

const displayTasks = () => {
  client.query('SELECT * FROM tasks ORDER BY id ASC', (qerr, res) => {
    if (qerr) {
      console.log(qerr.stack);
    } else {
      console.log(header);
      res.rows.forEach((element, i) => {
        if (element.done === true) console.log(`${(i += 1)}. [x] - ${element.name}`);
        else console.log(`${i + 1}. [ ] - ${element.name}`);
      });
    }
    client.end();
  });
};

// CHECK FOR SHOW QUERY
if (process.argv[2] === 'show') {
  client.connect((conErr) => {
    if (conErr) return console.error(conErr);
    // INIT SELECT QUERY TO DISPLAY ALL TASKS IN LIST
    return displayTasks();
  });
}

// CHECK FOR ADD QUERY
if (process.argv[2] === 'add' && process.argv[3] !== undefined) {
  client.connect((conErr) => {
    if (conErr) return console.error(conErr);
    const text = 'INSERT INTO tasks (name) VALUES ($1);';
    const value = [process.argv[3]];
    // INIT INSERT OF USER INPUT
    client.query(text, value, (insErr, res) => {
      if (insErr) console.log(insErr.stack);
      else displayTasks();
    });
    return null;
  });
}

// CHECK FOR MARK DONE
if (process.argv[2] === 'done' && process.argv[3] !== undefined) {
  client.connect((conErr) => {
    if (conErr) return console.error(conErr);
    let text = 'UPDATE tasks SET done = true WHERE id = ($1);';
    let value = [process.argv[3]];
    // INIT UPDATE OF USER INPUT
    client.query(text, value, (updErr, res) => {
      if (updErr) console.log(updErr.stack);
      else {
        text = 'UPDATE tasks SET updated_at = now() WHERE id = ($1)';
        value = [process.argv[3]];
        client.query(text, value, (modError, res) => {
          if (modError) console.log(modError.stack);
          displayTasks();
        });
      }
    });
    return null;
  });
}

if (process.argv[2] === 'delete' && process.argv[3] !== undefined) {
  client.connect((conErr) => {
    if (conErr) return console.error(conErr);
    const text = 'DELETE FROM tasks WHERE id = ($1);';
    const value = [process.argv[3]];
    // INIT UPDATE OF USER INPUT
    client.query(text, value, (delError, res) => {
      if (delError) console.log(delError.stack);
      else {
        displayTasks();
      }
    });
    return null;
  });
}

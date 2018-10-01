const pg = require('pg');

const configs = {
  user: 'liangxin',
  host: '127.0.0.1',
  database: 'todo',
  port: 5432
};

const client = new pg.Client(configs);

client.connect(err => {
  if (err) {
    console.log('error', err.message);
  }

  const showTasks = () => {
    const text = 'SELECT * FROM items';

    client.query(text, (err, result) => {
      if (err) {
        console.log('query error', err.message);
      } else {
        result.rows.forEach((task, index) => {
          console.log(`${index}. [ ] - ${task.name}`);
        });
      }
    });
  };

  const addTask = () => {
    const text = 'INSERT INTO items (name) VALUES ($1)';
    const values = [process.argv[3]];


    client.query(text, values, (err, result) => {
      if (err) {
        console.log('query error', err.message);
      } else {
        showTasks();
      }
    });

  }

  if (process.argv[2] === 'add') {
    if (process.argv[3]) {
      addTask();
    }
  }

  if (process.argv[2] === 'show') {
    showTasks();
  }

});

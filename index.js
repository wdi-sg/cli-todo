const pg = require('pg');

const configs = {
  user: 'liangxin',
  host: '127.0.0.1',
  database: 'todo',
  port: 5432
};

const client = new pg.Client(configs);

const showTasks = () => {
  const text = 'SELECT * FROM items';

  client.query(text, (err, result) => {
    if (err) {
      console.log('query error', err.message);
    } else {
      result.rows.forEach((task, index) => {
        if (task.done) {
          console.log(`${index + 1}. [x] - ${task.name}`);
        } else {
          console.log(`${index + 1}. [ ] - ${task.name}`);
        }
      });
    }
  });
};

const addTask = () => {
  const text = 'INSERT INTO items (name, done) VALUES ($1, $2)';
  const values = [process.argv[3], false];

  client.query(text, values, (err, result) => {
    if (err) {
      console.log('query error', err.message);
    } else {
      showTasks();
    }
  });
};

const markTask = (id) => {
  const text = `UPDATE items SET done=TRUE, updated_at=CURRENT_DATE WHERE id=${id}`;

  client.query(text, (err, result) => {
    if (err) {
      console.log('query error', err.message);
    } else {
      showTasks();
    }
  });
};

const deleteTask = (id) => {
  const text = 'DELETE FROM items WHERE id=' + id;

  client.query(text, (err, result) => {
    if (err) {
      console.log('query error', err.message);
    } else {
      showTasks();
    }
  });
};

const command = () => {
  if (process.argv[2] === 'add') {
    if (process.argv[3]) {
      addTask();
    }
  }

  if (process.argv[2] === 'show') {
    showTasks();
  }

  if (process.argv[2] === 'done') {
    if (process.argv[3]) {
      markTask(parseInt(process.argv[3]));
    }
  }

  if (process.argv[2] === 'delete') {
    if (process.argv[3]) {
      deleteTask(parseInt(process.argv[3]));
    }
  }
};

client.connect(err => {
  if (err) {
    console.log('error', err.message);
  }

  command();
});

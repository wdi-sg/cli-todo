const pg = require('pg');

const configs = {
  user: 'lamesensei',
  host: '127.0.0.1',
  database: 'clitodo',
  port: 5432,
};

const client = new pg.Client(configs);

if (process.argv[2] === 'show') {
  client.connect((cerr) => {
    if (cerr) return console.error(err);
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

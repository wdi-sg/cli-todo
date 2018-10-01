console.log("works!!", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'hakimabdul',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);

let queryDoneCallback = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      console.log("result", result.rows );
    }
};

let clientConnectionCallback = (err) => {

  if( err ){
    console.log( "error", err.message );
  }

  let text = `SELECT * FROM items`;

  const values = `${text}`;

  client.query(text,queryDoneCallback);
};

client.connect(clientConnectionCallback);
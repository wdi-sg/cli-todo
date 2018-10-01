// console.log("works!!", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'pablo101',
    host: '127.0.0.1',
    database: 'doto',
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
}

  if (process.argv[2] === "show") {
    let text;
    text = "SELECT * FROM task";
    client.query(text, queryDoneCallback);

  } else if (process.argv[2] === "add") {

      text = "INSERT INTO task (dunzo, avenue, created_at) VALUES ('hello','be','b') RETURNING id";

  const values = [false, process.argv[3]];

  client.query(text, values, queryDoneCallback);

  // } else if (process.argv[2] === "done") {
 };


client.connect(clientConnectionCallback);
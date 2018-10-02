// console.log("works!!", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'pablo101',
    host: '127.0.0.1',
    database: 'doto',
    port: 5432,
};

const client = new pg.Client(configs);

// let queryDoneCallback = (err, result) => {
//     if (err) {
//       console.log("query error", err.message);
//     } else {
//       console.log("result", result.rows );
//     }
// };

let clientConnectionCallback = (err) => {

  if( err ){
    console.log( "error", err.message );
  }
}
//show
  if (process.argv[2] === 'show') {

    let text;

    text = "SELECT * FROM tasks";

    client.query(text, queryDoneCallback);

//adding
  } else if (process.argv[2] === 'add') {

      text = "INSERT INTO tasks (dunzo, avenue) VALUES ($1, $2) RETURNING id";

  var values = [false, process.argv[3]];

  client.query(text, values, queryDoneCallback);

  // } else if (process.argv[2] === "done") {
 };

let queryDoneCallback = (err, result) => {
  if (err) {
    console.log('query error', err.message)
  } else {
      console.log('To do list')

  for (i in result.rows) {

    let tick;

    if (result.rows[i].done === true) {
      tick = 'X';
    } else {
      tick = '';
    }

    let output = `${result.rows[i].id}. [${tick}] - ${result.rows[i].task}`
         console.log(output)
   }
  }
};

client.connect(clientConnectionCallback);

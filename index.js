console.log("works!!", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'taras',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);

let queryDoneCallback = (err, result) => {
    if (err) {
      console.log("query error", err.message);
}

let queryText = 'SELECT * FROM items';


client.query(text, (err, res) => {
            if (err) {
              console.log("query error", err.message);
            } else {
                for (i in res.rows) {

                    let result = i + 1;
                    console.log(`${result}. ${res.rows[result].task}`)
                }
            }
        });
        }


let clientConnectionCallback = (err) => {

  if( err ){
    console.log( "error", err.message );
  }

  let text = "INSERT INTO todo (name) VALUES ($1) RETURNING id";

  const values = ["hello"];

  client.query(text, values, queryDoneCallback);
};

client.connect(clientConnectionCallback);

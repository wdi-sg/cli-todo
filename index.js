console.log("works!!", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'jonathanlau',
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
      for (var i in result.rows){
        let checkbox = '[]';
        let displayOut = `${checkbox} - ${result.rows[i].name}`;
        console.log("-------------------------");
        console.log(displayOut);
      }

    }
};

let clientConnectionCallback = (err) => {

  if( err ){
    console.log( "error", err.message );
  }


  if (process.argv[2] === 'show'){
    let text = 'SELECT * FROM items';
    client.query(text, queryDoneCallback);
  }
  else if (process.argv[2] === 'add'){

    let text1 = 'INSERT INTO items (name) VALUES ($1) RETURNING id';
    let values = [process.argv[3]];
    console.log(process.argv[3]);
    client.query(text1, values, queryDoneCallback);

  }

  // let text = "INSERT INTO todo (name) VALUES ($1) RETURNING id";

  // const values = ["hello"];

};

client.connect(clientConnectionCallback);

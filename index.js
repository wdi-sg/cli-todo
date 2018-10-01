console.log("works!!", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'Haruspring',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);

let queryDoneCallback = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {

        for (var i = 0; i < result.rows.length; i++){
            let toDoItems = result.rows[i];
            let myString = toDoItems.id + '[ ]' + toDoItems.name;
            console.log("===", myString);
        }

      //console.log("result", result.rows );
    }
};

let clientConnectionCallback = (err) => {

  if( err ){
    console.log( "error", err.message );
  }

  if (process.argv[2] === "show"){

    let text = "SELECT * FROM items";

    client.query(text, queryDoneCallback);

  } else if (process.argv[2] === "add" ){

  let text = "INSERT INTO items (name) VALUES ($1) RETURNING *";
//"INSERT INTO todo (name) VALUES ($1) RETURNING id";
// when added values into the item table the "*" let node return
//the value add in the for looped. which is the myString.
  const values = [process.argv[3]];

    client.query(text, values, queryDoneCallback);
    }


};

client.connect(clientConnectionCallback);

//

// console.log("works!!", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'faidhiamran',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);


let showTask = (err) => {
  if (err) {
    console.log("query error", err.message);
  }
  let queryText = "SELECT * FROM items";
  client.query(queryText, (err, res) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      for (let i = 0; i < res.rows.length; i++) {
        let done;
        if (res.rows[i].done) {
          done = "[x]";
        }
        else done = "[ ]";
        console.log(`${res.rows[i].id}. ${done} - ${res.rows[i].name}`);
      }
    }
  })
}




let addTask = (err) => {
  if (err) {
    console.log("error", err.message);
  }
  let text = "INSERT INTO items (name, done) VALUES ($1, $2)";
  const values = [process.argv[3], false];
  client.query(text, values, showTask);
};


// let clientConnectionCallback = (err) => {

let doneTask = (err) => {
  if (err){
    console.log( "error", err.message );
  }
  let text = "UPDATE items SET done = ($1) WHERE id = ($2)";
  const values = [true, process.argv[3]];
  client.query(text, values, showTask);
};

// client.connect(clientConnectionCallback);

if (process.argv[2] === "show") {
  client.connect(showTask);
}
else if (process.argv[2] === "add") {
  client.connect(addTask);
}
 else if (process.argv[2] === "done") {
  client.connect(doneTask);
}

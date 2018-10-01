const pg = require('pg');

const configs = {
    user: 'chanleyou',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);

let queryDoneCallback = (err, result) => {
    if (err) {
      console.log("Query Error: ", err.message);
    } else {

      let results = result.rows;

      for (let i in results) {
        let completion = "[ ]";
        let time = `created on ${results[i].created_at}`;

        if (results[i].complete) {
          completion = "[X]";
          time = `completed on ${results[i].completed_at}`;
        }

        console.log(`${results[i].id}. ${completion} - ${results[i].name} - ${time}`);
      }
    }
};

client.connect((err) => {
  if (err) console.log("Error: " + err);

  let showText = "SELECT * FROM items ORDER BY id ASC";

  let addText = "INSERT INTO items (name, complete) VALUES ($1, $2);";

  let doneText = `UPDATE items SET complete = true, completed_at = now() WHERE id = $1;`;

  let undoText = "UPDATE items SET complete = false, completed_at = null WHERE id = $1;";

  let deleteText = "DELETE FROM items WHERE id = $1;";

  if (process.argv[2] === "show") {
    client.query(showText, queryDoneCallback);
  } else if (process.argv[2] === "add") {
    client.query(addText, [process.argv[3], false], queryDoneCallback);
  } else if (process.argv[2] === "done") {
    client.query(doneText, [process.argv[3]], queryDoneCallback);
  } else if (process.argv[2] === "undo") {
    client.query(undoText, [process.argv[3]], queryDoneCallback);
  } else if (process.argv[2] === "delete") {
    client.query(deleteText, [process.argv[3]], queryDoneCallback);
  }
})

const pg = require("pg");
const moment = require("moment");

console.log("works!!", process.argv[2]);

const configs = {
  user: "mervyn",
  host: "127.0.0.1",
  database: "todo",
  port: 5432
};

const client = new pg.Client(configs);
let queryDoneCallback = (err, result) => {
  if (err) {
    console.log("query error", err.message);
  } else {
    for (i in result.rows) {
      if (result.rows[i].completed === true) {
        var markDone = "X";
        var updateTime = `Updated At : ${result.rows[i].updated_at}`;
      } else {
        var markDone = " ";
        var updateTime = "";
      }
      const resultString = `${result.rows[i].id}. [${markDone}] - ${
        result.rows[i].name
      } Created at ${moment(result.rows[i].created_at).format(
        "DD/MM h:mm a"
      )} ${updateTime}`;
      console.log(resultString);
    }
  }
};

let clientConnectionCallback = err => {
  if (err) {
    console.log("error", err.message);
} else if (process.argv[2] === "add") {
    let text = "INSERT INTO items (completed, name, created_at) VALUES ($1, $2, $3) RETURNING *";
    let values = [false, process.argv[3], new Date()]
    client.query(text, values, queryDoneCallback);
} else if (process.argv[2] === "done") {
    let text = `UPDATE items SET completed=true, updated_at=CURRENT_TIMESTAMP WHERE id=${
      process.argv[3]
    }`;
    client.query(text, queryDoneCallback);
  } else if (process.argv[2] === "show") {
    let text = "SELECT * FROM items";
    client.query(text, queryDoneCallback);
} else if (process.argv[2] === "delete") {
    let text = `DELETE from items WHERE id=${process.argv[3]}`;
    client.query(text, queryDoneCallback);
  }
};

client.connect(clientConnectionCallback);

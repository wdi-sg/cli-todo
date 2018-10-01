const pg = require('pg');

const configs = {
    user: 'admin',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);

//1. showing list of items on to-do list
if (process.argv[2] == 'show') {
    client.connect((err) => {

        let text = 'SELECT * FROM items';

        client.query(text, (err, res) => {
            if (err) {
              console.log("query error", err.message);
            } else {
                for (i in res.rows) {
                    // iterate through all of your results + CLEAN UP
                    let x = parseInt(i) + 1;
                    console.log(`${x}. ${res.rows[i].task}`)
                }
            }
        });
        }
)};

//NOTE: $1 and $2 takes reference to values array
//2. adding items to the to-do list
if (process.argv[2] === 'add') {

    client.connect((err) => {

        let queryText = 'INSERT INTO items (task, done) VALUES ($1, $2) RETURNING id';
        const values = [process.argv[3], false];

        client.query(queryText, values, (err, res) => {
            if (err) {
              console.log("query error", err.message);
            } else {
              let text = 'SELECT * FROM items';
                client.query(text, (err, res) => {
                    if (err) {
                      console.log("query error", err.message);
                    } else {
                        for (i in res.rows) {
                            let x = parseInt(i) + 1;
                            console.log(`${x}. ${res.rows[i].task}`)
                        }
                    }
                });
            }
        });
    }
)}


//3. allowing for mark done
if (process.argv[2] === 'done') {

    client.connect((err) => {
        //FIND OUT what is this id=$1?
        let queryText = 'UPDATE items SET done = true WHERE id=($1);';
        let values = [process.argv[3]];

        client.query(queryText, values, (err, res) => {
            if (err) {
              console.log("query error", err.message);
            } else {
              let text = 'SELECT * FROM items';
                client.query(text, (err, res) => {
                    if (err) {
                      console.log("query error", err.message);
                    } else {
                        for (i in res.rows) {
                            if (res.rows[i].done == false) {
                                var taskStatus = "[ ]";
                                } else if (res.rows[i].done == true) {
                                var taskStatus = "[X]";
                                }
                            let x = parseInt(i) + 1;
                            console.log(`${x}. ${taskStatus} ${res.rows[i].task}`)
                        }
                    }
                });
            }
        });
    }
)}

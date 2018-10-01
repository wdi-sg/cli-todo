console.log("works!!", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'mac',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);

var string
var done= ''
var title ='\r\n\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557     \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557     \u2588\u2588\u2557     \u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\r\n\u255A\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557    \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557    \u2588\u2588\u2551     \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255D\r\n   \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551    \u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551    \u2588\u2588\u2551     \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557   \u2588\u2588\u2551   \r\n   \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551    \u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551    \u2588\u2588\u2551     \u2588\u2588\u2551\u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551   \u2588\u2588\u2551   \r\n   \u2588\u2588\u2551   \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D    \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D    \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551   \u2588\u2588\u2551   \r\n   \u255A\u2550\u255D    \u255A\u2550\u2550\u2550\u2550\u2550\u255D     \u255A\u2550\u2550\u2550\u2550\u2550\u255D  \u255A\u2550\u2550\u2550\u2550\u2550\u255D     \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D   \u255A\u2550\u255D   \r\n                                                                       \r\n'


let queryDoneCallback = (err, result) => {
    if (err) {
        console.log("query error", err.message);
    } else {
        //console.log("result", result.rows)

                console.log(title);

        for (let i =0; i<result.rows.length; i++){
            if (result.rows[i].complete === true){
                done = 'X'
                string = result.rows[i].id + ". " + "["+ done + "]" + " - " + result.rows[i].name + ' completed on ' + result.rows[i].updated_at
                console.log( string );
            }else{
                done = ' '
                string = result.rows[i].id + ". " + "["+ done + "]" + " - " + result.rows[i].name + ' created on ' + result.rows[i].created_at
                console.log( string );
            }
        }
    }

};

let clientConnectionCallback = (err) => {

    if (err) {
        console.log("error", err.message);
    }

    let queryText = 'SELECT * FROM items ORDER BY id ASC';

    if (process.argv[2] === 'show'){

        client.query(queryText, queryDoneCallback);
    }

    if (process.argv[2] === 'add') {
        let text = "INSERT INTO items (name, created_at) VALUES ($1, CURRENT_TIMESTAMP) RETURNING *";
        const values = [process.argv[3]]; // if 'add', store value

        client.query(text, values, queryDoneCallback);
        client.query(queryText, queryDoneCallback);
    }


    if (process.argv[2] === 'done') {
        let doneText = "UPDATE items SET complete=true, updated_at=CURRENT_TIMESTAMP WHERE id =" + process.argv[3];

        client.query(doneText, queryDoneCallback);
        client.query(queryText, queryDoneCallback);
    }

    if (process.argv[2] ==='delete'){
        let doneText = "DELETE FROM items WHERE id =" + process.argv[3];

        client.query(doneText, queryDoneCallback);
        client.query(queryText, queryDoneCallback);
    }

};

client.connect(clientConnectionCallback);
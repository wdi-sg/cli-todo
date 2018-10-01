
// console.log("process.argv[2]: ", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'kencheng',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);



let clientConnectionCallback = (err) => {

    if (err) {console.log( "error", err.message );}

    let text;

    if (process.argv[2] === "show") {

        text = "SELECT * FROM todolist";

        client.query(text, queryDoneCallback);

    }

    else if (process.argv[2] === "add") {

        text = "INSERT INTO todolist (completed, entry, timeadded) VALUES ($1, $2, $3) RETURNING *";

        let values = [false, process.argv[3], new Date()];

        client.query(text, values, queryDoneCallback);

    }

    else if (process.argv[2] === "done") {

        text = `UPDATE todolist SET completed=true WHERE id=${process.argv[3]}`;

        client.query(text, queryDoneCallback);

    };
};



let queryDoneCallback = (err, result) => {

    if (err) {console.log("query error", err.message);}

    else {

        console.log("result.rows: ", result.rows);

        console.log("To-Do List:");

        for (i in result.rows) {

            let checkBox;

            if (result.rows[i].completed === true ) {checkBox = 'X';}

            else {checkBox = ' ';};

            let output = `${result.rows[i].id}. [${checkBox}] - ${result.rows[i].entry}`

            console.log(output)

        };

      // console.log("result", result.rows );
    };
};



client.connect(clientConnectionCallback);









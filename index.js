

const moment = require('moment');
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

        text = "INSERT INTO todolist (completed, entry, created_at) VALUES ($1, $2, $3) RETURNING *";

        let values = [false, process.argv[3], new Date()];

        client.query(text, values, queryDoneCallback);

    }

    else if (process.argv[2] === "done") {

        text = `UPDATE todolist SET completed=true, updated_at=CURRENT_TIMESTAMP WHERE id=${process.argv[3]}`;

        client.query(text, queryDoneCallback);

    }

    else if (process.argv[2] === "delete") {

        text = `DELETE from todolist WHERE id=${process.argv[3]}`;

        client.query(text, queryDoneCallback);

    };
};



let queryDoneCallback = (err, result) => {

    if (err) {console.log("query error", err.message);}

    else {

        // console.log("result.rows: ", result.rows);

        console.log("To-Do List:");

        for (i in result.rows) {

            let checkBox;
            let updatedAtOutput;

            if (result.rows[i].completed === true ) {

                checkBox = 'X';
                updatedAtOutput = ` ----- Completed: ${moment(result.rows[i].updated_at).format('Do MMM h:mm:ss a')}`;

            }

            else {checkBox = ' ';};

            let output = `${result.rows[i].id}. [${checkBox}] ${result.rows[i].entry} ----- `+
            `Added: ${moment(result.rows[i].created_at).format('Do MMM h:mm:ss a')}`;

            output += updatedAtOutput;

            console.log(output);

        };
    };
};



client.connect(clientConnectionCallback);









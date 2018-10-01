console.log("works!!", process.argv[2]);

var d = new Date();

const pg = require('pg');

const configs = {
    user: 'chrisssy',
    host: '127.0.0.1',
    database: 'tododb',
    port: 5432,
};

const client = new pg.Client(configs);

// let queryDoneCallback = (err, res) => {
//     // if (err) {
//     //   console.log("query error", err.message);
//     // } else {
//     //   console.log("result", res.rows );
//     // }
// };

// Function to display the list in a more readable form on the console
var showList = function() {
    let text = "SELECT * FROM items ORDER BY id ASC";

    client.query(text, (err, res) => {
        console.log(res.rows[0].date)
        var toDoList = "";
        for ( i = 0; i < res.rows.length; i++ ) {
            let tasks = res.rows[i].id + ". " + res.rows[i].progress + " - " + res.rows[i].name + '\n';
            toDoList = toDoList + tasks;
        };
        console.log("To Do List:\n" + toDoList);
    });
};

var addToList = function() {
    // Inserting new task to the list
    let text = "INSERT INTO items (progress, name) VALUES($1, $2) RETURNING *";

    const values = ["[ ]", process.argv[3]];

    client.query(text, values);
};

var markAsDone = function(taskNum) {
    let text = "UPDATE items SET progress = '[x]' where id =" + taskNum;

    client.query(text);
};

var deleteTask = function(taskNum) {
    let text = "DELETE from items WHERE id =" + taskNum;

    client.query(text);
};

let clientConnectionCallback = (err) => {

    if( err ){
    console.log( "error", err.message );
    }

    // If user asks for show, call upon showList function
    if ( process.argv[2] == 'show' ) {
        showList();
    };

    if ( process.argv[2] == 'add' ) {
        // Inserting new items into the To Do List
        addToList();

        // Showing the list after the addition of the new item
        showList();
    };

    if ( process.argv[2] == 'done' && process.argv[3] == undefined ) {
        console.log("Which task have you finished?");
    };

    if ( process.argv[2] == 'done' && process.argv[3] != undefined ) {
        let taskNum = parseInt(process.argv[3]);

        // Marking the task numbered as done
        markAsDone(taskNum);

        showList();
    };

    if ( process.argv[2] == 'delete' && process.argv[3] == undefined ) {
        console.log("Which task would you like to delete?");
    };

    if ( process.argv[2] == 'delete' && process.argv[3] != undefined ) {
        let taskNum = parseInt(process.argv[3]);
        deleteTask(taskNum);
        showList();
    };
};

client.connect(clientConnectionCallback);

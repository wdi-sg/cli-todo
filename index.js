console.log("works!!", process.argv[2]);

/* STANDARD BOILERPLATE =====================
===========================================*/

const pg = require('pg');

const configs = {
    user: 'saufi',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);

/*===========================================
===========================================*/

let extra = `
 _________  ________                 ________  ________          ___       ___  ________  _________
|\___   ___\\   __  \               |\   ___ \|\   __  \        |\  \     |\  \|\   ____\|\___   ___\
\|___ \  \_\ \  \|\  \  ____________\ \  \_|\ \ \  \|\  \       \ \  \    \ \  \ \  \___|\|___ \  \_|
     \ \  \ \ \  \\\  \|\____________\ \  \ \\ \ \  \\\  \       \ \  \    \ \  \ \_____  \   \ \  \
      \ \  \ \ \  \\\  \|____________|\ \  \_\\ \ \  \\\  \       \ \  \____\ \  \|____|\  \   \ \  \
       \ \__\ \ \_______\              \ \_______\ \_______\       \ \_______\ \__\____\_\  \   \ \__\
        \|__|  \|_______|               \|_______|\|_______|        \|_______|\|__|\_________\   \|__|
                                                                                  \|_________|


`;

/*ADD========================================
===========================================*/

let queryDoneCallbackAdd = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      console.log("result", result.rows[0]);
    }
};

let clientConnectionCallbackAdd = (err) => {

  if( err ){
    console.log( "error", err.message );
  }

  let date = new Date();

  let text = "INSERT INTO items (name,done,created) VALUES ($1, $2, $3) RETURNING id,name, created";

  const values = [process.argv[3], false, date];

  client.query(text, values, queryDoneCallbackAdd);
};

/*SHOW==========================================
==============================================*/

let queryDoneCallbackShow = (err, result) => {

    if (err) {
        console.log("query error", err.message);
    } else {

        for (let i = 0; i < result.rows.length; i++) {

            let date = result.rows[i].created;
            let createDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

            if (result.rows[i].done === false) {

                console.log(result.rows[i].id + ". [ ] - " + result.rows[i].name + " created on: " + createDate);

            } else {

                let date = result.rows[i].completed;
                let updateDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

                console.log(result.rows[i].id + ". [x] - " + result.rows[i].name + " created on: " + createDate +  " done on: " + updateDate);

            }
        }

    }
};

let clientConnectionCallbackShow = (err) => {

    if (err) {
        console.log("error", err.message);
    }

    let text = "SELECT * FROM items"

    client.query(text, queryDoneCallbackShow);
};

/*UPDATE=====================================
===========================================*/

let queryDoneCallbackUpdate = (err, result) => {

    if (err) {

        console.log("query error", err.message);
    } else {
        console.log("result", result.rows[0]);
    }
};

let clientConnectionCallbackUpdate = (err) => {

    if (err) {
        console.log("error", err.message);
    }

    let date = new Date();

    let text = "UPDATE items SET done = 'true',completed = ($2) WHERE id = ($1) RETURNING id, done, completed";

    let values = [process.argv[3], date];

    client.query(text, values, queryDoneCallbackUpdate);
};

/*DELETE=====================================
===========================================*/

let queryDoneCallbackDelete = (err, result) => {

    if (err) {

        console.log("query error", err.message);
    } else {

        console.log(result.rows[0]);
    }
};

let clientConnectionCallbackDelete = (err) => {

    if (err) {

        console.log(err);
    }

    let text = "DELETE FROM items WHERE id = ($1) RETURNING id";

    let values = [process.argv[3]];

    client.query(text, values, queryDoneCallbackDelete);
}

/*ALL FUNCTION CALLS=========================
===========================================*/

if (process.argv[2] === "show") {

    client.connect(clientConnectionCallbackShow);

} else if (process.argv[2] === "done") {

    client.connect(clientConnectionCallbackUpdate);

} else if (process.argv[2] === "delete") {

    client.connect(clientConnectionCallbackDelete);

} else if (process.argv[2] === "add") {

    client.connect(clientConnectionCallbackAdd);

} else {

    console.log("the action " + process.argv[2] + " is not found");
}









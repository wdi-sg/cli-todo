// console.log("works!!", process.argv[2]);
const pg = require('pg');

const configs = {
    user: 'audreykow',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);

function dateNow () {
            var d = new Date(); // for now
             var theDate = d.getDate() +'/'+ d.getMonth() +'/'+ (d.getYear()+1900);
             return theDate;
        };


let clientConnectionCallback = (err) => {


  if( err ){
    console.log( "error", err.message );
  };


    if (process.argv[2] === "show") {

        let text;

            text = "SELECT * FROM todoitems";

             client.query(text, queryDoneCallback);

    } else if (process.argv[2] === "add") {

        let date = new Date().toDateString();

        text = "INSERT INTO todoitems (completed, entry, created_at) VALUES ($1, $2, $3) RETURNING id";

        const values = [false, process.argv[3], date];

        client.query(text, values, queryDoneCallback);

    } else if (process.argv[2] === "done") {

        let date = new Date().toDateString();

        text = `UPDATE todoitems SET updated_at=${date}, completed=true WHERE id=${process.argv[3]}`;


        client.query(text, queryDoneCallback);

    } else if (process.argv[2] === "delete") {

        text = `DELETE from todoitems WHERE id=${process.argv[3]}`;

        client.query(text, queryDoneCallback);

    }
};

let queryDoneCallback = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {

      // iterate through all of your results:
      for( let i=0; i<result.rows.length; i++ ){

        if(result.rows[i].completed === true) {
            console.log(`${i+1}) [X] - ID${result.rows[i].id}: ${result.rows[i].entry} added at ${result.rows[i].created_at}. Done at: ${result.rows[i].updated_at}`);
        } else if (result.rows[i].completed === false) {
            console.log(`${i+1}) [ ] - ID${result.rows[i].id}: ${result.rows[i].entry} added at ${result.rows[i].created_at}`);
        } else {
            console.log(`${i+1}) [ ] - ID${result.rows[i].id}: ${result.rows[i].entry} added at ${result.rows[i].created_at}`);
        }
    };
    }
};

client.connect(clientConnectionCallback);

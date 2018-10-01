console.log("works!!", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'hakimabdul',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432
};

const client = new pg.Client(configs);

let clientConnectionCallback = (err) => {


  if( err ){
    console.log( "error", err.message );
  }

  let text;
//show
  if(process.argv[2] === 'show'){
    
    text = "SELECT * FROM items;"

    client.query(text,queryDoneCallback);
  }
//add
  else if(process.argv[2] === 'add'){

    text = "INSERT INTO items (done,task) VALUES ($1,$2) RETURNING id";

    var values = [false,process.argv[3]];

    client.query(text,values,queryDoneCallback);
  }
}



let queryDoneCallback = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      
      console.log('To do list');

      for(i in result.rows){

        let tick;

        if(result.rows[i].done === true ){
          tick = 'X';
        }
        else{
          tick = ' ';
        }

        let output = `${result.rows[i].id}. [${tick}] - ${result.rows[i].task}`
        console.log(output)
      }
    }
};


client.connect(clientConnectionCallback);

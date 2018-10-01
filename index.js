//console.log("works!!", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'wangwh',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);

let queryAddCallback = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      console.log(result.rows[0].name+" has been added" );
    }
};

let clientAddCallback = (err) => {
  if( err ){
    console.log( "error", err.message );
  }

  let text = "INSERT INTO todo (name, done) VALUES ($1, false) RETURNING *";

  const values = [process.argv[3]];

  client.query(text, values, queryAddCallback);
};

let queryShowCallback = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      for (let i=0;i<result.rows.length;i++){
        var j=i+1;
        if(result.rows[i].done){

          // var today = new Date();
          // var dd = today.getDate();
          // var mm = today.getMonth()+1; //january is 0
          // var yyyy = today.getFullYear();
          // if (dd<10){
          //   dd= '0'+dd;
          // }
          // if (mm<10){
          //   mm= '0'+mm;
          // }
          // today = dd+'/'+mm+'/'+yyyy;
          // result.rows[i].updated_at = today; //field not recorded in SQL => should i call clientEditCallback instead?

          console.log(j+'. [x] - '+result.rows[i].name+', created at: '+result.rows[i].created_at+', updated at: '+result.rows[i].updated_at);
        } else {
          console.log(j+'. [ ] - '+result.rows[i].name+', created at: '+result.rows[i].created_at);
        };
      }
    }
};

let clientShowCallback = (err) => {
  if( err ){
    console.log( "error", err.message );
  }

  let text = "SELECT * FROM todo";

  client.query(text, queryShowCallback);
};

let queryDeleteCallback = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      console.log("Item has been deleted" );
    }
};

let clientDeleteCallback = (err) => {
  if( err ){
    console.log( "error", err.message );
  }
  let text = "DELETE FROM todo WHERE name=$1";

  const values = [process.argv[3]];

  client.query(text, values, queryDeleteCallback);
};

let queryEditCallback = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      console.log("Item has been edited");
    }
};

let clientEditCallback = (err) => {
  if( err ){
    console.log( "error", err.message );
  }
  let text = "UPDATE todo SET name=$2 WHERE name=$1";

  const values = [process.argv[3], process.argv[4]];

  client.query(text, values, queryEditCallback);
};

let queryDoneCallback = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      console.log("Item has been marked completed");
    }
};

let clientDoneCallback = (err) => {
  if( err ){
    console.log( "error", err.message );
  }
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //january is 0
  var yyyy = today.getFullYear();
  if (dd<10){
    dd= '0'+dd;
  }
  if (mm<10){
    mm= '0'+mm;
  }
  today = dd+'/'+mm+'/'+yyyy; 

  let text = "UPDATE todo SET done=true, updated_at=$2 WHERE name=$1";

  const values = [process.argv[3],today]; //cannot pass today into the text straight and need to use this method

  client.query(text, values, queryDoneCallback);
};

// conditionals to display results
if (process.argv[2] == 'add') {
  client.connect(clientAddCallback);
}
else if(process.argv[2] == 'show') {
  client.connect(clientShowCallback);
}
else if (process.argv[2]=='delete') {
  client.connect(clientDeleteCallback); 
}
else if (process.argv[2]=='edit') {
  client.connect(clientEditCallback); 
}
else if (process.argv[2]=='done') {
  client.connect(clientDoneCallback); 
}
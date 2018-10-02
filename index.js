console.log("This works!!", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'xnithunx',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);

let queryDoneCallback = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {

        console.log(result.rows[0].name+" has been added" );

        // General code to show results
        // console.log("result", result.rows );
    }
};



// let clientConnectionCallback = (err) => {

//   if( err ){
//     console.log( "error", err.message );
//   }

//   let text = "INSERT INTO todo (name) VALUES ($1) RETURNING id";

//   const values = ["hello"];

//   client.query(text, values, queryDoneCallback);
// };


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
           console.log(j+'. [x] - '+result.rows[i].name);
         } else {
           console.log(j+'. [ ] - '+result.rows[i].name);
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
   let text = "UPDATE todo SET done=true WHERE name=$1";


   const values = [process.argv[3]];

   client.query(text, values, queryDoneCallback);
 };


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



client.connect(clientConnectionCallback);

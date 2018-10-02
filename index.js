console.log("works!!", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'dsen',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);

let listTable = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {

    result.rows.forEach((element)=>{
        console.log("Id:", element.id, " name: ", element.name)
    })


    }
};

let executeListTable = ()=>{

    let text = 'SELECT * FROM items';

    client.query(text, listTable);
}



let addItems = (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {

    console.log(result.rows)
    executeListTable()

    }
};

let clientConnectionCallback = (err) => {

  if( err ){
    console.log( "error", err.message );
  }

  if(process.argv[2] === 'show'){

    executeListTable();
  }

  if (process.argv[2] === 'add'){

    let text = 'INSERT INTO items (name) VALUES ($1) RETURNING id';
    let newItem = process.argv[3]
    const values = [newItem];
    console.log("what is values: ", values)

    client.query(text, values, addItems);

  }


};






client.connect(clientConnectionCallback);

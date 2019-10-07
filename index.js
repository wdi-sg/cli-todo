



let add = process.argv[2];
let val = process.argv[3];
const jsonfile = require('jsonfile');
const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

      console.log( err );

  if( err !== null ){
    console.log("Error");

    return;
  }

  console.log("toDoItems");



  console.log(obj);
  obj["toDoItems"].push (val);

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
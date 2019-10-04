console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  //confirm current array
  console.log(obj);

  //if commandType is 'add'
  let todo = "";
  if (commandType === 'add') {
    for ( let i=3; i<process.argv.length; i++ ) {
        todo += process.argv[i] + " ";
    }
    console.log(todo);
    obj["todoItems"].push(todo);
  }


  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  let todo = "";

  if (commandType === 'add') {
    for ( let i=3; i<process.argv.length; i++ ) {
        todo += process.argv[i] + " ";
    }
    console.log(todo);
    obj["todoItems"].push(todo);
    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
    });
    console.log(obj);

  } else if (commandType === "show") {
        for ( let j=0; j<obj["todoItems"].length; j++ ) {
            console.log(`${j+1}. [ ] - ${obj["todoItems"][j]}`)
        }
  }

});
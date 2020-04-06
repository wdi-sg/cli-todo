console.log("NODEEEEE");

var commandType = process.argv[2];
var commandItem = process.argv[3];
var selectedInput = process.argv[4];

console.log("Your command was: " + commandType);

const jsonfile = require('jsonfile');

const file = 'data.json';

jsonfile.readFile(file, (err, obj) => {

  if (process.argv[2] === "add") {
    var newInputNumber = obj["toDoList"].length + 1;
    var newInput = newInputNumber + ". [ ] - " + commandItem;
    obj["toDoList"].push(newInput);
  } else if (process.argv[2] === "show") {
    for (let i = 0; i < obj["toDoList"].length; i++) {
      console.log(obj["toDoList"][i]);
    }
    console.log(obj);
    // } else if (process.argv[2] === "done") {
    //   var completedTask = selectedInput - 1;

    // }
    jsonfile.writeFile(file, obj, (err) => { console.log(err); })
  })

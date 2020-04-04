let commandType = process.argv[2];
console.log("Your command was: "+commandType);
const jsonfile = require('jsonfile');
const file = 'data.json'

if(process.argv[2] === "add"){
  let combinedArgument = "";
  for(let i = 3; i < process.argv.length; i++){
    combinedArgument = combinedArgument + " " + process.argv[i];
  }
  jsonfile.readFile(file, (err, obj) => {
    let line = String(obj["toDoItems"].length + 1) + ". [ ] - " + combinedArgument;
    obj["toDoItems"].push(line);

    jsonfile.writeFile(file, obj, (err) => {
      console.log("Error detected: " + err);
    });
  });
}

if(process.argv[2] === "show"){
  jsonfile.readFile(file, (err, obj) => {
    for(let i = 0; i < obj["toDoItems"].length; i++){
      console.log(obj["toDoItems"][i]);
    }
  });
}
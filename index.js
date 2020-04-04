let commandType = process.argv[2];
console.log("Your command was: "+commandType);
const jsonfile = require('jsonfile');
const file = 'data.json'

if(process.argv[2] === "add"){
  let task = "";
  let date = Date();
  for(let i = 3; i < process.argv.length; i++){
    task = task + " " + process.argv[i];
  }
  let addObject = {
    "task": task,
    "isDone": "[ ]",
    "created_at": date.toString()
  }

  jsonfile.readFile(file, (err, obj) => {
    obj["toDoItems"].push(addObject);

    jsonfile.writeFile(file, obj, (err) => {
      console.log("Error detected: " + err);
    });
  });
}

if(process.argv[2] === "show"){
  jsonfile.readFile(file, (err, obj) => {
    for(let i = 0; i < obj["toDoItems"].length; i++){
      let line = (i + 1) + ". " + obj["toDoItems"][i].isDone + " -" + obj["toDoItems"][i].task + ", Created at: " + obj["toDoItems"][i].created_at;
      console.log(line);
    }
  });
}

if(process.argv[2] === "done"){
  jsonfile.readFile(file, (err, obj) => {
    obj["toDoItems"][process.argv[3] - 1].isDone = "[x]";

    jsonfile.writeFile(file, obj, (err) => {
      console.log("Error detected: " + err);
    });
  });
}
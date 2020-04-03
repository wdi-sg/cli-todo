const jsonfile = require('jsonfile');
const file = 'data.json'

const processArgv = process.argv;



jsonfile.readFile(file, (err, obj) => {

const todoList = obj["todoItems"];
console.log(todoList);
let sqBrackets = "[ ]";
let dot = ". ";
let dash = " - ";

let num = todoList.length + 1;

        if (process.argv[2] === 'add') {

                todoList.push(num + dot + sqBrackets + dash + process.argv[3]);
        } else if (processArgv[2] === 'done') {
            todoList[processArgv[3] - 1] = todoList[processArgv[3] - 1].replace("[ ]", "[X]");
        }

    console.log(obj);



  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
let commandType = process.argv[2];
let toDoItem = process.argv[3];
let parsedItem = parseInt(toDoItem);

console.log("Your command was: " + commandType);
// Global Variables
const jsonfile = require("jsonfile");
const file = "data.json";
let checkBox = "[]";

// Functions for adding removing, checking

let addInput = obj => {
  let toDoList = obj["toDoItems"];

  toDoList.push(toDoItem);

  for (let i = 0; i < toDoList.length; i++) {
    if (i === toDoList.length - 1) {
      toDoList[i] = i + 1 + ". " + checkBox + " - " + toDoItem;
    }
  }
  return toDoList;
};

let removeItem = obj => {
  let toDoList = obj["toDoItems"];

  for (let i = 0; i < toDoList.length; i++) {
    if (parsedItem === i) {
      toDoList.splice(i - 1, 1);
    } else if(parsedItem === toDoList.length){
      toDoList.pop()
    }
  }
  return toDoList;
};

// Check the box if the command is done, 
let checkItem = obj => {
  let toDoList = obj["toDoItems"];

  for (let i = 0; i < toDoList.length; i++) {
    if (parsedItem === i) {
      console.log(toDoList.length)
      toDoList[i - 1] = toDoList[i - 1].replace('[]', '[X]');
    } else {
      toDoList[toDoList.length - 1] = toDoList[toDoList.length - 1].replace('[]', '[X]');
    }
  
  }
  return toDoList;
};

// Read and Write Function

jsonfile.readFile(file, (err, obj) => {
  if (commandType === "add") {
    addInput(obj);
  } else if (commandType === "show") {
    console.log(obj);
  } else if (commandType === "remove") {
    removeItem(obj);
  } else if (commandType === "done") {
    checkItem(obj);
  }

  jsonfile.writeFile(file, obj, err => {
    console.log(err);
  });
});

// console.log( process.argv);

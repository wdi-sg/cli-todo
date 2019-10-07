let commandType = process.argv[2];
let toDoItem = process.argv[3];
let parsedItem = parseInt(toDoItem);

console.log("Your command was: " + commandType);

// Global Variables
const jsonfile = require("jsonfile");
const dateFormat = require("dateFormat");
let now = new Date();
const file = "data.json";
let checkBox = "[]";

// Functions for adding removing, checking

// Add a Todo Item
let addInput = obj => {
  let toDoList = obj["toDoItems"];

  toDoList.push(toDoItem);

  for (let i = 0; i < toDoList.length; i++) {
    if (i === toDoList.length - 1) {
      toDoList[i] =
        i +
        1 +
        ". " +
        checkBox +
        " - " +
        toDoItem +
        " |||| Created On:  " +
        dateFormat(now, "dd/mmm/yyyy, h:MM TT");
    }
  }
  return toDoList;
};

// Permenantly removes an item
let removeItem = obj => {
  let toDoList = obj["toDoItems"];

  for (let i = 0; i < toDoList.length; i++) {
    if (parsedItem === i) {
      toDoList.splice(i - 1, 1);
    } else if (parsedItem === toDoList.length) {
      toDoList.pop();
    }
  }
  return toDoList;
};

// Check the box if the command is done,
let checkItem = obj => {
  let toDoList = obj["toDoItems"];

  for (let i = 0; i < toDoList.length; i++) {
    if (parsedItem === i) {
      console.log(toDoList.length);
      toDoList[i - 1] = toDoList[i - 1].replace("[]", "[X]");
      toDoList[i - 1] = toDoList[i - 1].replace("Created", "Finished");
    } else if (parsedItem === toDoList.length) {
      toDoList[toDoList.length - 1] = toDoList[toDoList.length - 1].replace(
        "Created",
        "Finished"
      );
      toDoList[toDoList.length - 1] = toDoList[toDoList.length - 1].replace(
        "[]",
        "[X]"
      );
    }
  }
  return toDoList;
};
// Clear the entire list
let clearList = obj => {
  let toDoList = obj["toDoItems"];
  toDoList.length = 0;

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
  } else if (commandType === "clear") {
    clearList(obj);
  } else {
    console.log(
      `\n Hello! Please enter a todo list \n The Commands Are \n\n 1.) Add \n 2.) done \n 3.) remove \n 4.) show \n 5.) clear \n`
    );
  }

  jsonfile.writeFile(file, obj, err => {
    console.log(err);
  });
});



let commandType = process.argv[2];
let toDoItem = process.argv[3];
let parsedItem = parseInt(toDoItem)



console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'


let addInput = (obj) => {
  let toDoList = obj["toDoItems"];
  let checkBox = "[]";

  
  toDoList.push(toDoItem)

  for(let i = 0; i<toDoList.length; i++) {
    if(i === toDoList.length - 1) {
     
      toDoList[i] = (i + 1) + ". " + checkBox + " - " +toDoItem;
    }

  }
  return toDoList;
}

let removeItem= (obj) => {
  let toDoList = obj["toDoItems"];
 
  for(let i = 0; i<toDoList.length; i++) {
    if(parsedItem === i) {
      toDoList.splice(i - 1, 1)
    }
  }
  return toDoList;
}

let checkItem = (obj) => {
  
}


jsonfile.readFile(file, (err, obj) => {
 
  

if(commandType === "add") {
  addInput(obj)
} else if(commandType === "show") {
  console.log(obj)
} else if(commandType === "remove") {
  removeItem(obj)
}

    
  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});

// console.log( process.argv);

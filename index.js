const jsonfile = require('jsonfile');
const file = 'data.json'

const ENV = process.argv[0];
const PATH = process.argv[1];
const operation = process.argv[2];
const listItem = process.argv[3];

//status is either [x] or [ ]
let status;

let toDoList = file.toDoList.length + 1;
let listNum = listNum + ".";


if(operation=== 'add'){
  console.log(add (listItem))
}

//helper functions

//function to add things to do list

// everytime a user adds something, push it into file.toDoItems array so you can use .length property to track number of items in the list

jsonfile.readFile(file, (err, obj)=> {
  if(operation=== 'add'){
    //add function
    obj.toDoItems.push({
      listNum : listItem 
    })
  }
})
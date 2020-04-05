
let command = process.argv[2];
let taskItem = process.argv[3];

let unmarked = " ";
let marked = "x";

const jsonfile = require('jsonfile');

const fileName = 'data.json'


const addData = (error, toDoList) => {
console.log(toDoList);
//adding task items to the list
    if ( command === "add"){
      // let itemsCount = toDoList['todoItems'].push(taskItem);
      // console.log("the item add is " + itemsCount);
//create an output format
      let itemsCount = toDoList['todoItems'].length + 1
      let formattedData = itemsCount + "." + " [" + unmarked + "]" + " - " + taskItem;
      console.log("the output is " + formattedData);
      let addedItems = toDoList['todoItems'].push(formattedData);
      console.log(addedItems);
      console.log(toDoList['todoItems']);
      //console.log(toDoList['todoItems'][0]);
    }
    if ( command === "show"){
      for ( let i = 0; i < toDoList['todoItems'].length; i++){
        console.log(toDoList['todoItems'][i]);
      }
    }


jsonfile.writeFile(fileName, toDoList)

}


jsonfile.readFile(fileName, addData)
console.log("read File")





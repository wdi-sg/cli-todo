
const fullList = process.argv;
let commandType = fullList[2];
let newTodo = fullList[3];
let doneNumber = fullList[3];



let newItem = function(){
  return itemNumber + ". [ ] " + newTodo;
}


const jsonfile = require('jsonfile');

const file = 'data.json'
const list = require('./data')
// const entireList =
if (commandType == "add"){

    jsonfile.readFile(file, (err, obj) => {


      let n = obj.todoItems.length+1;
      obj["todoItems"].push(n + ". [ ] - " + newTodo);
      obj["itemNames"].push(newTodo);
      console.log(commandType + "ing new item: " + newTodo);
      console.log("Your To-Do List is now: " + obj["todoItems"]);

      jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
      })
      })
    } else if (commandType == "show"){
      jsonfile.readFile(file, (err, obj) => {
        console.log("Your To-Do List is now: " + obj["todoItems"]);

        jsonfile.writeFile(file, obj, (err) => {
          console.log(err)
        })
        })

    } else if (commandType == "done"){
      jsonfile.readFile(file, (err, obj) => {
        console.log("Done: " + obj["todoItems"][doneNumber-1]);
        obj["todoItems"][doneNumber-1] = doneNumber+"[X] " + obj["itemNames"][doneNumber-1]
        console.log("Your To-Do List is now: " + obj["todoItems"]);

        jsonfile.writeFile(file, obj, (err) => {
          console.log(err)
        })
        })
    } else if (commandType == "delete"){
      jsonfile.readFile(file, (err, obj) => {
        console.log("Removed: " + obj["todoItems"][doneNumber-1]);
        obj["todoItems"][doneNumber-1] = null;
        console.log("Your To-Do List is now: " + obj["todoItems"]);

        jsonfile.writeFile(file, obj, (err) => {
          console.log(err)
        })
        })
};

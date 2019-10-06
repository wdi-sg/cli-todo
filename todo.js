
const fullList = process.argv;
let commandType = fullList[2];



// let itemNumber = fullList.length-1;

let newTodo = fullList[3];
console.log(newTodo);
let newItem = function(){
  return itemNumber + ". [ ] " + newTodo;
}


const jsonfile = require('jsonfile');

const file = 'data.json'
const list = require('./data')
// const entireList =
if (commandType == "add"){
    jsonfile.readFile(file, (err, obj) => {
      console.log(obj);
      let n = obj.todoItems.length+1;
      obj["todoItems"].push(n + ". [ ] - " + newTodo);

      jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
      })
      })
    } else if (commandType == "show"){
       console.log(obj);
    }

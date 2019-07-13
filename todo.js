const jsonfile = require('jsonfile')
const file = 'data.json'

var commandType = process.argv[2];
var userInput  = process.argv[3];

console.log('linked');

// --------------------------------------------------------------------------------------------------
// Add todo as an object
// --------------------------------------------------------------------------------------------------
//
// var addTodoObj = {
//   "todoItems" : []
// };
//
// jsonfile.writeFile(file, addTodoObj, (err) => {
//   if (err){
//     console.log(err)
//   }else{
//     console.log("worked");
//   }
// });

// --------------------------------------------------------------------------------------------------
// add function
// --------------------------------------------------------------------------------------------------
var add = function (newItem) {
    jsonfile.readFile(file, (err, data) => {
        let arr = {};

        arr.id = data.todoItems.length + 1;
        arr.task = newItem;

        data.todoItems.push(arr);

        jsonfile.writeFile(file, data, (err) => {
            if (err) {
                console.log(err)
            }
        });
    });
}


var add = function (newItem) {
    jsonfile.readFile(file, (err, data) => {
        let arr = {};

        arr.id = data.todoItems.length + 1;
        arr.task = newItem;
        // arr.done = "false";
        // arr.deleted = "false";
        // arr.created_at = getCurrentDateAndTime();
        // arr.updated_at = "";

        data.todoItems.push(arr);

        jsonfile.writeFile(file, data, (err) => {
            if (err) {
                console.log(err)
            }
        });
    });
}

// --------------------------------------------------------------------------------------------------
// show function
// --------------------------------------------------------------------------------------------------
var show = function () {
  jsonfile.readFile(file, (err, data) => {

      data.todoItems.forEach(function(toDoItem, index) {
          if (toDoItem.deleted === "false" && toDoItem.done == "false") {
              console.log(`${ toDoItem.id }. [ ] - ${ toDoItem.task }`);

          } else if (toDoItem.deleted === "false" && toDoItem.done == "true") {
              console.log(`${ toDoItem.id }. [X] - ${ toDoItem.task }`);

          }
      });

  });
}



// --------------------------------------------------------------------------------------------------
// cli flow, show instructions or execute commands depending on userInput
// --------------------------------------------------------------------------------------------------
const instructions = function() {
    console.log("Instuctions");
}

if (commandType === "show") {
    show();
}
else if (commandType === "add") {
    add(userInput);
    console.log("Task added");
    show();
    // console.log('add ' + userInput);
}
else if (commandType === "done") {
    // markDone(userInput);
    console.log('markDone ' + userInput);
    console.log("Task marked done!");
    show();
}
else if (commandType === "delete") {
    // delele(userInput);
    console.log('delete ' + userInput);
    console.log("Task deleted");
    show();
}
else {
    //default
    instructions();
}

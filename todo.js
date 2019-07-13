const jsonfile = require('jsonfile')
const file = 'data.json'

var commandType = process.argv[2];
var userInput  = process.argv[3];
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

        arr.id        = data.todoItems.length + 1;
        arr.task      = newItem;
        arr.completed = false;
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

    // if no tasks in the list, let user know, else display each item.
    if (data.todoItems.length === 0 ){
      console.log('There is no tasks in the todo list, please add some tasks');
    } else {
      for (var i = 0; i < data.todoItems.length; i++){
        if (data.todoItems[i].completed  === true){
          console.log(data.todoItems[i].id + ". "+ "[x] " + data.todoItems[i].task);
        } else {
          console.log(data.todoItems[i].id + ". "+ "[ ] " + data.todoItems[i].task);
        }
      }
    }


  });
}

// --------------------------------------------------------------------------------------------------
// markDone function
// --------------------------------------------------------------------------------------------------

var check = function (index) {
    jsonfile.readFile(file, (err, data) => {
        var j = index - 1;
        if (data.todoItems[j].completed === false){
          data.todoItems[j].completed = true;
        } else {
          data.todoItems[j].completed = false;
        }



        jsonfile.writeFile(file, data, (err) => {
            if (err) {
                console.log(err)
            }
        });
    });
}


// --------------------------------------------------------------------------------------------------
// cli flow, show instructions or execute commands depending on userInput
// --------------------------------------------------------------------------------------------------
const instructions = function() {
    console.log("Welcome to the todo app, here is how you use it");
    console.log("Type  node todo.js show            -  to show the to do list");
    console.log("Type  node todo.js add 'new task'  -  to add a new task");
    console.log("Type  node todo.js check 1         -  to mark task 1 done or not done");
    console.log("Type  node todo.js delete 1        -  to delete task 1");
}

if (commandType === "show") {
    show();
}
else if (commandType === "add") {
    add(userInput);
    setTimeout(function(){
      show();
    },100);
}
else if (commandType === "check") {
    check(userInput);
    setTimeout(function(){
      show();
    },100);
}
else if (commandType === "delete") {
    // delele(userInput);
    setTimeout(function(){
      show();
    },100);
}
else {
    //default
    instructions();
}

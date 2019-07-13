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
// Add a task
// --------------------------------------------------------------------------------------------------

var add = function (newItem) {
    jsonfile.readFile(file, (err, data) => {
        let item = {};

        item.id        = data.todoItems.length + 1;
        item.task      = newItem;
        item.done = false;
        // arr.deleted = "false";
        // arr.created_at = getCurrentDateAndTime();
        // arr.updated_at = "";

        data.todoItems.push(item);

        jsonfile.writeFile(file, data, (err) => {
            if (err) {
                console.log(err)
            }
        });
    });
}

// --------------------------------------------------------------------------------------------------
// Show the task list
// --------------------------------------------------------------------------------------------------
var show = function () {
  jsonfile.readFile(file, (err, data) => {

    // if no tasks in the list, let user know, else display each item.
    if (data.todoItems.length === 0 ){
      console.log('There is no tasks in the todo list, please add some tasks');
    } else {
      for (var i = 0; i < data.todoItems.length; i++){
        if (data.todoItems[i].done  === true){
          console.log(data.todoItems[i].id + ". "+ "[x] " + data.todoItems[i].task);
        } else {
          console.log(data.todoItems[i].id + ". "+ "[ ] " + data.todoItems[i].task);
        }
      }
    }


  });
}

// --------------------------------------------------------------------------------------------------
// Mark a task done
// --------------------------------------------------------------------------------------------------

var markDone = function (index) {
    jsonfile.readFile(file, (err, data) => {
        var j = index - 1;

        // this if/else statement can uncheck
        if (data.todoItems[j].done === false){
          data.todoItems[j].done = true;
        } else {
          data.todoItems[j].done = false;
        }

        jsonfile.writeFile(file, data, (err) => {
            if (err) {
                console.log(err)
            }
        });
    });
}

// --------------------------------------------------------------------------------------------------
// Delete a task
// --------------------------------------------------------------------------------------------------

var deleteTask = function (index) {
    jsonfile.readFile(file, (err, data) => {

        //deletes the tasks at the j position, 1 item
        var j = index - 1;
        data.todoItems.splice(j,1);

        //after deleting, reassigns index
        for (var i=0; i< data.todoItems.length; i++){
          data.todoItems[i].id = i+1;
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
    console.log("Type  node todo.js done 1          -  to mark task 1 done or not done");
    console.log("Type  node todo.js delete 1        -  to delete task 1");
}

if (commandType === "show") {
    show();
}
else if (commandType === "add") {
    if(userInput === undefined){
      console.log(`Please indicate a task name, type node todo.js add 'new task'`);
    } else {
      add(userInput);
      setTimeout(function(){
        show();
      },100);
    }
}
else if (commandType === "done") {

  if (userInput === undefined){
    console.log(`Please indicate a task number`);
  } else {
    markDone(userInput);
    setTimeout(function(){
      show();
    },100);
  }
}
else if (commandType === "delete") {
  if (userInput === undefined){
    console.log(`Please indicate a task number`);
  } else {
    deleteTask(userInput);
    setTimeout(function(){
      show();
    },500);
  }
}
else {
    //default
    instructions();
}

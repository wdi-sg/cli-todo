const figlet = require('figlet');
const jsonfile = require('jsonfile');

const file = 'data.json';

var addZero = function(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

var getCurrentDateAndTime = function () {
    let date = new Date();
    let dateAndTime = `${ date.getDate() }/${ date.getMonth() + 1 }/${ date.getFullYear() } ` +
                        `${ addZero(date.getHours()) }:${ addZero(date.getMinutes()) }:${ addZero(date.getSeconds()) }`;

    return dateAndTime;
}

var setConsoleMessages = function (content) {
    figlet(content, function(err, data) {
        if (err) {
            console.dir(err);
            return;
        }
        console.log(data)

        console.log('Options');
        console.log('1. View All Items - Type in "node index.js show" to display all your to do to items');
        console.log('2. Add New Item - Type in "node index.js add [task name]" to add new to do item');
        console.log('3. Mark Item as Done - Type in "node index.js done [task #]" to mark to do item as done');
        console.log('4. Delete Item: Type in "node index.js delete [task #]" to delete to do item');
    });
}

var checkForEmptyTasksList = function (data) {
    if (data.todoItems.length <= 0) {
        return true;
    } else {
        return false;
    }
}

var showTasks = function () {
    jsonfile.readFile(file, (err, data) => {
        if (checkForEmptyTasksList(data) === true) {
            console.log("You have an empty task list. Add in something first.")

        } else {
            data.todoItems.forEach(function(toDoItem, index) {
                if (toDoItem.deleted === "false" && toDoItem.done == "false") {
                    console.log(`${ toDoItem.id }. [ ] - ${ toDoItem.task }`);

                } else if (toDoItem.deleted === "false" && toDoItem.done == "true") {
                    console.log(`${ toDoItem.id }. [X] - ${ toDoItem.task }`);

                }
            });
        }
    });
}

var addTask = function (task) {
    jsonfile.readFile(file, (err, data) => {
        let temp = {};

        temp.id = data.todoItems.length + 1;
        temp.task = task;
        temp.done = "false";
        temp.deleted = "false";
        temp.created_at = getCurrentDateAndTime();
        temp.updated_at = "";

        data.todoItems.push(temp);

        jsonfile.writeFile(file, data, (err) => {
            if (err !== null) {
                console.log(err)
            }
        });
    });
}

var markTaskAsDone = function (id) {
    jsonfile.readFile(file, (err, data) => {
        if (checkForEmptyTasksList(data) === true) {
            console.log("You have an empty task list. Add in something first.");

        } else {
            data.todoItems.forEach(function(item) {
                if (item.id === Number(id)) {
                    item.done = "true";
                    item.updated_at = getCurrentDateAndTime();;
                }
            });

            jsonfile.writeFile(file, data, (err) => {
                if (err !== null) {
                    console.log(err)
                }
            });
        }
    });
}

var deleteTask = function (id) {
    jsonfile.readFile(file, (err, data) => {
        if (checkForEmptyTasksList(data) === true) {
            console.log("You have an empty task list. Add in something first.");

        } else {
            data.todoItems.forEach(function(item) {
                if (item.id === Number(id)) {
                    item.deleted = "true";
                    item.updated_at = getCurrentDateAndTime();
                }
            });

            jsonfile.writeFile(file, data, (err) => {
                if (err !== null) {
                    console.log(err)
                }
            });
        }
    });
}


var main = function (userCommandType, userInput) {
    switch (userCommandType) {
        case "show":
            showTasks();
            break;

        case "add":
            addTask(userInput);
            console.log("Task added!");
            break;

        case "done":
            markTaskAsDone(userInput);
            console.log("Task marked as done!");
            break;

        case "delete":
            deleteTask(userInput);
            console.log("Task deleted!");
            break;

        default:
            setConsoleMessages("Swee Chin - To Do List");
            break;
    }
}

main(process.argv[2], process.argv[3]);
const command = process.argv[2];
const argument = process.argv[3];
const jsonfile = require('jsonfile');
const file = 'data.json'

readAndWrite(command);

function readAndWrite(command){
    jsonfile.readFile(file, (err, obj) => {
        var todoItems = obj.todoItems;

        //If the user input "done" or "delete" as a command, but the array is empty or if the array has less items than the argument number, or if the argument was empty, do nothing. Otherwise, execute the command.
        if (!((command === "done" || command === "delete") && (isEmptyArray(todoItems) || argument > todoItems.length))){
            if (!argument){
                console.log("You must key in an argument!");
                return;
            }
            execute(command, todoItems);
        }
        jsonfile.writeFile(file, obj, (err) => {
            if (err !== null){
                console.log(err);
            } else {
                console.log(getTodoListString(todoItems));
            }
        });
    });
}

function execute(command, todoItems){
    switch(command){
        case "add":
            let date = new Date();
            let obj = {
                "task": argument,
                "done": false,
                "dateUpdated": date,
                "dateUpdatedString": getDateString(date)
            }
            todoItems.push(obj);
            console.log(`"${obj.task}" was added to the todo list.`)
            break;
        case "done":
            let doneString = "";
            todoItem = todoItems[argument - 1];

            if (todoItem.done === false){
                todoItem.done = true;
                doneString = "done";
            } else {
                todoItem.done = false;
                doneString = "undone";
            }

            let newDate = new Date();
            todoItem.dateUpdatedString = getDateString(newDate);
            todoItem.date = newDate;
            console.log(`"${todoItem.task}" was marked as ${doneString}.`);
            break;
        case "delete":
            let deletedTask = todoItems.splice(argument - 1, 1);
            console.log(`"${deletedTask[0].task}" was deleted.`)
            break;
        default:
            console.log("Invalid command!");
            break;
    }
}

function isEmptyArray(array){
    return (!Array.isArray(array) || !array.length);
}

function getDateString(date){
    return `(Last updated: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getUTCHours() + 8}:${date.getUTCMinutes()<10?'0'+date.getUTCMinutes():date.getUTCMinutes()}h)`;
}

function getTodoListString(todo){
    if (!Array.isArray(todo) || todo.length === 0){
        return "The todo list is empty."
    }
    let todoListString = "";
    for(let obj in todo){
        let todoItem = todo[obj];
        let doneString;

        if (todoItem.done){
            doneString = "X";
        } else {
            doneString = " ";
        }

        todoListString += parseInt(obj) + 1 + ". [" + doneString + "] - " + todoItem.task + " " + todoItem.dateUpdatedString + "\n";
    }
    return todoListString;
}
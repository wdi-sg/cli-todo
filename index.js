const command = process.argv[2];
const argument = process.argv[3];
const jsonfile = require('jsonfile');
const file = 'data.json'

readAndWrite(command);

function readAndWrite(command){
    jsonfile.readFile(file, (err, obj) => {
        var todoList = obj.todoItems;
        execute(command, todoList);
        jsonfile.writeFile(file, obj, (err) => {
            if (err !== null){
                console.log(err);
            } else {
                console.log(getList(todoList));
            }
        });
    });
}

function execute(command, todoList){
    switch(command){
        case "add":
            let date = new Date();
            let dateString = `(${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getUTCHours() + 8}:${date.getUTCMinutes()}h)`
            let obj = {
                "task": argument,
                "done": false,
                "created_at": dateString
            }
            todoList.push(obj);
            break;
        case "done":
            if (todoList[argument - 1].done === false){
                todoList[argument - 1].done = true;
            } else {
                todoList[argument - 1].done === false
            }
            break;
        case "delete":
            let deletedTask = todoList.splice(argument - 1, 1);
            console.log("'" + deletedTask[0].task + "' was deleted.")
            break;
        default:
            console.log("Invalid command!");
            console.log(getList(todoList));
            break;
    }
}

function getList(todoList){
    let list = "";
    for(let obj in todoList){
        let done = " ";
        if (todoList[obj].done === true){
            done = "X";
        }
        let todoItem = todoList[obj];
        let dateCreated = todoItem.created_at;
        list += parseInt(obj) + 1 + ". [" + done + "] - " + todoItem.task + " " + dateCreated + "\n";
    }
    return list;
}
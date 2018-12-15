const jsonfile = require('jsonfile');
const file = 'data.json';

if (process.argv[2] === "add") {
    var date = "";
    var dateArray = new Date().toString().split(" ");
    for (i = 1; i < dateArray.length - 4; i++ ) {
        date = date + dateArray[i] + " ";
    }
    var taskToDone = " - ";
    for (i = 3; i < process.argv.length; i++) {
        taskToDone = taskToDone + process.argv[i] + " ";
    }


    jsonfile.readFile(file, (err, obj) => {
        var newItem = {dateCreated: date, done: "[ ]", task: taskToDone, dateUpdated: ""};

        obj.todoItems.push(newItem);

        jsonfile.writeFile(file, obj, (err) => {
        console.log(err);
        });
    });
}

if (process.argv[2] === "show"){
    console.log("   Date Created                 Task                Date Updated");

    jsonfile.readFile(file, (err, obj) => {

    for (var i = 0; i < obj.todoItems.length; i++ ) {
        var taskItem = "";
        taskItem = taskItem + (i + 1) + ". ";
        taskItem = taskItem + obj.todoItems[i].dateCreated + " ";
        taskItem = taskItem + obj.todoItems[i].done + " ";
        taskItem = taskItem + obj.todoItems[i].task + " ";
        for (let j = 0; j < 22 - obj.todoItems[i].task.length; j++ ) {
            taskItem = taskItem + " ";
            }
        taskItem = taskItem + obj.todoItems[i].dateUpdated;

        console.log(taskItem);
        }
    })
}

if (process.argv[2] === "delete") {
    var index = parseInt(process.argv[3]);

    jsonfile.readFile(file, (err, obj) => {
        if(index < obj.todoItems.length + 1) {
            obj.todoItems.splice(index -1, 1);
            jsonfile.writeFile(file, obj, (err) => {
            console.log(err);
            });
        }
    });
}

if (process.argv[2] === "done") {
    var index = parseInt(process.argv[3]);
    var date = "";
    var dateArray = new Date().toString().split(" ");
    for (i = 1; i < dateArray.length - 4; i++ ) {
        date = date + dateArray[i] + " ";
    }

    jsonfile.readFile(file, (err, obj) => {
        if(index < obj.todoItems.length + 1) {
            obj.todoItems[index - 1].done = "[x]";
            obj.todoItems[index - 1].dateUpdated = date;
            jsonfile.writeFile(file, obj, (err) => {
            console.log(err);
            });
        }
    });
}
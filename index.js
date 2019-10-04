const jsonfile = require('jsonfile');
const moment = require('moment');

const command = process.argv[2];
const newTask = process.argv[3];

const file = 'data.json';

const listItem = (item) => {
    return `${item.index}. [${item.done ? 'X' : ' ' }] - ${item.task} - created: ${item.created} - updated: ${item.updated}`;
}

console.log("---To Do List---");
jsonfile.readFile(file, (err, obj) => {

    switch (command) {
        case "add":
            {
                if (!newTask) {
                    console.log("Please specify new task to be added.");
                    return;
                }

                let lastIndex;

                if (!obj.toDoItems.length) {
                    lastIndex = 0;
                } else {
                    lastIndex = obj.toDoItems[obj.toDoItems.length - 1].index;
                }

                let newItem = {
                    "index": lastIndex + 1,
                    "done": false,
                    "task": newTask,
                    "created": moment().format("LLLL"),
                    "updated": "04 Oct 2019"
                };

                obj.toDoItems.push(newItem);

                jsonfile.writeFile(file, obj, (err) => {
                    if (err) {
                        console.log("Error writing file");
                        console.log(err);
                    };
                    obj.toDoItems.forEach(item => console.log(listItem(item)));
                });
            }
            break;
        case "show":
            {
                obj.toDoItems.forEach(item => console.log(listItem(item)));
                break;
            }
        case "help":
            {
                console.log("add - add new task");
                console.log("show - show tasks");
                break;
            }
        default:
            {
                console.log("add - add new task");
                console.log("show - show tasks");
                break;
            }
    }
});
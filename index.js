const jsonfile = require('jsonfile');
const moment = require('moment');

const command = process.argv[2];
const input = process.argv[3];

const file = 'data.json';

const listItem = (item) => {
    return `${item.index}. [${item.done ? 'X' : ' ' }] - ${item.task} - created: ${item.created} - updated: ${item.updated}`;
}

console.log("---To Do List---");
jsonfile.readFile(file, (err, obj) => {

    switch (command) {
        case "add":
            {
                if (!input) {
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
                    "task": input,
                    "created": moment().format("LLLL"),
                    "updated": "-"
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
        case "done":
            {
                if (!obj.toDoItems.length) {
                    console.log("Please add a todo item first.");
                    return;
                } else {
                let doneItem = obj.toDoItems[input - 1];

                doneItem.done = !doneItem.done;

                obj.toDoItems[input-1] = doneItem;

                    jsonfile.writeFile(file, obj, (err) => {
                        if (err) {
                            console.log("Error writing file");
                            console.log(err);
                        };
                        obj.toDoItems.forEach(item => console.log(listItem(item)));
                    });
                }
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
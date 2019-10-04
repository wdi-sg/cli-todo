const jsonfile = require('jsonfile');
const moment = require('moment');
const figlet = require('figlet');
const columnify = require('columnify');

const command = process.argv[2];
const input = process.argv[3];

const file = 'data.json';

const columnifyItems = (toDoItems) => {

    const columnifiedItems = columnify(toDoItems, {
        columnSplitter: ' | ',
        config: {
            index: {
                headingTransform: () => "#",
            },
            done: {
                headingTransform: () => "Done?",
                dataTransform: done => done === "true" ? "✔" : ""
            },
            task: {
                headingTransform: () => "Task",
            },
            created: {
                headingTransform: () => "Created",
            },
            updated: {
                headingTransform: () => "Updated",
            }
        }
    })

    return columnifiedItems;
}


console.log(figlet.textSync('To Do List', {
    font: 'Larry 3D',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}));


jsonfile.readFile(file, (err, obj) => {

    switch (command) {
        case "add":
            {
                if (!input) {
                    console.log("*** Please specify the name of the task to be added. ***");
                    return;
                } else {

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
                            console.log("*** Error writing file. ***");
                            console.log(err);
                        };
                        console.log(columnifyItems(obj.toDoItems));
                    });
                }
            }
            break;
        case "show":
            {
                // console.log(columnifyItems(obj.toDoItems));
                // const list = columnify(obj.toDoItems);
                console.log(columnifyItems(obj.toDoItems));
                break;
            }
        case "done":
            {
                if (!obj.toDoItems.length) {
                    console.log("*** To do list is empty, please add a task ***");
                    return;
                } else {
                    if (!input) {
                        console.log("*** Please specify the task to be marked done. ***");
                        console.log(columnifyItems(obj.toDoItems));
                        return;
                    } else if (input > obj.toDoItems.length || input <= 0) {
                        console.log("*** Please specify a valid task number. ***");
                        console.log(columnifyItems(obj.toDoItems));
                    } else {
                        let doneItem = obj.toDoItems[input - 1];

                        doneItem.done = !doneItem.done;
                        doneItem.updated = moment().format("LLLL");

                        obj.toDoItems[input - 1] = doneItem;

                        jsonfile.writeFile(file, obj, (err) => {
                            if (err) {
                                console.log("Error writing file");
                                console.log(err);
                            };
                            console.log(columnifyItems(obj.toDoItems));
                        });
                    }
                }
                break;
            }
        case "delete":
            {
                if (!obj.toDoItems.length) {
                    console.log("*** To do list is empty, please add a task. ***");
                    return;
                } else {
                    if (!input) {
                        console.log("*** Please specify the task to be deleted. ***");
                        console.log(columnifyItems(obj.toDoItems));
                        return;
                    } else if (input > obj.toDoItems.length || input <= 0) {
                        console.log("*** Please specify a valid task number. ***");
                        console.log(columnifyItems(obj.toDoItems));
                    } else {
                        let deleteItem = obj.toDoItems[input - 1];

                        obj.toDoItems.splice(input - 1, 1);

                        obj.toDoItems.forEach((item, index) => { item.index = index + 1 });

                        jsonfile.writeFile(file, obj, (err) => {
                            if (err) {
                                console.log("*** Error writing file. ***");
                                console.log(err);
                            };
                            console.log(columnifyItems(obj.toDoItems));
                        });
                    }
                    break;
                }
            }
        case "help":
            {
                console.log("add - add new task");
                console.log("show - show tasks");
                console.log("done - check and uncheck task as done");
                console.log("delete - delete a task");
                console.log("help - show this message");
                break;
            }
        default:
            {
                console.log("add - add new task");
                console.log("show - show tasks");
                console.log("done - check and uncheck task as done");
                console.log("delete - delete a task");
                console.log("help - show this message");
                break;
            }
    }
});